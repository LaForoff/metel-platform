type SectionPlaceholderProps = {
  title: string;
};

export function SectionPlaceholder({ title }: SectionPlaceholderProps) {
  return (
    <section className="grid min-w-0 flex-1 place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Раздел находится в разработке</p>
      </div>
    </section>
  );
}
