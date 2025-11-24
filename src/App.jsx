import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// --- 1. DATA & BRANDING ---

const BRAND_COLORS = {
  orange: "#F25C05",
  yellow: "#FDB813",
  dark: "#1A1A1A",
  light: "#F5F5F5"
};

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600",
  "https://images.unsplash.com/photo-1542358935-728b78809c95?q=80&w=600",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600",
  "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=600",
];

const CENTERS = [
  { 
    name: "Les Étoiles de Sidi Moumen", 
    city: "Casablanca", 
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070",
    desc: "Le berceau des étoiles. Là où tout a commencé en 2014."
  },
  { 
    name: "Les Étoiles du Détroit", 
    city: "Tanger", 
    image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?q=80&w=2076",
    desc: "Un centre culturel face à la mer, carrefour des civilisations."
  },
  { 
    name: "Les Étoiles de Jemaa El Fna", 
    city: "Marrakech", 
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2072",
    desc: "Un espace de création au cœur de la cité ocre."
  },
  { 
    name: "Les Étoiles du Souss", 
    city: "Agadir", 
    image: "https://images.unsplash.com/photo-1554232682-b9ef9c92f8de?q=80&w=2069",
    desc: "La culture au service du développement dans le sud."
  },
  { 
    name: "Les Étoiles de l'Oriental", 
    city: "Oujda", 
    image: "https://images.unsplash.com/photo-1512553353614-82a7370096dc?q=80&w=1931",
    desc: "Un pont culturel vers l'est et la méditerranée."
  },
];

const TIMELINE = [
  { year: "2014", title: "Genèse", desc: "Création de la fondation et ouverture du premier centre à Sidi Moumen." },
  { year: "2016", title: "Expansion", desc: "Lancement des Étoiles du Détroit à Tanger." },
  { year: "2018", title: "Reconnaissance", desc: "Nabil Ayouch présente le travail de la fondation à l'international." },
  { year: "2020", title: "Résilience", desc: "Adaptation numérique avec Digit'Ali pendant la pandémie." },
  { year: "2024", title: "Maturité", desc: "Un réseau national solide et des milliers de jeunes formés." },
];

const PILLARS = [
  { title: "Éducation", desc: "L'accès aux arts comme droit fondamental pour tous les jeunes.", icon: "🎓" },
  { title: "Arts", desc: "Catalyseur de talents dans la musique, la danse et le théâtre.", icon: "🎭" },
  { title: "Cultures", desc: "Valorisation du patrimoine et respect des droits culturels.", icon: "🌍" },
  { title: "Innovation", desc: "Nouvelles technologies et économie créative (Digit'Ali).", icon: "🚀" },
];

const TESTIMONIALS = [
  { name: "Hanane", role: "Les Étoiles d'Agadir", text: "Le Centre a radicalement modifié ma perspective. Je vois le dessin comme un outil professionnel. Aujourd'hui, je suis en licence d'Art Plastique !" },
  { name: "Ismail", role: "Positive School", text: "Je suis venu pour un casting et j'ai fini dans le film 'Haut et Fort'. Aujourd'hui je suis Manager et ma carrière de rappeur décolle." },
  { name: "Ilyas", role: "L'Académie (AMC)", text: "Une formation enrichissante. J'ai appris la médiation culturelle auprès des meilleurs intervenants du pays." },
];

// --- 2. ANIMATION & UI COMPONENTS ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#F25C05] text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 relative"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-neutral-900 z-40 flex items-center justify-center p-4"
          >
            <nav className="text-center space-y-4 md:space-y-6">
              {['Accueil', 'Missions', 'Histoire', 'Positive School', "Digit'Ali", 'Centres', 'Témoignages', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-').replace(/'/g, '')}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="block text-3xl md:text-5xl font-bold text-white hover:text-[#F25C05] transition-colors cursor-pointer"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

