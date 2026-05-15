import type { HomePageViewModel } from "@/widgets/home/model";
import { ContactPersonCard } from "@/widgets/home/sections/contacts/contact-person-card";
import { HomeContactsMap } from "@/widgets/home/sections/contacts/home-contacts-map";

export function ContactsSection({
  contacts,
}: {
  contacts: HomePageViewModel["contacts"];
}) {
  return (
    <section id="contacts" className="bg-gradient-soft py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
            {contacts.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Маєте питання про навчання чи вступ? Напишіть нам або скористайтеся контактами нижче.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {contacts.people.map((person, index) => (
              <ContactPersonCard key={person.id} person={person} index={index} />
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-card lg:col-span-3 md:p-8">
            {/* <h3 className="text-2xl font-bold text-foreground">Зв&apos;яжіться з нами</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Якщо вам зручніше, скористайтеся мапою або напишіть на офіційну пошту коледжу.
            </p> */}

            <HomeContactsMap title={contacts.title} mapUrl={contacts.mapUrl} />

            {/* {primaryEmail ? (
              <a
                href={`mailto:${primaryEmail}`}
                className="mt-6 inline-flex items-center rounded-md bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-bounce hover:scale-[1.02]"
              >
                <Send className="mr-2 h-4 w-4" />
                Написати нам
              </a>
            ) : null} */}
          </div>
        </div>
      </div>
    </section>
  );
}
