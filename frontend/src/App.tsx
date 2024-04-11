
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductGallery from './Components/productgalley/Productgallery'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/navbar/Navbar'
import ProductDetail from './Components/productdetail/ProductDetail'


const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />} >
              <Route path="/" element={<ProductGallery />} />
              <Route path="/search" element={<ProductGallery />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </>
  )
}

export default App
