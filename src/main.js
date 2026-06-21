import "./style.css";

import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ── لود یه صفحه و اجرای init اختصاصی‌اش ──────────────────────────
async function loadPage(pageName) {
    try {
        const response = await fetch(`/src/pages/${pageName}.html`);
        if (!response.ok) throw new Error(`صفحه ${pageName} پیدا نشد!`);

        document.getElementById("app").innerHTML = await response.text();

        // بعد از تزریق HTML، init مربوط به هر صفحه رو اجرا کن
        if (pageName === "loading") {
            redirectUser();
        } else if (pageName === "onboarding") {
            initOnboarding();
        } else if (pageName === "home") {
            initSwiper();
        }
    } catch (error) {
        console.error("خطا در بارگذاری صفحه:", error);
        document.getElementById("app").innerHTML = "<h1>خطا در بارگذاری صفحه!</h1>";
    }
}

// ── ریدایرکت بعد از loading ────────────────────────────────────────
function redirectUser() {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    setTimeout(() => loadPage(isLoggedIn ? "home" : "onboarding"), 3000);
}

// ── init صفحه onboarding ───────────────────────────────────────────
 function initOnboarding() {
    const welcomePage = document.querySelector("#welcome-page");
    const slider = document.querySelector("#slider");

    if (!welcomePage || !slider) return;

    welcomePage.addEventListener("click", () => {
        welcomePage.classList.add("hidden");
        slider.classList.remove("hidden");


        const swiper = initSwiper(); // swiper رو بعد از نمایش slider راه‌اندازی کن و ذخیره کن
        
        const nextBtn1 = document.querySelector("#next-btn1");
        const nextBtn2 = document.querySelector("#next-btn2");
        const startBtn = document.querySelector("#start-btn");

        nextBtn1?.addEventListener("click", () => swiper?.slideNext());
        nextBtn2?.addEventListener("click", () => swiper?.slideNext());
        startBtn?.addEventListener("click", () => loadPage("login"));




    });
}

// ── init swiper ────────────────────────────────────────────────────
function initSwiper() {
    if (!document.querySelector(".swiper")) return null;

    const swiperInstance = new Swiper(".swiper", {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });

    return swiperInstance; 
}

// ── شروع برنامه ────────────────────────────────────────────────────
loadPage("loading");

