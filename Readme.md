# Finance Dashboard API 📊

A robust, enterprise-grade RESTful API built to manage personal finances, track transactions, and generate real-time analytical summaries. 

This project demonstrates advanced backend engineering principles including Layered Architecture (Controller-Service-Route), Role-Based Access Control (RBAC), robust input validation, and comprehensive security measures.

## ✨ Key Features

* **Secure Authentication:** JWT-based login and registration with Bcrypt password hashing.
* **Role-Based Access Control (RBAC):** Tiered permissions (`ADMIN`, `ANALYST`, `VIEWER`) ensuring users only access authorized routes. Protection against Privilege Escalation included.
* **Advanced Querying:** Support for pagination, keyword search, and dynamic date/type filtering on transactions.
* **Data Integrity:** Soft-delete architecture for transactions and users, preserving historical data.
* **Defensive Programming:** Strict schema validation using Zod and global rate-limiting to prevent API abuse.
* **Live Documentation:** Fully interactive API documentation powered by Swagger UI.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Validation:** Zod
* **Security:** JSON Web Tokens (JWT), Bcrypt, Express Rate Limit
* **Documentation:** Swagger UI (OpenAPI 3.0)

## 📁 Project Structure

├── prisma/
│   └── schema.prisma         # Database schema and models
├── src/
|   |── config/
│   ├── controllers/          # HTTP request/response handling
│   ├── middlewares/          # Auth, RBAC, and Validation gates
│   ├── routes/               # Express route definitions
│   ├── services/             # Core business logic and database queries
│   ├── validations/          # Zod validation schemas
│   |── app.js
|   ├── server.js                 # Application entry point
|            # Express app configuration & middleware setup
|── .env
├── swagger.yaml              # OpenAPI specification
├── prisma.config.ts                 # Application entry point
├── package.json              # Project dependencies
└── README.md                 # Project documentations