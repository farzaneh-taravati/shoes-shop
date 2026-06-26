import { loadPage } from "../main";
import { getProducts, getBrands, getProductById } from '../utils/functions';



export function renderFilterBtn(brands , onFilter) {
    const filterBtnContainer = document.querySelector("#filter-brand");
    if (!filterBtnContainer) return;

    const normalClasses = ["bg-white", "text-black", "border-[#343A40]"];
    const activeClasses = ["bg-[#343A40]", "text-white", "border-[#343A40]"];

    filterBtnContainer.innerHTML = "";

    // تابع کمکی برای تغییر استایل دکمه‌ها (برای جلوگیری از تکرار کد)
    const setActive = (targetBtn) => {
        filterBtnContainer.querySelectorAll("div").forEach(btn => {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...normalClasses);
        });
        targetBtn.classList.remove(...normalClasses);
        targetBtn.classList.add(...activeClasses);
    };

    // ۱. ایجاد دکمه "All" به صورت دستی قبل از حلقه‌ی برندها
    const allBtn = document.createElement("div");
    allBtn.className = "min-w-fit px-6 h-[39px] border-2 rounded-[25px] flex justify-center items-center cursor-pointer transition-all";
    allBtn.classList.add(...activeClasses); // فرض بر این است که در ابتدا All انتخاب شده باشد
    allBtn.innerHTML = "All";
    allBtn.addEventListener("click", () => {
        setActive(allBtn);
        onFilter(null); // فرستادن null یعنی همه محصولات
    });
    filterBtnContainer.appendChild(allBtn);

    // ۲. رندر کردن برندهایی که از بک‌اند می‌آیند
    brands.forEach((brand) => {
        const filterBtnDiv = document.createElement("div");
        filterBtnDiv.className = "min-w-fit px-6 h-[39px] border-2 rounded-[25px] flex justify-center items-center cursor-pointer transition-all";
        filterBtnDiv.classList.add(...normalClasses);
        filterBtnDiv.innerHTML = brand.name;

        filterBtnDiv.addEventListener("click", () => {
            setActive(filterBtnDiv);
        onFilter(brand.name); // فرستادن نام برند برای فیلتر
        });
        filterBtnContainer.appendChild(filterBtnDiv);
    });
}
