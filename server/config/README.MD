# Habesha Fit - PostgreSQL Database Setup Guide

## 📋 Table of Contents
1. [PostgreSQL Installation](#postgresql-installation)
2. [Basic PostgreSQL Commands](#basic-postgresql-commands)
3. [Database Creation](#database-creation)
4. [Connection Configuration](#connection-configuration)
5. [Running the Server](#running-the-server)
6. [Troubleshooting](#troubleshooting)
7. [Common Issues & Solutions](#common-issues--solutions)

---

## 🚀 PostgreSQL Installation

### Windows Installation
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set during installation (default often: `postgres`)
4. Default port: `5432`

---

## 📝 Basic PostgreSQL Commands

### 1. **Access PostgreSQL Command Line**
```bash
# Navigate to PostgreSQL bin directory
cd "C:\Program Files\PostgreSQL\18\bin"

# Connect to PostgreSQL
psql -U postgres

# If you have password, it will prompt
# If using trust authentication, connects directly
```

### 2. **Common psql Commands**

| Command | Description |
|---------|-------------|
| `\l` | List all databases |
| `\c database_name` | Connect to a specific database |
| `\dt` | List all tables in current database |
| `\d table_name` | Describe a table structure |
| `\du` | List all users/roles |
| `\q` | Exit psql |
| `\?` | Help with psql commands |
| `\h` | Help with SQL commands |
| `\conninfo` | Show current connection info |

### 3. **Basic SQL Commands**
```sql
-- Create database
CREATE DATABASE database_name;

-- Drop database
DROP DATABASE database_name;

-- Create user
CREATE USER username WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;

-- Show current database
SELECT current_database();

-- Show all tables
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
```

---

## 🗄️ Database Creation - Step by Step

### Step 1: Open Command Prompt as Administrator
```bash
# Press Windows + X, select "Windows Terminal (Admin)"
# Or search "cmd" → Right-click → "Run as administrator"
```

### Step 2: Navigate to PostgreSQL Bin Directory
```bash
cd "C:\Program Files\PostgreSQL\18\bin"
```

### Step 3: Connect to PostgreSQL
```bash
psql -U postgres
```
If prompted for password, enter your PostgreSQL password.

### Step 4: Create Database
```sql
-- At the postgres=# prompt, type:
CREATE DATABASE habesha_fit;
```

### Step 5: Verify Database Creation
```sql
-- List all databases
\l
```
You should see `habesha_fit` in the list.

### Step 6: Connect to Your Database
```sql
\c habesha_fit;
```

### Step 7: Exit PostgreSQL
```sql
\q
```

---

## 🔧 Connection Configuration

### 1. **Environment Variables (.env file)**

Create a `.env` file in your `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=habesha_fit_super_secret_key_2026_change_in_production
JWT_EXPIRE=7d

# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=habesha_fit
DB_PORT=5432
```

### 2. **Database Connection Config (config/database.js)**

```javascript
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log, // Set to false in production
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected Successfully');
    
    // Sync all models (in development)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
```

### 3. **Package.json Scripts**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "db:create": "node -e \"require('./config/database').connectDB()\"",
    "db:drop": "node -e \"require('sequelize').Sequelize.drop()\""
  }
}
```

---

## 🏃 Running the Server

### 1. **Start PostgreSQL Service**

**Check if PostgreSQL is running:**
```bash
# As Administrator
net start | find "PostgreSQL"
```

**Start PostgreSQL if not running:**
```bash
# As Administrator
net start postgresql-x64-18
```

**Stop PostgreSQL:**
```bash
# As Administrator
net stop postgresql-x64-18
```

**Restart PostgreSQL:**
```bash
# As Administrator
net stop postgresql-x64-18 && net start postgresql-x64-18
```

### 2. **Start Node.js Server**

```bash
# Navigate to server directory
cd C:\Users\ADMIN\Desktop\KALEB\Yusra\Health and Fintness\habesha-fit\server

# Install dependencies (first time only)
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

### 3. **Expected Output**
```
Server running on port 5000
✅ PostgreSQL Connected Successfully
✅ Database synced
```

---

## 🔍 Checking Database Status

### 1. **Check if Database Exists**
```bash
cd "C:\Program Files\PostgreSQL\18\bin"
psql -U postgres -d habesha_fit -c "\l" | find "habesha_fit"
```

### 2. **List Tables in Database**
```bash
psql -U postgres -d habesha_fit -c "\dt"
```

### 3. **Check Table Structure**
```bash
psql -U postgres -d habesha_fit -c "\d Users"
```

### 4. **Quick Database Query**
```bash
psql -U postgres -d habesha_fit -c "SELECT * FROM Users LIMIT 5;"
```

---

## ⚠️ Troubleshooting

### **Password Authentication Failed**

**Solution 1: Reset password using trust authentication**

1. Edit `pg_hba.conf`:
```bash
notepad "C:\Program Files\PostgreSQL\18\data\pg_hba.conf"
```

2. Change these lines:
```
host    all             all             127.0.0.1/32            trust
host    all             all             ::1/128                 trust
local   all             all                                     trust
```

3. Restart PostgreSQL:
```bash
net stop postgresql-x64-18
net start postgresql-x64-18
```

4. Connect and reset password:
```bash
psql -U postgres
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

5. Change pg_hba.conf back to `scram-sha-256`
6. Restart PostgreSQL again

### **Connection Refused**

```bash
# Check if PostgreSQL is running
net start | find "PostgreSQL"

# Check port is listening
netstat -an | find "5432"

# Test connection
psql -U postgres -h localhost -p 5432 -d postgres
```

### **Database Already Exists**

```sql
-- Drop database (careful! this deletes all data)
DROP DATABASE IF EXISTS habesha_fit;

-- Create fresh database
CREATE DATABASE habesha_fit;
```

---

## 📊 Quick Reference Commands

### **Windows Commands (Admin Prompt)**
```bash
# PostgreSQL service control
net start postgresql-x64-18    # Start PostgreSQL
net stop postgresql-x64-18      # Stop PostgreSQL
net restart postgresql-x64-18   # Restart

# Navigate to PostgreSQL
cd "C:\Program Files\PostgreSQL\18\bin"

# Connect to database
psql -U postgres -d habesha_fit
```

### **psql Commands (Inside PostgreSQL)**
```sql
-- Database operations
CREATE DATABASE db_name;
DROP DATABASE db_name;
\l                          -- List databases
\c db_name                  -- Connect to database

-- Table operations
\dt                         -- List tables
\d table_name               -- Describe table
SELECT * FROM table_name;   -- View data

-- User operations
\du                         -- List users
CREATE USER username WITH PASSWORD 'pass';
GRANT ALL ON DATABASE db_name TO username;

-- Exit
\q
```

### **Node.js Server Commands**
```bash
# In server directory
npm run dev     # Start with auto-reload
npm start       # Start normally
npm run db:create  # Test database connection
```

---

## 🎯 Complete Workflow

### **First Time Setup:**
```bash
# 1. Start PostgreSQL (Admin)
net start postgresql-x64-18

# 2. Create database
cd "C:\Program Files\PostgreSQL\18\bin"
psql -U postgres
CREATE DATABASE habesha_fit;
\q

# 3. Start Node server
cd C:\path\to\habesha-fit\server
npm install
npm run dev
```

### **Daily Workflow:**
```bash
# 1. Check PostgreSQL is running (Admin)
net start | find "PostgreSQL"

# 2. Start server (normal prompt)
cd C:\path\to\habesha-fit\server
npm run dev
```

### **Shutdown:**
```bash
# Stop Node server (Ctrl + C in server terminal)
# PostgreSQL can keep running or stop it:
net stop postgresql-x64-18    # Admin prompt
```

---

## 📝 Notes

- **Default PostgreSQL password**: Often `postgres` (set during installation)
- **Default port**: `5432`
- **Connection string**: `postgresql://postgres:postgres@localhost:5432/habesha_fit`
- **Data directory**: `C:\Program Files\PostgreSQL\18\data`
- **Config file**: `C:\Program Files\PostgreSQL\18\data\pg_hba.conf`

---

## 🆘 Need Help?

If you encounter issues:
1. Check PostgreSQL is running: `net start | find "PostgreSQL"`
2. Check .env file has correct password
3. Verify database exists: `psql -U postgres -l`
4. Check server logs for specific errors
5. Ensure port 5432 is not blocked

---
