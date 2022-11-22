import { cardsContainer } from './constants';

export const generateCards = (cards, areAccepted) => {
    cardsContainer.innerHTML = '';
    if (cards.length > 0) {
        if (areAccepted) {
            cards.forEach(card => {
                const cardElement = `
                <article class="main__card card ${card?.in_reserve ? 'card--highlighted' : ''}" id=${card.id} data-type='accepted'>
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
                cardsContainer.insertAdjacentHTML('beforeend', cardElement);
            })
        } else {
            cards.forEach(card => {
                const cardElement = `
            <article class="main__card card ${card?.in_reserve ? 'card--highlighted' : ''}" id=${card.id}>
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
                cardsContainer.insertAdjacentHTML('beforeend', cardElement);
            })
        }
    } else {
        cardsContainer.innerHTML = '<h2>Медведей нет, но вы держитесь!</h2>';
    }
}
