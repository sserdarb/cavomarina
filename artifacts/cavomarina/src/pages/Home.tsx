import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, Menu, X, Waves, Car, Coffee, Utensils, Star, MapPin, Mail, Phone, Maximize, Droplets, Sun } from "lucide-react";
import { useLang, LangSwitcher } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

const HERO_SLIDES = [
  {
    src: "https://image-tc.galaxy.tf/wijpeg-7kppa0lzf1jd60cpcx0dap4vd/general-view-with-beach-web.jpg?width=1920",
    alt: "Aerial view of Cavomarina Beach Hotel",
    kb: "kb-1",
  },
  {
    src: "https://image-tc.galaxy.tf/wijpeg-4332ulfqlae4u26w35fkfifgx/hotel-and-beach.jpg?width=1920",
    alt: "Cavomarina Beach Hotel from the sea",
    kb: "kb-2",
  },
  {
    src: "https://image-tc.galaxy.tf/wijpeg-bhg9t519br0zb2mzlzy9pmucw/main-pool-diving2.jpg?width=1920",
    alt: "Infinity pool at sunset",
    kb: "kb-3",
  },
  {
    src: "https://image-tc.galaxy.tf/wijpeg-da330yzs18oy60uzli1xybx6q/venus-beach-1.jpg?width=1920",
    alt: "Venus Beach at Cavomarina",
    kb: "kb-4",
  },
];

