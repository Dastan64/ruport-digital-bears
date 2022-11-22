import '../styles/index.scss';
import loader from '../assets/images/loader.svg';

import {
    ACCEPT_BEAR_URL,
    REJECT_BEAR_URL,
    cardsContainer,
    checkbox,
    heading,
    select
} from './constants';
import { fetchBearData } from './fetchBearData';
import { filterReservedBearsByCategory } from './filterReservedBearsByCategory';
import { generateCards } from './generateCards';
import { acceptOrRejectBear } from './acceptOrRejectBear';
import { store } from './store';

const { acceptedBears, rejectedBears } = store;

window.addEventListener('load', () => {
    if (cardsContainer.children.length === 0) {
        cardsContainer.insertAdjacentHTML('beforebegin', `
        <img class="main__loader" style="display: block; margin: 50px auto;" width="200" height="200" src=${loader} alt="">
        `)
    }
    fetch('https://private-9d5e37a-testassignment.apiary-mock.com/get-bears').then(response => response.json()).then(data => {
        console.log(data)
        store.cardsData = [...data?.results.data];
        console.log(store);
        if (store.cards.length > 0) {
            generateCards(store.cards, false);
        } else {
            cardsContainer.innerHTML = '<h1>Похоже, мы не получили информации о медведях</h1>';
        }
        document.querySelector('.main__loader').remove();
    }).catch(error => console.error(error))
})

checkbox.addEventListener('change', ({ target }) => {
    switch (select.value) {
        case 'planned-bears':
            target.checked ? filterReservedBearsByCategory(store.cards, false) : generateCards(store.cards, false)
            break;
        case 'accepted-bears':
            target.checked ? filterReservedBearsByCategory(acceptedBears, true) : generateCards(acceptedBears, true)
            break;
        case 'declined-bears':
            target.checked ? filterReservedBearsByCategory(rejectedBears, false) : generateCards(rejectedBears, false)
            break;
        default:
            break;
    }
})

select.addEventListener('change', ({ target }) => {
    switch (target.value) {
        case 'planned-bears':
            heading.textContent = 'Поступившие заявки';
            generateCards(store.cards)
            checkbox.checked && filterReservedBearsByCategory(store.cards, false);
            break;
        case 'accepted-bears':
            heading.textContent = 'Принятые медведи';
            generateCards(acceptedBears, true)
            checkbox.checked && filterReservedBearsByCategory(acceptedBears, false);
            break;
        case 'declined-bears':
            heading.textContent = 'Отклонённые медведи';
            generateCards(rejectedBears)
            checkbox.checked && filterReservedBearsByCategory(rejectedBears, false);
            break;
        default:
            break;
    }
})

cardsContainer.addEventListener('click', ({ target }) => {
    const cardId = +target.closest('.card')?.id;
    if (target.tagName === 'BUTTON' && target.classList.contains('card__btn--accept')) {
        acceptOrRejectBear(ACCEPT_BEAR_URL, cardId, acceptedBears)
    } else if (target.tagName === 'BUTTON' && target.classList.contains('card__btn--reject')) {
        acceptOrRejectBear(REJECT_BEAR_URL, cardId, rejectedBears)
    } else if (target.closest('.card')?.dataset.type === 'accepted') {
        fetchBearData(cardId)
    }
})
