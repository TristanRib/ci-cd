const sendBtn = document.getElementById('sendBtn');
const promptInput = document.getElementById('prompt');
const resultEl = document.getElementById('result');

sendBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return alert("Écris quelque chose !");

    resultEl.textContent = "Chargement…";

    try {
        const res = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        resultEl.textContent = data.response || JSON.stringify(data, null, 2);
    } catch (err) {
        resultEl.textContent = "Erreur : " + err.message;
    }
});
