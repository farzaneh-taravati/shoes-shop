import { loadPage, renderIcons } from "../main";


export function init() {

    renderIcons();

    const likedListHeader = document.querySelector("#liked-items-list");
   
    likedListHeader.addEventListener("click", () => {
         likedListHeader.classList.add("fill-[#152536]");
    });
   
}
