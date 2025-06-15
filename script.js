const macarroes = [
    { name: 'Espaguete', img: 'ESPAGUETE.jpeg' },
    { name: 'Parafuso', img: 'PARAFUSO.jpeg' },
    { name: 'Rigatoni', img: 'RIGATONE.jpeg' },
    { name: 'Talharim', img: 'TALHARIM.jpeg' },
    { name: 'Lasanha Paulista', img: 'LASANHA.jpeg' },
    { name: 'Espiral', img: 'ESPIRAL.jpeg' }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 20;
let selectedMacarrao = '';

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function showQuestion() {
    const current = macarroes[currentQuestion];
    document.getElementById('question').textContent = `Qual dessas é a embalagem de ${current.name}?`;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    macarroes.forEach(macarrao => {
        const option = document.createElement('div');
        option.classList.add('option');
        const img = document.createElement('img');
        img.src = macarrao.img;
        img.alt = macarrao.name;
        img.onclick = () => selectAnswer(macarrao.name);
        option.appendChild(img);
        optionsContainer.appendChild(option);
    });
    startTimer();
}

function selectAnswer(name) {
    selectedMacarrao = name;
    clearInterval(timer);
    checkAnswer();
}

function checkAnswer() {
    const current = macarroes[currentQuestion];
    const feedback = document.getElementById('feedback');

    if (selectedMacarrao === current.name) {
        feedback.innerHTML = `<span class="correct">✔ Acertou!</span>`;
        score++;
    } else {
        feedback.innerHTML = `<span class="incorrect">✘ Errou! A resposta certa era ${current.name}</span>`;
    }

    setTimeout(() => {
        feedback.innerHTML = '';
        currentQuestion++;
        if (currentQuestion < macarroes.length) {
            timeLeft = 20;
            showQuestion();
        } else {
            document.getElementById('question').textContent = `Fim de jogo! Sua pontuação final é: ${score}`;
            document.getElementById('options').innerHTML = '';
            document.getElementById('time').textContent = '0';
        }
    }, 2000);
}

showQuestion();