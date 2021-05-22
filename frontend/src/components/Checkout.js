// importing libraries and essential  files
import axios from "axios";
import "./checkout.css"
import { Link } from "react-router-dom";

export function Checkout(props) {
  const { cartItems, getFoodItems } = props;

  // Api to Remove items from Cart
  async function deleteFoodItem(item) {
    const deleteResponse = await axios.delete("http://localhost:8080/cartItems/deleteFoodItem", {
      data: {
        _id: item._id
      }
    })
    getFoodItems();
  }

  // Api to Delete all items from Cart
  async function deleteAll() {
    const deleteAllItems = await axios.delete("http://localhost:8080/cartItems/deleteAll", {})
    console.log(deleteAllItems);
    getFoodItems();
  }


  return (
    <div className="row">
      <div>
        {cartItems.length === 0 && (
          <h2 className="empty title col-12 mt-4 ">Cart is Empty</h2>
        ) || <h1 className="empty title">You have ordered:</h1>}
      </div>
      <div className="col-lg-7 col-md-8 col-sm-12">
        <div className="row">
          {cartItems.map((item) => {
            return (
              <div key={item._id} className="product col-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <img className="check-img" src={item.image} alt={item.name}></img>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
                    <h5>
                      <strong>{item.name}</strong>
                    </h5>
                    <p>{item.description}</p>
                    <div>
                      <strong>Rs. {item.price.toFixed(2)}</strong>{" "}
                      <span className="card-text">{item["original-price"]}</span>
                    </div>
                    <button className="remove" onClick={() => deleteFoodItem(item)}> Remove Item</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-lg-5 col-md-4">
        {cartItems.length !== 0 && (
          <div className="price-page">
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              <button className="checkout" onClick={() => deleteAll()}>Place Order</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
