type FeatureCardProps = {
  image: string;
  title: string;
  description: string;
};

export function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="max-w-[400px] bg-card rounded-xl border border-muted hover:shadow-lg transition-all overflow-hidden">
      <div className="w-full h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
