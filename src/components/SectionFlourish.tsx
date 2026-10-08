"use client";

interface SectionFlourishProps {
  color?: string;
  className?: string;
}

export default function SectionFlourish({
  color = "#FFA028",
  className = "",
}: SectionFlourishProps) {
  return (
    <div className={`flex items-center justify-center gap-2 my-2 select-none ${className}`}>
      <span style={{ color }} className="text-sm font-bold">
        &lt;
      </span>
      <div className="flex items-center gap-1">
        <span style={{ backgroundColor: color }} className="w-6 h-[1.5px] rounded-full" />
        <span style={{ backgroundColor: color }} className="w-1.5 h-1.5 rotate-45" />
        <span style={{ backgroundColor: color }} className="w-6 h-[1.5px] rounded-full" />
      </div>
      <span style={{ color }} className="text-sm font-bold">
        &gt;
      </span>
    </div>
  );
}
