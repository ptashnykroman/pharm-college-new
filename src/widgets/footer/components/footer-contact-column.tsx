import { Mail, Phone } from "lucide-react";

import type { FooterViewModel } from "@/widgets/footer/model";
import { normalizePhone } from "@/widgets/footer/components/normalize-phone";

export function FooterContactColumn({
  mainPhone,
  secondaryPhone,
  email,
}: Pick<FooterViewModel, "mainPhone" | "secondaryPhone" | "email">) {
  return (
    <div>
      <div className="text-sm font-semibold uppercase tracking-wider text-accent-gold">
        Контакти
      </div>
      <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
        <li className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-accent-gold" />
          <a href={`tel:${normalizePhone(mainPhone)}`} className="transition-smooth hover:text-accent-gold">
            {mainPhone}
          </a>
        </li>
        {secondaryPhone ? (
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent-gold" />
            <a
              href={`tel:${normalizePhone(secondaryPhone)}`}
              className="transition-smooth hover:text-accent-gold"
            >
              {secondaryPhone}
            </a>
          </li>
        ) : null}
        <li className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-accent-gold" />
          <a href={`mailto:${email}`} className="transition-smooth hover:text-accent-gold">
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}
