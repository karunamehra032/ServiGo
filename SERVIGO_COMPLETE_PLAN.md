# SERVIGO — Complete Business & Implementation Plan

**Project:** ServiGo  
**Type:** Local Services Marketplace (Daily Home Services)  
**Stack:** Node.js, Express, Mongoose, MongoDB Atlas  
**Location:** `C:\Projects\learning\ServiGo`  
**Date:** November 2026

---

## 1. EXECUTIVE SUMMARY

ServiGo is a local service booking platform for **daily routine home services** — maid (kaam wali bai), cook, driver, babysitter, elderly care, beauty at home, laundry, gardening, and home repairs (plumber/electrician).

**The Problem:**  
People find service providers through WhatsApp groups, neighbors, or random phone numbers. There is no:
- Verified identity (police check, ID proof)
- Fixed price before booking
- Payment safety (cash only, no receipt)
- Backup if provider doesn't show up
- Rating/review system
- Subscription for daily services

**The Solution:**  
An app where customers book verified providers near them at fixed prices, pay only after the job is done, and get a replacement guarantee if the provider doesn't come.

---

## 2. MARKET ANALYSIS

### Target Market
- Urban households in India (Tier 1 & Tier 2 cities initially)
- Working couples, single parents, elderly people living alone
- Families needing daily maid, cook, driver, or babysitter

### Market Size Indicators
- India's home services market is estimated at **$15+ billion**
- Urban Company (UrbanClap) alone raised hundreds of crores and is valued at thousands of crores
- Millions of households search daily for maids, cooks, and drivers via WhatsApp/Facebook groups

### Competition

| Competitor | What They Do | Weakness |
|------------|--------------|----------|
| Urban Company | One-time repairs, beauty, cleaning | No subscription model, no daily maid/cook focus, no replacement guarantee |
| Housejoy | Home cleaning, repairs | Similar to Urban Company |
| Justdial/Sulekha | Only phone directory | No booking, no payment, no verification |
| Local WhatsApp groups | Contact sharing | Zero trust, zero safety, zero backup |

### ServiGo's Positioning
Not a pan-India giant like Urban Company on Day 1. Instead:
- **Start local** (one city, one colony/society)
- **Focus on daily routine services** (maid, cook, driver — not just one-time AC repair)
- **Subscription + Replacement Guarantee** (unique in this segment)

---

## 3. VALUE PROPOSITION (Why Customers Will Use ServiGo)

| Customer Pain | ServiGo Solution |
|---------------|------------------|
| Don't know who is coming home | Verified profile + photo + police verification badge |
| Price is vague/hidden | Fixed price shown before booking (₹4,000/month maid, etc.) |
| Pay cash, no proof | Escrow payment — money held by app, released after job done |
| Provider doesn't arrive, no backup | Replacement guarantee — another verified provider same day |
| Calling 5 people, no one answers | Instant booking with online providers only |
| Language barrier | Language filter (Hindi, Marathi, Tamil) + gender filter |
| No attendance record | Daily check-in/check-out for maid/cook |

### Tagline
> **"Roz ka kaam — verified bai, cook ya driver. Fixed price, monthly plan, agar na aaye toh replacement guarantee. Payment sirf kaam ke baad."**

---

## 4. VALUE PROPOSITION FOR SERVICE PROVIDERS

Providers will join ServiGo because:

| Provider Pain | ServiGo Solution |
|---------------|------------------|
| No steady customers | Daily booking leads from app |
| Clients don't pay on time | Escrow ensures payment is secured before job starts |
| No marketing budget | ServiGo brings customers; provider pays nothing to join |
| No work history/proof | Digital profile with ratings, completed jobs count |
| Fixed office hours | Online/Offline toggle — work when they want |
| High joining fee | Commission charged **only after they earn** (e.g., 10% per booking) |

---

## 5. TARGET USERS

### Customer Side
- Working professionals (couples)
- Senior citizens needing attendant/cook
- Parents needing babysitter/nanny
- Families needing daily maid/cook

### Provider Side
- Maids, cooks, dishwashers
- Drivers (personal car/office)
- Babysitters, elderly care attendants
- Beauticians (home service)
- Plumbers, electricians, AC technicians
- Gardeners, pet care providers

---

## 6. REVENUE MODEL

ServiGo makes money through **commission only after provider earns**:

