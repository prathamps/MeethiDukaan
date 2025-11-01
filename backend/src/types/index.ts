export interface User {
	id: number
	email: string
	Password: string
	is_admin: boolean
	created_at: Date
}

export interface Sweet {
	id: number
	name: string
	category: string
	price: number
	quantity: number
	description?: string
	created_at: Date
	updated_at: Date
}

export interface Purchase {
	id: number
	user_id: number
	sweet_id: number
	quantity: number
	total_price: number
	purchased_at: Date
}

export interface AuthRequest extends Request {
	user?: {
		id: number
		email: string
		is_admin: boolean
	}
}
