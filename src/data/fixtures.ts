/**
 * Seed content for NP Service – Tour & Travels.
 *
 * Every record here mirrors a planned database table (see PLAN.md). Later milestones
 * swap these exports for Netlify Database queries; components only consume them through
 * the helpers in `src/lib/tours.ts`, so the swap stays in one place.
 *
 * Verification rules (non-negotiable):
 * - Only `approval: 'confirmed'` departures and prices are ever shown publicly.
 * - Pending source claims live in `pendingSourceNotes` and are admin-only.
 */

export type Approval = 'confirmed' | 'pending_verification' | 'draft' | 'archived'
export type PublishStatus = 'draft' | 'pending_review' | 'published' | 'archived'
export type RegionSlug = 'north-india' | 'south-india' | 'darjeeling-sikkim'
export type TourTag = 'hill-station' | 'pilgrimage'

export interface Departure {
  id: string
  tourId: string
  /** ISO date, YYYY-MM-DD (Asia/Kolkata) */
  date: string
  time?: string
  city: string
  /** Confirmed operator pickup points only */
  pickupPoints: string[]
  seatPrice?: number
  sleeperPrice?: number
  advanceAmount?: number
  /** Null when the operator has not entered actual capacity — never infer it */
  capacity: number | null
  reserved: number | null
  bookingStatus: 'open' | 'closed'
  approval: Approval
  notes?: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  status: 'confirmed' | 'to_be_confirmed'
}

export interface Tour {
  id: string
  slug: string
  name: string
  region: RegionSlug
  tags: TourTag[]
  tagline: string
  summary: string
  overview: string[]
  durationDays?: number
  departureCity?: string
  destinations: string[]
  /** Shown beside the destination list when it is not yet tied to a confirmed itinerary */
  destinationsNote?: string
  highlights: { place: string; items: string[] }[]
  inclusions: string[]
  /** Admin-managed exclusion headings; `detail` stays empty until the operator approves wording */
  exclusions: { label: string; detail?: string }[]
  importantNotes: string[]
  travelAndStay: string[]
  itinerary: ItineraryDay[]
  image: string
  imageAlt: string
  galleryIds: string[]
  ctaLabel: string
  publishStatus: PublishStatus
  approval: Approval
  isFeatured: boolean
}

export const siteSettings = {
  businessName: 'NP Service – Tour & Travels',
  displayName: 'NP SERVICE',
  descriptor: 'Tour & Travels',
  tagline: 'Service You Trust Since 1992',
  established: 1992,
  address: {
    line1: 'Badaligan',
    city: 'Baripada',
    state: 'Odisha',
    postalCode: '757017',
    country: 'India',
  },
  phones: {
    primary: { display: '+91 98617 17404', e164: '+919861717404' },
    secondary: { display: '+91 94383 07102', e164: '+919438307102' },
  },
  whatsapp: { display: '+91 98617 17404', number: '919861717404' },
  siteUrl: 'https://np-service-travel.netlify.app',
  /** Business hours have not been supplied yet */
  workingHours: null as string | null,
  /** Map embed stays hidden until a verified office location is approved */
  mapEmbedUrl: null as string | null,
  socials: [
    { platform: 'Instagram', url: 'https://www.instagram.com/npservice.official/', status: 'source_provided' },
    { platform: 'Facebook', url: 'https://www.facebook.com/share/17h9N7Cwob/', status: 'source_provided' },
    { platform: 'YouTube', url: 'https://www.youtube.com/@npservice1992', status: 'source_provided' },
  ] as { platform: string; url: string; status: 'source_provided' | 'verified' | 'hidden' }[],
}

