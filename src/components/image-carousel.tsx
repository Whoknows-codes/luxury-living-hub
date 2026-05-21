import { useState, useRef, type TouchEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  alt: string;
  className?: string;
  rounded?: boolean;
}

export function ImageCarousel({ images, alt, className, rounded }: Props) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setIndex((i) => Math.min(i + 1, images.length - 1));
      else setIndex((i) => Math.max(i - 1, 0));
    }
    startX.current = null;
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted",
        rounded && "rounded-2xl",
        className,
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} – photo ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full shrink-0 object-cover"
            draggable={false}
          />
        ))}
      </div>

      {/* Click zones for desktop */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIndex((i) => Math.max(i - 1, 0));
        }}
        className="absolute inset-y-0 left-0 hidden w-1/3 cursor-w-resize md:block"
      />
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIndex((i) => Math.min(i + 1, images.length - 1));
        }}
        className="absolute inset-y-0 right-0 hidden w-1/3 cursor-e-resize md:block"
      />

      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full bg-white/50 transition-all",
                i === index ? "w-5 bg-white" : "w-1.5",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
