import { MessageForm } from '@/widgets/static-pages/message-form'

export function FeedbackPageView() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Зворотний зв’язок
          </span>
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Зворотний зв’язок</h1>
          <p className="mt-5 text-lg leading-8 text-foreground/75">
            Поділіться відгуком, запитанням або пропозицією. Форма надсилає повідомлення напряму на поштовий сервіс коледжу.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <MessageForm
            title="Надіслати звернення"
            description="Вкажіть контактні дані, щоб ми могли відповісти вам у зручний спосіб."
            submitLabel="Надіслати звернення"
            variant="contact"
            defaultSubject="Загальне питання"
            subjectOptions={['Загальне питання', 'Питання до адміністрації', 'Питання про вступ']}
          />
        </div>
      </div>
    </section>
  )
}
