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
    credit: 'Réalisé par <a href="https://2toml.github.io/TL_Final/" target="_blank" rel="noopener" id="site-credit-link"><span>Tom Lamers</span></a> - 2025',
    about: {
      name: 'Tiffany Nauts',
      p1: 'Psychologue clinicienne, spécialisée en thérapie pour adolescents et adultes. Passionnée par l’accompagnement humain, je vous accueille dans un cadre bienveillant et confidentiel.',
      p2: 'Mon approche est personnalisée, intégrant différentes méthodes pour répondre au mieux à vos besoins.'
    },
    cards: [
      { title: 'Qui', desc: 'Pour qui? Séances individuelles pour adolescents et adultes.' },
      { title: 'Quoi', desc: 'Pourquoi consulter? Pour toute difficulté émotionnelle ou mentale.' },
      { title: 'Comment', desc: 'Comment ça se passe? Une première rencontre suivie d’un suivi adapté.' }
    ],
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
      faq: "Foire aux questions (FAQ)",
      contact: "Contact",
      langue: "Changer la langue",
      facebook: "Facebook",
      instagram: "Instagram",
      mail: "Mail"
    }
  },
  nl: {
    credit: 'Gemaakt door <a href="https://2toml.github.io/TL_Final/" target="_blank" rel="noopener" id="site-credit-link"><span>Tom Lamers</span></a> - 2025',
    about: {
      name: 'Tiffany Nauts',
      p1: 'Klinisch psycholoog, gespecialiseerd in therapie voor adolescenten en volwassenen. Met passie voor begeleiding ontvang ik je in een warme en vertrouwelijke setting.',
      p2: 'Mijn aanpak is persoonlijk en combineert verschillende methodes om zo goed mogelijk aan jouw noden te beantwoorden.'
    },
    cards: [
      { title: 'Wie', desc: 'Voor wie? Individuele sessies voor adolescenten en volwassenen.' },
      { title: 'Wat', desc: 'Waarom consulteren? Voor elke emotionele of mentale moeilijkheid.' },
      { title: 'Hoe', desc: 'Hoe verloopt het? Een eerste gesprek gevolgd door een aangepast traject.' }
    ],
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
      faq: "Veelgestelde vragen (FAQ)",
      contact: "Contact",
      langue: "Taal wijzigen",
      facebook: "Facebook",
      instagram: "Instagram",
      mail: "Mail"
    }
  },
  en: {
    credit: 'Made by <a href="https://2toml.github.io/TL_Final/" target="_blank" rel="noopener" id="site-credit-link"><span>Tom Lamers</span></a> - 2025',
    about: {
      name: 'Tiffany Nauts',
      p1: 'Clinical psychologist, specialized in therapy for adolescents and adults. Passionate about human support, I welcome you in a caring and confidential environment.',
      p2: 'My approach is personalized, integrating different methods to best meet your needs.'
    },
    cards: [
      { title: 'Who', desc: 'For whom? Individual sessions for adolescents and adults.' },
      { title: 'What', desc: 'Why consult? For any emotional or mental difficulty.' },
      { title: 'How', desc: 'How does it work? A first meeting followed by a tailored follow-up.' }
    ],
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
      faq: "Frequently Asked Questions (FAQ)",
      contact: "Contact",
      langue: "Change language",
      facebook: "Facebook",
      instagram: "Instagram",
      mail: "Mail"
    }
  }
};

// Voeg card label vertalingen en tooltips toe
const cardIconLabels = {
  fr: ["Qui", "Quoi", "Comment"],
  nl: ["Wie", "Wat", "Hoe"],
  en: ["Who", "What", "How"]
};
const cardIconTooltips = {
  fr: ["Pour qui?", "Pourquoi consulter?", "Comment ça se passe?"],
  nl: ["Voor wie?", "Waarom consulteren?", "Hoe verloopt het?"],
  en: ["For whom?", "Why consult?", "How does it work?"]
};

