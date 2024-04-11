
const Product = ({id, name, price, description, condition,category, postedAtDate} : Props) => {

    const postedTime = new Date(postedAtDate).getTime();
    const currentTime = Date.now();
    const timeDifference = currentTime - postedTime;
    console.log(timeDifference);
    const isNew = timeDifference < 600000;

    return (
        <div className="card w-96 glass shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
            <div className="card-body">
                <h2 className="card-title flex justify-between">
                    <div>{name}</div>
                    <h6 className="pr-2">{price} SEK</h6>
                </h2>
                {isNew && <div className="badge badge-secondary absolute top-0 right-0">NEW</div>}
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