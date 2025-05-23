import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    inStock: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Add this validation function before handleSubmit
  const validateForm = () => {
    const newErrors = {};

    // Product Name validation
    if (!product.name) {
      newErrors.name = "Product name is required";
    } else if (product.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters long";
    } else if (!/^[A-Z]/.test(product.name)) {
      newErrors.name = "Product name must start with a capital letter";
    }

    // Description validation
    if (!product.description) {
      newErrors.description = "Description is required";
    } else if (product.description.length < 5) {
      newErrors.description = "Description must be at least 5 characters long";
    }

    // Price validation
    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // Stock validation
    if (!product.inStock) {
      newErrors.inStock = "Stock quantity is required";
    } else if (Number(product.inStock) <= 0) {
      newErrors.inStock = "Stock quantity must be greater than 0";
    }

    // Image validation
    if (!product.image) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("add product");
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      toast.error("Please login to add products");
      navigate("/login");
      return;
    }

    // / Mark all fields as touched when form is submitted
  const touchAll = {};
  Object.keys(product).forEach(key => {
    touchAll[key] = true;
  });
  setTouched(touchAll);

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("inStock", product.inStock);
    if (product.image) {
      formData.append("myfile", product.image);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/addproduct",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        price: "",
        inStock: "",
        image: "",
      });

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
      console.error(error);
    }
  };

  // Add handleBlur for touch effects
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Modify handleChange to clear errors on input
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      setProduct({
        ...product,
        [name]: files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[#0a0908]">
      <div className="max-w-3xl p-8 mx-auto rounded-4xl shadow-lg bg-[#132a13]">
        <div className="mb-8 text-white">
          <h2 className="text-3xl font-bold ">Add New Products</h2>
          <div className="h-1 mt-2 bg-blue-600 w-65"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6 text-white"
        >
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full p-2 mt-1 text-white placeholder-gray-400 bg-transparent border rounded-md shadow-sm focus:ring-blue-500 
                          ${
                            errors.name && touched.name
                              ? "border-red-500"
                              : "border-white"
                          } 
                          focus:border-blue-500`}
              placeholder="Enter product title"
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              className={`block w-full p-2 mt-1 text-white placeholder-gray-400 bg-transparent border rounded-md shadow-sm focus:ring-blue-500 
                                         ${
                                           errors.description &&
                                           touched.description
                                             ? "border-red-500"
                                             : "border-white"
                                         } 
                                         focus:border-blue-500`}
              placeholder="Enter product description"
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Price and Stock Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full p-2 mt-1 placeholder-gray-400 bg-transparent border rounded-md shadow-sm focus:ring-blue-500 
                        ${
                          errors.price && touched.price
                            ? "border-red-500"
                            : "border-white"
                        } 
                        focus:border-blue-500`}
                placeholder="0.00"
              />
              {errors.price && touched.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Stock Quantity
              </label>
              <input
                type="number"
                name="inStock"
                value={product.inStock}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full p-2 mt-1 placeholder-gray-400 bg-transparent border rounded-md shadow-sm focus:ring-blue-500 
               ${
                 errors.inStock && touched.inStock
                   ? "border-red-500"
                   : "border-white"
               } 
               focus:border-blue-500`}
                placeholder="0"
              />
              {errors.inStock && touched.inStock && (
                <p className="mt-1 text-sm text-red-500">{errors.inStock}</p>
              )}
            </div>
          </div>

                    
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white">
              Product Image
            </label>
            <div className={`flex justify-center px-6 pt-5 pb-6 mt-1 transition-colors border-2 border-dashed rounded-md 
              ${errors.image && touched.image ? 'border-red-500' : 'border-white'} 
              hover:border-blue-500`}>
              <div className="space-y-1 text-center">
                <FaCloudUploadAlt className={`w-12 h-12 mx-auto ${errors.image && touched.image ? 'text-red-400' : 'text-gray-400'}`} />
                <div className="flex text-sm text-white">
                  <label
                    htmlFor="image"
                    className={`relative font-medium ${errors.image && touched.image ? 'text-red-400' : 'text-blue-400'} bg-white rounded-md cursor-pointer hover:text-blue-500`}
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      multiple
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-300">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {errors.image && touched.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
