function AddButton({ product, onAdd }) {
  return <button onClick={() => onAdd(product)}>Add to cart</button>;
}

export default AddButton;