# TODO: Add Signup and Login to Expense Tracker

## Steps to Complete
- [x] Add mongoose to server/package.json dependencies
- [x] Create server/index.js: Express server setup, MongoDB connection, middleware
- [x] Create server/models/User.js: Mongoose User schema
- [x] Create server/routes/auth.js: Signup and login routes with bcrypt and JWT
- [x] Edit index.html: Add JavaScript for signup/login form submissions and token handling
- [x] Ensure .env has MONGO_URI and JWT_SECRET
- [x] Modified auth.js to use in-memory storage instead of MongoDB
- [x] Modified expenses.js to use in-memory storage instead of MongoDB
- [x] Modified index.js to remove MongoDB dependency and serve static files
- [x] Added logout functionality to server and frontend
- [x] Implemented home page with authentication-based content switching
- [ ] Run npm install in server/
- [ ] Start the server with npm start
- [ ] Test signup and login functionality
