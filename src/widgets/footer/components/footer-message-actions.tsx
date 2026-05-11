'use client'

import { useState } from 'react'

import { AppButton } from '@/components/shared/app-button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MessageForm } from '@/widgets/static-pages/message-form'
import { FEEDBACK_MESSAGE_FORM, TRUST_BOX_MESSAGE_FORM } from '@/widgets/static-pages/message-form-config'

const FOOTER_MESSAGE_DIALOGS = {
  contact: {
    buttonLabel: 'Задати питання',
    dialogTitle: 'Напишіть нам',
    form: FEEDBACK_MESSAGE_FORM,
  },
  anonymous: {
    buttonLabel: 'Скринька довіри',
    dialogTitle: 'Скринька довіри',
    form: TRUST_BOX_MESSAGE_FORM,
  },
} as const

type FooterMessageDialogKey = keyof typeof FOOTER_MESSAGE_DIALOGS

export function FooterMessageActions() {
  const [activeDialog, setActiveDialog] = useState<FooterMessageDialogKey | null>(null)

  const activeDialogConfig = activeDialog ? FOOTER_MESSAGE_DIALOGS[activeDialog] : null

  return (
    <>
      <div className="flex flex-col items-start gap-3 lg:items-end">
        <AppButton type="button" variant="glass" className="w-60" onClick={() => setActiveDialog('contact')}>
          {FOOTER_MESSAGE_DIALOGS.contact.buttonLabel}
        </AppButton>

        <AppButton type="button" variant="glass" className="w-60" onClick={() => setActiveDialog('anonymous')}>
          {FOOTER_MESSAGE_DIALOGS.anonymous.buttonLabel}
        </AppButton>
      </div>

      <Dialog open={Boolean(activeDialogConfig)} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="w-full max-w-[95vw] gap-0 overflow-hidden border border-border/70 bg-white p-0 shadow-elegant sm:!max-w-3xl">
          {activeDialogConfig ? (
            <>
              <DialogHeader className="border-b border-border/70 bg-gradient-soft px-5 py-4 text-left md:px-6">
                <DialogTitle className="text-xl font-black text-foreground">
                  {activeDialogConfig.dialogTitle}
                </DialogTitle>
              </DialogHeader>

              <div className="max-h-[calc(90vh-6rem)] overflow-y-auto p-5 md:p-6">
                <MessageForm
                  inDialog
                  {...activeDialogConfig.form}
                  className="rounded-none border-0 bg-transparent p-0 shadow-none"
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
