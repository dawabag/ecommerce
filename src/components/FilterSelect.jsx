import Select from 'react-select';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { fetchProducts } from '../utils/products';

// const options = [
//     { value: "Anti Cancer", label: "Sofa" },
//     { value: "chair", label: "Chair" },
//     { value: "watch", label: "Watch" },
//     { value: "mobile", label: "Mobile" },
//     { value: "wireless", label: "Wireless" },
// ];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setFilterList}) => {
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
      fetchCategories();
      const loadProducts = async () => {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      };
  
      loadProducts();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('master_categories')
          .select('name')
        
        if (error) throw error;
  
        const formattedOptions = data.map(category => ({
          value: category.name,
          label: category.name
        }));
  
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    const handleChange = (selectedOption)=> {
        console.log(products);
        
        setFilterList(products.filter(item => item.category === selectedOption.value))
    }
    return (
    <Select
    options={options}
    defaultValue={{ value: "", label: "Filter By Category" }}
    styles={customStyles}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;
