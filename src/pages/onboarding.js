import Swiper from "swiper";

export function showSlider() {
    const slider = document.querySelector("#slider");
    const welcomePage = document.querySelector("#welcome-page");

    welcomePage.addEventListener("click", () => {
        welcomePage.classList.add("hidden");
        slider.classList.remove("hidden");
    });


}
