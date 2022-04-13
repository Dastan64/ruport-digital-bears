import { popup } from "./constants";

export const generatePopup = (item) => {
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 1L1 19" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M1 1L19 19" stroke="white" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>
    `
    popup.querySelector(".popup__close-btn").addEventListener("click", () => {
        popup.classList.toggle("popup--hidden")
    })
}