import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Transaction } from '../types/donation.types';
import { COLLECTIONS } from '@/constants/collections';

export class TransactionRepository extends FirebaseRepository<Transaction> {
  constructor() {
    super(COLLECTIONS.TRANSACTIONS);
  }
}
