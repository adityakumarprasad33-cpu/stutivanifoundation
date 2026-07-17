# Donation Architecture

## Overview
The Donation Architecture handles the management of donors and their contributions. The module focuses on ensuring security, role-based access, financial integrity, and a comprehensive activity trail.

## Key Principles
1. **Isolated Collections:** `donors`, `donations`, and `transactions` are completely separated. No embedding of payment logic inside donor profiles.
2. **Immutability of Financial Data:** Once a donation is reconciled or a receipt generated, certain fields become read-only.
3. **Reconciliation Status:** Donations have specific states (`PENDING`, `MATCHED`, `FAILED`) separate from general active/inactive flags.

## Repositories
- **DonorRepository:** Manages individual, corporate, trust, and NGO donors. Supports searching and demographic aggregation.
- **DonationRepository:** Acts as the unified layer to fetch donations, filtering by Donor or Campaign.

## Integration Points
- **Activity System:** Every single financial operation (receiving, updating, refunding) generates a structured `DONATION_RECEIVED` or similar event.
- **Campaigns:** Links seamlessly into the Campaign Architecture for aggregate tracking.
