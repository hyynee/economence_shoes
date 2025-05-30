import axios from "axios";
import { history } from "..";

export const domain = 'http://localhost:8080'
export const USERLOGIN = "userLogin";
export const ADMINLOGIN = "adminLogin";
export const ACTIVE_SESSIONS = "activeSessions";

export const http = axios.create({
    baseURL: domain,
    timeout: 30000,
})

// api admin
http.interceptors.request.use((config) => {
    config.headers = { ...config.headers };
    const activeSessions = JSON.parse(sessionStorage.getItem(ACTIVE_SESSIONS) || '[]');
    // Get the most recently active session
    const currentSession = activeSessions.find(session => session.isActive);
    const token = currentSession?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use((res) => {
    return res;
}, err => {
    if (err.response?.status === 401) {
        history.push('/login')
    }
});

// Session storage utilities
export const sessionStorageUtils = {
    saveSession: (sessionData) => {
        const activeSessions = JSON.parse(sessionStorage.getItem(ACTIVE_SESSIONS) || '[]');
        // Check if session with same email already exists
        const existingSessionIndex = activeSessions.findIndex(session => session.email === sessionData.email);

        if (existingSessionIndex !== -1) {
            // Update existing session
            activeSessions[existingSessionIndex] = { ...sessionData, isActive: true };
        } else {
            // Add new session
            activeSessions.push({ ...sessionData, isActive: true });
        }

        // Deactivate other sessions
        activeSessions.forEach(session => {
            if (session.email !== sessionData.email) {
                session.isActive = false;
            }
        });

        sessionStorage.setItem(ACTIVE_SESSIONS, JSON.stringify(activeSessions));
    },

    getActiveSession: () => {
        const activeSessions = JSON.parse(sessionStorage.getItem(ACTIVE_SESSIONS) || '[]');
        return activeSessions.find(session => session.isActive) || null;
    },

    getAllSessions: () => {
        return JSON.parse(sessionStorage.getItem(ACTIVE_SESSIONS) || '[]');
    },

    switchSession: (email) => {
        const activeSessions = JSON.parse(sessionStorage.getItem(ACTIVE_SESSIONS) || '[]');
        activeSessions.forEach(session => {
            session.isActive = session.email === email;
        });
        sessionStorage.setItem(ACTIVE_SESSIONS, JSON.stringify(activeSessions));
    },

    removeSession: (email) => {
        const activeSessions = JSON.parse(sessionStorage.getItem(ACTIVE_SESSIONS) || '[]');
        const updatedSessions = activeSessions.filter(session => session.email !== email);
        sessionStorage.setItem(ACTIVE_SESSIONS, JSON.stringify(updatedSessions));
    },

    clearAllSessions: () => {
        sessionStorage.removeItem(ACTIVE_SESSIONS);
    }
};

// Local storage utilities (keeping for backward compatibility)
export const { saveStorageJSON, getStorageJSON, clearStorageJSON } = {
    saveStorageJSON: (name, data) => {
        let sData = JSON.stringify(data)
        localStorage.setItem(name, sData);
    },
    getStorageJSON: (name) => {
        if (localStorage.getItem(name)) {
            let sData = localStorage.getItem(name);
            let data = JSON.parse(sData);
            return data;
        }
        return {};
    },
    clearStorageJSON: (name) => {
        localStorage.removeItem(name)
    }
}