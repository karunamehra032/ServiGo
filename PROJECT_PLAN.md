# ServiGo — Project Plan & System Design

**Project:** ServiGo  
**Type:** Local Services Marketplace (Daily Home Services)  
**Stack:** Node.js, Express, Mongoose, MongoDB Atlas  
**Location:** `C:\Projects\learning\ServiGo`

---

## 1. Vision

ServiGo is a platform to book **verified local service providers** for daily routine home work — not just plumbers and electricians, but maids (kaam wali bai), cooks, babysitters, elder care attendants, drivers, beauty services, pet care, laundry, gardening, and more.

**Core promise to customer:**  
*"Book a verified local service provider near you in 30 seconds. See the fixed price upfront. Pay only after the job is done. If they don't show up, you get a replacement or refund."*

---

## 2. Why Customers Will Use ServiGo (Instead of Calling Directly)

| Problem with Direct Call | ServiGo Solution |
|--------------------------|------------------|
| Don't know who is coming | Verified profiles with photo, ID, police verification badge |
| Price is vague / surprise charges | Fixed price shown before booking |
| No recourse if work is bad | Ratings & reviews that providers cannot delete |
| Pay cash, no proof | Escrow payment — money held by platform, released after "Job Complete" |
| Provider doesn't arrive, no backup | Replacement guarantee — another verified provider sent same day |
| Calling 5 people, no answer | Instant booking with online providers only |
| Language barrier | Language & gender filter (Hindi, Marathi, Tamil, female-only, etc.) |

---

## 3. Why Service Providers Will Join ServiGo

| Provider Pain | ServiGo Solution |
|---------------|------------------|
| No steady customers | Daily booking leads sent through app |
| Clients delay or refuse payment | Escrow ensures payment is held before job starts |
| No marketing budget | You bring customers; provider pays nothing to join |
| No work history / trust | Digital profile with ratings, completed jobs count |
| Rigid hours | Online/Offline toggle — work when they want |
| High upfront fee | Commission charged **only after they earn** (e.g., 10% per booking) |

---

## 4. Service Categories

Beyond repairs, ServiGo covers daily routine home services:

| Category | Examples |
|----------|----------|
| Home Help | Maid, cook, dishwasher, laundry/ironing |
| Care Services | Babysitter/nanny, elderly attendant, patient care |
| Beauty at Home | Mehndi, makeup, threading, facial, haircut |
| Pet Care | Dog walking, pet grooming, pet sitting |
| Driving & Car | Driver, car wash, car cleaning |
| Garden & Plants | Gardener, plant care, lawn mowing |
| Home Maintenance | Plumber, electrician, AC service, pest control |
| Events | Decorator, catering help, party babysitter |

---

## 5. Trust & Safety Pillars

1. **Document Verification:** Aadhaar, license, address proof uploaded by provider; admin approves before badge.
2. **Police Verification:** Mandatory for home-entry services (maid, cook, babysitter, driver).
3. **Verified Badge:** Shown only after document + phone verification.
4. **Escrow Payment:** Customer pays app first; money released to provider only after customer marks "Job Complete."
5. **Ratings & Reviews:** Public, cannot be deleted by provider.
6. **Replacement Guarantee:** If provider is a no-show, app arranges replacement same day.
7. **Cancellation & Refund Policy:** Clear rules for both sides.

---

## 6. System Architecture

```
┌─────────────┐      REST/JSON       ┌──────────────┐
│ Customer    │ ◄───────────────────► │ Node.js +    │
│ (App/Web)   │                      │ Express API  │
└─────────────┘                      └──────┬───────┘
                                           │
                              ┌────────────▼────────────┐
                              │   MongoDB Atlas         │
                              │   (Mongoose ODM)        │
                              └────────────┬────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    ▼                      ▼                      ▼
          ┌────────────┐            ┌────────────┐         ┌────────────┐
          │ Stripe /   │            │ Twilio /   │         │ Cloudinary │
          │ UPI / PayPal│           │ SMS OTP    │         │ Images     │
          └────────────┘            └────────────┘         └────────────┘
```

