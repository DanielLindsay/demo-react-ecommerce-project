import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            {/* JSX elements need to use the property "className" because "class" (the normal HTML version) is reserved */}
            <div className="navbar-container">
                {/* When using react Router, it is recommended to use react's <Link> component, rather than the standard <a> element */}
                <Link to="/" className="navbar-brand">
                    ShopHub
                </Link>
                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/checkout">Cart</Link>
                </div>
                <div className="navbar-auth">
                    <Link to="/auth" className="btn btn-secondary">Login</Link>
                    <Link to="/auth" className="btn btn-primary">Signup</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;