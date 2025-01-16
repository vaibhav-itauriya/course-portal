export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  description: string;
  image_url: string;
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
}