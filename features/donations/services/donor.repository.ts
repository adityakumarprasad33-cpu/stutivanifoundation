import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { DonorProfile } from '../types/donation.types';
import { COLLECTIONS } from '@/constants/collections';

export class DonorRepository extends FirebaseRepository<DonorProfile> {
  constructor() {
    super('donorProfiles');
  }
}
