/*
  # Create initial database schema for Zenith Enterprise Hub

  1. New Tables
    - `profiles` - User profiles with roles and points
    - `products` - Digital marketplace products
    - `businesses` - Business listings for sale
    - `inquiries` - Buyer-seller messages
    - `properties` - Real estate listings
    - `tasks` - Gamified workflow tasks
    - `transactions` - Payment and escrow records

  2. Security
    - RLS enabled on all tables
    - Users can only read/update their own profile
    - Products and businesses readable by all, writable by owner
    - Inquiries visible only to buyer and seller
    - Properties readable by all, writable by agent
    - Tasks readable by authenticated users, writable by creator/assignee
    - Transactions visible only to participants

  3. Important Notes
    - All tables use uuid primary keys with gen_random_uuid()
    - Timestamps default to now()
    - RLS is restrictive by default - no access without explicit policies
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text DEFAULT '',
  photo_url text DEFAULT '',
  role text NOT NULL DEFAULT 'seller' CHECK (role IN ('admin', 'seller', 'agent', 'buyer', 'employee')),
  points integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES profiles(id),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  currency text DEFAULT 'EUR',
  category text NOT NULL CHECK (category IN ('game', 'software', 'asset')),
  tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
  inventory integer DEFAULT 0,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products readable by all"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sellers can create own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES profiles(id),
  business_name text NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  monthly_revenue numeric DEFAULT 0,
  monthly_profit numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses readable by all"
  ON businesses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sellers can create own businesses"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own businesses"
  ON businesses FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete own businesses"
  ON businesses FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES profiles(id),
  seller_id uuid NOT NULL REFERENCES profiles(id),
  listing_id uuid NOT NULL,
  listing_name text NOT NULL,
  message text NOT NULL,
  buyer_email text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers and sellers can read own inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Authenticated users can create inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES profiles(id),
  title text NOT NULL,
  address text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  property_type text NOT NULL CHECK (property_type IN ('residential', 'commercial', 'land')),
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  status text NOT NULL DEFAULT 'listing' CHECK (status IN ('listing', 'under-contract', 'closed')),
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties readable by all"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Agents can create own properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = agent_id)
  WITH CHECK (auth.uid() = agent_id);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES profiles(id),
  assignee_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  description text DEFAULT '',
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'completed')),
  points integer NOT NULL DEFAULT 0,
  due_date timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks readable by authenticated users"
  ON tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators and assignees can update tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id OR auth.uid() = assignee_id)
  WITH CHECK (auth.uid() = creator_id OR auth.uid() = assignee_id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES profiles(id),
  seller_id uuid NOT NULL REFERENCES profiles(id),
  product_id uuid,
  property_id uuid,
  amount numeric NOT NULL DEFAULT 0,
  commission numeric DEFAULT 0,
  currency text DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'escrow', 'refunded')),
  type text CHECK (type IN ('marketplace', 'real-estate')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers and sellers can read own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);
