import { getAllProducts, getBrands } from "../utils/functions.js";
import { loadPage, renderIcons, loadComponent } from "../main";
import { renderFilterBtn } from "../components/filter-brand";

export async function init() {
    const brands = await getBrands();


    await loadComponent("nav", "#nav-container");

    renderIcons();

      // منطق دکمه بازگشت
    const backBtn = document.querySelector("#back-home-btn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            loadPage("home");
        });
    }

    renderFilterBtn(brands, (brandName) => {
        renderProducts(brandName);
    });

    await renderProducts();
}

async function renderProducts(brandName = null) {
    const container = document.querySelector("#see-all-products-container");
    if (!container) return;

    const products = await getAllProducts(brandName);

    container.innerHTML = "";

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
}
