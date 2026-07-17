import React from 'react';
import { BRANDING } from '@/constants/branding';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: BRANDING.ORGANIZATION.NAME,
    url: BASE_URL,
    logo: `${BASE_URL}${BRANDING.ASSETS.LOGO}`,
    description: BRANDING.ORGANIZATION.TAGLINE,
    email: BRANDING.CONTACT.EMAIL,
    telephone: BRANDING.CONTACT.PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRANDING.CONTACT.ADDRESS.STREET,
      addressLocality: BRANDING.CONTACT.ADDRESS.CITY,
      addressRegion: BRANDING.CONTACT.ADDRESS.REGION,
      postalCode: BRANDING.CONTACT.ADDRESS.POSTAL_CODE,
      addressCountry: BRANDING.CONTACT.ADDRESS.COUNTRY,
    },
    sameAs: [
      BRANDING.SOCIAL.FACEBOOK_URL,
      BRANDING.SOCIAL.TWITTER_URL,
      BRANDING.SOCIAL.LINKEDIN_URL,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ article, url }: { article: any; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [article.coverImage || `${BASE_URL}${BRANDING.ASSETS.OG_IMAGE_DEFAULT}`],
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.updatedAt || article.publishedAt || new Date().toISOString(),
    author: [{
      '@type': 'Person',
      name: article.authorName || 'Stuti-Vani Editor',
      url: `${BASE_URL}/about`
    }],
    publisher: {
      '@type': 'Organization',
      name: BRANDING.ORGANIZATION.NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}${BRANDING.ASSETS.LOGO}`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${url}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function EventSchema({ event, url }: { event: any; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location || 'Stuti-Vani Campus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location || 'India'
      }
    },
    image: [event.coverImage || `${BASE_URL}${BRANDING.ASSETS.OG_IMAGE_DEFAULT}`],
    description: event.description,
    organizer: {
      '@type': 'Organization',
      name: BRANDING.ORGANIZATION.NAME,
      url: BASE_URL
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { label: string; href?: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
