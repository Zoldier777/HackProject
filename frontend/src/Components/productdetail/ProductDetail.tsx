import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams(); 


  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {/* Add more detailed information about the product */}
    </div>
  );
};

export default ProductDetail;