import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import sweetRoutes from "./routes/sweetRoutes"

const app = express()

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	})
)
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/sweets", sweetRoutes)

app.get("/health", (req, res) => {
	res.json({ status: "ok" })
})

export default app
