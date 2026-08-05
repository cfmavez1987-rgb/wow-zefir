import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const body = await request.json();

  const slug = body.nameRu
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const product = {
    slug,
    name_ru: body.nameRu,
    name_kk: body.nameKk,
    description_ru: body.descriptionRu,
    description_kk: body.descriptionKk,
    price: body.price,
    sizes: body.sizes || {},
    colors: body.colors || [],
    category: body.category || "popular",
    tags: body.tags || [],
    images: body.images || [],
    is_hit: body.isHit || false,
    is_new: body.isNew || false,
  };

  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
