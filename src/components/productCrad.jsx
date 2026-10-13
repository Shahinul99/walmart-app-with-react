import AddButton from "./AddButton";

function ProductCard({ product, onAdd }) {
  return (
    <div className={product.inStock ? "card" : "card out"}>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>

      {/* conditional rendering */}
      {product.inStock ? (
        <AddButton product={product} onAdd={onAdd} />
      ) : (
        <span className="badge">Out of stock</span>
      )}
    </div>
  );
}

export default ProductCard;