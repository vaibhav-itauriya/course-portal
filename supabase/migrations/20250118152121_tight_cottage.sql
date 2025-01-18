/*
  # Create courses table and setup security

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `code` (text, required)
      - `credits` (integer, required)
      - `timings` (text, required)
      - `description` (text, required)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on courses table
    - Add policies for:
      - Users can read their own courses
      - Users can insert their own courses
      - Users can update their own courses
      - Users can delete their own courses
*/

CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  credits integer NOT NULL,
  timings text NOT NULL,
  description text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own courses"
  ON courses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own courses"
  ON courses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own courses"
  ON courses
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own courses"
  ON courses
  FOR DELETE
  USING (auth.uid() = user_id);