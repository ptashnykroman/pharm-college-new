import { cn } from "@/lib/utils";
import { AdministrationCard } from "./administration-card";
import type { AdministrationCardViewModel } from "@/widgets/personnel/model";

export function AdministrationPageView({
  people,
}: {
  people: AdministrationCardViewModel[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary),0.2)] to-transparent" />
      <div className="absolute left-0 top-20 h-64 w-64 rounded-full bg-[rgba(var(--primary-glow),0.1)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[rgba(var(--accent-gold),0.1)] blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">
            Адміністрація
          </h1>
        </div>

        <div
          className={cn("mt-10 grid gap-6", "sm:grid-cols-2 xl:grid-cols-4")}
        >
          {people.map((person) => (
            <AdministrationCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
