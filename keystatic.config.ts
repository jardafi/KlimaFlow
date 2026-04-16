import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // For local dev: stores content as files in the Git repo.
    // For production on Vercel, switch to:
    //   kind: 'github',
    //   repo: 'your-org/your-repo',
    // and add KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET,
    // KEYSTATIC_SECRET env vars in Vercel dashboard.
    kind: 'local',
  },

  ui: {
    brand: { name: 'KlimaFlow Blog' },
    navigation: {
      Blog: ['blog'],
    },
  },

  collections: {
    blog: collection({
      label: 'Blogy',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Název článku', description: 'H1 nadpis stránky a základ URL.' },
        }),
        description: fields.text({
          label: 'Popis (SEO meta description)',
          description: 'Zobrazuje se ve výsledcích vyhledávání. Doporučená délka 120–160 znaků.',
          multiline: true,
          validation: { length: { min: 50, max: 160 } },
        }),
        publishDate: fields.date({
          label: 'Datum publikace',
          defaultValue: { kind: 'today' },
        }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Klimatizace', value: 'klimatizace' },
            { label: 'Úspory energie', value: 'uspory' },
            { label: 'SVJ a bytová družstva', value: 'svj' },
            { label: 'Developeři', value: 'developeri' },
            { label: 'Kanceláře', value: 'kancelare' },
          ],
          defaultValue: 'klimatizace',
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'KlimaFlow tým',
        }),
        coverImage: fields.image({
          label: 'Titulní obrázek',
          description: 'Ideální rozměr 1200×630 px (OG image). Zobrazuje se v náhledu na blogu i sdílení na sociálních sítích.',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.mdx({
          label: 'Obsah článku',
          options: {
            heading: [2, 3, 4],
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
