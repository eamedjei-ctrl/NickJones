-- Create tables in Supabase

-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Driver', 'Operator', 'Administrator'))
);

-- Requests table
CREATE TABLE requests (
  id TEXT PRIMARY KEY,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  user_id TEXT REFERENCES users(id)
);

-- Earnings table
CREATE TABLE earnings (
  id TEXT PRIMARY KEY,
  distance DECIMAL NOT NULL,
  fuel_cost DECIMAL NOT NULL,
  estimated_earnings DECIMAL NOT NULL,
  request_id TEXT REFERENCES requests(id)
);

-- Insert initial data
INSERT INTO users (id, name, email, role) VALUES
  ('u1', 'Eli Martinez', 'eli@towprecision.com', 'Driver'),
  ('u2', 'Sara Malik', 'sara@towprecision.com', 'Operator'),
  ('u3', 'Alex Chen', 'alex@towprecision.com', 'Administrator');

INSERT INTO requests (id, pickup_location, destination, status, user_id) VALUES
  ('r1', '123 Main St', '456 Oak Ave', 'Completed', 'u1');

INSERT INTO earnings (id, distance, fuel_cost, estimated_earnings, request_id) VALUES
  ('t1', 12.5, 15.00, 45.00, 'r1');