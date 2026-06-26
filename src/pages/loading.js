import { loadPage } from "../main";

// این تابع توسط router (main.js) صدا زده می‌شه
export function init() {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    // بعد از ۳۰۰ms بر اساس وضعیت لاگین، صفحه بعدی رو لود کن
    setTimeout(() => loadPage(isLoggedIn ? "home" : "onboarding"), 3000);
}
