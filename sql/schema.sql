-- ============================================================
-- WALLET DASHBOARD — Database Schema
-- Supabase PostgreSQL Schema for Wallet & Inventory Management
-- ============================================================

-- Create ads_management table (Wallet/Inventory)
CREATE TABLE IF NOT EXISTS ads_management (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  channel_name TEXT,
  telegram_link TEXT,
  logo_url TEXT,
  address TEXT,
  
  -- Ads Slot 1
  ads1 TEXT,
  ads1_fees NUMERIC DEFAULT 0,
  ads1_duration TEXT,
  ads1_posts TEXT,
  
  -- Ads Slot 2
  ads2 TEXT,
  ads2_fees NUMERIC DEFAULT 0,
  ads2_duration TEXT,
  ads2_posts TEXT,
  
  -- Ads Slot 3
  ads3 TEXT,
  ads3_fees NUMERIC DEFAULT 0,
  ads3_duration TEXT,
  ads3_posts TEXT,
  
  -- Ads Slot 4
  ads4 TEXT,
  ads4_fees NUMERIC DEFAULT 0,
  ads4_duration TEXT,
  ads4_posts TEXT,
  
  -- Payment & Metadata
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ads_management_updated_at ON ads_management(updated_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE ads_management ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to read
CREATE POLICY "Allow read for authenticated users" ON ads_management
  FOR SELECT USING (true);

-- Create a policy that allows all authenticated users to insert
CREATE POLICY "Allow insert for authenticated users" ON ads_management
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows all authenticated users to update
CREATE POLICY "Allow update for authenticated users" ON ads_management
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create a policy that allows all authenticated users to delete
CREATE POLICY "Allow delete for authenticated users" ON ads_management
  FOR DELETE USING (true);

-- Seed initial data (optional)
INSERT INTO ads_management (channel_name, telegram_link, logo_url, ads1, ads1_fees, payment_method)
VALUES 
  ('Channel 1', 'https://t.me/channel1', 'https://via.placeholder.com/150', 'Ad Package A', 50000, 'Bank Transfer'),
  ('Channel 2', 'https://t.me/channel2', 'https://via.placeholder.com/150', 'Ad Package B', 75000, 'Mobile Money'),
  ('Channel 3', 'https://t.me/channel3', 'https://via.placeholder.com/150', 'Ad Package C', 100000, 'Bank Transfer')
ON CONFLICT DO NOTHING;
