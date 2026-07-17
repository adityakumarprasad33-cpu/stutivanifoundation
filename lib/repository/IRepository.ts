export interface PaginationResult<T> {
  data: T[];
  total?: number;
  lastCursor?: string;
  hasMore: boolean;
}

export interface QueryOptions {
  filters?: {
    field: string;
    operator: '==' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any';
    value: unknown;
  }[];
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  }[];
  limit?: number;
  cursor?: string; // ID of the last document
  skipStatusFilter?: boolean; // Bypass the automatic status != archived filter
}

export interface IRepository<T extends { id: string }> {
  /**
   * Create a new record. Returns the created record with ID.
   */
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

  /**
   * Get a record by its ID. Returns null if not found.
   */
  getById(id: string): Promise<T | null>;

  /**
   * Update a record partially.
   */
  update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T>;

  /**
   * Delete a record permanently or soft-delete depending on implementation.
   */
  delete(id: string, soft?: boolean): Promise<void>;

  /**
   * Query records with filters, sorting, and pagination.
   */
  query(options?: QueryOptions): Promise<PaginationResult<T>>;
}
