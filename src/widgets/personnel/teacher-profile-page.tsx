"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { AppButton } from "@/components/shared/app-button";
import type { TeacherProfileViewModel } from "@/widgets/personnel/model";
import { formatCmsHtml, normalizePhone } from "@/widgets/page/cms-page/lib";

function TeacherProfileTabButton({
  isActive,
  label,
  onClick,
  tabId,
  panelId,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
  tabId: string;
  panelId: string;
}) {
  return (
    <button
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer flex min-w-[170px] shrink-0 snap-start items-center justify-center overflow-hidden rounded-[1.25rem] border px-2 md:px-4 py-2 md:py-3 text-sm font-semibold leading-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--primary),0.25)] sm:min-w-0 sm:flex-1 md:text-base",
        isActive
          ? "border-[rgba(var(--primary),0.2)] bg-gradient-primary text-primary-foreground shadow-soft"
          : "border-[rgba(var(--primary),0.2)] bg-white text-[rgba(var(--foreground),0.7)] hover:border-[rgba(var(--primary),0.1)] hover:bg-white hover:text-foreground hover:shadow-soft",
      )}
    >
      <span className="relative z-10 block text-balance">{label}</span>
    </button>
  );
}

export function TeacherProfilePageView({
  teacher,
}: {
  teacher: TeacherProfileViewModel;
}) {
  const tabs = [
    { id: "general", label: "Загальна інформація" },
    ...(teacher.additionalInformation?.trim()
      ? [{ id: "additional", label: "Додаткова інформація" }]
      : []),
    ...(teacher.printedWorks?.trim()
      ? [{ id: "printed", label: "Друковані праці" }]
      : []),
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "general");
  const tabsBaseId = useId();
  const showMobileScrollHint = tabs.length > 1;

  const getTabId = (tabId: string) => `${tabsBaseId}-${tabId}-tab`;
  const getPanelId = (tabId: string) => `${tabsBaseId}-${tabId}-panel`;

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!tabs.length) {
      return;
    }

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);

    requestAnimationFrame(() => {
      document.getElementById(getTabId(nextTab.id))?.focus();
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="container mx-auto px-0 xs:px-4 pb-16 md:px-6 md:pb-20">
        <div className="sm:rounded-[2rem] sm:border sm:border-[rgba(255,255,255,0.65)] sm:bg-[rgba(255,255,255,0.75)] sm:shadow-soft sm:backdrop-blur-sm sm:border-[rgba(var(--border),0.7)]">
          <div>
            <div className="relative overflow-x-auto sm:rounded-[1.5rem] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible">
              <div
                role="tablist"
                aria-label="Teacher profile sections"
                onKeyDown={handleTabKeyDown}
                className="flex w-max min-w-full gap-2 sm:rounded-[1.5rem] sm:bg-gradient-soft p-1.5 grid sm:w-full"
                style={{
                  gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
                }}
              >
                {tabs.map((tab) => (
                  <TeacherProfileTabButton
                    key={tab.id}
                    isActive={tab.id === activeTab}
                    label={tab.label}
                    panelId={getPanelId(tab.id)}
                    tabId={getTabId(tab.id)}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
            </div>

            {showMobileScrollHint ? (
              <div className="flex items-center justify-center gap-1.5 px-4 pb-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgba(var(--foreground),0.45)] sm:hidden">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Переглянути ще</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 sm:mt-8 rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white p-6 shadow-card md:p-8">
          {activeTab === "general" ? (
            <div
              id={getPanelId("general")}
              role="tabpanel"
              aria-labelledby={getTabId("general")}
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="overflow-hidden mx-auto !max-w-[320px] rounded-[2rem] bg-gradient-to-br from-primary-deep via-primary to-primary-glow shadow-soft">
                    {teacher.photo ? (
                      <Image
                        src={teacher.photo.src}
                        alt={teacher.photo.alt}
                        width={teacher.photo.width}
                        height={teacher.photo.height}
                        className="w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[3/4] items-center justify-center text-6xl font-black text-[rgba(255,255,255,0.9)]">
                        {teacher.name
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0]?.toUpperCase() ?? "")
                          .join("")}
                      </div>
                    )}
                  </div>

                  {teacher.calendarId ? (
                    <div className="text-center">
                      <AppButton
                        href={`/rozklad/vikladach/${teacher.slug}`}
                        icon={CalendarDays}
                        iconPosition="right"
                        shape="rounded"
                        width="full"
                        className="max-w-[320px]"
                      >
                        Переглянути розклад
                      </AppButton>
                    </div>
                  ) : null}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(var(--primary),0.75)]">
                    <Link
                      href={`/structure/cmks/${teacher.cycleCommission.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {teacher.cycleCommission.name}
                    </Link>
                  </p>
                  <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                    {teacher.name}
                  </h1>

                  {teacher.status || teacher.position ? (
                    <div className="mt-6 rounded-[1.5rem] bg-gradient-soft p-5">
                      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[rgba(var(--foreground),0.65)]">
                        Посада та кваліфікація
                      </h3>
                      <p className="mt-3 text-base leading-7 text-[rgba(var(--foreground),0.8)]">
                        {teacher.status || teacher.position}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3 text-sm">
                    {teacher.email ? (
                      <a
                        href={`mailto:${teacher.email}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border),0.7)] bg-white px-4 py-2 text-[rgba(var(--foreground),0.8)] shadow-soft transition-colors hover:text-primary"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{teacher.email}</span>
                      </a>
                    ) : null}

                    {teacher.phone ? (
                      <a
                        href={`tel:${normalizePhone(teacher.phone)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border),0.7)] bg-white px-4 py-2 text-[rgba(var(--foreground),0.8)] shadow-soft transition-colors hover:text-primary"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{teacher.phone}</span>
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[rgba(var(--foreground),0.65)]">
                      Навчальні предмети
                    </h3>

                    {teacher.subjects.length ? (
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {teacher.subjects.map((subject) => (
                          <li
                            key={subject}
                            className="rounded-[1.25rem] border border-[rgba(var(--border),0.7)] bg-white px-4 py-3 text-sm leading-6 text-[rgba(var(--foreground),0.8)] shadow-soft"
                          >
                            «{subject}»
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm leading-7 text-[rgba(var(--foreground),0.75)]">
                        Інформація про предмети викладача наразі відсутня.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "additional" && teacher.additionalInformation ? (
            <div
              id={getPanelId("additional")}
              role="tabpanel"
              aria-labelledby={getTabId("additional")}
              tabIndex={0}
              className="rich-text focus-visible:outline-none"
              dangerouslySetInnerHTML={{
                __html: formatCmsHtml(teacher.additionalInformation),
              }}
            />
          ) : null}

          {activeTab === "printed" && teacher.printedWorks ? (
            <div
              id={getPanelId("printed")}
              role="tabpanel"
              aria-labelledby={getTabId("printed")}
              tabIndex={0}
              className="rich-text focus-visible:outline-none"
              dangerouslySetInnerHTML={{
                __html: formatCmsHtml(teacher.printedWorks),
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
