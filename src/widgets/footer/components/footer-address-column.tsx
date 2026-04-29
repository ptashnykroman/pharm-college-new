import Image from 'next/image'
import { MapPin } from 'lucide-react'

import ukraineMap from '@/shared/assets/icons/footer/ukraine-map.svg'

export function FooterAddressColumn({ addressHtml, mapUrl }: { addressHtml: string; mapUrl: string }) {
  return (
    <div>
      <div className="text-sm font-semibold uppercase tracking-wider text-accent-gold">Адреса</div>
      <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-accent-gold" />
          <div
            className="leading-6 !text-sm !text-primary-foreground/80 ![&>p]:my-1"
            dangerouslySetInnerHTML={{ __html: addressHtml }}
          />
        </li>

        {mapUrl ? (
          <li className="flex items-start gap-1">
            <Image src={ukraineMap} width={20} height={20} alt="map" />
            <a href={mapUrl} target="_blank" rel="noreferrer" className="transition-smooth hover:text-accent-gold">
              Відкрити на карті
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
