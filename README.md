# Web Management User

## Overview
This is a [React](https://reactjs.org/) + [Next.js 14](https://nextjs.org/) project using Server-Side Rendering (SSR), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [Prisma](https://www.prisma.io/) as the ORM for database management.

## Features
1. **Login**  
   - Use the POST /login endpoint on the login page.
   - Store the token received from the response.
2. **List Users**  
   - Use the GET /users endpoint.
   - Display only the fields id and email.
3. **Detail User**  
   - The user must click the "Detail" button to navigate to the user detail page.
   - Display all user data on the detail page.
4. **Create User**  
   - Use a dummy endpoint POST /users with the following JSON payload.
   - Validation Rules:
        - Email: Must be a valid email format and is mandatory.
        - First name: Must contain only alphabets (a-zA-Z) and is mandatory.
        - Last name: Must contain only alphabets (a-zA-Z) and is optional.
        - Avatar: Only store the filename (full URL) and is mandatory.
    
5. **Update User**  
   - Use the PUT /users endpoint.
   - All fields can be updated except the email field.
6. **Delete User**  
   - Use the DELETE /users endpoint to remove a user.
7. **Logout**  
   - Provide functionality for users to log out of the application.


## Techstack
- **React** for building UI components
- **Next.js 14** with Server-Side Rendering (SSR)
- **TypeScript** for static type checking
- **Tailwind CSS** for responsive design and utility-first styling
- **Prisma** as the ORM to interact with the database

## Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (>= 18.x)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager
- A supported database for Prisma (e.g., PostgreSQL, MySQL, SQLite)

## Installation

1. **Clone repository**:
   ```bash
   git clone from this repo https://github.com/januarmaksum/users
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
4. **Run Prisma studio**:
   ```bash
   npx prisma studio
   ```
