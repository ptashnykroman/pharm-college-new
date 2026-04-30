import Link from 'next/link'

import { MessageForm } from '@/widgets/static-pages/message-form'

const TRUST_BOX_SECTIONS = [
  {
    title: 'Безпечне освітнє середовище',
    body: [
      'Запорукою безпечного освітнього середовища в коледжі є ефективне психологічне забезпечення освітнього процесу.',
      'Про факти дискримінації, неетичного ставлення чи конфліктних ситуацій можна повідомити, надіславши звернення через форму нижче або на адресу kravchynska.liudmyla@pharm.zt.ua.',
      'Детальніше про запобігання булінгу можна дізнатися на відповідній сторінці освітнього процесу.',
    ],
    href: '/osvitniy-process/zapobigannya-bulingu',
    hrefLabel: 'Перейти до матеріалів про запобігання булінгу',
  },
  {
    title: 'Запобігання корупції',
    body: [
      "Уповноваженою особою із питань запобігання та виявлення корупції у коледжі визначено відповідального працівника.",
      'Відомі вам факти порушення антикорупційного законодавства можна повідомити електронним листом, поштовим зверненням або через довірчу форму нижче.',
    ],
    href: '/pro-zhbphc/kontakty',
    hrefLabel: 'Контакти для офіційного звернення',
  },
  {
    title: 'Академічна доброчесність',
    body: [
      'У коледжі діє комісія з питань етики та академічної доброчесності.',
      'Якщо вам стали відомі факти порушення академічної доброчесності учасниками освітнього процесу, ви можете анонімно повідомити про це через форму нижче.',
    ],
    href: '/for-students/academic-integrity',
    hrefLabel: 'Ознайомитися з матеріалами про академічну доброчесність',
  },
] as const

export function TrustBoxPageView() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-gold/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Конфіденційно
          </span>
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Скринька довіри</h1>
          <p className="mt-5 text-lg leading-8 text-foreground/75">
            Сторінка для безпечних звернень щодо освітнього середовища, академічної доброчесності та інших чутливих питань.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {TRUST_BOX_SECTIONS.map((section) => (
            <article key={section.title} className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-card md:p-8">
              <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-foreground/80">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link href={section.href} className="mt-5 inline-flex text-sm font-bold text-primary underline-offset-4 hover:underline">
                {section.hrefLabel}
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <MessageForm
            title="Анонімне звернення"
            description="Форма дозволяє передати повідомлення без додаткових контактних полів. Якщо хочете отримати відповідь, скористайтеся сторінкою зворотного зв'язку або контактами коледжу."
            submitLabel="Надіслати анонімне звернення"
            variant="anonymous"
            defaultSubject="Анонімне звернення"
          />
        </div>
      </div>
    </section>
  )
}
