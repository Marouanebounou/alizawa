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

import activity1 from "./IMG_2824.PNG";
import activity2 from "./IMG_2822.PNG";
import activity3 from "./IMG_2871.JPG";
import activity4 from "./IMG_2870.JPG";
import activity5 from "./IMG_2869.JPG";
import activity6 from "./IMG_2872.JPG";

const HERO_IMAGES = [
  hero1,
  hero2,
  hero3,
];

const SHOWS = [
  { 
    id: 3, 
    title: "Cours de Luth (Adultes)", titleAr: "دروس العود (بالغون)",
    category: "Musique", categoryAr: "موسيقى",
    year: "2025", 
    image: activity5,
    desc: "Apprentissage du Luth Oriental pour adultes avec l'artiste Kamal Elaidi. Chaque Vendredi à 16h.",
    descAr: "تعلّم العود الشرقي للبالغين مع الفنان كمال العيدي. كل جمعة على الساعة 16:00."
  },
  { 
    id: 1, 
    title: "Match d'Improvisation", titleAr: "مباراة الارتجال",
    category: "Théâtre", categoryAr: "مسرح",
    year: "2025", 
    image: show3, 
    desc: "Spectacle d'improvisation théâtrale au Dabatek Technopark.",
    descAr: "عرض مسرحي ارتجالي في داباتيك تيكنوبارك."
  },
  { 
    id: 2, 
    title: "Fête de l'Indépendance", titleAr: "عيد الاستقلال",
    category: "Célébration", categoryAr: "احتفال",
    year: "2025", 
    image: show2, 
    desc: "Programme spécial: Atelier manuel, projection de film et karaoké.",
    descAr: "برنامج خاص: ورشة يدوية، عرض فيلم وكاراوكي."
  },
  { 
    id: 4, 
    title: "Club de Lecture", titleAr: "نادي القراءة",
    category: "Littérature", categoryAr: "أدب",
    year: "2025", 
    image: show4, 
    desc: "Rencontre et échange autour du livre à la Maison des jeunes.",
    descAr: "لقاء وتبادل حول الكتاب في دار الشباب."
  },
  { 
    id: 5, 
    title: "Cours de Percussions", titleAr: "دروس الإيقاع",
    category: "Musique", categoryAr: "موسيقى",
    year: "2025", 
    image: show5, 
    desc: "Cours chaque dimanche avec El Radan Salaheddine.",
    descAr: "دروس كل أحد مع صلاح الدين الرادان."
  },
  { 
    id: 6, 
    title: "Jeux Collectifs", titleAr: "ألعاب جماعية",
    category: "Animation", categoryAr: "أنشطة",
    year: "2025", 
    image: show6, 
    desc: "Le saut de la confiance - Activités ludiques à la Maison des jeunes.",
    descAr: "قفزة الثقة - أنشطة ترفيهية في دار الشباب."
  },
  { 
    id: 7, 
    title: "Atelier Créatif", titleAr: "ورشة إبداعية",
    category: "Artisanat", categoryAr: "حرف يدوية",
    year: "2025", 
    image: show7, 
    desc: "Mères des étoiles - Atelier de fabrication de bracelets.",
    descAr: "أمهات النجوم - ورشة صنع الأساور."
  },
];

// UPCOMING ACTIVITIES DATA
const UPCOMING_ACTIVITIES = [
  {
    id: 1,
    title: "Think Out Loud", titleAr: "عبّر بصوت عالٍ",
    category: "Expression", categoryAr: "تعبير",
    date: "29 Novembre 2025", dateAr: "29 نوفمبر 2025",
    time: "A partir de 16:00",
    location: "Les Étoiles du Détroit",
    instructor: "Entrée Libre",
    image: activity1, 
    description: "Exprime-toi à haute voix. Une tribune libre pour la jeunesse tangéroise.",
    descriptionAr: "عبّر عن نفسك بصوت عالٍ. منبر حر لشباب طنجة.",
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    title: "Workshop: Vision Board", titleAr: "ورشة: لوحة الأحلام",
    category: "Artisanat", categoryAr: "حرف يدوية",
    date: "30 Novembre 2025", dateAr: "30 نوفمبر 2025",
    time: "16:00",
    location: "Maison des Jeunes (El Mers)",
    instructor: "Atelier Créatif",
    image: activity2, 
    description: "Design Your Future: Créez votre tableau de visualisation pour l'année à venir.",
    descriptionAr: "صمّم مستقبلك: أنشئ لوحة التصوّر الخاصة بك للعام القادم.",
    isNew: true,
    isFeatured: false
  },
  {
    id: 3,
    title: "Cours de Luth (Oud)", titleAr: "دروس العود",
    category: "Musique", categoryAr: "موسيقى",
    date: "Chaque Vendredi", dateAr: "كل جمعة",
    time: "16:00",
    location: "Les Étoiles du Détroit",
    instructor: "Kamal Elaidi",
    image: activity3, 
    description: "Formation musicale traditionnelle pour Ados et Adultes.",
    descriptionAr: "تكوين موسيقي تراثي للمراهقين والبالغين.",
    isNew: false,
    isFeatured: true
  },
  {
    id: 4,
    title: "Cours de Percussions", titleAr: "دروس الإيقاع",
    category: "Musique", categoryAr: "موسيقى",
    date: "Chaque Dimanche", dateAr: "كل أحد",
    time: "16:00",
    location: "Les Étoiles du Détroit",
    instructor: "Salaheddine El Radani",
    image: activity4, 
    description: "Rythmes et percussions pour Ados et Adultes.",
    descriptionAr: "إيقاعات وطبول للمراهقين والبالغين.",
    isNew: false,
    isFeatured: true
  }
];

// Tanger Centers Data - TWO LOCATIONS
const TANGER_CENTERS = [
  {
    id: "tanger-barcelone",
    name: "المركز الثقافي نجوم البوغاز",
    nameFr: "Centre Culturel les Étoiles du Détroit",
    type: "Centre communautaire",
    city: "Tanger",
    tagline: "Un phare culturel face à l'Europe, ancré dans l'Afrique.",
    description: "Situé au cœur de Tanger, notre centre principal est un espace de création et d'échange où les jeunes découvrent leur potentiel à travers l'art, la culture et l'expression créative.",
    descriptionAr: "يقع في قلب طنجة، مركزنا الرئيسي هو فضاء للإبداع والتبادل حيث يكتشف الشباب إمكاناتهم من خلال الفن والثقافة والتعبير الإبداعي.",
    address: "N° 13, Rue Barcelone, Tanger",
    phone: "0669-360651",
    email: "tanger@lesetoiles.ma",
    rating: 4.6,
    reviews: 58,
    hours: "Fermé · Ouvre à 10h Dimanche",
    openTime: "10:00 - 20:00",
    images: [tangerImage1, tangerImage2, tangerImage3, tangerImage4],
    creationYear: "2017",
    isPrimary: true,
    mapLink: "https://maps.google.com/?q=Centre+Culturel+les+Etoiles+du+Detroit+Tanger"
  },
  {
    id: "tanger-elmers",
    name: "المركز الثقافي نجوم البوغاز ـ المرس بوسلهام",
    nameFr: "Les Étoiles du Détroit - El Mers",
    type: "Centre culturel",
    city: "Tanger - El Mers",
    tagline: "Rayonnement culturel dans le quartier El Mers.",
    description: "Notre deuxième centre à El Mers étend notre mission culturelle pour toucher plus de jeunes dans la région de Tanger.",
    descriptionAr: "مركزنا الثاني في المرس يمدّ مهمتنا الثقافية للوصول إلى المزيد من الشباب في منطقة طنجة.",
    address: "Rte Mers Rocade 9, Tanger",
    phone: "0668-954532",
    email: "elmers@lesetoiles.ma",
    rating: 4.0,
    reviews: 8,
    hours: "Fermé · Ouvre à 10h Dimanche",
    openTime: "10:00 - 20:00",
    images: [tangerImage3, tangerImage4, tangerImage1, tangerImage2],
    creationYear: "2019",
    isPrimary: false,
    mapLink: "https://maps.google.com/?q=Les+Etoiles+du+Detroit+El+Mers+Tanger"
  }
];

