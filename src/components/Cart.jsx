function Cart({ cart, onChangeQty, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="cart">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} - ${item.price.toFixed(2)}
                </span>

                <span className="qty">
                  <button onClick={() => onChangeQty(item.id, -1)}>−</button>
                  <b>{item.qty}</b>
                  <button onClick={() => onChangeQty(item.id, 1)}>+</button>
                  <button className="remove" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <strong>Total: ${total.toFixed(2)}</strong>
        </>
      )}
    </section>
  );
}

export default Cart;