export default function Home() {
  const { t } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  const [bookingState, setBookingState] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    rooms: '1',
    promo: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(s => (s + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = 'https://image-tc.galaxy.tf/wijpeg-7kppa0lzf1jd60cpcx0dap4vd/general-view-with-beach-web.jpg?width=800';
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Announcement Bar */}
      <div className="bg-[#0F1F28] text-white text-xs py-2 text-center tracking-wide font-light hidden md:block">
        {t("announce")}
      </div>

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? "bg-[#0F1F28] py-4 shadow-lg" : "bg-transparent py-6"
        }`}
        style={{ top: isScrolled ? "0" : "" }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white z-50 group shrink-0">
            <img src="https://image-tc.galaxy.tf/wipng-dry58aac66c9bjhdxi3jz29f3/cavomarina-logo-white-01.png?width=300" alt="Cavomarina Beach" className="h-8 w-auto max-w-[160px] object-contain" onError={handleImageError} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6">
            <a href="#about" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_about")}</a>
            <a href="#rooms" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_rooms")}</a>
            <a href="#amenities" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_amenities")}</a>
            <Link href="/discover-cavos" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_discover")}</Link>
            <a href="#contact" className="text-white hover:text-primary transition-colors text-xs lg:text-sm font-medium tracking-wide">{t("nav_contact")}</a>
            <LangSwitcher />
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-3 lg:px-5 xl:px-6 text-xs lg:text-sm font-semibold tracking-wide" data-testid="btn-nav-book">
              <a href="#booking">{t("nav_book")}</a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#0F1F28] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-primary transition-colors text-2xl font-medium">{t("nav_about")}</a>
          <a href="#rooms" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-primary transition-colors text-2xl font-medium">{t("nav_rooms")}</a>
          <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-primary transition-colors text-2xl font-medium">{t("nav_amenities")}</a>
          <Link href="/discover-cavos" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-primary transition-colors text-2xl font-medium">{t("nav_discover")}</Link>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-primary transition-colors text-2xl font-medium">{t("nav_contact")}</a>
          <LangSwitcher dark={false} />
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg mt-4" data-testid="btn-mobile-book">
            <a href="#booking" onClick={() => setMobileMenuOpen(false)}>{t("nav_book")}</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section — Ken Burns Slideshow */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden" id="home">
        {/* Slides */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            {HERO_SLIDES.map((slide, i) =>
              i === heroSlide ? (
                <motion.div
                  key={i}
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={`w-full h-full object-cover ${slide.kb}`}
                    onError={handleImageError}
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
          {/* Overlays */}
          <div className="absolute inset-0 bg-[#0F1F28]/45 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F28] via-transparent to-transparent opacity-80 z-10" />
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-20 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            >
              {t("hero_title")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {t("hero_sub")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg w-full sm:w-auto" data-testid="btn-hero-explore">
                <a href="#rooms">{t("hero_explore")}</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-[#0F1F28] px-8 py-6 text-lg w-full sm:w-auto transition-colors" data-testid="btn-hero-discover">
                <a href="#about">{t("hero_discover")}</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`transition-all duration-500 rounded-full ${
                i === heroSlide
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Booking Widget */}
      <section className="bg-[#0F1F28] py-6 border-b border-white/10 sticky top-[0px] z-30 shadow-2xl" id="booking">
        <div className="container mx-auto px-6 md:px-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const params = new URLSearchParams({
                checkIn: bookingState.checkIn,
                checkOut: bookingState.checkOut,
                rooms: bookingState.rooms,
                adults: bookingState.adults,
                ...(bookingState.promo ? { rateCode: bookingState.promo } : {})
              });
              window.open(`https://reservations.travelclick.com/114932?${params.toString()}`, '_blank');
            }}
            className="flex flex-col lg:flex-row items-end gap-4 lg:gap-3"
          >
            <div className="w-full lg:w-auto flex-1 space-y-1">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">{t("book_checkin")}</label>
              <input type="date" value={bookingState.checkIn} onChange={e => setBookingState(s => ({...s, checkIn: e.target.value}))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary [color-scheme:dark]"
                data-testid="input-checkin" />
            </div>
            <div className="w-full lg:w-auto flex-1 space-y-1">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">{t("book_checkout")}</label>
              <input type="date" value={bookingState.checkOut} onChange={e => setBookingState(s => ({...s, checkOut: e.target.value}))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary [color-scheme:dark]"
                data-testid="input-checkout" />
            </div>
            <div className="w-full lg:w-32 space-y-1">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">{t("book_adults")}</label>
              <select value={bookingState.adults} onChange={e => setBookingState(s => ({...s, adults: e.target.value}))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                data-testid="select-adults">
                <option value="1" className="text-black">{t("book_1adult")}</option>
                <option value="2" className="text-black">{t("book_2adults")}</option>
                <option value="3" className="text-black">{t("book_3adults")}</option>
              </select>
            </div>
            <div className="w-full lg:w-32 space-y-1">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">{t("book_rooms")}</label>
              <select value={bookingState.rooms} onChange={e => setBookingState(s => ({...s, rooms: e.target.value}))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                data-testid="select-rooms">
                <option value="1" className="text-black">{t("book_1room")}</option>
                <option value="2" className="text-black">{t("book_2rooms")}</option>
                <option value="3" className="text-black">{t("book_3rooms")}</option>
              </select>
            </div>
            <div className="w-full lg:w-40 space-y-1">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">{t("book_promo")}</label>
              <input type="text" placeholder={t("book_optional")} value={bookingState.promo} onChange={e => setBookingState(s => ({...s, promo: e.target.value}))}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                data-testid="input-promo" />
            </div>
            <button type="submit"
              className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-lg transition-colors whitespace-nowrap"
              data-testid="btn-book-now">
              {t("book_now")}
            </button>
          </form>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
                {t("about_label")}
              </motion.h2>
              <motion.h3 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#0F1F28] mb-6 leading-tight">
                {t("about_title")}
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t("about_desc")}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button asChild className="rounded-full bg-[#0F1F28] text-white hover:bg-[#0F1F28]/90 px-8" data-testid="btn-about-more">
                  <a href="#gallery">{t("about_gallery")}</a>
                </Button>
              </motion.div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4 relative">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12"
              >
                <img src="https://image-tc.galaxy.tf/wijpeg-53jbltw8o6qye0hu3ej4431i4/general-view-7-2.jpg?width=800" onError={handleImageError} alt="Hotel exterior" className="w-full h-[300px] object-cover rounded-2xl shadow-xl" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img src="https://image-tc.galaxy.tf/wijpeg-7kppa0lzf1jd60cpcx0dap4vd/general-view-with-beach-web.jpg?width=800" onError={handleImageError} alt="Beachfront dining" className="w-full h-[350px] object-cover rounded-2xl shadow-xl" />
              </motion.div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 md:py-32 bg-[#0F1F28] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-primary font-semibold tracking-wider uppercase text-sm mb-3"
            >
              {t("rooms_label")}
            </motion.h2>
            <motion.h3 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {t("rooms_title")}
            </motion.h3>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                title: t("room1_title"),
                image: "https://image-tc.galaxy.tf/wijpeg-esa9cenqpdzp5yftk2ple3r4j/107-double-extra-bed-swim-up-room-7-2.jpg?width=800",
                fallback: "https://image-tc.galaxy.tf/wijpeg-2rzxuurafrw7vkb20aku0s2l/swim-up-pool-2-2.jpg?width=800",
                size: t("room1_size"),
                desc: t("room1_desc")
              },
              {
                title: t("room2_title"),
                image: "https://image-tc.galaxy.tf/wijpeg-47zpqyi5hnza413zxx87azby3/p2-double-swim-uo-room-1-inpixio-2.jpg?width=800",
                fallback: "https://image-tc.galaxy.tf/wijpeg-esa9cenqpdzp5yftk2ple3r4j/107-double-extra-bed-swim-up-room-7-2.jpg?width=800",
                size: t("room2_size"),
                desc: t("room2_desc")
              },
              {
                title: t("room3_title"),
                image: "https://image-tc.galaxy.tf/wijpeg-46dszy69q7skzsishv13r36xe/room-details-7wb.jpg?width=800",
                fallback: "https://image-tc.galaxy.tf/wijpeg-d2nmtl31cs37784f6xudybtz3/room-details-6wb.jpg?width=800",
                size: t("room3_size"),
                desc: t("room3_desc")
              },
              {
                title: t("room4_title"),
                image: "https://image-tc.galaxy.tf/wijpeg-d2nmtl31cs37784f6xudybtz3/room-details-6wb.jpg?width=800",
                fallback: "https://image-tc.galaxy.tf/wijpeg-4okifwi3zambh9ie2231fz2eq/room-details-2wb.jpg?width=800",
                size: t("room4_size"),
                desc: t("room4_desc")
              },
              {
                title: t("room5_title"),
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1170&auto=format&fit=crop",
                fallback: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1157&auto=format&fit=crop",
                size: t("room5_size"),
                desc: t("room5_desc")
              }
            ].map((room, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title} 
                    onError={(e) => { (e.target as HTMLImageElement).src = room.fallback; }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-bold">{room.title}</h4>
                    <span className="text-primary font-medium text-sm flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                      <Maximize className="w-3 h-3" /> {room.size}
                    </span>
                  </div>
                  <p className="text-white/70 mb-6 font-light">{room.desc}</p>
                  <Button variant="link" className="text-primary p-0 h-auto hover:text-white transition-colors" data-testid={`btn-view-room-${i}`}>
                    {t("rooms_view")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">{t("amenities_label")}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#0F1F28] mb-6">{t("amenities_title")}</h3>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Waves, title: t("amenity1_title"), desc: t("amenity1_desc") },
              { icon: Sun, title: t("amenity2_title"), desc: t("amenity2_desc") },
              { icon: Utensils, title: t("amenity3_title"), desc: t("amenity3_desc") },
              { icon: Droplets, title: t("amenity4_title"), desc: t("amenity4_desc") },
              { icon: Star, title: t("amenity5_title"), desc: t("amenity5_desc") },
              { icon: Anchor, title: t("amenity6_title"), desc: t("amenity6_desc") }
            ].map((amenity, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-white border shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <amenity.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-[#0F1F28] mb-3">{amenity.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{amenity.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-[#0F1F28]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "88", label: t("stat_rooms") },
              { num: "5", label: t("stat_roomtypes") },
              { num: "2", label: t("stat_pools") },
              { num: "4★", label: t("stat_rating") }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-5xl md:text-6xl font-bold mb-2">{stat.num}</span>
                <span className="text-lg font-medium tracking-wide uppercase opacity-80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">{t("reviews_label")}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#0F1F28] mb-6">{t("reviews_title")}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "I loved this hotel", author: "Emma", text: "It was perfect for a solo getaway before the season started. I went in April and there wasn't much open but I easily hired a car from reception. The staff were so friendly and the ladies at reception were lovely. They could not be more welcoming. It was 27 degrees some days and so beautiful." },
              { title: "This hotel and its location is just dreamy..", author: "Helen", text: "Sunbeds on the beach, breakfast with a sea view and a pool outside our room — but what makes this the best hotel is the staff. Everyone of them is a treasure: polite, helpful and always cheerful. Miguel is truly the jewel in the crown; he goes out of his way to make sure your holiday is perfect." },
              { title: "Beautiful and spacious rooms with balconies", author: "Jessica", text: "The hotel is located opposite the beach and has many deckchairs. Their cuisine is delicious. The room is spacious with a balcony. The staff is welcoming and kind. The hotel is located 45 minutes from Corfu Town — a car is recommended for visiting the surrounding area." }
            ].map((review, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border shadow-sm relative flex flex-col">
                <Star className="text-primary/20 w-16 h-16 absolute top-6 right-6 z-0" />
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex gap-1 text-primary mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <h4 className="font-bold text-xl text-[#0F1F28] mb-3">{review.title}</h4>
                  <p className="text-[#0F1F28] text-base mb-6 flex-1 opacity-80 leading-relaxed">"{review.text}"</p>
                  <div>
                    <p className="font-bold text-[#0F1F28]">— {review.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-[#0F1F28]">
        <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">{t("gallery_label")}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">{t("gallery_title")}</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-8">
          <div className="col-span-2 row-span-2">
            <img src="https://image-tc.galaxy.tf/wijpeg-7kppa0lzf1jd60cpcx0dap4vd/general-view-with-beach-web.jpg?width=1200" onError={handleImageError} alt="Infinity Pool" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <img src="https://image-tc.galaxy.tf/wijpeg-53jbltw8o6qye0hu3ej4431i4/general-view-7-2.jpg?width=600" onError={handleImageError} alt="Sandy Beach" className="w-full h-[250px] md:h-full object-cover rounded-xl" />
          </div>
          <div>
            <img src="https://image-tc.galaxy.tf/wijpeg-y1uwx7zk3na5oqsg2n7rlb25/girl-drinks-a-cocktail-in-the-pool-2022-08-26-13-51-51-utc_standard.jpg?width=600" onError={handleImageError} alt="Pool Bar" className="w-full h-[250px] md:h-full object-cover rounded-xl" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <img src="https://image-tc.galaxy.tf/wijpeg-2rzxuurafrw7vkb20aku0s2l/swim-up-pool-2-2.jpg?width=800" onError={handleImageError} alt="Swim-Up Pool" className="w-full h-[250px] md:h-full object-cover rounded-xl" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <img src="https://image-tc.galaxy.tf/wijpeg-8qo0ui8eo9dbgu1ivds0qmn9h/lunch-couple-1wb.jpg?width=800" onError={handleImageError} alt="Beachfront Dining" className="w-full h-[250px] md:h-full object-cover rounded-xl" />
          </div>
        </div>
      </section>

      {/* Discover Corfu Banner */}
      <section className="relative h-[460px] overflow-hidden">
        <img
          src="https://image-tc.galaxy.tf/wijpeg-4332ulfqlae4u26w35fkfifgx/hotel-and-beach.jpg?width=1920"
          alt="Kavos Corfu"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F28]/90 via-[#0F1F28]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{t("discover_location")}</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">{t("discover_title")}</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">{t("discover_desc")}</p>
              <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20" data-testid="btn-discover-corfu">
                <a href="/discover-cavos">{t("discover_cta")}</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-[#0F1F28] border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                 <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-white/60 font-mono text-sm">Map View</p>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-white">
              <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">{t("location_label")}</h2>
              <h3 className="text-4xl font-bold mb-6">{t("location_title")}</h3>
              <p className="text-white/70 mb-8 leading-relaxed">{t("location_desc")}</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-white/90">{t("location_address")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-white/90">{t("location_nearby")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-white/90">{t("location_walk")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Book Section */}
      <section id="contact" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Contact Info */}
            <div className="w-full md:w-2/5 bg-primary p-10 md:p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t("contact_touch")}</h3>
                <p className="text-white/80 mb-12">{t("contact_desc")}</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>info@cavomarina.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>+30 266 230 6020</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>Kavos, Corfu 49080, Greece</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="w-full md:w-3/5 p-10 md:p-12">
              <h3 className="text-2xl font-bold text-[#0F1F28] mb-6">{t("contact_book")}</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact_name")}</Label>
                    <Input id="name" placeholder="John Doe" data-testid="input-name" className="bg-gray-50 border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact_email")}</Label>
                    <Input id="email" type="email" placeholder="john@example.com" data-testid="input-email" className="bg-gray-50 border-gray-200" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="checkin">{t("contact_checkin")}</Label>
                    <Input id="checkin" type="date" data-testid="input-checkin-contact" className="bg-gray-50 border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout">{t("contact_checkout")}</Label>
                    <Input id="checkout" type="date" data-testid="input-checkout-contact" className="bg-gray-50 border-gray-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room-type">{t("contact_room")}</Label>
                  <Select>
                    <SelectTrigger id="room-type" className="bg-gray-50 border-gray-200" data-testid="select-room-contact">
                      <SelectValue placeholder={t("contact_select")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comfort-swimup">{t("room1_title")}</SelectItem>
                      <SelectItem value="superior-swimup">{t("room2_title")}</SelectItem>
                      <SelectItem value="comfort-mountain">{t("room3_title")}</SelectItem>
                      <SelectItem value="penthouse">{t("room4_title")}</SelectItem>
                      <SelectItem value="superior-spa">{t("room5_title")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact_requests")}</Label>
                  <Textarea id="message" placeholder={t("contact_placeholder")} rows={4} data-testid="input-message" className="bg-gray-50 border-gray-200" />
                </div>

                <Button type="submit" className="w-full rounded-full bg-[#0F1F28] hover:bg-[#0F1F28]/90 text-white py-6 text-lg" data-testid="btn-submit-booking">
                  {t("contact_submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1F28] text-white/70 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white shrink-0">
            <img src="https://image-tc.galaxy.tf/wipng-dry58aac66c9bjhdxi3jz29f3/cavomarina-logo-white-01.png?width=300" alt="Cavomarina Beach" className="h-6 w-auto max-w-[140px] object-contain" onError={handleImageError} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#home" className="hover:text-primary transition-colors">{t("footer_home")}</a>
            <a href="#about" className="hover:text-primary transition-colors">{t("footer_about")}</a>
            <a href="#rooms" className="hover:text-primary transition-colors">{t("footer_rooms")}</a>
            <a href="#amenities" className="hover:text-primary transition-colors">{t("footer_amenities")}</a>
            <Link href="/discover-cavos" className="hover:text-primary transition-colors">{t("footer_discover")}</Link>
            <a href="#gallery" className="hover:text-primary transition-colors">{t("footer_gallery")}</a>
          </div>

          <div className="text-sm">{t("footer_copy")}</div>
        </div>
      </footer>
    </div>
  );
}
