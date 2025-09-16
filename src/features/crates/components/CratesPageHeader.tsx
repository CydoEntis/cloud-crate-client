type CratesPageHeaderProps = {
  title?: string;
  description?: string;
};

function CratesPageHeader({
  title = "My Crates",
  description = "Manage your owned and joined crates.",
}: CratesPageHeaderProps) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="text-muted-foreground text-sm" role="doc-subtitle">
        {description}
      </p>
    </header>
  );
}

export default CratesPageHeader;
