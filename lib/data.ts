// Central content source. Everything here is plain data so it can be swapped
// for CMS queries later without touching the page components.

const WP = "https://effectstech.in/wp-content/uploads";

export const site = {
  name: "Effects Tech",
  url: "https://effectstech.in",
  tagline: "Experiences Beyond Expectations",
  description:
    "Effects Tech is India's leading events production house — crafting brand experiences, meetings & events and weddings with over 18 years of turnkey expertise.",
  logo: `${WP}/2019/07/ET_Logo_White.png`,
  address: "McKenzies Ltd. Compound, Acharya Dhonde Marg, Sewri (W), Mumbai",
  phones: ["022 24181467", "022 65100344"],
  email: "info@effectstech.in",
  contacts: [
    { role: "Key Person", name: "Sarosh Patel", email: "sarosh@effectstech.in" },
    { role: "Sound Enquiries", name: "Porus Jussawalla", email: "porus@effectstech.in" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/effects_tech/" },
    { label: "Facebook", href: "https://www.facebook.com/theeffectstech" },
  ],
};

export const stats = [
  { value: "18+", label: "Years of production" },
  { value: "1000+", label: "Productions staged" },
  { value: "150+", label: "Clients served" },
  { value: "3", label: "Worlds of celebration" },
];

export const clients = [
  "IBM",
  "Morgan Stanley",
  "Cognizant",
  "Tata Motors",
  "Cartier",
  "Lakmé Fashion Week",
  "GQ",
  "Vogue",
  "Marriott",
];

export const heroImages = [
  `${WP}/2019/07/4-1.jpg`,
  `${WP}/2019/07/tarun-2.jpg`,
  `${WP}/2019/07/Birla-Event-2.jpg`,
  `${WP}/2019/07/gq-awards-2.jpg`,
  `${WP}/2019/01/chudhary-wedding-hyderbad-2.jpg`,
];

// "Faces & moments" — stand-ins until celebrity photography is supplied.
export const faces = [
  { image: `${WP}/2019/07/4-1.jpg`, caption: "Lakmé Fashion Week", position: "50% 20%" },
  { image: `${WP}/2019/07/1-1.jpg`, caption: "Lakmé Fashion Week", position: "18% 30%" },
  { image: `${WP}/2019/07/5.jpg`, caption: "Lakmé Fashion Week", position: "55% 25%" },
  { image: `${WP}/2019/07/3-1.jpg`, caption: "Lakmé Fashion Week", position: "12% 30%" },
  { image: `${WP}/2019/07/Vogue-Beauty-Awards-5-1.jpg`, caption: "Vogue Beauty Awards", position: "50% 50%" },
  { image: `${WP}/2019/07/tarun-1.jpg`, caption: "Tarun Tahiliani", position: "50% 50%" },
];

export const houses = ["Cartier", "Vogue", "GQ", "Lakmé", "Marriott", "Tarun Tahiliani", "Rohit Bal", "Morgan Stanley", "IBM", "Tata"];

export const aboutImage = `${WP}/2019/07/about-1.jpg`;
export const founderImage = `${WP}/2019/07/sarosh-patel-300x300.png`;

export type VerticalSlug = "experiences" | "meetings-events" | "weddings";

export type Vertical = {
  slug: VerticalSlug;
  name: string;
  short: string;
  tagline: string;
  intro: string;
  body: string;
  image: string;
  bandImage: string;
  overview: [string, string];
  cta: string;
  film: { src: string; line: [string, string] };
  heroVideo?: string;
  services: { title: string; text: string }[];
  process: { title: string; text: string }[];
};

export const verticals: Vertical[] = [
  {
    slug: "experiences",
    name: "Effects Tech Experiences",
    short: "Experiences",
    tagline: "Brand moments people feel, film and remember.",
    intro:
      "Fashion weeks, theatre spectacles, concerts and launches — built end to end by one production house.",
    body: "From the runway to the arena, we design experiences that put a brand in front of its audience with full sensory force — and we build every one of them ourselves, so the idea on paper is the experience on the night.",
    image: `${WP}/2019/07/gq-awards-2.jpg`,
    bandImage: `${WP}/2019/07/rohit-1.jpg`,
    overview: ["Moments with", "full sensory force."],
    cta: "Let's stage your brand's next moment.",
    film: { src: "/video/applause.mp4", line: ["The house goes dark.", "Then the applause."] },
    services: [
      { title: "Brand Experiences", text: "Immersive environments that translate brand strategy into something audiences can walk through." },
      { title: "Experiential Marketing", text: "Campaign-led formats built to earn attention on site and reach beyond it." },
      { title: "Brand Activations", text: "Launches, roadshows and pop-ups engineered for footfall, dwell time and recall." },
      { title: "Event Production", text: "Show-ready staging for launches, concerts and runways, delivered by a single accountable team." },
      { title: "Corporate Experiences", text: "Themed evenings, awards and celebrations that give teams and partners a story to tell." },
      { title: "Custom Experiences", text: "Fashion shows, theatre, concerts and one-off formats designed around a single brief." },
    ],
    process: [
      { title: "Concept", text: "We turn the brief into a creative idea with a clear audience journey." },
      { title: "Design", text: "Sets, staging, lighting and content are designed and visualised together." },
      { title: "Build", text: "In-house fabrication and technical teams take the design to the venue." },
      { title: "Show", text: "Show-callers and crew run the experience, cue by cue." },
    ],
  },
  {
    slug: "meetings-events",
    name: "Effects Tech Meetings & Events",
    short: "Meetings & Events",
    tagline: "Conferences and corporate events, run with precision.",
    intro:
      "Summits, conferences, exhibitions and incentive programmes delivered for India's top corporate houses.",
    body: "Whether it is a state-of-the-art corporate meeting or a multi-day global summit, we provide turnkey MICE solutions that keep agendas on time and delegates engaged. One team plans the logistics, builds the stage and runs the room.",
    image: `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-2-1.jpg`,
    bandImage: `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-2.jpg`,
    overview: ["Precision,", "beautifully delivered."],
    cta: "Let's plan your next gathering.",
    film: { src: "/video/speaker.mp4", line: ["Every seat.", "Every word."] },
    services: [
      { title: "Corporate Meetings", text: "Board meetings, town halls and leadership offsites with flawless technical delivery." },
      { title: "Conferences", text: "Plenaries, breakouts and summits designed for clarity on stage and comfort in the room." },
      { title: "Exhibitions", text: "Grand expos and specialised stall design that make a brand stand out on the floor." },
      { title: "MICE", text: "Integrated planning across meetings, incentives, conferences and exhibitions." },
      { title: "Incentive Travel", text: "Reward programmes that pair great destinations with well-run group logistics." },
      { title: "Corporate Events", text: "Annual days, dealer meets, award nights and product launches." },
      { title: "Event Management", text: "Venue, vendors, registrations, hospitality and on-ground control under one roof." },
      { title: "Destination Events", text: "Offsite events across India and abroad, managed from recce to wrap." },
    ],
    process: [
      { title: "Brief", text: "Objectives, audience, budget and success measures are agreed upfront." },
      { title: "Plan", text: "Venue, travel, agenda flow and technical design come together in one plan." },
      { title: "Produce", text: "Stage, AV, branding and hospitality are built and rehearsed." },
      { title: "Deliver", text: "A dedicated on-ground team runs the event and closes with a report." },
    ],
  },
  {
    slug: "weddings",
    name: "Effects Tech Weddings",
    short: "Weddings",
    tagline: "Celebrations designed like once-in-a-lifetime productions.",
    intro:
      "Destination and luxury weddings where décor, production and hospitality move as one.",
    body: "From planning a fairy-tale wedding to making every moment memorable, we specialise in turning your special day into an extravagant and unforgettable affair. Our wedding team brings large-format production craft to the most personal event of all.",
    image: `${WP}/2019/07/Birla-Event-2.jpg`,
    bandImage: `${WP}/2019/01/chudhary-wedding-hyderbad-2.jpg`,
    overview: ["Your story,", "staged beautifully."],
    cta: "Let's begin your celebration.",
    film: { src: "/video/ceiling.mp4", line: ["Beneath every detail,", "a love story."] },
    heroVideo: "/video/bokeh.mp4",
    services: [
      { title: "Destination Weddings", text: "Palaces, beaches and hill retreats — planned and produced wherever you choose to celebrate." },
      { title: "Luxury Weddings", text: "Bespoke celebrations with couture-level attention to every detail." },
      { title: "Wedding Planning", text: "A single planning team for timelines, vendors, budgets and family coordination." },
      { title: "Wedding Décor & Production", text: "Mandaps, stages, lighting and sound designed and built in-house." },
      { title: "Hospitality & Guest Management", text: "Invitations, travel, rooms and welcome experiences handled with care." },
      { title: "Destination Management", text: "Local permissions, logistics and partners arranged at the destination." },
      { title: "Wedding Experiences", text: "Sangeet productions, entertainment and signature moments made for your story." },
    ],
    process: [
      { title: "Listen", text: "We start with your story, your families and the celebration you imagine." },
      { title: "Design", text: "Themes, décor and function flow are designed and presented visually." },
      { title: "Plan", text: "Venues, guests, vendors and schedules are organised to the last detail." },
      { title: "Celebrate", text: "Our crew runs every function so you can simply be present." },
    ],
  },
];

export const getVertical = (slug: string) => verticals.find((v) => v.slug === slug);

export type Project = {
  slug: string;
  title: string;
  vertical: VerticalSlug;
  category: string;
  location?: string;
  image: string;
  gallery?: string[];
};

export const projects: Project[] = [
  { slug: "rohit-bal-ajsk-tarun-tahiliani", title: "Rohit Bal | AJSK | Tarun Tahiliani", vertical: "experiences", category: "Fashion Show", image: `${WP}/2019/07/tarun-2.jpg`,
    gallery: [`${WP}/2019/07/tarun-2.jpg`, `${WP}/2019/07/tarun-1.jpg`, `${WP}/2019/07/rohit-1.jpg`, `${WP}/2019/07/tarun-4.jpg`, `${WP}/2019/07/tarun-3.jpg`, `${WP}/2019/07/AJSK-2.jpg`, `${WP}/2019/07/India-Bridal-Fashion-Week-3-1.jpg`, `${WP}/2019/07/India-Bridal-Fashion-Week-7-1.jpg`, `${WP}/2019/07/AJSK-1.jpg`] },
  { slug: "birla-family-celebration", title: "Mr. Birla's Family Celebration", vertical: "weddings", category: "Wedding", image: `${WP}/2019/07/Birla-Event-2.jpg`,
    gallery: [`${WP}/2019/07/Birla-Event-1.jpg`, `${WP}/2019/07/Birla-Event-2.jpg`, `${WP}/2019/07/Birla-Event-3.jpg`, `${WP}/2019/07/Birla-Event-4.jpg`, `${WP}/2019/07/Birla-Event-5.jpg`, `${WP}/2019/07/Birla-Event-6.jpg`] },
  { slug: "gq-and-vogue", title: "GQ & Vogue", vertical: "experiences", category: "Special Events", image: `${WP}/2019/07/gq-awards-2.jpg`,
    gallery: [`${WP}/2019/07/gq-awards-2.jpg`, `${WP}/2019/07/Vogue-Beauty-Awards-1-1.jpg`, `${WP}/2019/07/gq-awards-4.jpg`, `${WP}/2019/07/g-awards-1.jpg`, `${WP}/2019/07/gq-awards-3.jpg`, `${WP}/2019/07/Vogue-Beauty-Awards-5-1.jpg`] },
  { slug: "cartier", title: "Cartier", vertical: "experiences", category: "Special Events", image: `${WP}/2019/08/Cartier-Featured.jpg`,
    gallery: [`${WP}/2019/08/Cartier-1.jpg`, `${WP}/2019/08/Cartier-2.jpg`, `${WP}/2019/08/Cartier-3.jpg`, `${WP}/2019/08/Cartier-4.jpg`, `${WP}/2019/08/Cartier-5.jpg`, `${WP}/2019/08/Cartier-6.jpg`, `${WP}/2019/08/Cartier-7.jpg`] },
  { slug: "lakme-fashion", title: "Lakmé Fashion", vertical: "experiences", category: "Fashion Show", location: "Mumbai", image: `${WP}/2019/07/portfolio-3-thumbnail.jpg`,
    gallery: [`${WP}/2019/07/6.jpg`, `${WP}/2019/07/2-1.jpg`, `${WP}/2019/07/5.jpg`, `${WP}/2019/07/3-1.jpg`, `${WP}/2019/07/4-1.jpg`, `${WP}/2019/07/1-1.jpg`] },
  { slug: "chudhary-wedding-hyderabad", title: "Chudhary Wedding", vertical: "weddings", category: "Wedding", location: "Hyderabad", image: `${WP}/2019/01/portfolio-1-thumbnail.jpg`,
    gallery: [`${WP}/2019/01/chudhary-wedding-hyderbad-1.jpg`, `${WP}/2019/01/chudhary-wedding-hyderbad-2.jpg`, `${WP}/2019/01/chudhary-wedding-hyderbad-3.jpg`, `${WP}/2019/01/chudhary-wedding-hyderbad-4.jpg`, `${WP}/2019/01/chudhary-wedding-hyderbad-5.jpg`, `${WP}/2019/01/chudhary-wedding-hyderbad-6.jpg`, `${WP}/2019/01/chudhary-wedding-hyderbad-7.jpg`] },
  { slug: "zubin-mehta-concert", title: "Zubin Mehta Concert", vertical: "experiences", category: "Special Events", image: `${WP}/2019/09/Zubin-Mehta-Concert.jpg`,
    gallery: [`${WP}/2019/09/Zubin-Mehta-1.jpg`, `${WP}/2019/09/Zubin-Mehta-2.jpg`, `${WP}/2019/09/Zubin-Mehta-2a.jpg`, `${WP}/2019/09/Zubin-Mehta-3.jpg`, `${WP}/2019/09/Zubin-Mehta-4.jpg`] },
  { slug: "ruia-wedding-udaipur", title: "Ruia Wedding", vertical: "weddings", category: "Wedding", location: "Udaipur", image: `${WP}/2019/07/portfolio-7-thumbnail.jpg`,
    gallery: [`${WP}/2019/07/Ruia-Udaipur-Wedding-1.jpg`, `${WP}/2019/07/Ruia-Udaipur-Wedding-2.jpg`, `${WP}/2019/07/Ruia-Udaipur-Wedding-3.jpg`, `${WP}/2019/07/Ruia-Udaipur-Wedding-4.jpg`, `${WP}/2019/07/Ruia-Udaipur-Wedding-5.jpg`, `${WP}/2019/07/Ruia-Udaipur-Wedding-6.jpg`, `${WP}/2019/07/Ruia-Udaipur-Wedding-7.jpg`] },
  { slug: "mughal-e-azam", title: "Mughal-e-Azam", vertical: "experiences", category: "Theatre", image: `${WP}/2019/09/featured-image.jpg`,
    gallery: [`${WP}/2019/09/mughal-e-azam-1.jpg`, `${WP}/2019/09/mughal-e-azam-2.jpg`, `${WP}/2019/09/mughal-e-azam-3.jpg`, `${WP}/2019/09/mughal-e-azam-4.jpg`, `${WP}/2019/09/mughal-e-azam-5.jpg`] },
  { slug: "morgan-stanley-india-summit", title: "Morgan Stanley 21st Annual India Summit", vertical: "meetings-events", category: "Corporate", image: `${WP}/2019/07/portfolio-4-thumbnail.jpg`,
    gallery: [`${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-1-1.jpg`, `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-2-1.jpg`, `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-3-1.jpg`, `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-4-1.jpg`, `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-5-1.jpg`, `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-6-1.jpg`, `${WP}/2019/07/Morgan-Stanley-21st-Annual-India-Summit-7-1.jpg`] },
  { slug: "shaadi-by-marriott", title: "Shaadi by Marriott", vertical: "experiences", category: "Fashion Show", image: `${WP}/2019/07/portfolio-6-thumbnail.jpg`,
    gallery: [`${WP}/2019/07/Shaadi-by-Marriott-1.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-2.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-3.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-4.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-5.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-6.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-7.jpg`, `${WP}/2019/07/Shaadi-by-Marriott-8.jpg`] },
  { slug: "luxury-lifestyle-weekend", title: "Luxury Lifestyle Weekend", vertical: "experiences", category: "IPs", image: `${WP}/2019/09/car.jpg`,
    gallery: [`${WP}/2019/09/52692339_2248135228758471_571966391150706688_n-1.jpg`, `${WP}/2019/09/b6624366-fdd0-412f-a2ff-9678abe7d495-1024x682-1.jpg`, `${WP}/2019/09/2a.jpg`, `${WP}/2019/09/54731277_2264468070458520_5634737122276540416_o-1.jpg`, `${WP}/2019/09/1a.jpg`] },
  { slug: "boinipally-sangeet-and-wedding", title: "Boinipally Sangeet & Wedding", vertical: "weddings", category: "Wedding", location: "Hyderabad", image: `${WP}/2019/07/portfolio-2a-thumbnail.jpg`,
    gallery: [`${WP}/2017/11/Boinipally-sangeet-and-wedding1.jpg`, `${WP}/2017/11/Boinipally-sangeet-and-wedding2.jpg`, `${WP}/2017/11/Boinipally-sangeet-and-wedding3.jpg`, `${WP}/2017/11/Boinipally-sangeet-and-wedding4.jpg`, `${WP}/2017/11/Boinipally-sangeet-and-wedding5.jpg`] },
  { slug: "ibm-think-summit", title: "IBM Think Summit", vertical: "meetings-events", category: "Corporate", image: `${WP}/2019/07/portfolio-2-thumbnail-2.jpg`,
    gallery: [`${WP}/2018/09/IBM-Think-Summit-1.jpg`, `${WP}/2018/09/IBM-Think-Summit-2.jpg`] },
  { slug: "raunaq-and-jassi", title: "Raunaq & Jassi", vertical: "experiences", category: "Theatre", image: `${WP}/2019/12/raunaq-jassi6.jpg`,
    gallery: [`${WP}/2019/12/raunaq-jassi1.jpg`, `${WP}/2019/12/raunaq-jassi2.jpg`, `${WP}/2019/12/raunaq-jassi3.jpg`, `${WP}/2019/12/raunaq-jassi4.jpg`, `${WP}/2019/12/raunaq-jassi5.jpg`] },
  { slug: "cognizant-global-account-planning-summit", title: "Cognizant Global Account Planning Summit", vertical: "meetings-events", category: "Corporate", image: `${WP}/2019/07/portfolio-8-thumbnail.jpg`,
    gallery: [`${WP}/2019/07/Cognizant-Global-Account-Summit-2016-1.jpg`, `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-2.jpg`, `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-3.jpg`, `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-4.jpg`, `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-5.jpg`, `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-6.jpg`, `${WP}/2019/07/Cognizant-Global-Account-Summit-2016-7.jpg`] },
  { slug: "tata-truck-racing", title: "Tata Truck Racing", vertical: "experiences", category: "Brand Experience", location: "Greater Noida", image: `${WP}/2023/08/main.jpeg`,
    gallery: [`${WP}/2023/08/1.jpeg`, `${WP}/2023/08/2.jpeg`, `${WP}/2023/08/3.jpeg`] },
  { slug: "tata-motors-ace", title: "Tata Motors Ace", vertical: "meetings-events", category: "Corporate", image: `${WP}/2019/09/Tata-Motos-Ace.jpg`,
    gallery: [`${WP}/2019/09/Tata-Ace-1.jpg`, `${WP}/2019/09/Tata-Ace-2.jpg`, `${WP}/2019/09/Tata-Ace-3.jpg`, `${WP}/2019/09/Tata-Ace-4.jpg`] },
  { slug: "enchanted-valley-carnival", title: "Enchanted Valley Carnival", vertical: "experiences", category: "IPs", image: `${WP}/2019/09/portfolio-14-thumbnail.jpg`,
    gallery: [`${WP}/2019/09/Enchanted-Valley-Carnival-1.jpg`, `${WP}/2019/09/Enchanted-Valley-Carnival-2.jpg`, `${WP}/2019/09/Enchanted-Valley-Carnival-3.jpg`, `${WP}/2019/09/Enchanted-Valley-Carnival-4.jpg`] },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Draft case-study copy keyed by vertical, used until project-specific
// write-ups (challenge, solution, results) are supplied.
export const caseStudyCopy: Record<VerticalSlug, { overview: string; scope: string[] }> = {
  experiences: {
    overview:
      "Conceived as one world and delivered by a single Effects Tech crew — from the first sketch to the final cue.",
    scope: ["Set design", "Fabrication", "Sound design", "Lighting design", "Video & LED", "Trussing & rigging", "Show running"],
  },
  "meetings-events": {
    overview:
      "A corporate event delivered end to end — stage and AV design, branding, technical production and on-ground management — so the agenda ran to time and the message landed.",
    scope: ["Stage & set", "Audio-visual", "Lighting", "Branding & signage", "Technical direction", "On-ground management"],
  },
  weddings: {
    overview:
      "A multi-function celebration produced with large-format craft: bespoke décor, staging, lighting and sound, designed around the families and delivered across every function.",
    scope: ["Décor design", "Mandap & stage", "Lighting", "Sound", "Sangeet production", "Function management"],
  },
};

export type Insight = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  body: string[];
  takeaways: string[];
};

export const insights: Insight[] = [
  {
    slug: "designing-a-conference-stage-that-works-on-camera",
    title: "Designing a conference stage that works on camera",
    category: "MICE Insights",
    readTime: "4 min read",
    excerpt: "Most summits now have a second audience watching on a screen. The stage has to serve both.",
    image: `${WP}/2019/07/portfolio-2-thumbnail-2.jpg`,
    body: [
      "A conference stage used to be designed for the back row of the ballroom. Today it is also designed for a laptop screen, a highlights reel and a social clip. That changes decisions about set depth, LED pixel pitch, lighting angles and where the lectern sits.",
      "The most reliable approach is to design the camera frames first. Decide the three or four shots the broadcast will live on, then build the set so each of those frames is clean, branded and well lit. What looks good in the frame nearly always looks good in the room; the reverse is not true.",
      "Finally, rehearse with cameras, not just with slides. Speaker walk-ons, panel seating and awards presentations all have blocking that only shows its problems on a monitor.",
    ],
    takeaways: [
      "Plan camera frames before finalising the set.",
      "Light faces for camera, then balance the LED wall to match.",
      "Hold at least one full technical rehearsal with the broadcast team.",
    ],
  },
  {
    slug: "planning-a-destination-wedding-the-first-five-decisions",
    title: "Planning a destination wedding: the first five decisions",
    category: "Wedding Trends",
    readTime: "5 min read",
    excerpt: "Before décor boards and playlists, a handful of early calls shape everything that follows.",
    image: `${WP}/2019/07/portfolio-7-thumbnail.jpg`,
    body: [
      "Destination weddings reward early clarity. The guest count, the season, the number of functions, the venue's production limits and the travel plan are tightly linked — change one and the other four move.",
      "Start with the guest list and season, because they decide which venues are realistic. Then walk the venue with your production team before you commit: load-in routes, power, sound curfews and rain plans matter as much as the view.",
      "Once those are fixed, the creative work becomes far more enjoyable. A design built around real constraints is one that actually gets built.",
    ],
    takeaways: [
      "Lock guest count and season before shortlisting venues.",
      "Do a technical recce, not only a visual one.",
      "Always design a weather back-up for outdoor functions.",
    ],
  },
  {
    slug: "what-turnkey-really-means-in-event-production",
    title: "What 'turnkey' really means in event production",
    category: "Industry Insights",
    readTime: "3 min read",
    excerpt: "One team for fabrication, sound, light and video is not a convenience — it is risk management.",
    image: `${WP}/2019/09/featured-image.jpg`,
    body: [
      "On a show day, most problems appear in the gaps between vendors: the truss that does not match the set drawing, the LED wall that blocks a speaker stack, the power draw nobody added up.",
      "A turnkey production house closes those gaps by designing every discipline together and putting a single technical director in charge. Changes — and there are always changes — are absorbed by one team instead of being negotiated between five.",
      "For clients, the result is simpler: one brief, one budget, one point of accountability.",
    ],
    takeaways: [
      "Integrated design prevents on-site clashes.",
      "A single technical lead speeds up last-minute changes.",
      "One accountable partner simplifies budgeting and reporting.",
    ],
  },
  {
    slug: "brand-activations-that-earn-attention",
    title: "Brand activations that earn attention",
    category: "Event Trends",
    readTime: "4 min read",
    excerpt: "The activations people remember give them something to do, not just something to look at.",
    image: `${WP}/2023/08/main.jpeg`,
    body: [
      "Audiences have seen every photo wall. What still works is participation: a format where the visitor's own action completes the experience and gives them a reason to share it.",
      "That does not have to mean complex technology. Scale, sound and a well-timed reveal are often more powerful than a screen. The discipline is to choose one idea and commit the production budget to executing it properly.",
      "Measure it the same way — one or two metrics that reflect the objective, agreed before the build begins.",
    ],
    takeaways: [
      "Design for participation over passive viewing.",
      "Spend on one strong idea rather than many small ones.",
      "Agree success metrics before production starts.",
    ],
  },
  {
    slug: "choosing-a-destination-for-your-next-offsite",
    title: "Choosing a destination for your next offsite",
    category: "Destination Guides",
    readTime: "4 min read",
    excerpt: "A practical checklist for matching a destination to the purpose of the programme.",
    image: `${WP}/2019/07/portfolio-8-thumbnail.jpg`,
    body: [
      "The best destination for an offsite is the one that supports its purpose. A strategy session needs quiet rooms and reliable connectivity; an incentive trip needs experiences people could not arrange themselves.",
      "Shortlist on travel time first. A destination that costs delegates a full day each way has to work much harder to justify itself. Then check venue capacity for your largest session, not your average one.",
      "Finally, look at what the destination adds outside the meeting room — it is usually what delegates remember.",
    ],
    takeaways: [
      "Match the destination to the programme's purpose.",
      "Keep door-to-door travel time proportionate to the stay.",
      "Size the venue for your largest single session.",
    ],
  },
  {
    slug: "lighting-the-sangeet",
    title: "Lighting the sangeet: lessons from the stage",
    category: "Wedding Trends",
    readTime: "3 min read",
    excerpt: "Concert-grade lighting ideas that make family performances feel like a headline act.",
    image: `${WP}/2019/07/portfolio-2a-thumbnail.jpg`,
    body: [
      "A sangeet is a live show with an unusually forgiving audience. Treating it like one — with a lighting design, a cue sheet and a rehearsal — transforms how it feels in the room and in the film.",
      "Start with warm, flattering front light so faces read on camera, then add colour and movement behind the performers rather than on them. Save the biggest looks for the couple's entry and the finale.",
      "Most importantly, give each performance a named cue. Families rehearse for weeks; the lighting should know their song as well as they do.",
    ],
    takeaways: [
      "Light faces first, effects second.",
      "Build a cue sheet for every performance.",
      "Hold back signature looks for key moments.",
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);

export const whyUs = [
  { title: "One accountable partner", text: "No hand-offs and no gaps between vendors — one team answers for the whole evening." },
  { title: "Scale without strain", text: "From boardroom meetings to arena-scale shows, the same care at every size." },
  { title: "Craft up close", text: "Finishes, light and sound are judged from the front row, not just the back of the room." },
  { title: "Trusted by the best", text: "Event management companies and top corporate houses return to us project after project." },
];