// Shared data for both centers
const TANGER_DATA = {
  stats: [
    { number: "10,000+", label: "Bénéficiaires", labelAr: "المستفيدون" },
    { number: "350+", label: "Jeunes Actifs", labelAr: "الشباب النشيط" },
    { number: "2", label: "Centres à Tanger", labelAr: "مراكز في طنجة" },
    { number: "2017", label: "Date de Création", labelAr: "تاريخ التأسيس" }
  ],
  activities: [
    { icon: "🎤", name: "Chant", nameAr: "الغناء", desc: "Cours de chant et technique vocale", descAr: "دروس الغناء وتقنية الصوت" },
    { icon: "🇫🇷", name: "Français", nameAr: "الفرنسية", desc: "Apprentissage et perfectionnement", descAr: "التعلم والتحسين" },
    { icon: "🎭", name: "Théâtre", nameAr: "المسرح", desc: "Expression dramatique et mise en scène", descAr: "التعبير الدرامي والإخراج" },
    { icon: "🎨", name: "Arts Plastiques", nameAr: "الفنون التشكيلية", desc: "Peinture, dessin et sculpture", descAr: "الرسم والتصوير والنحت" },
    { icon: "💻", name: "Bureautique", nameAr: "الإعلام الآلي", desc: "Introduction aux outils informatiques", descAr: "مقدمة في أدوات الإعلام الآلي" },
    { icon: "🇬🇧", name: "Anglais", nameAr: "الإنجليزية", desc: "Cours de langue anglaise", descAr: "دروس اللغة الإنجليزية" },
    { icon: "🖥️", name: "Design Digital", nameAr: "التصميم الرقمي", desc: "Graphisme et création numérique", descAr: "الجرافيك والإبداع الرقمي" },
    { icon: "🎹", name: "Piano", nameAr: "البيانو", desc: "Initiation et cours de piano", descAr: "مقدمة ودروس البيانو" }
  ],
  features: [
    "Salle de spectacle",
    "Studio de musique",
    "Salle informatique",
    "Bibliothèque",
    "Espace polyvalent",
    "Salle de cours"
  ],
  featuresAr: [
    "قاعة العروض",
    "استوديو موسيقي",
    "قاعة الإعلام الآلي",
    "مكتبة",
    "فضاء متعدد الأغراض",
    "قاعة الدروس"
  ]
};

// --- 1b. TRANSLATIONS ---

const T = {
  fr: {
    nav: { home:'Accueil', activities:'Activités', events:'Événements', centers:'Nos Centres', hors:'Hors les murs', contact:'Contact', donate:'Faire un Don' },
    hero: { label:'Centre Culturel Les Étoiles du Détroit', line1:"L'Art et la Culture", line2:'à Tanger', sub:"Depuis 2017, nous accompagnons la jeunesse tangéroise dans son épanouissement à travers l'art et la culture.", eventsBtn:'Nos événements', horsBtn:'Hors les murs' },
    stats: { beneficiaries:'Bénéficiaires', youth:'Jeunes Actifs', centers:'Centres à Tanger', created:'Date de Création' },
    upcoming: { badge:'Rejoignez-nous', title:'Prochaines', highlight:'Activités', sub:"Découvrez nos ateliers et formations. Inscrivez-vous et rejoignez notre communauté créative !", all:'Toutes les activités', register:"S'inscrire maintenant", date:'Date', time:'Heure', notFound:'Vous ne trouvez pas ce que vous cherchez ?', contactUs:'Nous contacter', contactSub:"Contactez-nous pour plus d'informations sur nos programmes." },
    events: { badge:'Nos Réalisations', title:'Nos', highlight:'Événements', sub:'Retour sur les moments forts qui ont marqué nos centres culturels.', seeAll:'Voir tous les événements' },
    centers: { badge:'Nos Espaces', title:'2 Centres,', highlight:'1 Mission', sub:"Depuis 2017, nous œuvrons pour l'épanouissement de la jeunesse tangéroise à travers l'art et la culture.", workshops:"Nos Ateliers & Formations", address:'Adresse', phone:'Téléphone', hours:'Horaires', map:'Voir sur Google Maps', primary:'Centre Principal' },
    involved: { badge:'Rejoignez le mouvement', title:'Agissons', highlight:'Ensemble.', sub:"Chaque contribution compte. Devenez acteur du changement et participez à l'épanouissement de la jeunesse tangéroise.", volunteer:'Devenir Bénévole', donate:'Faire un Don' },
    footer: { newsletter:"Inscrivez-vous à notre newsletter pour recevoir les dernières actualités de nos centres culturels à Tanger.", subscribe:"S'inscrire", ourCenters:'Nos Centres', hoursTitle:'Horaires', hoursDetail:'Dimanche - samedi', monday:'lundi', closed:'Fermé', follow:'Suivez-nous', rights:'© 2025 Centre Culturel Les Étoiles du Détroit - Tanger. Tous droits réservés.', legal:'Mentions légales', privacy:'Politique de confidentialité' },
    projectsPage: { back:"← Retour à l'accueil", title:'Nos Événements', sub:'Découvrez tous les événements et activités du Centre Culturel Les Étoiles du Détroit.', upcoming:'Prochaines Activités', register:"S'inscrire →" },
    centersPage: { back:"← Retour à l'accueil", title:'Nos Centres', sub:'Deux espaces culturels au service de la jeunesse tangéroise', since:'Depuis', workshops:'Nos Ateliers', address:'Adresse', phone:'Téléphone', hours:'Horaires', map:'Voir sur Google Maps →', primary:'Centre Principal' },
    contactPage: { back:'← Retour', title:'Contact', sub:'Rejoignez notre communauté de plus de', and:'et', name:'Nom', firstname:'Prénom', emailLabel:'Email', center:'Centre concerné', subject:'Sujet', subjectPh:'Sélectionnez un sujet', message:'Message', messagePh:'Votre message...', send:'Envoyer le message', hoursTitle:"Horaires d'ouverture", map:'Voir sur Google Maps →' },
  },
  ar: {
    nav: { home:'الرئيسية', activities:'الأنشطة', events:'الفعاليات', centers:'مراكزنا', hors:'خارج الأسوار', contact:'اتصل بنا', donate:'تبرع' },
    hero: { label:'المركز الثقافي نجوم البوغاز', line1:'الفن والثقافة', line2:'في طنجة', sub:'منذ 2017، نرافق شباب طنجة في رحلة الازدهار من خلال الفن والثقافة.', eventsBtn:'فعالياتنا', horsBtn:'خارج الأسوار' },
    stats: { beneficiaries:'المستفيدون', youth:'الشباب النشيط', centers:'مراكز في طنجة', created:'تاريخ التأسيس' },
    upcoming: { badge:'انضموا إلينا', title:'الأنشطة', highlight:'القادمة', sub:'اكتشفوا ورشاتنا وتكويناتنا. سجلوا وانضموا إلى مجتمعنا الإبداعي!', all:'جميع الأنشطة', register:'سجل الآن', date:'التاريخ', time:'الوقت', notFound:'لم تجد ما تبحث عنه؟', contactUs:'اتصل بنا', contactSub:'تواصل معنا للمزيد من المعلومات حول برامجنا.' },
    events: { badge:'إنجازاتنا', title:'', highlight:'فعالياتنا', sub:"استعادة أبرز اللحظات التي ميّزت مراكزنا الثقافية.", seeAll:'عرض جميع الفعاليات' },
    centers: { badge:'فضاءاتنا', title:'مركزان،', highlight:'مهمة واحدة', sub:'منذ 2017، نعمل على إزهار شباب طنجة من خلال الفن والثقافة.', workshops:'ورشاتنا وتكويناتنا', address:'العنوان', phone:'الهاتف', hours:'أوقات العمل', map:'عرض على خرائط Google', primary:'المركز الرئيسي' },
    involved: { badge:'انضم إلى الحركة', title:'لنتحرك', highlight:'معاً.', sub:'كل مساهمة تُحدث فرقاً. كن فاعلاً للتغيير وشارك في ازدهار شباب طنجة.', volunteer:'تطوع معنا', donate:'تبرع' },
    footer: { newsletter:'اشترك في نشرتنا البريدية لتلقي آخر أخبار مراكزنا الثقافية في طنجة.', subscribe:'اشترك', ourCenters:'مراكزنا', hoursTitle:'أوقات العمل', hoursDetail:'الأحد - السبت', monday:'الاثنين', closed:'مغلق', follow:'تابعونا', rights:'© 2025 المركز الثقافي نجوم البوغاز - طنجة. جميع الحقوق محفوظة.', legal:'الشروط القانونية', privacy:'سياسة الخصوصية' },
    projectsPage: { back:'← العودة إلى الرئيسية', title:'فعالياتنا', sub:'اكتشف جميع فعاليات وأنشطة المركز الثقافي نجوم البوغاز.', upcoming:'الأنشطة القادمة', register:'سجل ←' },
    centersPage: { back:'← العودة إلى الرئيسية', title:'مراكزنا', sub:'فضاءان ثقافيان في خدمة شباب طنجة', since:'منذ', workshops:'ورشاتنا', address:'العنوان', phone:'الهاتف', hours:'أوقات العمل', map:'عرض على خرائط Google ←', primary:'المركز الرئيسي' },
    contactPage: { back:'← رجوع', title:'اتصل بنا', sub:'انضم إلى مجتمعنا الذي يضم أكثر من', and:'و', name:'اللقب', firstname:'الاسم', emailLabel:'البريد الإلكتروني', center:'المركز المعني', subject:'الموضوع', subjectPh:'اختر موضوعاً', message:'الرسالة', messagePh:'رسالتك...', send:'إرسال الرسالة', hoursTitle:'أوقات العمل', map:'عرض على خرائط Google ←' },
  },
};

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

