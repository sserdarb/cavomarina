import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Check, ChevronRight, Star, Calendar, Utensils, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang, LangSwitcher, type TKey } from "@/lib/i18n";

const CDN = "https://image-tc.galaxy.tf";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ACTIVITIES = [
  {
    id: 0, title: "Boat Trip to Paxos & Antipaxos", category: "Boat Trip",
    image: "https://images.unsplash.com/photo-1723461375952-90b98f8815eb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDesc: "Sail to the stunning islands of Paxos and Antipaxos, swim in turquoise bays, and explore hidden sea caves.",
    fullDesc: "Travelers can swim and snorkel in turquoise bays, admire dramatic cliffs and sea caves, and visit charming villages that reflect the local Greek culture. Onboard, enjoy delicious snacks and refreshments while soaking in the sun and panoramic views. Whether you're seeking a romantic getaway, family fun, or a day of exploration with friends, this boat trip delivers an unforgettable experience.\n\nA Boat Trip to Paxos & Antipaxos is more than a boat ride — it's a day of adventure, relaxation, and discovery in one of the most scenic parts of Greece.",
    highlights: ["Explore the beautiful islands of Paxos and Antipaxos", "Swim and snorkel in crystal-clear turquoise waters", "Discover hidden coves, sea caves, and dramatic cliffs", "Visit picturesque villages and experience local culture", "Relax on board with snacks, drinks, and stunning views"],
  },
  {
    id: 1, title: "Corfu Old Town Walking Tour", category: "Culture",
    image: "https://plus.unsplash.com/premium_photo-1661962291822-bc4d00d0dbcc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDesc: "Wander through the UNESCO-listed Old Town and discover centuries of Venetian, French, and British history.",
    fullDesc: "Explore the UNESCO World Heritage Corfu Old Town. Discover Venetian, French, and British architectural influences, visit historic palaces, churches, and fortresses. Walk through the narrow streets of the Liston, admire the Old Fortress, and soak in centuries of history.\n\nA Corfu Old Town walking tour is more than sightseeing — it's a journey through centuries of history, architecture, and local culture in one of Greece's most enchanting towns.",
    highlights: ["Guided tour through the historic streets of Corfu Old Town", "Explore Venetian, French, and British architectural influences", "Visit historic palaces, churches, and fortresses", "Learn about Corfu's culture, traditions, and history", "Ideal for history lovers, photographers, and cultural explorers"],
  },
  {
    id: 2, title: "Mount Pantokrator Hike", category: "Adventure",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/13/2b/49/24.jpg",
    shortDesc: "Hike to the highest peak of Corfu (906 m) for breathtaking panoramic views over the Ionian Sea.",
    fullDesc: "Hike to the highest point on Corfu (906m) for stunning panoramic views. Explore scenic trails, traditional villages, and olive groves. Enjoy peaceful nature and fresh mountain air.\n\nA Mount Pantokrator hike is more than just a trek — it's an immersive journey through Corfu's natural beauty, history, and culture, offering unforgettable memories and spectacular scenery.",
    highlights: ["Hike to the highest point on Corfu for stunning panoramic views", "Explore scenic trails, traditional villages, and olive groves", "Enjoy peaceful nature and fresh mountain air", "Perfect for adventure seekers, nature lovers, and photographers", "Capture breathtaking vistas across Corfu and the Ionian Sea"],
  },
  {
    id: 3, title: "Aqualand Water Park", category: "Family",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/bc/a3/ff/aqualand-2020.jpg?w=1000&h=-1&s=1",
    shortDesc: "Enjoy 36+ thrilling water slides and rides at one of Europe's most popular water parks.",
    fullDesc: "Over 36 exciting water rides and attractions await you at Aqualand, one of Europe's leading water parks. Thrilling slides for adrenaline lovers, gentle rides for little ones, lazy rivers, wave pools, and splash zones make it a perfect full-day family outing.\n\nA visit to Aqualand Water Park Corfu is more than just a day at a water park — it's a full day of laughter, excitement, and unforgettable memories for all ages.",
    highlights: ["Over 36 exciting water rides and attractions", "Thrilling slides for adrenaline lovers and gentle rides for kids", "Lazy rivers, wave pools, and splash zones", "Food courts, bars, and shaded relaxation areas", "Fun and entertainment for the whole family"],
  },
  {
    id: 4, title: "Cavos Nightlife", category: "Nightlife",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/4d/af/08/photo0jpg.jpg?w=1000&h=-1&s=1",
    shortDesc: "Dance the night away in Kavos — Corfu's most vibrant nightlife destination with beach bars and clubs.",
    fullDesc: "Experience the vibrant nightlife of Cavos, known for its lively bars, clubs, and parties. Dance to the latest hits, enjoy refreshing cocktails, and soak up the electric atmosphere that attracts travelers from all over the world. From themed parties and live DJ performances to relaxed seaside bars, there's something for everyone.\n\nA night out in Cavos is more than just going out — it's a chance to experience the excitement, music, and vibrant energy of one of Corfu's most famous nightlife destinations.",
    highlights: ["Lively bars and nightclubs with energetic vibes", "Beach parties, themed events, and live DJ performances", "Refreshing cocktails and drinks for every taste", "Ideal for groups, couples, and solo travelers", "Unforgettable nightlife experiences on Corfu"],
  },
  {
    id: 5, title: "Shopping in Corfu Town", category: "Shopping",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/d9/32/c1/traditional-drinks-tastes.jpg?w=800&h=-1&s=1",
    shortDesc: "Browse charming boutiques, local crafts, and artisan markets in the heart of Corfu Town.",
    fullDesc: "Explore the vibrant shopping scene of Corfu Town, where charming boutiques mix with international brands and traditional markets. Browse unique souvenirs, handcrafted jewellery, gourmet olive oil products, and local ceramics. The picturesque streets offer a vibrant atmosphere.\n\nShopping in Corfu Town is more than just buying goods — it's an immersive cultural experience that combines local flavour, creativity, and the charm of one of Greece's most enchanting towns.",
    highlights: ["Charming boutiques and international brands", "Traditional markets with local crafts and products", "Unique souvenirs, jewelry, and gourmet items", "Picturesque streets and vibrant atmosphere", "Perfect for fashion lovers, foodies, and souvenir hunters"],
  },
  {
    id: 6, title: "Olive Oil Tasting & Cooking Class", category: "Food",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/6e/29/d0.jpg",
    shortDesc: "Savour Corfiot olive oils and learn to cook authentic Greek recipes with local chefs.",
    fullDesc: "Perfect for food lovers, aspiring chefs, and cultural explorers, this experience blends learning, tasting, and fun in a beautiful Corfiot setting. Taste premium Corfiot olive oils, join a hands-on cooking class with traditional Greek recipes, and learn culinary tips from local chefs.\n\nA visit to Olive Oil Tasting & Cooking Class is more than a cooking lesson — it's a journey into the heart of Corfu's culinary heritage and the rich flavours of Greek cuisine.",
    highlights: ["Taste a variety of premium Corfiot olive oils", "Hands-on cooking class with traditional Greek recipes", "Learn culinary tips from local chefs", "Prepare appetizers, main courses, and desserts", "Enjoy an immersive cultural and gastronomic experience"],
  },
  {
    id: 7, title: "Stand-Up Paddleboarding (SUP)", category: "Water Sports",
    image: "https://images.unsplash.com/photo-1665417720983-c98ae9bfe764?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDesc: "Glide along Corfu's stunning coastline on a paddleboard — ideal for all skill levels.",
    fullDesc: "Explore Corfu's coastline and hidden bays by paddleboard. Suitable for beginners and experienced paddlers alike. Expert guidance and safety instructions are always included. Enjoy calm waters, scenic views, and a unique perspective of the island's coastline.\n\nA Stand-Up Paddleboarding session in Corfu is more than just a water sport — it's a memorable way to experience Corfu's natural beauty while staying active and having fun.",
    highlights: ["Explore Corfu's coastline and hidden bays by paddleboard", "Suitable for beginners and experienced paddlers", "Expert guidance and safety instructions included", "Enjoy calm waters, scenic views, and a unique perspective", "Fun, fitness, and adventure all in one experience"],
  },
];

