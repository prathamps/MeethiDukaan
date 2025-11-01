import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import PrivateRoute from "./components/PrivateRoute"

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="min-h-screen bg-neutral-50">
					<Routes>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	)
}

export default App
