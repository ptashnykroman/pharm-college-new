# Фінальний план SSG/ISR архітектури

## Статус

Це затверджена робоча архітектура для поточного Next.js проєкту. Мета: максимально швидкі переходи для часто відвідуваних сторінок, контрольована ревалідація з Strapi CMS і без build-пекла на великій кількості новин.

Основні рішення:

- Відомі CMS-сторінки генеруються під час `next build`.
- Нові CMS-сторінки можуть з'являтися після deploy без повного rebuild.
- `dynamicParams = false` не додаємо, щоб не блокувати on-demand генерацію нових URL.
- Оновлення з CMS проходять через `app/api/revalidate/route.ts`.
- Strapi webhook налаштовується через Admin UI, без кастомного коду в Strapi.
- Для рідкісної зміни URL приймаємо, що старий шлях може жити кілька хвилин до TTL.
- Для важливої SEO-зміни URL вручну викликаємо `/api/revalidate` з двома paths: старим і новим.

## Next.js правила, на які спираємось

Перевірено по локальній документації встановленого Next.js у `node_modules/next/dist/docs/`.

- `generateStaticParams()` генерує відомі dynamic route params під час build.
- `generateStaticParams()` не викликається повторно під час ISR.
- Якщо route param не був згенерований на build і `dynamicParams` лишається `true`, Next може згенерувати сторінку on-demand.
- `revalidatePath()` у Route Handler позначає конкретний path для ревалідації.
- `revalidateTag(tag, 'max')` використовується для tag-based invalidation у Next 16.
- `fetch(..., { next: { revalidate, tags } })` дає persistent data cache, але великі відповіді понад 2 MB не кешуються Next data cache.

## Загальна модель

Використовуємо гібридну модель SSG + ISR:

- Часто відвідувані й відомі сторінки прегенеруються на build.
- Рідкісні або старі сторінки не роздувають build, а генеруються при першому запиті.
- Після першого запиту сторінка кешується і працює як ISR-сторінка.
- Webhook з CMS точково скидає потрібні path/tag, а не весь сайт.
- `loading.tsx` потрібен для cold on-demand генерації та повільних умов мережі.

## CMS-сторінки

Для catch-all маршруту `app/[...slug]/page.tsx`:

- `generateStaticParams()` повертає відомі CMS `page_url`.
- Сторінки без окремого route file у `app/` потрапляють у catch-all.
- Якщо CMS не повертає сторінку для `pathname`, викликаємо `notFound()`.
- `PlaceholderPage` не використовується як production fallback.
- `getPageData(pathname)` кешується через `React.cache()` для deduplication між page і metadata.

## Інші dynamic routes

Явні dynamic routes для структури, розкладу, відділень, підрозділів, ЦК, викладачів та подібних сутностей також мають працювати за тією ж моделлю:

- Відомі params генеруються через `generateStaticParams()`.
- Нові params не блокуються через `dynamicParams = false`.
- Дані завантажуються з `revalidate` і відповідними cache tags.
- Webhook має скидати або конкретний path, або відповідний tag, якщо зміна впливає на список.

## Новини

Новини не генеруємо повністю, бо їх багато і це створює build-пекло.

Фінальна модель:

- `/novina` лишається SSG/ISR сторінкою.
- `/novina/[year]/[month]` на build генерує тільки останні 12 archive-місяців.
- Старі archive-місяці генеруються on-demand при першому відкритті і далі кешуються через ISR.
- `/novina/[year]/[month]` використовує scoped GraphQL query за діапазоном дат конкретного місяця.
- Archive-сторінка більше не тягне всі 600+ новин і не фільтрує їх у JS.
- `/novina/[year]/[month]/[day]/[id]` на build генерує тільки останні 24 detail-новини.
- Старі detail-новини генеруються on-demand при першому відкритті і далі кешуються через ISR.
- Легкий navigation-запит по новинах лишається для sidebar, recent news і архівної навігації.
- List-запит для новин не тягне зайві media `formats`, бо картки зараз використовують original image metadata.

