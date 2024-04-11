import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Footer from '../../Footer';

const ProductDetail = () => {
  const { id } = useParams();

  const fetchProductDetail = async () => {
    const response = await fetch(`http://localhost:5180/api/Product/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { isLoading, isError, data: product } = useQuery<product>(['product', id], fetchProductDetail);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product</div>;

  return (
    <>
      <section className="flex justify-center items-center min-h-screen ">
        <div className="container flex-grow mx-auto max-w-[1300px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
          <div className="mx-auto px-5 lg:px-5 bg-slate-0">
            <h2 className="pt-3 text-3xl font-bold lg:pt-0">{product!.name}</h2>
           
            <p className="mt-5 font-bold">
              Availability: {product!.postedAtDate ? (<span className="text-green-600">Seller recently posted</span>) : (<span className="text-red-600">Might not have it</span>)}
            </p>
            <p className="font-bold">Category: <span className="font-normal">{product!.category}</span></p>
            <p className="mt-4 text-4xl font-bold text-violet-900">{product!.price} SEK</p>
            <p className="pt-5 font-bold text-sm leading-5">Seller opinion: <span className="font-normal">{product!.description}</span></p>

            <div className="mt-7 flex flex-row items-center gap-6">
              <button className="btn">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Add
              </button>
              <button className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Bookmark
              </button>
            </div>
          </div>
          <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
