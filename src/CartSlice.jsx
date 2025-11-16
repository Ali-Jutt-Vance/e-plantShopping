import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item: { id, name, price, image, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload; // item.price MUST be a number
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push({ ...item, quantity: 1 }); 
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload; 
      const existingItem = state.items.find(i => i.id === id);
      if (existingItem) {
        if (type === 'increment') {
          existingItem.quantity += 1;
        } else if (type === 'decrement') {
          existingItem.quantity -= 1;
          if (existingItem.quantity <= 0) {
            state.items = state.items.filter(i => i.id !== id);
          }
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
