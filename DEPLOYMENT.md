# Deployment Guide - MongoDB Setup

## Issue: Games Not Showing on Live Website

If games are not showing on the live website but work in the admin panel, it's likely a **MongoDB connection issue**.

## Solution: Set Environment Variables

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
   - **Environment:** Select all (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your application (go to Deployments → click the three dots → Redeploy)

### For Other Platforms (Netlify, Railway, etc.):

1. Find the **Environment Variables** section in your platform's dashboard
2. Add `MONGODB_URI` with your MongoDB connection string
3. Redeploy the application

## How to Get MongoDB Connection String:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (if using Atlas)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your actual database password
6. Replace `<dbname>` with your database name (or remove it if using default)

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gamesDB?retryWrites=true&w=majority
```

## Verify Connection:

After setting the environment variable and redeploying:

1. Check your deployment logs for:
   - ✅ `MongoDB connected successfully` (success)
   - ❌ `MongoDB connection error` (failure)
2. Visit your live website - games should now appear
3. Check browser console for any errors

## Common Issues:

### Issue 1: Environment Variable Not Set
**Symptom:** No games showing, admin panel works
**Solution:** Set `MONGODB_URI` in your deployment platform's environment variables

### Issue 2: Wrong Connection String
**Symptom:** Connection errors in logs
**Solution:** Verify your MongoDB connection string is correct and includes password

### Issue 3: Network/IP Restrictions
**Symptom:** Connection timeout
**Solution:** In MongoDB Atlas, go to Network Access and add `0.0.0.0/0` (allow all IPs) or your server's IP

### Issue 4: Database Name Mismatch
**Symptom:** Games not found
**Solution:** Ensure the database name in connection string matches where your games are stored

## Testing Locally:

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gamesDB?retryWrites=true&w=majority
```

Then run:
```bash
npm run dev
```

## Important Notes:

- Never commit `.env.local` or `.env` files to Git
- Always set environment variables in your deployment platform
- After changing environment variables, you must redeploy
- Check server logs for detailed error messages

