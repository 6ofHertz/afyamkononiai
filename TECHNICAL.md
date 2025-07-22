## Project Architecture

The project follows a client-server architecture. The frontend is a Single-Page Application (SPA) built with React, running in the user's browser. It communicates with a backend powered by Supabase, which provides database, authentication, and serverless functions.

## Detailed Technologies Used

*   **Frontend:**
    *   React: A JavaScript library for building user interfaces.
    *   TypeScript: A typed superset of JavaScript that improves code maintainability and helps catch errors early.
    *   Vite: A fast build tool that provides a quick development environment with features like hot module replacement.
    *   shadcn-ui: A collection of reusable UI components built with Tailwind CSS and Radix UI.
    *   Tailwind CSS: A utility-first CSS framework for quickly building custom designs.
*   **Backend:**
    *   Supabase: An open-source Firebase alternative that provides a PostgreSQL database, Authentication, realtime subscriptions, and Storage.
*   **AI/ML:**
    *   Gemini API: Used for the AI Health Assistant and Symptom Checker features to process natural language input and provide relevant responses.

## Key Libraries and Frameworks

*   React Router: For handling client-side routing and navigation within the SPA.
*   Zustand: A small, fast, and scalable bearbones state-management solution.
*   React Hook Form: For managing forms and form validation.
*   Axios: A promise-based HTTP client for making requests to the backend and external APIs.

## Data Flow

Data flows from the Supabase backend to the React frontend through API calls. User interactions in the frontend trigger state changes, which may lead to API calls to fetch or update data in the Supabase database. Serverless functions in Supabase handle specific backend logic, such as processing AI requests.

## Authentication and Authorization

Supabase Authentication is used to manage user accounts and sessions. Role-based access control is implemented to differentiate between users (e.g., patients and doctors) and restrict access to certain features or data based on their roles.

## API Integrations

*   Supabase API: Used for database operations, authentication, and interacting with Supabase services.
*   Gemini API: Integrated to power the AI Health Assistant and Symptom Checker by sending user queries and receiving AI-generated responses.

## Code Structure and Conventions

The project follows a component-based architecture with a clear separation of concerns. The `src` directory contains the main application code, organized into subdirectories for components, pages, hooks, libraries, and integrations. Components are reusable UI elements, pages represent different views in the application, hooks encapsulate reusable logic, libraries contain utility functions, and integrations handle interactions with external services like Supabase.