/** Admin-only fields awaiting the operator's confirmation. Never rendered publicly. */
export const pendingSettings = [
  { field: 'Proprietor name', values: ['Sumant Mahakud', 'Sumanta Mohakud'], note: 'Two spellings appear in supplied materials. Confirm the official spelling before display.' },
  { field: 'Official public email', values: ['npservice1992@gmail.com', 'npservices.travels@gmail.com'], note: 'Two addresses appear in supplied materials. Choose one official address.' },
  { field: 'Additional phone numbers', values: ['+91 63706 53435', '+91 98616 99912'], note: 'Listed on promotional brochures. Unpublished until use is confirmed.' },
  { field: 'Social media links', values: ['Instagram', 'Facebook', 'YouTube'], note: 'Source-provided links. Verify each before they appear in the footer and contact page.' },
  { field: 'Business working hours', values: [], note: 'Not supplied yet.' },
  { field: 'Office map location', values: [], note: 'Embed a map only after the exact office location is approved.' },
]

const tbc = (day: number): ItineraryDay => ({
  day,
  title: `Day ${day}`,
  description: 'Detailed schedule to be confirmed by NP Service.',
  status: 'to_be_confirmed',
})

export const tours: Tour[] = [
  {
    id: 'tour-darjeeling-gangtok',
    slug: 'darjeeling-gangtok-scenic-tour',
    name: 'Darjeeling & Gangtok Scenic Tour',
    region: 'darjeeling-sikkim',
    tags: ['hill-station'],
    tagline: 'Tea gardens, Himalayan sunrises and the high passes of Sikkim',
    summary:
      'Discover tea gardens, Himalayan scenery, peaceful monasteries and the breathtaking landscapes of Darjeeling and Sikkim.',
    overview: [
      'An organized 8-day group journey from Bhubaneswar to the Eastern Himalaya, travelling by AC coach through Mayapur and Siliguri to the hill town of Darjeeling and on to Gangtok in Sikkim.',
      'Watch the first light touch Kanchenjunga from Tiger Hill, walk among rolling tea estates, visit monasteries and sacred sites, and travel up to the high-altitude lakes of Sikkim — with the NP Service team coordinating travel, stays and meals along the way.',
    ],
    durationDays: 8,
    departureCity: 'Bhubaneswar',
    destinations: ['Mayapur', 'Siliguri', 'Darjeeling', 'Sikkim', 'Gangtok', 'Nathula Pass', 'Batasia Loop', 'Kanchenjunga viewpoints'],
    highlights: [
      { place: 'Mayapur', items: ['ISKCON Temple', 'Pilgrimage places', 'Chaitanya Mahaprabhu-related sites'] },
      { place: 'Siliguri', items: ['City sightseeing', 'Local markets', 'ISKCON Temple', 'Other listed regional attractions'] },
      {
        place: 'Darjeeling',
        items: ['Tiger Hill sunrise views', 'Tea gardens', 'Batasia Loop', 'Ghoom Monastery', 'Darjeeling Himalayan Railway sightseeing', 'Ropeway sightseeing', 'Himalayan & Kanchenjunga views'],
      },
      {
        place: 'Sikkim & Gangtok',
        items: ['Tsomgo (Changu) Lake', 'Ganesh Tok', 'Waterfalls', 'Baba Harbhajan Singh Temple', 'Nathula Pass excursion*'],
      },
    ],
    inclusions: [
      'Organized AC coach travel',
      'Seat or sleeper choice where available',
      'Hotel accommodation',
      "Three meals per day under the operator's specified meal arrangements",
      'Vegetarian and non-vegetarian food options as described',
      'Group tour coordination',
      'Sightseeing support',
      'Guide assistance',
    ],
    exclusions: [
      { label: 'Permit charges' },
      { label: 'Optional attractions' },
      { label: 'Personal expenses' },
      { label: 'Special travel requirements' },
      { label: 'Meal exceptions' },
      { label: 'Other exclusions' },
    ],
    importantNotes: [
      'Nathula Pass and other high-altitude excursions depend on government permits, weather and local restrictions on the day. Access cannot be guaranteed.',
      'The tour brochure contains exceptions concerning lunch during sightseeing and occasional meal arrangements. The final English and Odia wording is being approved by NP Service and will be published here.',
      'Carry valid identity documents, travel essentials, drinking water and any personal medication.',
    ],
    travelAndStay: [
      'Departure from Bhubaneswar at 8:00 AM on the confirmed date.',
      'AC coach travel with seat or sleeper options — choose your preference when you enquire.',
      'Hotel accommodation arranged by NP Service. Hotel names and categories are shared by the team on confirmation.',
    ],
    itinerary: Array.from({ length: 8 }, (_, i) => tbc(i + 1)),
    image: '/img/hero-darjeeling.png',
    imageAlt: 'Sunrise over the Kanchenjunga range above Darjeeling tea gardens',
    galleryIds: ['brochure-kanchenjunga', 'brochure-tea-garden', 'brochure-toy-train', 'brochure-batasia', 'brochure-tsomgo', 'brochure-nathula', 'brochure-mayapur'],
    ctaLabel: 'Explore Package',
    publishStatus: 'published',
    approval: 'confirmed',
    isFeatured: true,
  },
  {
    id: 'tour-north-india',
    slug: 'north-india-sacred-journey',
    name: 'North India Sacred Journey',
    region: 'north-india',
    tags: ['pilgrimage'],
    tagline: 'From Ayodhya to the ghats of Varanasi',
    summary:
      'A pilgrimage journey across the sacred towns of North India — temples, river ghats and timeless heritage, travelled together as a group.',
    overview: [
      'NP Service organizes group pilgrimages to the holy cities of North India. Destinations featured in our promotional journeys include Mathura, Vrindavan, Ayodhya, Prayagraj, Gaya, Bodh Gaya, Varanasi and Agra.',
      'Each departure has its own confirmed itinerary. Contact NP Service for upcoming departure dates, the exact route and the latest package price.',
    ],
    destinations: ['Mathura', 'Vrindavan', 'Ayodhya', 'Prayagraj', 'Gaya', 'Bodh Gaya', 'Varanasi', 'Agra'],
    destinationsNote: 'Candidate itinerary highlights — not every departure includes every location.',
    highlights: [],
    inclusions: [],
    exclusions: [],
    importantNotes: ['Departure dates, inclusions and pricing are confirmed individually for each departure.'],
    travelAndStay: ['Organized coach travel. Accommodation, meals and guide support are confirmed per departure.'],
    itinerary: [],
    image: '/img/dest-north-india.png',
    imageAlt: 'Temples and river ghats along the Ganges in Varanasi at dawn',
    galleryIds: ['group-taj-mahal', 'group-bodh-gaya'],
    ctaLabel: 'Request Tour Details',
    publishStatus: 'published',
    approval: 'pending_verification',
    isFeatured: false,
  },
  {
    id: 'tour-south-india',
    slug: 'south-india-divine-darshan-tour',
    name: 'South India Divine Darshan Tour',
    region: 'south-india',
    tags: ['pilgrimage'],
    tagline: 'Temple towns of the south, from Puri to Kanyakumari',
    summary:
      "A devotional journey to South India's great temples and coastal pilgrimage sites, organized for families and groups from Odisha.",
    overview: [
      'Destinations featured in our South India promotional journeys include Puri, Tirupati, Rameshwaram, Kanyakumari, Padmanabhaswamy Temple, the Ram Setu area, Vijayawada Kanaka Durga Temple and Simhachalam.',
      'The final destination list is confirmed with each departure. Enquire with NP Service for the upcoming schedule and package price.',
    ],
    destinations: ['Puri', 'Tirupati', 'Rameshwaram', 'Kanyakumari', 'Padmanabhaswamy Temple', 'Ram Setu', 'Kanaka Durga Temple', 'Simhachalam'],
    destinationsNote: 'Candidate destinations — the final list is linked to each confirmed itinerary.',
    highlights: [],
    inclusions: [],
    exclusions: [],
    importantNotes: ['Departure dates, inclusions and pricing are confirmed individually for each departure.'],
    travelAndStay: ['Organized coach travel. Accommodation, meals and guide support are confirmed per departure.'],
    itinerary: [],
    image: '/img/dest-south-india.png',
    imageAlt: 'Ornate South Indian temple gopuram at golden hour',
    galleryIds: [],
    ctaLabel: 'Enquire Now',
    publishStatus: 'published',
    approval: 'pending_verification',
    isFeatured: false,
  },
]

