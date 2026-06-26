const API_BASE_URL = 'http://localhost:3000';

export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`خطا در دریافت ${endpoint}:`, error);
    throw error;
  }
}

export async function getProducts(page = 1, brand = null) {
  let endpoint = `products?_page=${page}&_per_page=6`;

  if (brand) {
    endpoint += `&brand=${encodeURIComponent(brand)}`;
  }

  return await fetchData(endpoint);
}

export async function getAllProducts(brand = null) {
  let endpoint = "products";

  if (brand) {
    endpoint += `?brand=${encodeURIComponent(brand)}`;
  }

  return await fetchData(endpoint);
}




export async function getBrands() {
  return await fetchData('brands');
}

export async function getProductById(id) {
  return await fetchData(`products/${id}`);
}
