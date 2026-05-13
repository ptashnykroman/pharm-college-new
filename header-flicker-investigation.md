# Header Flicker Investigation

Дата: 2026-05-13

## Симптом

На повільному інтернеті у `header` із затримкою змінюються:

- background
- колір тексту
- колір іконок

Візуально це виглядає так, ніби `header` спочатку рендериться в одному стилі, а потім через деякий час "перемикається" в інший.

## Основна причина

Проблема схожа не на затримку завантаження фонового зображення, а на `hydration flicker`.

У `src/widgets/header/site-header.tsx`:

- `SiteHeader` є клієнтським компонентом
- стан `scrolled` ініціалізується як `false`
- реальне значення визначається лише після гідрації через `useEffect` і `window.scrollY`

Ключовий фрагмент:

- `src/widgets/header/site-header.tsx:23` - `const [scrolled, setScrolled] = useState(false)`
- `src/widgets/header/site-header.tsx:32-39` - стан оновлюється тільки після монтування на клієнті

Поки JS ще не завантажився і `useEffect` не виконався:

- SSR/початковий HTML завжди показує варіант `scrolled = false`
- `header` рендериться як прозорий
- текст та іконки рендеряться у світлому стилі

Після гідрації React обчислює реальний `window.scrollY` і перемикає стилі.

## Де саме це проявляється

`scrolled` впливає відразу на кілька частин `header`, тому перемикання дуже помітне:

- `src/widgets/header/site-header.tsx:82-86`
  - `header` змінює background, border, shadow
- `src/widgets/header/site-header.tsx:106-123`
  - змінюються кольори кнопок пошуку та мобільного меню
- `src/widgets/header/components/header-top-bar.tsx:22-28`
  - змінюється фон верхньої смуги
- `src/widgets/header/components/header-top-bar.tsx:40-45`
  - змінюється колір quick links
- `src/widgets/header/components/header-top-bar.tsx:74-78`
  - змінюється колір social icons
- `src/widgets/header/components/header-brand.tsx:23-35`
  - змінюється колір тексту бренду
- `src/widgets/navigation/desktop-navigation.tsx:35-38`
  - змінюється колір desktop navigation

## Чому це виглядає ще гірше на повільній мережі

`header` гідрується не як маленький компонент тільки для scroll-стану. Разом із ним підтягуються:

- мобільна навігація
- пошуковий діалог
- desktop navigation

Зокрема:

- `src/widgets/header/site-header.tsx:132-141`
- `src/widgets/search/site-search-dialog.tsx:1-13`

Через це час до першої реакції на `scroll` збільшується, бо браузеру потрібно:

1. завантажити JS
2. виконати гідрацію клієнтського `header`
3. лише після цього виконати `useEffect`, який оновить `scrolled`

## Додатковий фактор

Навіть після того, як `scrolled` оновлюється, перемикання ще й анімується.

У `app/globals.css`:

- `app/globals.css:104` - `--transition-smooth: all 0.3s ...`
- `app/globals.css:252-257` - `.transition-smooth` і `.transition-bounce`

Це не є першопричиною, але підсилює візуальний ефект затримки.

## Чому справа, швидше за все, не в hero background

У `src/widgets/home/hero/hero-section.tsx`:

- базове фонове зображення вже має `preload`
- поверх нього є окремі overlay/gradient шари

Ключові місця:

- `src/widgets/home/hero/hero-section.tsx:82-90`
- `src/widgets/home/hero/hero-section.tsx:103-104`

Це означає, що `header` не повинен чекати завершення завантаження hero background, щоб визначити свій колір. Затримка більше схожа на проблему з клієнтським визначенням початкового стану.

## Рекомендовані варіанти виправлення

### Варіант 1. Найкращий

Визначати початковий scroll-dependent стан до гідрації:

- через маленький inline script `beforeInteractive`
- або через дуже маленький окремий scroll-controller
- або через `data-*` / клас на `html` чи `body`, який проставляється якомога раніше

Це дозволить відразу показати правильний стиль `header` ще до повної гідрації великого клієнтського острова.

### Варіант 2. Зменшити клієнтський бандл `header`

Розбити `header` на дрібніші клієнтські частини і ліниво завантажувати важчі блоки:

- `SiteSearchDialog`
- можливо `MobileNavigation`

Це зменшить час до моменту, коли `header` зможе коректно обробити `scroll`.

### Варіант 3. Пом'якшити візуальний ефект

Не анімувати перше перемикання стилю `header` або прибрати `transition-smooth` саме там, де змінюються:

- background
- text color
- icon color

Це не прибере саму причину, але зробить артефакт менш помітним.

## Що навряд чи допоможе

Проста заміна `useEffect` на `useLayoutEffect` навряд чи вирішить проблему на повільній мережі, тому що вузьке місце тут не лише в таймінгу ефекту, а в тому, що JS-гідрація взагалі відбувається із затримкою.

## Статус

Код не змінювався. Це тільки зафіксоване розслідування причини та напрямів виправлення.
