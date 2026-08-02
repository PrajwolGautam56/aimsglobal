"use client";

import { useId, useRef, useState } from "react";
import { ImageIcon, LoaderCircle, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder: "blogs" | "universities" | "brand";
  placeholder?: string;
};

export function ImageUploadField({
  name,
  label,
  defaultValue,
  folder,
  placeholder = "Cloudinary URL or local image path",
}: ImageUploadFieldProps) {
  const id = useId();
  const pickerRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFile(file: File) {
    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);

      const response = await fetch("/api/admin/uploads", { method: "POST", body });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Upload failed.");
      setValue(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (pickerRef.current) pickerRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor={`${id}-url`}>{label}</Label>
      <div className="grid gap-3 sm:grid-cols-[112px_1fr]">
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-bg-light">
          {value ? (
            // Admin previews can include local paths and newly uploaded Cloudinary URLs.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Selected media preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-7 w-7 text-text-muted" aria-hidden="true" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              id={`${id}-url`}
              name={name}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={placeholder}
            />
            <Button
              type="button"
              variant="outline"
              className="shrink-0"
              disabled={uploading}
              onClick={() => pickerRef.current?.click()}
            >
              {uploading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <UploadCloud className="h-4 w-4" aria-hidden="true" />
              )}
              {uploading ? "Uploading" : "Upload"}
            </Button>
          </div>
          <input
            ref={pickerRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void uploadFile(file);
            }}
          />
          <p className="text-xs text-text-muted">PNG, JPG, WebP, GIF, AVIF or SVG. Maximum 10 MB.</p>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
