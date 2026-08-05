import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { id } = await params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { id } = await params;
  const body = await request.json();

  const updates = {
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
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase не настроен" }, { status: 500 });
  }

  const { id } = await params;

  // First, get the product to find its images
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 404 });
  }

  // Delete images from Supabase storage
  if (product?.images && product.images.length > 0) {
    const BUCKET_NAME = "product-images";
    const filesToDelete: string[] = [];

    for (const imageUrl of product.images) {
      // Extract filename from URL
      // URL format: https://xxx.supabase.co/storage/v1/object/public/product-images/filename.jpg
      const urlParts = imageUrl.split("/");
      const filename = urlParts[urlParts.length - 1];
      if (filename) {
        filesToDelete.push(filename);
      }
    }

    if (filesToDelete.length > 0) {
      await supabase.storage.from(BUCKET_NAME).remove(filesToDelete);
    }
  }

  // Delete the product from database
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
