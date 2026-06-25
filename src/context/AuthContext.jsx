import { createContext, useContext, useState } from "react";

{/* Context is a way of passing state information between components, especially those that aren't related (ie. don't have a parent-child relationship) */}
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(
        // Default the user to the currently logged-in user by checking for "currentUserEmail" in localStorage
        localStorage.getItem("currentUserEmail") ? { email: localStorage.getItem("currentUserEmail") } : null
    );

    function signUp(email, password) {
        // Get users array from localStorage
        // If the localStorage does not have an item called "users" create an empty array instead
        const users = JSON.parse(localStorage.getItem('users') || "[]"); 

        // If user already exists
        if (users.find(u => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }
        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users)); // Objects stored in localStorage must be stringified
        localStorage.setItem("currentUserEmail", email); // Store user email so it can be retrieved if state is lost when the page is refreshed

        // Put the signed-in user in the react state
        setUser({ email });

        return { success: true };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || "[]");
        const user = users.find(u => u.email === email && u.password === password);
        
        // If the user's email/password combination could not be found
        if (!user) {
            return { success: false, error: "Invalid email or password" };
        }

        // Set the user in the state if the login was successful
        localStorage.setItem("currentUserEmail", email);
        setUser({ email });

        return { success: true };
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signUp, user, login, logout }}>{children}</AuthContext.Provider>
    )
}

// This is a custom React hook
// It is used to export the AuthContext with explicitly doing so
// Instead, users can import the useAuth() hook to get access to the context
export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}