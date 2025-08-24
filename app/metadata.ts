export const metadata = {
  title: {
    template: '%s | Spaceapps',
    default: 'Spaceapps - Space Innovation Challenge',
  },
  description: 'NASA Spaceapps Challenge - Innovating solutions for space exploration and Earth challenges.',
  metadataBase: new URL('https://spaceapps.yoursite.com'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://spaceapps.yoursite.com',
    siteName: 'SpaceApps',
    title: 'Spaceapps - Space Innovation Challenge',
    description: 'NASA SpaceApps Challenge - Innovating solutions for space exploration and Earth challenges.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SpaceApps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spaceapps - Space Innovation Challenge',
    description: 'NASA Spaceapps Challenge - Innovating solutions for space exploration and Earth challenges.',
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
