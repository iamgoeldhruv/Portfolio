type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="sec-label">{eyebrow}</div>
      <h2 className="sec-title grotesk">{title}</h2>
      <p className="sec-sub">{description}</p>
    </div>
  );
}
