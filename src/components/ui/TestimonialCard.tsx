import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title?: string;
  avatarSrc: string;
}

export function TestimonialCard({ quote, name, title, avatarSrc }: TestimonialCardProps) {
  return (
    <div className="bg-card-white p-8 rounded-[16px] shadow-soft border border-border text-left h-full flex flex-col">
      <div className="text-accent text-5xl font-serif mb-4 leading-none">“</div>
      <p className="text-text-dark text-base mb-8 flex-grow leading-relaxed">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
          <Image src={avatarSrc} alt={name} fill className="object-cover" />
        </div>
        <div>
          <div className="font-semibold text-text-dark text-sm">{name}</div>
          {title && <div className="text-xs text-text-muted">{title}</div>}
        </div>
      </div>
    </div>
  );
}
