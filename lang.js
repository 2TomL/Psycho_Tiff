// language switch FR/NL/EN
const langBtn = document.querySelector('.lang-select-btn');
const langPopup = document.getElementById('langPopup');
const langOptions = document.querySelectorAll('.lang-option');

// Show/hide popup
langBtn.addEventListener('click', function(e) {
  langPopup.classList.toggle('open');
  langBtn.classList.toggle('open', langPopup.classList.contains('open'));
});

document.addEventListener('click', function(e) {
  if (!langPopup.contains(e.target) && !langBtn.contains(e.target)) {
    langPopup.classList.remove('open');
    langBtn.classList.remove('open');
  }
});

// Language data (labels and tooltips)
const translations = {
  fr: {
    accueil: 'Accueil',
    apropos: 'À propos de moi',
    therapie: 'Thérapies & Services',
    infos: 'Infos pratiques',
    rdv: 'Prendre rendez-vous',
    blog: 'Blog & Articles',
    faq: 'FAQ',
    contact: 'Contact',
    langue: 'Langue',
    tooltips: {
      accueil: "Aller à l'accueil",
      apropos: "À propos de moi",
      therapie: "Voir les thérapies et services",
      infos: "Infos pratiques",
      rdv: "Prendre rendez-vous",
      blog: "Blog & Articles",
      faq: "FAQ",
      contact: "Contact",
      langue: "Changer la langue",
      facebook: "Facebook",
      instagram: "Instagram",
      mail: "Mail"
    }
  },
  nl: {
    accueil: 'Home',
    apropos: 'Over mij',
    therapie: 'Therapieën & Aanbod',
    infos: 'Praktische info',
    rdv: 'Afspraak maken',
    blog: 'Blog & Artikels',
    faq: 'FAQ',
    contact: 'Contact',
    langue: 'Taal',
    tooltips: {
      accueil: "Ga naar home",
      apropos: "Over mij",
      therapie: "Bekijk therapieën en aanbod",
      infos: "Praktische info",
      rdv: "Afspraak maken",
      blog: "Blog & Artikels",
      faq: "FAQ",
      contact: "Contact",
      langue: "Taal wijzigen",
      facebook: "Facebook",
      instagram: "Instagram",
      mail: "Mail"
    }
  },
  en: {
    accueil: 'Home',
    apropos: 'About me',
    therapie: 'Therapies & Services',
    infos: 'Practical info',
    rdv: 'Book appointment',
    blog: 'Blog & Articles',
    faq: 'FAQ',
    contact: 'Contact',
    langue: 'Language',
    tooltips: {
      accueil: "Go to home",
      apropos: "About me",
      therapie: "View therapies and services",
      infos: "Practical info",
      rdv: "Book appointment",
      blog: "Blog & Articles",
      faq: "FAQ",
      contact: "Contact",
      langue: "Change language",
      facebook: "Facebook",
      instagram: "Instagram",
      mail: "Mail"
    }
  }
};

function setLanguage(lang) {
  // Menu links
  document.querySelector('.menu-links a[href="#section1"]').textContent = translations[lang].accueil;
  document.querySelector('.menu-links a[href="#section1"]').title = translations[lang].tooltips.accueil;
  document.querySelector('.menu-links a[href="#section2"]').textContent = translations[lang].apropos;
  document.querySelector('.menu-links a[href="#section2"]').title = translations[lang].tooltips.apropos;
  document.querySelector('.menu-links a[href="#section3"]').textContent = translations[lang].therapie;
  document.querySelector('.menu-links a[href="#section3"]').title = translations[lang].tooltips.therapie;
  document.querySelector('.menu-links a[href="#section4"]').textContent = translations[lang].infos;
  document.querySelector('.menu-links a[href="#section4"]').title = translations[lang].tooltips.infos;
  document.querySelector('.menu-links a[href="#section5"]').textContent = translations[lang].rdv;
  document.querySelector('.menu-links a[href="#section5"]').title = translations[lang].tooltips.rdv;
  document.querySelector('.menu-links a[href="#section6"]').textContent = translations[lang].blog;
  document.querySelector('.menu-links a[href="#section6"]').title = translations[lang].tooltips.blog;
  document.querySelector('.menu-links a[href="#section7"]').textContent = translations[lang].faq;
  document.querySelector('.menu-links a[href="#section7"]').title = translations[lang].tooltips.faq;
  document.querySelector('.menu-links a[href="#section8"]').textContent = translations[lang].contact;
  document.querySelector('.menu-links a[href="#section8"]').title = translations[lang].tooltips.contact;

  // Section titles
  document.querySelector('#section2 .section-title').textContent = translations[lang].apropos;
  document.querySelector('#section3 .section-title').textContent = translations[lang].therapie;
  document.querySelector('#section4 .section-title').textContent = translations[lang].infos;
  document.querySelector('#section5 .section-title').textContent = translations[lang].rdv;
  document.querySelector('#section6 .section-title').textContent = translations[lang].blog;
  document.querySelector('#section7 .section-title').textContent = translations[lang].faq;
  document.querySelector('#section8 .section-title').textContent = translations[lang].contact;

  // Language button
  document.querySelector('.lang-select-btn span').textContent = translations[lang].langue;
  document.querySelector('.lang-select-btn').title = translations[lang].tooltips.langue;

  // Social icons
  const socialIcons = document.querySelectorAll('.social-icon');
  if (socialIcons.length >= 3) {
    socialIcons[0].title = translations[lang].tooltips.facebook;
    socialIcons[1].title = translations[lang].tooltips.instagram;
    socialIcons[2].title = translations[lang].tooltips.mail;
  }
}

langOptions.forEach(function(btn) {
  btn.addEventListener('click', function() {
    setLanguage(btn.getAttribute('data-lang'));
    langPopup.classList.remove('open');
    langBtn.classList.remove('open');
  });
});

// Default language
setLanguage('fr');
