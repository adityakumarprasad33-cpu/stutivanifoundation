import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Blog } from '../types/blog.types';
import type { PaginationResult } from '@/lib/repository/IRepository';

export class BlogRepository extends FirebaseRepository<Blog> {
  constructor() {
    super('blogs');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getPublishedBlogs(options?: any): Promise<PaginationResult<Blog>> {
    return this.query({
      ...options,
      filters: [
        { field: 'status', operator: '==', value: 'PUBLISHED' },
        { field: 'visibility', operator: '==', value: 'PUBLIC' }
      ],
      sort: [{ field: 'publishDate', direction: 'desc' }]
    });
  }
  
  async getBySlug(slug: string): Promise<Blog | null> {
    const { data } = await this.query({
      filters: [{ field: 'slug', operator: '==', value: slug }],
      limit: 1
    });
    return data.length > 0 ? data[0] : null;
  }
}
