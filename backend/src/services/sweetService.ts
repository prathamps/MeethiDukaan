import pool from "../database/db"
import { Sweet } from "../types"

export class SweetService {
	async createSweet(data: Omit<Sweet, "id" | "created_at" | "updated_at">) {
		const result = await pool.query(
			`INSERT INTO sweets (name, category, price, quantity, description) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
			[
				data.name,
				data.category,
				data.price,
				data.quantity,
				data.description || null,
			]
		)
		return result.rows[0]
	}

	async getAllSweets() {
		const result = await pool.query("SELECT * FROM sweets ORDER BY name")
		return result.rows
	}

	async getSweetById(id: number) {
		const result = await pool.query("SELECT * FROM sweets WHERE id = $1", [id])
		return result.rows[0] || null
	}

	async searchSweets(
		name?: string,
		category?: string,
		minPrice?: number,
		maxPrice?: number
	) {
		let query = "SELECT * FROM sweets WHERE 1=1"
		const params: any[] = []
		let paramCount = 1

		if (name) {
			query += ` AND name ILIKE $${paramCount}`
			params.push(`%${name}%`)
			paramCount++
		}

		if (category) {
			query += ` AND category ILIKE $${paramCount}`
			params.push(`%${category}%`)
			paramCount++
		}

		if (minPrice !== undefined) {
			query += ` AND price >= $${paramCount}`
			params.push(minPrice)
			paramCount++
		}

		if (maxPrice !== undefined) {
			query += ` AND price <= $${paramCount}`
			params.push(maxPrice)
			paramCount++
		}

		query += " ORDER BY name"

		const result = await pool.query(query, params)
		return result.rows
	}

	async updateSweet(
		id: number,
		data: Partial<Omit<Sweet, "id" | "created_at" | "updated_at">>
	) {
		const fields: string[] = []
		const values: any[] = []
		let paramCount = 1

		if (data.name !== undefined) {
			fields.push(`name = $${paramCount}`)
			values.push(data.name)
			paramCount++
		}

		if (data.category !== undefined) {
			fields.push(`category = $${paramCount}`)
			values.push(data.category)
			paramCount++
		}

		if (data.price !== undefined) {
			fields.push(`price = $${paramCount}`)
			values.push(data.price)
			paramCount++
		}

		if (data.quantity !== undefined) {
			fields.push(`quantity = $${paramCount}`)
			values.push(data.quantity)
			paramCount++
		}

		if (data.description !== undefined) {
			fields.push(`description = $${paramCount}`)
			values.push(data.description)
			paramCount++
		}

		fields.push(`updated_at = CURRENT_TIMESTAMP`)
		values.push(id)

		const query = `UPDATE sweets SET ${fields.join(
			", "
		)} WHERE id = $${paramCount} RETURNING *`
		const result = await pool.query(query, values)
		return result.rows[0] || null
	}

	async deleteSweet(id: number) {
		const result = await pool.query(
			"DELETE FROM sweets WHERE id = $1 RETURNING *",
			[id]
		)
		return result.rows[0] || null
	}

	async purchaseSweet(sweetId: number, userId: number, quantity: number) {
		const client = await pool.connect()

		try {
			await client.query("BEGIN")

			const sweetResult = await client.query(
				"SELECT * FROM sweets WHERE id = $1 FOR UPDATE",
				[sweetId]
			)

			if (sweetResult.rows.length === 0) {
				throw new Error("Sweet not found")
			}

			const sweet = sweetResult.rows[0]

			if (sweet.quantity < quantity) {
				throw new Error("Insufficient quantity in stock")
			}

			await client.query(
				"UPDATE sweets SET quantity = quantity - $1 WHERE id = $2",
				[quantity, sweetId]
			)

			const totalPrice = sweet.price * quantity

			const purchaseResult = await client.query(
				`INSERT INTO purchases (user_id, sweet_id, quantity, total_price) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
				[userId, sweetId, quantity, totalPrice]
			)

			await client.query("COMMIT")
			return purchaseResult.rows[0]
		} catch (error) {
			await client.query("ROLLBACK")
			throw error
		} finally {
			client.release()
		}
	}

	async restockSweet(sweetId: number, quantity: number) {
		const result = await pool.query(
			"UPDATE sweets SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
			[quantity, sweetId]
		)
		return result.rows[0] || null
	}
}
