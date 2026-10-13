function Header({ cartCount, showCart, onToggleCart }) {
  return (
    <header className="header">
      <h1>🛒 My Walmart</h1>
      <button
        className={showCart ? "cart-btn active" : "cart-btn"} // conditional style
        onClick={onToggleCart}
      >
        {showCart ? "Hide Cart" : "Show Cart"} ({cartCount})
      </button>
    </header>
  );
}

export default Header;