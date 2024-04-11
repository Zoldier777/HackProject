
import Footer from './Footer'
import { QueryClient, QueryClientProvider } from "react-query"
import ProductGallery from './productgalley/Productgallery'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/navbar/Navbar'


const queryClient = new QueryClient()

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >
            <Route path="/" element={<ProductGallery/>} /> 
            <Route path="/search" element={<ProductGallery/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>


  )
}

export default App
