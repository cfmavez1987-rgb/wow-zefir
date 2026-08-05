import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ProductRow {
  id: string;
  slug: string;
  name_ru: string;
  name_kk: string;
  description_ru: string;
  description_kk: string;
  price: number;
  sizes: {
    small?: { price: number };
    medium?: { price: number };
    large?: { price: number };
  };
  colors: string[];
  category: "popular" | "new" | "gifts";
  tags: string[];
  images: string[];
  is_hit: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewRow {
  id: string;
  name_ru: string;
  name_kk: string;
  text_ru: string;
  text_kk: string;
  rating: number;
  date: string;
  created_at: string;
}
