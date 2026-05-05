# Experiment: Sémantické hodnocení slov

Webová aplikace pro sběr dat v psycholingvistickém / religionistickém experimentu: účastníci umisťují slova na vertikální osu podle vnímané polarity (např. „dobré“ vs. „špatné“ vzhledem k výzkumné otázce).

## Funkcionalita

### Úvodní obrazovka
- Zadání **ID účastníka**.
- Volba **varianty experimentu** jako čísla **1–6** (účastník nevidí názvy kategorií ani technický popis režimu).

### Slova a kategorie
- Slovní podněty jsou ve skriptu rozdělená do tří kategorií: **`good`**, **`bad`**, **`neutral`** (interní označení pro výzkumníka a export).
- Na obrazovce účastník vidí jen **text slova**, ne jeho kategorii.

### Šest variant experimentu
Účastník volí číslo; v datech je uložen překlad na plný popis:

| Číslo (UI) | Režim zobrazení slov | Kategorie ve stimulech |
|------------|----------------------|-------------------------|
| 1 | Všechna slova najednou | neutral, good, bad |
| 2 | Všechna slova najednou | neutral, good |
| 3 | Všechna slova najednou | neutral, bad |
| 4 | Po jednom | neutral, good, bad |
| 5 | Po jednom | neutral, good |
| 6 | Po jednom | neutral, bad |

- Ve variantě **po jednom** se po umístění slova na osu zobrazí další náhodně vybrané slovo z povolených kategorií.
- Pořadí stimulů je vždy **náhodně zamíchané** v rámci vybraných kategorií (nezůstává seskupení podle typu).

### Vertikální osa a skóre
- Stupnice je **−50 až +50**, **0 uprostřed** (kladné hodnoty směrem nahoru, záporné dolů), dílky stupnice po **10**.
- Výsledná hodnota z umístění má **jedno desetinné místo** (jemňší rozlišení než celá čísla).
- Slova na ose jdou **znovu přetažením upravit**; dokončení se počítá podle toho, že každé slovo bylo na osu **alespoň jednou** umístěno.

### Rozhraní a rozvržení
- **Drag & drop** ze zásobníku na osu (HTML5).
- Experimentová obrazovka vyplní výšku okna (**`100svh`**): celá osa od horního po dolní konec stupnice je **vidět najednou** bez vertikálního posunu stránky kvůli ose.
- Levý panel (zásobník a instrukce) má vlastní posuvník, pokud je obsahu hodně; na úzkých displejích je pod osou (**media query** cca **720px**).
- Šířka osy se mění podle zařízení (**CSS `clamp`** na šířku osu).

### Dokončení a export
- Tlačítko **„Uložit a stáhnout data“** se zobrazí až po umístění všech slov aktuální varianty na osu.
- Vygeneruje se soubor **`vysledky_[ID].csv`** (UTF-8 s **BOM** kvůli Excelu), oddělovač polí **`;`**, řádky seřazené **sestupně podle skóre**.
- Při nasazení na **Vercel** se stejná data po dokončení navíc pokusí odeslat na serverovou funkci **`/api/submit`**, která je doručí na váš e-mail přes službu **Resend** (viz níže). Lokální otevření bez této služby pouze stáhne CSV.

## Struktura souborů

| Soubor / složka | Účel |
|-----------------|------|
| `index.html` | Stránky, úvodní formulář (ID + volba 1–6), rozložení experimentu |
| `style.css` | Vzhled, responzivní layout, osa a karty slov |
| `script.js` | Slovníky kategorií, varianty, náhodné pořadí, drag & drop, výpočet skóre, CSV export a volání API |
| `api/submit.js` | **Serverless funkce (Vercel):** přijme CSV v JSON a odešle ho e-mailem (Resend) |
| `package.json` | Závislost `resend` pro e-mailovou funkci |

## Jak aplikaci spustit

1. Otevřete složku projektu v počítači.
2. **Nejjednodušeji:** dvojklik na **`index.html`** v prohlížeči (některé prohlížeče omezují lokální skripty; pokud něco nefunguje, použijte lokální server).
3. **Spolehlivěji:** lokální HTTP server (např. rozšíření Live Server ve VS Code / Cursor, nebo `python -m http.server` ve složce projektu).
4. **S e-mailem výsledků:** spusťte `npm install`, zkopírujte **`.env.example`** na **`.env.local`**, doplňte klíče a spusťte **`vercel dev`** v kořeni projektu — pak `fetch("/api/submit")` funguje lokálně stejně jako na produkci.

