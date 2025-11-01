import pool from "../database/db"
import { Sweet } from "../types"

export class SweetService {
	async createSweet(data: Omit<Sweet, "id" | "created_at" | "updated_at">) {
		// Not Implemented
		return null
	}

	async getAllSweets() {
		// Not Implemented
		return null
	}

	async getSweetById(id: number) {
		// Not Implemented
		return null
	}

	async searchSweets(
		name?: string,
		category?: string,
		minPrice?: number,
		maxPrice?: number
	) {
		// Not Implemented
		return null
	}

	async updateSweet(
		id: number,
		data: Partial<Omit<Sweet, "id" | "created_at" | "updated_at">>
	) {
		// Not Implemented
		return null
	}

	async deleteSweet(id: number) {
		// Not Implemented
		return null
	}

	async purchaseSweet(sweetId: number, userId: number, quantity: number) {
		// Not Implemented
		return null
	}

	async restockSweet(sweetId: number, quantity: number) {
		// Not Implemented
		return null
	}
}
