import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import sweetRoutes from "./routes/sweetRoutes"

const app = express()

// CORS configuration for production and preview deployments
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:3000",
	"https://meethi-dukaan.vercel.app",
	/https:\/\/meethi-dukaan-.*\.vercel\.app$/, // Vercel preview URLs
]

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (mobile apps, Postman, etc.)
			if (!origin) return callback(null, true)

			// Check if origin matches allowed origins or patterns
			const isAllowed = allowedOrigins.some((allowed) => {
				if (typeof allowed === "string") {
					return allowed === origin
				}
				// RegExp pattern
				return allowed.test(origin)
			})

			if (isAllowed) {
				callback(null, true)
			} else {
				callback(new Error("Not allowed by CORS"))
			}
		},
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
