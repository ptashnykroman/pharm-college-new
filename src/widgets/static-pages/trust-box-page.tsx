import Link from 'next/link'

import { MessageForm } from '@/widgets/static-pages/message-form'
import { TRUST_BOX_MESSAGE_FORM } from '@/widgets/static-pages/message-form-config'

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
      'Уповноваженою особою із питань запобігання та виявлення корупції у коледжі визначено відповідального працівника.',
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
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-black text-foreground text-2xl sm:text-3xl lg:text-4xl">Скринька довіри</h1>
        </div>

        <div className="mt-10 grid gap-6">
          {TRUST_BOX_SECTIONS.map((section) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white p-6 shadow-card md:p-8"
            >
              <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-[rgba(var(--foreground),0.8)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link
                href={section.href}
                className="mt-5 inline-flex text-sm font-bold text-primary underline-offset-4 hover:underline"
              >
                {section.hrefLabel}
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10">
          <MessageForm {...TRUST_BOX_MESSAGE_FORM} />
        </div>
      </div>
    </section>
  )
}
