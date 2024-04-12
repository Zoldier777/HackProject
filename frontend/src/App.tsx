
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductGallery from './Components/productgalley/Productgallery'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/navbar/Navbar'
import ProductDetail from './Components/productdetail/ProductDetail'
import Register from './Components/register/Register'
import Login from './Components/login/Login'
import { useEffect, useState } from 'react'
import ProductRegister from './Components/ProductRegister'

const queryClient = new QueryClient()
type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5180/api/User/user', {
          credentials: 'include'
        });
        if (response.ok) {
          console.log(response);
          setIsLoggedIn(true);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<ProductGallery/>} />
            <Route path="/search" element={<ProductGallery />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={isLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerproduct" element={<ProductRegister IsLoggedIn={isLoggedIn} />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
