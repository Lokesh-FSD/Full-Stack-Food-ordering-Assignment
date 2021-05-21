// Imports
import productsJSON from "./products.json";
import { Link } from "react-router-dom";

// function to render the Product Items 
export function Products() {
  function renderProducts() {
    if (productsJSON !== undefined) {
      return productsJSON.results.map(function (productItem) {
        return (
          <div
            key={productItem.id}
            id={productItem.id}

            className="col-md-6 col-sm-15"
          >
            <Link style={{ textDecoration: "none", color: "#000" }} to={`/data/${productItem.id}`}>
              <div className="card ">
                <img src={productItem.image} alt={productItem.name}></img>
                <div className="card-body">
                  <h5 className="card-title">{productItem.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  }
  return (
    <div className="d-flex w-100 justify-content-center align-items-center mt-5">
      <div className="row">{renderProducts()}</div>
    </div>
  );
}
