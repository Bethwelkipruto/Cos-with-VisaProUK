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
  id        SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  service   VARCHAR(150) NOT NULL,
  amount    NUMERIC(10,2) NOT NULL,
  status    VARCHAR(30) DEFAULT 'Pending',
  date      DATE DEFAULT CURRENT_DATE
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
