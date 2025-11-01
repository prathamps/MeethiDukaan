import pool from "./db"

const createTables = async () => {
	const client = await pool.connect()

	try {
		await client.query("BEGIN")

		// Users table
		await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

		// Sweets table
		await client.query(`
      CREATE TABLE IF NOT EXISTS sweets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

		// Purchases table
		await client.query(`
      CREATE TABLE IF NOT EXISTS purchases (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        sweet_id INTEGER REFERENCES sweets(id),
        quantity INTEGER NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

		await client.query("COMMIT")
		console.log("Database tables created successfully")
	} catch (error) {
		await client.query("ROLLBACK")
		console.error("Error creating tables:", error)
		throw error
	} finally {
		client.release()
	}
}

if (require.main === module) {
	createTables()
		.then(() => {
			console.log("Migration completed")
			process.exit(0)
		})
		.catch((error) => {
			console.error("Migration failed:", error)
			process.exit(1)
		})
}

export default createTables
