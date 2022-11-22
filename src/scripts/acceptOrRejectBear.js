import { generateCards } from './generateCards';
import { findAndPlaceBear } from './findAndPlaceBear';
import { store } from './store';

export const acceptOrRejectBear = (url, specificBearId, category) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ id: specificBearId })
    }).then(response => {
        if (response.ok) {
            findAndPlaceBear(specificBearId, category, store.cards);
            store.cardsData = store.cards.filter(card => card.id !== specificBearId)
            generateCards(store.cards, false);
        }
    }).catch(error => console.error(error))
}
