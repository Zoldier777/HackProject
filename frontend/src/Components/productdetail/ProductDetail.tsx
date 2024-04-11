

import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); 

  async function getItem(query_page: number): Promise<product> {
    const url = `http://localhost:5180/api/Product/${id}`;
    const response = await fetch(url);
    const json_response = await response.json();
    const product = json_response as product;
    return product;
  }


  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetail;
