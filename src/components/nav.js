import { renderIcons } from "../main";

export function init() {
    renderIcons();
}

export function activeHomeNav() {
    setTimeout(() => {
        renderIcons();

        const houseBtn = document.querySelector("#house-btn");
        if (!houseBtn) return;

        const svg = houseBtn.querySelector("svg");
        const paths = houseBtn.querySelectorAll("svg path");

        if (svg) {
            svg.style.color = "#152536";
            svg.style.stroke = "#152536";
            svg.style.fill = "#152536";
        }

        paths.forEach((path) => {
            path.style.stroke = "#152536";
            path.style.fill = "#152536";
        });
    }, 50);
}
