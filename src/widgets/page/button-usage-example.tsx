import { ArrowRight } from 'lucide-react'

import { AppButton } from '@/components/shared/app-button'

export const ButtonUsageExample = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <AppButton href="/" shape="rounded">
        Повернутися на головну
      </AppButton>

      <AppButton href="/novina" shape="rounded" variant="outline">
        Новини
      </AppButton>

      <AppButton href="" variant="glass">
        Задати питання
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" size="sm">
        Дізнатися більше
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" size="sm" variant="surface">
        Усі новини
      </AppButton>

      <div>
        <br />
        <hr />
      </div>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded">
        default
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded">
        default
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" variant="destructive">
        destructive
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" variant="ghost">
        ghost
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" variant="glass">
        glass
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" variant="link">
        link
      </AppButton>

      <AppButton href="/" shape="rounded" size="sm" variant="surface" width="full">
        Житомирський базовий фармацевичний фаховий коледж
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" variant="outline">
        outline
      </AppButton>

      <AppButton href="/" icon={ArrowRight} iconPosition="right" shape="rounded" variant="secondary">
        secondary
      </AppButton>
    </div>
  )
}