| Source | Model |
|--------|-------|
| Provider Commission | 10%–15% of each booking (deducted from provider's earning) |
| Customer Platform Fee | Small convenience fee (₹10–₹30 per booking) |
| Subscription Plans | Monthly maid/cook packages (ServiGo takes platform cut) |
| Featured Listing | Providers can pay to appear at top of search results |

**Important:** No joining fee for providers. No monthly subscription for providers to be on platform. Money is made only when transactions happen.

---

## 7. HOW IT WORKS IN MARKET (STEP-BY-STEP)

### Phase 1: Customer Journey
1. Customer downloads app / visits website
2. Enters pincode/address
3. Selects service (maid, cook, driver, plumber, etc.)
4. Sees list of **verified, online providers nearby** with:
   - Photo
   - Rating (4.5/5, 12 reviews)
   - Fixed price (₹4,000/month or ₹200/visit)
   - Languages spoken
   - Availability
5. Customer selects date/time slot
6. Books → Payment is **held** by ServiGo (not charged to provider yet)
7. Provider gets notification → Accepts/Rejects within 10 minutes
8. If provider rejects or doesn't respond → Next nearest provider is notified automatically
9. Job day → Provider checks in via app → Customer gets notification
10. Job complete → Customer clicks "Job Complete" → Payment released to provider
11. Customer rates provider (1–5 stars + comment)

### Phase 2: Provider Journey
1. Provider signs up with phone number
2. Uploads ID proof (Aadhaar), license (if applicable), photos
3. Admin verifies documents → marks `isVerified: true`
4. Provider adds services offered + rates (hourly/weekly/monthly)
5. Provider toggles **Online** when available for work
6. Receives booking requests → Accept/Decline
7. Completes job → Customer confirms → Money released to provider's wallet
8. Provider can withdraw money to bank account weekly

---

## 8. TRUST & SAFETY MODEL (Critical for Home Services)

| Feature | Implementation |
|---------|----------------|
| ID Verification | Aadhaar/Passport uploaded, verified by admin |
| Police Verification | Mandatory for home-entry services (maid, cook, driver, babysitter) |
| Verified Badge | Shown on profile only after document + phone verification |
| Ratings & Reviews | Public, cannot be deleted by provider |
| Escrow Payment | Customer pays app first; money released after job marked complete |
| Replacement Guarantee | If provider is no-show, app arranges replacement same day at no extra cost |
| Cancellation Policy | Clear rules: customer cancels <24hrs = small fee; provider cancels = penalty |
| SOS/Emergency | In-app emergency contact during active booking |

---

## 9. TECHNOLOGY STACK

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| OTP/SMS | Twilio or MSG91 (India) |
| Payment | Razorpay / Stripe / PayU (India UPI + Cards) |
| File Upload | Cloudinary (ID proofs, profile photos) |
| Hosting | Render / Railway / AWS (start small) |
| Frontend | React / Next.js (later), or simple HTML for MVP |

---

## 10. DATA MODELS (Core)

### User
- name, email, phone, password (hashed)
- role: customer / provider / admin
- language, gender, address, pincode
- isVerified, avatar, createdAt

### Category
- name (Plumbing, Maid Service, Cooking), slug, requiredDocuments

### ProviderProfile
- user (ref), services array, experienceYears, hourlyRate, weeklyRate, monthlyRate
- isVerified, isPoliceVerified, aadhaarVerified
- idDocumentUrl, licenseUrl, portfolioImages
- rating (average, count), totalJobs, completedJobs
- isOnline, pincode, languages, genderPreference
- verificationNotes, verifiedAt

### Service
- title, category (ref), description, basePrice, durationMinutes, provider (ref), isActive

### Booking
- customer, provider, service (refs)
- serviceType, frequency (once/daily/weekly/monthly)
- startDate, endDate, timeSlot
- pricePerVisit, totalPrice, platformFee, providerEarning
- paymentStatus: held / released / refunded
- status: pending / accepted / rejected / scheduled / in_progress / completed / cancelled
- attendance: [{ date, checkIn, checkOut, customerConfirmed }]
- rating: { stars, comment }

---

## 11. API ENDPOINTS (MVP)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Sign up (customer/provider) |
| POST | `/api/auth/login` | Login (JWT) |
| POST | `/api/auth/verify-otp` | Phone verification |
| GET | `/api/categories` | List service categories |
| GET | `/api/services` | List services |
| GET | `/api/providers` | Filter providers by service, pincode, online status |
| GET | `/api/providers/:id` | Provider profile |
| POST | `/api/bookings` | Create booking (holds payment) |
| GET | `/api/bookings` | My bookings |
| PATCH | `/api/bookings/:id/accept` | Provider accepts |
| PATCH | `/api/bookings/:id/complete` | Mark complete (release payment) |
| POST | `/api/bookings/:id/review` | Add rating |
| PATCH | `/api/providers/:id/toggle-online` | Go online/offline |

---

## 12. GO-TO-MARKET STRATEGY (Launch Plan)

### Phase 1: Hyperlocal Launch (Month 1–2)
- Pick **one city** and **one colony/society** (e.g., your own locality)
- Manually onboard **20–30 verified providers** (maids, cooks, drivers)
- Verify their IDs personally
- Post in local WhatsApp groups, society notice boards
- Offer **0% commission for first 2 weeks** to providers so they see value
- Target **50 completed bookings**

### Phase 2: Paid Commission (Month 3)
- Enable 10% commission after providers see steady bookings
- Add monthly subscription plans (maid ₹4,000/month, cook ₹6,000/month)
- Add replacement guarantee feature

### Phase 3: Expansion (Month 4–6)
- Expand to next locality in same city
- Add beauty services, pet care, gardening
- Launch customer mobile app (React Native/Flutter)

---

## 13. OPERATIONS (Who Does What)

| Role | Responsibility |
|------|----------------|
| Admin (You) | Verify provider documents, approve/reject providers, handle disputes, set commission % |
| Customer | Book services, pay via app, mark job complete, leave ratings |
| Provider | Accept bookings, do the work, check in/out, maintain quality |
| Payment Gateway | Handles UPI/Card payments, transfers to provider wallet |

---

## 14. RISKS & MITIGATION

| Risk | Mitigation |
|------|------------|
| Provider doesn't show up | Replacement guarantee + penalty for provider |
| Customer refuses to pay after job | Escrow — payment already held by platform |
| Fake provider joins | Police verification + ID proof + admin approval before badge |
| Bad review fake war | Reviews linked to completed bookings only |
| Payment disputes | Clear terms + escrow + admin mediation |
| Low provider supply in new area | Manual onboarding first, then scale |

---

## 15. SUCCESS METRICS (KPIs)

| Metric | Target (Month 3) |
|--------|-----------------|
| Verified providers onboarded | 50+ |
| Monthly bookings | 200+ |
| Completion rate | 90%+ |
| Customer retention (repeat booking) | 40%+ |
| Provider earnings (avg/month) | ₹15,000+ |

---

## 16. IMPLEMENTATION TIMELINE (Technical)

| Week | Task |
|------|------|
| Week 1 | Setup backend, MongoDB connection, User model, Auth routes |
| Week 2 | Category, Service, ProviderProfile models + routes |
| Week 3 | Booking model + routes, payment hold logic |
| Week 4 | Reviews, ratings, provider online/offline toggle |
| Week 5 | Test locally, fix bugs, prepare for deployment |
| Week 6 | Deploy, manual provider onboarding, soft launch |

---

## 17. GIT BRANCH STRATEGY

| Branch | Purpose |
|--------|---------|
| `main` | Stable production-ready code |
| `feature/server-setup` | ✅ Done — Express + MongoDB connection |
| `feature/models` | User, Category, ProviderProfile, Service, Booking models |
| `feature/routes` | Auth, provider, booking API routes |
| `feature/auth` | JWT login, OTP, roles |
| `feature/payments` | Escrow payment integration |
| `feature/reviews` | Ratings & review system |

**Rule:** Never commit `.env` or `node_modules`. Always add specific files, never `git add .` blindly.

---

## 18. IMMEDIATE NEXT STEPS

1. **Read** `PROJECT_PLAN.md` (technical models) and this document (business plan)
2. **Switch to `feature/models` branch** and create models one by one
3. **Start with `User.js`** — customer + provider roles, language, gender, address
4. **Build auth routes** (`/api/auth/register`, `/api/auth/login`)
5. **Test locally** with `node server.js`

---

**Bottom Line:** ServiGo will not beat Urban Company on Day 1. It will win by focusing on **daily home help (maid/cook/driver)**, **fixed subscription pricing**, **police-verified providers**, and **replacement guarantee** — all in one local area first.