const SIGHTS = [
  {
    title: "Achilleion Palace", category: "Historic",
    image: "https://images.unsplash.com/photo-1621765836360-63166ba78637?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Built by Empress Elisabeth of Austria, this neoclassical palace features opulent halls, intricate frescoes, and beautiful gardens with panoramic terraces and Ionian Sea vistas.\n\n✨ Highlights\n• Explore the luxurious interiors and art of Achilleion Palace\n• Admire the famous statue of Achilles and other sculptures\n• Stroll through beautifully landscaped gardens and terraces\n• Enjoy panoramic views of the Ionian Sea\n• Learn about the history of Empress Elisabeth and European royalty",
  },
  {
    title: "Old Fortress of Corfu", category: "Historic",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/4b/0c/3a/caption.jpg?w=1000&h=-1&s=1",
    desc: "Perched on a rocky peninsula, this Venetian fortress offers panoramic views of the city and the Ionian Sea. Explore massive walls, ancient bastions, and winding pathways.\n\n✨ Highlights\n• Explore historic walls, bastions, and fortifications\n• Enjoy breathtaking panoramic views of Corfu Town\n• Discover Corfu's Venetian and military heritage\n• Cultural exhibitions and occasional events\n• Ideal for history enthusiasts and photographers",
  },
  {
    title: "Paleokastritsa Beach", category: "Beach",
    image: "https://images.unsplash.com/photo-1634556658305-6685a6046230?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Nestled between dramatic cliffs and surrounded by lush greenery, this stunning beach offers crystal-clear turquoise waters, perfect for swimming, snorkelling, or simply relaxing under the sun.\n\n✨ Highlights\n• Crystal-clear turquoise waters ideal for swimming\n• Surrounded by dramatic cliffs and lush greenery\n• Explore nearby coves and hidden sea caves\n• Charming cafés and tavernas with local cuisine\n• Perfect for families, couples, and nature lovers",
  },
  {
    title: "Corfu Town (Kerkyra)", category: "Culture",
    image: "https://plus.unsplash.com/premium_photo-1697729477532-f611c6af1f86?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "A UNESCO World Heritage Site, the town is a fascinating blend of Venetian, French, and British architecture, narrow cobblestone streets, and bustling squares filled with cafés, shops, and cultural landmarks.\n\n✨ Highlights\n• UNESCO World Heritage Site with layered architectural history\n• Historic forts, palaces, and churches to explore\n• Picturesque streets, the Liston promenade, and lively squares\n• Traditional tavernas, cafés, and boutique shops\n• Perfect for history enthusiasts and culture lovers",
  },
  {
    title: "Canal d'Amour", category: "Beach",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/4d/37/c8/canal-d-amour.jpg?w=1000&h=-1&s=1",
    desc: "Famous for its unique sandstone cliffs and crystal-clear waters, Canal d'Amour is one of Corfu's most romantic destinations. Legend has it couples who swim together here are destined to fall in love.\n\n✨ Highlights\n• Unique sandstone cliffs and crystal-clear waters\n• Secluded coves perfect for swimming and relaxation\n• Romantic legend for couples visiting together\n• Boat trips along the stunning coastline\n• Ideal for couples, families, and nature enthusiasts",
  },
  {
    title: "Mount Pantokrator", category: "Scenic",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/13/2b/49/24.jpg",
    desc: "Standing at 906 metres, this majestic mountain offers panoramic views of the island, the Ionian Sea, and even the Albanian coastline on clear days.\n\n✨ Highlights\n• Reach Corfu's highest point with panoramic views\n• Explore a historic monastery at the summit\n• Hike through scenic trails, forests, and villages\n• Spot distant islands and the Albanian coastline\n• Perfect for nature enthusiasts, photographers, and adventurers",
  },
  {
    title: "New Fortress of Corfu", category: "Historic",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/81/36/09/caption.jpg?w=1000&h=-1&s=1",
    desc: "Built in the late 16th century to protect the city from invasions, this impressive Venetian structure offers visitors a fascinating glimpse into Corfu's military past and architectural brilliance.\n\n✨ Highlights\n• Discover Venetian military architecture and fortifications\n• Explore bastions, tunnels, and massive defensive walls\n• Enjoy panoramic views of Corfu Town and the Ionian Sea\n• Cultural exhibitions and occasional events\n• Perfect for history buffs, photographers, and architecture enthusiasts",
  },
  {
    title: "Vlacherna Monastery & Pontikonisi", category: "Religious",
    image: "https://images.unsplash.com/photo-1568240885404-6f1c509915a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Situated just off the coast near Kanoni, Vlacherna Monastery rests on a small islet connected by a narrow causeway, while the nearby Pontikonisi ('Mouse Island') enchants visitors with its lush greenery and fairy-tale charm.\n\n✨ Highlights\n• Visit the charming Vlacherna Monastery on its islet\n• Admire the lush and iconic Pontikonisi ('Mouse Island')\n• Enjoy panoramic views of the surrounding sea and coastline\n• Capture unforgettable photos in a fairy-tale setting\n• Perfect for couples, families, and photography enthusiasts",
  },
];

