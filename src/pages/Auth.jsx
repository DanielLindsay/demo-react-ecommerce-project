import { useState } from "react"
import { useForm } from "react-hook-form";

function Auth() {
    const [mode, setMode] = useState("signup");

    {
        /*
        register: Allows you to register input element values as form values for React to handle.
        handleSubmit: A method that performs validation on the form before passing the data on to the "real" submit method.
        formState: an object that holds form information. Used to get validation errors in this case.
         */
    }
    const {register, handleSubmit, formState: {errors}} = useForm();

    function onSubmit() {
        alert("Passed validation");
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            {/* htmlFor is the React version of HTML's for attribute. Use it to relate a label to an input element */}
                            <label className="form-label" htmlFor="email">Email</label>
                            <input 
                                className="form-input"
                                type="email"
                                id="email"
                                {...register("email", {required: "Email is required"})}
                            />
                            {/* the && operator is a JavaScript shorthand for a single line if statment: if X = true && do Y */}
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input 
                                className="form-input"
                                type="passwords"
                                id="password"
                                {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Password must be less than 12 characters"
                                        }
                                    }
                                )}
                            />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            {mode === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>
                                Already have an account? <span className="auth-link" onClick={() => setMode("login")}>Login</span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span>
                            </p>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth