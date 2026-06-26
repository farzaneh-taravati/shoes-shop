import { renderIcons } from "../main";


export function init() {

    renderIcons();
    renderGreeting();

    const likedListHeader = document.querySelector("#liked-items-list");
    likedListHeader.addEventListener("click", () => {
         likedListHeader.classList.add("fill-[#152536]");
    });


}

function renderGreeting() {
    const greetingElement = document.querySelector("#header-greeting");
    
    const Hour = new Date().getHours();
    if (Hour >= 5 && Hour < 12) {
        greetingElement.textContent = "Good morning";
    } else if (Hour >= 12 && Hour < 18) {
        greetingElement.textContent = "Good afternoon";
    } else if (Hour >= 18 && Hour < 22) {
        greetingElement.textContent = "Good evening";
    } else {
        greetingElement.textContent = "Good night";
    }
}