const wordsByCategory = {
    bad: ["Násilí", "Válka", "Lež", "Manipulace", "Pomsta", "Zrada", "Útlak", "Krutost", "Prázdnota", "Závist"],
    good: ["Péče", "Objetí", "Komunita", "Vítězství", "Soucit", "Úspěch", "Statečnost", "Naděje", "Svoboda", "Harmonie"],
    neutral: ["Vědomost", "Zákon", "Změna", "Kontrast", "Hranice", "Vztah", "Názor", "List", "Strom", "Dualita"]
};

const wordsData = Object.entries(wordsByCategory).flatMap(([category, words]) =>
    words.map((text) => ({ text, category }))
);

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

const introScreen = document.getElementById("intro-screen");
const experimentScreen = document.getElementById("experiment-screen");
const wordsBank = document.getElementById("words-bank");
const axis = document.getElementById("axis");
const ticksContainer = document.getElementById("axis-ticks");
const finishBtn = document.getElementById("finish-btn");
const variantSelect = document.getElementById("experiment-variant");
const instructionsText = document.querySelector(".instructions p");

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

function sanitizeForId(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .toLowerCase();
}

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
    el.textContent = wordObj.text;
    el.draggable = true;
    el.id = `word-${sanitizeForId(wordObj.text)}`;
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
    removeSubmitErrorBanner();
    wordsBank.innerHTML = "";
    axis.querySelectorAll(".word").forEach((word) => word.remove());
    finishBtn.classList.add("hidden");
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
    const variant = variants[variantKey];
    if (variant.mode === "all-at-once") {
        instructionsText.textContent =
            "Seřaďte všechna zobrazená slova na vertikální osu. Pozici můžete upravit opětovným přetažením.";
    } else {
        instructionsText.textContent =
            "Seřaďte každé zobrazené slovo na vertikální osu. Pozici můžete upravit opětovným přetažením.";
    }
}

// --- 2. START EXPERIMENTU ---
document.getElementById("start-btn").addEventListener("click", () => {
    const id = document.getElementById("participant-id").value.trim();
    if (!id) return alert("Zadejte ID účastníka");

    participantId = id;
    const chosen = variantSelect.value;
    selectedVariantKey = variants[chosen] ? chosen : "all-at-once-all";
    updateInstructions(selectedVariantKey);
    renderWordsForVariant(selectedVariantKey);

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
        finishBtn.classList.remove("hidden");
        // Po přidání tlačítka může být patička pod ohybem okna (100svh + overflow dříve hidden).
        requestAnimationFrame(() => {
            finishBtn.scrollIntoView({ behavior: "smooth", block: "end" });
        });
    }
}

function removeSubmitErrorBanner() {
    document.getElementById("submit-error-banner")?.remove();
}

function showSubmitErrorBanner(message) {
    removeSubmitErrorBanner();
    const banner = document.createElement("div");
    banner.id = "submit-error-banner";
    banner.className = "submit-error-banner";
    banner.setAttribute("role", "alert");
    banner.textContent = message;
    const instructionsBlock = document.querySelector("#experiment-screen .instructions");
    instructionsBlock?.insertAdjacentElement("afterend", banner);
}

// --- 4. Odeslání výsledků (Vercel /api/submit → e-mail přes Resend, bez stahování souboru) ---
finishBtn.addEventListener("click", async () => {
    const results = [];
    axis.querySelectorAll(".word").forEach((w) => {
        results.push({
            word: w.textContent,
            category: w.dataset.category,
            score: parseFloat(w.dataset.score)
        });
    });

    // Seřazení výsledků od největšího (50) po nejmenšího (-50)
    results.sort((a, b) => b.score - a.score);

    const v = variants[selectedVariantKey];
    const categoriesInSession = v.categories.join("|");
    const participantVariantNumber =
        variantSelect.selectedOptions[0].textContent.trim() ||
        String(Array.from(variantSelect.options).findIndex((o) => o.value === selectedVariantKey) + 1);

    let csv =
        "ID_Ucastnika;Varianta_Cislo_Ucastnika;Varianta_Klic;Varianta_Popis;Kategorie_V_Session;Slovo_Kategorie;Slovo;Body_Moc\n";
    results.forEach((r) => {
        csv += `${participantId};${participantVariantNumber};${selectedVariantKey};${v.label};${categoriesInSession};${r.category};${r.word};${r.score}\n`;
    });

    const csvWithBom = `\uFEFF${csv}`;

    removeSubmitErrorBanner();
    finishBtn.disabled = true;

    let emailStatus = "skipped";
    try {
        const submitRes = await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                participantId,
                csv: csvWithBom,
                variantLabel: v.label
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

    if (emailStatus === "sent") {
        experimentScreen.replaceChildren();

        const heading = document.createElement("h1");
        heading.textContent = "Hotovo!";
        experimentScreen.appendChild(heading);

        const thanks = document.createElement("p");
        thanks.textContent =
            "Děkujeme. Vaše odpovědi byly odeslány výzkumníkovi e-mailem. Můžete zavřít okno prohlížeče.";
        experimentScreen.appendChild(thanks);
        return;
    }

    finishBtn.disabled = false;

    if (emailStatus === "skipped") {
        showSubmitErrorBanner(
            "Odeslání na server není nastavené. Informujte prosím výzkumníka (chybí konfigurace e-mailu na serveru)."
        );
    } else {
        showSubmitErrorBanner(
            "Odeslání se nepodařilo. Zkuste prosím znovu kliknout na „Odeslat výsledky“. Pokud to nepomůže, informujte výzkumníka."
        );
    }
});
