import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Campaign } from '../types/donation.types';
import { COLLECTIONS } from '@/constants/collections';

export class CampaignRepository extends FirebaseRepository<Campaign> {
  constructor() {
    super(COLLECTIONS.CAMPAIGNS);
  }
}
