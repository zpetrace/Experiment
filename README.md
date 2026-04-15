# Experiment: Sémantické hodnocení moci (Power)

Tato webová aplikace slouží k psycholingvistickému experimentu, ve kterém účastníci seřazují seznam slov na vertikální ose podle toho, jakou míru "moci" (power) danému pojmu přisuzují.

## 🚀 Funkcionalita
- **Úvodní obrazovka:** Sběr registračního čísla účastníka.
- **Drag & Drop rozhraní:** Účastník přetahuje slova ze zásobníku na vertikální osu (0–100 bodů).
- **Interaktivita:** Slova lze na ose libovolně přesouvat nebo je vracet zpět do zásobníku.
- **Validace:** Tlačítko pro dokončení se zobrazí až po umístění všech slov na osu.
- **Export dat:** Automatické generování a stažení souboru `.csv` se seřazenými výsledky.

## 📂 Struktura souborů
- `index.html` – Struktura stránek a uživatelského rozhraní.
- `style.css` – Vizuální styl, design osy a karet se slovy.
- `script.js` – Logika experimentu, výpočty pozic a export dat.

## 🛠️ Jak aplikaci spustit
1. Stáhněte/naklonujte celou složku `experiment`.
2. **Možnost A (Jednoduchá):** Dvakrát klikněte na soubor `index.html` ve svém prohlížeči.
3. **Možnost B (Vývojářská):** Otevřete složku ve VS Code a použijte rozšíření **Live Server** pro lokální hostování.

## 📊 Export dat (CSV)
Výsledný soubor je pojmenován jako `vysledky_[ID].csv` a obsahuje:
- **ID_Ucastnika:** Registrační číslo zadané na začátku.
- **Slovo:** Konkrétní hodnocený pojem.
- **Body_Moc:** Číselná hodnota 0–100 (0 = nejméně moci, 100 = nejvíce moci).

### Technické poznámky k exportu:
- **Kódování:** Soubor je exportován v UTF-8 s příznakem BOM. To zajišťuje, že se **česká diakritika zobrazí správně** při přímém otevření v aplikaci Microsoft Excel.
- **Řazení:** Data v CSV jsou automaticky seřazena sestupně (od nejmocnějšího po nejméně mocné).
- **Oddělovač:** Jako oddělovač je použit středník (`;`).

## ⚙️ Úpravy experimentu
Seznam slov můžete snadno změnit v souboru `script.js` na prvním řádku:
```javascript
const wordsList = ["Prezident", "Král", "Sluha", ...];

📝 Licence
Tento nástroj byl vytvořen pro vědecké a studijní účely.