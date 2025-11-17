# testSmith Enterprise Portal

A React application with Azure AD SSO authentication via Auth0.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Auth0
Follow the detailed instructions in [AUTH0_SETUP.md](./AUTH0_SETUP.md)

Quick summary:
- Create Auth0 account (free)
- Create Single Page Application
- Set up Azure AD Enterprise Connection (or use Database/Social for testing)
- Copy credentials to `.env` file

### 3. Update Environment Variables
Edit `.env` file and fill in your Auth0 credentials:

```env
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000
```

### 4. Run the Application
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features

- ✅ Azure AD SSO Integration via Auth0
- ✅ Beautiful Material UI Design
- ✅ Protected Routes
- ✅ User Profile Dashboard
- ✅ Secure Login/Logout
- ✅ Responsive Design

## 🏗️ Tech Stack

- **React 19.2** - UI Framework
- **Material UI** - Component Library
- **Auth0 React SDK** - Authentication
- **React Router** - Navigation

## 📁 Project Structure

```
testSmith-portal/
├── src/
│   ├── components/          # Reusable components
│   │   ├── LoginButton.js
│   │   ├── LogoutButton.js
│   │   └── Loading.js
│   ├── pages/              # Page components
│   │   ├── LandingPage.js
│   │   └── Dashboard.js
│   ├── App.js              # Main app with routing
│   └── index.js            # Entry point with Auth0Provider
├── .env                    # Environment variables (not in git)
├── .env.example            # Example env file
└── AUTH0_SETUP.md          # Detailed Auth0 setup guide
```

## 🔐 Authentication Flow

1. User visits landing page
2. Clicks "Log in through testSmith SSO"
3. Redirected to Auth0 Universal Login
4. Authenticates via Azure AD (enterprise SSO)
5. Redirected back to dashboard
6. User profile displayed with info from Azure AD

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
