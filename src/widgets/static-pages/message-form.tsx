'use client'

import { useState } from 'react'
import { Loader2, Mail, Send } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AppButton } from '@/components/shared/app-button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const EMAIL_JS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_hsn7k71'
const EMAIL_JS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_6arn6nf'
const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'cq9KjIAiqLA7Ps4Ph'

type MessageFormVariant = 'anonymous' | 'contact'

type MessageFormProps = {
  title: string
  submitLabel: string
  variant: MessageFormVariant
  inDialog?: boolean
  defaultSubject?: string
  subjectOptions?: string[]
  className?: string
}

type FormState = {
  userName: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildInitialState(defaultSubject?: string): FormState {
  return {
    userName: '',
    email: '',
    subject: defaultSubject ?? '',
    message: '',
  }
}

function validateForm(state: FormState, variant: MessageFormVariant): FormErrors {
  const errors: FormErrors = {}

  if (variant === 'contact') {
    if (!state.userName.trim()) {
      errors.userName = "Вкажіть ваше ім'я."
    }

    if (!state.email.trim()) {
      errors.email = 'Вкажіть електронну пошту.'
    } else if (!EMAIL_PATTERN.test(state.email.trim())) {
      errors.email = 'Перевірте формат електронної пошти.'
    }

    if (!state.subject.trim()) {
      errors.subject = 'Оберіть тему повідомлення.'
    }
  }

  if (!state.message.trim()) {
    errors.message = 'Напишіть текст повідомлення.'
  }

  return errors
}

async function sendMessage(state: FormState) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: EMAIL_JS_SERVICE_ID,
      template_id: EMAIL_JS_TEMPLATE_ID,
      user_id: EMAIL_JS_PUBLIC_KEY,
      template_params: {
        userName: state.userName.trim() || 'Анонімне повідомлення',
        email: state.email.trim() || 'anonymous@pharm.zt.ua',
        subject: state.subject.trim() || 'Анонімне повідомлення',
        message: state.message.trim(),
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Message send failed')
  }
}

export function MessageForm(props: MessageFormProps) {
  const { submitLabel, variant, defaultSubject, subjectOptions = [], className, inDialog = false } = props

  const [formState, setFormState] = useState<FormState>(() => buildInitialState(defaultSubject))
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
    setStatus('idle')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateForm(formState, variant)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length) {
      return
    }

    try {
      setIsSubmitting(true)
      await sendMessage(formState)
      setFormState(buildInitialState(defaultSubject))
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={cn(
        'rounded-[2rem] border border-[rgba(var(--border),0.7)] bg-white',
        inDialog ? '' : 'p-6 md:p-8 shadow-card',
        className,
      )}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {variant === 'contact' ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">Ваше ім’я</label>
              <Input
                value={formState.userName}
                onChange={(event) => updateField('userName', event.target.value)}
                aria-invalid={Boolean(errors.userName)}
                placeholder="Ваше ім’я"
              />
              {errors.userName ? <p className="mt-2 text-sm text-destructive">{errors.userName}</p> : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-foreground">Електронна пошта</label>
              <Input
                type="email"
                value={formState.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                placeholder="name@example.com"
              />
              {errors.email ? <p className="mt-2 text-sm text-destructive">{errors.email}</p> : null}
            </div>
          </div>
        ) : null}

        {variant === 'contact' ? (
          <div>
            <label className="mb-2 block text-sm font-bold text-foreground">Тема звернення</label>
            <Select value={formState.subject} onValueChange={(value) => updateField('subject', value)}>
              <SelectTrigger className="h-12 w-full rounded-[1rem] border-[rgba(var(--border),0.8)] bg-white px-4 shadow-soft">
                <SelectValue placeholder="Оберіть тему повідомлення" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject ? <p className="mt-2 text-sm text-destructive">{errors.subject}</p> : null}
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-bold text-foreground">Текст повідомлення</label>
          <Textarea
            value={formState.message}
            onChange={(event) => updateField('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            placeholder="Напишіть ваше повідомлення"
            className="min-h-40 rounded-[1rem] border-[rgba(var(--border),0.8)] bg-white px-4 py-3 shadow-soft"
          />
          {errors.message ? <p className="mt-2 text-sm text-destructive">{errors.message}</p> : null}
        </div>

        {status === 'success' ? (
          <div className="rounded-[1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Повідомлення успішно надіслано.
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="rounded-[1rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Не вдалося надіслати повідомлення. Спробуйте пізніше або напишіть на офіційну електронну пошту коледжу.
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <AppButton type="submit" shape="rounded" icon={isSubmitting ? Loader2 : Send} disabled={isSubmitting}>
            {submitLabel}
          </AppButton>

          <a
            href="mailto:college@pharm.zt.ua"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Mail className="h-4 w-4" />
            college@pharm.zt.ua
          </a>
        </div>
      </form>
    </div>
  )
}
