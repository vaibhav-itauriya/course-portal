export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          name: string;
          code: string;
          credits: number;
          description: string | null;
          image_url: string | null;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          credits: number;
          description?: string | null;
          image_url?: string | null;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          credits?: number;
          description?: string | null;
          image_url?: string | null;
          user_id?: string;
          created_at?: string;
        };
      };
    };
  };
}