import Footer from './Footer'
import Navbar from './Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from "react-router-dom"

const queryClient = new QueryClient()

function App() {
  return (
    <>

      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </>
  )
}

export default App
