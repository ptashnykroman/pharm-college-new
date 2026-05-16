import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 w-full h-[104px] bg-gradient-primary" />

      <div className="container relative mx-auto px-4 pb-20 pt-36 md:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-white p-4 sm:p-10 text-center shadow-card">
          <div className="text-5xl sm:text-6xl font-black text-primary">
            404
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold">
            Сторінку не знайдено
          </h1>
          <p className="mt-4 text-muted-foreground">
            Можливо, адресу введено з помилкою або сторінку вже переміщено.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-bounce hover:scale-[1.02]"
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}
