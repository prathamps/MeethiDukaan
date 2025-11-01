import { useState, useEffect } from "react"
import { sweetService, Sweet } from "../services/api"
import SweetCard from "../components/SweetCard"

const AdminPanel = () => {
	const [sweets, setSweets] = useState<Sweet[]>([])
	const [showForm, setShowForm] = useState(false)
	const [editingSweet, setEditingSweet] = useState<Sweet | null>(null)
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		price: "",
		quantity: "",
		description: "",
	})
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
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const sweetData = {
				name: formData.name,
				category: formData.category,
				price: parseFloat(formData.price),
				quantity: parseInt(formData.quantity),
				description: formData.description,
			}
			if (editingSweet) {
				await sweetService.update(editingSweet.id, sweetData)
				setMessage("Sweet updated successfully!")
			} else {
				await sweetService.create(sweetData)
				setMessage("Sweet created successfully!")
			}
			resetForm()
			loadSweets()
			setTimeout(() => setMessage(""), 3000)
		} catch (error) {
			setMessage("Operation failed")
			setTimeout(() => setMessage(""), 3000)
		}
	}

	const handleEdit = (sweet: Sweet) => {
		setEditingSweet(sweet)
		setFormData({
			name: sweet.name,
			category: sweet.category,
			price: sweet.price.toString(),
			quantity: sweet.quantity.toString(),
			description: sweet.description || "",
		})
		setShowForm(true)
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	const handleDelete = async (id: number) => {
		if (window.confirm("Are you sure you want to delete this sweet?")) {
			try {
				await sweetService.delete(id)
				setMessage("Sweet deleted successfully!")
				loadSweets()
				setTimeout(() => setMessage(""), 3000)
			} catch (error) {
				setMessage("Delete failed")
				setTimeout(() => setMessage(""), 3000)
			}
		}
	}

	const handleRestock = async (id: number) => {
		const quantity = prompt("Enter quantity to restock:")
		if (quantity && parseInt(quantity) > 0) {
			try {
				await sweetService.restock(id, parseInt(quantity))
				setMessage("Restocked successfully!")
				loadSweets()
				setTimeout(() => setMessage(""), 3000)
			} catch (error) {
				setMessage("Restock failed")
				setTimeout(() => setMessage(""), 3000)
			}
		}
	}

	const resetForm = () => {
		setFormData({
			name: "",
			category: "",
			price: "",
			quantity: "",
			description: "",
		})
		setEditingSweet(null)
		setShowForm(false)
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#FFF5ED",
				padding: "24px 16px",
			}}
		>
			<style>{`
				@media (min-width: 769px) {
					.admin-container {
						padding: 48px 24px !important;
					}
				}
				@media (max-width: 768px) {
					.admin-title {
						font-size: 2rem !important;
					}
					.admin-form-grid {
						grid-template-columns: 1fr !important;
					}
					.admin-header {
						flex-direction: column !important;
						align-items: flex-start !important;
					}
				}
			`}</style>
			<div style={{ maxWidth: "1280px", margin: "0 auto" }}>
				<div
					className="admin-header"
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "48px",
						flexWrap: "wrap",
						gap: "24px",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
						<div
							style={{
								width: "52px",
								height: "52px",
								background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
								borderRadius: "12px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								boxShadow: "0 4px 12px rgba(139, 21, 56, 0.3)",
							}}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="3" width="7" height="7" />
								<rect x="14" y="3" width="7" height="7" />
								<rect x="14" y="14" width="7" height="7" />
								<rect x="3" y="14" width="7" height="7" />
							</svg>
						</div>
						<div>
							<h1
								className="admin-title"
								style={{
									fontSize: "3rem",
									fontWeight: "700",
									color: "#8B1538",
									marginBottom: "8px",
									letterSpacing: "0.02em",
									textTransform: "uppercase",
									fontFamily: "Playfair Display, serif",
								}}
							>
								Admin Panel
							</h1>
							<p
								style={{
									fontSize: "1.125rem",
									color: "#424242",
									fontWeight: 400,
								}}
							>
								Manage your sweet inventory
							</p>
						</div>
					</div>
					<button
						onClick={() => setShowForm(!showForm)}
						style={{
							padding: "11px 24px",
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
						{showForm ? (
							<>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
								<span>Cancel</span>
							</>
						) : (
							<>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="12" y1="5" x2="12" y2="19" />
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
								<span>Add New Sweet</span>
							</>
						)}
					</button>
				</div>

				{message && (
					<div
						style={{
							marginBottom: "32px",
							padding: "16px",
							borderRadius: "16px",
							fontWeight: 600,
							background: message.includes("successfully")
								? "#D4AF37"
								: "#8B1538",
							color: "#FFF9F5",
							border: message.includes("successfully")
								? "2px solid #B8962E"
								: "2px solid #6E1029",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
						}}
					>
						{message}
					</div>
				)}

				{showForm && (
					<div
						style={{
							background: "#FFF9F5",
							borderRadius: "24px",
							boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
							padding: "32px",
							marginBottom: "48px",
							border: "2px solid #FFE1C6",
						}}
					>
						<h2
							style={{
								fontSize: "1.5rem",
								fontWeight: "bold",
								marginBottom: "24px",
								color: "#8B1538",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
						>
							{editingSweet ? "Edit Sweet" : "Add New Sweet"}
						</h2>
						<form onSubmit={handleSubmit}>
							<div
								className="admin-form-grid"
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
									gap: "24px",
									marginBottom: "24px",
								}}
							>
								<div>
									<label
										style={{
											display: "block",
											marginBottom: "8px",
											fontWeight: 600,
											color: "#616161",
										}}
									>
										Sweet Name
									</label>
									<input
										type="text"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										style={{
											width: "100%",
											padding: "12px",
											border: "2px solid #E0E0E0",
											borderRadius: "12px",
										}}
										placeholder="e.g., Gulab Jamun"
										required
									/>
								</div>
								<div>
									<label
										style={{
											display: "block",
											marginBottom: "8px",
											fontWeight: 600,
											color: "#616161",
										}}
									>
										Category
									</label>
									<input
										type="text"
										value={formData.category}
										onChange={(e) =>
											setFormData({ ...formData, category: e.target.value })
										}
										style={{
											width: "100%",
											padding: "12px",
											border: "2px solid #E0E0E0",
											borderRadius: "12px",
										}}
										placeholder="e.g., Milk-based"
										required
									/>
								</div>
								<div>
									<label
										style={{
											display: "block",
											marginBottom: "8px",
											fontWeight: 600,
											color: "#616161",
										}}
									>
										Price (₹)
									</label>
									<input
										type="number"
										step="0.01"
										value={formData.price}
										onChange={(e) =>
											setFormData({ ...formData, price: e.target.value })
										}
										style={{
											width: "100%",
											padding: "12px",
											border: "2px solid #E0E0E0",
											borderRadius: "12px",
										}}
										placeholder="250.00"
										required
									/>
								</div>
								<div>
									<label
										style={{
											display: "block",
											marginBottom: "8px",
											fontWeight: 600,
											color: "#616161",
										}}
									>
										Quantity
									</label>
									<input
										type="number"
										value={formData.quantity}
										onChange={(e) =>
											setFormData({ ...formData, quantity: e.target.value })
										}
										style={{
											width: "100%",
											padding: "12px",
											border: "2px solid #E0E0E0",
											borderRadius: "12px",
										}}
										placeholder="100"
										required
									/>
								</div>
							</div>
							<div style={{ marginBottom: "24px" }}>
								<label
									style={{
										display: "block",
										marginBottom: "8px",
										fontWeight: 600,
										color: "#616161",
									}}
								>
									Description
								</label>
								<textarea
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									style={{
										width: "100%",
										padding: "12px",
										border: "2px solid #E0E0E0",
										borderRadius: "12px",
										minHeight: "100px",
									}}
									placeholder="Describe the sweet..."
								/>
							</div>
							<div style={{ display: "flex", gap: "16px" }}>
								<button
									type="submit"
									style={{
										padding: "12px 32px",
										background:
											"linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
										color: "#FFF9F5",
										border: "none",
										borderRadius: "12px",
										fontWeight: 600,
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										gap: "8px",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										fontSize: "0.875rem",
										boxShadow: "0 2px 8px rgba(139, 21, 56, 0.3)",
									}}
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<polyline points="20 6 9 17 4 12" />
									</svg>
									<span>{editingSweet ? "Update Sweet" : "Create Sweet"}</span>
								</button>
								<button
									type="button"
									onClick={resetForm}
									style={{
										padding: "12px 32px",
										background: "white",
										color: "#424242",
										border: "2px solid #FFE1C6",
										borderRadius: "12px",
										fontWeight: 600,
										cursor: "pointer",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										fontSize: "0.875rem",
									}}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
						gap: "24px",
					}}
				>
					{sweets.map((sweet) => (
						<div key={sweet.id}>
							<SweetCard
								sweet={sweet}
								onPurchase={() => {}}
								isAdmin
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
							<button
								onClick={() => handleRestock(sweet.id)}
								style={{
									width: "100%",
									marginTop: "10px",
									padding: "12px",
									background:
										"linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)",
									color: "#FFF9F5",
									border: "none",
									borderRadius: "10px",
									fontWeight: 600,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "6px",
									fontSize: "0.875rem",
									boxShadow: "0 2px 8px rgba(212, 175, 55, 0.3)",
									transition: "all 0.2s ease",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateY(-1px)"
									e.currentTarget.style.boxShadow =
										"0 4px 12px rgba(212, 175, 55, 0.4)"
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateY(0)"
									e.currentTarget.style.boxShadow =
										"0 2px 8px rgba(212, 175, 55, 0.3)"
								}}
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="12" y1="5" x2="12" y2="19" />
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
								<span>Restock</span>
							</button>
						</div>
					))}
				</div>

				{sweets.length === 0 && (
					<div style={{ textAlign: "center", padding: "80px 0" }}>
						<div
							style={{
								width: "120px",
								height: "120px",
								background: "#F5F5F5",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "0 auto 24px",
							}}
						>
							<svg
								width="60"
								height="60"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#BDBDBD"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 2L2 7l10 5 10-5-10-5z" />
								<path d="M2 17l10 5 10-5" />
								<path d="M2 12l10 5 10-5" />
							</svg>
						</div>
						<h3
							style={{
								fontSize: "1.5rem",
								fontWeight: "bold",
								color: "#212121",
								marginBottom: "8px",
							}}
						>
							No sweets in inventory
						</h3>
						<p style={{ color: "#757575" }}>
							Click "Add New Sweet" to get started
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminPanel
