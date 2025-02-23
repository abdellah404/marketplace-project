import axios from "axios";

class AuthService {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:8000/api",
        })
    }

    async login(credentials) {
        const response = await this.axios.post("/login",credentials)
        return response.data;
    }
    async register(credentials) {
        const response = await this.axios.post("/register",credentials)
        return response.data;
    }

    async fetchUser() {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(`${this.API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
}

export default new AuthService();
