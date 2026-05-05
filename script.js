/** Each item: Czech + English surface form (same stimulus, two languages). */
const wordsByCategory = {
    bad: [
        { cs: "Násilí", en: "Violence" },
        { cs: "Válka", en: "War" },
        { cs: "Lež", en: "Lie" },
        { cs: "Manipulace", en: "Manipulation" },
        { cs: "Pomsta", en: "Revenge" },
        { cs: "Zrada", en: "Betrayal" },
        { cs: "Útlak", en: "Oppression" },
        { cs: "Krutost", en: "Cruelty" },
        { cs: "Prázdnota", en: "Emptiness" },
        { cs: "Závist", en: "Envy" }
    ],
    good: [
        { cs: "Péče", en: "Care" },
        { cs: "Objetí", en: "Embrace" },
        { cs: "Komunita", en: "Community" },
        { cs: "Vítězství", en: "Victory" },
        { cs: "Soucit", en: "Compassion" },
        { cs: "Úspěch", en: "Success" },
        { cs: "Statečnost", en: "Courage" },
        { cs: "Naděje", en: "Hope" },
        { cs: "Svoboda", en: "Freedom" },
        { cs: "Harmonie", en: "Harmony" }
    ],
    neutral: [
        { cs: "Vědomost", en: "Knowledge" },
        { cs: "Zákon", en: "Law" },
        { cs: "Změna", en: "Change" },
        { cs: "Kontrast", en: "Contrast" },
        { cs: "Hranice", en: "Boundary" },
        { cs: "Vztah", en: "Relationship" },
        { cs: "Názor", en: "Opinion" },
        { cs: "List", en: "Leaf" },
        { cs: "Strom", en: "Tree" },
        { cs: "Dualita", en: "Duality" }
    ]
};

const wordsData = Object.entries(wordsByCategory).flatMap(([category, items]) =>
    items.map((pair, index) => ({
        id: `${category}-${index}`,
        category,
        textCs: pair.cs,
        textEn: pair.en
    }))
);

function getWordDisplayLabel(wordObj) {
    const lang = typeof ExperimentI18n !== "undefined" ? ExperimentI18n.getLang() : "cs";
    return lang === "en" ? wordObj.textEn : wordObj.textCs;
}

const variants = {
    "all-at-once-all": {
        label: "1. all at once - neutral + good + bad",
        mode: "all-at-once",
        categories: ["neutral", "good", "bad"]
    },
    "all-at-once-neutral-good": {
        label: "2. all at once - neutral + good",
        mode: "all-at-once",
        categories: ["neutral", "good"]
    },
    "all-at-once-neutral-bad": {
        label: "3. all at once - neutral + bad",
        mode: "all-at-once",
        categories: ["neutral", "bad"]
    },
    "one-by-one-all": {
        label: "4. one by one - neutral + good + bad",
        mode: "one-by-one",
        categories: ["neutral", "good", "bad"]
    },
    "one-by-one-neutral-good": {
        label: "5. one by one - neutral + good",
        mode: "one-by-one",
        categories: ["neutral", "good"]
    },
    "one-by-one-neutral-bad": {
        label: "6. one by one - neutral + bad",
        mode: "one-by-one",
        categories: ["neutral", "bad"]
    }
};

let participantId = "";
let selectedVariantKey = "all-at-once-all";
let activeWords = [];
/** Word element IDs already placed on the axis at least once (repositioning does not increment). */
const placedWordIds = new Set();
let queueIndex = 0;

/** Snímek CSV z experimentu před přechodem na CRS (odesílá se až s dotazníkem). */
let pendingExperimentCsvWithBom = null;
let pendingVariantLabel = null;
let crsFormBuilt = false;

