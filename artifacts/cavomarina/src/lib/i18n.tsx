import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "de" | "el";

// ─── All translations ─────────────────────────────────────────────────────────

const T = {
  en: {
    // ── Navbar
    nav_about: "About", nav_rooms: "Our Rooms", nav_amenities: "Amenities",
    nav_discover: "Discover Cavos", nav_contact: "Contact", nav_book: "Book Your Stay →",
    // ── Announcement
    announce: "Limited rooms available this summer · Book Early",
    // ── Hero
    hero_title: "Where the Sea Meets Serenity",
    hero_sub: "A lifestyle hotel in Kavos, Corfu — where untouched nature meets vibrant Mediterranean living.",
    hero_explore: "Explore Our Rooms →", hero_discover: "Discover More",
    // ── Booking widget
    book_checkin: "Check In", book_checkout: "Check Out",
    book_adults: "Adults", book_rooms: "Rooms",
    book_promo: "Promo Code", book_optional: "Optional", book_now: "Book Now",
    book_1adult: "1 Adult", book_2adults: "2 Adults", book_3adults: "3 Adults",
    book_1room: "1 Room", book_2rooms: "2 Rooms", book_3rooms: "3 Rooms",
    // ── About
    about_label: "Since 2022", about_title: "Cavomarina Beach",
    about_desc: "Newly opened lifestyle hotel set in protected wild nature at the tip of Corfu. Steps from the Kavos Strip yet worlds apart — a sanctuary of sea, sun, and genuine Greek hospitality.",
    about_gallery: "View Gallery",
    // ── Rooms
    rooms_label: "Accommodation", rooms_title: "Our Rooms", rooms_view: "View Room →",
    room1_title: "Comfort Swim-Up Room", room1_desc: "Ground floor, pool access, AC, flat-screen TV", room1_size: "20 m²",
    room2_title: "Superior Swim-Up Room", room2_desc: "Modern design, satellite TV, pool view", room2_size: "25 m²",
    room3_title: "Comfort Mountain View", room3_desc: "1st & 2nd floor, mountain & surroundings views", room3_size: "22 m²",
    room4_title: "Rooftop Penthouse", room4_desc: "Exclusive rooftop experience, panoramic sea views", room4_size: "Exclusive",
    // ── Amenities
    amenities_label: "Experience", amenities_title: "World-Class Amenities",
    amenity1_title: "Infinity Pool", amenity1_desc: "On the sandy beach, sunbeds & parasols included",
    amenity2_title: "Private Beach", amenity2_desc: "Free loungers, parasols and beach bar",
    amenity3_title: "Venus Beach Club", amenity3_desc: "Restaurant & bar open 8am to after midnight, directly on the beach",
    amenity4_title: "Spa & Wellness", amenity4_desc: "Sauna, deep tissue, sports & reiki massages",
    amenity5_title: "Greek Nights", amenity5_desc: "Live music and traditional dance performances",
    amenity6_title: "Water Sports", amenity6_desc: "Jet skiing, parasailing, banana boating nearby",
    // ── Stats
    stat_rooms: "Rooms", stat_roomtypes: "Room Types", stat_pools: "Pools", stat_rating: "Rating",
    // ── Reviews
    reviews_label: "Testimonials", reviews_title: "Guest Reviews",
    // ── Gallery
    gallery_label: "Visuals", gallery_title: "Gallery",
    // ── Discover Corfu banner
    discover_location: "Kavos · Corfu · Greece", discover_title: "Corfu",
    discover_desc: "Activities, sights, curated itineraries and local dining — discover everything the island has to offer, starting from Cavomarina Beach.",
    discover_cta: "Discover Kavos & Corfu →",
    // ── Location
    location_label: "Location", location_title: "Discover Kavos",
    location_desc: "Set at the southern tip of Corfu, Cavomarina Beach offers the perfect balance. Enjoy the untouched wild nature and serene sea views, with the vibrant Kavos Strip just a few minutes walk away.",
    location_address: "Kavos, Corfu Island, Greece",
    location_nearby: "Nearby: Corfu Town (UNESCO), Achilleion Palace",
    location_walk: "Only minutes walk to restaurants, shops and bars",
    // ── Contact
    contact_touch: "Get in Touch",
    contact_desc: "Have questions about your stay? We're here to welcome you to Cavomarina Beach.",
    contact_book: "Book Your Stay", contact_name: "Full Name",
    contact_email: "Email Address", contact_checkin: "Check-in Date",
    contact_checkout: "Check-out Date", contact_room: "Room Type",
    contact_select: "Select a room", contact_requests: "Special Requests",
    contact_placeholder: "Any special requests or questions?",
    contact_submit: "Request Booking",
    contact_name_ph: "John Doe", contact_email_ph: "john@example.com",
    room_opt1: "Comfort Swim-Up Room", room_opt2: "Superior Swim-Up Room",
    room_opt3: "Comfort Mountain View", room_opt4: "Rooftop Penthouse",
    // ── Footer
    footer_home: "Home", footer_about: "About", footer_rooms: "Rooms",
    footer_amenities: "Amenities", footer_discover: "Discover Cavos",
    footer_gallery: "Gallery", footer_copy: "© 2025 Cavomarina Beach Hotel. All rights reserved.",
    // ── Discover Cavos page — nav & headings
    dc_hero_sub: "Your gateway to the best of Corfu Island — activities, sights, dining, and curated itineraries, all starting from Cavomarina Beach.",
    dc_nav_todo: "Things To Do", dc_nav_sights: "Sights & Attractions",
    dc_nav_itineraries: "Suggested Itineraries", dc_nav_eat: "Where to Eat",
    dc_nav_practical: "Practical Info",
    dc_todo_title: "Things To Do",
    dc_todo_sub: "Curated experiences to make your stay in Corfu unforgettable.",
    dc_learn_more: "Learn more",
    dc_sights_title: "Sights & Attractions",
    dc_sights_sub: "Must-see landmarks and hidden gems around the island.",
    dc_itineraries_title: "Suggested Itineraries",
    dc_itineraries_sub: "Ready-made plans to help you make the most of your time in Corfu.",
    dc_view_details: "View Details", dc_make_reservation: "Make Reservation",
    dc_eat_title: "Where to Eat", dc_eat_sub: "Discover local flavours",
    dc_practical_title: "Practical Information",
    dc_practical_sub: "Everything you need to plan your trip",
    dc_cta_title: "Ready to explore Kavos & Corfu?",
    dc_cta_sub: "Stay at Cavomarina Beach and experience the best of Corfu Island.",
    dc_cta_btn: "Book Your Stay →",
    // ── Modals
    modal_close: "Close", modal_highlights: "Highlights", modal_daybyday: "Day by Day",
    modal_reservation_title: "Make a Reservation",
    modal_name: "Full Name", modal_phone: "Phone", modal_email_f: "Email",
    modal_checkin_f: "Check-in", modal_checkout_f: "Check-out", modal_message: "Message",
    modal_message_ph: "Any special requests or questions?",
    modal_send: "Send Reservation Request",
    modal_sent_title: "Reservation request sent!",
    modal_sent_sub: "We'll get back to you at info@cavomarina.com",
    // ── Practical info content
    pi1_title: "Getting Here",
    pi1_content: "Corfu International Airport (CFU), also known as Ioannis Kapodistrias Airport, is just 3 km from Corfu Town. Direct charter and scheduled flights operate from major European cities. From the airport, Cavomarina Beach Hotel is approximately 45 minutes by taxi or transfer.",
    pi2_title: "Getting Around",
    pi2_content: "A rental car is recommended for exploring the island. Corfu has a good network of roads connecting all main attractions. Local buses (KTEL) serve major routes. Taxis are available at the hotel reception. The Kavos strip, beaches, and local tavernas are within walking distance of Cavomarina.",
    pi3_title: "Money & Currency",
    pi3_content: "Greece uses the Euro (€). ATMs are widely available in Kavos and Corfu Town. Most restaurants, hotels, and shops accept major credit cards. Carry some cash for smaller shops and beach bars. Tipping in restaurants — typically 10% is standard.",
    pi4_title: "Best Time to Visit",
    pi4_content: "The best time to visit Corfu is from May to October. Peak summer (July–August) brings temperatures of 28–35°C and guaranteed sunshine. June and September offer warm weather with fewer crowds. Spring and autumn are ideal for hiking and sightseeing. The hotel is open from April to October.",
    pi5_title: "Useful Tips",
    pi5_content: "EU roaming rules apply for European visitors. Local SIM cards are available at the airport. Pharmacies are open until 14:00 on weekdays. Greek emergency number: 112. Sunscreen, hats, and insect repellent are essential in summer. Dress modestly when visiting religious sites.",
  },

  de: {
    nav_about: "Über uns", nav_rooms: "Unsere Zimmer", nav_amenities: "Ausstattung",
    nav_discover: "Kavos Entdecken", nav_contact: "Kontakt", nav_book: "Jetzt Buchen →",
    announce: "Begrenzte Zimmer verfügbar · Frühzeitig Buchen",
    hero_title: "Wo das Meer auf Stille trifft",
    hero_sub: "Ein Lifestyle-Hotel in Kavos, Korfu — wo unberührte Natur auf lebendiges mediterranes Leben trifft.",
    hero_explore: "Unsere Zimmer →", hero_discover: "Mehr Entdecken",
    book_checkin: "Anreise", book_checkout: "Abreise",
    book_adults: "Erwachsene", book_rooms: "Zimmer",
    book_promo: "Aktionscode", book_optional: "Optional", book_now: "Jetzt Buchen",
    book_1adult: "1 Erwachsener", book_2adults: "2 Erwachsene", book_3adults: "3 Erwachsene",
    book_1room: "1 Zimmer", book_2rooms: "2 Zimmer", book_3rooms: "3 Zimmer",
    about_label: "Seit 2022", about_title: "Cavomarina Beach",
    about_desc: "Neu eröffnetes Lifestyle-Hotel in unberührter Natur an der Spitze von Korfu. Nur wenige Schritte vom Kavos-Strip entfernt — ein Refugium aus Meer, Sonne und echter griechischer Gastfreundschaft.",
    about_gallery: "Galerie Ansehen",
    rooms_label: "Unterkunft", rooms_title: "Unsere Zimmer", rooms_view: "Zimmer Ansehen →",
    room1_title: "Comfort Swim-Up Zimmer", room1_desc: "Erdgeschoss, Poolzugang, Klimaanlage, Flachbildfernseher", room1_size: "20 m²",
    room2_title: "Superior Swim-Up Zimmer", room2_desc: "Modernes Design, Satelliten-TV, Poolblick", room2_size: "25 m²",
    room3_title: "Comfort Bergblick", room3_desc: "1. & 2. Etage, Blick auf Berge und Umgebung", room3_size: "22 m²",
    room4_title: "Dachterrassen-Penthouse", room4_desc: "Exklusives Dachterrassen-Erlebnis, Panoramablick auf das Meer", room4_size: "Exklusiv",
    amenities_label: "Erlebnisse", amenities_title: "Erstklassige Ausstattung",
    amenity1_title: "Infinity-Pool", amenity1_desc: "Direkt am Sandstrand, Sonnenliegen & Sonnenschirme inklusive",
    amenity2_title: "Privatstrand", amenity2_desc: "Kostenlose Liegestühle, Sonnenschirme und Strandbar",
    amenity3_title: "Venus Beach Club", amenity3_desc: "Restaurant & Bar von 8 Uhr bis nach Mitternacht, direkt am Strand",
    amenity4_title: "Spa & Wellness", amenity4_desc: "Sauna, Tiefengewebsmassagen, Sport- und Reiki-Massagen",
    amenity5_title: "Griechische Nächte", amenity5_desc: "Live-Musik und traditionelle Tanzvorführungen",
    amenity6_title: "Wassersport", amenity6_desc: "Jetski, Parasailing, Bananaboot in der Nähe",
    stat_rooms: "Zimmer", stat_roomtypes: "Zimmertypen", stat_pools: "Pools", stat_rating: "Bewertung",
    reviews_label: "Bewertungen", reviews_title: "Gästebewertungen",
    gallery_label: "Bilder", gallery_title: "Galerie",
    discover_location: "Kavos · Korfu · Griechenland", discover_title: "Korfu",
    discover_desc: "Aktivitäten, Sehenswürdigkeiten, Reiserouten und lokale Gastronomie — entdecken Sie alles, was die Insel zu bieten hat, beginnend am Cavomarina Beach.",
    discover_cta: "Kavos & Korfu Entdecken →",
    location_label: "Lage", location_title: "Kavos Entdecken",
    location_desc: "An der südlichen Spitze von Korfu bietet Cavomarina Beach die perfekte Balance. Genießen Sie die unberührte Wildnis und das ruhige Meer, während der lebhafte Kavos-Strip nur wenige Gehminuten entfernt ist.",
    location_address: "Kavos, Insel Korfu, Griechenland",
    location_nearby: "In der Nähe: Korfu-Stadt (UNESCO), Achilleion-Palast",
    location_walk: "Nur wenige Gehminuten zu Restaurants, Geschäften und Bars",
    contact_touch: "Kontakt Aufnehmen",
    contact_desc: "Haben Sie Fragen zu Ihrem Aufenthalt? Wir heißen Sie herzlich willkommen.",
    contact_book: "Jetzt Buchen", contact_name: "Vollständiger Name",
    contact_email: "E-Mail-Adresse", contact_checkin: "Anreisedatum",
    contact_checkout: "Abreisedatum", contact_room: "Zimmertyp",
    contact_select: "Zimmer auswählen", contact_requests: "Besondere Wünsche",
    contact_placeholder: "Besondere Wünsche oder Fragen?",
    contact_submit: "Buchungsanfrage Senden",
    contact_name_ph: "Max Mustermann", contact_email_ph: "max@example.com",
    room_opt1: "Comfort Swim-Up Zimmer", room_opt2: "Superior Swim-Up Zimmer",
    room_opt3: "Comfort Bergblick", room_opt4: "Dachterrassen-Penthouse",
    footer_home: "Startseite", footer_about: "Über uns", footer_rooms: "Zimmer",
    footer_amenities: "Ausstattung", footer_discover: "Kavos Entdecken",
    footer_gallery: "Galerie", footer_copy: "© 2025 Cavomarina Beach Hotel. Alle Rechte vorbehalten.",
    dc_hero_sub: "Ihr Tor zum Besten der Insel Korfu — Aktivitäten, Sehenswürdigkeiten, Gastronomie und Reiserouten, alle beginnend am Cavomarina Beach.",
    dc_nav_todo: "Aktivitäten", dc_nav_sights: "Sehenswürdigkeiten",
    dc_nav_itineraries: "Reiserouten", dc_nav_eat: "Restaurants",
    dc_nav_practical: "Praktische Infos",
    dc_todo_title: "Aktivitäten",
    dc_todo_sub: "Kuratierte Erlebnisse für einen unvergesslichen Aufenthalt auf Korfu.",
    dc_learn_more: "Mehr erfahren",
    dc_sights_title: "Sehenswürdigkeiten",
    dc_sights_sub: "Sehenswerte Wahrzeichen und versteckte Schätze auf der Insel.",
    dc_itineraries_title: "Empfohlene Reiserouten",
    dc_itineraries_sub: "Fertige Pläne, um das Beste aus Ihrer Zeit auf Korfu zu machen.",
    dc_view_details: "Details Ansehen", dc_make_reservation: "Reservierung Vornehmen",
    dc_eat_title: "Restaurants", dc_eat_sub: "Lokale Köstlichkeiten entdecken",
    dc_practical_title: "Praktische Informationen",
    dc_practical_sub: "Alles, was Sie für Ihre Reiseplanung brauchen",
    dc_cta_title: "Bereit, Kavos & Korfu zu entdecken?",
    dc_cta_sub: "Übernachten Sie im Cavomarina Beach und erleben Sie das Beste von Korfu.",
    dc_cta_btn: "Jetzt Buchen →",
    modal_close: "Schließen", modal_highlights: "Highlights", modal_daybyday: "Tag für Tag",
    modal_reservation_title: "Reservierung Vornehmen",
    modal_name: "Vollständiger Name", modal_phone: "Telefon", modal_email_f: "E-Mail",
    modal_checkin_f: "Anreise", modal_checkout_f: "Abreise", modal_message: "Nachricht",
    modal_message_ph: "Besondere Wünsche oder Fragen?",
    modal_send: "Reservierungsanfrage Senden",
    modal_sent_title: "Reservierungsanfrage gesendet!",
    modal_sent_sub: "Wir melden uns unter info@cavomarina.com bei Ihnen.",
    pi1_title: "Anreise",
    pi1_content: "Der Internationale Flughafen Korfu (CFU), auch als Ioannis-Kapodistrias-Flughafen bekannt, liegt nur 3 km vom Stadtzentrum entfernt. Direkte Charter- und Linienflüge aus wichtigen europäischen Städten. Das Cavomarina Beach Hotel erreichen Sie vom Flughafen in ca. 45 Minuten mit Taxi oder Transfer.",
    pi2_title: "Fortbewegung auf Korfu",
    pi2_content: "Ein Mietwagen wird empfohlen, um die Insel zu erkunden. Korfu hat ein gutes Straßennetz zu allen wichtigen Sehenswürdigkeiten. Lokale Busse (KTEL) bedienen wichtige Strecken. Taxis stehen an der Hotelrezeption bereit. Der Kavos-Strip, Strände und Tavernen sind fußläufig erreichbar.",
    pi3_title: "Geld & Währung",
    pi3_content: "Griechenland verwendet den Euro (€). Geldautomaten gibt es in Kavos und Korfu-Stadt. Die meisten Restaurants und Geschäfte akzeptieren Kreditkarten. Empfehlenswert ist Bargeld für kleinere Läden. Trinkgeld in Restaurants: ca. 10%.",
    pi4_title: "Beste Reisezeit",
    pi4_content: "Die beste Reisezeit nach Korfu ist von Mai bis Oktober. Im Hochsommer (Juli–August) herrschen 28–35 °C. Im Juni und September ist es warm mit weniger Touristen. Frühling und Herbst sind ideal für Wanderungen. Das Hotel ist von April bis Oktober geöffnet.",
    pi5_title: "Nützliche Tipps",
    pi5_content: "EU-Roaming-Regeln gelten für europäische Besucher. Lokale SIM-Karten am Flughafen erhältlich. Apotheken werktags bis 14:00 Uhr geöffnet. Notruf Griechenland: 112. Sonnenschutz, Hüte und Insektenschutzmittel sind im Sommer unverzichtbar. Beim Besuch religiöser Stätten angemessen kleiden.",
  },

  el: {
    nav_about: "Σχετικά", nav_rooms: "Τα Δωμάτιά μας", nav_amenities: "Παροχές",
    nav_discover: "Ανακαλύψτε τον Καβό", nav_contact: "Επικοινωνία", nav_book: "Κάντε Κράτηση →",
    announce: "Περιορισμένα δωμάτια διαθέσιμα · Κλείστε Έγκαιρα",
    hero_title: "Εκεί που η Θάλασσα Συναντά τη Γαλήνη",
    hero_sub: "Ένα lifestyle ξενοδοχείο στον Καβό της Κέρκυρας — εκεί που η ανέγγιχτη φύση συναντά τη ζωντανή μεσογειακή ζωή.",
    hero_explore: "Εξερευνήστε τα Δωμάτια →", hero_discover: "Ανακαλύψτε Περισσότερα",
    book_checkin: "Άφιξη", book_checkout: "Αναχώρηση",
    book_adults: "Ενήλικες", book_rooms: "Δωμάτια",
    book_promo: "Κωδικός Προσφοράς", book_optional: "Προαιρετικό", book_now: "Κράτηση Τώρα",
    book_1adult: "1 Ενήλικας", book_2adults: "2 Ενήλικες", book_3adults: "3 Ενήλικες",
    book_1room: "1 Δωμάτιο", book_2rooms: "2 Δωμάτια", book_3rooms: "3 Δωμάτια",
    about_label: "Από το 2022", about_title: "Cavomarina Beach",
    about_desc: "Νεοαναγερμένο lifestyle ξενοδοχείο σε προστατευμένη φυσική τοποθεσία στην άκρη της Κέρκυρας. Λίγα βήματα από τον Kavos Strip — ένα καταφύγιο θάλασσας, ήλιου και αυθεντικής ελληνικής φιλοξενίας.",
    about_gallery: "Δείτε τη Γκαλερί",
    rooms_label: "Διαμονή", rooms_title: "Τα Δωμάτιά μας", rooms_view: "Δείτε το Δωμάτιο →",
    room1_title: "Comfort Swim-Up Δωμάτιο", room1_desc: "Ισόγειο, πρόσβαση στην πισίνα, κλιματισμός, οθόνη", room1_size: "20 m²",
    room2_title: "Superior Swim-Up Δωμάτιο", room2_desc: "Μοντέρνο design, δορυφορική TV, θέα στην πισίνα", room2_size: "25 m²",
    room3_title: "Comfort Θέα Βουνό", room3_desc: "1ος & 2ος όροφος, θέα στο βουνό και το τοπίο", room3_size: "22 m²",
    room4_title: "Rooftop Penthouse", room4_desc: "Αποκλειστική εμπειρία στην οροφή, πανοραμική θέα θάλασσας", room4_size: "Αποκλειστικό",
    amenities_label: "Εμπειρία", amenities_title: "Παγκόσμιας Κλάσης Παροχές",
    amenity1_title: "Πισίνα Infinity", amenity1_desc: "Στην αμμώδη παραλία, ξαπλώστρες & ομπρέλες συμπεριλαμβάνονται",
    amenity2_title: "Ιδιωτική Παραλία", amenity2_desc: "Δωρεάν ξαπλώστρες, ομπρέλες και beach bar",
    amenity3_title: "Venus Beach Club", amenity3_desc: "Εστιατόριο & bar ανοιχτό από 8 π.μ. έως αργά το βράδυ, στην παραλία",
    amenity4_title: "Spa & Ευεξία", amenity4_desc: "Σάουνα, μασάζ βαθέων ιστών, αθλητικά & reiki μασάζ",
    amenity5_title: "Ελληνικές Νύχτες", amenity5_desc: "Ζωντανή μουσική και παραδοσιακές χορευτικές παραστάσεις",
    amenity6_title: "Θαλάσσια Σπορ", amenity6_desc: "Jet ski, parasailing, banana boat στη γύρω περιοχή",
    stat_rooms: "Δωμάτια", stat_roomtypes: "Τύποι Δωματίων", stat_pools: "Πισίνες", stat_rating: "Βαθμολογία",
    reviews_label: "Μαρτυρίες", reviews_title: "Κριτικές Επισκεπτών",
    gallery_label: "Εικόνες", gallery_title: "Γκαλερί",
    discover_location: "Καβός · Κέρκυρα · Ελλάδα", discover_title: "Κέρκυρα",
    discover_desc: "Δραστηριότητες, αξιοθέατα, διαδρομές και τοπική γαστρονομία — ανακαλύψτε ό,τι καλύτερο έχει να προσφέρει το νησί, ξεκινώντας από το Cavomarina Beach.",
    discover_cta: "Ανακαλύψτε Καβό & Κέρκυρα →",
    location_label: "Τοποθεσία", location_title: "Ανακαλύψτε τον Καβό",
    location_desc: "Στη νότια άκρη της Κέρκυρας, το Cavomarina Beach προσφέρει την τέλεια ισορροπία. Απολαύστε την άγρια φύση και τη γαλήνη της θάλασσας, με τον Kavos Strip μόλις λίγα λεπτά με τα πόδια.",
    location_address: "Καβός, Κέρκυρα, Ελλάδα",
    location_nearby: "Κοντά: Κέρκυρα (UNESCO), Αχίλλειο",
    location_walk: "Μόλις λίγα λεπτά με τα πόδια σε εστιατόρια και μπαρ",
    contact_touch: "Επικοινωνήστε μαζί μας",
    contact_desc: "Έχετε ερωτήσεις; Είμαστε εδώ για να σας υποδεχτούμε στο Cavomarina Beach.",
    contact_book: "Κάντε Κράτηση", contact_name: "Ονοματεπώνυμο",
    contact_email: "Διεύθυνση Email", contact_checkin: "Ημερομηνία Άφιξης",
    contact_checkout: "Ημερομηνία Αναχώρησης", contact_room: "Τύπος Δωματίου",
    contact_select: "Επιλέξτε δωμάτιο", contact_requests: "Ειδικά Αιτήματα",
    contact_placeholder: "Ειδικά αιτήματα ή ερωτήσεις;",
    contact_submit: "Αίτημα Κράτησης",
    contact_name_ph: "Γιάννης Παπαδόπουλος", contact_email_ph: "giannis@example.com",
    room_opt1: "Comfort Swim-Up Δωμάτιο", room_opt2: "Superior Swim-Up Δωμάτιο",
    room_opt3: "Comfort Θέα Βουνό", room_opt4: "Rooftop Penthouse",
    footer_home: "Αρχική", footer_about: "Σχετικά", footer_rooms: "Δωμάτια",
    footer_amenities: "Παροχές", footer_discover: "Ανακαλύψτε τον Καβό",
    footer_gallery: "Γκαλερί", footer_copy: "© 2025 Cavomarina Beach Hotel. Με επιφύλαξη παντός δικαιώματος.",
    dc_hero_sub: "Η πύλη σας για τα καλύτερα της Κέρκυρας — δραστηριότητες, αξιοθέατα, γαστρονομία και διαδρομές, ξεκινώντας από το Cavomarina Beach.",
    dc_nav_todo: "Τι να Κάνετε", dc_nav_sights: "Αξιοθέατα",
    dc_nav_itineraries: "Προτεινόμενα Προγράμματα", dc_nav_eat: "Πού να Φάτε",
    dc_nav_practical: "Πρακτικές Πληροφορίες",
    dc_todo_title: "Τι να Κάνετε",
    dc_todo_sub: "Επιμελημένες εμπειρίες για μια αξέχαστη παραμονή στην Κέρκυρα.",
    dc_learn_more: "Μάθετε περισσότερα",
    dc_sights_title: "Αξιοθέατα",
    dc_sights_sub: "Αξιοθέατα που αξίζει να επισκεφθείτε γύρω από το νησί.",
    dc_itineraries_title: "Προτεινόμενα Προγράμματα",
    dc_itineraries_sub: "Έτοιμα πλάνα για να αξιοποιήσετε στο έπακρο τον χρόνο σας στην Κέρκυρα.",
    dc_view_details: "Δείτε Λεπτομέρειες", dc_make_reservation: "Κάντε Κράτηση",
    dc_eat_title: "Πού να Φάτε", dc_eat_sub: "Ανακαλύψτε τοπικές γεύσεις",
    dc_practical_title: "Πρακτικές Πληροφορίες",
    dc_practical_sub: "Όλα όσα χρειάζεστε για να οργανώσετε το ταξίδι σας",
    dc_cta_title: "Έτοιμοι να εξερευνήσετε τον Καβό & την Κέρκυρα;",
    dc_cta_sub: "Μείνετε στο Cavomarina Beach και ζήστε τα καλύτερα της Κέρκυρας.",
    dc_cta_btn: "Κάντε Κράτηση →",
    modal_close: "Κλείσιμο", modal_highlights: "Κύρια Σημεία", modal_daybyday: "Μέρα με τη Μέρα",
    modal_reservation_title: "Κάντε Κράτηση",
    modal_name: "Ονοματεπώνυμο", modal_phone: "Τηλέφωνο", modal_email_f: "Email",
    modal_checkin_f: "Άφιξη", modal_checkout_f: "Αναχώρηση", modal_message: "Μήνυμα",
    modal_message_ph: "Ειδικά αιτήματα ή ερωτήσεις;",
    modal_send: "Αποστολή Αιτήματος Κράτησης",
    modal_sent_title: "Το αίτημα κράτησης στάλθηκε!",
    modal_sent_sub: "Θα επικοινωνήσουμε μαζί σας στο info@cavomarina.com",
    pi1_title: "Πώς να Φτάσετε",
    pi1_content: "Το Διεθνές Αεροδρόμιο Κέρκυρας (CFU) βρίσκεται μόλις 3 χλμ από το κέντρο της Κέρκυρας. Απευθείας πτήσεις από μεγάλες ευρωπαϊκές πόλεις. Το Cavomarina Beach Hotel απέχει περίπου 45 λεπτά με ταξί ή μεταφορά.",
    pi2_title: "Μετακίνηση στο Νησί",
    pi2_content: "Συνιστάται ενοικίαση αυτοκινήτου για να εξερευνήσετε το νησί. Καλό οδικό δίκτυο συνδέει τα κύρια αξιοθέατα. Τοπικά λεωφορεία (ΚΤΕΛ) εξυπηρετούν κύριες διαδρομές. Ταξί διαθέσιμα στη ρεσεψιόν. Ο Kavos Strip, οι παραλίες και οι ταβέρνες είναι σε απόσταση βάδισης.",
    pi3_title: "Χρήματα & Νόμισμα",
    pi3_content: "Η Ελλάδα χρησιμοποιεί το Ευρώ (€). ΑΤΜ διαθέσιμα στον Καβό και στην Κέρκυρα. Τα περισσότερα εστιατόρια δέχονται πιστωτικές κάρτες. Συνιστάται μετρητά για μικρά καταστήματα. Φιλοδώρημα: ~10%.",
    pi4_title: "Καλύτερη Εποχή",
    pi4_content: "Η καλύτερη εποχή για την Κέρκυρα είναι Μάιος–Οκτώβριος. Καλοκαίρι (Ιούλιος–Αύγουστος): 28–35°C. Ιούνιος & Σεπτέμβριος: ζεστά με λιγότερο κόσμο. Ανοιξη & Φθινόπωρο ιδανικά για εκδρομές. Το ξενοδοχείο λειτουργεί Απρίλιο–Οκτώβριο.",
    pi5_title: "Χρήσιμες Συμβουλές",
    pi5_content: "Κανόνες EU roaming για Ευρωπαίους επισκέπτες. Τοπικές SIM κάρτες στο αεροδρόμιο. Φαρμακεία έως 14:00. Αριθμός έκτακτης ανάγκης: 112. Αντηλιακό, καπέλα και εντομοαπωθητικό απαραίτητα το καλοκαίρι.",
  },
} as const;

export type TKey = keyof typeof T.en;

// ─── Context ─────────────────────────────────────────────────────────────────

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: (key) => T.en[key] as string,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: TKey): string => (T[lang][key] ?? T.en[key]) as string;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// ─── Language Switcher component ─────────────────────────────────────────────

const FLAGS: Record<Lang, string> = { en: "🇬🇧", de: "🇩🇪", el: "🇬🇷" };
const LABELS: Record<Lang, string> = { en: "EN", de: "DE", el: "EL" };

export function LangSwitcher({ dark = true }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1">
      {(["en", "de", "el"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-all duration-200 ${
            lang === l
              ? "bg-primary text-white shadow-sm"
              : dark
              ? "text-white/60 hover:text-white hover:bg-white/10"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <span>{FLAGS[l]}</span>
          <span className="hidden sm:inline">{LABELS[l]}</span>
        </button>
      ))}
    </div>
  );
}
