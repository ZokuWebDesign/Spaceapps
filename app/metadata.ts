export const metadata = {
  title: {
    template: '%s | SpaceApps',
    default: 'SpaceApps - Desenvolvemos seu software para alcançar o espaço',
  },
  description: 'Como um foguete: do protótipo ao lançamento. Desenvolvemos software seguindo um processo estruturado em fases claras e bem definidas. Projetos em 4 países.',
  metadataBase: new URL('https://spaceapps.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://spaceapps.com.br',
    siteName: 'SpaceApps',
    title: 'SpaceApps - Desenvolvemos seu software para alcançar o espaço',
    description: 'Como um foguete: do protótipo ao lançamento. Desenvolvemos software seguindo um processo estruturado em fases claras e bem definidas. Projetos em 4 países.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SpaceApps - Desenvolvimento de Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpaceApps - Desenvolvemos seu software para alcançar o espaço',
    description: 'Como um foguete: do protótipo ao lançamento. Desenvolvemos software seguindo um processo estruturado em fases claras e bem definidas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