const introScreen = document.getElementById("intro-screen");
const experimentScreen = document.getElementById("experiment-screen");
const questionnaireScreen = document.getElementById("questionnaire-screen");
const wordsBank = document.getElementById("words-bank");
const axis = document.getElementById("axis");
const ticksContainer = document.getElementById("axis-ticks");
const continueToCrsBtn = document.getElementById("i18n-continue-crs-btn");
const crsForm = document.getElementById("crs-form");
const crsFormFields = document.getElementById("crs-form-fields");
const crsSubmitBtn = document.getElementById("i18n-crs-submit-btn");
const crsErrorBanner = document.getElementById("crs-error-banner");
const variantSelect = document.getElementById("experiment-variant");
const instructionsText = document.getElementById("i18n-exp-instructions-p");

// --- 1. VYTVOŘENÍ STUPNICE NA OSE (-50 až 50) ---
function createTicks() {
    ticksContainer.innerHTML = "";
    for (let i = 50; i >= -50; i -= 10) {
        const tick = document.createElement("div");
        tick.textContent = i;
        ticksContainer.appendChild(tick);
    }
}
createTicks();

function getFilteredWords(variantKey) {
    const variant = variants[variantKey];
    return wordsData.filter((word) => variant.categories.includes(word.category));
}

function shuffleArray(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createWordElement(wordObj) {
    const el = document.createElement("div");
    el.className = "word";
    el.textContent = getWordDisplayLabel(wordObj);
    el.draggable = true;
    el.id = `word-${wordObj.id}`;
    el.dataset.category = wordObj.category;

    el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", el.id);
    });

    return el;
}

function showNextWordOneByOne() {
    wordsBank.innerHTML = "";
    if (queueIndex >= activeWords.length) return;
    const nextWord = activeWords[queueIndex];
    wordsBank.appendChild(createWordElement(nextWord));
    queueIndex += 1;
}

function renderWordsForVariant(variantKey) {
    wordsBank.innerHTML = "";
    axis.querySelectorAll(".word").forEach((word) => word.remove());
    continueToCrsBtn.classList.add("hidden");
    placedWordIds.clear();
    queueIndex = 0;
    activeWords = shuffleArray(getFilteredWords(variantKey));

    const variant = variants[variantKey];
    if (variant.mode === "all-at-once") {
        activeWords.forEach((wordObj) => wordsBank.appendChild(createWordElement(wordObj)));
    } else {
        showNextWordOneByOne();
    }
}

function updateInstructions(variantKey) {
    if (!instructionsText || typeof ExperimentI18n === "undefined") return;
    const variant = variants[variantKey];
    const key = variant.mode === "all-at-once" ? "instr_exp_all" : "instr_exp_one";
    instructionsText.textContent = ExperimentI18n.t(key);
    const h3 = document.getElementById("i18n-exp-sidebar-h3");
    if (h3) h3.textContent = ExperimentI18n.t("sidebar_words_heading");
}

// --- 2. START EXPERIMENTU ---
document.getElementById("i18n-start-btn").addEventListener("click", () => {
    const id = document.getElementById("participant-id").value.trim();
    if (!id) return alert(ExperimentI18n.t("alert_no_id"));

    participantId = id;
    const chosen = variantSelect.value;
    selectedVariantKey = variants[chosen] ? chosen : "all-at-once-all";
    updateInstructions(selectedVariantKey);
    renderWordsForVariant(selectedVariantKey);

    pendingExperimentCsvWithBom = null;
    pendingVariantLabel = null;
    crsFormBuilt = false;
    crsFormFields.replaceChildren();
    crsForm.reset();
    hideCrsError();
    questionnaireScreen.classList.add("hidden");

    introScreen.classList.add("hidden");
    experimentScreen.classList.remove("hidden");
});

// --- 3. DRAG & DROP LOGIKA ---
axis.addEventListener("dragover", (e) => e.preventDefault());

