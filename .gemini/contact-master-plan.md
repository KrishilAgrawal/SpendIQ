# Contact Master Implementation Plan

## Phase 1: Database Schema ✅ (Mostly Done)

- [x] Contact model exists with required fields
- [ ] Add ContactTag model for many-to-many tags
- [ ] Add Tag model
- [ ] Run prisma generate and db push

## Phase 2: Backend API

### Contact Module

- [ ] Create contact.module.ts
- [ ] Create contact.controller.ts with endpoints:
  - GET /contacts (list with filters, search, pagination)
  - GET /contacts/:id (single contact)
  - POST /contacts (create)
  - PUT /contacts/:id (update)
  - DELETE /contacts/:id (archive)
  - POST /contacts/:id/portal-invite (send portal invitation)
- [ ] Create contact.service.ts with business logic
- [ ] Create DTOs for validation
- [ ] Add permission guards (Admin only)

### Tag Module

- [ ] Create tag endpoints for autocomplete
- [ ] GET /tags (list all tags)
- [ ] POST /tags (create tag on the fly)

## Phase 3: Frontend - List View

- [ ] Create /dashboard/master/contacts page
- [ ] Implement DataTable component with:
  - Columns: Name, Email, Type, Portal Access, Status
  - Search functionality
  - Filters (Type, Portal, Status)
  - Row click navigation
  - Empty state
- [ ] Add "Create Contact" button
- [ ] Implement pagination

## Phase 4: Frontend - Form View

- [ ] Create /dashboard/master/contacts/[id] page
- [ ] Create /dashboard/master/contacts/new page
- [ ] Implement form with all fields:
  - Contact Name (required)
  - Email (required, unique validation)
  - Phone
  - Address fields (Street, City, State, Country, Pincode)
  - Contact Type (Customer/Vendor)
  - Tags (multi-select with create)
  - Portal Access toggle
  - Image upload
- [ ] Add form validation
- [ ] Implement Save/Archive/Back actions
- [ ] Add confirmation toasts
- [ ] Handle portal invitation trigger

## Phase 5: Portal Invitation Email

- [ ] Create portal invitation email template
- [ ] Implement sendPortalInvitation in MailService
- [ ] Generate temporary password or magic link
- [ ] Update User creation for portal users

## Phase 6: Testing & Polish

- [ ] Test CRUD operations
- [ ] Test portal invitation flow
- [ ] Test permissions (Admin vs Portal User)
- [ ] Test email validation
- [ ] Polish UI/UX
- [ ] Add loading states
- [ ] Add error handling

## File Structure

```
app/api/src/modules/
├── contact/
│   ├── contact.module.ts
│   ├── contact.controller.ts
│   ├── contact.service.ts
│   └── dto/
│       ├── create-contact.dto.ts
│       ├── update-contact.dto.ts
│       └── filter-contact.dto.ts
├── tag/
│   ├── tag.module.ts
│   ├── tag.controller.ts
│   └── tag.service.ts

app/dashboard/master/
├── contacts/
│   ├── page.tsx (List View)
│   ├── new/
│   │   └── page.tsx (Form View - New)
│   └── [id]/
│       └── page.tsx (Form View - Edit)

components/contacts/
├── contact-table.tsx
├── contact-form.tsx
├── contact-filters.tsx
└── portal-invite-dialog.tsx
```
