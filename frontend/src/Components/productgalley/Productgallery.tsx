import { useState } from "react";
import { useQuery } from "react-query";
import Product from "../product/Product";
import Footer from "../../Footer";
import { useLocation } from "react-router-dom";

const ProductGallery = () => {
  const [pageOffset, setPageOffset] = useState<number>(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');

  async function getItems(query_page: number): Promise<product[]> {
    const url = `http://localhost:5180/api/Product?offset=${query_page}&number=${6}&category=${searchQuery ?? 'News'}`;
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
    queryKey: ['gallery', pageOffset, searchQuery],
    queryFn: () => getItems(pageOffset),
    keepPreviousData: true
  });

  const renderProducts = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error</div>;
    }
    return (
      <div className={`grid grid-cols-${products!.length > 0 ? '3' : '1'} gap-10 pb-10`}>
        {products?.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <section className="w-full">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-dark py-4">Product Gallery</h1>
          {renderProducts()}
        </div>
      </section>
      <div className="flex justify-center gap-1 w-full pb-4">
      {pageOffset > 0 && (
        <div>
          <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page - 6))}>Previous</button>
        </div>
      )}
      {products && products.length == 6 && (
        <div>
          <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page + 6))}>Next</button>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductGallery;