axis.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const wordEl = document.getElementById(id);

    if (wordEl) {
        axis.appendChild(wordEl);
        wordEl.classList.add("in-axis");

        const rect = axis.getBoundingClientRect();
        let y = e.clientY - rect.top;

        // Omezení v rámci osy
        if (y < 0) y = 0;
        if (y > rect.height) y = rect.height;

        // Hodnota na ose -50 až 50 (50 nahoře, -50 dole), jedno desetinné místo = jemnější rozlišení
        const raw = 50 - (y / rect.height) * 100;
        const score = Math.round(raw * 10) / 10;

        // Umístění podle výšky (uprostřed štítku zarovnáno na pozici puštění); vodorovně jen jeden „sloupec“ (CSS)
        wordEl.style.top = `calc(${(y / rect.height) * 100}% - 15px)`;

        // Uložení skóre pro export
        wordEl.dataset.score = String(score);
        placedWordIds.add(id);

        const variant = variants[selectedVariantKey];
        if (variant.mode === "one-by-one") {
            showNextWordOneByOne();
        }

        checkAllPlaced();
    }
});

function checkAllPlaced() {
    if (placedWordIds.size === activeWords.length && activeWords.length > 0) {
        continueToCrsBtn.classList.remove("hidden");
        requestAnimationFrame(() => {
            continueToCrsBtn.scrollIntoView({ behavior: "smooth", block: "end" });
        });
    }
}

function hideCrsError() {
    if (!crsErrorBanner) return;
    crsErrorBanner.hidden = true;
    crsErrorBanner.textContent = "";
}

function showCrsError(message) {
    if (!crsErrorBanner) return;
    crsErrorBanner.textContent = message;
    crsErrorBanner.hidden = false;
}

function buildExperimentExport() {
    const results = [];
    axis.querySelectorAll(".word").forEach((w) => {
        results.push({
            word: w.textContent,
            category: w.dataset.category,
            score: parseFloat(w.dataset.score)
        });
    });
    results.sort((a, b) => b.score - a.score);

    const v = variants[selectedVariantKey];
    const categoriesInSession = v.categories.join("|");
    const participantVariantNumber =
        variantSelect.selectedOptions[0].textContent.trim() ||
        String(Array.from(variantSelect.options).findIndex((o) => o.value === selectedVariantKey) + 1);

    const uiLang = typeof ExperimentI18n !== "undefined" ? ExperimentI18n.getLang() : "cs";

    let csv =
        "ID_Ucastnika;Jazyk_rozhrani;Varianta_Cislo_Ucastnika;Varianta_Klic;Varianta_Popis;Kategorie_V_Session;Slovo_Kategorie;Slovo;Body_Moc\n";
    results.forEach((r) => {
        csv += `${participantId};${uiLang};${participantVariantNumber};${selectedVariantKey};${v.label};${categoriesInSession};${r.category};${r.word};${r.score}\n`;
    });

    return { csvWithBom: `\uFEFF${csv}`, variantLabel: v.label };
}

