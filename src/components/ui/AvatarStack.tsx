import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  avatars: string[];
  className?: string;
}

export function AvatarStack({ avatars, className }: AvatarStackProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {avatars.map((src, i) => (
        <div
          key={i}
          className={cn(
            "relative w-8 h-8 rounded-full border-2 border-bg-dark overflow-hidden",
            i !== 0 && "-ml-3"
          )}
        >
          <Image src={src} alt={`Avatar ${i + 1}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
