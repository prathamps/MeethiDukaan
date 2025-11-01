import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminPanel from "./pages/AdminPanel"
import NotFound from "./pages/NotFound"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="min-h-screen bg-neutral-50">
					<Navbar />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/dashboard"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route
							path="/admin"
							element={
								<PrivateRoute requireAdmin>
									<AdminPanel />
								</PrivateRoute>
							}
						/>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	)
}

export default App
