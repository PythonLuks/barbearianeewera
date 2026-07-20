-- Supabase Schema for Neew Era Barbershop

-- 1. Barbers Table
CREATE TABLE barbers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  rating TEXT,
  active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Business Settings (Store Hours)
-- Assuming a single row for global settings or one row per day of week (0 = Sunday, 1 = Monday...)
CREATE TABLE business_settings (
  day_of_week INTEGER PRIMARY KEY, -- 0 to 6
  is_open BOOLEAN DEFAULT true,
  open_time TIME,
  close_time TIME,
  lunch_start TIME,
  lunch_end TIME,
  slot_interval_minutes INTEGER DEFAULT 30
);

-- 3. Blocked Dates (Holidays, Vacations, etc.)
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Blocked Slots (Specific times blocked on specific days)
CREATE TABLE blocked_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time TIME NOT NULL,
  barber_id UUID REFERENCES barbers(id) ON DELETE CASCADE,
  reason TEXT,
  UNIQUE(date, time, barber_id)
);

-- 5. Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  barber_id UUID REFERENCES barbers(id),
  service_title TEXT NOT NULL,
  service_duration INTEGER NOT NULL,
  service_price TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'PENDENTE', -- PENDENTE, CONFIRMADO, CANCELADO
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Mock Data

INSERT INTO barbers (id, name, role, rating) VALUES 
('c1031b25-b825-4c07-9252-ecdb79461df2', 'Robson', 'Barbeiro Sênior', '5.0 ★'),
('2ed83b3f-1d48-43d9-95e2-638df4832596', 'Joaquim', 'Especialista em Degradê', '4.8 ★');

INSERT INTO business_settings (day_of_week, is_open, open_time, close_time, lunch_start, lunch_end, slot_interval_minutes) VALUES
(1, true, '09:00', '20:00', '12:00', '14:00', 30),
(2, true, '09:00', '20:00', '12:00', '14:00', 30),
(3, true, '09:00', '20:00', '12:00', '14:00', 30),
(4, true, '09:00', '20:00', '12:00', '14:00', 30),
(5, true, '09:00', '20:00', '12:00', '14:00', 30),
(6, true, '09:00', '20:00', '12:00', '14:00', 30),
(0, false, null, null, null, null, 30);