const MagneticButton = ({ children, className = "", onClick, style = {} }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    // Only apply magnetic effect on larger screens
    if (window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        setPosition({ x: (clientX - center.x) * 0.3, y: (clientY - center.y) * 0.3 });
    }
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const InteractiveCursor = ({ activeImage }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    // Only enable custom cursor logic on desktop/fine pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            if (activeImage) setCursorVariant("image");
            else if (target.closest('button') || target.closest('a')) setCursorVariant("button");
            else if (['H1', 'H2', 'H3'].includes(target.tagName)) setCursorVariant("text");
            else setCursorVariant("default");
        };
        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }
  }, [activeImage]);

  const variants = {
    default: { 
      x: mousePosition.x - 10, y: mousePosition.y - 10, height: 20, width: 20, 
      backgroundColor: BRAND_COLORS.orange, mixBlendMode: "normal" 
    },
    text: { 
      x: mousePosition.x - 40, y: mousePosition.y - 40, height: 80, width: 80, 
      backgroundColor: BRAND_COLORS.yellow, mixBlendMode: "difference" 
    },
    button: { 
      x: mousePosition.x - 20, y: mousePosition.y - 20, height: 40, width: 40, 
      backgroundColor: "#2563EB", mixBlendMode: "overlay" 
    },
    image: {
      x: mousePosition.x - 150,
      y: mousePosition.y - 200,
      height: 0, width: 0,
      backgroundColor: "transparent"
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden lg:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div 
        className="fixed top-0 left-0 z-40 pointer-events-none overflow-hidden rounded-xl shadow-2xl hidden lg:block"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 200,
          opacity: activeImage ? 1 : 0,
          scale: activeImage ? 1 : 0.5,
          rotate: activeImage ? (mousePosition.x % 10) - 5 : 0 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ width: 300, height: 400 }}
      >
        {activeImage && (
          <img src={activeImage} alt="Reveal" className="w-full h-full object-cover" />
        )}
      </motion.div>
    </>
  );
};

// --- 3. PAGE SECTIONS ---

// Updated Section: Uses min-h-screen for mobile scrolling consistency
const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`min-h-screen w-full snap-start relative flex flex-col justify-center items-center py-20 md:py-0 ${className}`}>
    {children}
  </section>
);

