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
          <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-accent-gold/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.id} className="text-center">
                <div className="text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
                  {item.value}
                </div>
                <div className="mt-2 text-xs text-primary-foreground/80 sm:text-sm">
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
