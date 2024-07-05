import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])


  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            {heading}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-lg border bg-white"
                >
                  <div className="group relative block h-48 bg-gray-100 animate-pulse"></div>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800 bg-slate-200 animate-pulse h-6 mb-2"></h2>
                    <p className="mb-8 text-gray-500 bg-slate-200 animate-pulse h-4 mb-2"></p>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="bg-slate-200 animate-pulse h-10 w-10 rounded-full"></div>
                      <span className="rounded border px-2 py-1 text-sm bg-slate-200 animate-pulse h-4 w-20"></span>
                    </div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="flex flex-col overflow-hidden rounded-lg border bg-white"
                >
                  <Link
                    to={"product/" + product?._id}
                    className="flex flex-col items-center justify-center group relative block h-full bg-gray-100 md:h-64"
                  >
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="h-full object-cover object-center"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">
                      <Link
                        to={"product/" + product?._id}
                        className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                      >
                        {product?.productName}
                      </Link>
                    </h2>

                    <p className="mb-8 text-gray-500">{product?.category}</p>

                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                          <img
                            src={product.productImage[0]}
                            loading="lazy"
                            alt={product.productName}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div>
                          <span className="block text-indigo-500">
                            {displayINRCurrency(product?.sellingPrice)}
                          </span>
                          <span className="block text-sm text-gray-400 line-through">
                            {displayINRCurrency(product?.price)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition-colors duration-300"
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalCardProduct;