const ITINERARIES = [
  {
    id: 0,
    title: "3-Day Corfu Getaway: Beaches, History & Old Town Charm",
    duration: "3 Days",
    image: "https://images.unsplash.com/photo-1682197289142-424218d0cd7c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "A whirlwind tour of Corfu, focusing on the island's most iconic sights. Perfect for a short break, this itinerary balances relaxation with cultural exploration.",
    highlights: [
      "Corfu Town (Old Town): Explore the Venetian architecture and charming streets.",
      "Paleokastritsa Beach: Relax on the stunning beaches and swim in the crystal-clear waters.",
      "Achilleion Palace: Visit the opulent palace of Empress Elisabeth of Austria (Sisi).",
      "Sunset at Pelekas (Kaiser's Throne): Enjoy panoramic views of the island at sunset.",
    ],
    days: [
      { day: 1, activity: "Corfu Town (Old Town): Explore the Venetian architecture and charming streets." },
      { day: 2, activity: "Paleokastritsa Beach: Relax on the stunning beaches and swim in crystal-clear waters." },
      { day: 3, activity: "Achilleion Palace: Visit the opulent palace of Empress Elisabeth of Austria (Sisi)." },
    ],
  },
  {
    id: 1,
    title: "5-Day Corfu Escape: Nature, Culture & Beach Bliss",
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1471724603960-98bc193c621d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Five days of diverse experiences across Corfu — from mountain hikes and historic palaces to pristine beaches and local cuisine.",
    highlights: [
      "Corfu Old Town: Stroll the UNESCO-listed streets and visit the Old Fortress.",
      "Mount Pantokrator: Hike to the island's highest peak for stunning views.",
      "Canal d'Amour: Swim in the legendary romantic cove near Sidari.",
      "Paleokastritsa & Glyfada: Explore Corfu's most beautiful beaches.",
    ],
    days: [
      { day: 1, activity: "Arrive & settle in. Explore Kavos beach and enjoy the Venus Beach Club." },
      { day: 2, activity: "Corfu Old Town: Guided walking tour through the UNESCO-listed historic centre." },
      { day: 3, activity: "Mount Pantokrator hike: Scenic trails, traditional villages, and panoramic views." },
      { day: 4, activity: "Canal d'Amour & Paleokastritsa: A full day of beach hopping in the north." },
      { day: 5, activity: "Achilleion Palace & Glyfada Beach: History and relaxation on the final day." },
    ],
  },
  {
    id: 2,
    title: "7-Day Corfu Adventure: The Complete Island Experience",
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1697964332260-58fcea457c4a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "The ultimate Corfu week — covering all the must-sees and hidden gems, including boat trips, water sports, local dining, and nightlife.",
    highlights: [
      "Paxos & Antipaxos Day Trip: Sail to two of Greece's most beautiful islands.",
      "Aqualand Water Park: A family-friendly day of thrills and fun.",
      "Corfu Old Town & Achilleion Palace: Culture and history in one day.",
      "Kavos Nightlife & Venus Beach Club: Experience the island after dark.",
    ],
    days: [
      { day: 1, activity: "Arrive. Sunset swim and welcome dinner at the Venus Beach Club." },
      { day: 2, activity: "Corfu Old Town guided walking tour and Liston promenade." },
      { day: 3, activity: "Paxos & Antipaxos boat trip: Swim, snorkel, and explore." },
      { day: 4, activity: "Aqualand Water Park: Full day of slides and family fun." },
      { day: 5, activity: "Mount Pantokrator hike + sunset at Kaiser's Throne (Pelekas)." },
      { day: 6, activity: "Paleokastritsa, Canal d'Amour & Achilleion Palace." },
      { day: 7, activity: "Olive oil tasting & cooking class, farewell beach afternoon." },
    ],
  },
];

