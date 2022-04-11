import "../styles/index.scss";
import loader from "../assets/images/loader.svg";
import closeIcon from "../assets/images/close-icon.svg";

const cardsContainer = document.querySelector('#cards-container');
const popup = document.querySelector('.popup');
const checkbox = document.querySelector('.check__input');
const select = document.querySelector('.main__select');
const heading = document.querySelector('.main__heading');

const acceptedBears = [], declinedBears = [];

let cards;

window.addEventListener("load", () => {
    if (cardsContainer.children.length === 0) {
        cardsContainer.insertAdjacentHTML('beforebegin', `
        <img class="main__loader" style="display: block; margin: 20px auto;" width="300" height="300" src=${loader} alt="">
        `)
    }
    fetch("https://private-9d5e37a-testassignment.apiary-mock.com/get-bears").then(response => response.json()).then(data => {
        cards = data.results.data;
        generateCards(cards);
        document.querySelector('.main__loader').remove();
    }).catch(error => console.error(error))
})

const findAndPlaceBear = (bearId, category) => {
    const specificBear = cards.find(card => card.id === bearId);
    category.push(specificBear);
};

const generateCards = (cards, type) => {
    cardsContainer.innerHTML = "";
    if (type === "accepted") {
        cards.forEach(card => {
            const cardElement = document.createElement("article");
            cardElement.innerHTML = `
            <article class="main__card card ${card?.in_reserve ? "card--highlighted" : ""}" id=${card.id} data-type=${type}>
            <div class="card__image-container">
                <img width="220" height="146" class="card__image" src=${card.image_url} alt="">
            </div>
            <div class="card__content">
                <h3 class="card__title">${card.name}</h3>
                <p class="card__description">${card.type}</p>
                <p class="card__description">${card.gender}</p>
            </div>
        </article>
            `
            cardsContainer.append(cardElement);
        })
    }
    else {
        cards.forEach(card => {
            const cardElement = document.createElement("article");
            cardElement.innerHTML = `
        <article class="main__card card ${card?.in_reserve ? "card--highlighted" : ""}" id=${card.id}>
        <div class="card__image-container">
            <img width="220" height="146" class="card__image" src=${card.image_url} alt="">
        </div>
        <div class="card__content">
            <h3 class="card__title">${card.name}</h3>
            <p class="card__description">${card.type}</p>
            <p class="card__description">${card.gender}</p>
            <div class="card__buttons">
                <button class="card__btn card__btn--accept" type="button">Принять</button>
                <button class="card__btn card__btn--reject" type="button">Отклонить</button>
            </div>
        </div>
    </article>
        `
            cardsContainer.append(cardElement);
        })
    }
}

const fetchBearData = id => {
    fetch(`https://private-dd610-ruporttestassignment.apiary-mock.com/get-bears/${id}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            if (response.status === 404) {
                alert("Судя по всему, только Леонард, Миша и Клео могут рассказать о себе. Остальные стесняются.");
                console.warn("Похоже, работают только 3 эндпоинта из 10")
            }
        }
    }).then(data => {
        const item = data.data;
        console.log(item);
        generatePopup(item)
    }).catch(error => console.log(error))
}

const generatePopup = (item) => {
    popup.classList.toggle("popup--hidden");
    popup.innerHTML = `
    <div class="popup">
    <div class="popup__content">
        <div class="popup__image-container">
            <img width="460" height="400" class="popup__image" src=${item.image_url} alt="">
        </div>
        <div class="popup__info">
            <h3 class="popup__title">${item.name}</h3>
            <p class="popup__description">${item.type}</p>
            <p class="popup__description">${item.gender}</p>
            <div class="popup__text-container">
                <p class="popup__text">${item.text}</p>
            </div>
            <div class="popup__buttons">
                <button class="popup__btn popup__btn--accept" type="button">Принять</button>
                <button class="popup__btn popup__btn--reject" type="button">Отклонить</button>
            </div>
        </div>
        <button class="popup__close-btn" type="button">
            <img width="18" height="18" src=${closeIcon} alt="">
        </button>
    </div>
</div>
    `
    popup.querySelector(".popup__close-btn").addEventListener("click", () => {
        popup.classList.toggle("popup--hidden")
    })
}

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        switch (select.value) {
            case "planned-bears":
                filterReservedBearsByCategory(cards)
                break;

            case "accepted-bears":
                filterReservedBearsByCategory(acceptedBears, "accepted")
                break;

            case "declined-bears":
                filterReservedBearsByCategory(declinedBears)
                break;

            default:
                filterReservedBearsByCategory(cards)
                break;
        }
    }
    else {
        switch (select.value) {
            case "planned-bears":
                generateCards(cards)
                break;

            case "accepted-bears":
                generateCards(acceptedBears, "accepted")
                break;

            case "declined-bears":
                generateCards(declinedBears)
                break;

            default:
                break;
        }
    }
})

const filterReservedBearsByCategory = (category, isAccepted) => {
    let filteredCards = category.filter(card => card.in_reserve);
    if (isAccepted === "accepted") {
        generateCards(filteredCards, "accepted")
        return;
    }
    generateCards(filteredCards);
}

select.addEventListener("change", (e) => {
    switch (e.target.value) {
        case "planned-bears":
            heading.textContent = "Поступившие заявки";
            generateCards(cards)
            break;
        case "accepted-bears":
            heading.textContent = "Принятые медведи";
            generateCards(acceptedBears, "accepted")
            break;
        case "declined-bears":
            heading.textContent = "Отклонённые медведи";
            generateCards(declinedBears)
            break;
        default:
            break;
    }
})

const acceptOrRejectBear = (url, specificBearId, category) => {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({ id: specificBearId })
    }).then(response => {
        if (response.ok) {
            findAndPlaceBear(specificBearId, category);
            cards = cards.filter(card => card.id !== specificBearId)
        }
    }).catch(error => console.error(error))
}

cardsContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.classList.contains("card__btn--accept") && e.target.closest(".card")) {
        const specificBearId = +e.target.closest(".card").id;
        acceptOrRejectBear("https://private-9d5e37a-testassignment.apiary-mock.com/resolve-bear", specificBearId, acceptedBears)
    }
    else if (e.target.tagName === "BUTTON" && e.target.classList.contains("card__btn--reject") && e.target.closest(".card")) {
        const specificBearId = +e.target.closest(".card").id;
        acceptOrRejectBear("https://private-9d5e37a-testassignment.apiary-mock.com/reject-bear", specificBearId, declinedBears)
    }
    else if (e.target.closest(".card").dataset.type === "accepted") {
        const specificBearId = +e.target.closest(".card").id;
        fetchBearData(specificBearId)
    }
})