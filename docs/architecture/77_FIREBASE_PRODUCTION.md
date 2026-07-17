# 77. Firebase Production Configuration

## Overview
The platform uses Firebase for Authentication, Firestore (database), and Cloud Storage. Moving from development to production requires strict security rules and proper indexing.

## Service Account
1. Go to Firebase Console -> Project Settings -> Service Accounts.
2. Generate a new private key.
3. Add the `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` to Vercel environment variables.
   > [!IMPORTANT]
   > Do not expose these in `NEXT_PUBLIC_` variables.

## Firestore Security Rules
Ensure the following rules are deployed to your production Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin checking function
    function isAdmin() {
      return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['SUPER_ADMIN', 'ADMIN'];
    }

    match /public_content/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Default fallback (deny all)
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Firestore Indexes
The platform queries often require composite indexes. If a query fails in production, check the Firebase Console logs for a direct link to create the necessary index. Common indexes include:
- `activities` (userId ASC, timestamp DESC)
- `events` (status ASC, date DESC)

## Authentication Providers
Ensure Google and Email/Password sign-in providers are enabled in Firebase Authentication. Add your production domain to the "Authorized domains" list in Firebase Auth settings.
