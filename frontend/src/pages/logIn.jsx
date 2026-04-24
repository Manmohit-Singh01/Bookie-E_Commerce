import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await api.post('/auth/login', formData);
    //         setMsg(response.data.message);
    //         navigate('/dashboard');
    //     } catch (error) {
    //         setMsg('Invalid email or password');
    //     }
    // }   

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In to Your Account</h2>
            </div>
        </div>
    );