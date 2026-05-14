import { Mail, MapPin, Phone } from 'lucide-react'

import { MessageForm } from '@/widgets/static-pages/message-form'
import type { AdministrationCardViewModel } from '@/widgets/personnel/model'
import { normalizePhone } from '@/widgets/page/cms-page/lib'

const CONTACT_TOPICS = ['Загальне питання', 'Питання до адміністрації', 'Питання про вступ']

function ContactCard({ person }: { person: AdministrationCardViewModel }) {
  return (
    <article className="rounded-[1.5rem] border border-[rgba(var(--border),0.7)] bg-white p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {person.position || 'Контактна особа'}
      </p>
      <h3 className="mt-3 text-xl font-black text-foreground">{person.name}</h3>

      <div className="mt-4 space-y-3 text-sm text-[rgba(var(--foreground),0.8)]">
        {person.phone ? (
          <a href={`tel:${normalizePhone(person.phone)}`} className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4" />
            <span>{person.phone}</span>
          </a>
        ) : null}

        {person.email ? (
          <a href={`mailto:${person.email}`} className="flex items-center gap-2 break-all hover:text-primary">
            <Mail className="h-4 w-4" />
            <span>{person.email}</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}

export function ContactsPageView({ people }: { people: AdministrationCardViewModel[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-divider" />
      <div className="glow-orb glow-primary-10 absolute left-0 top-20 h-64 w-64" />
      <div className="glow-orb glow-gold-10 absolute bottom-0 right-0 h-72 w-72" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[rgba(var(--primary),0.15)] bg-[rgba(255,255,255,0.8)] px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-soft">
            Комунікація
          </span>
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">Контакти</h1>
          <p className="mt-5 text-lg leading-8 text-[rgba(var(--foreground),0.75)]">
            Контактні дані адміністрації, карта та форма для швидкого звернення до коледжу.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white p-6 shadow-card md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    <MapPin className="h-4 w-4" />
                    Основна адреса
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-foreground">
                    Житомирський базовий фармацевтичний фаховий коледж
                  </h2>
                  <div className="mt-4 space-y-2 text-base leading-7 text-[rgba(var(--foreground),0.8)]">
                    <p>10005, м. Житомир, вул. Чуднівська, 99</p>
                    <p>
                      <a href="tel:+380412242547" className="hover:text-primary">
                        (0412) 24-25-47
                      </a>
                    </p>
                    <p>
                      <a href="mailto:college@pharm.zt.ua" className="hover:text-primary">
                        college@pharm.zt.ua
                      </a>
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[rgba(var(--primary),0.15)] bg-[rgba(var(--primary),0.05)] px-5 py-4 text-sm leading-7 text-[rgba(var(--foreground),0.75)]">
                  Приймальня відповідає на загальні звернення, питання щодо вступу та комунікацію з адміністрацією.
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[rgba(var(--border),0.7)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.243123431151!2d28.64189402690805!3d50.245541009318345!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c648aed44e5cf%3A0x8c8080cc023799b!2z0JbQuNGC0L7QvNC40YDRgdC60LjQuSDQkdCw0LfQvtCy0YvQuSDQpNCw0YDQvNCw0YbQtdCy0YLQuNGH0LXRgdC60LjQuSDQmtC-0LvQu9C10LTQtiDQuNC8LiDQky7QoS7Qn9GA0L7RgtCw0YHQtdCy0LjRh9Cw!5e0!3m2!1sru!2sua!4v1545820629782"
                  title="Контакти коледжу"
                  className="h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {people.map((person) => (
                <ContactCard key={person.id} person={person} />
              ))}
            </div>
          </div>

          <MessageForm
            title="Поставити запитання"
            submitLabel="Надіслати повідомлення"
            variant="contact"
            subjectOptions={CONTACT_TOPICS}
          />
        </div>
      </div>
    </section>
  )
}
