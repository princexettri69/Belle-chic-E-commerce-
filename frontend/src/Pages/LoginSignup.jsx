import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // Capture error messages
    const [loading, setLoading] = useState(false); // Loading state to prevent duplicate clicks

    // Handle form input changes
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Validate input fields
    const validateForm = () => {
        if (state === "Sign Up" && !formData.username) {
            return "Username is required.";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            return "A valid email is required.";
        }
        if (!formData.password || formData.password.length < 6) {
            return "Password must be at least 6 characters.";
        }
        return "";
    }

    // Login Function
    const login = async () => {
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        setErrorMessage("");
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                setErrorMessage(responseData.errors || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    // Signup Function
    const signup = async () => {
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        setErrorMessage("");
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                setErrorMessage(responseData.errors || "Signup failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && (
                        <input 
                            name='username' 
                            value={formData.username} 
                            onChange={changeHandler} 
                            type="text" 
                            placeholder='Your Name' 
                            disabled={loading}
                        />
                    )}
                    <input 
                        name='email' 
                        value={formData.email} 
                        onChange={changeHandler}  
                        type="email" 
                        placeholder='Email Address' 
                        disabled={loading}
                    />
                    <input 
                        name='password' 
                        value={formData.password} 
                        onChange={changeHandler} 
                        type="password" 
                        placeholder='Password' 
                        disabled={loading}
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button 
                    onClick={() => { state === "Login" ? login() : signup() }}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Continue"}
                </button>
                {state === "Sign Up" ? (
                    <p className='loginsignup-login'>
                        Already have an account? <span onClick={() => { setState("Login") }}>Login</span>
                    </p>
                ) : (
                    <p className='loginsignup-login'>
                        Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span>
                    </p>
                )}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;
