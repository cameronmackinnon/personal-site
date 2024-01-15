const skills = [
  {
    title: 'Javascript',
    competency: 1,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Java',
    competency: 1,
    category: ['Languages'],
  },
  {
    title: 'C',
    competency: 1,
    category: ['Languages'],
  },
  {
    title: 'Node.JS',
    competency: 1,
    category: ['Web Development'],
  },
  {
    title: 'React',
    competency: 1,
    category: ['Web Development'],
  },
  {
    title: 'Zsh',
    competency: 2,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'PostgreSQL/MSSQL/SQL/Supabase',
    competency: 3,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'SQL Alchemy/Alembic',
    competency: 2,
    category: ['Web Development', 'Databases', 'Python'],
  },
  {
    title: 'Pytest',
    competency: 1,
    category: ['Python'],
  },
  {
    title: 'FastAPI/Postman',
    competency: 1,
    category: ['Web Development', 'Python'],
  },
  {
    title: 'Git',
    competency: 2,
    category: ['Tools'],
  },
  {
    title: 'Google Cloud',
    competency: 1,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Docker',
    competency: 1,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'Numpy/Math',
    competency: 3,
    category: ['Data Science', 'Data Engineering', 'Python'],
  },
  {
    title: 'Jupyter',
    competency: 3,
    category: ['Data Science', 'Python'],
  },
  {
    title: 'HTML + CSS',
    competency: 1,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Azure',
    competency: 3,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'Excel/VBA',
    competency: 3,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'CI/CD, Terraform, YAML',
    competency: 2,
    category: ['Languages', 'Data Engineering'],
  },
  {
    title: 'Python',
    competency: 3,
    category: ['Languages', 'Python'],
  },
  {
    title: 'MATLAB',
    competency: 2,
    category: ['Languages'],
  },
  {
    title: 'R',
    competency: 1,
    category: ['Languages'],
  },
  {
    title: 'Salesforce',
    competency: 2,
    category: ['Tools'],
  },
  {
    title: 'Data Visualization (Qlik)',
    competency: 2,
    category: ['Data Science'],
  },
  {
    title: 'Pandas',
    competency: 3,
    category: ['Data Engineering', 'Python'],
  },
  {
    title: 'Matplotlib',
    competency: 1,
    category: ['Data Engineering', 'Python'],
  },
  {
    title: 'Spark/PySpark',
    competency: 2,
    category: ['Data Engineering'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

const colors = [
  '#6699CC',
  '#88B3D6',
  '#66B5CC',
  '#0066CC',
  '#0077B6',
  '#3399FF',
  '#AAD5E7',
  '#66B2FF',
  '#99CCFF',
  '#C3DFF1',
  '#E6F7FF',
];

const categories = [
  ...new Set(skills.flatMap(({ category }) => category)),
].sort().map((category, index) => ({
  name: category,
  color: colors[index],
}));

export { categories, skills };
