'use client';

﻿// Database configuration for Vercel Postgres
import { Pool } from 'pg';

// Vercel Postgres connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
export async function testConnection(): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  } finally {
    client.release();
  }
}

// Execute query with error handling
export async function query(text: string, params?: any[]): Promise<any> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Initialize database tables
export async function initializeDatabase(): Promise<void> {
  try {
    // Create users table
    await query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'student',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Create courses table
    await query(`
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                thumbnail VARCHAR(500),
                level VARCHAR(50),
                duration_hours INTEGER,
                total_lessons INTEGER,
                total_modules INTEGER,
                is_published BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Create enrollments table
    await query(`
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                course_id INTEGER REFERENCES courses(id),
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                progress DECIMAL(5,2) DEFAULT 0,
                completed_at TIMESTAMP,
                UNIQUE(user_id, course_id)
            )
        `);

    // Create payments table
    await query(`
            CREATE TABLE IF NOT EXISTS payments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                course_id INTEGER REFERENCES courses(id),
                amount DECIMAL(10,2) NOT NULL,
                currency VARCHAR(3) DEFAULT 'BRL',
                status VARCHAR(50) NOT NULL,
                payment_method VARCHAR(50),
                transaction_id VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Close database connection
export async function closeDatabase(): Promise<void> {
  await pool.end();
}

export default pool;