import { ReactNode } from "react";

const ProductGrid = ({ children } : { children : ReactNode }) => {

    return (
        <div className="flex flex-col w-full md:w-auto flex items-center justify-center">
        <h1 className="text-4xl font-bold text-dark py-4 "> 🔥 News 🔥</h1>
        <div className="grid grid-cols-3 gap-10 pb-10">
            {children}
        </div>
        </div>
    );
};

export default ProductGrid;