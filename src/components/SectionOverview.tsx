import { Link } from "@tanstack/react-router";

type SectionOverviewProps = {
  title: string;
  children: React.ReactNode;
};

const SectionOverview = ({ title, children }: SectionOverviewProps) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold pb-2">{title}</h3>
        <Link to="/" className="text-primary underline">
          View All
        </Link>
      </div>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </section>
  );
};

export default SectionOverview;
