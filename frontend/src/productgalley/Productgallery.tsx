import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../product/Product";

const ProductGallery = () => {
    const [pageOffset, setPageOffset] = useState<number>(0);
    const [searchParams] = useSearchParams();

    async function getItems(query_page: number, query_search: string): Promise<product[]> {
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
        queryFn: () => getItems(pageOffset, searchParams.get("search") ?? "news")
    });

    if (isLoading) return 'Loading...';

    if (isError) return 'An error has occurred:';

    return (
        <div className="flex flex-col w-full md:w-auto flex items-center justify-center">
            <h1 className="text-4xl font-bold text-dark py-4 ">Category</h1>
            <div className="grid grid-cols-3 gap-10 pb-10">
                {products!.map(product => (
                    <Product key={product.id}   
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    condition={product.condition}
                    category={product.category}
                    postedAtDate={product.postedAtDate}/>
                ))}
            </div>
            <div className="flex justify-center gap-10 w-full pb-4" >
                <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page - 5))}>Previous</button>
                <button className="btn" onClick={() => setPageOffset((page) => Math.max(0, page + 5))}>Next</button>
            </div>
        </div>
    );
};

export default ProductGallery;
