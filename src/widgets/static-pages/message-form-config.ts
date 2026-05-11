type MessageFormPreset = {
  title: string
  submitLabel: string
  variant: 'anonymous' | 'contact'
  defaultSubject?: string
  subjectOptions?: string[]
}

export const CONTACT_MESSAGE_SUBJECT_OPTIONS = ['Загальне питання', 'Питання до адміністрації', 'Питання про вступ']

export const FEEDBACK_MESSAGE_FORM: MessageFormPreset = {
  title: 'Надіслати звернення',
  submitLabel: 'Надіслати звернення',
  variant: 'contact',
  defaultSubject: CONTACT_MESSAGE_SUBJECT_OPTIONS[0],
  subjectOptions: CONTACT_MESSAGE_SUBJECT_OPTIONS,
}

export const TRUST_BOX_MESSAGE_FORM: MessageFormPreset = {
  title: 'Анонімне звернення',
  submitLabel: 'Надіслати анонімне звернення',
  variant: 'anonymous',
  defaultSubject: 'Анонімне звернення',
}
