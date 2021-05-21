// importing Essential Libraries

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";
import { Header } from "./components/Header";
import { Products } from "./components/Products";
import { Checkout } from "./components/Checkout";
import { Subs } from "./components/Subs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Default App.js Main function
export default function App() {
  const [cartItems, updateCartItems] = useState([]);


  // fetching all food items using Axios
  async function getFoodItems() {
    const foodData = await axios.get("http://localhost:8080/cartItems/getAll")
    console.log(foodData.data.results);
    updateCartItems(foodData.data.results);
    console.log(cartItems)
  }

  // using UsEffect Hook to get the food items 
  useEffect(() => {
    getFoodItems();
  }, []);


  // Returning the Routes and path of the cart items
  return (
    <Router>
      <div className="App">
        <Header cartItems={cartItems} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Products
                cartItems={cartItems}
                updateCartItems={updateCartItems}
              />
            )}
          />
          <Route
            path="/checkout"
            exact
            render={(props) => (
              <Checkout
                cartItems={cartItems}
                getFoodItems={getFoodItems}
              />
            )}
          />
          <Route
            path="/data/:id"
            render={(props) => (
              <Subs
                cartItems={cartItems}
                getFoodItems={getFoodItems}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
