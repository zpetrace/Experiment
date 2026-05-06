/**
 * UI language: Čeština / English. Stimulus words on the axis use Czech or English by selection; CRS + chrome follow UI language.
 * Persists in localStorage under experiment-lang (cs | en).
 */
(function () {
    const STORAGE_KEY = "experiment-lang";

    const messages = {
        cs: {
            page_title: "Experiment",
            intro_title: "Experiment",
            intro_id_prompt: "Zadejte prosím své identifikační číslo:",
            intro_id_placeholder: "ID účastníka",
            intro_variant_label: "Vyberte variantu:",
            intro_start: "Vstoupit do experimentu",
            lang_hint: "Jazyk rozhraní:",
            lang_cs: "Čeština",
            lang_en: "English",

            sidebar_words_heading: "Slova k roztřídění",
            instr_exp_all:
                "Seřaďte všechna zobrazená slova na vertikální osu. Pozici můžete upravit opětovným přetažením.",
            instr_exp_one:
                "Seřaďte každé zobrazené slovo na vertikální osu. Pozici můžete upravit opětovným přetažením.",

            continue_crs: "Pokračovat k dotazníku",

            crs_screen_title: "Dotazníkové otázky",
            crs_screen_lead:
                "Prosím, odpovězte upřímně a samostatně na každou otázku. Odpovědi jsou anonymní a budou použity pouze pro vědecké účely. Označte svou odpověď u následujících otázek.",
            crs_submit: "Odeslat výsledky",

            crs_done_title: "Hotovo!",
            crs_done_body:
                "Děkujeme. Odpovědi z experimentu i z dotazníku CRS-15 byly odeslány výzkumníkovi pod vaším identifikačním číslem. Můžete zavřít okno prohlížeče.",

            alert_no_id: "Zadejte ID účastníka",

            crs_err_bundle: "Chybí data dotazníku (CRS). Obnovte stránku.",
            crs_err_missing_answer: "Prosím doplňte odpověď na otázku č. {{n}}.",
            crs_err_missing_experiment:
                "Chybí data z experimentu. Obnovte stránku a zopakujte úlohu od začátku.",

            crs_email_not_configured:
                "Odeslání na server není nastavené. Informujte prosím výzkumníka (chybí konfigurace e-mailu na serveru).",
            crs_email_send_failed:
                "Odeslání se nepodařilo. Zkuste prosím znovu kliknout na „Odeslat výsledky“. Pokud to nepomůže, informujte výzkumníka."
        },
        en: {
            page_title: "Experiment",
            intro_title: "Experiment",
            intro_id_prompt: "Please enter your participant ID:",
            intro_id_placeholder: "Participant ID",
            intro_variant_label: "Choose condition:",
            intro_start: "Begin experiment",
            lang_hint: "Interface language:",
            lang_cs: "Czech",
            lang_en: "English",

            sidebar_words_heading: "Words to sort",
            instr_exp_all:
                "Place all shown words on the vertical axis. You can adjust a word by dragging it again.",
            instr_exp_one:
                "Place each shown word on the vertical axis. You can adjust a word by dragging it again.",

            continue_crs: "Continue to questionnaire",

            crs_screen_title: "Questionnaire Items",
            crs_screen_lead:
                "Please answer each question honestly and independently. Responses are anonymous and will be used for scientific purposes only. Mark your answer for the following questions.",
            crs_submit: "Submit responses",

            crs_done_title: "Thank you",
            crs_done_body:
                "Your word-sorting task and CRS-15 responses have been sent to the researcher under your participant ID. You may close the browser window.",

            alert_no_id: "Please enter your participant ID",

            crs_err_bundle: "Questionnaire data are missing. Please reload the page.",
            crs_err_missing_answer: "Please answer question {{n}}.",
            crs_err_missing_experiment:
                "Experiment data are missing. Please reload the page and start again.",

            crs_email_not_configured:
                "The server is not configured to send e-mail. Please contact the researcher.",
            crs_email_send_failed:
                "Sending failed. Please try “Submit responses” again, or contact the researcher."
        }
    };

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "cs";
    }

    function setLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang === "en" ? "en" : "cs");
        applyUiLanguage();
    }

    function t(key, vars) {
        const lang = getLang();
        let s = (messages[lang] && messages[lang][key]) || messages.cs[key] || key;
        if (vars) {
            Object.keys(vars).forEach((k) => {
                s = s.split(`{{${k}}}`).join(String(vars[k]));
            });
        }
        return s;
    }

    function applyUiLanguage() {
        const lang = getLang();
        document.documentElement.lang = lang === "en" ? "en" : "cs";
        document.title = t("page_title");

        const set = (id, key, vars) => {
            const el = document.getElementById(id);
            if (el) el.textContent = t(key, vars);
        };

        set("i18n-intro-title", "intro_title");
        set("i18n-intro-id-prompt", "intro_id_prompt");
        set("i18n-intro-variant-label", "intro_variant_label");
        set("i18n-lang-hint", "lang_hint");
        set("i18n-start-btn", "intro_start");
        set("i18n-exp-sidebar-h3", "sidebar_words_heading");
        set("i18n-continue-crs-btn", "continue_crs");
        set("i18n-crs-title", "crs_screen_title");
        set("i18n-crs-lead", "crs_screen_lead");
        set("i18n-crs-submit-btn", "crs_submit");

        const pid = document.getElementById("participant-id");
        if (pid) pid.placeholder = t("intro_id_placeholder");

        const bcs = document.getElementById("lang-btn-cs");
        const ben = document.getElementById("lang-btn-en");
        if (bcs) bcs.textContent = t("lang_cs");
        if (ben) ben.textContent = t("lang_en");

        document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
            const active = btn.getAttribute("data-lang-btn") === lang;
            btn.classList.toggle("lang-btn-active", active);
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    window.ExperimentI18n = {
        getLang,
        setLang,
        t,
        applyUiLanguage
    };

    document.addEventListener("DOMContentLoaded", () => {
        applyUiLanguage();
        document.getElementById("lang-btn-cs")?.addEventListener("click", () => setLang("cs"));
        document.getElementById("lang-btn-en")?.addEventListener("click", () => setLang("en"));
    });
})();
