import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

{/* Context is a way of passing state information between components, especially those that aren't related (ie. don't have a parent-child relationship) */}
const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {
        const existing = cartItems.find((item) => item.id === productId);
        if (existing) {
            // To update a state variable that is an array/list,
            // save your modifications to a new list and set the state variable to the new list
            const currentQuantity = existing.quantity;
            const updatedCartItems = cartItems.map((item) =>
                item.id === productId
                ? {id: productId, quantity: currentQuantity + 1}
                : item
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, {id: productId, quantity: 1}])
        }
    }

    function getCartItemsWithProducts() {
        return cartItems.map(item => ({...item, product: getProductById(item.id)})).filter(item => item.product);
    }

    function removeFromCart(productId) {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        // Here "{...item, quantity}" means create a new object with all the properties of "item" but change the "quantity" property to the value of the "quantity" method parameter
        setCartItems(cartItems.map((item) => item.id === productId ? {...item, quantity} : item));
    }

    function getCartTotal() {
        // reduce() loops through each item in the array and provides a callback function with a "total" parameter that keeps track of a number through each loop
        // reduce()'s second parameter (0) defines the initial value of "total" in the callback.
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id)
            return total + (product ? product.price * item.quantity : 0)
        }, 0);

        return total;
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{cartItems, addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

// This is a custom React hook
// It is used to export the CartContext with explicitly doing so
// Instead, users can import the useCart() hook to get access to the context
export function useCart() {
    const context = useContext(CartContext);

    return context;
}