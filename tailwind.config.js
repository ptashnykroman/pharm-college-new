const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const tailwindcssAnimate = require('tailwindcss-animate')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variableName}))`
    }

    return `rgba(var(${variableName}), ${opacityValue})`
  }
}

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      '2xl': 'var(--radius-2xl)',
      '3xl': 'var(--radius-3xl)',
      '4xl': 'var(--radius-4xl)',
    },
    extend: {
      colors: {
        background: withOpacity('--background'),
        foreground: withOpacity('--foreground'),
        card: {
          DEFAULT: withOpacity('--card'),
          foreground: withOpacity('--card-foreground'),
        },
        popover: {
          DEFAULT: withOpacity('--popover'),
          foreground: withOpacity('--popover-foreground'),
        },
        primary: {
          DEFAULT: withOpacity('--primary'),
          foreground: withOpacity('--primary-foreground'),
          glow: withOpacity('--primary-glow'),
          deep: withOpacity('--primary-deep'),
        },
        secondary: {
          DEFAULT: withOpacity('--secondary'),
          foreground: withOpacity('--secondary-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('--muted'),
          foreground: withOpacity('--muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('--accent'),
          foreground: withOpacity('--accent-foreground'),
          gold: withOpacity('--accent-gold'),
          'gold-foreground': withOpacity('--accent-gold-foreground'),
        },
        destructive: {
          DEFAULT: withOpacity('--destructive'),
          foreground: withOpacity('--destructive-foreground'),
        },
        border: withOpacity('--border'),
        input: withOpacity('--input'),
        ring: withOpacity('--ring'),
        sidebar: {
          DEFAULT: withOpacity('--sidebar'),
          foreground: withOpacity('--sidebar-foreground'),
          primary: withOpacity('--sidebar-primary'),
          'primary-foreground': withOpacity('--sidebar-primary-foreground'),
          accent: withOpacity('--sidebar-accent'),
          'accent-foreground': withOpacity('--sidebar-accent-foreground'),
          border: withOpacity('--sidebar-border'),
          ring: withOpacity('--sidebar-ring'),
        },
        chart: {
          1: withOpacity('--chart-1'),
          2: withOpacity('--chart-2'),
          3: withOpacity('--chart-3'),
          4: withOpacity('--chart-4'),
          5: withOpacity('--chart-5'),
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)'],
        heading: ['var(--font-heading)'],
        mono: ['var(--font-mono)'],
      },
      screens: {
        '2xs': '420px',
        xs: '500px',
        '3xl': '1920px',
      },
      boxShadow: {
        xs: defaultTheme.boxShadow.sm,
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        elegant: 'var(--shadow-elegant)',
        glow: 'var(--shadow-glow)',
      },
      backdropBlur: {
        xs: '4px',
      },
      ringWidth: {
        3: '3px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height, var(--accordion-panel-height, auto))' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height, var(--accordion-panel-height, auto))' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.outline-hidden': {
          outline: '2px solid transparent',
          outlineOffset: '2px',
        },
        '.field-sizing-content': {
          'field-sizing': 'content',
        },
      })
    }),
  ],
}

module.exports = config
