import { cn } from '@/lib/utils'

export function BlockShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-[2rem] border border-[rgba(var(--border),0.8)] bg-white p-5 shadow-soft md:p-6', className)}>
      {children}
    </section>
  )
}
