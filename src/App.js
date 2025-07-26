import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FoodItem from './components/FoodItem';
import Cart from './components/Cart';
import axios from 'axios';

function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          <h2>Available Foods</h2>
          {foods.map(food => (
            <FoodItem key={food.id} food={food} addToCart={addToCart} />
          ))}
        </div>
        <div style={{ width: '30%' }}>
          <Cart cartItems={cart} />
        </div>
      </div>
    </div>
  );
}

export default App;
