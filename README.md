# Multi-Tenant SSO with Auth0

A complete implementation of Multi-Tenant Single Sign-On (SSO) using Auth0, React, and Material UI.

## 🏗️ Project Structure

- **testsmith-portal/** - Enterprise Identity Provider (Port 3000)
- **test-enterprise-my-app/** - Main Application using SSO (Port 3001)

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Auth0 account (free tier works)

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd testsso
```

2. **Setup testSmith Portal**
```bash
cd testsmith-portal
npm install
# Configure .env with your Auth0 credentials
npm start
```

3. **Setup testEnterpriseMyApp**
```bash
cd test-enterprise-my-app
npm install
# Configure .env with your Auth0 credentials
npm start
```

## 📚 Documentation

- See `COMPLETE_SUMMARY.md` for full architecture overview
- See individual app folders for specific setup guides

## 🔐 Features

- Multi-tenant SSO architecture
- Enterprise OIDC connection
- Material UI design
- Protected routes
- User profile management

## 🛠️ Tech Stack

- React 19.2
- Auth0 React SDK
- Material UI
- React Router

## ⚠️ Important

Never commit `.env` files - they contain sensitive credentials and are gitignored.
