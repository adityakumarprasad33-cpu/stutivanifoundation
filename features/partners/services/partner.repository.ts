import { FirebaseRepository } from '@/lib/firebase/shared';
import { COLLECTIONS } from '@/constants';
import type { Partner, CreatePartnerDTO, UpdatePartnerDTO } from '../types/partner.types';
import { partnerConverter } from './partner.converter';
import { db } from '@/lib/firebase/client';
import { collection, doc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';

export class PartnerRepository extends FirebaseRepository<Partner> {
  constructor() {
    super(COLLECTIONS.PARTNERS);
  }

  private getCollection() {
    return collection(db, this.collectionName).withConverter(partnerConverter);
  }

  /**
   * Generates a unique, SEO-friendly slug from a partner name.
   */
  async generateUniqueSlug(name: string, excludeId?: string): Promise<string> {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens

    let slug = baseSlug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      const existing = await this.findBySlug(slug);
      
      if (!existing || (excludeId && existing.id === excludeId)) {
        isUnique = true;
      } else {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    return slug;
  }

  /**
   * Find a partner by slug
   */
  async findBySlug(slug: string): Promise<Partner | null> {
    try {
      const q = query(
        this.getCollection(),
        where('slug', '==', slug)
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      
      return snapshot.docs[0].data();
    } catch (error) {
      console.error('Error finding partner by slug:', error);
      throw error;
    }
  }

  /**
   * Get all active partners, sorted by displayOrder
   */
  async getActivePartners(): Promise<Partner[]> {
    try {
      const q = query(
        this.getCollection(),
        where('active', '==', true)
      );
      
      const snapshot = await getDocs(q);
      const partners = snapshot.docs.map(doc => doc.data());
      
      // Filter out partners whose dates are outside the current range
      const now = new Date();
      return partners.filter(p => {
        if (p.startDate && p.startDate > now) return false;
        if (p.endDate && p.endDate < now) return false;
        return true;
      });
    } catch (error) {
      console.error('Error getting active partners:', error);
      throw error;
    }
  }

  /**
   * Get all partners (for dashboard), sorted by displayOrder
   */
  async getAllPartners(): Promise<Partner[]> {
    try {
      const snapshot = await getDocs(this.getCollection());
      const partners = snapshot.docs.map(doc => doc.data());
      return partners.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    } catch (error) {
      console.error('Error getting all partners:', error);
      throw error;
    }
  }

  /**
   * Get all active partners with their resolved MediaAsset
   */
  async getActivePartnersWithMedia(): Promise<(Partner & { logo?: any })[]> {
    const { MediaRepository } = await import('@/features/gallery/services/media.repository');
    const mediaRepo = new MediaRepository();
    
    const partners = await this.getActivePartners();
    
    return Promise.all(partners.map(async p => {
      try {
        const media = p.logoMediaId ? await mediaRepo.getById(p.logoMediaId) : null;
        return { ...p, logo: media };
      } catch (error) {
        console.error(`Error fetching media for partner ${p.id}:`, error);
        return { ...p, logo: null };
      }
    }));
  }

  /**
   * Create a new partner
   */
  async createPartner(data: CreatePartnerDTO): Promise<Partner> {
    const slug = await this.generateUniqueSlug(data.name);
    return this.create({
      ...data,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  }

  /**
   * Update an existing partner
   */
  async updatePartner(id: string, data: UpdatePartnerDTO): Promise<Partner> {
    let updateData = { ...data, updatedAt: new Date() };
    
    if (data.name) {
      const slug = await this.generateUniqueSlug(data.name, id);
      updateData = { ...updateData, slug };
    }
    
    return this.update(id, updateData as any);
  }
}

export const partnerRepository = new PartnerRepository();
