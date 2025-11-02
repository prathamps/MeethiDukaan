import axios from "axios"

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api"
console.log(import.meta.env.VITE_API_URL)

const api = axios.create({
	baseURL: API_URL,
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export interface Sweet {
	id: number
	name: string
	category: string
	price: number
	quantity: number
	description?: string
}

export const authService = {
	register: async (email: string, password: string) => {
		const response = await api.post("/auth/register", { email, password })
		return response.data
	},
	login: async (email: string, password: string) => {
		const response = await api.post("/auth/login", { email, password })
		return response.data
	},
}

export const sweetService = {
	getAll: async (): Promise<Sweet[]> => {
		const response = await api.get("/sweets")
		return response.data
	},
	search: async (params: {
		name?: string
		category?: string
		minPrice?: number
		maxPrice?: number
	}): Promise<Sweet[]> => {
		const response = await api.get("/sweets/search", { params })
		return response.data
	},
	create: async (sweet: Omit<Sweet, "id">): Promise<Sweet> => {
		const response = await api.post("/sweets", sweet)
		return response.data
	},
	update: async (id: number, sweet: Partial<Sweet>): Promise<Sweet> => {
		const response = await api.put(`/sweets/${id}`, sweet)
		return response.data
	},
	delete: async (id: number): Promise<void> => {
		await api.delete(`/sweets/${id}`)
	},
	purchase: async (id: number, quantity: number): Promise<void> => {
		await api.post(`/sweets/${id}/purchase`, { quantity })
	},
	restock: async (id: number, quantity: number): Promise<Sweet> => {
		const response = await api.post(`/sweets/${id}/restock`, { quantity })
		return response.data
	},
}

export default api
