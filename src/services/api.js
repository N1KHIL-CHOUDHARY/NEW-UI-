// API Service - Centralized API management
// This file contains all API calls and can be easily modified to point to real endpoints

// Base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000; // 10 seconds

// Helper function to create API request
const createRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

        const response = await fetch(url, {
            ...config,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        if (error.name === 'AbortError') {
            return { success: false, error: 'Request timeout. Please try again.' };
        }
        return { success: false, error: error.message || 'An error occurred' };
    }
};

// Simulate API delay for development
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication Services
export const authService = {
    // Login with email and password
    login: async (email, password) => {
        await simulateDelay(1000); // Simulate network delay
        
        // Simulate validation
        if (!email || !password) {
            return { success: false, error: 'Email and password are required' };
        }

        // Simulate successful login
        const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=193A83&color=fff`,
            token: `mock_token_${Date.now()}`
        };

        // Store token for future requests
        localStorage.setItem('authToken', userData.token);
        
        return { success: true, data: userData };
    },

    // Register new user
    signup: async (name, email, password) => {
        await simulateDelay(1000); // Simulate network delay
        
        // Simulate validation
        if (!name || !email || !password) {
            return { success: false, error: 'All fields are required' };
        }

        // Simulate successful registration
        const userData = {
            id: Date.now(),
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=193A83&color=fff`,
            token: `mock_token_${Date.now()}`
        };

        // Store token for future requests
        localStorage.setItem('authToken', userData.token);
        
        return { success: true, data: userData };
    },

    // Google OAuth login
    loginWithGoogle: async () => {
        await simulateDelay(1500); // Simulate OAuth flow delay
        
        const userData = {
            id: Date.now(),
            name: 'Google User',
            email: 'user@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Google+User&background=193A83&color=fff',
            token: `google_token_${Date.now()}`
        };

        // Store token for future requests
        localStorage.setItem('authToken', userData.token);
        
        return { success: true, data: userData };
    },

    // Logout user
    logout: async () => {
        await simulateDelay(500); // Simulate network delay
        
        // Clear stored token
        localStorage.removeItem('authToken');
        
        return { success: true };
    },

    // Verify current token
    verifyToken: async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return { success: false, error: 'No token found' };
        }

        await simulateDelay(500);
        
        // Simulate token verification
        return { success: true, data: { valid: true } };
    },

    // Refresh token
    refreshToken: async () => {
        await simulateDelay(500);
        
        const newToken = `refreshed_token_${Date.now()}`;
        localStorage.setItem('authToken', newToken);
        
        return { success: true, data: { token: newToken } };
    }
};

// File Upload Services
export const fileService = {
    // Upload file for analysis
    uploadFile: async (file) => {
        await simulateDelay(2000); // Simulate upload time
        
        // Simulate file validation
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        if (file.type !== 'application/pdf') {
            return { success: false, error: 'Only PDF files are allowed' };
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            return { success: false, error: 'File size must be less than 10MB' };
        }

        // Simulate successful upload
        const fileData = {
            id: Date.now(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
            status: 'uploaded',
            analysisId: `analysis_${Date.now()}`
        };

        return { success: true, data: fileData };
    },

    // Get file analysis status
    getAnalysisStatus: async (fileId) => {
        await simulateDelay(500);
        
        // Simulate analysis status
        const statuses = ['uploaded', 'processing', 'analyzing', 'completed', 'failed'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        return { 
            success: true, 
            data: { 
                fileId, 
                status: randomStatus,
                progress: randomStatus === 'completed' ? 100 : Math.floor(Math.random() * 90)
            } 
        };
    },

    // Get file analysis results
    getAnalysisResults: async (fileId) => {
        await simulateDelay(1000);
        
        // Simulate analysis results
        const results = {
            fileId,
            summary: "This is a mock summary generated by the AI after analyzing your document. It highlights the main arguments, identifies key entities, and provides a concise overview of the content to help you quickly grasp the core information without reading the entire file.",
            keyPoints: [
                "Key point 1: Important information extracted from the document",
                "Key point 2: Another significant finding",
                "Key point 3: Additional insights from the analysis"
            ],
            entities: [
                { name: "Entity 1", type: "Person", confidence: 0.95 },
                { name: "Entity 2", type: "Organization", confidence: 0.87 },
                { name: "Entity 3", type: "Location", confidence: 0.92 }
            ],
            sentiment: "positive",
            confidence: 0.88,
            createdAt: new Date().toISOString()
        };

        return { success: true, data: results };
    },

    // Get user's files
    getUserFiles: async () => {
        await simulateDelay(800);
        
        // Simulate user files
        const files = [
            {
                id: 1,
                name: "sample-document-1.pdf",
                size: 1024000,
                uploadDate: "2024-01-15T10:30:00Z",
                status: "completed",
                analysisId: "analysis_1"
            },
            {
                id: 2,
                name: "sample-document-2.pdf",
                size: 2048000,
                uploadDate: "2024-01-14T15:45:00Z",
                status: "processing",
                analysisId: "analysis_2"
            }
        ];

        return { success: true, data: files };
    },

    // Delete file
    deleteFile: async (fileId) => {
        await simulateDelay(500);
        
        return { success: true, data: { fileId, deleted: true } };
    }
};

// Document Services
export const documentService = {
    // Get document summary
    getSummary: async (documentId) => {
        await simulateDelay(1000);
        
        const summary = {
            id: documentId,
            title: "Document Summary",
            content: "This is a comprehensive summary of the document content, highlighting key points and insights.",
            wordCount: 250,
            createdAt: new Date().toISOString()
        };

        return { success: true, data: summary };
    },

    // Chat with document
    chatWithDocument: async (documentId, message) => {
        await simulateDelay(1500); // Simulate AI processing time
        
        const response = {
            id: Date.now(),
            documentId,
            userMessage: message,
            aiResponse: "This is a RAG-generated answer based on the document content. The AI has analyzed the document and provided this response based on the available information.",
            timestamp: new Date().toISOString(),
            confidence: 0.85
        };

        return { success: true, data: response };
    }
};

// User Services
export const userService = {
    // Get user profile
    getProfile: async () => {
        await simulateDelay(500);
        
        const profile = {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=193A83&color=fff",
            joinDate: "2024-01-01T00:00:00Z",
            totalFiles: 5,
            totalAnalysis: 12
        };

        return { success: true, data: profile };
    },

    // Update user profile
    updateProfile: async (profileData) => {
        await simulateDelay(1000);
        
        return { success: true, data: { ...profileData, updatedAt: new Date().toISOString() } };
    }
};

// Error handling utility
export const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
        // Server responded with error status
        return error.response.data?.message || 'Server error occurred';
    } else if (error.request) {
        // Request was made but no response received
        return 'Network error. Please check your connection.';
    } else {
        // Something else happened
        return error.message || 'An unexpected error occurred';
    }
};

// Export all services
export default {
    authService,
    fileService,
    documentService,
    userService,
    handleApiError
};
