import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  // Handle continue shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, type: 'increment' }));
  };

  // Decrement item quantity
  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, type: 'decrement' }));
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Calculate total cost for a single item
  const calculateTotalCost = (item) => {
    return (Number(item.price) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <p style={{ color: 'black', fontSize: '20px' }}>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: ${Number(item.price).toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="continue_shopping_btn" style={{ marginTop: '20px' }}>
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