---

## 7. Data Models (Mongoose)

### 7.1 User
```javascript
{
  name: String,
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: String, // hashed
  role: { type: String, enum: ['customer', 'provider', 'admin'], default: 'customer' },
  language: [String], // ["Hindi", "English", "Marathi"]
  gender: { type: String, enum: ['male', 'female', 'other'] },
  isVerified: { type: Boolean, default: false },
  avatar: String,
  address: {
    street: String,
    city: String,
    pincode: String,
    coordinates: [Number] // [lng, lat]
  },
  createdAt: Date
}
```

### 7.2 Category
```javascript
{
  name: { type: String, required: true, unique: true }, // "Plumbing", "Maid Service"
  slug: String, // "plumbing", "maid-service"
  description: String,
  requiredDocuments: [String], // ["license", "id_proof"]
  isActive: { type: Boolean, default: true }
}
```

### 7.3 ProviderProfile
```javascript
{
  user: { type: ObjectId, ref: 'User', required: true },
  services: [String], // ["maid", "cooking", "elder_care"]
  categories: [{ type: ObjectId, ref: 'Category' }],
  experienceYears: Number,
  hourlyRate: Number,
  weeklyRate: Number,   // for subscription
  monthlyRate: Number,  // for subscription
  isVerified: { type: Boolean, default: false }, // admin approved
  isPoliceVerified: { type: Boolean, default: false },
  aadhaarVerified: { type: Boolean, default: false },
  idDocumentUrl: String,
  licenseUrl: String,
  addressProofUrl: String,
  portfolioImages: [String],
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  totalJobs: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  cancelledJobs: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
  pincode: String,
  languages: [String],
  genderPreference: String,
  verificationNotes: String,
  verifiedAt: Date,
  createdAt: Date
}
```

### 7.4 Service
```javascript
{
  title: { type: String, required: true }, // "Leakage Repair", "Daily Maid"
  category: { type: ObjectId, ref: 'Category' },
  description: String,
  basePrice: Number,
  durationMinutes: Number,
  provider: { type: ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}
```

### 7.5 Booking
```javascript
{
  customer: { type: ObjectId, ref: 'User' },
  provider: { type: ObjectId, ref: 'User' },
  service: { type: ObjectId, ref: 'Service' },
  serviceType: String, // "maid_daily", "plumbing_once"
  frequency: { type: String, enum: ['once', 'daily', 'weekly', 'monthly'], default: 'once' },
  startDate: Date,
  endDate: Date, // null if ongoing subscription
  timeSlot: String, // "09:00 AM - 12:00 PM"
  pricePerVisit: Number,
  totalPrice: Number,
  platformFee: Number,
  providerEarning: Number,
  paymentStatus: { type: String, enum: ['held', 'released', 'refunded'], default: 'held' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledAt: Date,
  completedAt: Date,
  replacementRequested: { type: Boolean, default: false },
  attendance: [{
    date: Date,
    checkIn: Date,
    checkOut: Date,
    customerConfirmed: Boolean
  }],
  rating: { stars: Number, comment: String },
  createdAt: Date
}
```

---

## 8. API Endpoints (REST)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Customer or provider signup |
| `POST` | `/api/auth/login` | Login (JWT) |
| `POST` | `/api/auth/verify-otp` | Phone/email verification |
| `GET` | `/api/categories` | List service categories |
| `GET` | `/api/services` | List all services |
| `GET` | `/api/services/:id` | Service detail |
| `GET` | `/api/providers` | List providers (filter by service, pincode, language, isOnline) |
| `GET` | `/api/providers/:id` | Provider profile |
| `POST` | `/api/bookings` | Create booking (holds payment) |
| `GET` | `/api/bookings` | My bookings (customer/provider) |
| `PATCH` | `/api/bookings/:id/accept` | Provider accepts booking |
| `PATCH` | `/api/bookings/:id/complete` | Mark job complete (releases payment) |
| `POST` | `/api/bookings/:id/review` | Add rating/review |
| `PATCH` | `/api/providers/:id/toggle-online` | Provider goes online/offline |
| `GET` | `/api/payments/wallet` | Provider earnings |

