/**
 * CRS-15 — znění otázek a odpovědí (pořadí odpovědí = pořadí v dotazníku).
 * Používá script.js pro vykreslení formuláře a export CSV.
 */
const CRS_QUESTIONS = [
    {
        id: 1,
        text: "Jak často přemýšlíte o náboženských otázkách?",
        options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
    },
    {
        id: 2,
        text: "Jak moc se zajímáte o to, abyste se dozvěděli více o náboženských tématech?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 3,
        text: "Jak často se informujete o náboženských otázkách prostřednictvím rádia, televize, internetu, novin nebo knih?",
        options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
    },
    {
        id: 4,
        text: "Do jaké míry věříte, že existuje Bůh nebo něco božského?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 5,
        text: "Do jaké míry věříte v posmrtný život (např. nesmrtelnost duše, vzkříšení z mrtvých nebo reinkarnaci)?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 6,
        text: "Jak pravděpodobné je podle vašeho názoru, že skutečně existuje vyšší moc?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 7,
        text: "Jak často se účastníte bohoslužeb nebo náboženských obřadů?",
        options: [
            "Více než jednou týdně",
            "Jednou týdně",
            "Jednou až třikrát měsíčně",
            "Několikrát ročně",
            "Méně často",
            "Nikdy"
        ]
    },
    {
        id: 8,
        text: "Jak důležitá je pro vás účast na bohoslužbách / náboženských obřadech?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 9,
        text: "Jak důležité je pro vás být ve spojení s náboženskou komunitou?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 10,
        text: "Jak často se modlíte?",
        options: [
            "Několikrát denně",
            "Jednou denně",
            "Více než jednou týdně",
            "Jednou týdně",
            "Jednou až třikrát měsíčně",
            "Několikrát ročně",
            "Méně často",
            "Nikdy"
        ]
    },
    {
        id: 11,
        text: "Jak důležitá je pro vás osobní modlitba?",
        options: ["Vůbec ne", "Nepříliš", "Středně", "Docela dost", "Velmi"]
    },
    {
        id: 12,
        text: "Jak často se spontánně modlíte, když vás k tomu inspirují každodenní situace?",
        options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
    },
    {
        id: 13,
        text: "Jak často zažíváte situace, ve kterých máte pocit, že Bůh nebo něco božského zasahuje do vašeho života?",
        options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
    },
    {
        id: 14,
        text: "Jak často zažíváte situace, ve kterých máte pocit, že Bůh nebo něco božského se vám snaží něco sdělit nebo odhalit?",
        options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
    },
    {
        id: 15,
        text: "Jak často zažíváte situace, ve kterých máte pocit, že Bůh nebo něco božského je přítomno?",
        options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
    }
];