## Nasazení na Vercel a odesílání výsledků e-mailem (Resend)

Webové rozhraní zůstává statické; na Vercelu se nasazuje i složka **`api/`** jako serverless funkce.

### Postup na Vercelu

1. Účet na [vercel.com](https://vercel.com), propojení s Git repozitářem nebo nasazení příkazem `vercel`.
2. **Root projektu** = kořen s `index.html` a `package.json`. Při deployi Vercel spustí **`npm install`** a nasadí funkci **`/api/submit`**.
3. V projektu na Vercelu: **Settings → Environment Variables** nastavte:

| Proměnná | Význam |
|----------|--------|
| **`RESEND_API_KEY`** | API klíč z [resend.com/api-keys](https://resend.com/api-keys) |
| **`RESULTS_EMAIL`** | Adresa(y), kam mají chodit CSV (více adres oddělte čárkou) |
| **`RESEND_FROM`** *(doporučeno)* | Odesílatel podle formátu Resend (např. „Experiment“ + ověřená doména). Bez ověřené domény používejte nejdřív jejich návod v dokumentaci; jinak zůstává omezený sandbox režim. |

   Pokud **`RESEND_FROM`** nenastavíte, funkce použije výchozí sandbox adresu Resend — ta má **přísná omezení** (typicky jen na váš vlastní ověřený účet). Do ostrého sběru dat počítejte s **ověřenou doménou** a vlastním **`RESEND_FROM`**.

4. Po nasazení ověřte dokončení experimentu v anonymním okně; v doručené poště by měl být přílohou soubor **`vysledky_[ID].csv`**.

### Chráněné údaje (GDPR)

Do e-mailu i CSV jdou identifikátor účastníka a jeho odpovědi. Používejte ID tak, aby **nešlo snadno spojit s konkrétní osobou**, pokud to váš etický protokol vyžaduje, a uchovávejte data podle pravidel školy / GDPR.

### Bez nastavení env proměnných

Pokud **`RESEND_API_KEY`** nebo **`RESULTS_EMAIL`** chybí, API vrátí stav **503** a účastník **u sebe stejně stáhne CSV**; na konci se nezobrazí potvrzení o e-mailu (nebo se zobrazí varování při chybě odeslání).

## Export dat (CSV)

Hlavička souboru obsahuje mimo jiné:

- **`ID_Ucastnika`** – zadané ID.
- **`Varianta_Cislo_Ucastnika`** – volba **1–6**, jak ji viděl účastník.
- **`Varianta_Klic`** – interní klíč varianty (např. `one-by-one-neutral-good`).
- **`Varianta_Popis`** – čitelný popis pro výzkumníka (např. režim + sada kategorií).
- **`Kategorie_V_Session`** – které kategorie stimulů byly ve zvolené variantě aktivní (oddělené `|`).
- **`Slovo_Kategorie`** – interní kategorie konkrétního slova (`neutral` / `good` / `bad`).
- **`Slovo`** – text stimulu.
- **`Body_Moc`** – hodnota na ose **−50 až 50** (desetinné číslo).

Technické poznámky: UTF-8 s BOM; řazení výsledků v CSV podle skóre sestupně; oddělovač **`;`**.

## Úpravy experimentu

### Změna slovníčku
Upravte objekt **`wordsByCategory`** v souboru **`script.js`** – pole řetězců pod klíči **`neutral`**, **`good`**, **`bad`**. Strukturu **`wordsData`** měnit nemusíte; skládá se automaticky.

### Změna variant (pro výzkumníka)
Objekt **`variants`** ve **`script.js`** definuje pro každou variantu:
- **`label`** – text do CSV a do vlastní dokumentace,
- **`mode`** – **`all-at-once`** nebo **`one-by-one`**,
- **`categories`** – které ze tří kategorií jsou ve stimulech.

Čísla **1–6** na úvodní obrazovce musí odpovídat pořadí **`option`** prvků v **`index.html`** (`value` = klíč ve **`variants`**).

---

Tento nástroj byl připraven pro vědecké a studijní účely.
