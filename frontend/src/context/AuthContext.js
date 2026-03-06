import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api, { authApi } from '../utils/api';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUserFromCookies = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const { data } = await api.get('user');
                    setUser(data);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    Cookies.remove('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        loadUserFromCookies();
    }, []);

    const login = async (email, password, remember) => {
        await authApi.get('sanctum/csrf-cookie');
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        const { data } = await api.post('login', { email, password, remember }, {
            headers: {
                'X-XSRF-TOKEN': xsrfToken
            }
        });
        if (data.access_token) {
            const cookieOptions = remember ? { expires: 30 } : {};
            Cookies.set('token', data.access_token, cookieOptions);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        }
    };

    const register = async (userData) => {
        await authApi.get('sanctum/csrf-cookie');
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        const { data } = await api.post('register', userData, {
            headers: {
                'X-XSRF-TOKEN': xsrfToken
            }
        });
        if (data.access_token) {
            Cookies.set('token', data.access_token);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        }
    };

    const logout = async () => {
        try {
            await api.post('logout');
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            Cookies.remove('token');
            localStorage.removeItem('user');
            setUser(null);
            router.push('/sign-in');
        }
    };

    const updateUserData = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, setUser: updateUserData, login, register, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
