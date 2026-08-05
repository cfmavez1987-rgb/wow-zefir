import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";

export async function GET() {
  return NextResponse.json({
    totalProducts: products.length,
    hitProducts: products.filter((p) => p.isHit).length,
    newProducts: products.filter((p) => p.isNew).length,
    totalReviews: reviews.length,
  });
}
