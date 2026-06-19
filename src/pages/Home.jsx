import { Link } from "react-router-dom";
import { getProducts } from "../data/products"
import ProductCard from "../components/ProductCard";

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
                        /* When looping over a list using map(), you need to produce a "key" property whch is unqiue for each item in the list */
                        /* Note that "key" is not a property that is used directly by the ProductCard component, it is used by the React library */
                        <ProductCard key={product.id} product={product}/>
                    ) )}
                </div>
            </div>
        </div>
    )
}

export default Home
{/* Make sure to export the function that represents your component */}