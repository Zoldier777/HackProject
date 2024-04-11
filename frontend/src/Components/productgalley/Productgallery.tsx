import { useState } from "react";
import { useQuery } from "react-query";
import Product from "../product/Product";
import Footer from "../../Footer";

const ProductGallery = () => {
  const [pageOffset, setPageOffset] = useState<number>(0);

  async function getItems(query_page: number): Promise<product[]> {
    const url = `http://localhost:5180/api/Product?offset=${query_page}&number=${6}&category=News`;
    const response = await fetch(url);
    const json_response = await response.json();
    const products = json_response as product[];
    return products;
  }

  const {
    isLoading,
    isError,
    data: products,
  } = useQuery<product[]>({
    queryKey: ['gallery', pageOffset,],
    queryFn: () => getItems(pageOffset),
    keepPreviousData: true
  });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
        <div className="flex flex-col w-full md:w-auto flex items-center justify-center">
        <h1 className="text-4xl font-bold text-dark py-4 "> 🔥 News 🔥</h1>
        <div className="grid grid-cols-3 gap-10 pb-10">
        {products!.map(product => (
              <Product key={product.id} {...product} />
            ))}
        </div>
        <div className="flex justify-center gap-10 w-full pb-4" >
            <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page - 6))}>Previous</button>
            <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page + 6))}>Next</button>
          </div>
        </div>
        <Footer/>
        </div>
        
       
      )}
    </>
  );
};

export default ProductGallery;