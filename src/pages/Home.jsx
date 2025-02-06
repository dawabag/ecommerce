import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts, fetchProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { supabase } from "../utils/supabase";

const Home = () => {
  const [products, setProducts] = useState([]);
  // const [, setDiscountProducts] = useState([]);
  useWindowScrollToTop();

  useEffect(() => {
    fetchProducts();

    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);


  const newArrivalData = products.filter(
    (item) => item.category === "Anti Cancer"
  );
  const bestSales = products.filter((item) => item.category === "Cardiac");
  const discountProducts = products.filter((item) => item.offer === "Yes");

  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Dawabag Deals"
        bgColor="#f6f9fc"
        productItems={discountProducts}
      />
      <Section
        title="Cancer Medicenes"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Cardiac Medicenes" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