function setLanguage(lang) {
  // Menu links
  document.querySelector('.menu-links a[href="#section1"]').textContent = translations[lang].accueil;
  document.querySelector('.menu-links a[href="#section1"]').title = translations[lang].tooltips.accueil;
  document.querySelector('.menu-links a[href="#section2"]').textContent = translations[lang].apropos;
  document.querySelector('.menu-links a[href="#section2"]').title = translations[lang].tooltips.apropos;
  document.querySelector('.menu-links a[href="#section3"]').textContent = translations[lang].therapie;
  document.querySelector('.menu-links a[href="#section3"]').title = translations[lang].tooltips.therapie;
  document.querySelector('.menu-links a[href="#section5"]').textContent = translations[lang].rdv;
  document.querySelector('.menu-links a[href="#section5"]').title = translations[lang].tooltips.rdv;
  // Zet altijd de eerste A van Articles/Artikels in een span voor BreakingRoad font, ongeacht wat ervoor staat
  const blogText = translations[lang].blog;
  let replaced = false;
  document.querySelector('.menu-links a[href="#section6"]').innerHTML = blogText.replace(/A([rticlesikls]*)/, function(match, p1) {
    replaced = true;
    return '<span class="menu-articles-a">A</span>' + p1;
  });
  if (!replaced) {
    document.querySelector('.menu-links a[href="#section6"]').textContent = blogText;
  }
  document.querySelector('.menu-links a[href="#section6"]').title = translations[lang].tooltips.blog;
  document.querySelector('.menu-links a[href="#section7"]').textContent = translations[lang].faq;
  document.querySelector('.menu-links a[href="#section7"]').setAttribute('title', translations[lang].tooltips.faq);
  document.querySelector('.menu-links a[href="#section8"]').textContent = translations[lang].contact;
  document.querySelector('.menu-links a[href="#section8"]').title = translations[lang].tooltips.contact;

  // Section titles
  document.querySelector('#section2 .section-title').textContent = translations[lang].apropos;
  document.querySelector('#section3 .section-title').textContent = translations[lang].therapie;
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

  // Card icon labels + tooltips
  const iconLabels = document.querySelectorAll('.card-icon-label');
  if (iconLabels.length === 3) {
    iconLabels[0].textContent = cardIconLabels[lang][0];
    iconLabels[1].textContent = cardIconLabels[lang][1];
    iconLabels[2].textContent = cardIconLabels[lang][2];
    iconLabels[0].title = cardIconTooltips[lang][0];
    iconLabels[1].title = cardIconTooltips[lang][1];
    iconLabels[2].title = cardIconTooltips[lang][2];
  }

  // Card titles and descriptions (aanbod)
  const cardEls = document.querySelectorAll('.card-element');
  if (cardEls.length === 3) {
    for (let i = 0; i < 3; i++) {
      const h2 = cardEls[i].querySelector('h2');
      const p = cardEls[i].querySelector('p');
      if (h2 && p) {
        h2.textContent = translations[lang].cards[i].title;
        p.textContent = translations[lang].cards[i].desc;
      }
    }
  }

  // About section vertaling
  const about = translations[lang].about;
  const aboutCard = document.querySelector('.about-card');
  if (aboutCard && about) {
    const h3 = aboutCard.querySelector('h3');
    const pEls = aboutCard.querySelectorAll('p');
    if (h3) h3.textContent = about.name;
    if (pEls.length >= 2) {
      pEls[0].textContent = about.p1;
      pEls[1].textContent = about.p2;
    }
  }

  // FAQ meevertaalt
  if (typeof renderFAQ === 'function') {
    renderFAQ(lang);
  }

  // Footer credit meertalig
  var creditEl = document.getElementById('site-credit-text');
  if (creditEl && translations[lang].credit) {
    creditEl.innerHTML = translations[lang].credit;
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
