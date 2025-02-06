import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  console.log(selectedProduct);
  
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAdd = () => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  if (!selectedProduct) {
    return <div>Loading product details...</div>;
  }

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct.imgUrl} alt={selectedProduct.productName} />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct.productName}</h2>
            <div className="rate">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa fa-star"></i>
                ))}
              </div>
              <span>{selectedProduct.avgRating} ratings</span>
            </div>
            <div className="info">
              <span className="price">₹{selectedProduct.price}</span>
              <span>Category: {selectedProduct.category}</span>
            </div>
            <p>{selectedProduct.shortDesc}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button
              aria-label="Add"
              type="button"
              className="add"
              onClick={handleAdd}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
