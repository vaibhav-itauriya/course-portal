/*
  # Create courses table and security policies

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `code` (text, required)
      - `credits` (integer, required)
      - `description` (text)
      - `image_url` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on courses table
    - Add policies for:
      - Select: Allow anyone to read all courses
      - Insert: Allow authenticated users to create courses
      - Update: Allow users to update their own courses
      - Delete: Allow users to delete their own courses
*/

CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  credits integer NOT NULL,
  description text,
  image_url text,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);