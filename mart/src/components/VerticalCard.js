import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8'>
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={`loading-${index}`}
              className='flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm'
            >
              <div className='group relative block h-48 bg-gray-100 animate-pulse'></div>
              <div className='flex flex-1 flex-col p-4 sm:p-6'>
                <h2 className='mb-2 text-lg font-semibold text-gray-800 bg-slate-200 animate-pulse h-6 mb-2'></h2>
                <p className='mb-8 text-gray-500 bg-slate-200 animate-pulse h-4 mb-2'></p>
                <div className='mt-auto flex items-end justify-between'>
                  <div className='bg-slate-200 animate-pulse h-10 w-10 rounded-full'></div>
                  <span className='rounded border px-2 py-1 text-sm bg-slate-200 animate-pulse h-4 w-20'></span>
                </div>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              to={'/product/' + product?._id}
              className='flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md transition duration-300'
              key={product?._id}
              onClick={scrollTop}
            >
              <div className='group relative flex items-center justify-center h-48 bg-gray-100 overflow-hidden'>
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className='object-cover object-center transition duration-200 group-hover:scale-110 h-full'
                />
              </div>
              <div className='flex flex-1 flex-col p-4 sm:p-6'>
                <h2 className='mb-2 text-lg font-semibold text-gray-800'>
                  {product?.productName}
                </h2>
                <p className='mb-4 text-gray-500'>{product?.category}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-indigo-500'>
                      {displayINRCurrency(product?.sellingPrice)}
                    </span>
                    <span className='text-sm text-gray-400 line-through'>
                      {displayINRCurrency(product?.price)}
                    </span>
                  </div>
                  <button
                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition-colors duration-300'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;

