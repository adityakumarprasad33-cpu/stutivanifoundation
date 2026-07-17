export class BlogService {
  /**
   * Generates a URL-friendly slug with a unique random suffix
   */
  static generateSlug(title: string): string {
    const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return `${base}-${Math.random().toString(36).substring(2, 6)}`;
  }

  /**
   * Calculates the estimated reading time based on an average speed of 200 words per minute
   */
  static calculateReadingTime(html: string): number {
    const wordCount = this.countWords(html);
    return Math.max(1, Math.ceil(wordCount / 200));
  }
  
  /**
   * Counts the number of words in an HTML string by stripping tags
   */
  static countWords(html: string): number {
    const text = html.replace(/<[^>]+>/g, ' ');
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  /**
   * Generates normalized content for search indexing
   */
  static normalizeContent(html: string): string {
    return html.replace(/<[^>]+>/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim();
  }
}
