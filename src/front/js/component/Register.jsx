import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/register.css";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.BACKEND_URL}/api/add_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('User created successfully!');
            navigate('/login');
        } else {
            alert('Failed to create user');
        }
    };

    return (
        <div className="register">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Log in</a></p> {/* Opcional, si quieres un enlace al login */}
        </div>
    );
};
