# 🐾 Pet Adoption Service

This project is a **Pet Adoption Service API** developed as part of the Backend III course at Coderhouse. It provides a platform for managing users, pets, and adoptions, allowing users to adopt pets and manage their data.

## 📖 Features

- **User Management**: Create, update, retrieve, and delete user profiles.
- **Pet Management**: Manage pets available for adoption, including their details (name, species, birth date, etc.).
- **Adoption Management**: Facilitate the adoption process by linking users with pets.
- **Mock Data Generation**: Generate mock data for testing purposes.
- **Authentication**: Secure user registration and login with JWT-based authentication.
- **API Documentation**: Comprehensive Swagger documentation for all endpoints.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing users, pets, and adoptions.
- **Mongoose**: ODM for MongoDB to manage database schemas and queries.
- **Swagger**: API documentation and testing.
- **Chai & Mocha**: Testing framework for integration tests.

## 📄 API Documentation

The API is fully documented using Swagger. You can access the documentation by running the project and navigating to:

- **Swagger UI**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## 🚀 Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pet-adoption-service.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   You can find an example in the repository. Labeled as: `.env.example`

4. **Run the server**:
   ```bash
   npm run dev
   ```

## 🧪 Testing:

Integration tests are included for the authentication, users, pets, and adoptions modules. To run the tests:
```bash
npm run test:watch
```