const RESTAURANTS = [
  {
    name: "Venus Beach Club", cuisines: ["Mediterranean", "Greek"], rating: 4.7, price: "$$$",
    image: `${CDN}/wijpeg-86gy0iiziacqvnh6eaelwnf1t/venus-beach-1.jpg?width=600`,
    desc: "Cavomarina's own beachside restaurant, open from breakfast to after midnight. Fresh seafood, Greek specialties, and cocktails right on the sand.",
  },
  {
    name: "Breakfast Terrace", cuisines: ["Greek", "International"], rating: 4.5, price: "$$",
    image: `${CDN}/wijpeg-6hsalp04ugfj9j9ntfj3ydk7z/breakfast-at-terrace-wb.jpg?width=600`,
    desc: "Start your day with a Mediterranean breakfast overlooking the pool and sea — local cheeses, fresh pastries, and fruit.",
  },
  {
    name: "Dinner by the Sea", cuisines: ["Greek", "Grill"], rating: 4.6, price: "$$$",
    image: `${CDN}/wijpeg-cswr5drrakue2w9swxt2od5ee/dinnerwb.jpg?width=600`,
    desc: "An intimate dinner experience with grilled meats, fresh catch of the day, and local wines — set to the sound of the waves.",
  },
  {
    name: "Poolside Bites", cuisines: ["Snacks", "Mediterranean"], rating: 4.3, price: "$$",
    image: `${CDN}/wijpeg-1ft7l0qhjhmfgt249yyxkmxxr/model-snacks-drinkwb.jpg?width=600`,
    desc: "Light snacks, refreshing drinks, and cocktails served around the pool. Perfect for a relaxing midday break.",
  },
  {
    name: "Pool Bar & Grill", cuisines: ["Bar", "Grill"], rating: 4.4, price: "$$",
    image: `${CDN}/wijpeg-dpry68xsntw0lrm7hqsmaeiv0/pool-bar-3-2.jpg?width=600`,
    desc: "Ice-cold drinks, grilled skewers, and fresh salads served steps from the main pool — the perfect summer lunch spot.",
  },
];

