import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET_NAME = "product-images";

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseKey) {
      // Fallback: use local storage for development
      return await handleLocalUpload(request);
    }

    // Use Supabase Storage
    const supabase = createClient(supabaseUrl, supabaseKey);
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не найден" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Допустимые форматы: JPG, PNG, WebP` },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Максимальный размер файла: 5MB` },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop() || "jpg";
    const filename = `${timestamp}-${randomString}.${extension}`;

    // Upload to Supabase Storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json(
        { error: `Ошибка загрузки: ${error.message}` },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return NextResponse.json({
      url: urlData.publicUrl,
      filename,
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Ошибка загрузки файла";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// Local storage fallback for development
async function handleLocalUpload(request: Request) {
  const { writeFile, mkdir, access } = await import("fs/promises");
  const { join } = await import("path");

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "Файл не найден" },
      { status: 400 }
    );
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Допустимые форматы: JPG, PNG, WebP` },
      { status: 400 }
    );
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `Максимальный размер файла: 5MB` },
      { status: 400 }
    );
  }

  // Create unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split(".").pop() || "jpg";
  const filename = `${timestamp}-${randomString}.${extension}`;

  // Ensure directory exists
  const uploadDir = join(process.cwd(), "public", "images", "products");
  try {
    await access(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }

  // Save file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = join(uploadDir, filename);
  await writeFile(filePath, buffer);

  const url = `/images/products/${filename}`;

  return NextResponse.json({ url, filename, success: true });
}
