/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const internships = [
  {
    name: 'QMIND',
    position: 'Director of Partnerships',
    url: 'https://qmind.ca/',
    startDate: '2019-04',
    endDate: '2020-04',
    summary: `QMIND is a student-run AI club at Queen's University. It was founded with the intention of giving undergraduate students hands-on experience with developing AI/ML. 
    In my fourth year of university (and QMIND's third year since inception), I joined the club as the Director of Partnerships, where I was tasked with raising money and finding partners
    for our national conference. I led a team of four that raised $90.0K in sponsorships in 6 months and helped organize a 300-person, 2-day conference. We also formed strong partnerships
    with AI professionals across the country; my personal highlight was securing Geoffrey Hinton, the Godfather of AI, as our keynote speaker.`,
    highlights: [

    ],
  },
  {
    name: 'iGan Partners',
    position: 'Summer Analyst',
    url: 'https://iganpartners.com/',
    startDate: '2018-05',
    endDate: '2018-08',
    summary: `In the summer following my second year of university, I worked at iGan Partners, a VC fund focused on early-stage investments in disruptive healthcare companies. During my four months,
    I performed due diligence for start-ups in the fields of B2B SaaS, Healthcare IT, and Medical Imaging. This included competitive analyses, market sizing, and analyzing financial models.
    I conducted 50+ meetings with management teams and KOLs to assess investment opportunities.`,
    highlights: [

    ],
  },
  {
    name: 'Tri-Colour Tutoring',
    position: 'Founder and Owner',
    startDate: '2017-09',
    endDate: '2018-05',
    summary: `In my second year of university, I founded a tutoring service that served first-year students across all faculties (sciences, engineering, arts, etc.).
    I hired 28 tutors and 5 executive members, along with 6 first-year representatives that helped with marketing and brand awareness. Over our six months of existence, we facilitated 100+ tutoring sesionss and four exam workshops.
    We earned $2,500 CAD in revenue (and profited a tiny bit too). It was no Airbnb or Facebook, but it gave me an introduction to the challenges of starting your own company and leading large teams.`,
    highlights: [

    ],
  },
];

export default internships;
