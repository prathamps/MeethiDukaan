import { Link } from "react-router-dom"

const NotFound = () => {
	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#FFF5ED",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "24px",
			}}
		>
			<div style={{ textAlign: "center", maxWidth: "600px" }}>
				{/* Sweet Icon */}
				<div
					style={{
						width: "120px",
						height: "120px",
						background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
						borderRadius: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 32px",
						boxShadow: "0 8px 24px rgba(139, 21, 56, 0.3)",
					}}
				>
					<svg
						width="60"
						height="60"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#FFF9F5"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5z" />
						<path d="M2 17l10 5 10-5" />
						<path d="M2 12l10 5 10-5" />
					</svg>
				</div>

				{/* 404 Text */}
				<h1
					style={{
						fontSize: "6rem",
						fontWeight: "700",
						color: "#8B1538",
						marginBottom: "16px",
						fontFamily: "Playfair Display, serif",
						letterSpacing: "0.05em",
					}}
				>
					404
				</h1>

				{/* Title */}
				<h2
					style={{
						fontSize: "2rem",
						fontWeight: "700",
						color: "#8B1538",
						marginBottom: "16px",
						textTransform: "uppercase",
						letterSpacing: "0.05em",
					}}
				>
					Sweet Not Found
				</h2>

				{/* Description */}
				<p
					style={{
						fontSize: "1.125rem",
						color: "#424242",
						marginBottom: "40px",
						lineHeight: "1.6",
					}}
				>
					Oops! The page you're looking for seems to have been eaten. Let's get
					you back to something sweet!
				</p>

				{/* Buttons */}
				<div
					style={{
						display: "flex",
						gap: "16px",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<Link
						to="/dashboard"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							padding: "14px 32px",
							background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
							color: "#FFF9F5",
							textDecoration: "none",
							borderRadius: "10px",
							fontWeight: 600,
							fontSize: "0.9375rem",
							boxShadow: "0 4px 12px rgba(139, 21, 56, 0.3)",
							transition: "all 0.2s ease",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = "translateY(-2px)"
							e.currentTarget.style.boxShadow =
								"0 6px 16px rgba(139, 21, 56, 0.4)"
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = "translateY(0)"
							e.currentTarget.style.boxShadow =
								"0 4px 12px rgba(139, 21, 56, 0.3)"
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
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
						<span>Go to Dashboard</span>
					</Link>

					<Link
						to="/login"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							padding: "14px 32px",
							background: "white",
							color: "#8B1538",
							textDecoration: "none",
							borderRadius: "10px",
							fontWeight: 600,
							fontSize: "0.9375rem",
							border: "2px solid #8B1538",
							transition: "all 0.2s ease",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "#8B1538"
							e.currentTarget.style.color = "#FFF9F5"
							e.currentTarget.style.transform = "translateY(-2px)"
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "white"
							e.currentTarget.style.color = "#8B1538"
							e.currentTarget.style.transform = "translateY(0)"
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
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
							<polyline points="10 17 15 12 10 7" />
							<line x1="15" y1="12" x2="3" y2="12" />
						</svg>
						<span>Login</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
