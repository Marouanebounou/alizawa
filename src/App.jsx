import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import logo from './1.png';

// --- 1. DATA & CONFIGURATION ---

const THEME = {
  orange: "#F25C05",
  dark: "#1A1A1A",
  paper: "#F4F4F0",
  white: "#FFFFFF"
};

// Placeholder imports for local files
import hero1 from "./get.jpeg" 
import hero2 from "./img1.webp" 
import hero3 from "./img2.jpg" 

import projet1 from "./20.jpg"
import projet2 from "./25.jpg"

import show1 from "./25.jpg";
import show2 from "./26.jpg";
import show3 from "./23.jpg";
import show4 from "./24.jpg";
import show5 from "./affiche faz.jpg";
import show6 from "./20.jpg";
import show7 from "./21.jpg";

// Import Tanger specific images (add your own images)
import tangerImage1 from "./20.jpg";
import tangerImage2 from "./21.jpg";
import tangerImage3 from "./23.jpg";
import tangerImage4 from "./24.jpg";

const HERO_IMAGES = [
  hero1,
  hero2,
  hero3,
];

const SHOWS = [
  { 
    id: 1, 
    title: "Atelier de Coaching", 
    category: "Formation", 
    year: "2025", 
    image: show1,
    desc: "L'art de gérer son temps, équilibre et efficacité avec Fatima Zahra Zouaki." 
  },
  { 
    id: 2, 
    title: "Fête de l'Indépendance", 
    category: "Célébration", 
    year: "2025", 
    image: show2, 
    desc: "Programme spécial: Atelier manuel, projection de film et karaoké." 
  },
  { 
    id: 3, 
    title: "Match d'Improvisation", 
    category: "Théâtre", 
    year: "2025", 
    image: show3, 
    desc: "Spectacle d'improvisation théâtrale au Dabatek Technopark." 
  },
  { 
    id: 4, 
    title: "Club de Lecture", 
    category: "Littérature", 
    year: "2025", 
    image: show4, 
    desc: "Rencontre et échange autour du livre à la Maison des jeunes." 
  },
  { 
    id: 5, 
    title: "Cours de Percussions", 
    category: "Musique", 
    year: "2025", 
    image: show5, 
    desc: "Cours chaque dimanche avec El Radan Salaheddine." 
  },
  { 
    id: 6, 
    title: "Jeux Collectifs", 
    category: "Animation", 
    year: "2025", 
    image: show6, 
    desc: "Le saut de la confiance - Activités ludiques à la Maison des jeunes." 
  },
  { 
    id: 7, 
    title: "Atelier Créatif", 
    category: "Artisanat", 
    year: "2025", 
    image: show7, 
    desc: "Mères des étoiles - Atelier de fabrication de bracelets." 
  },
];

// Tanger Center Data
const TANGER_CENTER = {
  id: "tanger",
  name: "Centre Culturel Les Étoiles du Détroit",
  city: "Tanger",
  tagline: "Un phare culturel face à l'Europe, ancré dans l'Afrique.",
  description: "Situé au cœur de Tanger, notre centre est un espace de création et d'échange où les jeunes découvrent leur potentiel à travers l'art, la culture et l'expression créative.",
  address: "Ali Bay - 13 Rue Barcelone, Tanger, Maroc",
  phone: "+212 669 360 651",
  email: "tanger@lesetoiles.ma",
  images: [tangerImage1, tangerImage2, tangerImage3, tangerImage4],
  stats: [
    { number: "200+", label: "Jeunes Actifs" },
    { number: "15", label: "Ateliers/Semaine" },
    { number: "8", label: "Partenaires" },
    { number: "2019", label: "Année d'Ouverture" }
  ],
  activities: [
    { icon: "🎭", name: "Théâtre", desc: "Cours d'improvisation et mise en scène" },
    { icon: "🎵", name: "Musique", desc: "Percussions, chant et instruments" },
    { icon: "📚", name: "Lecture", desc: "Club de lecture et ateliers d'écriture" },
    { icon: "🎨", name: "Arts Visuels", desc: "Peinture, dessin et arts plastiques" },
    { icon: "💃", name: "Danse", desc: "Hip-hop, contemporain et traditionnel" },
    { icon: "🎬", name: "Cinéma", desc: "Initiation au tournage et montage" }
  ],
  features: [
    "Salle de spectacle (150 places)",
    "Studio de danse équipé",
    "Bibliothèque multimédia",
    "Espace de co-working",
    "Jardin créatif",
    "Café culturel"
  ]
};

