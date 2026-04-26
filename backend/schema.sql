-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role         VARCHAR(20) DEFAULT 'Viewer',
  status       VARCHAR(20) DEFAULT 'Active',
  joined       DATE DEFAULT CURRENT_DATE,
  last_login   TIMESTAMP
);

-- Visa applications
CREATE TABLE IF NOT EXISTS applications (
  id          SERIAL PRIMARY KEY,
  full_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  phone       VARCHAR(30),
  visa_type   VARCHAR(100) NOT NULL,
  nationality VARCHAR(100),
  message     TEXT,
  status      VARCHAR(30) DEFAULT 'Pending',
  notes       TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Payments / transactions
CREATE TABLE IF NOT EXISTS payments (
  id             SERIAL PRIMARY KEY,
  user_name      VARCHAR(100) NOT NULL,
  service        VARCHAR(150) NOT NULL,
  amount         NUMERIC(10,2) NOT NULL,
  currency       VARCHAR(10) DEFAULT 'KES',
  method         VARCHAR(30) DEFAULT 'Manual',
  phone          VARCHAR(30),
  transaction_id VARCHAR(100),
  checkout_request_id VARCHAR(100),
  status         VARCHAR(30) DEFAULT 'Pending',
  date           DATE DEFAULT CURRENT_DATE
);

-- Migration for existing installs
ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'KES';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS method VARCHAR(30) DEFAULT 'Manual';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(100);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS checkout_request_id VARCHAR(100);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id         SERIAL PRIMARY KEY,
  message    TEXT NOT NULL,
  read       BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Logs
CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL PRIMARY KEY,
  level      VARCHAR(10) DEFAULT 'INFO',
  source     VARCHAR(50),
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  phone      VARCHAR(30),
  subject    VARCHAR(200),
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
