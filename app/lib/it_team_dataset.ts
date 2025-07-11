const users = [{'id': '511575e1-06ea-4cbd-871e-728a0fe5889c', 'name': 'Admin User', 'email': 'admin@fgftech.com', 'password': '123456'}];

// Define interfaces for better type safety in TypeScript
// Define interfaces for better type safety in TypeScript
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  team: string;
  role: string;
  skills: string[];
  past_projects: string[];
  seniority: number;
}

export interface Skill {
  name: string;
}

export interface Project {
  name: string;
}

export const employees: Employee[] = [
  {
    id: '5067fabb-178d-48be-8e3c-d09e8a13a96e',
    name: 'Alex Green',
    email: 'alex.green@fgftech.com',
    department: 'Information Technology',
    team: 'Data Engineering',
    role: 'Director',
    skills: ['Terraform', 'Kotlin', 'Jenkins', 'Power BI'],
    past_projects: ['Cloud Migration Phase 2', 'Mobile Orders App', 'QA Test Automation'],
    seniority: 4
  },
  {
    id: 'b9537fe6-7a16-4f2a-abf8-e8d84cc594ed',
    name: 'Maya Shah',
    email: 'maya.shah@fgftech.com',
    department: 'Information Technology',
    team: 'Cybersecurity',
    role: 'Security Analyst',
    skills: ['Linux', 'Python', 'Cyber Risk Analysis', 'Kotlin', 'Agile Methodology'],
    past_projects: ['ERP Revamp', 'QA Test Automation', 'FGQuality Insight', 'Data Lake Modernization'],
    seniority: 2
  },
  {
    id: '477bd7ce-0bb1-4350-9ce4-940d9c3ddf3c',
    name: 'Ethan Zhou',
    email: 'ethan.zhou@fgftech.com',
    department: 'Information Technology',
    team: 'Web Development',
    role: 'Support Specialist',
    skills: ['JavaScript', 'Data Pipelines', 'Docker', 'Terraform', 'Swift'],
    past_projects: ['Network Segmentation', 'Cloud Migration Phase 2'],
    seniority: 1
  },
  {
    id: 'd84ac934-0272-4e0c-a575-28209342de9a',
    name: 'Priya Patel',
    email: 'priya.patel@fgftech.com',
    department: 'Information Technology',
    team: 'Web Development',
    role: 'Data Engineer',
    skills: ['Node.js', 'Kotlin', 'Azure', 'Cyber Risk Analysis', 'Network Security'],
    past_projects: ['Workforce Scheduling System', 'ERP Revamp', 'Product Tracker App', 'Factory WiFi Optimization'],
    seniority: 2
  },
  {
    id: '8427554b-3d5e-49a1-b57b-b96b9a70fe1d',
    name: "Liam O'Connor",
    email: "liam.o'connor@fgftech.com",
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'Cloud Engineer',
    skills: ['SQL', 'Power BI', 'Swift', 'Docker'],
    past_projects: ['FGAnalytics', 'Network Segmentation', 'SCADA Bridge', 'QA Test Automation'],
    seniority: 2
  },
  {
    id: 'cb33475f-eda2-4995-8fa6-6ba542e0c652',
    name: 'Sophie Nguyen',
    email: 'sophie.nguyen@fgftech.com',
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'Team Lead',
    skills: ['Kubernetes', 'SQL', 'JavaScript', 'Python', 'SaaS Integrations', 'Jenkins'],
    past_projects: ['FGForms', 'Cloud Migration Phase 2', 'Cyber Risk Dashboard', 'Warehouse IoT Integration'],
    seniority: 3
  },
  {
    id: '03509cc0-a399-4c1d-8dba-062a5d34835f',
    name: 'Daniel Martinez',
    email: 'daniel.martinez@fgftech.com',
    department: 'Information Technology',
    team: 'Data Engineering',
    role: 'Team Lead',
    skills: ['Data Pipelines', 'Jenkins', 'Network Security', 'Terraform', 'CI/CD', 'SQL'],
    past_projects: ['Data Lake Modernization', 'Mobile Orders App'],
    seniority: 3
  },
  {
    id: '12860eff-2c1e-4e4f-b5c7-735001e62867',
    name: 'Olivia Rossi',
    email: 'olivia.rossi@fgftech.com',
    department: 'Information Technology',
    team: 'Web Development',
    role: 'Cloud Engineer',
    skills: ['Network Security', 'CI/CD', 'AWS', 'iOS', 'Python', 'Azure'],
    past_projects: ['Cloud Migration Phase 2', 'Data Lake Modernization', 'Mobile Orders App'],
    seniority: 2
  },
  {
    id: '26b40d8f-15e0-437b-8805-dddc86d4065b',
    name: 'Noah Thompson',
    email: 'noah.thompson@fgftech.com',
    department: 'Information Technology',
    team: 'Cybersecurity',
    role: 'Web Developer',
    skills: ['Network Security', 'Terraform', 'SQL', 'iOS', 'SaaS Integrations'],
    past_projects: ['Cloud Migration Phase 2', 'ERP Revamp', 'SCADA Bridge', 'Mobile Orders App'],
    seniority: 2
  },
  {
    id: '1cdee17d-cb14-4866-8091-6603113b1385',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@fgftech.com',
    department: 'Information Technology',
    team: 'Data Engineering',
    role: 'Junior Developer',
    skills: ['Azure', 'SQL', 'Kubernetes', 'Data Pipelines'],
    past_projects: ['FGAnalytics', 'FGQuality Insight', 'Mobile Orders App'],
    seniority: 1
  },
  {
    id: '789964c2-9e7c-432e-b1e4-76746996ecb0',
    name: 'Zara Khan',
    email: 'zara.khan@fgftech.com',
    department: 'Information Technology',
    team: 'Web Development',
    role: 'Director',
    skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Swift'],
    past_projects: ['QA Test Automation', 'Factory WiFi Optimization', 'Workforce Scheduling System'],
    seniority: 4
  },
  {
    id: '2742520b-4b80-40d5-b954-e007b7916812',
    name: 'Mateo Garcia',
    email: 'mateo.garcia@fgftech.com',
    department: 'Information Technology',
    team: 'Data Engineering',
    role: 'Security Analyst',
    skills: ['Network Security', 'SQL', 'React', 'Cyber Risk Analysis'],
    past_projects: ['ERP Revamp', 'Cloud Migration Phase 2', 'Data Lake Modernization', 'FGForms'],
    seniority: 2
  },
  {
    id: '60684b49-6f74-428f-a0a9-31485f77d19f',
    name: 'Ella Brown',
    email: 'ella.brown@fgftech.com',
    department: 'Information Technology',
    team: 'Cybersecurity',
    role: 'Senior Developer',
    skills: ['Kubernetes', 'Linux', 'iOS'],
    past_projects: ['FGAnalytics', 'FGQuality Insight', 'Data Lake Modernization'],
    seniority: 3
  },
  {
    id: 'b49efa6a-6fdb-4ba9-8acc-f69c7c833bcf',
    name: 'Harper Lin',
    email: 'harper.lin@fgftech.com',
    department: 'Information Technology',
    team: 'Infrastructure',
    role: 'CTO',
    skills: ['SQL', 'Jenkins', 'iOS', 'JavaScript', 'Android', 'Scrum'],
    past_projects: ['Product Tracker App', 'Factory WiFi Optimization'],
    seniority: 5
  },
  {
    id: '3d16099e-121a-4d3a-800e-054000c06838',
    name: 'Jayden Brooks',
    email: 'jayden.brooks@fgftech.com',
    department: 'Information Technology',
    team: 'Cloud Operations',
    role: 'Data Engineer',
    skills: ['Jenkins', 'SaaS Integrations', 'AWS', 'Kotlin'],
    past_projects: ['Warehouse IoT Integration', 'Factory WiFi Optimization', 'Product Tracker App'],
    seniority: 2
  },
  {
    id: '569f87c8-5a4e-460b-b1e8-9c010c9f6843',
    name: 'Isla Walker',
    email: 'isla.walker@fgftech.com',
    department: 'Information Technology',
    team: 'Cybersecurity',
    role: 'Security Analyst',
    skills: ['Power BI', 'Terraform', 'Network Security', 'Docker'],
    past_projects: ['ERP Revamp', 'Cloud Migration Phase 2', 'Mobile Orders App'],
    seniority: 2
  },
  {
    id: 'fada7c41-f3f3-4bae-b8f0-e1117df0e0ec',
    name: 'Lucas White',
    email: 'lucas.white@fgftech.com',
    department: 'Information Technology',
    team: 'Cloud Operations',
    role: 'Support Specialist',
    skills: ['SaaS Integrations', 'iOS', 'Data Pipelines', 'Docker', 'React', 'Jenkins'],
    past_projects: ['FGAnalytics', 'Workforce Scheduling System', 'FGQuality Insight', 'Network Segmentation'],
    seniority: 1
  },
  {
    id: '0ec42983-9cd7-460d-9bfc-9ae9e821a5fc',
    name: 'Arjun Reddy',
    email: 'arjun.reddy@fgftech.com',
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'Developer',
    skills: ['JavaScript', 'Kubernetes', 'Jenkins', 'Android'],
    past_projects: ['Data Lake Modernization', 'FGForms'],
    seniority: 2
  },
  {
    id: '745e4033-2332-4622-a924-2c26a8869978',
    name: 'Avery Adams',
    email: 'avery.adams@fgftech.com',
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'Security Analyst',
    skills: ['SaaS Integrations', 'Scrum', 'Agile Methodology', 'Kotlin', 'iOS'],
    past_projects: ['Warehouse IoT Integration', 'FGAnalytics'],
    seniority: 2
  },
  {
    id: '19dd1784-3bb7-4d31-906f-84ce4a3e4c41',
    name: 'Benjamin Roy',
    email: 'benjamin.roy@fgftech.com',
    department: 'Information Technology',
    team: 'Data Engineering',
    role: 'Security Analyst',
    skills: ['Terraform', 'React', 'AWS', 'JavaScript', 'Jenkins', 'Data Pipelines'],
    past_projects: ['SCADA Bridge', 'Cloud Migration Phase 2', 'FGAnalytics', 'Mobile Orders App'],
    seniority: 2
  },
  {
    id: 'becb30c2-77c0-4a04-a684-dadf1275846e',
    name: 'Chloe King',
    email: 'chloe.king@fgftech.com',
    department: 'Information Technology',
    team: 'Infrastructure',
    role: 'Senior Developer',
    skills: ['React', 'iOS', 'SQL', 'Swift'],
    past_projects: ['Mobile Orders App', 'Product Tracker App', 'Workforce Scheduling System', 'Network Segmentation'],
    seniority: 3
  },
  {
    id: '0518a57b-9204-4889-9eea-2ecea04d83de',
    name: 'Nathan Evans',
    email: 'nathan.evans@fgftech.com',
    department: 'Information Technology',
    team: 'Cybersecurity',
    role: 'Director',
    skills: ['SQL', 'CI/CD', 'Docker', 'Network Security', 'iOS'],
    past_projects: ['Data Lake Modernization', 'QA Test Automation'],
    seniority: 4
  },
  {
    id: '89602918-9b7e-4761-acb2-9eba51278038',
    name: 'Mila Taylor',
    email: 'mila.taylor@fgftech.com',
    department: 'Information Technology',
    team: 'Cloud Operations',
    role: 'QA Tester',
    skills: ['Node.js', 'Python', 'JavaScript', 'Azure', 'AWS'],
    past_projects: ['FGForms', 'Network Segmentation'],
    seniority: 1
  },
  {
    id: '09b6d247-c4ef-492e-9913-f56cba072c44',
    name: 'Sebastian Lee',
    email: 'sebastian.lee@fgftech.com',
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'Web Developer',
    skills: ['Docker', 'SaaS Integrations', 'SQL', 'Data Pipelines'],
    past_projects: ['ERP Revamp', 'Mobile Orders App', 'Data Lake Modernization'],
    seniority: 2
  },
  {
    id: '5aa2f1d0-0e95-416a-819d-e1e0d9806af9',
    name: 'Layla Morgan',
    email: 'layla.morgan@fgftech.com',
    department: 'Information Technology',
    team: 'Cloud Operations',
    role: 'Mobile Developer',
    skills: ['Node.js', 'Jenkins', 'CI/CD', 'AWS', 'Python', 'Docker'],
    past_projects: ['Workforce Scheduling System', 'Product Tracker App', 'ERP Revamp'],
    seniority: 2
  },
  {
    id: '73867783-3a1c-4900-bd63-cb08354c7b92',
    name: 'Elijah Scott',
    email: 'elijah.scott@fgftech.com',
    department: 'Information Technology',
    team: 'Web Development',
    role: 'DevOps Engineer',
    skills: ['Terraform', 'SaaS Integrations', 'JavaScript', 'Python', 'React', 'Node.js'],
    past_projects: ['Workforce Scheduling System', 'Product Tracker App'],
    seniority: 2
  },
  {
    id: 'f9426189-d927-459a-85fa-f2bdfac56dfc',
    name: 'Nora Diaz',
    email: 'nora.diaz@fgftech.com',
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'Team Lead',
    skills: ['SaaS Integrations', 'Node.js', 'CI/CD', 'Power BI', 'JavaScript'],
    past_projects: ['FGAnalytics', 'SCADA Bridge'],
    seniority: 3
  },
  {
    id: '9fc8db72-92b2-42b6-bc2c-93fd4afdc4b2',
    name: 'Gabriel Young',
    email: 'gabriel.young@fgftech.com',
    department: 'Information Technology',
    team: 'Web Development',
    role: 'Director',
    skills: ['Cyber Risk Analysis', 'Terraform', 'SQL', 'Python', 'SaaS Integrations'],
    past_projects: ['Cyber Risk Dashboard', 'Data Lake Modernization', 'Mobile Orders App'],
    seniority: 4
  },
  {
    id: '9790d35f-c118-4ab1-b1cf-596afa286129',
    name: 'Luna Flores',
    email: 'luna.flores@fgftech.com',
    department: 'Information Technology',
    team: 'Mobile Development',
    role: 'QA Tester',
    skills: ['CI/CD', 'Kubernetes', 'Linux', 'React', 'Swift', 'Android'],
    past_projects: ['Workforce Scheduling System', 'Product Tracker App'],
    seniority: 1
  },
  {
    id: 'd0602846-3fff-45f7-9ddd-efb1f74da6ba',
    name: 'Dylan Hill',
    email: 'dylan.hill@fgftech.com',
    department: 'Information Technology',
    team: 'Data Engineering',
    role: 'Mobile Developer',
    skills: ['Node.js', 'Android', 'Cyber Risk Analysis', 'Kubernetes', 'Kotlin', 'Jenkins'],
    past_projects: ['Factory WiFi Optimization', 'Product Tracker App'],
    seniority: 2
  }
];

