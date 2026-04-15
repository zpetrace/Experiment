const wordsList = ["Prezident", "Král", "Sluha", "Vězeň", "Soudce", "Dítě", "Boháč", "Bezdomovec"];
let participantId = "";

const introScreen = document.getElementById('intro-screen');
const experimentScreen = document.getElementById('experiment-screen');
const wordsBank = document.getElementById('words-bank');
const axis = document.getElementById('axis');
const ticksContainer = document.getElementById('axis-ticks');
const finishBtn = document.getElementById('finish-btn');

// --- 1. VYTVOŘENÍ STUPNICE NA OSE ---
function createTicks() {
    for (let i = 100; i >= 0; i -= 10) {
        const tick = document.createElement('div');
        tick.textContent = i;
        ticksContainer.appendChild(tick);
    }
}
createTicks();

// --- 2. START EXPERIMENTU ---
document.getElementById('start-btn').addEventListener('click', () => {
    const id = document.getElementById('participant-id').value.trim();
    if (!id) return alert("Zadejte ID účastníka");
    participantId = id;
    introScreen.classList.add('hidden');
    experimentScreen.classList.remove('hidden');
});

// --- 3. GENEROVÁNÍ SLOV ---
wordsList.forEach(wordText => {
    const el = document.createElement('div');
    el.className = 'word';
    el.textContent = wordText;
    el.draggable = true;
    el.id = 'word-' + wordText;

    el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', el.id);
    });

    wordsBank.appendChild(el);
});

// --- 4. DRAG & DROP LOGIKA ---
axis.addEventListener('dragover', e => e.preventDefault());

axis.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const wordEl = document.getElementById(id);
    
    if (wordEl) {
        axis.appendChild(wordEl);
        wordEl.classList.add('in-axis');
        
        const rect = axis.getBoundingClientRect();
        let y = e.clientY - rect.top;
        
        // Omezení v rámci osy
        if (y < 0) y = 0;
        if (y > rect.height) y = rect.height;

        // Výpočet skóre (převrácená hodnota, protože 0px je nahoře)
        const score = Math.round((1 - (y / rect.height)) * 100);
        
        // Umístění (centrovaně)
        wordEl.style.top = `calc(${(y / rect.height) * 100}% - 15px)`;
        wordEl.style.left = "10px"; // Mírně od kraje osy
        
        // Uložíme si skóre přímo do elementu pro pozdější export
        wordEl.dataset.score = score;
        
        checkAllPlaced();
    }
});

function checkAllPlaced() {
    if (wordsBank.querySelectorAll('.word').length === 0) {
        finishBtn.classList.remove('hidden');
    }
}

// --- 5. EXPORT DAT ---
finishBtn.addEventListener('click', () => {
    const results = [];
    axis.querySelectorAll('.word').forEach(w => {
        results.push({ 
            word: w.textContent, 
            score: parseInt(w.dataset.score) // Převedeme textové skóre na číslo
        });
    });

    // NOVÉ: Seřazení výsledků od největšího (100) po nejmenší (0)
    results.sort((a, b) => b.score - a.score);

    // Formátování CSV
    let csv = "ID_Ucastnika;Slovo;Body_Moc\n";
    results.forEach(r => {
        csv += `${participantId};${r.word};${r.score}\n`;
    });

    // Stažení s opravenou češtinou pro Excel (přidán BOM z předchozího kroku)
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `vysledky_${participantId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    experimentScreen.innerHTML = `<h1>Hotovo!</h1><p>Data účastníka ${participantId} byla stažena do vašeho počítače.</p>`;
});
