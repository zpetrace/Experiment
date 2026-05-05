/**
 * Vercel Serverless Function — odešle CSV výsledků na váš e-mail přes Resend.
 *
 * Proměnné prostředí (Project Settings → Environment Variables na Vercelu):
 *   RESEND_API_KEY     API klíč z https://resend.com/api-keys
 *   RESULTS_EMAIL      příjemce (jedna adresa nebo více oddělených čárkou)
 *   RESEND_FROM        např. "Experiment <experiment@your-domain.cz>" — musí být ověřená doména v Resend
 *                      (pokud není nastaveno, použije se výchozí Resend sandbox — viz dokumentace Resend)
 *
 * Volitelně v těle JSON: crsCsv (řetězec CSV s BOM) — druhá příloha CRS-15.
 */

const { Resend } = require("resend");

function parseBody(req) {
    const raw = req.body;
    if (raw == null) return {};
    if (typeof raw === "string") {
        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }
    if (typeof raw === "object") return raw;
    return null;
}

module.exports = async (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.method !== "POST") {
        res.status(405).json({ ok: false, error: "Method not allowed" });
        return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toRaw = process.env.RESULTS_EMAIL;
    const from =
        process.env.RESEND_FROM ||
        "Experiment <onboarding@resend.dev>";

    if (!apiKey || !toRaw) {
        res.status(503).json({
            ok: false,
            code: "not_configured",
            error: "Email delivery is not configured on the server"
        });
        return;
    }

    const payload = parseBody(req);
    if (payload === null) {
        res.status(400).json({ ok: false, error: "Invalid JSON body" });
        return;
    }

    const participantId = payload.participantId;
    const csv = payload.csv;
    const crsCsv = typeof payload.crsCsv === "string" ? payload.crsCsv : "";

    if (!participantId || typeof participantId !== "string" || typeof csv !== "string") {
        res.status(400).json({ ok: false, error: "Missing participantId or csv" });
        return;
    }

    if (csv.length > 2_000_000) {
        res.status(413).json({ ok: false, error: "Payload too large" });
        return;
    }

    if (crsCsv.length > 500_000) {
        res.status(413).json({ ok: false, error: "CRS payload too large" });
        return;
    }

    const safeId = String(participantId).replace(/[^\w.\-]+/g, "_").slice(0, 120);
    const filename = `vysledky_${safeId || "ucastnik"}.csv`;
    const toList = String(toRaw)
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

    if (!toList.length) {
        res.status(503).json({ ok: false, code: "not_configured", error: "RESULTS_EMAIL is empty" });
        return;
    }

    const crsFilename = `crs_${safeId || "ucastnik"}.csv`;
    const hasCrs = crsCsv.length > 0;

    const defaultSubject = hasCrs
        ? `Experiment + CRS-15 — účastník ${participantId}`
        : `Experiment — výsledky účastníka ${participantId}`;
    const subject =
        typeof payload.subject === "string" && payload.subject.trim()
            ? payload.subject.trim()
            : defaultSubject;

    const textLines = [
        `ID účastníka: ${participantId}`,
        payload.variantLabel ? `Varianta: ${payload.variantLabel}` : null,
        "",
        hasCrs
            ? "V příloze: (1) CSV výsledků experimentu na ose slov, (2) CSV odpovědí CRS-15. UTF-8, oddělovač středník."
            : "V příloze je CSV výsledků experimentu (UTF-8, středník)."
    ].filter(Boolean);

    const attachments = [
        {
            filename,
            content: Buffer.from(csv, "utf8")
        }
    ];
    if (hasCrs) {
        attachments.push({
            filename: crsFilename,
            content: Buffer.from(crsCsv, "utf8")
        });
    }

    const resend = new Resend(apiKey);

    try {
        const { error } = await resend.emails.send({
            from,
            to: toList,
            subject,
            text: textLines.join("\n"),
            attachments
        });

        if (error) {
            console.error("Resend error:", error);
            const detail =
                typeof error === "object" && error && "message" in error
                    ? String(error.message)
                    : String(error);
            res.status(500).json({
                ok: false,
                error: "Email provider rejected the message",
                detail
            });
            return;
        }

        res.status(200).json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            ok: false,
            error: "Email send failed"
        });
    }
};
