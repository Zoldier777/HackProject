
import Footer from './Footer'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductGallery from './productgalley/Productgallery'


const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
          <ProductGallery/>
      </QueryClientProvider>
      <Footer/>
    </>
  )
}

export default App
