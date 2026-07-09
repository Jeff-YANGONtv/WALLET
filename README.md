# Wallet Dashboard App

A clean, standalone web application for managing wallet, revenue tracking, and inventory data. Extracted from the JB Hub PWA with all chat features removed.

## Features

- **Dashboard Overview**: Real-time wallet summary and total revenue calculation
- **Channel Inventory**: Browse and manage channels with pagination
- **Revenue History**: Track revenue changes over time
- **Data Management**: Spreadsheet-like interface for adding, editing, and deleting records
- **Admin Authentication**: Password-protected dashboard access
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
wallet-dashboard/
├── public/
│   └── index.html          # Frontend SPA (no build step needed)
├── api/
│   └── index.js            # Vercel serverless API endpoints
├── sql/
│   └── schema.sql          # Database schema for Supabase
├── package.json            # Dependencies
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## Setup Instructions

### 1. Prerequisites

- Supabase account (https://supabase.com)
- Vercel account (https://vercel.com)
- Node.js 18+ (for local development)

### 2. Database Setup

1. Create a new Supabase project
2. Go to SQL Editor and run the schema from `sql/schema.sql`
3. Copy your Supabase URL and Service Role Key

### 3. Environment Variables

Create a `.env.local` file in the project root:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=your_secure_password
```

### 4. Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and login with your admin password.

### 5. Deploy to Vercel

1. Push code to GitHub
2. Go to Vercel and import the repository
3. Set environment variables in Vercel dashboard
4. Deploy

## API Endpoints

### GET `/api/ads`
Fetch all channels/ads records

**Response:**
```json
[
  {
    "id": 1,
    "channel_name": "Channel 1",
    "telegram_link": "https://t.me/channel1",
    "ads1": "Ad Package A",
    "ads1_fees": 50000,
    ...
  }
]
```

### GET `/api/wallet-summary`
Get total revenue and channel count

**Response:**
```json
{
  "total": 225000,
  "count": 3
}
```

### GET `/api/wallet-history`
Get revenue history sorted by date

**Response:**
```json
[
  {
    "id": 1,
    "channel_name": "Channel 1",
    "ads1_fees": 50000,
    "ads2_fees": 0,
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

### POST `/api/update-cell`
Update a single cell value

**Request:**
```json
{
  "id": 1,
  "column": "ads1_fees",
  "value": 75000
}
```

**Response:**
```json
{
  "ok": true,
  "row": { ... updated record ... }
}
```

### POST `/api/add-row`
Add a new channel record

**Response:**
```json
{
  "id": 4,
  "channel_name": "New Channel",
  ...
}
```

### DELETE `/api/delete-row/:id`
Delete a channel record

**Response:**
```json
{
  "ok": true
}
```

### POST `/api/admin-auth`
Authenticate admin user

**Request:**
```json
{
  "password": "your_admin_password"
}
```

**Response:**
```json
{
  "ok": true
}
```

## Database Schema

### ads_management Table

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key (auto-increment) |
| channel_name | TEXT | Channel/business name |
| telegram_link | TEXT | Telegram channel URL |
| logo_url | TEXT | Logo image URL |
| address | TEXT | Physical address |
| ads1-4 | TEXT | Ad package names |
| ads1_fees-4 | NUMERIC | Revenue per ad slot |
| ads1_duration-4 | TEXT | Ad duration |
| ads1_posts-4 | TEXT | Post links |
| payment_method | TEXT | Payment method |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

## Configuration

### Admin Password

Default password: `036324`

Change via environment variable `ADMIN_PASSWORD`

### Supabase RLS Policies

The schema includes Row Level Security (RLS) policies that allow:
- All authenticated users to read, insert, update, and delete records
- Modify policies in Supabase dashboard as needed

## Troubleshooting

### API Connection Error
- Verify Supabase URL and keys are correct
- Check that CORS is enabled in Vercel/API settings
- Ensure Supabase project is active

### Login Failed
- Check admin password is correct
- Verify `/api/admin-auth` endpoint is working
- Check browser console for errors

### Data Not Saving
- Verify Supabase connection
- Check RLS policies in Supabase dashboard
- Ensure column names match allowed list in `api/index.js`

## License

MIT

## Support

For issues or questions, please check the Supabase and Vercel documentation.
