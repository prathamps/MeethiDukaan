import { Router } from "express"
import {
	createSweet,
	getAllSweets,
	searchSweets,
	updateSweet,
	deleteSweet,
	purchaseSweet,
	restockSweet,
	createSweetValidation,
} from "../controllers/sweetController"
import { authenticateToken, requireAdmin } from "../middleware/auth"

const router = Router()

router.post(
	"/",
	authenticateToken,
	requireAdmin,
	createSweetValidation,
	createSweet
)
router.get("/", authenticateToken, getAllSweets)
router.get("/search", authenticateToken, searchSweets)
router.put("/:id", authenticateToken, requireAdmin, updateSweet)
router.delete("/:id", authenticateToken, requireAdmin, deleteSweet)
router.post("/:id/purchase", authenticateToken, purchaseSweet)
router.post("/:id/restock", authenticateToken, requireAdmin, restockSweet)

export default router
