type Props = {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, action }: Props) {
  return (
    <div className="flex items-end justify-between gap-4 px-5 mb-4">
      <div>
        {eyebrow && (
          <div className="text-[10px] tracking-[0.32em] uppercase text-gold/80 mb-1">
            {eyebrow}
          </div>
        )}
        <h2 className="font-serif text-2xl leading-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}