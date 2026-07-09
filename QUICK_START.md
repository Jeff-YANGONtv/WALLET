# 🚀 Quick Start Guide

## Step 1: Setup Supabase Database (5 minutes)

1. Open your Supabase dashboard: https://unjnemhzwliwghukyzhf.supabase.co
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the entire contents of `SUPABASE_SETUP.sql`
5. Click **Run** button
6. You should see: `total_records | 3` (if sample data was added)

✅ **Database is ready!**

---

## Step 2: Deploy to Vercel (5 minutes)

### Option A: Using GitHub (Recommended)

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Wallet Dashboard commit"
   git remote add origin https://github.com/YOUR_USERNAME/wallet-dashboard.git
   git branch -M main
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `wallet-dashboard` repository
   - Click "Import"

3. **Add Environment Variables:**
   - In Vercel dashboard, go to **Settings > Environment Variables**
   - Add these three variables:
     ```
     SUPABASE_URL = https://unjnemhzwliwghukyzhf.supabase.co
     SUPABASE_SERVICE_ROLE_KEY = your_supabase_service_role_key_here
     ADMIN_PASSWORD = 036324
     ```
   - Click "Deploy"

4. **Wait for deployment** (usually 1-2 minutes)

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# Follow the prompts and add environment variables when asked
```

---

## Step 3: Access Your App

Once deployed, you'll get a URL like: `https://wallet-dashboard-xxxxx.vercel.app`

**Login with:**
- Password: `036324`

---

## 📊 What You Can Do

✅ View total revenue in dashboard  
✅ Browse channels with pagination  
✅ View revenue history  
✅ Add new channel records  
✅ Edit channel data (name, ads, fees, etc.)  
✅ Delete records  
✅ Real-time data sync with Supabase  

---

## 🔐 Security Notes

⚠️ **Important:**
- Change the default admin password in production
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret (never commit to Git)
- Use Supabase RLS policies to restrict access if needed

---

## ❓ Troubleshooting

### "Connection refused" error
- Verify Supabase database is active
- Check environment variables are set correctly in Vercel
- Restart the Vercel deployment

### Login fails
- Verify admin password is correct (default: `036324`)
- Check browser console for error messages
- Verify `/api/admin-auth` endpoint is responding

### Data not loading
- Check Supabase table exists (run SQL again if needed)
- Verify RLS policies allow access
- Check network tab in browser DevTools

---

## 📝 Next Steps

1. Change admin password for security
2. Add your channel data via the spreadsheet interface
3. Share the app URL with your team
4. Monitor revenue in real-time

---

## 📞 Support

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **API Reference:** See `README.md`

---

**Enjoy your Wallet Dashboard! 🎉**
