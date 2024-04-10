import { useState } from "react";
import { useQuery } from "react-query";
import Product from "../product/Product";
import ProductGrid from "../ProductGrid";

const ProductGallery = () => {
  const [pageOffset, setPageOffset] = useState<number>(0);

  async function getItems(query_page: number): Promise<product[]> {
    const url = `http://localhost:5180/api/Product?offset=${query_page}&number=${6}`;
    const response = await fetch(url);
    const json_response = await response.json();
    const products = json_response as product[];
    return products;
  }

  const {
    isLoading,
    isError,
    data: products,
  } = useQuery<product[], Error>({
    queryKey: ['todos', pageOffset],
    queryFn: () => getItems(pageOffset),
    keepPreviousData: true
  });

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred:';

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (

        <div>
          <ProductGrid>
            {products!.map(product => (
              <Product key={product.id} {...product} />
            ))}
          </ProductGrid>
          <div className="flex justify-center gap-10 w-full pb-4" >
            <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page - 5))}>Previous</button>
            <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page + 5))}>Next</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;