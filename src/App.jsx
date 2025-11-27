import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
// import logo from './logo.jpg'; // Uncomment this if running locally with the file
import logo from './1.png'; // Placeholder to prevent build errors

// --- 1. DATA & CONFIGURATION ---

const THEME = {
  orange: "#F25C05",
  dark: "#1A1A1A",
  paper: "#F4F4F0",
  white: "#FFFFFF"
};

// Placeholder imports for local files (ensure these exist in your src folder)
import hero1 from "./get.jpeg" 
import hero2 from "./img1.webp" 
import hero3 from "./img2.jpg" 

import projet1 from "./20.jpg"
import projet2 from "./25.jpg"

import show1 from "./25.jpg";          // Coaching
import show2 from "./26.jpg";          // Independence Day
import show3 from "./23.jpg";          // Improvisation
import show4 from "./24.jpg";          // Reading Club
import show5 from "./affiche faz.jpg"; // Percussions (Make sure filename matches exactly)
import show6 from "./20.jpg";          // Jeux Collectifs
import show7 from "./21.jpg";

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

const CENTERS = [
  { 
    id: "tanger",
    name: "Détroit", 
    city: "Tanger", 
    image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?q=80&w=2076",
    desc: "Un phare culturel face à l'Europe, ancré dans l'Afrique.",
    details: "Un espace ouvert sur la mer, favorisant les échanges interculturels et les résidences d'artistes internationaux.",
    coords: { top: "5%", left: "59%" }
  },
  { 
    id: "casa",
    name: "Sidi Moumen", 
    city: "Casablanca", 
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070",
    desc: "Le berceau historique. Là où l'impossible est devenu réalité en 2014.",
    details: "Situé au cœur du quartier, ce centre de 1000m² dispose d'une salle de spectacle, d'une bibliothèque et de studios de danse.",
    coords: { top: "20%", left: "46%" }
  },
  { 
    id: "fes",
    name: "Sidi Moumen", 
    city: "Fes", 
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070",
    desc: "Le berceau historique. Là où l'impossible est devenu réalité en 2014.",
    details: "Situé au cœur du quartier, ce centre de 1000m² dispose d'une salle de spectacle, d'une bibliothèque et de studios de danse.",
    coords: { top: "18%", left: "53%" }
  },
  { 
    id: "kech",
    name: "Jemaa El Fna", 
    city: "Marrakech", 
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072",
    desc: "Un riad de création au cœur battant de la cité ocre.",
    details: "Ce centre valorise le patrimoine oral (Halqa) tout en proposant des formations aux arts numériques.",
    coords: { top: "35%", left: "42%" }
  },
  { 
    id: "agadir",
    name: "Souss", 
    city: "Agadir", 
    image: "https://images.unsplash.com/photo-1554232682-b9ef9c92f8de?q=80&w=2069",
    desc: "La culture comme moteur de développement régional.",
    details: "Focalisé sur la musique et les arts visuels, ce centre est un hub pour la jeunesse du Souss.",
    coords: { top: "45%", left: "32%" }
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
              <button onClick={() => handleNavClick('centers')} className={`px-4 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 ${currentView === 'centers' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>Centres</button>
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
              <button onClick={() => handleNavClick('centers')} className="text-left">Nos Centres</button>
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

const TextReveal = ({ children, className = "", delay = 0, color = "text-white" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const text = typeof children === 'string' ? children : '';
  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.02, ease: [0.33, 1, 0.68, 1] }}
          className={`inline-block whitespace-pre ${color}`}
        >
          {char}
        </motion.span>
      ))}
    </div>
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
        {/* <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h3 className="text-[#5e2b79] font-bold uppercase tracking-widest mb-2 text-sm">Agenda</h3>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A]">Actualités</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NEWS.map((item, i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                        <div className="h-48 overflow-hidden relative">
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold z-10">{item.category}</span>
                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                        </div>
                        <div className="p-6">
                            <span className="text-[#5e2b79] font-bold text-sm mb-2 block">{item.date}</span>
                            <h3 className="text-xl font-bold mb-4 leading-tight">{item.title}</h3>
                            <p className="text-sm text-neutral-500 flex items-center gap-2 group-hover:text-black transition-colors">Lire la suite <span>→</span></p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div> */}
    </section>
);

const MajorProjects = ({ setView }) => (
  <section id="projets" className="bg-[#1A1A1A] text-white">
    <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4">Nos Grands Projets</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Des initiatives structurantes qui rayonnent sur tout le territoire national.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div whileHover={{ scale: 0.98 }} onClick={() => setView('projects')} className="relative rounded-[2rem] overflow-hidden bg-[#FDB813] text-black h-[500px] group cursor-pointer">
              <div className="absolute inset-0 z-0"><img src={projet1} className="w-full h-full object-cover opacity-20 group-hover:opacity-70 transition-opacity duration-500" alt="School" /></div>
              <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                  <div><span className="font-bold border border-black px-3 py-1 rounded-full text-xs">Event: Jeux Collectifs</span><h3 className="text-5xl md:text-7xl font-black mt-6 leading-none">26 October 2025</h3></div>
                  <div className="flex justify-between items-end"><p className="font-bold max-w-xs">Jeux Collectifs: Le Saut de la Confiance (Collective Games: The Leap of Trust)</p><div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-2xl group-hover:rotate-45 transition-transform">↗</div></div>
              </div>
          </motion.div>
          <motion.div whileHover={{ scale: 0.98 }} onClick={() => setView('projects')} className="relative rounded-[2rem] overflow-hidden bg-indigo-600 text-white h-[500px] group cursor-pointer">
              <div className="absolute inset-0 z-0"><img src={projet2} className="w-full h-full object-cover opacity-20 group-hover:opacity-70 transition-opacity duration-500" alt="School" /></div>
              <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                  <div><span className="font-bold border border-white/30 px-3 py-1 rounded-full text-xs">Event: Atelier de Coaching</span><h3 className="text-5xl md:text-7xl font-black mt-6 leading-none">19 November 2025</h3></div>
                  <div className="flex justify-between items-end"><p className="font-medium opacity-80 max-w-xs">Atelier de Coaching: L’art de gérer son temps, équilibre et efficacité</p><div className="w-12 h-12 bg-white text-indigo-900 rounded-full flex items-center justify-center text-2xl group-hover:rotate-45 transition-transform">↗</div></div>
              </div>
          </motion.div>
        </div>
    </div>
  </section>
);

// Updated InteractiveMapSection - TANGER FOCUSED
const InteractiveMapSection = ({ setCursorImage, setView }) => {
    // Filter to get only Tanger for this specific view
    const tangerCenter = CENTERS.filter(center => center.id === "tanger");

    return (
        <section id="centres" className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16 relative z-10">
                <div className="md:w-1/3">
                    <h3 className="text-[#5e2b79] font-bold uppercase tracking-widest mb-4 text-sm">Nos Ancrages</h3>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#1A1A1A]">5 Centres.<br/>5 Âmes.</h2>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        Chaque centre est un lieu de vie unique. <span className="font-bold text-[#1A1A1A]">Focus sur Tanger :</span> Le Détroit, un phare culturel face à l'Europe.
                    </p>
                    <div className="space-y-4">
                        {tangerCenter.map((center, i) => (
                            <motion.div 
                                key={center.id} 
                                className="p-4 rounded-xl border-2 border-[#5e2b79] bg-[#FFF5F0] cursor-pointer transition-colors group" 
                                onMouseEnter={() => setCursorImage(center.image)} 
                                onMouseLeave={() => setCursorImage(null)}
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-lg text-[#5e2b79] transition-colors">{center.city}</h4>
                                    <span className="text-xs font-mono text-neutral-400">01</span>
                                </div>
                                <p className="text-sm text-neutral-500 mt-1">{center.name}</p>
                                <p className="text-sm text-neutral-600 mt-3 italic">{center.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <button onClick={() => setView('centers')} className="mt-8 text-[#5e2b79] font-bold border-b-2 border-[#5e2b79] pb-1 hover:text-black hover:border-black transition-colors">Voir tous les détails →</button>
                </div>
                
                {/* Map container visible on mobile and desktop */}
                <div className="w-full md:w-2/3 relative h-[400px] md:h-[600px] bg-[#F4F4F0] rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 overflow-hidden mt-8 md:mt-0">
                     {/* Real Morocco Map from Wikipedia */}
                     <img src="https://simplemaps.com/static/svg/country/ma/admin1/ma.svg" alt="Carte du Maroc" className="absolute inset-0 w-full h-full object-contain opacity-20 mix-blend-multiply p-4" />
                     
                     {/* Only map Tanger */}
                     {tangerCenter.map((center, i) => (
                         <motion.div 
                            key={center.id} 
                            className="absolute w-6 h-6 bg-[#5e2b79] rounded-full shadow-[0_0_0_12px_rgba(94,43,121,0.2)] cursor-pointer z-10" 
                            style={{ top: center.coords.top, left: center.coords.left }} 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                         >
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-2 rounded-full text-sm font-black shadow-xl z-20 text-[#5e2b79]">
                                {center.city}
                            </div>
                         </motion.div>
                     ))}
                </div>
            </div>
        </section>
    );
};

const GetInvolved = ({ setView }) => (
    <section id="contact" className="py-24 bg-[#F4F4F0]">
        <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-[#1A1A1A]">Agissons Ensemble.</h2>
            <div className="flex justify-center gap-4 mb-12">
                <button onClick={() => setView('contact')} className="px-8 py-3 rounded-full font-bold transition-all bg-[#1A1A1A] text-white shadow-lg hover:scale-105">Devenir Bénévole</button>
                <button onClick={() => setView('contact')} className="px-8 py-3 rounded-full font-bold transition-all bg-[#5e2b79] text-white shadow-lg hover:scale-105">Faire un Don</button>
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
              <div className="flex gap-4"><input type="email" placeholder="Votre email" className="bg-white/10 border-none rounded-lg px-6 py-4 w-full md:w-80 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#5e2b79]" /><button className="bg-[#5e2b79] px-6 py-4 rounded-lg font-bold hover:bg-white hover:text-[#5e2b79] transition-colors">OK</button></div>
          </div>
          <div><h4 className="font-bold text-gray-500 mb-6 uppercase text-sm">Contact</h4><p className="mb-4 text-gray-300">Centre Culturel les Etoiles du Détroit, Ali Bay - 13 Rue Barcelone, Tanger<br/>Maroc</p><p className="text-[#5e2b79] font-bold">+212669360651</p></div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600"><p>© 2025 Troupe Les Étoiles. Tous droits réservés.</p><div className="flex gap-6 mt-4 md:mt-0"><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Facebook</a></div></div>
    </div>
  </footer>
);

// --- 4. ADDITIONAL PAGES ---

const ProjectsPage = ({ setView }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white min-h-screen pt-32 pb-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-4 hover:underline">← Retour à l'accueil</button>
        <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">Nos Grands Projets</h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto">Découvrez les productions artistiques de la Troupe Les Étoiles Tanger.</p>
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
      <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-16 text-center">NOS CENTRES</h1>
      <div className="space-y-12">
        {CENTERS.map((center, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center">
             <div className="w-full md:w-1/2 h-64 md:h-96 rounded-2xl overflow-hidden relative"><img src={center.image} className="w-full h-full object-cover" alt={center.city} /></div>
             <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-4"><span className="text-[#5e2b79] font-black text-2xl">0{i+1}</span><h2 className="text-4xl font-black text-[#1A1A1A]">{center.city}</h2></div>
                <h3 className="text-xl font-bold text-neutral-700 mb-6">{center.name}</h3>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">{center.details}</p>
                <button className="border-b-2 border-black pb-1 font-bold hover:text-[#5e2b79] hover:border-[#5e2b79] transition-colors">Voir la programmation →</button>
             </div>
          </div>
        ))}
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
         <p className="text-xl text-gray-400 mb-12">Vous souhaitez devenir bénévole, partenaire ou simplement nous dire bonjour ?</p>
         <div className="space-y-6">
            <div className="flex gap-4"><span className="text-[#5e2b79] text-xl">📍</span><div><h4 className="font-bold">Siège Social</h4><p className="text-gray-400">addresse : Centre Culturel les Etoiles du Détroit, Ali Bay - 13 Rue Barcelone, Tanger</p></div></div>
            <div className="flex gap-4"><span className="text-[#5e2b79] text-xl">📱</span><div><h4 className="font-bold">Number</h4><p className="text-gray-400">+212669360651</p></div></div>
         </div>
      </div>
      <div className="lg:w-1/2 bg-white/5 p-8 rounded-3xl border border-white/10">
         <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2"><label className="text-sm font-bold text-gray-400">Nom</label><input type="text" className="w-full bg-white/10 border border-white/10 rounded-lg p-4 focus:border-[#5e2b79] focus:outline-none" /></div>
               <div className="space-y-2"><label className="text-sm font-bold text-gray-400">Prénom</label><input type="text" className="w-full bg-white/10 border border-white/10 rounded-lg p-4 focus:border-[#5e2b79] focus:outline-none" /></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-bold text-gray-400">Email</label><input type="email" className="w-full bg-white/10 border border-white/10 rounded-lg p-4 focus:border-[#5e2b79] focus:outline-none" /></div>
            <div className="space-y-2"><label className="text-sm font-bold text-gray-400">Message</label><textarea rows="4" className="w-full bg-white/10 border border-white/10 rounded-lg p-4 focus:border-[#5e2b79] focus:outline-none"></textarea></div>
            <button className="w-full bg-[#5e2b79] text-white font-bold py-4 rounded-xl hover:bg-white hover:text-[#5e2b79] transition-colors">Envoyer</button>
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
            <InteractiveMapSection setCursorImage={setCursorImage} setView={setCurrentView} />
            <GetInvolved setView={setCurrentView} />
          </motion.main>
        )}
        {currentView === 'projects' && <ProjectsPage key="projects" setView={setCurrentView} />}
        {currentView === 'centers' && <CentersPage key="centers" setView={setCurrentView} />}
        {currentView === 'contact' && <ContactPage key="contact" setView={setCurrentView} />}
      </AnimatePresence>
      <Footer />
      <style>{`html { scroll-behavior: smooth; } body::-webkit-scrollbar { display: none; } body { -ms-overflow-style: none; scrollbar-width: none; } @media (pointer: coarse) { .cursor-none { cursor: auto; } }`}</style>
    </div>
  );
}