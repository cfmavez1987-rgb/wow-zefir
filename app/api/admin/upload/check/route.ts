import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      configured: false,
      error: "Переменные окружения не настроены",
      missing: {
        url: !supabaseUrl,
        key: !supabaseKey,
      },
    });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check bucket
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
      return NextResponse.json({
        configured: true,
        connected: false,
        error: `Ошибка подключения: ${error.message}`,
      });
    }

    const bucketExists = buckets?.some((b) => b.name === "product-images");

    return NextResponse.json({
      configured: true,
      connected: true,
      bucketExists,
      buckets: buckets?.map((b) => b.name) || [],
    });
  } catch (error) {
    return NextResponse.json({
      configured: true,
      connected: false,
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  }
}
