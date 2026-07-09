# Installation & Deployment Guide

## Quick Start (5 minutes)

### Step 1: Supabase Setup

1. Go to https://supabase.com and create a free account
2. Create a new project
3. In the SQL Editor, paste the contents of `sql/schema.sql` and run it
4. Go to Settings > API and copy:
   - Project URL → `SUPABASE_URL`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Step 2: Local Testing (Optional)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in browser
# Login with password: 036324
```

### Step 3: Deploy to Vercel

**Option A: Using GitHub**

1. Push this project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/wallet-dashboard.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables:
   - `SUPABASE_URL` = your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your service role key
   - `ADMIN_PASSWORD` = your chosen password (default: 036324)
5. Click "Deploy"

**Option B: Direct Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel
# Follow prompts and add environment variables
```

### Step 4: Access Your App

Your app will be live at: `https://your-project.vercel.app`

Login with your admin password.

## File Descriptions

| File | Purpose |
|------|---------|
| `public/index.html` | Complete frontend SPA (no build needed) |
| `api/index.js` | Vercel serverless API backend |
| `sql/schema.sql` | Supabase database schema |
| `package.json` | Node.js dependencies |
| `vercel.json` | Vercel deployment config |
| `.env.example` | Environment variable template |

## Environment Variables Explained

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes | Your Supabase project URL (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase admin key (SECRET - never share!) |
| `ADMIN_PASSWORD` | No | Dashboard login password (default: 036324) |

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to Git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Change default admin password in production
- Use Supabase RLS policies to restrict access

## Troubleshooting

### "SUPABASE_URL is not defined"
- Check environment variables are set in Vercel dashboard
- Restart the deployment after adding variables

### "Connection refused"
- Verify Supabase project is active
- Check Supabase URL is correct (no typos)
- Ensure service role key has database access

### "401 Unauthorized" on API calls
- Verify RLS policies in Supabase (should allow all for now)
- Check service role key has admin permissions

### Login always fails
- Verify `ADMIN_PASSWORD` environment variable is set
- Try default password: `036324`
- Check browser console for error messages

## Customization

### Change Admin Password

Update `ADMIN_PASSWORD` environment variable in Vercel dashboard.

### Add New Data Fields

1. Add column to `sql/schema.sql`
2. Add to `ALLOWED_COLS` in `api/index.js`
3. Add input field in spreadsheet modal in `public/index.html`
4. Redeploy

### Modify Styling

Edit CSS in `<style>` tag in `public/index.html` (uses Tailwind CSS)

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Next Steps

1. ✅ Deploy the app
2. 📊 Add your channel data via the spreadsheet interface
3. 💰 Monitor revenue in the dashboard
4. 🔐 Change admin password for security
5. 📱 Share the app URL with your team