export const departures: Departure[] = [
  {
    id: 'dep-darjeeling-2026-10-17',
    tourId: 'tour-darjeeling-gangtok',
    date: '2026-10-17',
    time: '8:00 AM',
    city: 'Bhubaneswar',
    pickupPoints: ['Bhubaneswar'],
    seatPrice: 17500,
    sleeperPrice: 19500,
    advanceAmount: 5000,
    capacity: null,
    reserved: null,
    bookingStatus: 'open',
    approval: 'confirmed',
    notes: 'Source: Darjeeling tour brochure. Remaining availability is not confirmed and is managed by admin.',
  },
]

/** Promotional claims that are NOT sufficient to publish. Admin review queue only. */
export const pendingSourceNotes = [
  { id: 'pn-1', tourId: 'tour-north-india', claim: 'October 17 departure (year and package not established)', kind: 'date' },
  { id: 'pn-2', tourId: 'tour-north-india', claim: 'December 6 departure', kind: 'date' },
  { id: 'pn-3', tourId: 'tour-north-india', claim: 'December 23 departure', kind: 'date' },
  { id: 'pn-4', tourId: 'tour-north-india', claim: 'January 23 departure', kind: 'date' },
  { id: 'pn-5', tourId: 'tour-north-india', claim: '₹10,500 for certain North India pilgrimages', kind: 'price' },
  { id: 'pn-6', tourId: 'tour-south-india', claim: 'December 19 departure', kind: 'date' },
  { id: 'pn-7', tourId: 'tour-south-india', claim: 'December 22 departure', kind: 'date' },
  { id: 'pn-8', tourId: 'tour-south-india', claim: 'All South India package prices (unspecified)', kind: 'price' },
  { id: 'pn-9', tourId: 'tour-darjeeling-gangtok', claim: 'Exact day-by-day itinerary allocation', kind: 'itinerary' },
  { id: 'pn-10', tourId: 'tour-darjeeling-gangtok', claim: 'Boarding points beyond Bhubaneswar', kind: 'pickup' },
  { id: 'pn-11', tourId: 'tour-darjeeling-gangtok', claim: 'Permit charges and optional attraction costs', kind: 'policy' },
  { id: 'pn-12', tourId: 'tour-darjeeling-gangtok', claim: 'Final cancellation and meal-exception wording (English & Odia)', kind: 'policy' },
] as const

