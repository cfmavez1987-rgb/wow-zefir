interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={[
        "mb-8 sm:mb-12",
        centered ? "text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="font-display text-display sm:text-display-lg font-bold text-neutral-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