Очікуваний ефект:

- Build не намагається пререндерити сотні detail-новин.
- Build не пререндерить всі archive-місяці.
- Month archive запити стають суттєво меншими.
- Зникає основна причина логів `items over 2MB can not be cached` для архівних сторінок новин.
- Найсвіжіші новини та місяці працюють максимально швидко після deploy.

## Revalidation

Центральна точка: `app/api/revalidate/route.ts`.

Endpoint підтримує:

- ручний payload з `path`, `paths`, `tag`, `tags`;
- стандартний Strapi webhook payload;
- `Authorization: Bearer <REVALIDATE_SECRET>`;
- `secret` у JSON body або query string для ручних технічних викликів.

Приклади ручного виклику:

```json
{
  "secret": "production-secret",
  "paths": ["/old-url", "/new-url"]
}
```

```json
{
  "secret": "production-secret",
  "paths": ["/novina", "/novina/2026/05", "/novina/2026/05/13/123"]
}
```

Strapi webhook для CMS page може надсилати стандартний payload:

```json
{
  "event": "entry.update",
  "model": "page",
  "entry": {
    "page_url": "/pro-zhbphc/kontakty"
  }
}
```

Strapi код змінювати не потрібно, доки не з'явиться вимога автоматично знати старий URL після зміни `page_url`.

## URL-зміни

Поточне рішення:

- URL CMS-сторінок змінюються рідко.
- Старий URL може лишатися доступним кілька хвилин до завершення TTL.
- Для важливої SEO-зміни вручну ревалідимо старий і новий URL через `paths`.
- Strapi lifecycle для збереження старого URL у першій ітерації не робимо.

## Hero та зображення

Фінальна модель hero:

- Homepage може використовувати CMS-слайди.
- Homepage має локальне fallback-фото `src/shared/assets/images/homepage/college_photo3.webp`.
- На mobile для homepage використовується локальне фіксоване фото, щоб не вантажити зайвий slider.
- На desktop fallback-фото показується одразу, поки підвантажуються CMS-слайди.
- Для внутрішніх сторінок прибираємо `HeroBackgroundSlider`.
- Внутрішні сторінки використовують локальне фото `src/shared/assets/images/homepage/college_photo3.webp`.
- Hero image quality знижено з `100` до `90`.

## Loading UI

Loading потрібен не як ознака повільної архітектури, а як нормальний fallback для:

- першої on-demand генерації нової або старої непобудованої сторінки;
- dev mode, де Next може компілювати route при першому переході;
- повільного CMS/cache запиту;
- старих новин або archive-місяців, які не входять у build-time набір.

Для catch-all і глобальних сторінок використовується skeleton, який візуально близький до реального hero, щоб перехід не був рваним.

## Strapi Admin UI налаштування

Для базового сценарію достатньо Admin UI:

- Додати webhook у Strapi.
- URL: `https://your-domain.com/api/revalidate`.
- Method: `POST`.
- Header: `Authorization: Bearer <REVALIDATE_SECRET>`.
- Events: `entry.create`, `entry.update`, `entry.delete`, `entry.publish`, `entry.unpublish` для потрібних collection types.
- Для CMS pages endpoint сам читає `entry.page_url`.
- Для новин endpoint ревалідить `/novina`, відповідний archive path, detail path і cache tags.

## Definition of Done

Архітектура вважається впровадженою, коли:

- `npm run build` проходить без timeout на архівах новин.
- Build генерує тільки останні 24 detail-новини.
- Build генерує тільки останні 12 archive-місяців.
- Старі news detail і archive сторінки відкриваються on-demand.
- Webhook оновлює змінені сторінки без rebuild.
- Ручний виклик `/api/revalidate` з кількома paths працює.
- Немає broad ревалідації всього сайту для звичайної зміни однієї сторінки.
- Внутрішні сторінки не вантажать CMS hero slider.
- Homepage slider не блокує mobile перший екран.
