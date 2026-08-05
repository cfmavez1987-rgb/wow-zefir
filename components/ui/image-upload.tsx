"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Icon } from "./icon";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError("");
      setUploading(true);

      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        if (value.length + newUrls.length >= maxFiles) {
          setError(`Максимум ${maxFiles} фотографий`);
          break;
        }

        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Ошибка загрузки");
          }

          const data = await res.json();
          newUrls.push(data.url);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Ошибка загрузки файла");
        }
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls]);
      }

      setUploading(false);
    },
    [value, onChange, maxFiles]
  );

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleUpload(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square bg-neutral-100 rounded-xl overflow-hidden group"
            >
              <Image
                src={url}
                alt={`Фото ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 text-neutral-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error hover:text-white"
              >
                <Icon name="close" size={16} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-caption rounded">
                  Главная
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {value.length < maxFiles && (
        <div
          className={[
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            dragActive
              ? "border-primary bg-primary-light"
              : "border-neutral-200 hover:border-primary",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-body-sm text-neutral-600">Загрузка...</p>
            </div>
          ) : (
            <>
              <Icon
                name="gift"
                size={48}
                className="mx-auto text-neutral-300 mb-4"
              />
              <p className="text-body text-neutral-600 mb-2">
                Перетащите фотографии сюда или нажмите для загрузки
              </p>
              <p className="text-caption text-neutral-400 mb-4">
                PNG, JPG, WebP до 5MB
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-body-sm">
                <Icon name="gift" size={16} />
                Выбрать файлы
              </div>
            </>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-body-sm text-error">{error}</p>
      )}

      {/* Info */}
      <p className="text-caption text-neutral-400">
        Загружено {value.length} из {maxFiles} фотографий
      </p>
    </div>
  );
}
