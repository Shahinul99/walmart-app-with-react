import { useState, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filter";
import ProductList from "./components/Productlist";
import Cart from "./components/Cart";
import { getProducts } from "./api/getProducts";

function App() {
  // ----- STATE -----
  const [products, setProducts] = useState([]);      // array state
  const [showCart, setShowCart] = useState(false);   // toggle state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // array state, with the initial value read from localStorage (runs once)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProducts();
        setProducts(result.products);
        setError(result.error);
      } catch {
        setError("Could not load any products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // ----- useEffect #2: save the cart + update the tab title when the cart changes -----
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.title = `Shop (${totalItems} items)`;
  }, [cart, totalItems]);

  // ----- FUNCTIONS WITH PARAMETERS -----
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const changeQty = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ----- FILTER THE ARRAY BEFORE PASSING IT DOWN -----
  const visibleProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });
  const categories = [...new Set(products.map((product) => product.category))].sort();

  // ----- UI -----
  return (
    <div className="app">
      <Header
        cartCount={totalItems}
        showCart={showCart}
        onToggleCart={() => setShowCart(!showCart)}
      />

      {/* conditional rendering */}
      {showCart && (
        <Cart cart={cart} onChangeQty={changeQty} onRemove={removeFromCart} />
      )}

      <Filters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />

      {error && <p className="error" role="status">{error}</p>}

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : visibleProducts.length === 0 ? (
        <p className="loading">No products found.</p>
      ) : (
        <ProductList products={visibleProducts} onAdd={addToCart} />
      )}
    </div>
  );
}

export default App;