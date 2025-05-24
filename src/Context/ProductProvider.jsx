import React, { useReducer, useState,useEffect, useContext } from "react";
import ProductContext from "./ProductContext";
import cartReducer from "./Reducer";
import toast from "react-hot-toast";

const ProductProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const initialProducts = [
    {
      _id: 1,
      name: "Apple",
      price: 100,
      description: "This is an Apple",
      inStock: 4,
    },
    {
      _id: 2,
      name: "Mango",
      price: 200,
      description: "This is a Mango",
      inStock: 5,
    },
    {
      _id: 3,
      name: "Cherry",
      price: 300,
      description: "This is a Cherry",
      inStock: 3,
    },
    {
      _id: 4,
      name: "Orange",
      price: 900,
      description: "This is a Orange",
      inStock: 8,
    },
  ];
  // const [products, setProducts] = useState(initialProducts);
  const [products, setProducts] = useState([]);
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [state, dispatch] = useReducer(cartReducer, {
    product: products,
    cart: initialCart,
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);



   const getUserProducts = async () => {
     try {
       const response = await fetch(
         `${apiUrl}/api/product/getproducts`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
           },
         }
       );
       const data = await response.json();
       setProducts(data);
     } catch (error) {
       console.error("Error fetching user products:", error);
     }
   };

  const allProduct = async (searchQuery = "") => {
    const response = await fetch(
      `${apiUrl}/api/product/getallproducts?searchQuery=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setProducts(data);
  };

  // edit product
  const editProduct = async (selectedProduct, updateData) => {
    console.log("edit product", selectedProduct);
    const { name, description, price, inStock } = updateData;
    try {
      const response = await fetch(
        `${apiUrl}/api/product/updateproduct/${selectedProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(updateData),
        }
      );
      if (response.ok) {
          const data = await response.json();
      
          //update local products state
          setProducts(prevProducts=>
            prevProducts.map((product) =>
              product._id === selectedProduct ? { ...product, ...updateData}: product
          ));
          // Update cart if product exists there
      dispatch({ 
        type: 'UPDATE_ITEM', 
        payload: { _id: selectedProduct, ...updateData }
      });
          
     toast.success('Product updated successfully');
      return true;  // return true on success
    } else {
      toast.error('Failed to update product');
      return false; // return false on failure
    }
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product");
    return false;
  }
};

  // delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/product/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Dispatch actions to update both products and cart
      dispatch({ type: 'REMOVE_FROM_CART', payload: { _id: id } });
      toast.success('Product deleted successfully');
      allProduct();
      } else {
        console.log("failed to delete the product");
      }
      allProduct();
    } catch (error) {
      console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    }
  };

  return (
    <div>
      <ProductContext.Provider
        value={{
          products,
          setProducts,
          state,
          dispatch,
          allProduct,
          editProduct,
          deleteProduct,
          getUserProducts,
        }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;