const Hero = () => {
  return (
    <Section id="accueil" className="bg-neutral-900 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/50" />

      <div className="z-10 text-center max-w-7xl px-4 md:px-6 flex flex-col items-center justify-center h-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-xs md:text-xl tracking-[0.2em] md:tracking-[0.4em] text-[#F25C05] mb-4 md:mb-6 uppercase font-bold">Fondation Ali Zaoua</h2>
        </motion.div>

        <div className="mb-6 md:mb-10 w-full">
           <TextReveal className="text-4xl sm:text-6xl md:text-9xl font-black text-white justify-center leading-none tracking-tighter">
             FAIRE BRILLER
           </TextReveal>
           <TextReveal className="text-4xl sm:text-6xl md:text-9xl font-black text-[#F25C05] justify-center leading-none tracking-tighter" delay={0.2}>
             LES ÉTOILES
           </TextReveal>
        </div>

        {/* Images under the headline */}
        <motion.div 
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-10 px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {HERO_IMAGES.map((src, i) => (
             <motion.div 
               key={i} 
               className="relative h-24 sm:h-32 md:h-48 rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer"
               whileHover={{ scale: 1.05 }}
             >
               <img src={src} alt="Culture" className="w-full h-full object-cover opacity-80 md:opacity-70 group-hover:opacity-100 transition-opacity" />
               <div className="absolute inset-0 bg-[#F25C05]/20 mix-blend-overlay group-hover:bg-transparent transition-colors" />
             </motion.div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 font-light px-4"
        >
          Transformez la vie des jeunes marocains à travers les arts, la culture et l'éducation.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full px-6">
          <MagneticButton className="bg-[#F25C05] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-[#F25C05] transition-colors shadow-[0_0_30px_rgba(242,92,5,0.4)] w-full sm:w-auto">
            Découvrir
          </MagneticButton>
        </div>
      </div>
    </Section>
  );
};

const Pillars = () => {
  return (
    <Section id="missions" className="bg-white text-neutral-900">
       <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start h-full md:h-auto">
         
         <div className="lg:sticky lg:top-20">
           <h3 className="text-[#F25C05] font-bold uppercase tracking-widest mb-2 md:mb-4 text-sm md:text-base">Nos Missions</h3>
           <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 leading-tight">Placer l'Humain au cœur de l'engagement.</h2>
           <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
             Nous œuvrons pour que les arts et les cultures soient accessibles à tous, quel que soit le lieu de vie, l'origine ou l'environnement social.
           </p>
           <MagneticButton className="hidden md:inline-block border-2 border-neutral-900 text-neutral-900 px-8 py-3 rounded-full font-bold hover:bg-neutral-900 hover:text-white transition-colors">
             En savoir plus
           </MagneticButton>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 w-full">
            {PILLARS.map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-neutral-100 hover:border-[#F25C05]/30 hover:shadow-xl hover:shadow-[#F25C05]/10 transition-all cursor-pointer group"
              >
                 <div className="text-3xl md:text-4xl mb-3 md:mb-4 bg-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{pillar.icon}</div>
                 <h3 className="text-lg md:text-2xl font-bold mb-2 group-hover:text-[#F25C05] transition-colors">{pillar.title}</h3>
                 <p className="text-sm md:text-base text-gray-500">{pillar.desc}</p>
              </motion.div>
            ))}
         </div>

       </div>
    </Section>
  );
};

const History = () => {
  return (
    <Section id="histoire" className="bg-[#F25C05] text-white">
      <div className="max-w-6xl w-full px-6">
        <h2 className="text-3xl md:text-7xl font-bold mb-8 md:mb-16 text-center">Notre Histoire</h2>
        
        {/* Mobile: Vertical Timeline | Desktop: Horizontal Grid */}
        <div className="relative border-l-4 border-white/20 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0 md:border-t-4 md:pt-12 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-8">
           {TIMELINE.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.15 }}
               className="relative md:text-center group"
             >
               {/* Dot indicator */}
               <div className="absolute -left-[41px] top-0 w-6 h-6 bg-white rounded-full border-4 border-[#F25C05] md:left-1/2 md:-top-[59px] md:-translate-x-1/2 md:group-hover:scale-150 transition-transform" />
               
               <h3 className="text-3xl md:text-4xl font-black mb-1 md:mb-2 opacity-70 group-hover:opacity-100 transition-opacity">{item.year}</h3>
               <h4 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h4>
               <p className="text-sm opacity-90 leading-relaxed max-w-xs">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </Section>
  );
};

const PositiveSchool = () => {
  return (
    <Section id="positive-school" className="bg-yellow-400 text-black">
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
         <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl transform md:rotate-3 md:hover:rotate-0 transition-transform duration-500 order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1541250628459-d5f2776a82f9?q=80&w=2070" 
              className="w-full h-full object-cover" 
              alt="Hip Hop Dance"
            />
            <div className="absolute inset-0 bg-black/20" />
         </div>
         
         <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-black font-black uppercase tracking-widest mb-2 md:mb-4 border-b-4 border-black inline-block text-xs md:text-base">Programme Phare</h3>
              <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6">POSITIVE SCHOOL</h2>
              <p className="text-lg md:text-xl font-medium mb-4 md:mb-6">
                Bien plus qu'une simple école, un mouvement—une philosophie ancrée dans l'essence même du hip-hop.
              </p>
              <p className="text-base md:text-lg mb-6 md:mb-8 opacity-80">
                Nous formons la prochaine génération de danseurs, rappeurs et beatmakers. Un espace où la rue devient scène et où l'expression devient art.
              </p>
              <MagneticButton className="bg-black text-yellow-400 px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform w-full md:w-auto">
                Rejoindre le Crew
              </MagneticButton>
            </motion.div>
         </div>
      </div>
    </Section>
  );
};

const Digitali = () => {
  return (
    <Section id="digitali" className="bg-indigo-900 text-white">
       <div className="max-w-7xl w-full px-6 flex flex-col lg:flex-row-reverse gap-8 md:gap-12 items-center">
         <div className="w-full lg:w-1/2">
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="relative aspect-video bg-black rounded-2xl border border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.3)] overflow-hidden flex items-center justify-center"
             >
                <div className="text-center p-4">
                   <div className="text-4xl md:text-6xl mb-2 md:mb-4">💻</div>
                   <h3 className="text-xl md:text-2xl font-mono text-indigo-400">e-learning platform</h3>
                   <p className="text-xs text-gray-500 mt-2">loading modules...</p>
                </div>
             </motion.div>
         </div>
         
         <div className="w-full lg:w-1/2">
            <h3 className="text-indigo-400 font-bold uppercase tracking-widest mb-2 md:mb-4 text-xs md:text-base">Innovation</h3>
            <h2 className="text-3xl md:text-7xl font-bold mb-4 md:mb-6">DIGIT'ALI</h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-6 md:mb-8 leading-relaxed">
              Une plateforme de e-learning artistique ouverte à tous, partout au Maroc.
            </p>
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-sm md:text-base">
               <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> Cours en ligne accessibles gratuitement</li>
               <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> Formation aux métiers du numérique</li>
               <li className="flex items-center gap-3"><span className="text-indigo-400">✓</span> Inclusion numérique pour les zones rurales</li>
            </ul>
            <MagneticButton className="bg-indigo-500 text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-indigo-900 transition-colors w-full md:w-auto">
               Accéder à la plateforme
            </MagneticButton>
         </div>
       </div>
    </Section>
  );
};

const CentersList = ({ setCursorImage }) => {
  return (
    <Section id="centres" className="bg-neutral-900 text-white">
      <div className="max-w-6xl w-full px-6 flex flex-col h-full justify-center">
        <div className="mb-8 md:mb-12 flex items-end justify-between border-b border-gray-800 pb-6">
          <div>
            <h3 className="text-[#F25C05] font-bold uppercase tracking-widest mb-2 text-xs md:text-base">Nos Ancrages</h3>
            <h2 className="text-3xl md:text-6xl font-bold">Les Étoiles du Maroc</h2>
          </div>
          <div className="hidden md:block text-right">
             <span className="text-5xl font-bold text-[#F25C05]">5</span>
             <span className="block text-gray-500 uppercase text-sm">Régions</span>
          </div>
        </div>

        <div className="flex flex-col">
          {CENTERS.map((center, index) => (
            <motion.div 
              key={index}
              className="group relative border-b border-gray-800 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer md:cursor-none transition-colors hover:bg-white/5 px-2 md:px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setCursorImage(center.image)}
              onMouseLeave={() => setCursorImage(null)}
            >
              <div className="z-10 pointer-events-none">
                <span className="text-[10px] md:text-xs text-[#F25C05] font-mono mb-1 md:mb-2 block">0{index + 1}</span>
                <h3 className="text-2xl md:text-5xl font-bold group-hover:translate-x-4 transition-transform duration-300 group-hover:text-[#F25C05]">{center.city}</h3>
                <span className="text-gray-400 text-base md:text-lg mt-1 block group-hover:text-white transition-colors">{center.name}</span>
              </div>
              <div className="mt-3 md:mt-0 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 z-10 pointer-events-none md:max-w-xs text-left md:text-right">
                <p className="text-gray-300 text-sm leading-relaxed">{center.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Testimonials = () => {
  return (
    <Section id="temoignages" className="bg-white text-neutral-900 overflow-hidden">
      <div className="absolute top-0 left-0 p-4 md:p-10 opacity-5 pointer-events-none">
         <span className="text-[10rem] md:text-[20rem] font-serif text-[#F25C05]">"</span>
      </div>

      <div className="max-w-7xl w-full px-6 z-10">
        <h2 className="text-3xl md:text-6xl font-bold mb-8 md:mb-16 text-center">Paroles d'Étoiles</h2>
        
        <div className="flex overflow-x-auto snap-x no-scrollbar pb-10 gap-4 md:gap-8">
           {TESTIMONIALS.map((t, i) => (
             <motion.div 
               key={i}
               className="min-w-[300px] md:min-w-[500px] bg-neutral-50 border border-neutral-100 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg snap-center flex flex-col justify-between"
               whileHover={{ y: -10 }}
             >
                <div>
                   <p className="text-lg md:text-2xl font-medium leading-relaxed mb-4 md:mb-6 italic text-gray-700">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F25C05] text-white flex items-center justify-center font-bold text-base md:text-lg">
                      {t.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-base md:text-lg">{t.name}</h4>
                      <p className="text-xs md:text-sm text-[#F25C05] uppercase tracking-wide font-bold">{t.role}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section id="contact" className="bg-neutral-900 text-white relative">
      <div className="text-center max-w-4xl px-6">
        <h2 className="text-3xl md:text-8xl font-bold mb-6 md:mb-8">Rejoignez le Mouvement.</h2>
        <p className="text-base md:text-xl mb-8 md:mb-12 text-gray-400">Devenez parrain, partenaire ou bénévole et aidez-nous à faire briller les étoiles de demain.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
           <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 text-left hover:bg-white/10 transition-colors">
              <h3 className="text-[#F25C05] text-xl md:text-2xl font-bold mb-2 md:mb-4">Contact</h3>
              <p className="text-base md:text-lg text-gray-300 mb-2">📞 +212(0) 5 22 72 49 23</p>
              <p className="text-base md:text-lg text-gray-300 break-all">✉️ contact@fondationalizaoua.org</p>
           </div>
           <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 text-left hover:bg-white/10 transition-colors">
              <h3 className="text-[#F25C05] text-xl md:text-2xl font-bold mb-2 md:mb-4">Siège Social</h3>
              <p className="text-base md:text-lg text-gray-300">Angle Bd. Mohammed Zefzaf<br/>Sidi Moumen – Casablanca</p>
           </div>
        </div>

        <div className="flex justify-center gap-6">
           <MagneticButton className="bg-white text-[#F25C05] px-10 py-4 md:px-12 md:py-5 rounded-full font-bold text-lg md:text-xl hover:scale-105 transition-transform shadow-2xl w-full md:w-auto">
              Faire un Don
           </MagneticButton>
        </div>
        
        <footer className="absolute bottom-4 md:bottom-8 w-full text-center opacity-40 text-xs md:text-sm">
          © 2025 Fondation Ali Zaoua. Tous droits réservés.
        </footer>
      </div>
    </Section>
  );
};

// --- MAIN APP ---

export default function App() {
  const [cursorImage, setCursorImage] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative">
      <Navigation />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed bottom-0 left-0 right-0 h-1 md:h-2 bg-[#F25C05] origin-left z-50" 
      />

      <main 
        ref={containerRef}
        className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth no-scrollbar cursor-none bg-neutral-900 selection:bg-[#F25C05] selection:text-white"
      >
        <InteractiveCursor activeImage={cursorImage} />
        
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          /* Only hide default cursor on non-touch devices to ensure usability on mobile */
          @media (pointer: fine) {
            * { cursor: none !important; }
          }
        `}</style>

        <Hero />
        <Pillars />
        <History />
        <PositiveSchool />
        <Digitali />
        <CentersList setCursorImage={setCursorImage} />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}