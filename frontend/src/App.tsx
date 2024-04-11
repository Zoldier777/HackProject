
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


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />} >
            {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
              <Route path="/" element={<ProductGallery />} />
              <Route path="/search" element={<ProductGallery />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/registerproduct" element={<ProductRegister/>} />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </>
  )
}

export default App
