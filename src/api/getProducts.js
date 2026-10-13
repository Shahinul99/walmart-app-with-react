// Load from the real API first. If that fails, load the local JSON file.

async function fetchFromApi() {
  const res = await fetch("https://dummyjson.com/products?limit=30");
  if (!res.ok) throw new Error("API request failed");
  const data = await res.json();

  // convert the API shape into the shape our app uses
  return data.products.map((p) => ({
    id: p.id,
    name: p.title,
    price: p.price,
    inStock: p.stock > 0,
    category: p.category,
    image: p.thumbnail,
  }));
}

async function fetchFromJson() {
  const res = await fetch("/products.json");
  if (!res.ok) throw new Error("JSON file request failed");
  return await res.json();
}

export async function getProducts() {
  try {
    const products = await fetchFromApi();
    return { products, error: "" };
  } catch {
    const products = await fetchFromJson();
    return { products, error: "Could not reach the API, showing local data." };
  }
}