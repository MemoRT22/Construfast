/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `nombre` (text, not null) - Name of the person sending the message
      - `email` (text, not null) - Email address of the sender
      - `telefono` (text) - Phone number (optional)
      - `mensaje` (text, not null) - Message content
      - `created_at` (timestamptz) - Timestamp when the message was created

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for anonymous users to insert messages (public contact form)
    - No select/update/delete policies for anonymous users (messages are private)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text DEFAULT '',
  mensaje text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (
    nombre IS NOT NULL AND
    email IS NOT NULL AND
    mensaje IS NOT NULL AND
    length(nombre) > 0 AND
    length(email) > 0 AND
    length(mensaje) > 0
  );
