import { useState, useEffect } from "react"
import { sweetService, Sweet } from "../services/api"
import SweetCard from "../components/SweetCard"

const Dashboard = () => {
	const [sweets, setSweets] = useState<Sweet[]>([])
	const [loading, setLoading] = useState(true)
	const [searchName, setSearchName] = useState("")
	const [searchCategory, setSearchCategory] = useState("")
	const [minPrice, setMinPrice] = useState("")
	const [maxPrice, setMaxPrice] = useState("")
	const [message, setMessage] = useState("")

	useEffect(() => {
		loadSweets()
	}, [])

	const loadSweets = async () => {
		try {
			const data = await sweetService.getAll()
			setSweets(data)
		} catch (error: any) {
			console.error("Failed to load sweets:", error)
			setMessage(
				error.response?.data?.error ||
					"Failed to load sweets. Make sure the backend is running."
			)
		} finally {
			setLoading(false)
		}
	}

	const handleSearch = async () => {
		try {
			const data = await sweetService.search({
				name: searchName || undefined,
				category: searchCategory || undefined,
				minPrice: minPrice ? parseFloat(minPrice) : undefined,
				maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
			})
			setSweets(data)
		} catch (error) {
			console.error("Search failed:", error)
		}
	}

	const handlePurchase = async (id: number, quantity: number) => {
		try {
			await sweetService.purchase(id, quantity)
			setMessage("Purchase successful!")
			setTimeout(() => setMessage(""), 3000)
			loadSweets()
		} catch (error: any) {
			setMessage(error.response?.data?.error || "Purchase failed")
			setTimeout(() => setMessage(""), 3000)
		}
	}

	if (loading) {
		return (
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#FAFAFA",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							width: "56px",
							height: "56px",
							border: "3px solid #FFE8E8",
							borderTop: "3px solid #FF5252",
							borderRadius: "50%",
							animation: "spin 0.8s linear infinite",
							margin: "0 auto 16px",
						}}
					></div>
					<p
						style={{ color: "#757575", fontWeight: 500, fontSize: "0.9375rem" }}
					>
						Loading sweets...
					</p>
				</div>
			</div>
		)
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#FFF5ED",
				padding: "40px 16px",
			}}
		>
			<style>{`
				@media (min-width: 769px) {
					.dashboard-container {
						padding: 40px 32px !important;
					}
				}
			`}</style>
			<div style={{ maxWidth: "1280px", margin: "0 auto" }}>
				<div style={{ textAlign: "center", marginBottom: "40px" }}>
					<h1
						className="dashboard-title"
						style={{
							fontSize: "3rem",
							fontWeight: "700",
							color: "#8B1538",
							marginBottom: "12px",
							letterSpacing: "0.02em",
							textTransform: "uppercase",
							fontFamily: "Playfair Display, serif",
						}}
					>
						Sweets & Savouries
					</h1>
					<p
						style={{ fontSize: "1.125rem", color: "#424242", fontWeight: 400 }}
					>
						For Every Reason and Season
					</p>
				</div>

				{message && (
					<div
						style={{
							marginBottom: "32px",
							padding: "14px 20px",
							borderRadius: "12px",
							textAlign: "center",
							fontWeight: 600,
							fontSize: "0.9375rem",
							background: message.includes("successful")
								? "#D4AF37"
								: "#8B1538",
							color: "#FFF9F5",
							border: message.includes("successful")
								? "2px solid #B8962E"
								: "2px solid #6E1029",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
						}}
					>
						{message}
					</div>
				)}

				<div
					className="search-card"
					style={{
						background: "#FFF9F5",
						borderRadius: "16px",
						boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
						padding: "28px",
						marginBottom: "40px",
						border: "2px solid #FFE1C6",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
							marginBottom: "24px",
						}}
					>
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#8B1538"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.35-4.35" />
						</svg>
						<h2
							style={{
								fontSize: "1.375rem",
								fontWeight: "700",
								color: "#8B1538",
								letterSpacing: "0.02em",
								textTransform: "uppercase",
							}}
						>
							Search Sweets
						</h2>
					</div>

					<style>{`
						@media (max-width: 768px) {
							.search-grid {
								grid-template-columns: 1fr !important;
							}
							.dashboard-title {
								font-size: 2rem !important;
							}
							.search-card {
								padding: 20px !important;
							}
						}
					`}</style>
					<div
						className="search-grid"
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "16px",
							marginBottom: "20px",
						}}
					>
						<div>
							<label
								style={{
									display: "block",
									fontSize: "0.8125rem",
									fontWeight: 600,
									color: "#424242",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								Sweet Name
							</label>
							<input
								type="text"
								placeholder="e.g., Gulab Jamun"
								value={searchName}
								onChange={(e) => setSearchName(e.target.value)}
								style={{
									width: "100%",
									padding: "10px 14px",
									border: "2px solid #FFE1C6",
									borderRadius: "10px",
									fontSize: "0.9375rem",
									transition: "all 0.2s ease",
									background: "white",
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = "#8B1538"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow =
										"0 0 0 3px rgba(139, 21, 56, 0.1)"
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = "#FFE1C6"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow = "none"
								}}
							/>
						</div>
						<div>
							<label
								style={{
									display: "block",
									fontSize: "0.8125rem",
									fontWeight: 600,
									color: "#424242",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								Category
							</label>
							<input
								type="text"
								placeholder="e.g., Milk-based"
								value={searchCategory}
								onChange={(e) => setSearchCategory(e.target.value)}
								style={{
									width: "100%",
									padding: "10px 14px",
									border: "2px solid #FFE1C6",
									borderRadius: "10px",
									fontSize: "0.9375rem",
									transition: "all 0.2s ease",
									background: "white",
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = "#8B1538"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow =
										"0 0 0 3px rgba(139, 21, 56, 0.1)"
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = "#FFE1C6"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow = "none"
								}}
							/>
						</div>
						<div>
							<label
								style={{
									display: "block",
									fontSize: "0.8125rem",
									fontWeight: 600,
									color: "#424242",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								Min Price (₹)
							</label>
							<input
								type="number"
								placeholder="0"
								value={minPrice}
								onChange={(e) => setMinPrice(e.target.value)}
								style={{
									width: "100%",
									padding: "10px 14px",
									border: "2px solid #FFE1C6",
									borderRadius: "10px",
									fontSize: "0.9375rem",
									transition: "all 0.2s ease",
									background: "white",
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = "#8B1538"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow =
										"0 0 0 3px rgba(139, 21, 56, 0.1)"
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = "#FFE1C6"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow = "none"
								}}
							/>
						</div>
						<div>
							<label
								style={{
									display: "block",
									fontSize: "0.8125rem",
									fontWeight: 600,
									color: "#424242",
									marginBottom: "8px",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								Max Price (₹)
							</label>
							<input
								type="number"
								placeholder="1000"
								value={maxPrice}
								onChange={(e) => setMaxPrice(e.target.value)}
								style={{
									width: "100%",
									padding: "10px 14px",
									border: "2px solid #FFE1C6",
									borderRadius: "10px",
									fontSize: "0.9375rem",
									transition: "all 0.2s ease",
									background: "white",
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = "#8B1538"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow =
										"0 0 0 3px rgba(139, 21, 56, 0.1)"
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = "#FFE1C6"
									e.currentTarget.style.background = "white"
									e.currentTarget.style.boxShadow = "none"
								}}
							/>
						</div>
					</div>

					<div style={{ display: "flex", gap: "12px" }}>
						<button
							onClick={handleSearch}
							style={{
								padding: "11px 28px",
								background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
								color: "#FFF9F5",
								border: "none",
								borderRadius: "10px",
								fontWeight: 600,
								fontSize: "0.875rem",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								gap: "8px",
								boxShadow: "0 2px 8px rgba(139, 21, 56, 0.3)",
								transition: "all 0.2s ease",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-1px)"
								e.currentTarget.style.boxShadow =
									"0 4px 12px rgba(139, 21, 56, 0.4)"
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)"
								e.currentTarget.style.boxShadow =
									"0 2px 8px rgba(139, 21, 56, 0.3)"
							}}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
							</svg>
							<span>Search</span>
						</button>
						<button
							onClick={() => {
								setSearchName("")
								setSearchCategory("")
								setMinPrice("")
								setMaxPrice("")
								loadSweets()
							}}
							style={{
								padding: "11px 28px",
								background: "white",
								color: "#424242",
								border: "2px solid #FFE1C6",
								borderRadius: "10px",
								fontWeight: 600,
								fontSize: "0.875rem",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								gap: "8px",
								transition: "all 0.2s ease",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor = "#D4AF37"
								e.currentTarget.style.background = "#FFFEF5"
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.borderColor = "#FFE1C6"
								e.currentTarget.style.background = "white"
							}}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
								<path d="M21 3v5h-5" />
								<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
								<path d="M3 21v-5h5" />
							</svg>
							<span>Clear</span>
						</button>
					</div>
				</div>

				{sweets.length > 0 ? (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
							gap: "24px",
						}}
					>
						{sweets.map((sweet) => (
							<SweetCard
								key={sweet.id}
								sweet={sweet}
								onPurchase={handlePurchase}
							/>
						))}
					</div>
				) : (
					<div style={{ textAlign: "center", padding: "80px 0" }}>
						<div
							style={{
								width: "100px",
								height: "100px",
								background: "#F5F5F5",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "0 auto 20px",
							}}
						>
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#BDBDBD"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="9" cy="21" r="1" />
								<circle cx="20" cy="21" r="1" />
								<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
							</svg>
						</div>
						<h3
							style={{
								fontSize: "1.375rem",
								fontWeight: "700",
								color: "#1A1A1A",
								marginBottom: "8px",
								letterSpacing: "-0.01em",
							}}
						>
							No sweets found
						</h3>
						<p style={{ color: "#757575", fontSize: "0.9375rem" }}>
							Try adjusting your search filters
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
