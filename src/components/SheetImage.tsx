import { GraduationCap, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetImageProps {
  src: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  variant?: "university" | "blog";
  priority?: boolean;
}

export function SheetImage({
  src,
  alt,
  className,
  containerClassName,
  variant = "university",
  priority = false,
}: SheetImageProps) {
  const PlaceholderIcon = variant === "blog" ? ImageIcon : GraduationCap;

  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-bg-light text-text-muted",
          containerClassName,
          className
        )}
        aria-hidden
      >
        <PlaceholderIcon className="h-10 w-10 opacity-40" />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden bg-white", containerClassName)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
