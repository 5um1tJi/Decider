let cards = [];

function addCard() {
    const input = document.getElementById('optionInput');
    const value = input.value.trim();

    if (value) {
        cards.push(value);
        updateCards();
        input.value = '';
    }
}

function updateCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    cards.forEach((text, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('card-content');
        front.textContent = text;

        const back = document.createElement('div');
        back.classList.add('card-back');
        back.textContent = "🎴"; // Initially hidden

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => removeCard(index);

        card.appendChild(front);
        card.appendChild(back);
        card.appendChild(deleteBtn);
        container.appendChild(card);
    });
}

function removeCard(index) {
    cards.splice(index, 1);
    updateCards();
}

function pickRandom() {
    if (cards.length === 0) {
        document.getElementById('result').textContent = "Add some options first!";
        return;
    }

    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.card-back').textContent = "🎴";
    });

    let shuffleCount = 10;
    let positions = [];
    allCards.forEach((card, index) => {
        positions.push({ x: card.offsetLeft, y: card.offsetTop });
    });

    let shuffleInterval = setInterval(() => {
        allCards.forEach((card, i) => {
            let randomIndex = Math.floor(Math.random() * allCards.length);
            let temp = positions[i];
            positions[i] = positions[randomIndex];
            positions[randomIndex] = temp;

            card.style.transform = `translate(${positions[i].x - card.offsetLeft}px, ${positions[i].y - card.offsetTop}px)`;
        });
    }, 200);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        allCards.forEach((card, i) => {
            card.style.transition = "transform 0.5s ease-in-out";
            card.style.transform = "";
        });

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * cards.length);
            const chosenCard = allCards[randomIndex];
            chosenCard.classList.add('flipped');
            chosenCard.querySelector('.card-back').textContent = cards[randomIndex];
            document.getElementById('result').textContent = `🎉 The chosen option is: ${cards[randomIndex]} 🎉`;
        }, 500);
    }, shuffleCount * 200);
}
