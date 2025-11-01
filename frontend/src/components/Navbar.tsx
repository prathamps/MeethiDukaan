import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const UserDropdown = ({ user, handleLogout }: any) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div style={{ position: "relative" }}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
					padding: "8px 14px",
					background: "#FFEBD9",
					borderRadius: "10px",
					border: "1px solid #FFD7B3",
					cursor: "pointer",
					transition: "all 0.2s ease",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.background = "#FFE1C6"
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.background = "#FFEBD9"
				}}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8B1538"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</svg>
				<span
					style={{
						fontSize: "0.8125rem",
						color: "#8B1538",
						fontWeight: 600,
					}}
				>
					{user.email}
				</span>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#8B1538"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{
						transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
						transition: "transform 0.2s ease",
					}}
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</button>

			{isOpen && (
				<div
					style={{
						position: "absolute",
						top: "calc(100% + 8px)",
						right: 0,
						background: "#FFF9F5",
						border: "2px solid #FFE1C6",
						borderRadius: "10px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
						minWidth: "160px",
						zIndex: 1000,
					}}
				>
					<button
						onClick={() => {
							handleLogout()
							setIsOpen(false)
						}}
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							gap: "6px",
							padding: "8px 12px",
							background: "transparent",
							border: "none",
							cursor: "pointer",
							fontSize: "0.75rem",
							fontWeight: 600,
							color: "#8B1538",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
							transition: "all 0.2s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "#FFEBD9"
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "transparent"
						}}
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<polyline points="16 17 21 12 16 7" />
							<line x1="21" y1="12" x2="9" y2="12" />
						</svg>
						<span>Logout</span>
					</button>
				</div>
			)}
		</div>
	)
}