const PRACTICAL_INFO_META: { icon: string; titleKey: TKey; contentKey: TKey }[] = [
  { icon: "✈️", titleKey: "pi1_title", contentKey: "pi1_content" },
  { icon: "🚗", titleKey: "pi2_title", contentKey: "pi2_content" },
  { icon: "💳", titleKey: "pi3_title", contentKey: "pi3_content" },
  { icon: "🌡️", titleKey: "pi4_title", contentKey: "pi4_content" },
  { icon: "📱", titleKey: "pi5_title", contentKey: "pi5_content" },
];

// ─── Modal Components ──────────────────────────────────────────────────────────

function Backdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90dvh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function ActivityModal({ item, onClose }: { item: typeof ACTIVITIES[0]; onClose: () => void }) {
  const { t } = useLang();
  return (
    <Backdrop onClose={onClose}>
      <div className="relative h-56 shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">{item.category}</span>
          <h3 className="text-2xl font-bold text-white mt-2 leading-tight">{item.title}</h3>
        </div>
      </div>
      <div className="p-6">
        {item.fullDesc.split("\n\n").map((para, i) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-4 text-sm">{para}</p>
        ))}
        <div className="mt-4">
          <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">✨ {t("modal_highlights")}</p>
          <ul className="space-y-2">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{h}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className="mt-6 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-2xl transition-colors">
          <Check className="w-4 h-4" /> {t("modal_close")}
        </button>
      </div>
    </Backdrop>
  );
}

