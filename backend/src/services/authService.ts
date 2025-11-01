import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../database/db"
import { User } from "../types"

export class AuthService {
	async register(email: string, password: string, isAdmin: boolean = false) {
		const hashedPassword = await bcrypt.hash(password, 10)

		const result = await pool.query(
			"INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3) RETURNING id, email, is_admin",
			[email, hashedPassword, isAdmin]
		)

		return result.rows[0]
	}

	async login(email: string, password: string) {
		const result = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		])

		if (result.rows.length === 0) {
			throw new Error("Invalid credentials")
		}

		const user = result.rows[0]
		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword) {
			throw new Error("Invalid credentials")
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, is_admin: user.is_admin },
			process.env.JWT_SECRET!,
			{ expiresIn: "24h" }
		)

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				is_admin: user.is_admin,
			},
		}
	}

	async findUserByEmail(email: string) {
		const result = await pool.query(
			"SELECT id, email, is_admin FROM users WHERE email = $1",
			[email]
		)
		return result.rows[0] || null
	}
}
