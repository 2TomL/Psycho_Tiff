// Multilingual FAQ content for section 7
const faqData = {
  fr: [
    { q: "Combien de temps dure une séance ?", a: "Une séance dure généralement 45 à 60 minutes." },
    { q: "À quelle fréquence dois-je venir en consultation ?", a: "Cela dépend de votre situation et de vos besoins. Nous décidons ensemble du rythme qui vous convient le mieux." },
    { q: "Les séances sont-elles confidentielles ?", a: "Oui. Le secret professionnel est strictement respecté." },
    { q: "Quels sont les motifs de consultation les plus fréquents ?", a: "Anxiété, stress, dépression, burn-out, difficultés relationnelles, transitions de vie, soutien après un trauma…" },
    { q: "Est-ce que je dois avoir une ordonnance pour consulter ?", a: "Non, vous pouvez prendre rendez-vous directement, sans prescription médicale." },
    { q: "Quels sont les tarifs et les moyens de paiement ?", a: "Le paiement peut se faire en espèces ou via application bancaire. Le tarif est communiqué lors de la prise de rendez-vous." },
    { q: "Comment puis-je annuler un rendez-vous ?", a: "Merci d’annuler au moins 48h à l’avance. Tout rendez-vous non annulé dans ce délai sera facturé." },
    { q: "Est-ce que vous proposez des consultations en ligne ?", a: "Oui, les séances peuvent se faire en cabinet ou en visioconsultation selon votre préférence." }
  ],
  nl: [
    { q: "Hoelang duurt een sessie?", a: "Een sessie duurt meestal 45 tot 60 minuten." },
    { q: "Hoe vaak moet ik op consultatie komen?", a: "Dat hangt af van jouw situatie en behoeften. We bepalen samen het ritme dat het beste bij jou past." },
    { q: "Zijn de sessies vertrouwelijk?", a: "Ja. Het beroepsgeheim wordt strikt gerespecteerd." },
    { q: "Wat zijn de meest voorkomende redenen voor consultatie?", a: "Angst, stress, depressie, burn-out, relationele moeilijkheden, levensovergangen, ondersteuning na trauma…" },
    { q: "Heb ik een voorschrift nodig om te komen?", a: "Nee, je kan rechtstreeks een afspraak maken, zonder medisch voorschrift." },
    { q: "Wat zijn de tarieven en betaalmogelijkheden?", a: "Betalen kan cash of via een bankapp. Het tarief wordt meegedeeld bij het maken van de afspraak." },
    { q: "Hoe kan ik een afspraak annuleren?", a: "Annuleer minstens 48u op voorhand. Niet tijdig geannuleerde afspraken worden aangerekend." },
    { q: "Biedt u ook online consultaties aan?", a: "Ja, sessies kunnen in de praktijk of via videoconsultatie plaatsvinden, naargelang jouw voorkeur." }
  ],
  en: [
    { q: "How long does a session last?", a: "A session usually lasts 45 to 60 minutes." },
    { q: "How often should I come for a consultation?", a: "It depends on your situation and needs. We decide together on the frequency that suits you best." },
    { q: "Are the sessions confidential?", a: "Yes. Professional confidentiality is strictly respected." },
    { q: "What are the most common reasons for consultation?", a: "Anxiety, stress, depression, burn-out, relationship difficulties, life transitions, support after trauma…" },
    { q: "Do I need a prescription to consult?", a: "No, you can make an appointment directly, without a medical prescription." },
    { q: "What are the fees and payment methods?", a: "Payment can be made in cash or via banking app. The fee is communicated when making the appointment." },
    { q: "How can I cancel an appointment?", a: "Please cancel at least 48h in advance. Any appointment not cancelled in time will be charged." },
    { q: "Do you offer online consultations?", a: "Yes, sessions can take place in the office or via video consultation, according to your preference." }
  ]
};

function renderFAQ(lang) {
  const faqList = document.querySelector('#section7 ul.faq');
  if (!faqList) return;
  faqList.innerHTML = '';
  const liArr = [];
  faqData[lang].forEach((item, idx) => {
    const li = document.createElement('li');
    // Eerste letter apart in span
    const firstLetter = item.q.charAt(0);
    const rest = item.q.slice(1);
    li.innerHTML = `<strong><span class='faq-first-letter'>${firstLetter}</span>${rest}</strong><div class="faq-answer">${item.a}</div>`;
    li.classList.remove('open'); // altijd dicht bij aanmaak
    li.addEventListener('click', function(e) {
      // Sluit altijd alle andere antwoorden
      faqList.querySelectorAll('li.open').forEach(openLi => {
        if (openLi !== li) openLi.classList.remove('open');
      });
      li.classList.toggle('open');
    });
    faqList.appendChild(li);
    liArr.push(li);
  });
  // Na vullen: zorg dat alles dicht is (ook bij herladen/taalwissel)
  liArr.forEach(li => li.classList.remove('open'));
}
