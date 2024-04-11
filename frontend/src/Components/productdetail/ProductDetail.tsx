import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const ProductDetail = () => {
  const { id } = useParams(); 

  const { isLoading, isError, data: product } = useQuery<product>(['product', id], () =>
    fetch(`http://localhost:5180/api/Product/${id}`).then(res =>
      res.json()
    )
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product</div>;

  return (
    <div>
      <h2>{product!.id}</h2>
      <p>{product!.description}</p>
      <p>Price: {product!.price}</p>
    </div>
  );
};

export default ProductDetail;
