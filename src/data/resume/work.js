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
const work = [
  {
    name: 'Katarok',
    position: 'Backend Developer (FREELANCE)',
    url: 'https://www.katarok.ca/',
    startDate: '2023-09',
    endDate: '2023-10',
    summary: 'I worked for 6 weeks on the backend of an education-based LLM app. I contributed to several items within the backend, including:',
    highlights: [
      'Installed and set up alembic for postgreSQL database migrations using sqlalchemy model (previously using Supabase GUI)',
      'Designed workflow for testing and promoting code between local, DEV, UAT, and PROD for 3 team members working in Google Cloud',
      'Created local DB using Docker and made steps reproducible for teammates',
      'Rigorously tested postman routes on local DB and app',
      'Created and executed unit tests for CRUD operations and FastAPI routes using pytest',
    ],
  },
  {
    name: 'KPMG',
    position: 'Senior Consultant',
    startDate: '2021-06',
    endDate: '2023-04',
    summary: `I worked at KPMG for just shy of two years in the Financial Services department. During my time,
    I contributed to five projects which were primarily focused on data transformation and visualization, and
    process improvement and optimization. Notably, I was the lead developer and co-manager of an IT application
    that was developed to help an insurance company meet compliance with IFRS 17.`,
    highlights: [
      'Promoted to Senior Consultant after 14 months (avg. is 24); received highest rating out of 20+ consultants in financial services team',
      'Led technical delivery of IT application built in Azure; worked with Databricks, SQL, Data Factory, and DevOps (CI/CD, Terraform, YAML)',
      "Built an Excel model that enabled FI's to calculate their Scope 1 and 2 emissions based on province, building type, and the nationally-accepted emission rates",
      "Led QA, UAT, and product demos for large-scale insurer's Salesforce application; helped with Salesforce development",
      'Led analytics for internal recruitment team; standardized data and visualized in a Qlik dashboard',
    ],
  },
];

export default work;
