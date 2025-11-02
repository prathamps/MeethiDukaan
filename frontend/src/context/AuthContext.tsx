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

const getStoredToken = () => {
	if (typeof window === "undefined") {
		return null
	}

	try {
		return window.localStorage.getItem("token")
	} catch {
		return null
	}
}

const getStoredUser = (): User | null => {
	if (typeof window === "undefined") {
		return null
	}

	try {
		const storedUser = window.localStorage.getItem("user")
		return storedUser ? (JSON.parse(storedUser) as User) : null
	} catch {
		return null
	}
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(getStoredUser)
	const [token, setToken] = useState<string | null>(getStoredToken)

	useEffect(() => {
		const storedToken = getStoredToken()
		const storedUser = getStoredUser()

		if (storedToken !== null) {
			setToken(storedToken)
		}

		if (storedUser !== null) {
			setUser(storedUser)
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
