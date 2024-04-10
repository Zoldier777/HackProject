import { Link } from "react-router-dom";

const Product = ({id, name, price, description, condition,category, postedAtDate} : Props) => {

    const postedTime = new Date(postedAtDate).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - postedTime;
    const isNew = timeDifference < 600000;

    return (
        <Link to={`/product/${id}`} className="product-link">
        <div className="card w-96 glass shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
            <div className="card-body">
                <div className="card-title flex justify-between">
                    <div>{name}</div>
                    <h6 className="pr-2">{price} SEK</h6>
                </div>
                {isNew && <div className="badge badge-secondary absolute top-0 right-0">NEW</div>}
                <div className="card-actions justify-between py-2">
                    <div className="card-actions grid grid-cols-2 gap-2">
                        <div className="badge badge-outline">{category}</div>
                        {price < 200 ? <div className="badge badge-outline">Cheap</div> : null}
                        <div className="badge badge-outline">{condition}</div>
                    </div>
                    <button className="btn btn-primary">Buy now!</button>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default Product;