import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Locale": typeof window !== "undefined" ? localStorage.getItem("locale") : "en",
        "X-Timezone": typeof window !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            config.headers["X-API-Key"] = atob(localStorage.getItem("apiKey") || "");
            config.headers["X-API-Token"] = atob(localStorage.getItem("csrfToken") || "");
        } else {
            console.log('Running on server side - localStorage not available');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    console.error("Bad Request:", data.message || data);
                    break;
                case 401:
                    console.error("Unauthorized. Redirecting to login...");
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("apiKey");
                        localStorage.removeItem("csrfToken");
                        window.location.href = "/login";
                    }
                    break;
                case 403:
                    console.error("Forbidden:", data.message || "No permission");
                    break;
                case 404:
                    console.error("Not Found:", data.message || "Resource not found");
                    break;
                case 419:
                    console.error("CSRF Token mismatch:", data.message || "Session expired");
                    break;
                case 422:
                    console.error("Validation error:", data.errors || data.message);
                    break;
                case 500:
                    console.error("Server error:", data.message || "Something went wrong");
                    break;
                default:
                    console.error(`Error ${status}:`, data.message || data);
            }
        } else if (error.request) {
            console.error("Network error:", error.message);
        } else {
            console.error("Axios error:", error.message);
        }
        return Promise.reject(error);
    }
);

export { api };