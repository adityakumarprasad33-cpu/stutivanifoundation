import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Donation } from '../types/donation.types';
import { COLLECTIONS } from '@/constants/collections';


export class DonationRepository extends FirebaseRepository<Donation> {
  constructor() {
    super(COLLECTIONS.DONATIONS);
  }


}
