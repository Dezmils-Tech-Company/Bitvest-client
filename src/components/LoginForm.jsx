// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Loader from './loader';
import { FaUser, FaLock } from 'react-icons/fa'; // Import icons for username and password
import bitvestor from '../assets/bitvestor.png'; // Adjust the path as necessary
import '../styling/LoginForm.css'; // Import your CSS for styling

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Optional: for loading state
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (isLoading) {
        return <Loader/>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setIsLoading(true); // Optional: set loading state
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const responseData = await response.json();

            // The backend sends back a token
            const token = responseData.token;

            // Store the token 
            localStorage.setItem('token', token); 
            
            // Redirect to a protected area (e.g., dashboard)
            navigate('/dashboard'); // Adjust the path as needed
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Login failed. Please check your credentials.');
        }finally {
            setIsLoading(false); // Reset loading state
        }
        
    };

    


    return (
        <>
        <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title"><img src={bitvestor} alt="Bitvestor Logo" /> Login</h2>
            {error && <p className="error">{error}</p>}

                <label className="login-label" htmlFor="username"><FaUser /> Username:</label>
                <input
                    className="login-input"
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label className="login-label" htmlFor="password"><FaLock /> Password:</label>
                <input
                    className="login-input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            
            <button className="form-btn" type="submit">Login</button>
            <p className="sign-up-label">
                Don't have an account? <Link className="sign-up-link"  to="/signup">Sign up</Link>
            </p>
        </form>
        </div>
        </>
    );
};

export default LoginForm;

