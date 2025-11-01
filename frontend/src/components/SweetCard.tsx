import { useState } from "react"
import { Sweet } from "../services/api"

interface SweetCardProps {
	sweet: Sweet
	onPurchase: (id: number, quantity: number) => void
	isAdmin?: boolean
	onEdit?: (sweet: Sweet) => void
	onDelete?: (id: number) => void
}

const SweetCard: React.FC<SweetCardProps> = ({
	sweet,
	onPurchase,
	isAdmin = false,
	onEdit,
	onDelete,
}) => {
	const [purchaseQuantity, setPurchaseQuantity] = useState(1)
	const [isHovered, setIsHovered] = useState(false)

	const handlePurchase = () => {
		const stockQuantity =
			typeof sweet.quantity === "string"
				? parseInt(sweet.quantity)
				: sweet.quantity
		if (purchaseQuantity > 0 && purchaseQuantity <= stockQuantity) {
			onPurchase(sweet.id, purchaseQuantity)
			setPurchaseQuantity(1)
		}
	}

	const price =
		typeof sweet.price === "string" ? parseFloat(sweet.price) : sweet.price
	const quantity =
		typeof sweet.quantity === "string"
			? parseInt(sweet.quantity)
			: sweet.quantity

	return (
		<div
			style={{
				background: "#FFF9F5",
				borderRadius: "16px",
				boxShadow: isHovered
					? "0 8px 24px rgba(0,0,0,0.25)"
					: "0 4px 12px rgba(0,0,0,0.15)",
				border: "2px solid #FFE1C6",
				overflow: "hidden",
				transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
				transform: isHovered ? "translateY(-4px)" : "translateY(0)",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				style={{
					height: "200px",
					background:
						"linear-gradient(135deg, #FFEBD9 0%, #FFF5ED 50%, #FFF9F5 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					borderBottom: "2px solid #FFE1C6",
				}}
			>
				<div
					style={{
						width: "80px",
						height: "80px",
						background: "rgba(139, 21, 56, 0.1)",
						borderRadius: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						transition: "transform 0.3s ease",
						transform: isHovered ? "scale(1.1)" : "scale(1)",
					}}
				>
					<svg
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#8B1538"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5z" />
						<path d="M2 17l10 5 10-5" />
						<path d="M2 12l10 5 10-5" />
					</svg>
				</div>
				<div
					style={{
						position: "absolute",
						top: "12px",
						right: "12px",
						padding: "6px 12px",
						borderRadius: "8px",
						fontSize: "0.6875rem",
						fontWeight: 600,
						background: quantity > 0 ? "#D4AF37" : "#8B1538",
						color: "#FFF9F5",
						border: `2px solid ${quantity > 0 ? "#B8962E" : "#6E1029"}`,
						textTransform: "uppercase",
						letterSpacing: "0.05em",
					}}
				>
					{quantity > 0 ? `${quantity} in stock` : "Out of stock"}
				</div>
			</div>

			<div style={{ padding: "20px" }}>
				<div style={{ marginBottom: "12px" }}>
					<span
						style={{
							padding: "4px 10px",
							background: "#FFEBD9",
							color: "#8B1538",
							borderRadius: "6px",
							fontSize: "0.6875rem",
							fontWeight: 600,
							border: "2px solid #FFD7B3",
							letterSpacing: "0.05em",
							textTransform: "uppercase",
						}}
					>
						{sweet.category}
					</span>
				</div>

				<h3
					style={{
						fontSize: "1.125rem",
						fontWeight: "700",
						color: "#8B1538",
						marginBottom: "8px",
						letterSpacing: "0.02em",
					}}
				>
					{sweet.name}
				</h3>

				{sweet.description && (
					<p
						style={{
							fontSize: "0.875rem",
							color: "#757575",
							marginBottom: "16px",
							lineHeight: "1.5",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{sweet.description}
					</p>
				)}

				<div style={{ marginBottom: "20px" }}>
					<div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
						<span
							style={{
								fontSize: "1.75rem",
								fontWeight: "700",
								color: "#8B1538",
								letterSpacing: "-0.02em",
							}}
						>
							₹{price.toFixed(2)}
						</span>
						<span
							style={{
								fontSize: "0.8125rem",
								color: "#424242",
								fontWeight: 500,
							}}
						>
							per piece
						</span>
					</div>
				</div>

				{!isAdmin && (
					<div
						style={{ display: "flex", flexDirection: "column", gap: "10px" }}
					>
						<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									border: "2px solid #EEEEEE",
									borderRadius: "10px",
									overflow: "hidden",
									background: "#FAFAFA",
								}}
							>
								<button
									onClick={() =>
										setPurchaseQuantity(Math.max(1, purchaseQuantity - 1))
									}
									disabled={quantity === 0}
									style={{
										padding: "8px 14px",
										background: "white",
										border: "none",
										color: "#424242",
										fontWeight: 600,
										cursor: quantity === 0 ? "not-allowed" : "pointer",
										fontSize: "1.125rem",
										transition: "background 0.2s ease",
									}}
									onMouseEnter={(e) =>
										quantity > 0 &&
										(e.currentTarget.style.background = "#F5F5F5")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background = "white")
									}
								>
									−
								</button>
								<input
									type="number"
									min="1"
									max={quantity}
									value={purchaseQuantity}
									onChange={(e) =>
										setPurchaseQuantity(parseInt(e.target.value) || 1)
									}
									disabled={quantity === 0}
									style={{
										width: "56px",
										textAlign: "center",
										borderLeft: "2px solid #EEEEEE",
										borderRight: "2px solid #EEEEEE",
										padding: "8px 0",
										border: "none",
										fontWeight: 600,
										fontSize: "0.9375rem",
										background: "white",
										color: "#1A1A1A",
									}}
								/>
								<button
									onClick={() =>
										setPurchaseQuantity(
											Math.min(quantity, purchaseQuantity + 1)
										)
									}
									disabled={quantity === 0}
									style={{
										padding: "8px 14px",
										background: "white",
										border: "none",
										color: "#424242",
										fontWeight: 600,
										cursor: quantity === 0 ? "not-allowed" : "pointer",
										fontSize: "1.125rem",
										transition: "background 0.2s ease",
									}}
									onMouseEnter={(e) =>
										quantity > 0 &&
										(e.currentTarget.style.background = "#F5F5F5")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background = "white")
									}
								>
									+
								</button>
							</div>
						</div>
						<button
							onClick={handlePurchase}
							disabled={quantity === 0}
							style={{
								width: "100%",
								padding: "12px",
								background:
									quantity === 0
										? "#EEEEEE"
										: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
								color: quantity === 0 ? "#BDBDBD" : "#FFF9F5",
								border: "none",
								borderRadius: "10px",
								fontWeight: 600,
								fontSize: "0.875rem",
								cursor: quantity === 0 ? "not-allowed" : "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "8px",
								boxShadow:
									quantity === 0 ? "none" : "0 2px 8px rgba(139, 21, 56, 0.3)",
								transition: "all 0.2s ease",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
							onMouseEnter={(e) => {
								if (quantity > 0) {
									e.currentTarget.style.transform = "translateY(-1px)"
									e.currentTarget.style.boxShadow =
										"0 4px 12px rgba(139, 21, 56, 0.4)"
								}
							}}
							onMouseLeave={(e) => {
								if (quantity > 0) {
									e.currentTarget.style.transform = "translateY(0)"
									e.currentTarget.style.boxShadow =
										"0 2px 8px rgba(139, 21, 56, 0.3)"
								}
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
								<circle cx="9" cy="21" r="1" />
								<circle cx="20" cy="21" r="1" />
								<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
							</svg>
							<span>{quantity === 0 ? "Out of Stock" : "Add to Cart"}</span>
						</button>
					</div>
				)}

				{isAdmin && (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "10px",
						}}
					>
						<button
							onClick={() => onEdit?.(sweet)}
							style={{
								padding: "12px",
								background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
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
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
							</svg>
							<span>Edit</span>
						</button>
						<button
							onClick={() => onDelete?.(sweet.id)}
							style={{
								padding: "12px",
								background: "white",
								color: "#8B1538",
								border: "2px solid #8B1538",
								borderRadius: "10px",
								fontWeight: 600,
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "6px",
								fontSize: "0.875rem",
								transition: "all 0.2s ease",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-1px)"
								e.currentTarget.style.background = "#8B1538"
								e.currentTarget.style.color = "#FFF9F5"
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)"
								e.currentTarget.style.background = "white"
								e.currentTarget.style.color = "#8B1538"
							}}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="3 6 5 6 21 6" />
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
								<line x1="10" y1="11" x2="10" y2="17" />
								<line x1="14" y1="11" x2="14" y2="17" />
							</svg>
							<span>Delete</span>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default SweetCard
