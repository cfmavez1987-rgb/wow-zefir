import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      configured: false,
      error: "Переменные окружения не настроены",
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

    const BUCKET_NAME = "product-images";
    const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

    if (!bucketExists) {
      // Auto-create bucket
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024,
      });

      if (createError) {
        return NextResponse.json({
          configured: true,
          connected: true,
          bucketExists: false,
          bucketCreated: false,
          error: `Не удалось создать бакет: ${createError.message}`,
          instruction: "Создайте бакет вручную: Supabase Dashboard -> Storage -> New Bucket -> название: product-images -> галочка Public bucket",
        });
      }

      return NextResponse.json({
        configured: true,
        connected: true,
        bucketExists: true,
        bucketCreated: true,
        message: "Бакет product-images создан автоматически!",
      });
    }

    return NextResponse.json({
      configured: true,
      connected: true,
      bucketExists: true,
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
