import { generateCards } from ".";

export const filterReservedBearsByCategory = (category, isAccepted) => {
    let filteredCards = category.filter(card => card.in_reserve);
    if (isAccepted === "accepted") {
        generateCards(filteredCards, "accepted")
        return;
    }
    generateCards(filteredCards);
}