function SightModal({ item, onClose }: { item: typeof SIGHTS[0]; onClose: () => void }) {
  const { t } = useLang();
  const lines = item.desc.split("\n");
  const beforeHighlights = lines.filter(l => !l.startsWith("✨") && !l.startsWith("•"));
  const highlights = lines.filter(l => l.startsWith("•")).map(l => l.slice(2));
  return (
    <Backdrop onClose={onClose}>
      <div className="relative h-56 shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">{item.category}</span>
          <h3 className="text-2xl font-bold text-white mt-2">{item.title}</h3>
        </div>
      </div>
      <div className="p-6">
        {beforeHighlights.map((para, i) => para.trim() && <p key={i} className="text-gray-600 leading-relaxed mb-3 text-sm">{para}</p>)}
        {highlights.length > 0 && (
          <div className="mt-4">
            <p className="font-bold text-gray-900 mb-3">✨ {t("modal_highlights")}</p>
            <ul className="space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{h}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={onClose} className="mt-6 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-2xl transition-colors">
          <Check className="w-4 h-4" /> {t("modal_close")}
        </button>
      </div>
    </Backdrop>
  );
}

function ReservationModal({ itinerary, onClose }: { itinerary: typeof ITINERARIES[0]; onClose: () => void }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", checkIn: "", checkOut: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Reservation Request: ${itinerary.title}`);
    const body = encodeURIComponent(
      `Itinerary: ${itinerary.title} (${itinerary.duration})\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCheck-in: ${form.checkIn}\nCheck-out: ${form.checkOut}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:info@cavomarina.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(onClose, 2000);
  };

  return (
    <Backdrop onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t("modal_reservation_title")}</h3>
            <p className="text-sm text-gray-500 mt-1">{itinerary.title}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors shrink-0 ml-3">
            <X className="w-4 h-4" />
          </button>
        </div>
        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <p className="font-semibold text-gray-900">{t("modal_sent_title")}</p>
            <p className="text-sm text-gray-500 mt-1">{t("modal_sent_sub")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{t("modal_name")} *</label>
                <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{t("modal_phone")}</label>
                <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="+44 7700 900000" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{t("modal_email_f")} *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="john@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{t("modal_checkin_f")}</label>
                <input type="date" value={form.checkIn} onChange={e => setForm(f => ({...f, checkIn: e.target.value}))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{t("modal_checkout_f")}</label>
                <input type="date" value={form.checkOut} onChange={e => setForm(f => ({...f, checkOut: e.target.value}))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">{t("modal_message")}</label>
              <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                rows={3} placeholder={t("modal_message_ph")}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-2xl transition-colors flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> {t("modal_send")}
            </button>
          </form>
        )}
      </div>
    </Backdrop>
  );
}

function ItineraryModal({ item, onClose, onReserve }: { item: typeof ITINERARIES[0]; onClose: () => void; onReserve: () => void }) {
  const { t } = useLang();
  return (
    <Backdrop onClose={onClose}>
      <div className="relative h-52 shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1 w-fit mb-2">
            <Calendar className="w-3 h-3" /> {item.duration}
          </span>
          <h3 className="text-xl font-bold text-white leading-tight max-w-[340px]">{item.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.desc}</p>

        <div className="mb-5">
          <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" /> {t("modal_highlights")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {item.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 rounded-xl p-3">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{h}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-base">🔄</span> {t("modal_daybyday")}
          </p>
          <div className="space-y-0">
            {item.days.map((d, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{d.day}</div>
                  {i < item.days.length - 1 && <div className="w-px flex-1 bg-primary/20 my-1" />}
                </div>
                <div className="pb-4 pt-1">
                  <p className="text-sm font-semibold text-gray-800">Day {d.day}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{d.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => { onClose(); setTimeout(onReserve, 50); }}
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-2xl transition-colors text-sm">
            {t("dc_make_reservation")}
          </button>
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-2xl transition-colors text-sm flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> {t("modal_close")}
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const NAV_SECTION_IDS: { id: string; labelKey: TKey }[] = [
  { id: "things-to-do", labelKey: "dc_nav_todo" },
  { id: "sights", labelKey: "dc_nav_sights" },
  { id: "itineraries", labelKey: "dc_nav_itineraries" },
  { id: "where-to-eat", labelKey: "dc_nav_eat" },
  { id: "practical-info", labelKey: "dc_nav_practical" },
];

export default function DiscoverCavos() {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("things-to-do");
  const [selectedActivity, setSelectedActivity] = useState<typeof ACTIVITIES[0] | null>(null);
  const [selectedSight, setSelectedSight] = useState<typeof SIGHTS[0] | null>(null);
  const [selectedItinerary, setSelectedItinerary] = useState<typeof ITINERARIES[0] | null>(null);
  const [reservationItinerary, setReservationItinerary] = useState<typeof ITINERARIES[0] | null>(null);
  const [openPractical, setOpenPractical] = useState<number | null>(null);
  const sectionNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTION_IDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = `${CDN}/wijpeg-7kppa0lzf1jd60cpcx0dap4vd/general-view-with-beach-web.jpg?width=800`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden">

      {/* ── Main Navbar ──────────────────────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? "bg-[#0F1F28] py-4 shadow-lg" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white z-50 group shrink-0">
            <img src={`${CDN}/wipng-dry58aac66c9bjhdxi3jz29f3/cavomarina-logo-white-01.png?width=300`} alt="Cavomarina Beach" className="h-8 w-auto max-w-[160px] object-contain" onError={handleImageError} />
          </Link>
          <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6">
            <Link href="/#about" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_about")}</Link>
            <Link href="/#rooms" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_rooms")}</Link>
            <Link href="/#amenities" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_amenities")}</Link>
            <Link href="/discover-cavos" className="text-primary text-xs lg:text-sm font-medium tracking-wide">{t("nav_discover")}</Link>
            <Link href="/#contact" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_contact")}</Link>
            <LangSwitcher />
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-3 lg:px-5 xl:px-6 text-xs lg:text-sm font-semibold tracking-wide" data-testid="btn-nav-book">
              <Link href="/#booking">{t("nav_book")}</Link>
            </Button>
          </div>
          <button className="md:hidden text-white z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="btn-mobile-menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className={`fixed inset-0 bg-[#0F1F28] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-medium">{t("nav_about")}</Link>
          <Link href="/#rooms" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-medium">{t("nav_rooms")}</Link>
          <Link href="/#amenities" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-medium">{t("nav_amenities")}</Link>
          <Link href="/discover-cavos" onClick={() => setMobileMenuOpen(false)} className="text-primary text-2xl font-medium">{t("nav_discover")}</Link>
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-medium">{t("nav_contact")}</Link>
          <LangSwitcher dark={false} />
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg mt-4" data-testid="btn-mobile-book">
            <Link href="/#booking" onClick={() => setMobileMenuOpen(false)}>{t("nav_book")}</Link>
          </Button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[75dvh] flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          <img src={`${CDN}/wijpeg-4332ulfqlae4u26w35fkfifgx/hotel-and-beach.jpg?width=1920`} alt="Kavos Corfu" className="w-full h-full object-cover" onError={handleImageError} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F28]/90 via-[#0F1F28]/30 to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="max-w-2xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t("discover_location")}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">{t("discover_title")}</h1>
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">{t("dc_hero_sub")}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Section Nav ───────────────────────────────────────────────── */}
      <div ref={sectionNavRef} className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto no-scrollbar gap-1 py-1">
            {NAV_SECTION_IDS.map(({ id, labelKey }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`shrink-0 px-4 py-3 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeSection === id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Things To Do ─────────────────────────────────────────────────────── */}
      <section id="things-to-do" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t("dc_todo_title")}</h2>
            <p className="text-gray-500">{t("dc_todo_sub")}</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {ACTIVITIES.map((act) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden" onClick={() => setSelectedActivity(act)}>
                  <img src={act.image} alt={act.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={handleImageError} />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#0F1F28] text-xs font-bold rounded-full">{act.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 text-base leading-snug group-hover:text-primary transition-colors">{act.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{act.shortDesc}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button onClick={() => setSelectedActivity(act)} className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-primary transition-colors">
                      {t("dc_learn_more")} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sights & Attractions ─────────────────────────────────────────────── */}
      <section id="sights" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t("dc_sights_title")}</h2>
            <p className="text-gray-500">{t("dc_sights_sub")}</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SIGHTS.map((sight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedSight(sight)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={sight.image} alt={sight.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={handleImageError} />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#0F1F28] text-xs font-bold rounded-full capitalize">{sight.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 text-base leading-snug group-hover:text-primary transition-colors">{sight.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{sight.desc.split("\n")[0]}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-primary transition-colors">
                      {t("dc_learn_more")} <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Suggested Itineraries ────────────────────────────────────────────── */}
      <section id="itineraries" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t("dc_itineraries_title")}</h2>
            <p className="text-gray-500">{t("dc_itineraries_sub")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ITINERARIES.map((itin) => (
              <motion.div
                key={itin.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="group rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer bg-white"
              >
                <div className="relative h-48 overflow-hidden" onClick={() => setSelectedItinerary(itin)}>
                  <img src={itin.image} alt={itin.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={handleImageError} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1 w-fit mb-2">
                      <Calendar className="w-3 h-3" /> {itin.duration}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug pr-4">{itin.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{itin.desc}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedItinerary(itin)}
                      className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      {t("dc_view_details")}
                    </button>
                    <button
                      onClick={() => setReservationItinerary(itin)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      {t("dc_make_reservation")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where to Eat ─────────────────────────────────────────────────────── */}
      <section id="where-to-eat" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t("dc_eat_title")}</h2>
              <p className="text-gray-500 text-sm">{t("dc_eat_sub")}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {RESTAURANTS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={handleImageError} />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {r.rating}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{r.price}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-primary transition-colors">{r.name}</h4>
                  <p className="text-xs text-primary font-semibold mb-2">{r.cuisines.join(", ")}</p>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practical Information ────────────────────────────────────────────── */}
      <section id="practical-info" className="py-16 md:py-20 bg-[#0F1F28]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t("dc_practical_title")}</h2>
              <p className="text-white/50 text-sm">{t("dc_practical_sub")}</p>
            </div>
          </div>
          <div className="space-y-3 max-w-3xl">
            {PRACTICAL_INFO_META.map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left group"
                  onClick={() => setOpenPractical(openPractical === i ? null : i)}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="flex-1 font-semibold text-sm md:text-base text-white/80 group-hover:text-white transition-colors">{t(item.titleKey)}</span>
                  <ChevronRight className={`w-5 h-5 text-white/40 transition-transform duration-300 ${openPractical === i ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {openPractical === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-white/10">
                        <p className="text-white/60 text-sm leading-relaxed">{t(item.contentKey)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("dc_cta_title")}</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{t("dc_cta_sub")}</p>
          <Button asChild className="rounded-full bg-white text-primary hover:bg-white/90 px-10 py-6 text-lg font-bold shadow-xl" data-testid="btn-discover-book">
            <Link href="/#booking">{t("nav_book")}</Link>
          </Button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0F1F28] text-white/70 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white shrink-0">
            <img src={`${CDN}/wipng-dry58aac66c9bjhdxi3jz29f3/cavomarina-logo-white-01.png?width=300`} alt="Cavomarina Beach" className="h-6 w-auto max-w-[140px] object-contain" onError={handleImageError} />
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/#home" className="hover:text-primary transition-colors">{t("footer_home")}</Link>
            <Link href="/#about" className="hover:text-primary transition-colors">{t("footer_about")}</Link>
            <Link href="/#rooms" className="hover:text-primary transition-colors">{t("footer_rooms")}</Link>
            <Link href="/#amenities" className="hover:text-primary transition-colors">{t("footer_amenities")}</Link>
            <Link href="/discover-cavos" className="hover:text-primary transition-colors">{t("footer_discover")}</Link>
            <Link href="/#gallery" className="hover:text-primary transition-colors">{t("footer_gallery")}</Link>
          </div>
          <div className="text-sm">{t("footer_copy")}</div>
        </div>
      </footer>

      {/* ── Modals ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedActivity && <ActivityModal item={selectedActivity} onClose={() => setSelectedActivity(null)} />}
        {selectedSight && <SightModal item={selectedSight} onClose={() => setSelectedSight(null)} />}
        {selectedItinerary && (
          <ItineraryModal
            item={selectedItinerary}
            onClose={() => setSelectedItinerary(null)}
            onReserve={() => { setReservationItinerary(selectedItinerary); setSelectedItinerary(null); }}
          />
        )}
        {reservationItinerary && <ReservationModal itinerary={reservationItinerary} onClose={() => setReservationItinerary(null)} />}
      </AnimatePresence>
    </div>
  );
}
