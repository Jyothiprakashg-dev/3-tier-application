import React from 'react';

const Cart = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div style={{ padding: '10px', borderLeft: '1px solid #ccc' }}>
      <h3>🛒 Cart</h3>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, i) => (
              <li key={i}>{item.name} - ₹{item.price}</li>
            ))}
          </ul>
          <p><strong>Total:</strong> ₹{total}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
