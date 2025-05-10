# Customer Management Backend

This is a backend for the Customer Management application, built using **Node.js 22.4** and **PostgreSQL**. It provides functionality for user authentication, customer CRUD operations, and password management.

## Project Requirements

- **Node.js** 22.4 (or higher)
- **PostgreSQL** 14 or later
- **npm** (Node package manager)

---

## Setup Instructions

### 1. Install Dependencies

Install all necessary dependencies by running the following command:

```bash
npm install
```

### 2. Set Up the PostgreSQL Database

Install PostgreSQL if it's not installed on your machine. Instructions can be found here: https://www.postgresql.org/download/
Create a new PostgreSQL database. For example:

```bash
createdb customer_management_db
```

Run the provided init.sql script to set up the database schema.

```bash
psql -U postgres -d customer_management_db -f db/init.sql
```
### 3. Set Up Environment Variables
Create a .env file in the root of your project and add the following:

```bash
DB_HOST=localhost           # The host where your PostgreSQL server is running (usually localhost).
DB_PORT=5432                # The port for PostgreSQL (usually 5432).
DB_NAME=customer_management_db  # The name of your database.
DB_USER=your_postgresql_username   # Your PostgreSQL username.
DB_PASSWORD=your_postgresql_password  # Your PostgreSQL password.
JWT_SECRET=your_jwt_secret_key   # A secret string used to sign JWT tokens (choose something secure).
JWT_EXPIRES_IN=1h          # Token expire time (e.g., 1h for 1 hour, or 3600s for 1 hour).
```

### 4. Run the Application
Once you've set up the database and environment variables, run the application:

```bash
npm start
```
The server will start on http://localhost:3000 (or the port specified in your code).


## Conclusion

You now have the Customer Management Backend up and running with:

User authentication via JWT
Password change functionality
Basic customer CRUD operations

If you encounter any issues, please check the logs and make sure your environment variables are correctly set.
