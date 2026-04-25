# Security Specification: Zenith Enterprise Hub

## Data Invariants
1. A Product must have a valid sellerId matching the authenticated user's UID (unless admin).
2. A Transaction status can only be moved from 'pending' to 'escrow' or 'completed', and never backward from 'completed'.
3. Tasks must have a positive points value.
4. Users cannot change their own 'role' or 'points' field.
5. Properties must have an agentId.

## Validations
- `isValidUser`: emails must be strings < 256, roles must be in enum.
- `isValidProduct`: name < 128, price > 0.
- `isValidProperty`: title < 128, price > 0.
- `isValidTask`: points between 1 and 1000.
- `isValidTransaction`: amount > 0.

## Dirty Dozen Payloads (Rejection Tests)
1. User tries to set themselves as 'admin' during profile creation.
2. Seller tries to update 'rating' on their own product.
3. Buyer tries to set 'status' to 'completed' without payment.
4. User tries to delete a transaction they didn't participate in.
5. Unauthorized user tries to list products.
6. Employee tries to award themselves points on a task.
7. Agent tries to mark a property as 'closed' that doesn't exist.
8. Attacker tries to inject 1MB string into product name.
9. Attacker tries to read private user PII.
10. Unverified user tries to write to marketplace.
11. Attacker tries to spoof a different ownerId on a product.
12. Random user trying to delete all users.

## Test Runner (Mock Logic)
The `firestore.rules.test.ts` would verify these rejections.
