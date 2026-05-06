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
            text: "Jak moc se zajímáte o náboženská témata z osobního zájmu?",
            options: ["Vůbec ne", "Mírně", "Středně", "Silně", "Velmi silně"]
        },
        {
            id: 3,
            text: "Jak často vyhledáváte informace o náboženských otázkách (např. prostřednictvím médií, knih, diskusí)?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 4,
            text: "Do jaké míry věříte v existenci dobra a zla jako samostatných, nezávislých sil v náboženském smyslu?",
            options: ["Vůbec nevěřím", "Spíše nevěřím", "Nejsem si jist", "Spíše věřím", "Určitě věřím"]
        },
        {
            id: 5,
            text: "Do jaké míry věříte v posmrtný život (např. nesmrtelnost duše, vzkříšení)?",
            options: ["Vůbec nevěřím", "Spíše nevěřím", "Nejsem si jist", "Spíše věřím", "Určitě věřím"]
        },
        {
            id: 6,
            text: "Jaká je podle vás pravděpodobnost, že Bůh nebo božská spravedlnost skutečně existuje?",
            options: ["0 % (určitě ne)", "25 %", "50 %", "75 %", "100 % (určitě ano)"]
        },
        {
            id: 7,
            text: "Jak často se účastníte náboženských obřadů (např. bohoslužby, modlitby v komunitě)?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 8,
            text: "Jak důležité je pro vás účastnit se náboženských obřadů?",
            options: [
                "Vůbec není důležité",
                "Mírně důležité",
                "Středně důležité",
                "Důležité",
                "Velmi důležité"
            ]
        },
        {
            id: 9,
            text: "Jak často se modlíte (nebo praktikujete jinou formu soukromé náboženské praxe)?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 10,
            text: "Jak důležitá je pro vás osobní modlitba?",
            options: [
                "Vůbec není důležitá",
                "Mírně důležitá",
                "Středně důležitá",
                "Důležitá",
                "Velmi důležitá"
            ]
        },
        {
            id: 11,
            text: "Jak často se modlíte spontánně, když vás k tomu inspirují každodenní situace?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 12,
            text: "Jak často zažíváte situace, v nichž máte pocit, že Bůh nebo něco božského zasahuje do vašeho života?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 13,
            text: "Jak často zažíváte situace, v nichž máte pocit, že jste v jednotě se vším v náboženském či duchovním smyslu?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 14,
            text: "Jak často zažíváte situace, v nichž máte pocit, že se vás dotýká božská síla?",
            options: ["Nikdy", "Zřídka", "Občas", "Často", "Velmi často"]
        },
        {
            id: 15,
            text: "Jak často máte pocit, že jsou dobro a zlo v náboženském kontextu v rovnováze?",
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
            text: "How interested are you in religious topics out of personal interest?",
            options: ["Not at all", "Slightly", "Moderately", "Strongly", "Very strongly"]
        },
        {
            id: 3,
            text: "How often do you seek information about religious questions (e.g. via media, books, discussions)?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 4,
            text: "To what extent do you believe in the existence of good and evil as separate, independent forces in a religious sense?",
            options: [
                "I do not believe at all",
                "I rather do not believe",
                "I am not sure",
                "I rather believe",
                "I definitely believe"
            ]
        },
        {
            id: 5,
            text: "To what extent do you believe in an afterlife (e.g. immortality of the soul, resurrection)?",
            options: [
                "I do not believe at all",
                "I rather do not believe",
                "I am not sure",
                "I rather believe",
                "I definitely believe"
            ]
        },
        {
            id: 6,
            text: "In your opinion, how likely is it that God or divine justice truly exists?",
            options: ["0% (definitely not)", "25%", "50%", "75%", "100% (definitely yes)"]
        },
        {
            id: 7,
            text: "How often do you participate in religious ceremonies (e.g. worship services, prayer in a community)?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 8,
            text: "How important is it for you to participate in religious ceremonies?",
            options: [
                "Not important at all",
                "Slightly important",
                "Moderately important",
                "Important",
                "Very important"
            ]
        },
        {
            id: 9,
            text: "How often do you pray (or practice another form of private religious practice)?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 10,
            text: "How important is personal prayer for you?",
            options: [
                "Not important at all",
                "Slightly important",
                "Moderately important",
                "Important",
                "Very important"
            ]
        },
        {
            id: 11,
            text: "How often do you pray spontaneously when inspired by everyday situations?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 12,
            text: "How often do you experience situations in which you feel that God or something divine intervenes in your life?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 13,
            text: "How often do you experience situations in which you feel that you are in unity with everything in a religious or spiritual sense?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 14,
            text: "How often do you experience situations in which you feel touched by a divine power?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        },
        {
            id: 15,
            text: "How often do you feel that good and evil are in balance in a religious context?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very often"]
        }
    ]
};
