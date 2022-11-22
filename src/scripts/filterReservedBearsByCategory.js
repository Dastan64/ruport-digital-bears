import { generateCards } from './generateCards';

export const filterReservedBearsByCategory = (category, isAccepted) => {
    let filteredCards = category.filter(card => card.in_reserve);
    console.log(filteredCards)
    if (isAccepted) {
        generateCards(filteredCards, 'accepted')
        return;
    }
    generateCards(filteredCards);
}
