/**
 * CRS-15 — Czech and English wording (same item order and option order per question).
 */
const CRS_QUESTIONS_BY_LANG = {
    cs: [
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
    ],
    en: [
        {
            id: 1,
            text: "How often do you think about religious questions?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 2,
            text: "How interested are you in learning more about religious topics?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 3,
            text: "How often do you seek information about religious issues via radio, TV, the Internet, newspapers, or books?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 4,
            text: "To what extent do you believe that God or something divine exists?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 5,
            text: "To what extent do you believe in an afterlife (e.g. immortality of the soul, resurrection of the dead, or reincarnation)?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 6,
            text: "How likely do you think it is that a higher power truly exists?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 7,
            text: "How often do you attend worship services or religious ceremonies?",
            options: [
                "More than once a week",
                "Once a week",
                "One to three times a month",
                "Several times a year",
                "Less often",
                "Never"
            ]
        },
        {
            id: 8,
            text: "How important is it for you to attend worship services / religious ceremonies?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 9,
            text: "How important is it for you to be connected with a religious community?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 10,
            text: "How often do you pray?",
            options: [
                "Several times a day",
                "Once a day",
                "More than once a week",
                "Once a week",
                "One to three times a month",
                "Several times a year",
                "Less often",
                "Never"
            ]
        },
        {
            id: 11,
            text: "How important is personal prayer for you?",
            options: ["Not at all", "Not much", "Moderately", "Quite a bit", "Very much"]
        },
        {
            id: 12,
            text: "How often do you spontaneously pray when everyday situations inspire you to?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 13,
            text: "How often do you experience situations in which you feel that God or something divine intervenes in your life?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 14,
            text: "How often do you experience situations in which you feel that God or something divine is trying to tell or reveal something to you?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 15,
            text: "How often do you experience situations in which you feel that God or something divine is present?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        }
    ]
};