const Navbar = ({ currentView, setView, lang, setLang }) => {
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
                <img src={logo} alt="Les Étoiles du Détroit" className="h-10 w-auto object-contain rounded-md" />
              ) : (
                <div className="w-9 h-9 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white font-black text-sm group-hover:bg-[#5e2b79] transition-colors duration-300">E</div>
              )}
              <span className="font-black text-lg tracking-tight text-[#5e2b79] hidden sm:block">Les Étoiles du Détroit</span>
            </button>

            <div className={`hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
                isScrolled ? "opacity-100" : "bg-white/60 backdrop-blur-md rounded-full px-6 py-2 border border-white/40 shadow-sm"
            }`}>
              <button onClick={() => handleNavClick('home', 'accueil')} className={`px-3 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 whitespace-nowrap ${currentView === 'home' ? 'text-black' : 'text-neutral-600'}`}>{T[lang].nav.home}</button>
              <button onClick={() => handleNavClick('home', 'activites')} className="px-3 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 text-neutral-600 whitespace-nowrap">{T[lang].nav.activities}</button>
              <button onClick={() => handleNavClick('projects')} className={`px-3 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 whitespace-nowrap ${currentView === 'projects' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>{T[lang].nav.events}</button>
              <button onClick={() => handleNavClick('centers')} className={`px-3 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 whitespace-nowrap ${currentView === 'centers' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>{T[lang].nav.centers}</button>
              <button onClick={() => handleNavClick('kharij')} className={`px-3 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 whitespace-nowrap ${currentView === 'kharij' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>{T[lang].nav.hors}</button>
              <button onClick={() => handleNavClick('contact')} className={`px-3 py-2 text-sm font-bold transition-colors rounded-full hover:bg-black/5 whitespace-nowrap ${currentView === 'contact' ? 'text-[#5e2b79]' : 'text-neutral-600'}`}>{T[lang].nav.contact}</button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                className="hidden md:flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-full px-3 py-2 text-xs font-bold transition-colors"
              >
                <span className="text-neutral-600">{lang === 'fr' ? 'FR' : 'AR'}</span>
                <span className="text-neutral-300">/</span>
                <span className="text-[#5e2b79] font-bold">{lang === 'fr' ? 'عربي' : 'FR'}</span>
              </button>
              <button onClick={() => handleNavClick('contact')} className="bg-[#5e2b79] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#1A1A1A] transition-colors shadow-md flex items-center gap-2">
                <span>{T[lang].nav.donate}</span>
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
            <div className="flex flex-col gap-6 text-3xl font-black text-white tracking-tight">
              <button onClick={() => handleNavClick('home', 'accueil')} className="text-left">{T[lang].nav.home}</button>
              <button onClick={() => handleNavClick('home', 'activites')} className="text-left text-[#f4e222]">{T[lang].nav.activities}</button>
              <button onClick={() => handleNavClick('projects')} className="text-left text-[#5e2b79]">{T[lang].nav.events}</button>
              <button onClick={() => handleNavClick('centers')} className="text-left">{T[lang].nav.centers}</button>
              <button onClick={() => handleNavClick('kharij')} className="text-left text-[#f4e222]">{T[lang].nav.hors}</button>
              <button onClick={() => handleNavClick('contact')} className="text-left">{T[lang].nav.contact}</button>
              <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} className="text-left text-sm mt-2 text-neutral-400">
                {lang === 'fr' ? 'عربي عربي' : 'Passer en Français'}
              </button>
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

const Hero = ({ setView, lang }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <>
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      <section id="accueil" className="min-h-screen relative flex flex-col justify-center items-center bg-[#F4F4F0] pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
             <h2 className="text-sm font-bold tracking-[0.3em] text-neutral-500 mb-4 uppercase">{T[lang].hero.label}</h2>
             <div className="flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1A1A1A] tracking-tight leading-[0.9]">
                  {T[lang].hero.line1}
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
                  {lang === 'fr' ? <>à <span className="text-[#f4e222]">Tanger</span></> : <>في <span className="text-[#f4e222]">طنجة</span></>}
                </h1>
             </div>
             <p className="text-neutral-500 text-lg mt-6 max-w-xl mx-auto lg:pb-10 md:pb-10">
               {T[lang].hero.sub}
             </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
             {HERO_IMAGES.map((src, i) => (
               <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1), duration: 0.8 }} className={`rounded-2xl overflow-hidden h-64 md:h-80 w-full ${i === 1 ? 'md:-mt-12 shadow-2xl z-10' : 'opacity-80'}`}>
                 <img src={src} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Hero" />
               </motion.div>
             ))}
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <MagneticButton onClick={() => setView('projects')} className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold hover:bg-[#5e2b79] transition-colors shadow-lg">{T[lang].hero.eventsBtn}</MagneticButton>
             <MagneticButton onClick={() => setView('kharij')} className="bg-[#5e2b79] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1A1A1A] transition-colors shadow-lg flex items-center gap-2">
               <span>{T[lang].hero.horsBtn}</span>
               <span>←</span>
             </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
};

// UPDATED KEY NUMBERS WITH NEW STATS
const KeyNumbers = ({ lang }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  const stats = [
    { num: "10,000+", labelKey: 'beneficiaries', icon: "👥", color: "#5e2b79" },
    { num: "350+", labelKey: 'youth', icon: "⭐", color: "#f4e222" },
    { num: "12", labelKey: 'centers', icon: "🏛️", color: "#5e2b79" },
    { num: "2017", labelKey: 'created', icon: "📅", color: "#f4e222" }
  ];

  return (
    <section className="py-20 bg-white border-y border-neutral-100" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30, scale: 0.9 }} 
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
              className="relative text-center p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 hover:shadow-xl hover:border-neutral-200 transition-all group cursor-pointer"
            >
              {/* Background Icon */}
              <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                {stat.icon}
              </div>
              
              {/* Number */}
              <motion.h3 
                className="text-4xl md:text-5xl font-black mb-2"
                style={{ color: stat.color }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.num}
              </motion.h3>
              
              {/* Label */}
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">{T[lang].stats[stat.labelKey]}</p>
              
              {/* Decorative line */}
              <motion.div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full"
                style={{ backgroundColor: stat.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: '40%' } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// NEW REDESIGNED UPCOMING ACTIVITIES SECTION
const UpcomingActivities = ({ setView, lang }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const categories = ['all', 'Expression', 'Artisanat', 'Musique'];
  
  const filteredActivities = activeCategory === 'all' 
    ? UPCOMING_ACTIVITIES 
    : UPCOMING_ACTIVITIES.filter(a => a.category === activeCategory);

  return (
    <section id="activites" className="py-20 md:py-28 bg-[#F4F4F0] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5e2b79] text-white rounded-full font-bold text-sm uppercase tracking-widest mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 bg-[#f4e222] rounded-full animate-pulse" />
                {T[lang].upcoming.badge}
              </motion.span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] mb-4">
                {T[lang].upcoming.title} <span className="text-[#5e2b79]">{T[lang].upcoming.highlight}</span>
              </h2>
              <p className="text-neutral-500 text-lg md:text-xl max-w-xl">
                {T[lang].upcoming.sub}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 text-center min-w-[140px]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="text-3xl md:text-4xl font-black text-[#5e2b79]">10,000+</div>
                <div className="text-sm text-neutral-500 font-bold uppercase tracking-wider mt-1">{T[lang].stats.beneficiaries}</div>
              </motion.div>
              <motion.div 
                className="bg-[#1A1A1A] rounded-2xl p-6 shadow-sm text-center min-w-[140px]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-black text-[#f4e222]">350+</div>
                <div className="text-sm text-neutral-400 font-bold uppercase tracking-wider mt-1">{T[lang].stats.youth}</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#1A1A1A] text-white shadow-lg' 
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {cat === 'all' ? T[lang].upcoming.all : (lang === 'ar' ? (UPCOMING_ACTIVITIES.find(a => a.category === cat)?.categoryAr || cat) : cat)}
            </button>
          ))}
        </motion.div>

        {/* Activities Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                  onMouseEnter={() => setHoveredId(activity.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredId === activity.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {activity.isNew && (
                        <motion.span 
                          className="px-3 py-1.5 bg-[#f4e222] text-black text-xs font-black rounded-full shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          NOUVEAU
                        </motion.span>
                      )}
                      {activity.isFeatured && (
                        <span className="px-3 py-1.5 bg-[#5e2b79] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                          ⭐ Populaire
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur text-neutral-700 text-xs font-bold rounded-full">
                        {lang === 'ar' ? activity.categoryAr : activity.category}
                      </span>
                    </div>

                    {/* Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                        {lang === 'ar' ? activity.titleAr : activity.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {lang === 'ar' ? activity.descriptionAr : activity.description}
                      </p>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#5e2b79]/10 rounded-xl flex items-center justify-center">
                          <span className="text-lg">📅</span>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400 uppercase font-bold">{T[lang].upcoming.date}</div>
                          <div className="text-sm font-bold text-[#1A1A1A]">{lang === 'ar' ? activity.dateAr : activity.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f4e222]/20 rounded-xl flex items-center justify-center">
                          <span className="text-lg">🕐</span>
                        </div>
                        <div>
                          <div className="text-xs text-neutral-400 uppercase font-bold">{T[lang].upcoming.time}</div>
                          <div className="text-sm font-bold text-[#1A1A1A]">{activity.time}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4 p-3 bg-neutral-50 rounded-xl">
                      <span className="text-lg">📍</span>
                      <div>
                        <div className="text-sm font-bold text-[#1A1A1A]">{activity.location}</div>
                        <div className="text-xs text-neutral-500">{activity.instructor}</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className="w-full py-4 bg-[#1A1A1A] text-white font-bold rounded-xl hover:bg-[#5e2b79] transition-all duration-300 flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setView('contact')}
                    >
                      <span>{T[lang].upcoming.register}</span>
                      <motion.span
                        className="text-lg"
                        animate={{ x: hoveredId === activity.id ? 5 : 0 }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </div>

                  {/* Hover Border */}
                  <motion.div 
                    className="absolute inset-0 border-3 border-[#5e2b79] rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === activity.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {filteredActivities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-[320px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {activity.isNew && (
                        <span className="px-2 py-1 bg-[#f4e222] text-black text-xs font-black rounded-full">
                          NEW
                        </span>
                      )}
                      <span className="px-2 py-1 bg-white/90 text-neutral-700 text-xs font-bold rounded-full">
                        {activity.category}
                      </span>
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-black text-white leading-tight">
                        {lang === 'ar' ? activity.titleAr : activity.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-neutral-500 text-sm mb-4 line-clamp-2">
                      {lang === 'ar' ? activity.descriptionAr : activity.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                      <span>📅</span>
                      <span className="font-bold">{lang === 'ar' ? activity.dateAr : activity.date}</span>
                      <span className="text-neutral-300">•</span>
                      <span>{activity.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                      <span>📍</span>
                      <span>{activity.location}</span>
                    </div>

                    <button
                      className="w-full py-3 bg-[#5e2b79] text-white font-bold rounded-xl text-sm"
                      onClick={() => setView('contact')}
                    >
                      {T[lang].upcoming.register}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-neutral-100">
            <div className="text-left">
              <h4 className="font-bold text-[#1A1A1A]">{T[lang].upcoming.notFound}</h4>
              <p className="text-sm text-neutral-500">{T[lang].upcoming.contactSub}</p>
            </div>
            <MagneticButton
              onClick={() => setView('contact')}
              className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full font-bold hover:bg-[#5e2b79] transition-all whitespace-nowrap"
            >
              {T[lang].upcoming.contactUs}
            </MagneticButton>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

// MODERN ANIMATED MAJOR PROJECTS SECTION
const MajorProjects = ({ setView, lang }) => {
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
            <span className="text-[#f4e222] font-mono text-sm uppercase tracking-widest">{T[lang].events.badge}</span>
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
              {T[lang].events.title} <span className="text-[#f4e222]">{T[lang].events.highlight}</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              {T[lang].events.sub}
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
                      {lang === 'ar' ? show.categoryAr : show.category}
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
                        {lang === 'ar' ? show.titleAr : show.title}
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
                      {lang === 'ar' ? show.descAr : show.desc}
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
            <span>{T[lang].events.seeAll}</span>
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

// TANGER CENTERS SECTION
const TangerCenterSection = ({ setView, lang }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeImage, setActiveImage] = useState(0);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const [activeCenter, setActiveCenter] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % TANGER_CENTERS[activeCenter].images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeCenter]);

  const currentCenter = TANGER_CENTERS[activeCenter];

  return (
    <section id="centres" className="py-20 md:py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
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
            {T[lang].centers.badge}
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] mb-4">
            <span className="text-[#f4e222]">{T[lang].centers.title}</span> <span className="text-[#5e2b79]">{T[lang].centers.highlight}</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto">
            {T[lang].centers.sub}
          </p>
        </motion.div>

        {/* Center Selector Tabs */}
        <motion.div 
          className="flex justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {TANGER_CENTERS.map((center, i) => (
            <button
              key={center.id}
              onClick={() => {
                setActiveCenter(i);
                setActiveImage(0);
              }}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeCenter === i 
                  ? 'bg-[#5e2b79] text-white shadow-lg shadow-[#5e2b79]/30' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <span className="hidden md:inline">{center.nameFr}</span>
              <span className="md:hidden">{center.city}</span>
            </button>
          ))}
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(100px,auto)]">
          
          {/* Main Image Card - Large */}
          <motion.div 
            className="col-span-12 lg:col-span-7 row-span-3 relative rounded-3xl overflow-hidden group cursor-pointer min-h-[400px] md:min-h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            key={`image-${activeCenter}`}
          >
            {/* Image Carousel */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeCenter}-${activeImage}`}
                src={currentCenter.images[activeImage]}
                alt={currentCenter.nameFr}
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
              {/* Rating Badge */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-[#f4e222] text-black text-xs font-bold rounded-full flex items-center gap-1">
                  ⭐ {currentCenter.rating}
                  <span className="text-black/60">({currentCenter.reviews})</span>
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full">
                  {currentCenter.type}
                </span>
                {currentCenter.isPrimary && (
                  <span className="px-3 py-1 bg-[#5e2b79] text-white text-xs font-bold rounded-full">
                    {T[lang].centers.primary}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl md:text-3xl font-black text-white mb-1" dir="rtl">
                {currentCenter.name}
              </h3>
              <h4 className="text-lg md:text-2xl font-bold text-white/80 mb-3">
                {currentCenter.nameFr}
              </h4>
              <p className="text-white/70 text-sm md:text-base max-w-md hidden md:block">
                {lang === 'ar' ? currentCenter.descriptionAr : currentCenter.description}
              </p>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {currentCenter.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImage === i ? 'w-6 bg-[#f4e222]' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Creation Year Badge */}
            <div className="absolute top-6 right-6 bg-[#5e2b79] text-white px-4 py-2 rounded-xl">
              <div className="text-xl font-black">{T[lang].centers.since || 'Depuis'}</div>
              <div className="text-xl font-black">{currentCenter.creationYear}</div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="col-span-6 lg:col-span-2-5 bg-[#F4F4F0] rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <span className="text-3xl md:text-4xl font-black text-[#5e2b79] mb-1">10,000+</span>
            <span className="text-xs md:text-sm font-bold text-neutral-500 uppercase tracking-wider">{T[lang].stats.beneficiaries}</span>
          </motion.div>

          <motion.div
            className="col-span-6 lg:col-span-2-5 bg-[#1A1A1A] rounded-2xl p-4 md:p-6 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <span className="text-3xl md:text-4xl font-black text-[#f4e222] mb-1">350+</span>
            <span className="text-xs md:text-sm font-bold text-neutral-400 uppercase tracking-wider">{T[lang].stats.youth}</span>
          </motion.div>

          {/* Location Card */}
          <motion.div
            className="col-span-12 lg:col-span-5 bg-[#1A1A1A] rounded-2xl p-5 md:p-6 flex items-center gap-4 group cursor-pointer overflow-hidden relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => window.open(currentCenter.mapLink, '_blank')}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }} />
            </div>
            
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#5e2b79] rounded-2xl flex items-center justify-center text-2xl shrink-0 relative z-10">
              📍
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <h4 className="text-white font-bold text-base md:text-lg mb-1">{T[lang].centers.address}</h4>
              <p className="text-white/60 text-sm truncate">{currentCenter.address}</p>
            </div>
            <motion.div 
              className="text-[#f4e222] text-2xl relative z-10 shrink-0"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>

          {/* Phone & Hours Card */}
          <motion.div
            className="col-span-6 lg:col-span-2-5 bg-gradient-to-br from-[#5e2b79] to-[#8f4699] rounded-2xl p-4 md:p-5 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <div className="text-2xl mb-2">📞</div>
              <div className="font-bold text-sm md:text-base">{currentCenter.phone}</div>
              <div className="text-xs text-white/60 mt-1">Appelez-nous</div>
            </div>
          </motion.div>

          <motion.div
            className="col-span-6 lg:col-span-2-5 bg-[#F4F4F0] rounded-2xl p-4 md:p-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-2xl mb-2">🕐</div>
            <div className="font-bold text-sm text-[#1A1A1A]">{currentCenter.hours}</div>
            <div className="text-xs text-neutral-500 mt-1">{currentCenter.openTime}</div>
          </motion.div>

          {/* Activities Section - Full Width */}
          <motion.div
            className="col-span-12 bg-[#F4F4F0] rounded-3xl p-6 md:p-8 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#1A1A1A]">{T[lang].centers.workshops}</h3>
                <p className="text-neutral-500 text-sm">Découvrez nos 8 disciplines artistiques et éducatives</p>
              </div>
              <span className="text-sm text-[#5e2b79] font-bold bg-[#5e2b79]/10 px-4 py-2 rounded-full self-start">
                8 disciplines
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {TANGER_DATA.activities.map((activity, i) => (
                <motion.div
                  key={i}
                  className={`relative p-4 md:p-5 rounded-2xl cursor-pointer transition-all overflow-hidden ${
                    hoveredActivity === i ? 'bg-[#5e2b79] text-white shadow-lg shadow-[#5e2b79]/20' : 'bg-white hover:bg-neutral-50'
                  }`}
                  onMouseEnter={() => setHoveredActivity(i)}
                  onMouseLeave={() => setHoveredActivity(null)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-3xl mb-3 block">{activity.icon}</span>
                  <h4 className="font-bold text-sm md:text-base mb-1">{lang === 'ar' ? activity.nameAr : activity.name}</h4>
                  <motion.p 
                    className={`text-xs ${hoveredActivity === i ? 'text-white/80' : 'text-neutral-500'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredActivity === i ? 1 : 0,
                      height: hoveredActivity === i ? 'auto' : 0
                    }}
                  >
                    {lang === 'ar' ? activity.descAr : activity.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Second Center Quick Card */}
          <motion.div
            className="col-span-12 md:col-span-6 bg-[#f4e222] rounded-2xl p-6 relative overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            onClick={() => setActiveCenter(activeCenter === 0 ? 1 : 0)}
            whileHover={{ scale: 0.99 }}
          >
            <div className="absolute -bottom-4 -right-4 text-8xl opacity-20">★</div>
            <div className="relative z-10">
              <span className="text-xs font-bold bg-black/10 px-3 py-1 rounded-full">
                {activeCenter === 0 ? (lang === 'ar' ? 'عرض المركز الآخر' : 'Voir l\'autre centre') : (lang === 'ar' ? 'عرض المركز الرئيسي' : 'Voir le centre principal')}
              </span>
              <h4 className="font-bold text-xl mt-4 text-[#1A1A1A]">
                {activeCenter === 0 ? TANGER_CENTERS[1].nameFr : TANGER_CENTERS[0].nameFr}
              </h4>
              <p className="text-sm text-black/60 mt-1">
                {activeCenter === 0 ? TANGER_CENTERS[1].address : TANGER_CENTERS[0].address}
              </p>
              <div className="flex items-center gap-2 mt-3 font-bold text-sm group-hover:gap-4 transition-all">
                <span>{lang === 'ar' ? 'اكتشف' : 'Découvrir'}</span>
                <span>→</span>
              </div>
            </div>
          </motion.div>

          {/* Features Card */}
          <motion.div
            className="col-span-12 md:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <h4 className="font-bold text-lg text-[#1A1A1A] mb-4">Nos Équipements</h4>
            <div className="flex flex-wrap gap-2">
              {(lang === 'ar' ? TANGER_DATA.featuresAr : TANGER_DATA.features).map((feature, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-2 bg-[#5e2b79]/10 rounded-full text-sm font-bold text-[#5e2b79] hover:bg-[#5e2b79] hover:text-white transition-colors cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
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
            <span>{lang === 'ar' ? 'زوروا مراكزنا' : 'Visitez nos centres'}</span>
            <span className="text-xl">→</span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
};

const GetInvolved = ({ setView, lang }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section id="agir" className="py-24 bg-[#F4F4F0] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="relative bg-[#1A1A1A] rounded-[3rem] p-8 md:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-10 right-10 w-32 h-32 bg-[#5e2b79] rounded-full opacity-20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-40 h-40 bg-[#f4e222] rounded-full opacity-20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.span 
              className="inline-block px-4 py-2 bg-[#5e2b79] rounded-full text-white font-bold text-sm uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {T[lang].involved.badge}
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-black mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {T[lang].involved.title} <span className="text-[#f4e222]">{T[lang].involved.highlight}</span>
            </motion.h2>
            
            <motion.p 
              className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              {T[lang].involved.sub}
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="flex justify-center gap-8 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#f4e222]">10,000+</div>
                <div className="text-sm text-neutral-500">{T[lang].stats.beneficiaries}</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#5e2b79]">350+</div>
                <div className="text-sm text-neutral-500">{T[lang].stats.youth}</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <MagneticButton 
                onClick={() => setView('contact')} 
                className="px-8 py-4 rounded-full font-bold transition-all bg-white text-[#1A1A1A] shadow-lg hover:scale-105 hover:shadow-xl"
              >
                {T[lang].involved.volunteer}
              </MagneticButton>
              <MagneticButton 
                onClick={() => setView('contact')} 
                className="px-8 py-4 rounded-full font-bold transition-all bg-[#5e2b79] text-white shadow-lg hover:scale-105 hover:shadow-xl"
              >
                {T[lang].involved.donate}
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => (
  <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-black mb-2">Les Étoiles du Détroit</h2>
          <h3 className="text-lg text-neutral-400 mb-6">Centre Culturel - Tanger</h3>
          
          {/* Stats in Footer */}
          <div className="flex gap-6 mb-6">
            <div>
              <div className="text-2xl font-black text-[#f4e222]">10,000+</div>
              <div className="text-xs text-neutral-500 uppercase">{T[lang].stats.beneficiaries}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#5e2b79]">350+</div>
              <div className="text-xs text-neutral-500 uppercase">{T[lang].stats.youth}</div>
            </div>
          </div>

          <p className="text-neutral-400 mb-6 max-w-md">{T[lang].footer.newsletter}</p>
          <div className="flex gap-4">
            <input type="email" placeholder="Votre email" className="bg-white/10 border border-white/10 rounded-xl px-6 py-4 w-full md:w-80 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#5e2b79] focus:border-transparent outline-none transition-all" />
            <button className="bg-[#5e2b79] px-6 py-4 rounded-xl font-bold hover:bg-white hover:text-[#5e2b79] transition-colors whitespace-nowrap">{T[lang].footer.subscribe}</button>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-sm">{T[lang].footer.ourCenters}</h4>
          <ul className="space-y-4 text-neutral-400">
            {TANGER_CENTERS.map((center, i) => (
              <li key={i}>
                <div className="font-bold text-white text-sm">{center.city}</div>
                <div className="text-xs">{center.address}</div>
                <div className="text-[#f4e222] text-sm">{center.phone}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-sm">{T[lang].footer.hoursTitle}</h4>
          <div className="space-y-2 text-neutral-400 text-sm">
            <div className="flex justify-between"><span>{T[lang].footer.hoursDetail}</span><span className="text-white">10:00 - 20:00</span></div>
            <div className="flex justify-between"><span>{T[lang].footer.monday}</span><span className="text-[#f4e222]">{T[lang].footer.closed}</span></div>
          </div>

          <h4 className="font-bold text-white mt-8 mb-4 uppercase text-sm">{T[lang].footer.follow}</h4>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/lesetoilesmaroc/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5e2b79] transition-colors">
              <span>📷</span>
            </a>
            <a href="https://www.facebook.com/p/Centre-culturel-Les-Etoiles-du-D%C3%A9troit-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%AB%D9%82%D8%A7%D9%81%D9%8A-%D9%86%D8%AC%D9%88%D9%85-%D8%A7%D9%84%D8%A8%D9%88%D8%BA%D8%A7%D8%B2-100037288646441/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#5e2b79] transition-colors">
              <span>▶️</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>{T[lang].footer.rights}</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#5e2b79] transition-colors">{T[lang].footer.legal}</a>
          <a href="#" className="hover:text-[#5e2b79] transition-colors">{T[lang].footer.privacy}</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- 4. ADDITIONAL PAGES ---

const ProjectsPage = ({ setView, lang }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="bg-[#F4F4F0] min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-4 hover:underline inline-flex items-center gap-2">
            <span>←</span> {T[lang].projectsPage.back.replace('← ', '')}
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-6">{T[lang].projectsPage.title}</h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            {T[lang].projectsPage.sub}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="bg-white rounded-2xl px-8 py-4 shadow-sm">
              <div className="text-3xl font-black text-[#5e2b79]">10,000+</div>
              <div className="text-sm text-neutral-500">{T[lang].stats.beneficiaries}</div>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl px-8 py-4">
              <div className="text-3xl font-black text-[#f4e222]">350+</div>
              <div className="text-sm text-neutral-400">{T[lang].stats.youth}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOWS.map((show, i) => (
            <motion.div 
              key={show.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all bg-white"
              onMouseEnter={() => setHoveredId(show.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <motion.img 
                  src={show.image} 
                  alt={show.title} 
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredId === show.id ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex justify-between items-end mb-3">
                  <span className="bg-[#5e2b79] text-xs font-bold px-3 py-1.5 rounded-full text-white">{lang === 'ar' ? show.categoryAr : show.category}</span>
                  <span className="text-sm font-mono opacity-70">{show.year}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 leading-tight">{lang === 'ar' ? show.titleAr : show.title}</h3>
                <motion.p 
                  className="text-sm text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredId === show.id ? 1 : 0,
                    y: hoveredId === show.id ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {lang === 'ar' ? show.descAr : show.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Activities Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-black text-[#1A1A1A] mb-8 text-center">{T[lang].projectsPage.upcoming}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_ACTIVITIES.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-48">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {activity.isNew && (
                      <span className="px-2 py-1 bg-[#f4e222] text-black text-xs font-bold rounded-full">NEW</span>
                    )}
                    <span className="px-2 py-1 bg-white/90 text-neutral-700 text-xs font-bold rounded-full">{lang === 'ar' ? activity.categoryAr : activity.category}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{lang === 'ar' ? activity.titleAr : activity.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-neutral-500 text-sm mb-4">{lang === 'ar' ? activity.descriptionAr : activity.description}</p>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                    <span>📅</span> {lang === 'ar' ? activity.dateAr : activity.date} • {activity.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                    <span>📍</span> {activity.location}
                  </div>
                  <button 
                    onClick={() => setView('contact')}
                    className="w-full py-3 bg-[#5e2b79] text-white font-bold rounded-xl hover:bg-[#1A1A1A] transition-colors"
                  >
                    {T[lang].projectsPage.register}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CentersPage = ({ setView, lang }) => {
  const [activeCenter, setActiveCenter] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="bg-white min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-6">
        <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-8 hover:underline inline-flex items-center gap-2">
          <span>←</span> {T[lang].centersPage.back.replace('← ', '')}
        </button>
        
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-4">{T[lang].centersPage.title}</h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            {T[lang].centersPage.sub}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-black text-[#5e2b79]">10,000+</div>
              <div className="text-sm text-neutral-500">{T[lang].stats.beneficiaries} depuis 2017</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#f4e222]">350+</div>
              <div className="text-sm text-neutral-500">{T[lang].stats.youth}</div>
            </div>
          </div>
        </div>

        {/* Center Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {TANGER_CENTERS.map((center, i) => (
            <button
              key={center.id}
              onClick={() => setActiveCenter(i)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeCenter === i 
                  ? 'bg-[#5e2b79] text-white shadow-lg' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {center.city}
            </button>
          ))}
        </div>

        {/* Selected Center */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCenter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#F4F4F0] rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <img 
                  src={TANGER_CENTERS[activeCenter].images[0]} 
                  alt={TANGER_CENTERS[activeCenter].nameFr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#5e2b79] text-white px-4 py-2 rounded-xl">
                  <div className="text-xs opacity-80">Depuis</div>
                  <div className="text-xl font-black">{TANGER_CENTERS[activeCenter].creationYear}</div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#f4e222] text-black text-sm font-bold rounded-full flex items-center gap-1">
                    ⭐ {TANGER_CENTERS[activeCenter].rating} ({TANGER_CENTERS[activeCenter].reviews} avis)
                  </span>
                  {TANGER_CENTERS[activeCenter].isPrimary && (
                    <span className="px-3 py-1 bg-[#5e2b79] text-white text-sm font-bold rounded-full">
                      {T[lang].centersPage.primary}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-black text-[#1A1A1A] mb-2" dir="rtl">
                  {TANGER_CENTERS[activeCenter].name}
                </h2>
                <h3 className="text-2xl font-bold text-neutral-600 mb-4">
                  {TANGER_CENTERS[activeCenter].nameFr}
                </h3>
                <p className="text-neutral-500 text-lg mb-6">
                  {lang === 'ar' ? TANGER_CENTERS[activeCenter].descriptionAr : TANGER_CENTERS[activeCenter].description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                    <span className="text-2xl">📍</span>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">{T[lang].centersPage.address}</div>
                      <div className="text-neutral-500">{TANGER_CENTERS[activeCenter].address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                    <span className="text-2xl">📞</span>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">{T[lang].centersPage.phone}</div>
                      <div className="text-[#5e2b79] font-bold">{TANGER_CENTERS[activeCenter].phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">{T[lang].centersPage.hours}</div>
                      <div className="text-neutral-500">{TANGER_CENTERS[activeCenter].openTime}</div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => window.open(TANGER_CENTERS[activeCenter].mapLink, '_blank')}
                  className="w-full py-4 bg-[#1A1A1A] text-white font-bold rounded-xl hover:bg-[#5e2b79] transition-colors flex items-center justify-center gap-2"
                >
                  <span>{T[lang].centersPage.map}</span>
                </button>
              </div>
            </div>

            {/* Activities */}
            <div className="mt-12">
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-6">{T[lang].centersPage.workshops}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TANGER_DATA.activities.map((activity, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl text-center hover:shadow-lg transition-all">
                    <span className="text-3xl mb-3 block">{activity.icon}</span>
                    <h4 className="font-bold text-[#1A1A1A]">{lang === 'ar' ? activity.nameAr : activity.name}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{lang === 'ar' ? activity.descAr : activity.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ContactPage = ({ setView, lang }) => {
  const [selectedCenter, setSelectedCenter] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="bg-[#1A1A1A] text-white min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-6">
        <button onClick={() => setView('home')} className="text-[#5e2b79] font-bold mb-8 hover:underline inline-flex items-center gap-2">
          <span>←</span> {T[lang].contactPage.back.replace('← ', '')}
        </button>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-black mb-4">{T[lang].contactPage.title}</h1>
            <p className="text-xl text-neutral-400 mb-8">
              {T[lang].contactPage.sub} <span className="text-[#f4e222] font-bold">10,000 {T[lang].stats.beneficiaries}</span> {T[lang].contactPage.and} <span className="text-[#5e2b79] font-bold">350+ {T[lang].stats.youth}</span>.
            </p>

            {/* Center Selector */}
            <div className="flex gap-3 mb-8">
              {TANGER_CENTERS.map((center, i) => (
                <button
                  key={center.id}
                  onClick={() => setSelectedCenter(i)}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                    selectedCenter === i 
                      ? 'bg-[#5e2b79] text-white' 
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {center.city}
                </button>
              ))}
            </div>

            {/* Selected Center Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCenter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h3 className="font-bold text-lg text-[#f4e222] mb-1" dir="rtl">
                    {TANGER_CENTERS[selectedCenter].name}
                  </h3>
                  <h4 className="text-white/80 mb-4">{TANGER_CENTERS[selectedCenter].nameFr}</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-[#5e2b79]/20 rounded-xl flex items-center justify-center text-[#5e2b79]">📍</div>
                      <div>
                        <h5 className="font-bold text-sm mb-1">{T[lang].centersPage.address}</h5>
                        <p className="text-gray-400 text-sm">{TANGER_CENTERS[selectedCenter].address}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-[#5e2b79]/20 rounded-xl flex items-center justify-center text-[#5e2b79]">📱</div>
                      <div>
                        <h5 className="font-bold text-sm mb-1">{T[lang].centersPage.phone}</h5>
                        <p className="text-[#f4e222] font-bold">{TANGER_CENTERS[selectedCenter].phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-[#5e2b79]/20 rounded-xl flex items-center justify-center text-[#5e2b79]">✉️</div>
                      <div>
                        <h5 className="font-bold text-sm mb-1">{T[lang].contactPage.emailLabel}</h5>
                        <p className="text-gray-400">{TANGER_CENTERS[selectedCenter].email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-lg mb-4">{T[lang].contactPage.hoursTitle}</h4>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex justify-between"><span>{T[lang].footer.hoursDetail}</span><span className="text-white">10:00 - 20:00</span></div>
                    <div className="flex justify-between"><span>{T[lang].footer.monday}</span><span className="text-[#f4e222]">{T[lang].footer.closed}</span></div>
                  </div>
                </div>

                <button 
                  onClick={() => window.open(TANGER_CENTERS[selectedCenter].mapLink, '_blank')}
                  className="w-full py-4 bg-[#5e2b79] text-white font-bold rounded-xl hover:bg-[#f4e222] hover:text-black transition-colors"
                >
                  {T[lang].centersPage.map}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">{T[lang].contactPage.name}</label>
                  <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">{T[lang].contactPage.firstname}</label>
                  <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all" placeholder="Votre prénom" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">{T[lang].contactPage.emailLabel}</label>
                <input type="email" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">{T[lang].contactPage.center}</label>
                <select 
                  className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none text-white"
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(Number(e.target.value))}
                >
                  {TANGER_CENTERS.map((center, i) => (
                    <option key={center.id} value={i} className="bg-[#1A1A1A]">{center.nameFr}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">{T[lang].contactPage.subject}</label>
                <select className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none text-white">
                  <option value="" className="bg-[#1A1A1A]">{T[lang].contactPage.subjectPh}</option>
                  <option value="inscription" className="bg-[#1A1A1A]">{lang === 'ar' ? 'التسجيل في الورشات' : 'Inscription aux ateliers'}</option>
                  <option value="benevole" className="bg-[#1A1A1A]">{lang === 'ar' ? 'التطوع' : 'Devenir bénévole'}</option>
                  <option value="partenaire" className="bg-[#1A1A1A]">{lang === 'ar' ? 'الشراكة' : 'Devenir partenaire'}</option>
                  <option value="don" className="bg-[#1A1A1A]">{lang === 'ar' ? 'التبرع' : 'Faire un don'}</option>
                  <option value="info" className="bg-[#1A1A1A]">{lang === 'ar' ? 'طلب معلومات' : "Demande d'information"}</option>
                  <option value="autre" className="bg-[#1A1A1A]">{lang === 'ar' ? 'أخرى' : 'Autre'}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">{T[lang].contactPage.message}</label>
                <textarea rows="5" className="w-full bg-white/10 border border-white/10 rounded-xl p-4 focus:border-[#5e2b79] focus:outline-none focus:ring-2 focus:ring-[#5e2b79]/20 transition-all resize-none" placeholder={T[lang].contactPage.messagePh}></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-[#5e2b79] to-[#8f4699] text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#5e2b79]/30 transition-all transform hover:scale-[1.02]">
                {T[lang].contactPage.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 4b. KHARIJ AL-ASWAR PAGE ---

const KHARIJ_SCHOOLS = [
  {
    id: 1,
    fr: {
      title: "Groupe scolaire Al-Zinaat – annexe Al-Kharb",
      subtitle: "Commune de Sebt Al-Zinaat",
      desc: "Dans le cadre du programme Hors les murs, l'annexe Al-Kharb, rattachée au groupe scolaire Al-Zinaat, a accueilli une journée éducative et artistique complète alliant ateliers de théâtre, de cinéma et de dessin. Ces activités ont offert aux élèves une précieuse occasion de découvrir leurs talents et de développer leur capacité d'expression et de créativité, dans une atmosphère interactive empreinte d'enthousiasme et de participation.",
    },
    ar: {
      title: "مجموعة مدارس الزينات – فرعية الخرب",
      subtitle: "جماعة السبت الزينات",
      desc: "في إطار برنامج Hors les murs، تمت زيارة فرعية الخرب التابعة لمجموعة مدارس الزينات، حيث استفاد التلاميذ من يوم تربوي وفني متكامل جمع بين ورشات المسرح والسينما والرسم. وقد شكلت هذه الأنشطة فرصة لاكتشاف مواهب الأطفال وتعزيز قدراتهم على التعبير والإبداع، في أجواء تفاعلية مفعمة بالحماس والمشاركة.",
    },
    images: [
      "/ne page/IMG_2755.png",
      "/ne page/IMG_2822.png",
      "/ne page/IMG_2985.png",
    ],
  },
  {
    id: 2,
    fr: {
      title: "Groupe scolaire Al-Breidiya",
      subtitle: "Douar Al-Braydiya – Commune d'Ahd Al-Gharbiya",
      desc: "Le programme Hors les murs s'est rendu au groupe scolaire Al-Breidiya, apportant avec lui un ensemble d'activités culturelles et artistiques couvrant le théâtre, le cinéma et le dessin. Cette initiative a contribué à ouvrir de nouveaux horizons aux élèves, en les encourageant à apprendre par la créativité, tout en créant un espace d'expression libre et en développant leur sens artistique et culturel.",
    },
    ar: {
      title: "مجموعة مدارس البريدية",
      subtitle: "دوار البرايدية – جماعة أحد الغربية",
      desc: "حل برنامج Hors les murs بمجموعة مدارس البريدية، حاملاً معه مجموعة من الأنشطة الثقافية والفنية التي شملت المسرح والسينما والرسم. وقد ساهمت هذه المبادرة في فتح آفاق جديدة أمام التلاميذ، وتشجيعهم على التعلم من خلال الإبداع، مع خلق فضاء للتعبير الحر وتنمية الحس الفني والثقافي لديهم.",
    },
    images: [
      "/ne page/IMG_3234.png",
      "/ne page/IMG_3353.png",
    ],
  },
  {
    id: 3,
    fr: {
      title: "Groupe scolaire Hjar Al-Nahl – annexe Skadla",
      subtitle: "Douar Skadla",
      desc: "L'annexe de Skadla, rattachée au groupe scolaire Hjar Al-Nahl, a accueilli les activités du programme Hors les murs, au cours desquelles les élèves ont participé à des ateliers variés de théâtre, de cinéma et de dessin. Cette étape a été marquée par une grande interactivité de la part des enfants, qui ont fait preuve d'un esprit d'innovation et d'une réelle envie d'apprendre, faisant de cette visite une expérience culturelle et éducative remarquable, laissant une empreinte positive dans leurs cœurs.",
    },
    ar: {
      title: "مجموعة مدارس حجرة النحل – فرعية سكدلة",
      subtitle: "دوار سكدلة",
      desc: "استضافت فرعية سكدلة التابعة لمجموعة مدارس حجرة النحل أنشطة برنامج Hors les murs، حيث شارك التلاميذ في ورشات متنوعة للمسرح والسينما والرسم. وعرفت هذه المحطة تفاعلاً كبيراً من طرف الأطفال الذين أبانوا عن روح الابتكار والرغبة في التعلم، مما جعل من الزيارة تجربة ثقافية وتربوية مميزة تركت أثراً إيجابياً في نفوسهم.",
    },
    images: [
      "/ne page/IMG_3368.png",
      "/ne page/IMG_3452.png",
      "/ne page/IMG_3521.png",
    ],
  },
];

const SchoolCard = ({ school, index, lang }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeImg, setActiveImg] = useState(0);
  const isEven = index % 2 === 0;
  const content = lang === 'ar' ? school.ar : school.fr;
  const isAr = lang === 'ar';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-20 md:mb-28"
    >
      <div className={`flex flex-col ${ isEven ? 'lg:flex-row' : 'lg:flex-row-reverse' } gap-10 lg:gap-16 items-center`}>
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[320px] md:h-[420px] bg-neutral-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={school.images[activeImg]}
                alt={content.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {activeImg + 1} / {school.images.length}
            </div>
            {school.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {school.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeImg ? 'bg-[#f4e222] scale-125' : 'bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          {school.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {school.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 rounded-xl overflow-hidden h-20 transition-all duration-300 ${
                    i === activeImg ? 'ring-2 ring-[#5e2b79] ring-offset-2' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className={`w-full lg:w-1/2`} dir={isAr ? 'rtl' : 'ltr'}>
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5e2b79]/10 rounded-full text-[#5e2b79] font-bold text-sm mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-[#5e2b79] rounded-full" />
            {content.subtitle}
          </motion.span>
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1A1A1A] mb-5 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
          >
            {content.title}
          </motion.h2>
          <motion.p
            className="text-neutral-600 text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {content.desc.split('Hors les murs').map((part, i, arr) =>
              i < arr.length - 1 ? (
                <React.Fragment key={i}>
                  {part}<span className="font-bold text-[#5e2b79]">Hors les murs</span>
                </React.Fragment>
              ) : part
            )}
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            {(isAr
              ? ['المسرح', 'السينما', 'الرسم']
              : ['Théâtre', 'Cinéma', 'Dessin']
            ).map((tag) => (
              <span key={tag} className="px-4 py-2 bg-[#f4e222]/20 text-[#1A1A1A] font-bold text-sm rounded-full border border-[#f4e222]/40">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const KharijAlAswarPage = ({ setView, lang }) => {
  const isAr = lang === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F4F4F0] min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-6">
        {/* Top bar: back */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => setView('home')}
            className="text-[#5e2b79] font-bold hover:underline inline-flex items-center gap-2"
          >
            <span>←</span> {isAr ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}
          </button>
        </div>

        {/* Page Hero */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-20"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5e2b79] text-white rounded-full font-bold text-sm uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 bg-[#f4e222] rounded-full animate-pulse" />
              Programme Hors les murs
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] mb-6 leading-tight">
              {isAr ? (
                <>مدارس في قلب <span className="text-[#5e2b79]">الإبداع</span></>
              ) : (
                <>Des écoles au cœur de la <span className="text-[#5e2b79]">créativité</span></>
              )}
            </h1>
            <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto">
              {isAr
                ? <>في إطار برنامج <strong className="text-[#1A1A1A]">Hors les murs</strong>، حملنا الفن والثقافة إلى المدارس القروية، لنمنح أطفالها تجربة إبداعية لا تُنسى.</>
                : <>Dans le cadre du programme <strong className="text-[#1A1A1A]">Hors les murs</strong>, nous avons porté l'art et la culture dans les écoles rurales, offrant à leurs enfants une expérience créative inoubliable.</>
              }
            </p>
            <div className="flex justify-center gap-6 mt-10">
              <div className="bg-white rounded-2xl px-8 py-4 shadow-sm text-center">
                <div className="text-3xl font-black text-[#5e2b79]">12</div>
                <div className="text-sm text-neutral-500 font-bold">{isAr ? 'مدارس' : 'Écoles'}</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-2xl px-8 py-4 text-center">
                <div className="text-3xl font-black text-[#f4e222]">3</div>
                <div className="text-sm text-neutral-400 font-bold">{isAr ? 'ورشات' : 'Ateliers'}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-neutral-300" />
          <span className="text-[#5e2b79] font-bold text-sm uppercase tracking-widest">
            {isAr ? 'المحطات' : 'Les étapes'}
          </span>
          <div className="flex-1 h-px bg-neutral-300" />
        </div>

        {/* School Sections */}
        {KHARIJ_SCHOOLS.map((school, i) => (
          <SchoolCard key={school.id} school={school} index={i} lang={lang} />
        ))}
      </div>
    </motion.div>
  );
};

// --- 5. MAIN APP COMPONENT ---

const App = () => {
  const [view, setView] = useState('home');
  const [lang, setLang] = useState('fr');
  const [cursorImage, setCursorImage] = useState(null);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="bg-white min-h-screen text-[#1A1A1A] font-sans selection:bg-[#f4e222] selection:text-black" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Cursor activeImage={cursorImage} />
      <Navbar currentView={view} setView={setView} lang={lang} setLang={setLang} />
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <Hero setView={setView} lang={lang} />
            <KeyNumbers lang={lang} />
            <UpcomingActivities setView={setView} lang={lang} />
            <MajorProjects setView={setView} lang={lang} />
            <TangerCenterSection setView={setView} lang={lang} />
            <GetInvolved setView={setView} lang={lang} />
          </motion.main>
        )}

        {view === 'projects' && (
          <ProjectsPage key="projects" setView={setView} lang={lang} />
        )}

        {view === 'centers' && (
          <CentersPage key="centers" setView={setView} lang={lang} />
        )}

        {view === 'contact' && (
          <ContactPage key="contact" setView={setView} lang={lang} />
        )}

        {view === 'kharij' && (
          <KharijAlAswarPage key="kharij" setView={setView} lang={lang} />
        )}
      </AnimatePresence>

      <Footer lang={lang} />

      {/* Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (pointer: coarse) {
          .cursor-none {
            cursor: auto;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
