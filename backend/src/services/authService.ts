import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../database/db"
import { User } from "../types"

export class AuthService {
	async register(email: string, password: string, isAdmin: boolean = false) {
		// not implemented yet
		return null
	}

	async login(email: string, password: string) {
		// not implemented yet
		return null
	}

	async findUserByEmail(email: string) {
		// not implemented yet
		return null
	}
}