export interface RegionContent {
  slug: RegionSlug
  eyebrow: string
  title: string
  intro: string
  image: string
  imageAlt: string
  places: { name: string; note: string }[]
  features: string[]
  scheduleNotice?: string
}

export const regions: RegionContent[] = [
  {
    slug: 'darjeeling-sikkim',
    eyebrow: 'Eastern Himalaya',
    title: 'Darjeeling & Sikkim Tours',
    intro:
      'Mist over tea estates, sunrise on Kanchenjunga, monasteries and high-altitude lakes — the Eastern Himalaya, travelled together from Odisha.',
    image: '/img/dest-gangtok.png',
    imageAlt: 'Glacial Tsomgo Lake surrounded by snowy mountains in Sikkim',
    places: [
      { name: 'Darjeeling', note: 'Tiger Hill, tea gardens, Batasia Loop and Ghoom Monastery' },
      { name: 'Gangtok', note: 'Ganesh Tok, waterfalls and the capital of Sikkim' },
      { name: 'Tsomgo Lake', note: 'High-altitude glacial lake (subject to permits)' },
      { name: 'Nathula Pass', note: 'Excursion subject to permits, weather and restrictions' },
      { name: 'Mayapur', note: 'ISKCON Temple and Chaitanya Mahaprabhu-related sites' },
      { name: 'Siliguri', note: 'Gateway city, markets and ISKCON Temple' },
    ],
    features: ['AC coach travel', 'Seat or sleeper options', 'Hotel accommodation', 'Organized meals', 'Guide assistance'],
  },
  {
    slug: 'north-india',
    eyebrow: 'Pilgrimage · North India',
    title: 'Sacred Journeys Across North India',
    intro:
      'Walk the ghats of Varanasi, offer prayers in Ayodhya and Vrindavan, and stand before the Taj Mahal — a respectful, organized pilgrimage for families and groups.',
    image: '/img/dest-north-india.png',
    imageAlt: 'Varanasi ghats along the Ganges at dawn with temple spires',
    places: [
      { name: 'Ayodhya', note: 'Shri Ram Janmabhoomi Mandir' },
      { name: 'Mathura', note: 'Birthplace of Lord Krishna' },
      { name: 'Vrindavan', note: 'Temples of Krishna devotion' },
      { name: 'Prayagraj', note: 'Triveni Sangam' },
      { name: 'Gaya', note: 'Vishnupad Temple' },
      { name: 'Bodh Gaya', note: 'Mahabodhi Temple, a World Heritage Site' },
      { name: 'Varanasi', note: 'Kashi Vishwanath and the Ganga ghats' },
      { name: 'Agra', note: 'The Taj Mahal' },
    ],
    features: ['Spiritual destinations', 'Organized group travel', 'Coach journey', 'Accommodation when confirmed', 'Meals and guide support when confirmed'],
    scheduleNotice: 'Contact NP Service for upcoming departure dates and package details.',
  },
  {
    slug: 'south-india',
    eyebrow: 'Pilgrimage · South India',
    title: 'Experience the Divine Beauty of South India',
    intro:
      'Great temple towers, sacred shores and centuries of devotion — a darshan journey through the holy places of the south.',
    image: '/img/dest-south-india.png',
    imageAlt: 'Towering sculpted temple gopuram in South India at golden hour',
    places: [
      { name: 'Puri', note: 'Shree Jagannath Dham' },
      { name: 'Tirupati', note: 'Sri Venkateswara Temple' },
      { name: 'Rameshwaram', note: 'Ramanathaswamy Temple' },
      { name: 'Ram Setu', note: 'Dhanushkodi and the Ram Setu area' },
      { name: 'Kanyakumari', note: 'Where three seas meet' },
      { name: 'Thiruvananthapuram', note: 'Padmanabhaswamy Temple, Kerala' },
      { name: 'Vijayawada', note: 'Kanaka Durga Temple' },
      { name: 'Simhachalam', note: 'Varaha Lakshmi Narasimha Temple' },
    ],
    features: ['Temple darshan journeys', 'Organized group travel', 'Coach journey', 'Accommodation when confirmed', 'Meals and guide support when confirmed'],
    scheduleNotice: 'Contact NP Service for upcoming departure dates and package details.',
  },
]

