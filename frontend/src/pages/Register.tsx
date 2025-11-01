import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { register } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")

		if (password !== confirmPassword) {
			setError("Passwords do not match")
			return
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters")
			return
		}

		setLoading(true)

		try {
			await register(email, password)
			navigate("/login")
		} catch (err: any) {
			setError(err.response?.data?.error || "Registration failed")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			style={{
				background: "#FFF5ED",
				height: "100vh",
				width: "100vw",
				position: "fixed",
				top: 0,
				left: 0,
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<style>{`
				body {
					overflow: hidden !important;
				}
				@media (max-width: 768px) {
					.auth-logo {
						width: 50px !important;
						height: 50px !important;
					}
					.auth-logo svg {
						width: 24px !important;
						height: 24px !important;
					}
					.auth-title {
						font-size: 1.25rem !important;
					}
					.auth-subtitle {
						font-size: 0.75rem !important;
					}
					.auth-card {
						padding: 16px !important;
					}
					.auth-container {
						padding: 8px 16px !important;
						max-height: 100vh !important;
						overflow-y: auto !important;
					}
					.auth-form {
						gap: 12px !important;
					}
					.auth-form > div {
						margin-bottom: 12px !important;
					}
				}
			`}</style>
			<div
				className="w-full max-w-md auth-container"
				style={{ padding: "16px", maxHeight: "100vh", overflowY: "auto" }}
			>
				{/* Logo */}
				<div className="text-center" style={{ marginBottom: "24px" }}>
					<div
						className="w-18 h-18 rounded-2xl flex items-center justify-center shadow-medium mx-auto auth-logo"
						style={{
							background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
							marginBottom: "16px",
						}}
					>
						<svg
							className="w-10 h-10 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 2L2 7l10 5 10-5-10-5z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2 17l10 5 10-5"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2 12l10 5 10-5"
							/>
						</svg>
					</div>
					<h1
						className="text-3xl font-display font-bold mb-2 auth-title"
						style={{
							color: "#8B1538",
							letterSpacing: "0.05em",
							textTransform: "uppercase",
						}}
					>
						Create Account
					</h1>
					<p
						className="text-[0.9375rem] auth-subtitle"
						style={{ color: "#424242" }}
					>
						Join Meethi Dukaan today
					</p>
				</div>

				{/* Form Card */}
				<div
					className="rounded-2xl p-8 auth-card"
					style={{
						background: "#FFF9F5",
						boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
						border: "2px solid #FFE1C6",
					}}
				>
					{error && (
						<div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl">
							<div className="flex items-center space-x-2">
								<svg
									className="w-5 h-5 text-red-500 flex-shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-red-700 font-medium text-sm">{error}</p>
							</div>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-5 auth-form">
						<div>
							<label className="block text-[0.8125rem] font-semibold text-neutral-700 mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-neutral-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full pl-11 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all bg-neutral-50 focus:bg-white text-[0.9375rem]"
									placeholder="you@example.com"
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-[0.8125rem] font-semibold text-neutral-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-neutral-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full pl-11 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all bg-neutral-50 focus:bg-white text-[0.9375rem]"
									placeholder="••••••••"
									required
								/>
							</div>
							<p className="mt-2 text-xs text-neutral-500">
								Must be at least 6 characters
							</p>
						</div>

						<div>
							<label className="block text-[0.8125rem] font-semibold text-neutral-700 mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-neutral-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<input
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="w-full pl-11 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all bg-neutral-50 focus:bg-white text-[0.9375rem]"
									placeholder="••••••••"
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 rounded-xl font-semibold text-[0.875rem] flex items-center justify-center space-x-2 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99] mt-6"
							style={{
								background: "linear-gradient(135deg, #8B1538 0%, #6E1029 100%)",
								color: "#FFF9F5",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								boxShadow: "0 2px 8px rgba(139, 21, 56, 0.3)",
							}}
						>
							{loading ? (
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							) : (
								<>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
										/>
									</svg>
									<span>Create Account</span>
								</>
							)}
						</button>
					</form>
				</div>

				{/* Login Link */}
				<div className="mt-6 text-center">
					<p className="text-[0.9375rem]" style={{ color: "#424242" }}>
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold transition-colors"
							style={{ color: "#8B1538" }}
						>
							Sign in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Register
