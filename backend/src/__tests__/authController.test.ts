import request from "supertest"
import { AuthService } from "../services/authService"

// Mock AuthService before importing app
const mockAuthService = {
	findUserByEmail: jest.fn(),
	register: jest.fn(),
	login: jest.fn(),
}

jest.mock("../services/authService", () => {
	return {
		AuthService: jest.fn().mockImplementation(() => mockAuthService),
	}
})

// Import app AFTER mocking
import app from "../app"

describe("Auth Controller", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe("POST /api/auth/register", () => {
		it("should register a new user", async () => {
			const mockUser = { id: 1, email: "test@example.com", is_admin: false }
			mockAuthService.findUserByEmail.mockResolvedValue(null)
			mockAuthService.register.mockResolvedValue(mockUser)

			const response = await request(app)
				.post("/api/auth/register")
				.send({ email: "test@example.com", password: "password123" })

			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty(
				"message",
				"User registered successfully"
			)
		})

		it("should return 400 for invalid email", async () => {
			const response = await request(app)
				.post("/api/auth/register")
				.send({ email: "invalid-email", password: "password123" })

			expect(response.status).toBe(400)
		})

		it("should return 400 for short password", async () => {
			const response = await request(app)
				.post("/api/auth/register")
				.send({ email: "test@example.com", password: "123" })

			expect(response.status).toBe(400)
		})
	})

	describe("POST /api/auth/login", () => {
		it("should login successfully", async () => {
			const mockResult = {
				token: "mockToken",
				user: { id: 1, email: "test@example.com", is_admin: false },
			}
			mockAuthService.login.mockResolvedValue(mockResult)

			const response = await request(app)
				.post("/api/auth/login")
				.send({ email: "test@example.com", password: "password123" })

			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty("token")
		})

		it("should return 401 for invalid credentials", async () => {
			mockAuthService.login.mockRejectedValue(new Error("Invalid credentials"))

			const response = await request(app)
				.post("/api/auth/login")
				.send({ email: "test@example.com", password: "wrongpassword" })

			expect(response.status).toBe(401)
		})
	})
})
