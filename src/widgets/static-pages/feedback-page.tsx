import { MessageForm } from '@/widgets/static-pages/message-form'
import { FEEDBACK_MESSAGE_FORM } from '@/widgets/static-pages/message-form-config'

export function FeedbackPageView() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft py-12 md:py-16">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-black text-foreground text-2xl sm:text-3xl lg:text-4xl">Зворотний зв’язок</h1>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <MessageForm {...FEEDBACK_MESSAGE_FORM} />
        </div>
      </div>
    </section>
  )
}