function crsCsvEscape(value) {
    const t = String(value).replace(/\r?\n/g, " ").replace(/"/g, '""');
    return `"${t}"`;
}

function getCrsQuestions() {
    if (typeof CRS_QUESTIONS_BY_LANG === "undefined") return [];
    const lang = typeof ExperimentI18n !== "undefined" ? ExperimentI18n.getLang() : "cs";
    return CRS_QUESTIONS_BY_LANG[lang] || CRS_QUESTIONS_BY_LANG.cs || [];
}

function collectCrsAnswersOrError() {
    const list = getCrsQuestions();
    if (!list.length) {
        return { error: ExperimentI18n.t("crs_err_bundle") };
    }
    for (const q of list) {
        const checked = document.querySelector(`input[name="crs_q${q.id}"]:checked`);
        if (!checked) {
            return { error: ExperimentI18n.t("crs_err_missing_answer", { n: q.id }) };
        }
    }
    return { error: null };
}

function buildCrsCsv() {
    const uiLang = typeof ExperimentI18n !== "undefined" ? ExperimentI18n.getLang() : "cs";
    const header =
        "ID_Ucastnika;Jazyk_rozhrani;CRS_Otazka_cislo;CRS_Otazka;CRS_index_odpovede;CRS_odpoved_text";
    const rows = [header];
    for (const q of getCrsQuestions()) {
        const checked = document.querySelector(`input[name="crs_q${q.id}"]:checked`);
        const idx = parseInt(checked.value, 10);
        const text = q.options[idx];
        rows.push(
            [participantId, uiLang, q.id, q.text, idx, text].map(crsCsvEscape).join(";")
        );
    }
    return `\uFEFF${rows.join("\n")}\n`;
}

function renderCrsForm() {
    const list = getCrsQuestions();
    if (!list.length) return;
    crsFormFields.replaceChildren();
    list.forEach((q) => {
        const fieldset = document.createElement("fieldset");
        fieldset.className = "crs-fieldset";

        const legend = document.createElement("legend");
        legend.className = "crs-legend";
        legend.textContent = `${q.id}. ${q.text}`;
        fieldset.appendChild(legend);

        q.options.forEach((optLabel, optIdx) => {
            const row = document.createElement("div");
            row.className = "crs-option";
            const inputId = `crs-q${q.id}-opt${optIdx}`;
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `crs_q${q.id}`;
            input.value = String(optIdx);
            input.id = inputId;
            if (optIdx === 0) input.required = true;

            const label = document.createElement("label");
            label.htmlFor = inputId;
            label.textContent = optLabel;

            row.appendChild(input);
            row.appendChild(label);
            fieldset.appendChild(row);
        });

        crsFormFields.appendChild(fieldset);
    });
    if (typeof ExperimentI18n !== "undefined") {
        ExperimentI18n.applyUiLanguage();
    }
}

// --- 4a. Po dokončení osy → dotazník CRS-15 ---
continueToCrsBtn.addEventListener("click", () => {
    hideCrsError();
    const exp = buildExperimentExport();
    pendingExperimentCsvWithBom = exp.csvWithBom;
    pendingVariantLabel = exp.variantLabel;

    experimentScreen.classList.add("hidden");
    questionnaireScreen.classList.remove("hidden");

    if (!crsFormBuilt) {
        renderCrsForm();
        crsFormBuilt = true;
    }

    window.scrollTo(0, 0);
});

// --- 4b. Odeslání experimentu + CRS jedním e-mailem (Vercel /api/submit) ---
crsForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideCrsError();

    const check = collectCrsAnswersOrError();
    if (check.error) {
        showCrsError(check.error);
        return;
    }

    if (!pendingExperimentCsvWithBom || !pendingVariantLabel) {
        showCrsError(ExperimentI18n.t("crs_err_missing_experiment"));
        return;
    }

    const crsCsvWithBom = buildCrsCsv();

    crsSubmitBtn.disabled = true;

    let emailStatus = "skipped";
    try {
        const submitRes = await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                participantId,
                csv: pendingExperimentCsvWithBom,
                variantLabel: pendingVariantLabel,
                crsCsv: crsCsvWithBom
            })
        });
        const submitJson = await submitRes.json().catch(() => ({}));

        if (submitRes.ok && submitJson.ok) {
            emailStatus = "sent";
        } else if (submitRes.status === 503 && submitJson.code === "not_configured") {
            emailStatus = "skipped";
        } else {
            emailStatus = "failed";
        }
    } catch {
        emailStatus = "failed";
    }

    crsSubmitBtn.disabled = false;

    if (emailStatus === "sent") {
        const container = questionnaireScreen.querySelector(".crs-container");
        if (container) {
            container.replaceChildren();
            const heading = document.createElement("h1");
            heading.className = "crs-title";
            heading.textContent = ExperimentI18n.t("crs_done_title");
            const thanks = document.createElement("p");
            thanks.className = "crs-lead";
            thanks.textContent = ExperimentI18n.t("crs_done_body");
            container.appendChild(heading);
            container.appendChild(thanks);
        }
        return;
    }

    if (emailStatus === "skipped") {
        showCrsError(ExperimentI18n.t("crs_email_not_configured"));
    } else {
        showCrsError(ExperimentI18n.t("crs_email_send_failed"));
    }
});
