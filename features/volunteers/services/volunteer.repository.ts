import { FirebaseRepository } from '@/lib/firebase/shared/FirebaseRepository';
import type { Volunteer } from '../types/volunteer.types';

import { db } from '@/lib/firebase/client';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';


export class VolunteerRepository extends FirebaseRepository<Volunteer> {
  constructor() {
    super('volunteerProfiles');
  }

  async getNextVolunteerNumber(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const volunteersRef = collection(db, 'volunteerProfiles');
    const q = query(
      volunteersRef,
      where('volunteerNumber', '>=', `VOL-${currentYear}-`),
      where('volunteerNumber', '<=', `VOL-${currentYear}-\uf8ff`),
      orderBy('volunteerNumber', 'desc')
    );

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return `VOL-${currentYear}-000001`;
    }

    const lastVolunteer = snapshot.docs[0].data() as Volunteer;
    const lastNumberStr = lastVolunteer.volunteerNumber ? lastVolunteer.volunteerNumber.split('-')[2] : '000000';
    const lastNumber = parseInt(lastNumberStr, 10);
    const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
    
    return `VOL-${currentYear}-${nextNumber}`;
  }
}