export type GalleryCategory = 'buses' | 'past-tours' | 'memories' | 'destinations' | 'food'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption: string
  category: GalleryCategory
  /** True only for genuine NP Service photographs */
  authentic: boolean
  credit: string
}

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'buses', label: 'Our Buses' },
  { id: 'past-tours', label: 'Past Tours' },
  { id: 'memories', label: 'Happy Travel Memories' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'food', label: 'Food & Accommodation' },
]

export const gallery: GalleryItem[] = [
  { id: 'bus-np', src: '/img/np/bus-np-service-ac-sleeper.png', alt: 'White and blue NP Service AC sleeper coach parked beside trees', caption: 'NP Service 2x2 AC sleeper coach', category: 'buses', authentic: true, credit: 'NP Service' },
  { id: 'group-taj', src: '/img/np/group-taj-mahal.png', alt: 'A large NP Service travel group posing in front of the Taj Mahal', caption: 'Our travellers at the Taj Mahal, Agra', category: 'past-tours', authentic: true, credit: 'NP Service' },
  { id: 'group-bodh-gaya', src: '/img/np/group-bodh-gaya.png', alt: 'Family group standing at the entrance of the Mahabodhi Mahavihara Temple', caption: 'At the Mahabodhi Temple, Bodh Gaya', category: 'past-tours', authentic: true, credit: 'NP Service' },
  { id: 'group-coach-large', src: '/img/np/group-coach-large.png', alt: 'A big tour group of families gathered in front of their sleeper coach', caption: 'The whole group, ready for the road', category: 'memories', authentic: true, credit: 'NP Service' },
  { id: 'group-coach-travellers', src: '/img/np/group-coach-travellers.png', alt: 'Male travellers smiling together in front of a tour coach', caption: 'Friends made on the journey', category: 'memories', authentic: true, credit: 'NP Service' },
  { id: 'group-coach-small', src: '/img/np/group-coach-small.png', alt: 'Small group of travellers posing beside a double-deck sleeper coach', caption: 'A travel break with the group', category: 'memories', authentic: true, credit: 'NP Service' },
  { id: 'group-coach-family', src: '/img/np/group-coach-family.png', alt: 'Travellers and a young child in front of a sleeper coach', caption: 'Family travellers on tour', category: 'memories', authentic: true, credit: 'NP Service' },
  { id: 'meal-serving', src: '/img/np/meal-roadside-serving.png', alt: 'Travellers being served a freshly cooked meal beside the tour coach', caption: 'Meals served fresh during the journey', category: 'food', authentic: true, credit: 'NP Service' },
  { id: 'meal-veg', src: '/img/np/meal-thali-veg.png', alt: 'Vegetarian thali with rice, pulao, curry, dal and papad', caption: 'A vegetarian thali on tour', category: 'food', authentic: true, credit: 'NP Service' },
  { id: 'meal-nonveg', src: '/img/np/meal-thali-nonveg.png', alt: 'Thali with rice, dal, fish fry, vegetables, curd and papad', caption: 'A non-vegetarian thali on tour', category: 'food', authentic: true, credit: 'NP Service' },
  { id: 'brochure-kanchenjunga', src: '/img/np/brochure-kanchenjunga.png', alt: 'Kanchenjunga peaks glowing at sunrise', caption: 'Kanchenjunga at sunrise', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
  { id: 'brochure-tea-garden', src: '/img/np/brochure-tea-garden.png', alt: 'Workers picking leaves on a steep Darjeeling tea garden', caption: 'Darjeeling tea gardens', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
  { id: 'brochure-toy-train', src: '/img/np/brochure-toy-train.png', alt: 'Steam locomotive of the Darjeeling Himalayan Railway', caption: 'Darjeeling Himalayan Railway', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
  { id: 'brochure-batasia', src: '/img/np/brochure-batasia-loop.png', alt: 'Batasia Loop war memorial and gardens in Darjeeling', caption: 'Batasia Loop, Darjeeling', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
  { id: 'brochure-tsomgo', src: '/img/np/brochure-tsomgo-lake.png', alt: 'Visitors with yaks beside snowy Tsomgo Lake', caption: 'Tsomgo Lake, Sikkim', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
  { id: 'brochure-nathula', src: '/img/np/brochure-nathula.png', alt: 'Welcome sign at Nathu La pass surrounded by snow', caption: 'Nathula Pass, Sikkim', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
  { id: 'brochure-mayapur', src: '/img/np/brochure-mayapur.png', alt: 'Blue and gold domed temple of ISKCON Mayapur', caption: 'ISKCON temple, Mayapur', category: 'destinations', authentic: false, credit: 'Darjeeling brochure image' },
]

export interface Faq {
  id: string
  question: string
  answer: string
  language: 'en' | 'or'
}

export const faqs: Faq[] = [
  { id: 'f1', language: 'en', question: 'How can I book an NP Service tour?', answer: 'Choose a tour, then send an enquiry through the booking form, WhatsApp us on +91 98617 17404 or call us directly. Our team will contact you to discuss availability, booking requirements and payment instructions. A booking is confirmed only when NP Service confirms it with you.' },
  { id: 'f2', language: 'en', question: 'Where do NP Service tours depart from?', answer: 'Each departure has its own confirmed starting point. The Darjeeling & Gangtok tour on 17 October 2026 departs from Bhubaneswar at 8:00 AM. For other tours, the departure city is shared once the schedule is confirmed.' },
  { id: 'f3', language: 'en', question: 'Are AC buses available?', answer: 'The Darjeeling & Gangtok tour includes organized AC coach travel with seat or sleeper choice where available. Vehicle details for other tours are confirmed with each departure.' },
  { id: 'f4', language: 'en', question: 'Are meals included in tour packages?', answer: "For the Darjeeling & Gangtok tour, three meals per day are included under the operator's specified meal arrangements, with vegetarian and non-vegetarian options. The brochure notes exceptions for lunch during some sightseeing days — please read the Booking Terms and ask our team for details." },
  { id: 'f5', language: 'en', question: 'What accommodation is provided?', answer: 'Hotel accommodation is included in the Darjeeling & Gangtok package. Hotel names and categories are shared by our team when you confirm. Accommodation for other tours is confirmed per departure.' },
  { id: 'f6', language: 'en', question: 'Can I enquire from anywhere in Odisha?', answer: 'Yes — you can enquire from anywhere by phone, WhatsApp or the booking form. Please note that buses board only at the confirmed pickup points listed for each departure, not in every town.' },
  { id: 'f7', language: 'en', question: 'Are seat and sleeper options available?', answer: 'On the Darjeeling & Gangtok tour, yes: Seat ₹17,500 and Sleeper ₹19,500 per person. Options for other tours are confirmed with each departure.' },
  { id: 'f8', language: 'en', question: 'What documents are required?', answer: 'Carry a valid government photo identity document for every traveller. Some destinations, such as Nathula Pass, need permits that require identity documents. Our team will tell you exactly what to bring for your tour.' },
  { id: 'f9', language: 'en', question: 'How does tour cancellation work?', answer: 'The booking advance follows a restrictive refund policy, and cancellations made at least 10 days before travel may be eligible for a conditional tour credit — this is not a cash refund. Please read the Booking Terms for the full conditions before you book.' },
  { id: 'f10', language: 'en', question: 'How will I receive my booking confirmation?', answer: 'Submitting an enquiry does not confirm a booking. Our team contacts you directly by phone or WhatsApp, explains the payment instructions and confirms your reservation once the booking requirements are completed.' },
]

/** Only administrator-approved testimonials. None have been supplied yet. */
export const testimonials: { id: string; customerName: string; review: string; tour?: string; date?: string; photo?: string; isApproved: boolean }[] = []

export interface PolicySection {
  id: string
  title: string
  body: string[]
  status: 'source_based' | 'approved'
}

export const bookingTerms: PolicySection[] = [
  { id: 'advance', title: 'Booking advance', status: 'source_based', body: ['For the Darjeeling & Gangtok tour departing 17 October 2026, a booking advance of ₹5,000 per traveller is required, subject to the booking conditions stated in the tour brochure.', 'Advance amounts for other tours are confirmed with each departure.'] },
  { id: 'refund', title: 'Advance refund policy', status: 'source_based', body: ['The tour brochure states a restrictive refund policy for the booking advance. Please do not treat the advance as refundable. Ask our team to explain the conditions before you pay.'] },
  { id: 'cancellation', title: 'Cancellation & tour credit', status: 'source_based', body: ['If you cancel at least 10 days before the travel date, a conditional tour-credit arrangement may apply, subject to the conditions stated in the brochure.', 'This is a credit arrangement, not a cash refund, and it is not a free-cancellation policy.'] },
  { id: 'documents', title: 'Identity documents', status: 'source_based', body: ['Every traveller must carry valid identity documents. Some excursions require permits that are issued only against identity documents.'] },
  { id: 'meals', title: 'Meals', status: 'source_based', body: ["Meals are provided under the operator's specified arrangements, with vegetarian and non-vegetarian options as described for each tour.", 'The brochure contains exceptions concerning lunch during sightseeing and occasional meal arrangements. The final wording is awaiting approval from NP Service.'] },
  { id: 'accommodation', title: 'Accommodation', status: 'source_based', body: ['Hotel accommodation is arranged as specified in each tour package.'] },
  { id: 'essentials', title: 'What to carry', status: 'source_based', body: ['Carry your travel essentials, drinking water, personal medication and all relevant documents throughout the journey.'] },
  { id: 'permits', title: 'Permits & restricted areas', status: 'source_based', body: ['Visits to restricted or high-altitude areas such as Nathula Pass depend on permits, weather and local restrictions on the day. NP Service cannot guarantee access.'] },
]

export const announcements: { id: string; text: string; active: boolean }[] = []
