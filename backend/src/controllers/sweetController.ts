import { Request, Response } from "express"
import { SweetService } from "../services/sweetService"
import { AuthRequest } from "../middleware/auth"
import { body, validationResult } from "express-validator"

const sweetService = new SweetService()

export const createSweetValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("category").notEmpty().withMessage("Category is required"),
	body("price")
		.isFloat({ min: 0 })
		.withMessage("Price must be a positive number"),
	body("quantity")
		.isInt({ min: 0 })
		.withMessage("Quantity must be a non-negative integer"),
]

export const createSweet = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {
		const sweet = await sweetService.createSweet(req.body)
		res.status(201).json(sweet)
	} catch (error) {
		res.status(500).json({ error: "Failed to create sweet" })
	}
}

export const getAllSweets = async (req: Request, res: Response) => {
	try {
		const sweets = await sweetService.getAllSweets()
		res.json(sweets)
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch sweets" })
	}
}

export const searchSweets = async (req: Request, res: Response) => {
	try {
		const { name, category, minPrice, maxPrice } = req.query
		const sweets = await sweetService.searchSweets(
			name as string,
			category as string,
			minPrice ? parseFloat(minPrice as string) : undefined,
			maxPrice ? parseFloat(maxPrice as string) : undefined
		)
		res.json(sweets)
	} catch (error) {
		res.status(500).json({ error: "Failed to search sweets" })
	}
}

export const updateSweet = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const sweet = await sweetService.updateSweet(id, req.body)

		if (!sweet) {
			return res.status(404).json({ error: "Sweet not found" })
		}

		res.json(sweet)
	} catch (error) {
		res.status(500).json({ error: "Failed to update sweet" })
	}
}

export const deleteSweet = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const sweet = await sweetService.deleteSweet(id)

		if (!sweet) {
			return res.status(404).json({ error: "Sweet not found" })
		}

		res.json({ message: "Sweet deleted successfully" })
	} catch (error) {
		res.status(500).json({ error: "Failed to delete sweet" })
	}
}

export const purchaseSweet = async (req: Request, res: Response) => {
	try {
		const sweetId = parseInt(req.params.id)
		const { quantity } = req.body
		const authReq = req as AuthRequest

		if (!quantity || quantity < 1) {
			return res.status(400).json({ error: "Valid quantity is required" })
		}

		const purchase = await sweetService.purchaseSweet(
			sweetId,
			authReq.user!.id,
			quantity
		)

		res.json(purchase)
	} catch (error: any) {
		if (error.message === "Sweet not found") {
			return res.status(404).json({ error: error.message })
		}
		if (error.message === "Insufficient quantity in stock") {
			return res.status(400).json({ error: error.message })
		}
		res.status(500).json({ error: "Failed to purchase sweet" })
	}
}

export const restockSweet = async (req: Request, res: Response) => {
	try {
		const sweetId = parseInt(req.params.id)
		const { quantity } = req.body

		if (!quantity || quantity < 1) {
			return res.status(400).json({ error: "Valid quantity is required" })
		}

		const sweet = await sweetService.restockSweet(sweetId, quantity)

		if (!sweet) {
			return res.status(404).json({ error: "Sweet not found" })
		}

		res.json(sweet)
	} catch (error) {
		res.status(500).json({ error: "Failed to restock sweet" })
	}
}
