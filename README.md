
Project Documentation: Personalized Trip Planning Application
NOTE:
If you are using the app, it might not work properly the first time, because the server goes offline if not pinged every 15 minutes. It takes little time for it to reboot as it's free.

Introduction
This document provides a comprehensive overview of the architecture, technology stack, and key features of the Personalized Trip Planning Application. The project leverages modern web development tools and methodologies to create a user-friendly platform for planning personalized trips. Below, you’ll find detailed explanations of the application structure, the technologies used, and some of the challenges encountered during development.
Architecture Overview
The architecture of this application follows a structured approach, integrating several key technologies to ensure a seamless user experience. Below is an architectural diagram that summarizes the application’s components and how they interact:

Tech Stack
	•	Frontend: The frontend is built using React, a popular JavaScript library for building user interfaces. The application utilizes Framer Motion for smooth animations, enhancing the user experience.
	•	Backend: The backend logic is handled by Node.js with Express.js for creating APIs. This setup ensures that the server can efficiently handle user requests and manage the business logic.
	•	Database: MongoDB is used to store user data, including trip details and preferences. MongoDB’s flexibility allows for the efficient handling of complex data structures.
	•	Authentication: User authentication is managed through Firebase, a robust platform that provides secure and scalable authentication services.
	•	Content Generation: The application uses the Gemini API to generate personalized trip content based on user input. This API plays a crucial role in delivering tailored itineraries and recommendations.
Application Flow
1. User Journey
	•	Landing Page: Users first enter the website, where the frontend interacts with Firebase and the APIs to provide an interactive experience.
	•	Explore Trips: On the landing page, users can explore trips by clicking the “Explore Trips” button. This feature pulls five random trips from the database, offering users a glimpse of available options.
	•	Authentication Middleware: Before accessing certain features, a middleware checks if the user is logged in. If not, the user is conditionally redirected to the login page. After logging in, users are redirected back to their desired page, ensuring a smooth experience.
2. Create Personalized Trip
	•	Trip Form: Users are presented with a form to create a personalized trip. The form includes inputs for location, budget, number of days, and number of people.
	•	Location Autocomplete: As users start typing in the “Enter Location” field, the application suggests popular places. These suggestions are cached locally to reduce the load on the database and improve performance.
	•	Input Validation: The form includes validation to ensure realistic inputs that are compatible with the Gemini API. For instance, the number of days is limited to five, which is the optimal output range for the Gemini API.
	•	Trip Creation: Once the form is submitted, the data is sent to a backend API endpoint, where the Gemini API generates a personalized trip. The response is processed and sent back to the frontend to display the results.
3. Result Page
	•	Animations: Upon generating a trip, users are greeted with smooth animations, courtesy of Framer Motion, transitioning them to the result page.
	•	Trip Details: The result page displays a detailed itinerary, including hotel information (price, rating, address) and daily plans. Additional information like coordinates and photos (sourced from Unsplash) are stored in the backend.
	•	Booking Options: Users can click “Book Now” to search for hotels directly on Google.
4. My Trip Page
	•	Trip Collection: This page displays all trips created by the user. Clicking “Show More” on a trip card redirects to a detailed page, similar to the result page, but with additional actions.
	•	Additional Actions:
	1.	Create AI-Recommended Trip: Users can further personalize their trip based on preferences gathered through additional questions. The current itinerary and answers are sent to the Gemini API for further refinement.
	2.	Book Flight: This feature enables users to search for flights on Google related to their trip.
	3.	Generate Markdown: The application uses the json2md library to convert trip data into markdown format. This approach optimizes the app by handling conversions on the frontend.

Frontend Implementation
The frontend of the application is designed using modern web development practices. Here’s an overview of the key components and their roles:
	•	Component Structure: The frontend follows a component-based architecture, utilizing reusable and modular components. These components are the building blocks of the application, constructed using the Chakra UI library to ensure consistency in design and functionality.
	•	Pages: The application is divided into multiple pages:
	•	Landing Page: Provides an overview and access to key features like trip exploration.
	•	Form Pages: Include the form for creating personalized trips.
	•	Trip Pages: Dynamic routes that display trip details.
	•	My Trips Page: Displays all the trips a user has created.
	•	Custom Hooks: Custom hooks are utilized to manage specific functionalities and to maintain a clean separation of concerns between the frontend and backend. For example, the useTripForm hook is used to handle the logic for the trip planning form, managing states for user inputs (e.g., place, budget, days, people) and handling location suggestions and trip generation.
	•	Caching & Performance Optimization: The useTripForm hook includes caching mechanisms to store location suggestions and trip plans locally, reducing redundant API calls and improving performance. This ensures a smoother user experience by minimizing delays.
	•	Context API & Services: The frontend uses React’s Context API to manage global state, particularly for authentication using Firebase. Services are created to handle common functions across the application, keeping the codebase organized and efficient.

Backend Structure
Folder Structure Overview
	1.	config/:
	•	firebase.js: Configuration and initialization for Firebase services, primarily for user authentication.
	•	index.js: Central configuration file for environmental variables and settings.
	•	mongoose.js: Sets up MongoDB connection using Mongoose.
	2.	controllers/:
	•	openController.js: Logic for publicly accessible routes that do not require authentication.
	•	tripController.js: Handles trip-related operations like creating, retrieving, and updating trips.
	•	userController.js: Manages user operations such as registration, login, and profile updates.
	3.	middlewares/:
	•	authMiddleware.js: Checks user authentication before allowing access to protected routes.
	4.	models/:
	•	City.js: Schema for storing city-related data.
	•	Trip.js: Schema for storing trip information.
	•	User.js: Schema for user data and references to their trips.
	5.	routes/:
	•	openRoutes.js: Publicly accessible routes.
	•	tripRoutes.js: Routes related to trip management, requiring authentication.
	•	userRoutes.js: Routes for user-related operations.
	6.	services/:
	•	Service files handle complex business logic or interactions with external APIs, abstracting these processes from controllers.
Backend Nuances
	•	The backend follows the MVC (Model-View-Controller) pattern, ensuring a clean separation of concerns.
	•	Three main models (City, Trip, User) form the core of the application.
	•	Routes are categorized into public and protected, with authentication enforced via middleware.
	•	A custom service handles interactions with the Gemini API, streamlining the process for generating personalized content.
Challenges Overcome
	•	Token Count Limitation: Form validation was implemented to manage token count effectively, preventing issues with the Gemini API.
	•	Expensive Location Search: Caching was introduced to minimize database load during location searches.
	•	Image Retrieval: The Unsplash API was used to source images, with a random function ensuring variety.
Potential Improvements
	•	Google Maps API: Integrating Google Maps API for location suggestions could improve user experience but was not implemented due to cost considerations.
	•	Custom LLM Model: Training a custom language model to replace the Gemini API could eliminate limitations on the number of days and reduce dependency on external services.
	•	Google API for Images: Using Google’s API to source images for hotels and locations could provide more accurate results.
	•	WhatsApp Integration: Initially planned to share trip details as markdown via WhatsApp, but limitations in WhatsApp’s API prevented implementation.