export const allSkills: Skill[] = [
  { name: 'AWS' },
  { name: 'Agile Methodology' },
  { name: 'Android' },
  { name: 'Azure' },
  { name: 'CI/CD' },
  { name: 'Cyber Risk Analysis' },
  { name: 'Data Pipelines' },
  { name: 'Docker' },
  { name: 'JavaScript' },
  { name: 'Jenkins' },
  { name: 'Kotlin' },
  { name: 'Kubernetes' },
  { name: 'Linux' },
  { name: 'Network Security' },
  { name: 'Node.js' },
  { name: 'Power BI' },
  { name: 'Python' },
  { name: 'React' },
  { name: 'SQL' },
  { name: 'SaaS Integrations' },
  { name: 'Scrum' },
  { name: 'Swift' },
  { name: 'Terraform' },
  { name: 'iOS' }
];

export const allProjects: Project[] = [
  { name: 'Cloud Migration Phase 2' },
  { name: 'Cyber Risk Dashboard' },
  { name: 'Data Lake Modernization' },
  { name: 'ERP Revamp' },
  { name: 'FGAnalytics' },
  { name: 'FGForms' },
  { name: 'FGQuality Insight' },
  { name: 'Factory WiFi Optimization' },
  { name: 'Mobile Orders App' },
  { name: 'Network Segmentation' },
  { name: 'Product Tracker App' },
  { name: 'QA Test Automation' },
  { name: 'SCADA Bridge' },
  { name: 'Warehouse IoT Integration' },
  { name: 'Workforce Scheduling System' }
];
