import React, { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/api"

interface User {
	id: number
	email: string
	is_admin: boolean
}

interface AuthContextType {
	user: User | null
	token: string | null
	login: (email: string, password: string) => Promise<void>
	register: (email: string, password: string) => Promise<void>
	logout: () => void
	isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		const storedToken = localStorage.getItem("token")
		const storedUser = localStorage.getItem("user")

		if (storedToken && storedUser) {
			setToken(storedToken)
			setUser(JSON.parse(storedUser))
		}
	}, [])

	const login = async (email: string, password: string) => {
		const response = await authService.login(email, password)
		setToken(response.token)
		setUser(response.user)
		localStorage.setItem("token", response.token)
		localStorage.setItem("user", JSON.stringify(response.user))
	}

	const register = async (email: string, password: string) => {
		await authService.register(email, password)
	}

	const logout = () => {
		setToken(null)
		setUser(null)
		localStorage.removeItem("token")
		localStorage.removeItem("user")
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				register,
				logout,
				isAdmin: user?.is_admin || false,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
