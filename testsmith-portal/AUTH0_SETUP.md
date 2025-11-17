# testSmith Enterprise Portal - Auth0 Setup Guide

## Step 1: Create Auth0 Account (Free Tier)

1. Go to https://auth0.com/signup
2. Sign up for a free account
3. Create a tenant (e.g., `testsmith-dev.auth0.com`)

## Step 2: Create Auth0 Application for testSmith Portal

1. **Log in to Auth0 Dashboard**: https://manage.auth0.com/
2. **Navigate to Applications** → Click "Create Application"
3. **Configure Application:**
   - Name: `testSmith Enterprise Portal`
   - Application Type: Select **"Single Page Application"**
   - Click "Create"

4. **Configure Application Settings:**
   
   Go to the "Settings" tab and configure:
   
   - **Allowed Callback URLs:**
     ```
     http://localhost:3000
     ```
   
   - **Allowed Logout URLs:**
     ```
     http://localhost:3000
     ```
   
   - **Allowed Web Origins:**
     ```
     http://localhost:3000
     ```
   
   - **Allowed Origins (CORS):**
     ```
     http://localhost:3000
     ```

5. **Save Changes**

6. **Copy Credentials:**
   - Copy the **Domain** (e.g., `testsmith-dev.auth0.com`)
   - Copy the **Client ID** (e.g., `abc123xyz...`)

## Step 3: Update .env File

Edit the `.env` file in `testSmith-portal` folder:

```env
REACT_APP_AUTH0_DOMAIN=testsmith-dev.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id-here
REACT_APP_AUTH0_AUDIENCE=
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000
```

Replace:
- `testsmith-dev.auth0.com` with your actual Auth0 domain
- `your-client-id-here` with your actual Client ID

## Step 4: Set Up Azure AD Enterprise Connection

### Option A: Using Azure AD (If you have Azure tenant)

1. **In Auth0 Dashboard**, go to **Authentication** → **Enterprise**
2. Click **"Azure Active Directory"**
3. Click **"Create Connection"**

4. **Configure Azure AD Connection:**
   - **Connection Name:** `testsmith-azure-ad`
   - **Microsoft Azure AD Domain:** Your Azure AD domain (e.g., `testsmith.onmicrosoft.com`)
   
5. **Azure AD Configuration:**
   - You'll see instructions to register an application in Azure AD
   - **In Azure Portal** (https://portal.azure.com):
     - Go to **Azure Active Directory** → **App Registrations**
     - Click **"New registration"**
     - Name: `Auth0-testSmith-SSO`
     - Supported account types: **"Accounts in this organizational directory only"**
     - Redirect URI: Copy from Auth0 (it will be something like `https://testsmith-dev.auth0.com/login/callback`)
     - Click **"Register"**
   
   - **Copy Application (client) ID** from Azure
   - **Copy Directory (tenant) ID** from Azure
   
   - **Create Client Secret:**
     - In Azure app, go to **Certificates & secrets**
     - Click **"New client secret"**
     - Add description: `Auth0 SSO Secret`
     - Expiry: Choose duration
     - Click **"Add"**
     - **Copy the secret value** (you won't see it again!)
   
   - **API Permissions:**
     - Go to **API permissions**
     - Should already have `User.Read` for Microsoft Graph
     - Click **"Grant admin consent"** if you have admin rights

6. **Back in Auth0:**
   - Paste **Client ID** (from Azure)
   - Paste **Client Secret** (from Azure)
   - Paste **Microsoft Azure AD Domain** (e.g., `testsmith.onmicrosoft.com`)
   - **Attributes:**
     - Email: `upn` or `email`
     - Email Verified: Leave default
   - Click **"Create"**

7. **Enable Connection for Application:**
   - In the connection settings, go to **"Applications"** tab
   - Enable the connection for **"testSmith Enterprise Portal"**
   - Click **"Save"**

### Option B: For Testing Without Azure AD (Mock SSO)

If you don't have Azure AD yet, you can test with:

1. **Database Connection (Username/Password):**
   - Auth0 → **Authentication** → **Database**
   - Use the default `Username-Password-Authentication`
   - Enable it for your application

2. **Or use Social Connections:**
   - Auth0 → **Authentication** → **Social**
   - Enable Google/GitHub for quick testing
   - Enable for your application

## Step 5: Test the Application

1. Make sure `.env` file is configured correctly
2. Restart the dev server if it's running
3. Run the application:
   ```bash
   npm start
   ```
4. Open http://localhost:3000
5. Click "Log in through testSmith SSO"
6. You should see Auth0 Universal Login page
7. If Azure AD is configured, you'll see enterprise login option

## Step 6: Verify SSO Flow

After successful login:
- User should be redirected to Dashboard
- User profile should display name, email, and picture
- Logout should work and return to landing page

## Troubleshooting

### Error: "Application credentials are missing"
- Check if `.env` file has correct values
- Make sure to restart the dev server after changing `.env`

### Error: "Callback URL mismatch"
- Ensure `http://localhost:3000` is in Auth0 Allowed Callback URLs
- Check REACT_APP_AUTH0_REDIRECT_URI in `.env`

### Error: "Connection not enabled"
- Make sure Azure AD connection is enabled for your application
- Go to Auth0 → Authentication → Enterprise → Azure AD → Applications tab

## Next Steps

After testSmith portal is working:
1. We'll create the main application (`testEnterpriseMyApp`)
2. Configure it to use testSmith as Enterprise SSO provider
3. Set up the custom login flow

---

## Important Notes

✅ **Free Tier Limits:**
- 7,500 monthly active users
- Unlimited logins
- Enterprise connections included
- 2 social identity providers

✅ **Security:**
- Never commit `.env` file to git (already in .gitignore)
- Use environment variables for production
- Enable MFA for production users

✅ **Azure AD Requirements:**
- Need Azure AD tenant (can create free one)
- Need admin access to register apps
- Can use Microsoft 365 Business/Enterprise AD
