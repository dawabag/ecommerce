import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { fetchProducts } from "../utils/products";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      console.log("Fetching products...");
      const fetchedProducts = await fetchProducts();
      console.log("Fetched products:", fetchedProducts);
      setProducts(fetchedProducts);

      const parsedId = id.toString();
      console.log("Looking for product with id:", parsedId);
      const selected = fetchedProducts.find(item => item.id === parsedId);
      console.log("Selected product:", selected);

      if (selected) {
        setSelectedProduct(selected);
        const related = fetchedProducts.filter(
          item => item.category === selected.category && item.id !== selected.id
        );
        console.log("Related products:", related);
        setRelatedProducts(related);
      } else {
        console.log("No product found with id:", parsedId);
        navigate('/shop'); // Redirect to shop page if product not found
      }
      setIsLoading(false);
    };

    loadProducts();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  useWindowScrollToTop();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <Fragment>
      <Banner title={selectedProduct.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
