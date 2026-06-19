import { Link } from "react-router-dom";
import { getProducts } from "../data/products"

function Home() {
    const products = getProducts();
    return (
        <div className="page">
            <div className="home-hero">
                <h1 className="home-title">Welcome to ShopHub</h1>
                <p className="home-subtitle">Discover amazing products at great prices!</p>
            </div>
            <div className="container">
                <h2 className="page-title">Our Products</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        /* When looping over a list using map(), you need to produce a "key" property whch is unqiue for each item in the list*/
                        <div className="product-card" key={product.id}>
                            <img className="product-card-image" src={product.image}/>
                            <div className="product-card-content">
                                <h3 className="product-card-name">{product.name}</h3>
                                <p className="product-card-price">£{product.price}</p>
                                <div className="product-card-actions">
                                    <Link className="btn btn-secondary">View Details</Link>
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ) )}
                </div>
            </div>
        </div>
    )
}

export default Home
{/* Make sure to export the function that represents your component */}