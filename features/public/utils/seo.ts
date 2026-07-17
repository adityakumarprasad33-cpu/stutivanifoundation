import { Metadata } from 'next';
import { BRANDING } from '@/constants/branding';

interface GenerateMetadataProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

const DEFAULT_TITLE = BRANDING.ORGANIZATION.NAME;
const DEFAULT_DESCRIPTION = BRANDING.ORGANIZATION.TAGLINE;
const DEFAULT_IMAGE = BRANDING.ASSETS.OG_IMAGE_DEFAULT;
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function generateSeoMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  
  const absoluteUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const fullTitle = `${title} | ${DEFAULT_TITLE}`;

  return {
    title: fullTitle,
    description,
    authors: [{ name: BRANDING.ORGANIZATION.NAME }],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: absoluteUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl,
      siteName: DEFAULT_TITLE,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
