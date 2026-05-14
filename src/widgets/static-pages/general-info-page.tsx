import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'

import type { AdministrationCardViewModel } from '@/widgets/personnel/model'

const GENERAL_INFO_ROWS = [
  {
    field: '22 Health',
    subject: '226 Pharmacy, Industrial Pharmacy',
    program: 'Pharmacy',
    educationBackground: (
      <>
        <a
          href="https://drive.google.com/file/d/1npa0f3KYWGm-639hG4Gm-1vywLYDC6Bo/view"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          I (baccalaureate)
        </a>
      </>
    ),
    studyForm: 'Intramural (on the basis of complete general secondary education)',
    term: '3 years',
  },
  {
    field: '22 Health',
    subject: '226 Pharmacy, Industrial Pharmacy',
    program: 'Pharmacy',
    educationBackground: (
      <>
        <a
          href="https://drive.google.com/file/d/1npa0f3KYWGm-639hG4Gm-1vywLYDC6Bo/view"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          I (baccalaureate)
        </a>
      </>
    ),
    studyForm: 'Extramural (on the basis of education qualification level junior specialist)',
    term: '2 years',
  },
  {
    field: '22 Health',
    subject: '226 Pharmacy, Industrial Pharmacy',
    program: 'Pharmacy',
    educationBackground: (
      <>
        <a
          href="https://drive.google.com/drive/folders/186VHbPxrtxX9XAQAyUTu9JhlVaob4ghj"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Junior specialist, Junior Bachelor
        </a>
      </>
    ),
    studyForm: 'Intramural (on the basis of basic general secondary education)',
    term: '3 years',
  },
  {
    field: '22 Health',
    subject: '226 Pharmacy, Industrial Pharmacy',
    program: 'Pharmacy',
    educationBackground: (
      <>
        <a
          href="https://drive.google.com/drive/folders/186VHbPxrtxX9XAQAyUTu9JhlVaob4ghj"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Junior specialist, Junior Bachelor
        </a>
      </>
    ),
    studyForm: 'Intramural (on the basis of complete secondary education)',
    term: '2 years',
  },
  {
    field: '22 Health',
    subject: '226 Pharmacy, Industrial Pharmacy',
    program: 'Pharmacy',
    educationBackground: (
      <>
        <a
          href="https://drive.google.com/drive/folders/186VHbPxrtxX9XAQAyUTu9JhlVaob4ghj"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Junior specialist, Junior Bachelor
        </a>
      </>
    ),
    studyForm: 'Extramural (on the basis of complete secondary education)',
    term: '2.5 years',
  },
  {
    field: '22 Health',
    subject: '224 Technologies of Medical Diagnostics and Treatment',
    program: 'Laboratory Diagnostics',
    educationBackground: 'Junior specialist',
    studyForm: 'Intramural (on the basis of basic general secondary education)',
    term: '3 years',
  },
  {
    field: '22 Health',
    subject: '224 Technologies of Medical Diagnostics and Treatment',
    program: 'Laboratory Diagnostics',
    educationBackground: 'Junior specialist',
    studyForm: 'Intramural (on the basis of complete secondary education)',
    term: '2 years',
  },
] as const

