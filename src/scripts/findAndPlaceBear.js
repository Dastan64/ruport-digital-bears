export const findAndPlaceBear = (bearId, category, cards) => {
    const specificBear = cards.find(card => card.id === bearId);
    category.push(specificBear);
};
