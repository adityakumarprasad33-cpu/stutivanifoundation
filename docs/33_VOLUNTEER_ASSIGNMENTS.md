# Volunteer Assignments & Routing

## Purpose
The `volunteer_assignments` collection manages the routing of volunteers to specific Projects, Programs, or Events. 

## Structure
An Assignment connects a Volunteer to an operational entity.

```typescript
interface VolunteerAssignment {
  id: string;
  volunteerId: string;
  
  // Target Entities (Can be assigned to one or more)
  projectId?: string;
  programId?: string;
  eventId?: string;

  role: string;
  status: 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  
  // Tracking
  hoursAssigned: number;
  hoursCompleted: number;
}
```

## Benefits of Externalization
Historically, assignments were embedded as arrays within user documents. This leads to unbounded document growth and complicated multi-document updates.

By extracting assignments into a top-level collection, we gain:
1. **Infinite Scaling**: A volunteer can have 10,000 assignments over a 10-year period without affecting their base profile load time.
2. **Independent Querying**: We can efficiently query "Show me all active assignments for Project X" without loading the volunteer profiles.
3. **Auditability**: We can attach createdBy/updatedBy timestamps to individual assignments.
