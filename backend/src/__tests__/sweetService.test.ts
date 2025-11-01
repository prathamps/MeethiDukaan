import { SweetService } from "../services/sweetService"
import pool from "../database/db"

jest.mock("../database/db")

describe("SweetService", () => {
	let sweetService: SweetService
	const mockPool = pool as jest.Mocked<typeof pool>
	const mockQuery = mockPool.query as jest.Mock
	const mockConnect = mockPool.connect as jest.Mock

	beforeEach(() => {
		sweetService = new SweetService()
		jest.clearAllMocks()
	})

	describe("createSweet", () => {
		it("should create a new sweet", async () => {
			const mockSweet = {
				id: 1,
				name: "Chocolate Bar",
				category: "Chocolate",
				price: 2.5,
				quantity: 100,
				description: "Delicious chocolate",
			}
			mockQuery.mockResolvedValue({ rows: [mockSweet] })

			const result = await sweetService.createSweet({
				name: "Chocolate Bar",
				category: "Chocolate",
				price: 2.5,
				quantity: 100,
				description: "Delicious chocolate",
			})

			expect(result).toEqual(mockSweet)
		})
	})

	describe("getAllSweets", () => {
		it("should return all sweets", async () => {
			const mockSweets = [
				{
					id: 1,
					name: "Chocolate",
					category: "Chocolate",
					price: 2.5,
					quantity: 100,
				},
				{
					id: 2,
					name: "Gummy Bears",
					category: "Gummy",
					price: 1.5,
					quantity: 50,
				},
			]
			mockQuery.mockResolvedValue({ rows: mockSweets })

			const result = await sweetService.getAllSweets()

			expect(result).toEqual(mockSweets)
		})
	})

	describe("getSweetById", () => {
		it("should return sweet by id", async () => {
			const mockSweet = {
				id: 1,
				name: "Chocolate",
				category: "Chocolate",
				price: 2.5,
				quantity: 100,
			}
			mockQuery.mockResolvedValue({ rows: [mockSweet] })

			const result = await sweetService.getSweetById(1)

			expect(result).toEqual(mockSweet)
		})

		it("should return null for non-existent sweet", async () => {
			mockQuery.mockResolvedValue({ rows: [] })

			const result = await sweetService.getSweetById(999)

			expect(result).toBeNull()
		})
	})

	describe("searchSweets", () => {
		it("should search sweets by name", async () => {
			const mockSweets = [
				{
					id: 1,
					name: "Chocolate Bar",
					category: "Chocolate",
					price: 2.5,
					quantity: 100,
				},
			]
			mockQuery.mockResolvedValue({ rows: mockSweets })

			const result = await sweetService.searchSweets("Chocolate")

			expect(result).toEqual(mockSweets)
		})

		it("should search sweets by price range", async () => {
			const mockSweets = [
				{
					id: 1,
					name: "Chocolate",
					category: "Chocolate",
					price: 2.5,
					quantity: 100,
				},
			]
			mockQuery.mockResolvedValue({ rows: mockSweets })

			const result = await sweetService.searchSweets(undefined, undefined, 2, 3)

			expect(result).toEqual(mockSweets)
		})
	})

	describe("updateSweet", () => {
		it("should update sweet successfully", async () => {
			const mockSweet = {
				id: 1,
				name: "Updated Chocolate",
				category: "Chocolate",
				price: 3.0,
				quantity: 100,
			}
			mockQuery.mockResolvedValue({ rows: [mockSweet] })

			const result = await sweetService.updateSweet(1, {
				name: "Updated Chocolate",
				price: 3.0,
			})

			expect(result).toEqual(mockSweet)
		})
	})

	describe("deleteSweet", () => {
		it("should delete sweet successfully", async () => {
			const mockSweet = {
				id: 1,
				name: "Chocolate",
				category: "Chocolate",
				price: 2.5,
				quantity: 100,
			}
			mockQuery.mockResolvedValue({ rows: [mockSweet] })

			const result = await sweetService.deleteSweet(1)

			expect(result).toEqual(mockSweet)
		})
	})

	describe("purchaseSweet", () => {
		it("should purchase sweet successfully", async () => {
			const mockClient = {
				query: jest.fn(),
				release: jest.fn(),
			}
			mockConnect.mockResolvedValue(mockClient as any)

			const mockSweet = { id: 1, name: "Chocolate", price: 2.5, quantity: 100 }
			const mockPurchase = {
				id: 1,
				user_id: 1,
				sweet_id: 1,
				quantity: 5,
				total_price: 12.5,
			}

			mockClient.query
				.mockResolvedValueOnce(undefined) // BEGIN
				.mockResolvedValueOnce({ rows: [mockSweet] }) // SELECT sweet
				.mockResolvedValueOnce(undefined) // UPDATE quantity
				.mockResolvedValueOnce({ rows: [mockPurchase] }) // INSERT purchase
				.mockResolvedValueOnce(undefined) // COMMIT

			const result = await sweetService.purchaseSweet(1, 1, 5)

			expect(result).toEqual(mockPurchase)
			expect(mockClient.release).toHaveBeenCalled()
		})

		it("should throw error for insufficient quantity", async () => {
			const mockClient = {
				query: jest.fn(),
				release: jest.fn(),
			}
			mockConnect.mockResolvedValue(mockClient as any)

			const mockSweet = { id: 1, name: "Chocolate", price: 2.5, quantity: 2 }

			mockClient.query
				.mockResolvedValueOnce(undefined) // BEGIN
				.mockResolvedValueOnce({ rows: [mockSweet] }) // SELECT sweet

			await expect(sweetService.purchaseSweet(1, 1, 5)).rejects.toThrow(
				"Insufficient quantity in stock"
			)
			expect(mockClient.release).toHaveBeenCalled()
		})
	})

	describe("restockSweet", () => {
		it("should restock sweet successfully", async () => {
			const mockSweet = { id: 1, name: "Chocolate", quantity: 150 }
			mockQuery.mockResolvedValue({ rows: [mockSweet] })

			const result = await sweetService.restockSweet(1, 50)

			expect(result).toEqual(mockSweet)
		})
	})
})
