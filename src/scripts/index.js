import "../styles/index.scss";
import loader from "../assets/images/loader.svg";

import { cardsContainer, checkbox, select, heading, acceptedBears, declinedBears } from "./constants";
import { fetchBearData } from "./fetchBearData";
import { filterReservedBearsByCategory } from "./filterReservedBearsByCategory";

let cards;

window.addEventListener("load", () => {
    if (cardsContainer.children.length === 0) {
        cardsContainer.insertAdjacentHTML('beforebegin', `
        <img class="main__loader" style="display: block; margin: 20px auto;" width="200" height="200" src=${loader} alt="">
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

export const generateCards = (cards, type) => {
    cardsContainer.innerHTML = "";
    if (cards.length > 0) {
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
    else {
        cardsContainer.innerHTML = "<h2>Медведей нет, но вы держитесь!</h2>";
    }
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