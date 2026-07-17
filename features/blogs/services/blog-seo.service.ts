import type { Blog, BlogSEO } from '../types/blog.types';

export class BlogSEOService {
  static prepareSEO(blog: Partial<Blog>): BlogSEO {
    const seo: BlogSEO = blog.seo || { keywords: [], noIndex: false, noFollow: false };
    
    // Auto-generate title and description if missing
    if (!seo.metaTitle && blog.title) {
      seo.metaTitle = blog.title.substring(0, 60);
    }
    
    if (!seo.metaDescription && blog.excerpt) {
      seo.metaDescription = blog.excerpt.substring(0, 160);
    }
    
    return seo;
  }

  /**
   * Prepares a JSON-LD Article Schema for the blog post
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static generateArticleSchema(blog: Blog, orgName: string, orgLogo: string): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      datePublished: blog.publishDate?.toISOString(),
      dateModified: blog.updatedAt?.toISOString(),
      author: {
        '@type': 'Person',
        // In a real implementation, we'd look up the author's display name
        name: blog.author.authorId
      },
      publisher: {
        '@type': 'Organization',
        name: orgName,
        logo: {
          '@type': 'ImageObject',
          url: orgLogo
        }
      }
    };
  }
}
