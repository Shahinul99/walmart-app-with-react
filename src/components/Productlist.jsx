import ProductCard from "./productCrad";

function ProductList({ products, onAdd }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default ProductList;