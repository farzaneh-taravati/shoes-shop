import { getProducts,getAllProducts } from "../utils/functions.js";
import { loadPage, renderIcons, loadComponent } from "../main";

export async function init(brandName) {
    if (!brandName) return;

    // ۱. نمایش نام برند در هدر
    const titleElement = document.querySelector("#header-brand-name");
    if (titleElement) titleElement.textContent = brandName;

    // ۲. گرفتن محصولات از سرور
    const products = await getAllProducts(brandName);

    // ۳. پیدا کردن کانتینر برای رندر محصولات
    const container = document.querySelector("#filterd-products-container");
    if (!container) return;

    container.innerHTML = ""; // پاک کردن محتوای قبلی

    // ۴. رندر کردن محصولات
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "flex flex-col gap-3 justify-center items-center mb-2 w-[182px]";
        productCard.innerHTML = `
            <div class="width-height-182-rounded bg-[#F3F3F3] flex justify-center items-center">
                <img src="${product.images[0]}" alt="${product.name}" class="width-height-142-rounded">
            </div>
            <div class="flex flex-col gap-2 justify-center items-start w-full">
                <span class="product-card-name-20 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">${product.name}</span>
                <span class="product-card-price-16">$ ${product.price}</span>
            </div>
        `;
        container.appendChild(productCard);
    });

  
    // ۶. منطق دکمه بازگشت (اختیاری)
      const backBtn = document.querySelector("#back-home-btn");
    if (backBtn) {
        backBtn.onclick = () => {
            loadPage("home");
        };
    }

    // nav
    await loadComponent("nav", "#nav-container");
 
    renderIcons();

}
