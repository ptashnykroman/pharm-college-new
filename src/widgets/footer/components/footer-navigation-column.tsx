import type { FooterViewModel } from "@/widgets/footer/model";
import { FooterLink } from "@/widgets/footer/components/footer-link";

export function FooterNavigationColumn({
  quickLinks,
}: Pick<FooterViewModel, "quickLinks">) {
  return (
    <div>
      <div className="text-sm font-semibold uppercase tracking-wider text-accent-gold">
        Навігація
      </div>
      <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
        {quickLinks.map((item) => (
          <li key={item.id}>
            <FooterLink href={item.href} className="transition-smooth hover:text-accent-gold">
              {item.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
