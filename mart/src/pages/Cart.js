import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1,
            }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
            }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice, 0);

    return (
        <div className='bg-white py-6 sm:py-8 lg:py-12'>
            <div className='mx-auto max-w-screen-lg px-4 md:px-8'>
                <div className='mb-6 sm:mb-10 lg:mb-16'>
                    <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Your Cart</h2>
                </div>

                <div className='mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6'>
                    {loading
                        ? loadingCart.map((el, index) => (
                              <div key={index} className='flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6'>
                                  <div className='h-48 w-32 bg-slate-200 animate-pulse'></div>
                                  <div className='flex flex-1 flex-col justify-between py-4'>
                                      <div className='h-6 w-24 bg-slate-200 animate-pulse mb-1'></div>
                                      <div className='h-6 w-16 bg-slate-200 animate-pulse mb-1'></div>
                                      <div className='h-6 w-12 bg-slate-200 animate-pulse'></div>
                                  </div>
                                  <div className='flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0'>
                                      <div className='flex flex-col items-start gap-2'>
                                          <div className='flex h-12 w-20 overflow-hidden rounded border'>
                                              <div className='flex flex-1 bg-slate-200 animate-pulse'></div>
                                          </div>
                                          <div className='h-6 w-12 bg-slate-200 animate-pulse'></div>
                                      </div>
                                      <div className='ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16'>
                                          <div className='h-6 w-12 bg-slate-200 animate-pulse'></div>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : data.map((product, index) => (
                              <div key={product?._id + 'Add To Cart Loading'} className=' hover:bg-slate-100 flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6'>
                                  <div className='h-48 w-32 overflow-hidden bg-gray-100'>
                                      <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='h-full w-full object-cover object-center transition duration-200 hover:scale-110' />
                                  </div>
                                  <div className='flex flex-1 flex-col justify-between py-4'>
                                      <div>
                                          <a href={'/product/' + product?.productId?._id} className='mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl'>
                                              {product?.productId?.productName}
                                          </a>
                                          <span className='block text-gray-500'>Category: {product?.productId.category}</span>
                                      </div>
                                      <div>
                                          <span className='mb-1 block font-bold text-gray-800 md:text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</span>
                                          <span className='flex items-center gap-1 text-sm text-gray-500'>
                                              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                                              </svg>
                                              In stock
                                          </span>
                                      </div>
                                  </div>
                                  <div className='flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0'>
                                      <div className= ' hover:bg-slate-100 flex flex-col items-start gap-2'>
                                          <div className='flex h-12 w-20 overflow-hidden rounded border'>
                                              <input type='number' value={product?.quantity} readOnly className='w-full px-2 py-2 outline-none ring-inset ring-indigo-300 transition duration-100 focus:ring' />
                                              <div className='flex flex-col divide-y border-l'>
                                                  <button onClick={() => increaseQty(product?._id, product?.quantity)} className='flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200'>
                                                      +
                                                  </button>
                                                  <button onClick={() => decreaseQty(product?._id, product?.quantity)} className='flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200'>
                                                      -
                                                  </button>
                                              </div>
                                          </div>
                                          <button onClick={() => deleteCartProduct(product?._id)} className='select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700'>
                                              <MdDelete className='inline' /> Delete
                                          </button>
                                      </div>
                                      <div className='ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16'>
                                          <span className='block font-bold text-gray-800 md:text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>

                <div className='flex flex-col items-end gap-4'>
                    <div className='w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs'>
                        <div className='space-y-1'>
                            <div className='flex justify-between gap-4 text-gray-500'>
                                <span>Quantity</span>
                                <span>{totalQty}</span>
                            </div>
                            <div className='flex justify-between gap-4 text-gray-500'>
                                <span>Total</span>
                                <span>{displayINRCurrency(totalPrice)}</span>
                            </div>
                        </div>
                    </div>

                    <button className='inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base'>
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
