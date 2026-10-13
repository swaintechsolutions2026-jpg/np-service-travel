# NP Service – Build Plan

1. ✅ Brand system, fonts, logo mark, authentic photos organised in `public/img/np`
2. ✅ Public site: Home, Tours, Tour detail, 3 destination pages, About, Gallery (lightbox), FAQ, Contact, Booking Terms, Privacy
3. ✅ WhatsApp enquiry flow (validated form → reviewed, URL-encoded WhatsApp message), mobile Call/WhatsApp/Book bar, SEO + JSON-LD
4. ⏳ Admin dashboard route `/admin` (login screen at `/admin/login` exists; its "dashboard preview" link points to `/admin`, which is not built yet)
5. ⏳ Netlify Database: move `src/data/fixtures.ts` into tables (tours, departures, itinerary days, media, enquiries, activity, faqs, testimonials, content, settings, admin profiles); swap helpers in `src/lib/tours.ts`
6. ⏳ Save enquiries server-side (idempotency key, status workflow New → Closed), with honest success/error feedback
7. ⏳ Netlify Identity auth with admin roles; protect `/admin` and all admin server functions
8. ⏳ Admin modules: tours, departures, leads (search/filter/CSV), gallery uploads (Blobs), homepage content, settings, policies with deliberate publish, audit history, pending-verification queue
9. ⏳ Odia translations (operator-approved), sitemap.xml + robots.txt, final mobile/a11y/performance pass
