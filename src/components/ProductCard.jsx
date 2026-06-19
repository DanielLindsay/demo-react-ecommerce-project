import {Link} from 'react-router-dom'

{/* {product} is a custom property of the ProductCard component e.g. <ProductCard product={id:3, name:"broom"} /> */}
function ProductCard({product}) {
    return (
        <div className="product-card">
            <img className="product-card-image" src={product.image} alt={product.name}/>
            <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">£{product.price}</p>
                <div className="product-card-actions">
                    <Link className="btn btn-secondary">View Details</Link> {/* todo: add "to" property */}
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;