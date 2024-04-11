import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  password: string;
  price: number;
  description: string;
  condition: 'mint' | 'used';
  category: 'electronics' | 'clothing' | 'sports';
};

const Register = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    reset();
    try {
      const response = await fetch('http://localhost:5180/api/User/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        console.log('Item added successfully');
        return navigate('/login');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">Put an item for sale</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm flex flex-col gap-3">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                {...register('name', { required: true })}
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl"
                placeholder="Item"
              />
            </div>

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                {...register('email', { required: true })}
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl"
                placeholder="Email address"
              />
            </div>  

            <div>
              <label htmlFor="price" className="sr-only">
                Price
              </label>
              <input
                id="price"
                {...register('price', { required: true })}
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl"
                placeholder="Price in SEK"
              />
            </div>

            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <input
                id="description"
                {...register('description', { required: true })}
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl"
                placeholder="Description"
              />
            </div>

            <div>
              <label htmlFor="condition" className="sr-only">
                Condition
              </label>
              <select
                id="condition"
                {...register('condition', { required: true })}
                required
                className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl"
              >
                <option value="">Select Condition</option>
                <option value="mint">Mint</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <select
                id="category"
                {...register('category', { required: true })}
                required
                className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl"
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>
         
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
