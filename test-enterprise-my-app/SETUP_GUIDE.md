# testEnterpriseMyApp - Setup Guide

## 🎯 Overview

This is the **main application** that uses **testSmith** as an external Enterprise SSO provider. This demonstrates a complete multi-tenant SSO architecture.

---

## 📋 Prerequisites

Before setting up this app, make sure:
- ✅ **testSmith-portal is working** and you can login successfully
- ✅ You have Auth0 account with testSmith Portal configured
- ✅ You know your Auth0 Domain and have access to dashboard

---

## 🔧 Step-by-Step Setup

### Step 1: Create New Auth0 Application (5 minutes)

1. **Go to Auth0 Dashboard:** https://manage.auth0.com/
2. **Applications** → Click **"Create Application"**
3. **Configure:**
   - Name: `testEnterpriseMyApp`
   - Type: **Single Page Application**
   - Click **"Create"**

4. **Settings Tab - Configure URLs:**
   
   **Allowed Callback URLs:**
   ```
   http://localhost:3001
   ```
   
   **Allowed Logout URLs:**
   ```
   http://localhost:3001
   ```
   
   **Allowed Web Origins:**
   ```
   http://localhost:3001
   ```
   
   **Allowed Origins (CORS):**
   ```
   http://localhost:3001
   ```

5. **Save Changes**

6. **Copy Credentials:**
   - Domain: `dev-rjvjviatjvjzxe2z.us.auth0.com` (same as testSmith)
   - Client ID: (new client ID for this app)

---

### Step 2: Create Enterprise Connection (CRITICAL - 10 minutes)

This connects testEnterpriseMyApp to use testSmith as SSO provider.

1. **In Auth0 Dashboard**, go to **Authentication** → **Enterprise**

2. **Choose Connection Type:**
   - **For testing:** Click **"SAML"** (we'll create a mock enterprise connection)
   - **For production:** You'd use actual Azure AD or OIDC

3. **Configure SAML Connection:**
   
   **Connection Name:**
   ```
   testsmith-sso
   ```
   
   **Sign In URL:**
   ```
   https://dev-rjvjviatjvjzxe2z.us.auth0.com/authorize?client_id=fd9FBiJTZ1MMmjzvwXLAsornuyHFU6T6&response_type=code
   ```
   (Use your testSmith Portal Client ID)
   
   **X509 Signing Certificate:**
   For testing, you can generate a self-signed cert or use Auth0's test cert.
   
   **Sign Out URL (optional):**
   ```
   https://dev-rjvjviatjvjzxe2z.us.auth0.com/v2/logout
   ```

4. **Enable Connection for Application:**
   - Go to **"Applications"** tab in the connection
   - **Enable** it for **testEnterpriseMyApp**
   - **Disable** it for testSmith Portal (to avoid confusion)

5. **Save**

---

### Step 3: Alternative - Simple Enterprise Connection (EASIER)

Instead of SAML, use **Auth0 as the Enterprise Provider**:

1. **In Auth0 Dashboard**: **Authentication** → **Enterprise** → **OpenID Connect**

2. **Create Connection:**
   - Name: `testsmith-sso`
   - Issuer URL: `https://dev-rjvjviatjvjzxe2z.us.auth0.com/`
   - Client ID: (your testSmith Portal Client ID)
   - Client Secret: Get from testSmith Portal application settings
   - Scopes: `openid profile email`

3. **Enable for testEnterpriseMyApp**

---

### Step 4: Update .env File

Edit `.env` file in this project:

```env
REACT_APP_AUTH0_DOMAIN=dev-rjvjviatjvjzxe2z.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-new-client-id-here
REACT_APP_AUTH0_AUDIENCE=
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3001
```

Replace:
- `your-new-client-id-here` with the Client ID from **testEnterpriseMyApp** application

---

### Step 5: Run the Application

```bash
npm start
```

The app will run on http://localhost:3001 (different port from testSmith portal)

---

## 🎯 Testing the SSO Flow

1. **Open:** http://localhost:3001
2. **Click:** "Log in through testSmith SSO to continue to testEnterpriseMyApp portal"
3. **You should:**
   - Be redirected to Auth0
   - Auth0 recognizes the enterprise connection
   - Redirects to testSmith for authentication
   - After testSmith login, back to testEnterpriseMyApp dashboard

---

## 🔍 Expected Flow

```
testEnterpriseMyApp (localhost:3001)
    ↓ (clicks SSO button)
Auth0 (recognizes enterprise connection "testsmith-sso")
    ↓
testSmith Portal Auth (localhost:3000 / Azure AD)
    ↓ (user authenticates)
Auth0 (receives token from testSmith)
    ↓
testEnterpriseMyApp Dashboard (logged in!)
```

---

## ⚠️ Important Notes

### Port Numbers:
- **testSmith Portal:** http://localhost:3000
- **testEnterpriseMyApp:** http://localhost:3001

Both apps can run simultaneously for testing!

### Enterprise Connection Name:
The connection name `testsmith-sso` in code **must match** the connection name in Auth0 Dashboard.

In `LoginPage.js`:
```javascript
loginWithRedirect({
  authorizationParams: {
    connection: 'testsmith-sso', // Must match Auth0 connection name
  },
});
```

---

## 🐛 Troubleshooting

### "Connection not found"
- Check connection name matches exactly in Auth0 and code
- Ensure connection is enabled for testEnterpriseMyApp

### "Callback URL mismatch"
- Verify http://localhost:3001 is in all URL fields in Auth0
- Check .env has PORT=3001 or correct redirect URI

### Both apps conflict
- Run on different ports: testSmith (3000), testEnterpriseMyApp (3001)
- Clear browser cookies if switching between apps

---

## 📚 Next Steps After Setup

1. Test the complete SSO flow
2. Add more features to dashboard
3. Implement role-based access control
4. Add organization/tenant management
5. Deploy to production with HTTPS

---

## 🎉 Success Criteria

You'll know it's working when:
- ✅ Click SSO button on testEnterpriseMyApp
- ✅ Redirected through Auth0
- ✅ Authenticate via testSmith
- ✅ Return to testEnterpriseMyApp dashboard
- ✅ See your profile information
- ✅ "Multi-Tenant SSO Authentication Successful" message appears
