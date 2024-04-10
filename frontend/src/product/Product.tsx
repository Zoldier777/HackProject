
const Product = ({id, name, price,description, condition,category, postedAtDate} : Props) => {
    return (
        <div className="card w-96 glass shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title flex justify-between">
                    <div>{name}</div>
                    
                    <h6>{price} SEK</h6>
                </h2>
                {/* <p>How to park your car at your garage?</p> */}
                <div className="card-actions justify-between py-2">
                    <div className="card-actions grid grid-cols-2 gap-2">
                        <div className="badge badge-outline">{category}</div>
                        {price < 200 ? <div className="badge badge-outline">Bargain</div> : null}
                        <div className="badge badge-outline">{condition}</div>
                    </div>
                    <button className="btn btn-primary">Buy now!</button>
                </div>
            </div>
        </div>
    );
};

export default Product;