import { AuthService } from "../services/authService"
import pool from "../database/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

jest.mock("../database/db")
jest.mock("bcrypt")
jest.mock("jsonwebtoken")

describe("AuthService", () => {
	let authService: AuthService
	const mockPool = pool as jest.Mocked<typeof pool>

	beforeEach(() => {
		authService = new AuthService()
		jest.clearAllMocks()
	})

	describe("register", () => {
		it("should register a new user successfully", async () => {
			const mockUser = { id: 1, email: "test@example.com", is_admin: false }
			;(bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword")
			mockPool.query.mockResolvedValue({ rows: [mockUser] } as any)

			const result = await authService.register(
				"test@example.com",
				"password123"
			)

			expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10)
			expect(mockPool.query).toHaveBeenCalledWith(
				"INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3) RETURNING id, email, is_admin",
				["test@example.com", "hashedPassword", false]
			)
			expect(result).toEqual(mockUser)
		})

		it("should register an admin user", async () => {
			const mockAdmin = { id: 1, email: "admin@example.com", is_admin: true }
			;(bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword")
			mockPool.query.mockResolvedValue({ rows: [mockAdmin] } as any)

			const result = await authService.register(
				"admin@example.com",
				"password123",
				true
			)

			expect(result.is_admin).toBe(true)
		})
	})

	describe("login", () => {
		it("should login successfully with valid credentials", async () => {
			const mockUser = {
				id: 1,
				email: "test@example.com",
				password: "hashedPassword",
				is_admin: false,
			}
			mockPool.query.mockResolvedValue({ rows: [mockUser] } as any)
			;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
			;(jwt.sign as jest.Mock).mockReturnValue("mockToken")

			const result = await authService.login("test@example.com", "password123")

			expect(result).toHaveProperty("token", "mockToken")
			expect(result.user).toEqual({
				id: 1,
				email: "test@example.com",
				is_admin: false,
			})
		})

		it("should throw error for non-existent user", async () => {
			mockPool.query.mockResolvedValue({ rows: [] } as any)

			await expect(
				authService.login("nonexistent@example.com", "password123")
			).rejects.toThrow("Invalid credentials")
		})

		it("should throw error for invalid password", async () => {
			const mockUser = {
				id: 1,
				email: "test@example.com",
				password: "hashedPassword",
				is_admin: false,
			}
			mockPool.query.mockResolvedValue({ rows: [mockUser] } as any)
			;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

			await expect(
				authService.login("test@example.com", "wrongpassword")
			).rejects.toThrow("Invalid credentials")
		})
	})

	describe("findUserByEmail", () => {
		it("should find user by email", async () => {
			const mockUser = { id: 1, email: "test@example.com", is_admin: false }
			mockPool.query.mockResolvedValue({ rows: [mockUser] } as any)

			const result = await authService.findUserByEmail("test@example.com")

			expect(result).toEqual(mockUser)
		})

		it("should return null for non-existent user", async () => {
			mockPool.query.mockResolvedValue({ rows: [] } as any)

			const result = await authService.findUserByEmail(
				"nonexistent@example.com"
			)

			expect(result).toBeNull()
		})
	})
})
