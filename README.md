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

## Struktura souborů

| Soubor       | Účel |
|--------------|------|
| `index.html` | Stránky, úvodní formulář (ID + volba 1–6), rozložení experimentu |
| `style.css`  | Vzhled, responzivní layout, osa a karty slov |
| `script.js`  | Slovníky kategorií, varianty, náhodné pořadí, drag & drop, výpočet skóre, CSV export |

## Jak aplikaci spustit

1. Otevřete složku projektu v počítači.
2. **Nejjednodušeji:** dvojklik na **`index.html`** v prohlížeči (některé prohlížeče omezují lokální skripty; pokud něco nefunguje, použijte lokální server).
3. **Spolehlivěji:** lokální HTTP server (např. rozšíření Live Server ve VS Code / Cursor, nebo `python -m http.server` ve složce projektu).

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
