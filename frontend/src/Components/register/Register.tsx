import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


type FormData =  {
  email: string;
  password: string;
  name: string;
}

const Register = () => {
  
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    reset()
    try {
      const response = await fetch('http://localhost:5180/api/User/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      
      if (response.status === 201) {
          console.log("we here")
          return navigate("/login");
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">Join us now!</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm flex flex-col gap-3">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" {...register('name', { required: true })} type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl" placeholder="Name" />
            </div>

            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" {...register('email', { required: true })} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl" placeholder="Email address" />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" {...register('password', { required: true })} type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xl" placeholder="Password" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xl">
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Already have an account?</Link>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
