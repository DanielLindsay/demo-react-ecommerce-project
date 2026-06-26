import { createContext, useContext, useState } from "react";

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

    return (
        <CartContext.Provider value={{cartItems, addToCart}}>{children}</CartContext.Provider>
    )
}

// This is a custom React hook
// It is used to export the CartContext with explicitly doing so
// Instead, users can import the useCart() hook to get access to the context
export function useCart() {
    const context = useContext(CartContext);

    return context;
}