import { NextResponse } from "next/server";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
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
        { error: `Допустимые форматы: JPG, PNG, WebP. Получен: ${file.type}` },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Максимальный размер файла: 5MB. Размер файла: ${(file.size / 1024 / 1024).toFixed(2)}MB` },
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

    // Verify file was written
    try {
      await access(filePath);
    } catch {
      throw new Error("Не удалось сохранить файл");
    }

    // Return the URL
    const url = `/images/products/${filename}`;

    return NextResponse.json({ url, filename, success: true });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Ошибка загрузки файла";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
