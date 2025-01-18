export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  timings: string;
  description: string;
  created_at: string;
  user_id: string;
}