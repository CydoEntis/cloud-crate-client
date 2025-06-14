type SectionOverviewProps = {
  title: string;
  children: React.ReactNode;
};

const SectionOverview = ({ title, children }: SectionOverviewProps) => {
  return (
    <section>
      <h3 className="text-xl font-semibold pb-2">{title}</h3>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </section>
  );
};

export default SectionOverview;