---

## 9. User Flows

### Flow A: Customer Books a Service
1. Open app → enter pincode/address
2. Choose category (maid, cook, plumber, etc.)
3. See verified, online providers nearby with price
4. Select date/time → fixed price shown upfront
5. Book → payment is **held** by platform
6. Provider notified → accepts/rejects
7. If no response in 10 mins → next provider notified automatically
8. Job day → provider checks in → customer gets notification
9. Job done → customer marks "Job Complete" → payment released to provider
10. Customer rates provider (1–5 stars + review)

### Flow B: Provider Joins & Works
1. Sign up as Provider → upload ID, license, photos
2. Admin verifies documents → `isVerified: true`
3. Add services offered + rates (hourly/weekly/monthly)
4. Toggle **Online** when available
5. Receive booking request → Accept/Decline within 10 mins
6. Arrive at customer location → check in via app
7. Finish job → customer marks complete → money released to wallet (minus platform fee)

### Flow C: Admin (You) Manages Platform
1. View pending provider verifications
2. Approve/reject documents
3. Monitor all bookings and disputes
4. Handle refunds if provider is no-show
5. Set platform commission %

---

## 10. Cold Start Strategy (Launch Plan)

| Phase | Action |
|-------|--------|
| **Week 1–2** | Pick ONE locality/society in your city. Manually onboard 20–30 verified providers (maids, cooks, drivers). |
| **Week 3–4** | Offer free leads to providers (0% commission) so they see value. Post in local WhatsApp/society groups. |
| **Month 2** | Target 50+ completed bookings. Enable paid commission (e.g., 10%). |
| **Month 3+** | Expand to next locality. Add subscription packages (monthly maid/cook plans). |

---

## 11. Git Branch Strategy (Separate Branches)

| Branch | Purpose | Status |
|--------|---------|--------|
| `main` | Stable production code | Initial commit only |
| `feature/server-setup` | Express server + MongoDB connection | ✅ Created & pushed |
| `feature/models` | Mongoose schemas (User, Provider, Category, Service, Booking) | In progress |
| `feature/routes` | API controllers & route wiring | Planned |
| `feature/auth` | JWT login, OTP verification, roles | Planned |
| `feature/payments` | Escrow payment integration | Planned |
| `feature/reviews` | Ratings & review system | Planned |

**Workflow for each feature:**
```bash
git checkout main
git pull
git checkout -b feature/<name>
# write code
git add <specific-file>
git commit -m "..."
git push origin feature/<name>
# after review:
git checkout main
git merge feature/<name>
```

> ⚠️ Never commit `.env`, `node_modules/`, or build outputs. Always add specific files, not `git add .` blindly.

---

## 12. Immediate Next Steps in Code

1. **Switch to models branch and merge main:**
   ```bash
   git checkout feature/models
   git merge main
   ```

2. **Create models:**
   - `backend/models/User.js`
   - `backend/models/ProviderProfile.js`
   - `backend/models/Category.js`
   - `backend/models/Service.js`
   - `backend/models/Booking.js`

3. **Install dependencies:**
   ```bash
   npm install bcryptjs jsonwebtoken
   ```

4. **Build routes:**
   - Auth routes (`/api/auth/*`)
   - Provider routes (`/api/providers/*`)
   - Booking routes (`/api/bookings/*`)

5. **Test locally:**
   ```bash
   node server.js
   # Visit http://localhost:5000
   ```

---

## 13. Unique Hook (Marketing Message)

> **"Ghar ke rozgar ke kaam ke liye verified bai, cook ya driver book karein. Fixed price, police-verified, aur agar na aaye toh replacement guarantee. Payment sirf kaam ke baad."**

**English:**  
*"Book a verified maid, cook, or driver for daily home work. Fixed price, police-verified, and if they don't show, replacement guarantee. Pay only after the job is done."*

---

**Document maintained by:** ServiGo Team  
**Last updated:** Nov 2026
