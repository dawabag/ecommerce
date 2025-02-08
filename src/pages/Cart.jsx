import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Prescription = ({ onUpload, currentPrescription }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpload({
          file: event.target.result.split(',')[1],
          name: file.name,
          preview: event.target.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file.');
    }
  };

  return (
    <div className="cart-list prescription-item">
      <Row>
        <Col className="image-holder" sm={4} md={3}>
          {currentPrescription ? (
            <img src={currentPrescription.preview} alt="Prescription" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
        </Col>
        <Col sm={8} md={9}>
          <Row className="cart-content justify-content-center">
            <Col xs={12} sm={9} className="cart-details">
              <h3>Prescription</h3>
              <p>{currentPrescription ? currentPrescription.name : 'No file selected'}</p>
              <input type="file" onChange={handleFileChange} accept="image/*" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [prescription, setPrescription] = useState(null);

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrescriptionUpload = (newPrescription) => {
    setPrescription(newPrescription);
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Prescription onUpload={handlePrescriptionUpload} currentPrescription={prescription} />
            {cartList.length === 0 && !prescription && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price} * {item.qty}
                            <span>${productQty}</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}</h3>
              </div>
              <div>
                <h4>Prescription:</h4>
                <p>{prescription ? prescription.name : 'No file uploaded'}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
