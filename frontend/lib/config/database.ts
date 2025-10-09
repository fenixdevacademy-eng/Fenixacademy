export const databaseConfig = {
    url: process.env.DATABASE_URL || "file:./dev.db"
}

export const jwtConfig = {
    secret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
}

export const emailConfig = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password"
}

export const uploadConfig = {
    dir: process.env.UPLOAD_DIR || "./public/uploads",
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880"), // 5MB
}
