import { Request, Response } from "express"
import { AuthService } from "../services/authService"
import { body, validationResult } from "express-validator"

const authService = new AuthService()

export const registerValidation = [
	body("email").isEmail().withMessage("Valid email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
]

export const loginValidation = [
	body("email").isEmail().withMessage("Valid email is required"),
	body("password").notEmpty().withMessage("Password is required"),
]

export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {
		const { email, password, isAdmin } = req.body

		const existingUser = await authService.findUserByEmail(email)
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" })
		}

		const user = await authService.register(email, password, isAdmin || false)
		res.status(201).json({ message: "User registered successfully", user })
	} catch (error) {
		res.status(500).json({ error: "Registration failed" })
	}
}

export const login = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {
		const { email, password } = req.body
		const result = await authService.login(email, password)
		res.json(result)
	} catch (error) {
		res.status(401).json({ error: "Invalid credentials" })
	}
}
