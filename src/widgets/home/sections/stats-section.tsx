import type { HomePageViewModel } from "@/widgets/home/model";

export function StatsSection({
  stats,
}: {
  stats: HomePageViewModel["stats"];
}) {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-stats p-8 shadow-elegant md:p-12">
          <div className="glow-orb glow-gold-15 absolute -right-10 -top-20 h-72 w-72" />
          <div className="glow-orb glow-primary-30 absolute -bottom-24 -left-10 h-72 w-72" />
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.id} className="text-center">
                <div className="text-3xl font-black text-primary-foreground sm:text-4xl lg:text-5xl">
                  {item.value}
                </div>
                <div className="mt-2 text-xs text-[rgba(var(--primary-foreground),0.8)] sm:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
