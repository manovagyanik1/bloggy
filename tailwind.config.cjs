/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-headings': theme('colors.gray.100'),
            '--tw-prose-lead': theme('colors.gray.300'),
            '--tw-prose-links': theme('colors.indigo.400'),
            '--tw-prose-bold': theme('colors.gray.100'),
            '--tw-prose-counters': theme('colors.gray.400'),
            '--tw-prose-bullets': theme('colors.gray.400'),
            '--tw-prose-hr': theme('colors.gray.700'),
            '--tw-prose-quotes': theme('colors.gray.300'),
            '--tw-prose-quote-borders': theme('colors.gray.700'),
            '--tw-prose-captions': theme('colors.gray.400'),
            '--tw-prose-code': theme('colors.gray.100'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
            '--tw-prose-th-borders': theme('colors.gray.700'),
            '--tw-prose-td-borders': theme('colors.gray.700'),
            
            // Background colors
            backgroundColor: theme('colors.gray.900'),
            h1: { color: 'var(--tw-prose-headings)' },
            h2: { color: 'var(--tw-prose-headings)' },
            h3: { color: 'var(--tw-prose-headings)' },
            h4: { color: 'var(--tw-prose-headings)' },
            p: { color: 'var(--tw-prose-body)' },
            a: { color: 'var(--tw-prose-links)' },
            strong: { color: 'var(--tw-prose-bold)' },
            blockquote: {
              color: 'var(--tw-prose-quotes)',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
            },
            code: { color: 'var(--tw-prose-code)' },
            'pre code': { color: 'var(--tw-prose-pre-code)' },
            pre: { backgroundColor: 'var(--tw-prose-pre-bg)' },
            hr: { borderColor: 'var(--tw-prose-hr)' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 