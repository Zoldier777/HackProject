
const Product = () => {
    return (
        <div className="card w-96 glass shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title">Life hack
                    <div className="badge badge-secondary">NEW</div></h2>
                <p>How to park your car at your garage?</p>
                <div className="card-actions justify-between ">
                    <div className="card-actions grid grid-cols-2 gap-2 pt-2">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Bargain</div>
                        <div className="badge badge-outline">FactoryNew</div>
                    </div>
                    <button className="btn btn-primary">Buy now!</button>
                </div>
            </div>
        </div>
    );
};

export default Product;