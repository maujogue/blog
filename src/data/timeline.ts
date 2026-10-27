import type { Lang } from "@i18n/ui";

type Localized = Record<Lang, string>;

export type TimelineEntry = {
  date: Localized;
  what: Localized;
  takeaway: Localized;
  /** Hackathon win, shown as 🏆. */
  win?: boolean;
  /** Path (without language prefix) the entry links to. */
  href?: string;
};

// Entries of the /timeline page, kept here oldest first; the page shows them
// newest first. To add one, insert it at its chronological place (usually the end). `en` is an AI translation of `fr`.
export const TIMELINE: TimelineEntry[] = [
  {
    date: { fr: "2003", en: "2003" },
    what: { fr: "Naissance", en: "Birth" },
    takeaway: { fr: "Venue au monde.", en: "Came into the world." },
  },
  {
    date: { fr: "2003 → 2018", en: "2003 → 2018" },
    what: { fr: "Enfance à Vincennes (94)", en: "Childhood in Vincennes, near Paris" },
    takeaway: {
      fr: "Trottinette, tennis, Lego, Picsou et foot. La nature à deux pas.",
      en: "Scooters, tennis, Lego, Scrooge McDuck comics and football. Nature just around the corner.",
    },
  },
  {
    date: { fr: "2018 → 2021", en: "2018 → 2021" },
    what: {
      fr: "Lycée Français de Lisbonne (Portugal)",
      en: "French high school in Lisbon (Portugal)",
    },
    takeaway: {
      fr: "Les douleurs et bonheurs de tout quitter et tout reconstruire.",
      en: "The pains and joys of leaving everything behind and rebuilding it all.",
    },
  },
  {
    date: { fr: "sept. 2021 → nov. 2022", en: "Sep 2021 → Nov 2022" },
    what: {
      fr: "Licence maths-info, Lyon 1",
      en: "Bachelor's in maths and computer science, Lyon 1",
    },
    takeaway: {
      fr: "On peut être passionné par un domaine et détester la manière dont on l'étudie.",
      en: "You can love a field and hate the way it's taught.",
    },
  },
  {
    date: { fr: "2022 → sept. 2026", en: "2022 → Sep 2026" },
    what: { fr: "École 42 Lyon", en: "42 Lyon" },
    takeaway: {
      fr: "Le pouvoir de l'autonomie et du partage. Persévérer dans la douleur. Apprendre toute sa vie.",
      en: "The power of autonomy and sharing. Persevering through pain. Learning for life.",
    },
  },
  {
    date: { fr: "2023", en: "2023" },
    what: {
      fr: "Hackathon Nuits de Fourvière — site d'un festival, 10 jours, Lyon",
      en: "Nuits de Fourvière hackathon — a festival website, 10 days, Lyon",
    },
    takeaway: {
      fr: "Partir de 0 et y arriver quand même.",
      en: "Starting from zero and getting there anyway.",
    },
  },
  {
    date: { fr: "2024", en: "2024" },
    what: {
      fr: "Hackathon NIIS — jardin associatif lyonnais, 24h",
      en: "NIIS hackathon — a community garden in Lyon, 24h",
    },
    takeaway: { fr: "La diversité est une force.", en: "Diversity is a strength." },
    win: true,
  },
  {
    date: { fr: "sept. 2024 → fév. 2025", en: "Sep 2024 → Feb 2025" },
    what: { fr: "Stage Areas Ai", en: "Internship at Areas Ai" },
    takeaway: {
      fr: "La R&D, c'est dur. La R&D, c'est passionnant.",
      en: "R&D is hard. R&D is fascinating.",
    },
  },
  {
    date: { fr: "2025", en: "2025" },
    what: {
      fr: "Hackathon Raycast — extension IA, 6h, Londres",
      en: "Raycast hackathon — an AI extension, 6h, London",
    },
    takeaway: {
      fr: "Partir seul, outre-Manche, sur un coup de tête. Rencontrer des gens géniaux.",
      en: "Heading across the Channel alone, on a whim. Meeting amazing people.",
    },
  },
  {
    date: { fr: "2025", en: "2025" },
    what: {
      fr: "Hackathon TRACS — cybersécurité, 10h, Paris",
      en: "TRACS hackathon — cybersecurity, 10h, Paris",
    },
    takeaway: { fr: "On ne peut pas tout aimer.", en: "You can't love everything." },
  },
  {
    date: { fr: "2025", en: "2025" },
    what: {
      fr: "Hackathon CND — analyse de logs contre les cyberattaques, 3 jours, Paris",
      en: "CND hackathon — log analysis against cyberattacks, 3 days, Paris",
    },
    takeaway: {
      fr: "Galérer seul c'est bien, à plusieurs c'est encore mieux.",
      en: "Struggling alone is good; struggling together is even better.",
    },
    win: true,
  },
  {
    date: { fr: "sept. 2025 → sept. 2026", en: "Sep 2025 → Sep 2026" },
    what: {
      fr: "Alternance IA-data, SpendHQ / 42",
      en: "AI & data work-study, SpendHQ / 42",
    },
    takeaway: {
      fr: "Un challenge (un tuteur qui quitte la boîte sans remplaçant) peut devenir une opportunité (monter en responsabilité).",
      en: "A challenge (a mentor leaving the company with no replacement) can become an opportunity (taking on more responsibility).",
    },
  },
  {
    date: { fr: "28 fév. 2026", en: "Feb 28, 2026" },
    what: {
      fr: "Hackathon Unboxed AI — analyse IA des radios du genou, 48h, Lyon",
      en: "Unboxed AI hackathon — AI analysis of knee X-rays, 48h, Lyon",
    },
    takeaway: {
      fr: "Le succès dépend de la motivation, et la motivation, ça va et ça vient.",
      en: "Success depends on motivation, and motivation comes and goes.",
    },
    win: true,
  },
  {
    date: { fr: "5 mars 2026", en: "Mar 5, 2026" },
    what: { fr: "Organisation d'un meetup Raycast", en: "Organizing a Raycast meetup" },
    takeaway: {
      fr: "Rencontrer des gens c'est génial, les faire se rencontrer c'est encore mieux !",
      en: "Meeting people is great; getting them to meet each other is even better!",
    },
  },
  {
    date: { fr: "sept. 2026", en: "Sep 2026" },
    what: {
      fr: "Diplôme 42 — RNCP niveau 7, Expert en Architecture Informatique (bac+5, IA & data)",
      en: "42 degree — RNCP level 7, IT Architecture Expert (master's level, AI & data)",
    },
    takeaway: {
      fr: "Le diplôme est anecdotique. Le chemin et les valeurs, par contre, ça vaut quelque chose.",
      en: "The degree itself is a detail. The journey and the values, though, are worth something.",
    },
  },
  {
    date: { fr: "14 sept. 2026", en: "Sep 14, 2026" },
    what: {
      fr: "Hackathon La Suite — alternative souveraine à Office 365, 5 jours, Oléron",
      en: "La Suite hackathon — a sovereign alternative to Office 365, 5 days, Oléron",
    },
    takeaway: {
      fr: "L'apogée, la conclusion. Une expérience qui mêle technique, social, difficulté, bonheur et recul.",
      en: "The peak, the conclusion. An experience mixing tech, people, hardship, joy and perspective.",
    },
    win: true,
  },
  {
    date: { fr: "sept. 2026", en: "Sep 2026" },
    what: { fr: "Freelance AI engineer", en: "Freelance AI engineer" },
    takeaway: {
      fr: "Le changement de responsabilité quand on n'est plus étudiant. La liberté de choisir ses horaires et ses projets.",
      en: "The shift in responsibility once you're no longer a student. The freedom to choose your own hours and projects.",
    },
  },
  {
    date: { fr: "oct. 2026", en: "Oct 2026" },
    what: {
      fr: "Lancement du blog, série Anatomie du hackathon",
      en: "Blog launch, Anatomy of a hackathon series",
    },
    takeaway: {
      fr: "La suite de l'aventure. La mise à plat des questionnements, des réflexions. La construction de quelque chose qui m'est propre.",
      en: "The next chapter. Laying out questions and reflections. Building something of my own.",
    },
    href: "/tags/hackathon",
  },
  {
    date: { fr: "déc. 2026", en: "Dec 2026" },
    what: { fr: "Départ en aller simple pour l'Asie", en: "One-way ticket to Asia" },
    takeaway: {
      fr: "La pause. L'occasion de se décentrer, de prendre du recul. Le premier pas hors de 20 ans de sentiers battus.",
      en: "A pause. A chance to step outside myself and gain perspective. The first step off 20 years of well-trodden paths.",
    },
  },
];