const CENTERS = [
  { 
    id: "tanger",
    name: "Détroit", 
    city: "Tanger", 
    image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?q=80&w=2076",
    desc: "Un phare culturel face à l'Europe, ancré dans l'Afrique.",
    details: "Un espace ouvert sur la mer, favorisant les échanges interculturels et les résidences d'artistes internationaux.",
    coords: { top: "8%", left: "42%" },
    color: "#f4e222",
    stats: { jeunes: "200+", ateliers: "15", partenaires: "8" }
  },
];

const NEWS = [
  { category: "Événement", title: "Festival des Arts de la Rue", date: "12 Octobre", image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800" },
  { category: "Atelier", title: "Masterclass Cinéma avec Nabil Ayouch", date: "05 Novembre", image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=800" },
  { category: "Succès", title: "Positive School en tournée européenne", date: "20 Novembre", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800" },
];

// --- 2. UI COMPONENTS ---

const Cursor = ({ activeImage }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const manageMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#f4e222] rounded-full pointer-events-none z-50 mix-blend-multiply hidden md:block"
        animate={{ x: mouse.x - 8, y: mouse.y - 8, scale: activeImage ? 0 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[400px] rounded-xl overflow-hidden pointer-events-none z-40 hidden md:block bg-white shadow-2xl"
        animate={{
          x: mouse.x - 150,
          y: mouse.y - 200,
          opacity: activeImage ? 1 : 0,
          scale: activeImage ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {activeImage && <img src={activeImage} className="w-full h-full object-cover" alt="Cursor Reveal" />}
      </motion.div>
    </>
  );
};

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const Navbar = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view, id) => {
    setView(view);
    if (view === 'home' && id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? "pt-4 pb-2" : "pt-6 pb-4"
        }`}
      >
        <div className={`mx-auto max-w-7xl px-4 transition-all duration-500 ${
          isScrolled ? "w-[95%] md:w-auto" : "w-full"
        }`}>
          <div className={`relative flex justify-between items-center transition-all duration-500 ${
            isScrolled 
              ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/20 rounded-full px-2 pr-2 pl-6 py-2" 
              : "bg-transparent px-4"
          }`}>
            
            <button onClick={() => handleNavClick('home', 'accueil')} className="flex items-center gap-2 group mr-4">
              {logo ? (
                <img src={logo} alt="Troupe Les Etoiles" className="h-10 w-auto object-contain rounded-md" />
              ) : (
                <div className="w-9 h-9 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white font-black text-sm group-hover:bg-[#5e2b79] transition-colors duration-300">T</div>
              )}
              <span className="font-black text-xl tracking-tight text-[#8f4699] hidden sm:block">Centres Culturels Les Étoiles</span>
            </button>

            <div className={`hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
                isScrolled ? "opacity-100" : "bg-white/60 backdrop-blur-md rounded-full px-6 py-2 border border-white/40 shadow-sm"
            }`}>
              <button onClick={() => handleNavClick('home', 'accueil')} className={`px-4 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 ${currentView === 'home' ? 'text-black' : 'text-neutral-600'}`}>Accueil</button>
              <button onClick={() => handleNavClick('projects')} className={`px-4 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 ${currentView === 'projects' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>Spectacles</button>
              <button onClick={() => handleNavClick('centers')} className={`px-4 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 ${currentView === 'centers' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>Centre</button>
              <button onClick={() => handleNavClick('contact')} className={`px-4 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 ${currentView === 'contact' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>Contact</button>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleNavClick('contact')} className="bg-[#5e2b79] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#1A1A1A] transition-colors shadow-md flex items-center gap-2">
                <span>Faire un Don</span>
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-11 h-11 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] shadow-sm border border-neutral-100 active:scale-95 transition-transform">
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#1A1A1A] pt-28 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-8 text-4xl font-black text-white tracking-tight">
              <button onClick={() => handleNavClick('home', 'accueil')} className="text-left">Accueil</button>
              <button onClick={() => handleNavClick('projects')} className="text-left text-[#5e2b79]">Spectacles</button>
              <button onClick={() => handleNavClick('centers')} className="text-left">Notre Centre</button>
              <button onClick={() => handleNavClick('contact')} className="text-left">Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const VideoModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
            className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
             <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-[#5e2b79] z-10 font-bold text-xl">✕</button>
             <iframe width="100%" height="100%" src="https://www.facebook.com/share/r/1BZBK7YyHx/" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 3. HOME SECTIONS ---

const Hero = ({ setView }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <>
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <section id="accueil" className="min-h-screen relative flex flex-col justify-center items-center bg-[#F4F4F0] pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
             <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 mb-4 uppercase">Centres Culturels Les Étoiles</h2>
             <div className="flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tight leading-[0.9]">De detroit <span className=" text-[#f4e222]">Tanger</span></h1>
             </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
             {HERO_IMAGES.map((src, i) => (
               <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1), duration: 0.8 }} className={`rounded-2xl overflow-hidden h-64 md:h-80 w-full ${i === 1 ? 'md:-mt-12 shadow-2xl z-10' : 'opacity-80'}`}>
                 <img src={src} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Hero" />
               </motion.div>
             ))}
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <MagneticButton onClick={() => setView('projects')} className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold hover:bg-[#5e2b79] transition-colors shadow-lg">Nos événements</MagneticButton>
             <button onClick={() => setVideoOpen(true)} className="flex items-center gap-3 font-bold text-neutral-600 hover:text-black transition-colors group">
                <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center group-hover:border-[#5e2b79] group-hover:bg-[#5e2b79] group-hover:text-white transition-all">▶</div>
                Voir le film (2min)
             </button>
          </div>
        </div>
      </section>
    </>
  );
};

const KeyNumbers = () => (
    <section className="py-20 bg-white border-y border-neutral-100">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ num: "2014", label: "Création" }, { num: "5", label: "Centres Culturels" }, { num: "1000+", label: "Jeunes Formés/An" }, { num: "45", label: "Partenaires" }].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <h3 className="text-4xl md:text-5xl font-black text-[#5e2b79] mb-2">{stat.num}</h3>
                    <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
            ))}
        </div>
    </section>
);

