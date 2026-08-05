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
    // Fallback to static data
    const { products } = await import("@/data/products");
    const { reviews } = await import("@/data/reviews");
    return NextResponse.json({
      totalProducts: products.length,
      hitProducts: products.filter((p) => p.isHit).length,
      newProducts: products.filter((p) => p.isNew).length,
      totalReviews: reviews.length,
    });
  }

  try {
    // Count products
    const { count: totalProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: hitProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_hit", true);

    const { count: newProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_new", true);

    // Count reviews
    const { count: totalReviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      totalProducts: totalProducts || 0,
      hitProducts: hitProducts || 0,
      newProducts: newProducts || 0,
      totalReviews: totalReviews || 0,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({
      totalProducts: 0,
      hitProducts: 0,
      newProducts: 0,
      totalReviews: 0,
    });
  }
}
