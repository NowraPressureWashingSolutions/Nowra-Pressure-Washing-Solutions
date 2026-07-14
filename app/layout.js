import './globals.css';

export const metadata = {
  metadataBase: new URL('https://nowrapressurewashingsolutions.com.au'),
  title: 'Pressure Washing Nowra & the Shoalhaven | Nowra Pressure Washing Solutions',
  description:
    'Locally owned, insured pressure washing across Nowra and the Shoalhaven. Driveways, patios, pavers, sandstone, decks, fleet and end-of-lease cleaning. Free, same-day quotes.',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Nowra Pressure Washing Solutions',
    title: 'Pressure Washing Nowra & the Shoalhaven',
    description:
      'Locally owned, insured pressure washing across Nowra and the Shoalhaven. Driveways, patios, pavers, sandstone, decks, fleet and end-of-lease cleaning. Free, same-day quotes.',
    locale: 'en_AU',
    url: '/',
    images: ['/social-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pressure Washing Nowra & the Shoalhaven',
    description: 'Locally owned pressure washing across Nowra & the Shoalhaven. Free, same-day quotes.',
    images: ['/social-share.jpg'],
  },
  other: {
    'geo.region': 'AU-NSW',
    'geo.placename': 'Nowra, New South Wales',
    'geo.position': '-34.8726;150.6004',
    ICBM: '-34.8726, 150.6004',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
