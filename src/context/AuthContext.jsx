import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulate login validation
            if (email && password) {
                const userData = {
                    id: Date.now(),
                    email,
                    name: email.split('@')[0], // Generate name from email
                    avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=193A83&color=fff`
                };
                
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            } else {
                return { success: false, error: 'Please provide email and password' };
            }
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' };
        }
    };

    const signup = async (name, email, password) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulate signup validation
            if (name && email && password) {
                const userData = {
                    id: Date.now(),
                    name,
                    email,
                    avatar: `https://ui-avatars.com/api/?name=${name}&background=193A83&color=fff`
                };
                
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            } else {
                return { success: false, error: 'Please provide all required fields' };
            }
        } catch (error) {
            return { success: false, error: 'Signup failed. Please try again.' };
        }
    };

    const loginWithGoogle = async () => {
        try {
            // Simulate Google OAuth delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const userData = {
                id: Date.now(),
                name: 'Google User',
                email: 'user@gmail.com',
                avatar: 'https://ui-avatars.com/api/?name=Google+User&background=193A83&color=fff'
            };
            
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Google login failed. Please try again.' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
