import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Donor } from '../types/donation.types';
import { COLLECTIONS } from '@/constants/collections';

export class DonorRepository extends FirebaseRepository<Donor> {
  constructor() {
    super('donorProfiles');
  }
}