const NewsSection = () => (
    <section id="actualites" className="py-0 bg-[#F4F4F0]">
    </section>
);

// MODERN ANIMATED MAJOR PROJECTS SECTION
const MajorProjects = ({ setView }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  const getGridClass = (index) => {
    const patterns = [
      'col-span-12 md:col-span-8 row-span-2',
      'col-span-12 md:col-span-4 row-span-1',
      'col-span-12 md:col-span-4 row-span-1',
      'col-span-12 md:col-span-4 row-span-1',
      'col-span-12 md:col-span-4 row-span-1',
      'col-span-12 md:col-span-4 row-span-1',
      'col-span-12 md:col-span-6 row-span-1',
      'col-span-12 md:col-span-6 row-span-1',
    ];
    return patterns[index] || 'col-span-12 md:col-span-4';
  };

  const getHeight = (index) => {
    if (index === 0) return 'h-[400px] md:h-[500px]';
    return 'h-[300px] md:h-[250px]';
  };

  return (
    <section id="projets" className="bg-[#0a0a0a] text-white py-24 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="h-px bg-gradient-to-r from-[#5e2b79] to-transparent flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <span className="text-[#f4e222] font-mono text-sm uppercase tracking-widest">Programmation 2025</span>
            <motion.div 
              className="h-px bg-gradient-to-l from-[#5e2b79] to-transparent flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4">
              Nos <span className="text-[#f4e222]">Grands</span> Projets
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Découvrez nos événements, ateliers et spectacles qui animent nos centres culturels.
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          {SHOWS.map((show, i) => (
            <motion.div
              key={show.id}
              className={`${getGridClass(i)} ${getHeight(i)} relative group`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(show.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={() => setView('projects')}
              >
                <motion.img 
                  src={show.image} 
                  alt={show.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ 
                    scale: hoveredId === show.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                  animate={{ 
                    opacity: hoveredId === show.id ? 0.9 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div 
                  className="absolute inset-0 border-2 border-[#5e2b79] rounded-2xl md:rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredId === show.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <motion.span 
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold border border-white/30 backdrop-blur-sm"
                      animate={{
                        backgroundColor: hoveredId === show.id ? '#5e2b79' : 'rgba(0,0,0,0.3)',
                        borderColor: hoveredId === show.id ? '#5e2b79' : 'rgba(255,255,255,0.3)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {show.category}
                    </motion.span>
                    
                    {i === 0 && (
                      <span className="font-mono text-white/10 text-6xl md:text-8xl font-black leading-none">
                        {String(show.id).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <div>
                    <motion.div
                      animate={{ 
                        y: hoveredId === show.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[#f4e222] text-xs md:text-sm font-mono mb-1 md:mb-2 block">{show.year}</span>
                      <h3 className={`font-black mb-2 md:mb-3 leading-tight ${i === 0 ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}`}>
                        {show.title}
                      </h3>
                    </motion.div>
                    
                    <motion.p 
                      className={`text-white/70 text-xs md:text-sm ${i === 0 ? 'max-w-md' : 'max-w-xs'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredId === show.id ? 1 : 0,
                        y: hoveredId === show.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {show.desc}
                    </motion.p>

                    <motion.div 
                      className="flex items-center gap-2 mt-3 md:mt-4 text-white font-bold text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredId === show.id ? 1 : 0,
                        x: hoveredId === show.id ? 0 : -10
                      }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      <span>En savoir plus</span>
                      <motion.span
                        animate={{ x: hoveredId === show.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>

                <motion.div 
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[#5e2b79] rounded-full flex items-center justify-center text-white text-lg md:text-xl"
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ 
                    opacity: hoveredId === show.id ? 1 : 0,
                    scale: hoveredId === show.id ? 1 : 0,
                    rotate: hoveredId === show.id ? 0 : -45
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  ↗
                </motion.div>

                <motion.div 
                  className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, #5e2b79 50%)',
                    borderTopRightRadius: '1rem',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: hoveredId === show.id ? 1 : 0,
                    scale: hoveredId === show.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton 
            onClick={() => setView('projects')}
            className="group flex items-center gap-4 bg-transparent border-2 border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold hover:bg-white hover:text-[#1A1A1A] hover:border-white transition-all duration-500"
          >
            <span>Explorer tous les événements</span>
            <motion.span 
              className="text-xl"
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

// NEW TANGER-FOCUSED SECTION - BENTO GRID STYLE
const TangerCenterSection = ({ setView }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeImage, setActiveImage] = useState(0);
  const [hoveredActivity, setHoveredActivity] = useState(null);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % TANGER_CENTER.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="centres" className="py-20 md:py-32 bg-[#F4F4F0] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5e2b79]/10 rounded-full text-[#5e2b79] font-bold text-sm uppercase tracking-widest mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-[#5e2b79] rounded-full animate-pulse" />
            Notre Ancrage
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] mb-4">
            Centre <span className="text-[#f4e222]">Tanger</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto">
            {TANGER_CENTER.tagline}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(120px,auto)]">
          
          {/* Main Image Card - Large */}
          <motion.div 
            className="col-span-12 md:col-span-7 row-span-3 relative rounded-3xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Image Carousel */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={TANGER_CENTER.images[activeImage]}
                alt="Centre Tanger"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#f4e222] text-black text-xs font-bold rounded-full">
                  TANGER
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full">
                  Détroit
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
                {TANGER_CENTER.name}
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-md hidden md:block">
                {TANGER_CENTER.description}
              </p>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {TANGER_CENTER.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImage === i ? 'w-6 bg-[#f4e222]' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#5e2b79] rounded-bl-3xl flex items-center justify-center">
              <span className="text-white text-2xl">★</span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {TANGER_CENTER.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="col-span-6 md:col-span-2-5 row-span-1 bg-white rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-xl transition-all group cursor-pointer"
              style={{ gridColumn: `span ${i < 2 ? 6 : 6} / span ${i < 2 ? 6 : 6}` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.span 
                className="text-3xl md:text-4xl font-black text-[#5e2b79] mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.span>
              <span className="text-xs md:text-sm font-bold text-neutral-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}

          {/* Location Card */}
          <motion.div
            className="col-span-12 md:col-span-5 row-span-1 bg-[#1A1A1A] rounded-2xl p-6 flex items-center gap-4 group cursor-pointer overflow-hidden relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }} />
            </div>
            
            <div className="w-14 h-14 bg-[#5e2b79] rounded-2xl flex items-center justify-center text-2xl shrink-0 relative z-10">
              📍
            </div>
            <div className="relative z-10">
              <h4 className="text-white font-bold text-lg mb-1">Notre Adresse</h4>
              <p className="text-white/60 text-sm">{TANGER_CENTER.address}</p>
            </div>
            <motion.div 
              className="ml-auto text-[#f4e222] text-2xl relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>

          {/* Activities Section */}
          <motion.div
            className="col-span-12 md:col-span-7 row-span-2 bg-white rounded-3xl p-6 md:p-8 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-black text-[#1A1A1A]">Nos Activités</h3>
              <span className="text-sm text-neutral-500">{TANGER_CENTER.activities.length} disciplines</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {TANGER_CENTER.activities.map((activity, i) => (
                <motion.div
                  key={i}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all overflow-hidden ${
                    hoveredActivity === i ? 'bg-[#5e2b79] text-white' : 'bg-neutral-50 hover:bg-neutral-100'
                  }`}
                  onMouseEnter={() => setHoveredActivity(i)}
                  onMouseLeave={() => setHoveredActivity(null)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="text-2xl mb-2 block">{activity.icon}</span>
                  <h4 className="font-bold text-sm mb-1">{activity.name}</h4>
                  <motion.p 
                    className={`text-xs ${hoveredActivity === i ? 'text-white/80' : 'text-neutral-500'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredActivity === i ? 1 : 0,
                      height: hoveredActivity === i ? 'auto' : 0
                    }}
                  >
                    {activity.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            className="col-span-12 md:col-span-5 row-span-1 bg-gradient-to-br from-[#5e2b79] to-[#8f4699] rounded-2xl p-6 text-white relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
            
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-4">Contactez-nous</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">📞</div>
                  <span className="text-white/90">{TANGER_CENTER.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">✉️</div>
                  <span className="text-white/90">{TANGER_CENTER.email}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Card */}
          <motion.div
            className="col-span-12 md:col-span-5 row-span-1 bg-[#f4e222] rounded-2xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h4 className="font-bold text-lg text-[#1A1A1A] mb-4">Nos Équipements</h4>
            <div className="flex flex-wrap gap-2">
              {TANGER_CENTER.features.map((feature, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1.5 bg-black/10 rounded-full text-xs font-bold text-[#1A1A1A]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
            
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 text-6xl opacity-20">★</div>
          </motion.div>

        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <MagneticButton
            onClick={() => setView('contact')}
            className="bg-[#1A1A1A] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-[#5e2b79] transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
          >
            <span>Visitez notre centre</span>
            <span className="text-xl">→</span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
};

const GetInvolved = ({ setView }) => (
    <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#5e2b79]/10 rounded-full text-[#5e2b79] font-bold text-sm uppercase tracking-widest mb-6">
                Rejoignez-nous
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-4 text-[#1A1A1A]">Agissons Ensemble.</h2>
              <p className="text-neutral-500 text-lg max-w-xl mx-auto mb-8">
                Chaque contribution compte. Devenez acteur du changement et participez à l'émancipation de la jeunesse par la culture.
              </p>
            </motion.div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <MagneticButton onClick={() => setView('contact')} className="px-8 py-4 rounded-full font-bold transition-all bg-[#1A1A1A] text-white shadow-lg hover:scale-105 hover:shadow-xl">
                  Devenir Bénévole
                </MagneticButton>
                <MagneticButton onClick={() => setView('contact')} className="px-8 py-4 rounded-full font-bold transition-all bg-[#5e2b79] text-white shadow-lg hover:scale-105 hover:shadow-xl">
                  Faire un Don
                </MagneticButton>
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-black mb-6">Restez informés</h2>
              <p className="text-neutral-400 mb-6 max-w-md">Inscrivez-vous à notre newsletter pour recevoir les dernières actualités de notre centre culturel.</p>
              <div className="flex gap-4">
                <input type="email" placeholder="Votre email" className="bg-white/10 border border-white/10 rounded-xl px-6 py-4 w-full md:w-80 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#5e2b79] focus:border-transparent outline-none transition-all" />
                <button className="bg-[#5e2b79] px-6 py-4 rounded-xl font-bold hover:bg-white hover:text-[#5e2b79] transition-colors whitespace-nowrap">S'inscrire</button>
              </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm">Navigation</h4>
            <ul className="space-y-3 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Notre Centre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Événements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm">Contact</h4>
            <p className="mb-4 text-gray-400">{TANGER_CENTER.address}</p>
            <p className="text-[#f4e222] font-bold text-lg">{TANGER_CENTER.phone}</p>
          </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 Centre Culturel Les Étoiles du Détroit - Tanger. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#5e2b79] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#5e2b79] transition-colors">Facebook</a>
          <a href="#" className="hover:text-[#5e2b79] transition-colors">YouTube</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- 4. ADDITIONAL PAGES ---

const ProjectsPage = ({ setView }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white min-h-screen pt-32 pb-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-4 hover:underline">← Retour à l'accueil</button>
        <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">Nos Événements</h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto">Découvrez la programmation du Centre Culturel Les Étoiles de Tanger.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SHOWS.map((show, i) => (
          <motion.div key={show.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all">
            <div className="aspect-[3/4] relative overflow-hidden"><img src={show.image} alt={show.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" /></div>
            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
              <div className="flex justify-between items-end mb-2"><span className="bg-[#5e2b79] text-xs font-bold px-2 py-1 rounded text-white">{show.category}</span><span className="text-sm font-mono opacity-70">{show.year}</span></div>
              <h3 className="text-2xl font-bold mb-2 leading-tight">{show.title}</h3>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">{show.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CentersPage = ({ setView }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#F4F4F0] min-h-screen pt-32 pb-20">
    <div className="container mx-auto px-6">
      <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-8 hover:underline">← Retour à l'accueil</button>
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden h-[50vh] md:h-[60vh] mb-12">
        <img src={TANGER_CENTER.images[0]} alt="Centre Tanger" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <span className="px-4 py-2 bg-[#f4e222] text-black font-bold rounded-full text-sm mb-4 inline-block">TANGER</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{TANGER_CENTER.name}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{TANGER_CENTER.description}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]">En Chiffres</h3>
          <div className="grid grid-cols-2 gap-4">
            {TANGER_CENTER.stats.map((stat, i) => (
              <div key={i} className="text-center p-4 bg-neutral-50 rounded-xl">
                <div className="text-2xl font-black text-[#5e2b79]">{stat.number}</div>
                <div className="text-xs text-neutral-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]">Activités</h3>
          <div className="space-y-3">
            {TANGER_CENTER.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                <span className="text-xl">{activity.icon}</span>
                <div>
                  <div className="font-bold text-sm">{activity.name}</div>
                  <div className="text-xs text-neutral-500">{activity.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#5e2b79] rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-6">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <p className="text-white/80">{TANGER_CENTER.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <p className="text-[#f4e222] font-bold">{TANGER_CENTER.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">✉️</span>
              <p className="text-white/80">{TANGER_CENTER.email}</p>
            </div>
          </div>
          <button 
            onClick={() => setView('contact')}
            className="w-full mt-6 bg-white text-[#5e2b79] font-bold py-3 rounded-xl hover:bg-[#f4e222] hover:text-black transition-colors"
          >
            Nous Contacter
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]">Nos Équipements</h3>
        <div className="flex flex-wrap gap-3">
          {TANGER_CENTER.features.map((feature, i) => (
            <span key={i} className="px-4 py-2 bg-[#5e2b79]/10 text-[#5e2b79] rounded-full font-bold text-sm">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">Galerie</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TANGER_CENTER.images.map((img, i) => (
            <motion.div 
              key={i} 
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 0.98 }}
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactPage = ({ setView }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#1A1A1A] text-white min-h-screen pt-32 pb-20">
    <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16">
      <div className="lg:w-1/2">
         <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-8 hover:underline">← Retour</button>
         <h1 className="text-5xl md:text-7xl font-black mb-8">CONTACT</h1>
         <p className="text-xl text-gray-400 mb-12">Vous souhaitez devenir bénévole, partenaire ou simplement nous rendre visite ?</p>
         <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-[#5e2b79]/20 rounded-xl flex items-center justify-center text-[#5e2b79] text-xl">📍</div>
              <div>
                <h4 className="font-bold text-lg mb-1">Notre Adresse</h4>
                <p className="text-gray-400">{TANGER_CENTER.address}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-[#5e2b79]/20 rounded-xl flex items-center justify-center text-[#5e2b79] text-xl">📱</div>
              <div>
                <h4 className="font-bold text-lg mb-1">Téléphone</h4>
                <p className="text-[#f4e222] text-xl font-bold">{TANGER_CENTER.phone}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-[#5e2b79]/20 rounded-xl flex items-center justify-center text-[#5e2b79] text-xl">✉️</div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email</h4>
                <p className="text-gray-400">{TANGER_CENTER.email}</p>
              </div>
            </div>
         </div>

         {/* Opening Hours */}
         <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
           <h4 className="font-bold text-lg mb-4">Horaires d'ouverture</h4>
           <div className="space-y-2 text-gray-400">
             <div className="flex justify-between"><span>Lundi - Vendredi</span><span className="text-white">09:00 - 18:00</span></div>
             <div className="flex justify-between"><span>Samedi</span><span className="text-white">10:00 - 17:00</span></div>
             <div className="flex justify-between"><span>Dimanche</span><span className="text-[#f4e222]">Fermé</span></div>
           </div>
         </div>
      </div>
      <div className="lg:w-1/2 bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
         <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
         <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-400">Nom</label>
                 <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all" placeholder="Votre nom" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-400">Prénom</label>
                 <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all" placeholder="Votre prénom" />
               </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Email</label>
              <input type="email" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all" placeholder="votre@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Sujet</label>
              <select className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none text-white">
                <option value="" className="bg-[#1A1A1A]">Sélectionnez un sujet</option>
                <option value="benevole" className="bg-[#1A1A1A]">Devenir bénévole</option>
                <option value="inscription" className="bg-[#1A1A1A]">Inscription aux ateliers</option>
                <option value="partenaire" className="bg-[#1A1A1A]">Devenir partenaire</option>
                <option value="don" className="bg-[#1A1A1A]">Faire un don</option>
                <option value="autre" className="bg-[#1A1A1A]">Autre</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400">Message</label>
              <textarea rows="5" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all resize-none" placeholder="Votre message..."></textarea>
            </div>
            <button className="w-full bg-gradient-to-r from-[#5e2b79] to-[#8f4699] text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#5e2b79]/30 transition-all transform hover:scale-[1.02]">
              Envoyer le message
            </button>
         </form>
      </div>
    </div>
  </motion.div>
);

// --- 5. MAIN APP ---

export default function App() {
  const [cursorImage, setCursorImage] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);

  return (
    <div className="bg-white min-h-screen cursor-none selection:bg-[#5e2b79] selection:text-white">
      <div className="hidden md:block"><Cursor activeImage={cursorImage} /></div>
      <Navbar currentView={currentView} setView={setCurrentView} />
      <AnimatePresence mode='wait'>
        {currentView === 'home' && (
          <motion.main key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero setView={setCurrentView} />
            <KeyNumbers />
            <MajorProjects setView={setCurrentView} />
            <NewsSection />
            <TangerCenterSection setView={setCurrentView} />
            <GetInvolved setView={setCurrentView} />
          </motion.main>
        )}
        {currentView === 'projects' && <ProjectsPage key="projects" setView={setCurrentView} />}
        {currentView === 'centers' && <CentersPage key="centers" setView={setCurrentView} />}
        {currentView === 'contact' && <ContactPage key="contact" setView={setCurrentView} />}
      </AnimatePresence>
      <Footer />
      <style>{`
        html { scroll-behavior: smooth; } 
        body::-webkit-scrollbar { display: none; } 
        body { -ms-overflow-style: none; scrollbar-width: none; } 
        @media (pointer: coarse) { .cursor-none { cursor: auto; } }
      `}</style>
    </div>
  );
}