export function GeneralInfoPageView({ principal }: { principal: AdministrationCardViewModel | null }) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mt-5 text-3xl font-black text-foreground sm:text-4xl">General Information</h1>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6291.689037301852!2d28.64056024719695!3d50.244635952177546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c648aed44e5cf%3A0x8c8080cc023799b!2z0JbQuNGC0L7QvNC40YDRgdGM0LrQuNC5INCx0LDQt9C-0LLQuNC5INGE0LDRgNC80LDRhtC10LLRgtC40YfQvdC40Lkg0YTQsNGF0L7QstC40Lkg0LrQvtC70LXQtNC2INCW0LjRgtC-0LzQuNGA0YHRjNC60L7RlyDQvtCx0LvQsNGB0L3QvtGXINGA0LDQtNC4!5e0!3m2!1sru!2sua!4v1688215841222!5m2!1sru!2sua"
              title="Zhytomyr Basic Pharmaceutical Professional College map"
              className="min-h-[400px] h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid gap-6">
            <article className="rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white shadow-card p-4 md:p-6">
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="h-5 w-5" />
                <h2 className="text-xl font-black text-foreground">Correspondence Address</h2>
              </div>
              <div className="mt-2 text-base leading-7 text-[rgba(var(--foreground),0.8)]">
                <p>99 Chudnivska Street</p>
                <p>Zhytomyr, 10005</p>
                <p>Ukraine</p>
                <p className="pt-2">
                  <a href="tel:+380412242547" className="inline-flex items-center gap-2 hover:text-primary">
                    <Phone className="h-4 w-4" />
                    <span>(0412) 24-25-47</span>
                  </a>
                </p>
                <p>
                  <a href="mailto:college@pharm.zt.ua" className="inline-flex items-center gap-2 hover:text-primary">
                    <Mail className="h-4 w-4" />
                    <span>college@pharm.zt.ua</span>
                  </a>
                </p>
              </div>
            </article>

            <article className="rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white shadow-card p-4 md:p-6">
              <h2 className="text-xl font-black text-foreground">Principal</h2>
              {principal ? (
                <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                  <div className="overflow-hidden rounded-[1.5rem] bg-gradient-hero max-w-50 sm:w-40">
                    {principal.photo ? (
                      <Image
                        src={principal.photo.src}
                        alt={principal.photo.alt}
                        width={principal.photo.width}
                        height={principal.photo.height}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center text-4xl font-black text-white">
                        {principal.name
                          .split(' ')
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((item) => item[0]?.toUpperCase() ?? '')
                          .join('')}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-foreground">{principal.name}</h3>
                    {principal.position ? <p className="mt-2 text-base text-primary">{principal.position}</p> : null}
                    <div className="mt-4 space-y-3 text-sm text-[rgba(var(--foreground),0.8)]">
                      {principal.phone ? (
                        <a
                          href={`tel:${principal.phone}`}
                          className="inline-flex items-center gap-2 hover:text-primary"
                        >
                          <Phone className="h-4 w-4" />
                          <span>{principal.phone}</span>
                        </a>
                      ) : null}
                      {principal.email ? (
                        <a
                          href={`mailto:${principal.email}`}
                          className="flex items-center gap-2 break-all hover:text-primary"
                        >
                          <Mail className="h-4 w-4" />
                          <span>{principal.email}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-base leading-7 text-[rgba(var(--foreground),0.75)]">
                  Contact details of the principal are currently being updated.
                </p>
              )}
            </article>
          </div>
        </div>

        <div className="mt-10 rich-text">
          <div className="overflow-x-auto rich-text__table-wrap">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <th className="px-4 py-4 font-bold !text-white border-r border-white">Field of Expertise</th>
                  <th className="px-4 py-4 font-bold !text-white border-r border-white">Program Subject Area</th>
                  <th className="px-4 py-4 font-bold !text-white border-r border-white">Education Program</th>
                  <th className="px-4 py-4 font-bold !text-white border-r border-white">Educational Background</th>
                  <th className="px-4 py-4 font-bold !text-white border-r border-white">Form of Study</th>
                  <th className="px-4 py-4 font-bold !text-white">Term of Study</th>
                </tr>

                {GENERAL_INFO_ROWS.map((row, index) => (
                  <tr
                    key={`${row.program}-${row.term}-${index}`}
                    className="align-top text-sm leading-6 text-[rgba(var(--foreground),0.8)]"
                  >
                    <td className="px-4 py-4 font-semibold text-foreground">{row.field}</td>
                    <td className="px-4 py-4">{row.subject}</td>
                    <td className="px-4 py-4">{row.program}</td>
                    <td className="px-4 py-4">{row.educationBackground}</td>
                    <td className="px-4 py-4">{row.studyForm}</td>
                    <td className="px-4 py-4 font-semibold text-foreground">{row.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
