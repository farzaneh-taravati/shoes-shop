import { loadPage, loadComponent, renderIcons } from "../main";
import { getProducts, getBrands, getAllProducts, getProductById } from '../utils/functions';
import { renderFilterBtn } from "../components/filter-brand";
import { activeHomeNav } from "../components/nav";



export async function init() {
  await loadComponent("home-header", "#home-header");
  await loadComponent("nav", "#nav-container");

  renderIcons();

  activeHomeNav();



  const brands = await getBrands();
  let currentPage = 1;

  const homeContent = document.querySelector("#home-content");
  // logo section
  function renderBrandsLogo() {
    const brandContainer = document.querySelector("#brand-container");
    const visibleBrands = brands.slice(0, 7);

    visibleBrands.forEach((brand) => {
      const brandDiv = document.createElement("div");
      brandDiv.className = "flex flex-col gap-[13px] justify-center items-center flex-shrink-0";

      const circle = document.createElement("div");
      circle.className = "w-[60px] h-[60px] rounded-full bg-[#ececec] flex justify-center items-center p-3";

      const logo = document.createElement("img");
      logo.src = brand.logo;
      logo.alt = brand.name;
      logo.className = "w-full h-full object-contain";

      circle.appendChild(logo);

      const name = document.createElement("p");
      name.className = "text-logo-14 text-center";
      name.textContent = brand.name;

      brandDiv.appendChild(circle);
      brandDiv.appendChild(name);
      brandContainer.appendChild(brandDiv);

      brandDiv.addEventListener("click", () => {
        loadPage("filterd-products", { brand: brand.name });
      });

    });

    // دکمه more - فقط اگه بیشتر از ۷ برند داریم
    if (brands.length > 7) {
      const moreBtn = document.createElement("div");
      moreBtn.className = "flex flex-col gap-[13px] justify-center items-center cursor-pointer";
      moreBtn.innerHTML = `
        <div class="w-[60px] h-[60px] rounded-full bg-[#ececec] flex justify-center items-center">
          <i data-lucide="circle-ellipsis" class="text-[#707b81]"></i>
        </div>
        <p class="text-logo-14 text-center">More</p>
      `;

      moreBtn.onclick = () => {
        brandContainer.innerHTML = '';

        brands.forEach((brand) => {
          const brandDiv = document.createElement("div");
          brandDiv.className = "flex flex-col gap-[13px] justify-center items-center flex-shrink-0";

          const circle = document.createElement("div");
          circle.className = "w-[60px] h-[60px] rounded-full bg-[#ececec] flex justify-center items-center p-3";

          const logo = document.createElement("img");
          logo.src = brand.logo;
          logo.alt = brand.name;
          logo.className = "w-full h-full object-contain";

          circle.appendChild(logo);

          const name = document.createElement("p");
          name.className = "text-logo-14 text-center";
          name.textContent = brand.name;

          brandDiv.appendChild(circle);
          brandDiv.appendChild(name);
          brandContainer.appendChild(brandDiv);

          brandDiv.addEventListener("click", () => {
            loadPage("filterd-products", { brand: brand.name });
          });

        });

        renderIcons();
      };

      brandContainer.appendChild(moreBtn);
    }

    renderIcons();
  };
  renderBrandsLogo();


  // see all
  const seeAllBtn = document.querySelector("#see-all-btn");

  if (seeAllBtn) {
    seeAllBtn.addEventListener("click", () => {
      loadPage("seeAll");
    });
  }


  // filters and products 

  renderFilterBtn(brands, (brandName) => {
    if (brandName) {

      loadPage("filterd-products", { brand: brandName });
    } else {
      renderProductCards();
    }
  });

  // search bar
  function renderSearchResults(products) {
    const searchResultsContainer = document.querySelector("#search-results");
    if (!searchResultsContainer) return;

    if (!products.length) {
      searchResultsContainer.innerHTML = `
      <div class="px-4 py-3 text-sm text-gray-500">
        No products found
      </div>
    `;
      searchResultsContainer.classList.remove("hidden");
      return;
    }

    searchResultsContainer.innerHTML = "";

    products.forEach((product) => {
      const item = document.createElement("div");
      item.className = "flex items-center gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50";

      item.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" class="w-12 h-12 object-cover rounded-lg bg-[#F3F3F3]">
      <div class="flex flex-col">
        <span class="text-sm font-medium text-[#1E1E1E]">${product.name}</span>
        <span class="text-xs text-gray-500">$ ${product.price}</span>
      </div>
    `;

      searchResultsContainer.appendChild(item);
    });

    searchResultsContainer.classList.remove("hidden");
  }
  function hideSearchResults() {
    const searchResultsContainer = document.querySelector("#search-results");
    if (!searchResultsContainer) return;

    searchResultsContainer.innerHTML = "";
    searchResultsContainer.classList.add("hidden");
  }

  // product cards
  async function renderProductCards(append = false) {
    const productCardContainer = document.querySelector("#product-card-container");

    const response = await getProducts(currentPage);

    const products = response.data;

    // اگر حالت append نبود (یعنی بار اول یا فیلتر)، کانتینر را خالی کن
    if (!append) {
      productCardContainer.innerHTML = "";
    }

    products.forEach((product) => {

      const productCard = document.createElement("div");
      productCard.className = "flex flex-col gap-3 justify-center items-center mb-2 w-[182px]"

      productCard.innerHTML = `
          <div class="width-height-182-rounded bg-[#F3F3F3] flex justify-center items-center">
              <img src="${product.images[0]}" alt="shoes image" class="width-height-142-rounded">
          </div>
          <div class="flex flex-col gap-2 justify-center items-start w-full">
              <span class="product-card-name-20 overflow-hidden text-ellipsis whitespace-nowrap max-w-full ">${product.name}</span>
             <span class="product-card-price-16">$ ${product.price}</span>
           </div>
    `
      // کلیک رو محصول برای رفتن به جزئیات محصول
      // item.addEventListener("click", () => {
      //   loadPage("details", { id: product.id });
      // });


      productCardContainer.appendChild(productCard);
    });

    // ۵. مدیریت دکمه Load More (فقط اگه دکمه وجود نداره بسازش)
    if (!document.querySelector("#load-more-btn")) {
      const btn = document.createElement("button");
      btn.id = "load-more-btn";
      btn.className = "w-full py-3 rounded-xl font-bold cursor-pointer mb-36 hover:underline";
      btn.textContent = "Load More";

      btn.onclick = () => {
        currentPage++; // صفحه رو زیاد کن
        renderProductCards(true); // دوباره همین تابع رو صدا بزن ولی با حالت append
      };

      // دکمه رو بعد از کانتینر محصولات اضافه کن
      productCardContainer.after(btn);
    };

  };
  renderProductCards();

  // search
  const searchInput = document.querySelector("#search-input");

  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(async () => {
        const searchValue = searchInput.value.trim().toLowerCase();

        if (searchValue === "") {
          hideSearchResults();
          return;
        }

        const allProducts = await getAllProducts();

        const filteredProducts = allProducts.filter((product) => {
          return (
            product.name.toLowerCase().includes(searchValue) ||
            product.brand.toLowerCase().includes(searchValue)
          );
        });

        renderSearchResults(filteredProducts);
      }, 300);
    });
  }


};