const Navbar = () => {
	const { user, logout, isAdmin } = useAuth()
	const navigate = useNavigate()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleLogout = () => {
		logout()
		navigate("/login")
		setMobileMenuOpen(false)
	}

	return (
		<nav
			style={{
				background: "#FFF9F5",
				borderBottom: "1px solid #FFE1C6",
				position: "sticky",
				top: 0,
				zIndex: 50,
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
			}}
		>
			<div
				style={{
					maxWidth: "1280px",
					margin: "0 auto",
					padding: "0 16px",
					display: "grid",
					gridTemplateColumns: "1fr auto 1fr",
					alignItems: "center",
					minHeight: "90px",
					gap: "16px",
				}}
				className="navbar-container"
			>
				<style>{`
					@media (max-width: 768px) {
						.navbar-container {
							grid-template-columns: auto 1fr auto !important;
							min-height: 70px !important;
							gap: 12px !important;
						}
						.nav-links-left {
							display: none !important;
						}
						.nav-links-right-desktop {
							display: none !important;
						}
						.mobile-menu-button {
							display: flex !important;
						}
						.logo-container {
							transform: scale(0.7) !important;
						}
					}
					@media (min-width: 769px) {
						.mobile-menu-button {
							display: none !important;
						}
						.mobile-menu {
							display: none !important;
						}
					}
					@media (min-width: 769px) and (max-width: 1024px) {
						.navbar-container {
							padding: 0 24px !important;
							gap: 24px !important;
						}
						.logo-container {
							transform: scale(0.8) !important;
						}
					}
				`}</style>
				{/* Mobile Menu Button */}
				<button
					className="mobile-menu-button"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					style={{
						display: "none",
						alignItems: "center",
						justifyContent: "center",
						padding: "8px",
						background: "transparent",
						border: "none",
						cursor: "pointer",
						color: "#8B1538",
					}}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						{mobileMenuOpen ? (
							<>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</>
						) : (
							<>
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</>
						)}
					</svg>
				</button>

				{/* Left - Navigation Links */}
				<div
					className="nav-links-left"
					style={{ display: "flex", alignItems: "center", gap: "8px" }}
				>
					{user && (
						<>
							<Link
								to="/dashboard"
								style={{
									display: "flex",
									alignItems: "center",
									gap: "6px",
									color: "#424242",
									textDecoration: "none",
									fontWeight: 600,
									fontSize: "0.875rem",
									padding: "8px 16px",
									borderRadius: "8px",
									transition: "all 0.2s ease",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "#FFEBD9"
									e.currentTarget.style.color = "#8B1538"
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent"
									e.currentTarget.style.color = "#424242"
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
									<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
									<polyline points="9 22 9 12 15 12 15 22" />
								</svg>
								<span>Dashboard</span>
							</Link>
							{isAdmin && (
								<Link
									to="/admin"
									style={{
										display: "flex",
										alignItems: "center",
										gap: "6px",
										color: "#424242",
										textDecoration: "none",
										fontWeight: 600,
										fontSize: "0.875rem",
										padding: "8px 16px",
										borderRadius: "8px",
										transition: "all 0.2s ease",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.background = "#FFEBD9"
										e.currentTarget.style.color = "#8B1538"
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.background = "transparent"
										e.currentTarget.style.color = "#424242"
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
										<rect x="3" y="3" width="7" height="7" />
										<rect x="14" y="3" width="7" height="7" />
										<rect x="14" y="14" width="7" height="7" />
										<rect x="3" y="14" width="7" height="7" />
									</svg>
									<span>Admin</span>
								</Link>
							)}
						</>
					)}
				</div>

				{/* Logo - Centered */}
				<Link
					to="/"
					className="logo-container"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textDecoration: "none",
						transition: "transform 0.2s ease",
						transform: "scale(0.85)",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.transform = "scale(0.87)")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.transform = "scale(0.85)")
					}
				>
					{/* Decorative dots above */}
					<div
						style={{
							display: "flex",
							gap: "4px",
							marginBottom: "4px",
						}}
					>
						{[...Array(15)].map((_, i) => (
							<div
								key={`top-${i}`}
								style={{
									width: "2px",
									height: "2px",
									background: "#8B1538",
									borderRadius: "50%",
								}}
							/>
						))}
					</div>

					{/* Main logo box */}
					<div
						style={{
							background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
							padding: "10px 32px",
							borderRadius: "2px",
							boxShadow: "0 4px 12px rgba(139, 21, 56, 0.3)",
						}}
					>
						<h1
							style={{
								fontSize: "1.125rem",
								fontWeight: "700",
								color: "#FFF9F5",
								fontFamily: "Playfair Display, serif",
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								margin: 0,
								whiteSpace: "nowrap",
							}}
						>
							MEETHI · DUKAAN
						</h1>
					</div>

					{/* Decorative dots below */}
					<div
						style={{
							display: "flex",
							gap: "4px",
							marginTop: "4px",
						}}
					>
						{[...Array(15)].map((_, i) => (
							<div
								key={`bottom-${i}`}
								style={{
									width: "2px",
									height: "2px",
									background: "#8B1538",
									borderRadius: "50%",
								}}
							/>
						))}
					</div>

					{/* Subtitle */}
					<p
						style={{
							fontSize: "0.5625rem",
							color: "#8B1538",
							marginTop: "3px",
							letterSpacing: "0.15em",
							fontWeight: "500",
							textTransform: "uppercase",
						}}
					>
						Sweets & Savouries
					</p>
				</Link>

				{/* Right - Account Dropdown (Desktop) */}
				<div
					className="nav-links-right-desktop"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						justifyContent: "flex-end",
					}}
				>
					{user ? (
						<UserDropdown user={user} handleLogout={handleLogout} />
					) : (
						<>
							<Link
								to="/login"
								style={{
									color: "#424242",
									textDecoration: "none",
									fontWeight: 600,
									fontSize: "0.875rem",
									padding: "10px 20px",
									borderRadius: "10px",
									transition: "all 0.2s ease",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "#FFEBD9"
									e.currentTarget.style.color = "#8B1538"
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent"
									e.currentTarget.style.color = "#424242"
								}}
							>
								Login
							</Link>
							<Link
								to="/register"
								style={{
									padding: "10px 20px",
									background: "transparent",
									color: "#8B1538",
									textDecoration: "none",
									borderRadius: "10px",
									fontWeight: 600,
									fontSize: "0.875rem",
									transition: "all 0.2s ease",
									display: "inline-block",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = "#FFEBD9"
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = "transparent"
								}}
							>
								Get Started
							</Link>
						</>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div
					className="mobile-menu"
					style={{
						background: "#FFF9F5",
						borderTop: "1px solid #FFE1C6",
						padding: "16px",
					}}
				>
					{user ? (
						<div
							style={{ display: "flex", flexDirection: "column", gap: "12px" }}
						>
							<Link
								to="/dashboard"
								onClick={() => setMobileMenuOpen(false)}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									padding: "12px 16px",
									background: "#FFEBD9",
									borderRadius: "10px",
									textDecoration: "none",
									color: "#8B1538",
									fontWeight: 600,
									fontSize: "0.875rem",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
									<polyline points="9 22 9 12 15 12 15 22" />
								</svg>
								<span>Dashboard</span>
							</Link>
							{isAdmin && (
								<Link
									to="/admin"
									onClick={() => setMobileMenuOpen(false)}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "8px",
										padding: "12px 16px",
										background: "#FFEBD9",
										borderRadius: "10px",
										textDecoration: "none",
										color: "#8B1538",
										fontWeight: 600,
										fontSize: "0.875rem",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
									}}
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<rect x="3" y="3" width="7" height="7" />
										<rect x="14" y="3" width="7" height="7" />
										<rect x="14" y="14" width="7" height="7" />
										<rect x="3" y="14" width="7" height="7" />
									</svg>
									<span>Admin</span>
								</Link>
							)}
							<div
								style={{
									padding: "12px 16px",
									background: "#FFE1C6",
									borderRadius: "10px",
									color: "#8B1538",
									fontWeight: 600,
									fontSize: "0.8125rem",
								}}
							>
								{user.email}
							</div>
							<button
								onClick={handleLogout}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "8px",
									padding: "12px 16px",
									background:
										"linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
									color: "#FFF9F5",
									border: "none",
									borderRadius: "10px",
									fontWeight: 600,
									fontSize: "0.875rem",
									cursor: "pointer",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
									<polyline points="16 17 21 12 16 7" />
									<line x1="21" y1="12" x2="9" y2="12" />
								</svg>
								<span>Logout</span>
							</button>
						</div>
					) : (
						<div
							style={{ display: "flex", flexDirection: "column", gap: "12px" }}
						>
							<Link
								to="/login"
								onClick={() => setMobileMenuOpen(false)}
								style={{
									padding: "12px 16px",
									background: "#FFEBD9",
									color: "#8B1538",
									textDecoration: "none",
									borderRadius: "10px",
									fontWeight: 600,
									fontSize: "0.875rem",
									textAlign: "center",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								Login
							</Link>
							<Link
								to="/register"
								onClick={() => setMobileMenuOpen(false)}
								style={{
									padding: "12px 16px",
									background:
										"linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
									color: "#FFF9F5",
									textDecoration: "none",
									borderRadius: "10px",
									fontWeight: 600,
									fontSize: "0.875rem",
									textAlign: "center",
									textTransform: "uppercase",
									letterSpacing: "0.05em",
								}}
							>
								Get Started
							</Link>
						</div>
					)}
				</div>
			)}
		</nav>
	)
}

export default Navbar
