export const services = [
  {
    icon: '📜',
    title: 'Certificate of Sponsorship (CoS)',
    desc: 'We assign Defined or Undefined CoS ensuring all occupation codes, salary thresholds, and compliance checks meet UKVI standards.',
  },
  {
    icon: '🛂',
    title: 'Skilled Worker Visa Application',
    desc: 'Full application support for Skilled Worker, Health & Care, Senior or Specialist Worker, and ICT visas. We prepare, review, and submit your documentation.',
  },
  {
    icon: '🏢',
    title: 'Sponsor Licence Applications',
    desc: 'First-time applications, renewals, and expansions of sponsor licences. We audit your HR processes and compliance systems before submission.',
  },
  {
    icon: '🔄',
    title: 'Visa Extensions & ILR',
    desc: 'Support for visa extensions, switching visa categories, and Indefinite Leave to Remain (ILR) once qualifying residency criteria are met.',
  },
  {
    icon: '📊',
    title: 'Compliance Audits',
    desc: 'Pre-UKVI audit inspections, record-keeping review, HR system checks, and staff training to maintain your A-rated sponsor licence.',
  },
  {
    icon: '🌍',
    title: 'Global Mobility Consulting',
    desc: 'Strategic advice for multinational employers on intra-company transfers, business visitor rules, and right-to-work compliance.',
  },
]

export const visas = [
  {
    type: '⭐ Most Popular',
    title: 'Skilled Worker Visa',
    desc: 'For workers in eligible occupations earning at least £38,700 (or the going rate). Leads to settlement after 5 years.',
    tags: ['5-Year Route', 'ILR Eligible', 'Dependants Allowed'],
    featured: true,
  },
  {
    type: 'Healthcare',
    title: 'Health & Care Worker Visa',
    desc: 'Discounted fees for doctors, nurses, and allied health professionals sponsored by CQC-regulated employers or NHS.',
    tags: ['Reduced IHS', 'NHS Sponsored'],
  },
  {
    type: 'Intra-Company',
    title: 'Senior or Specialist Worker',
    desc: 'For employees transferring within a multinational group to a UK branch — no English language test required.',
    tags: ['No IELTS', 'ICT Route'],
  },
  {
    type: 'Graduate',
    title: 'Graduate Trainee Visa',
    desc: 'Short-term route for employees on a graduate training programme being transferred to a UK operation for development.',
    tags: ['Up to 12 Months', 'Training-Linked'],
  },
  {
    type: 'Scale-Up',
    title: 'Scale-Up Worker Visa',
    desc: 'For high-growth businesses. After 6 months, workers can change employer without further sponsorship.',
    tags: ['Flexible', 'High Growth'],
  },
  {
    type: 'Specialist',
    title: 'Other Sponsored Routes',
    desc: 'Charity workers, religious workers, international sportspersons, and creative workers with dedicated T2/T5 categories.',
    tags: ['T2/T5 Routes', 'Specialist'],
  },
]

export const faqs = [
  {
    q: 'What is a Certificate of Sponsorship?',
    a: 'A CoS is a unique reference number assigned by a UK-licensed sponsor employer using the UKVI Sponsorship Management System (SMS). It is not a physical document but contains details about the job offer, salary, occupation code, and sponsorship terms. The worker uses this reference number when applying for their visa.',
  },
  {
    q: 'What is the minimum salary for a Skilled Worker Visa?',
    a: 'As of April 2024, the general minimum salary threshold is £38,700 per year. Some shortage occupations and new entrant roles may have lower thresholds. Health & Care workers sponsored by the NHS or CQC-registered employers have separate provisions.',
  },
  {
    q: 'Can my employer apply for a sponsor licence while I wait?',
    a: 'Yes. Standard processing is around 8 weeks, though a 10-working-day priority service is available for an additional fee. We can begin CoS preparation simultaneously to minimise delays once the licence is granted.',
  },
  {
    q: 'Do I need IELTS for a Skilled Worker Visa?',
    a: 'Most Skilled Worker applicants must prove English language ability at B1 level or above through a UKVI-approved SELT. Exemptions exist for nationals of majority English-speaking countries, those with a degree taught in English, and workers switching from certain existing UK visas.',
  },
  {
    q: 'Can my family come with me on a Skilled Worker Visa?',
    a: 'Yes. Your spouse or civil partner, and children under 18, can apply as dependants on separate visa applications. Note: Health & Care Worker Visa holders sponsored for non-NHS roles cannot bring dependants as of 2024.',
  },
  {
    q: "What are the employer's ongoing sponsor duties?",
    a: 'Licensed sponsors must keep up-to-date records, report any changes to job roles or salary via the SMS, track worker absences, and co-operate with any UKVI compliance visits. Failure to meet these duties risks licence suspension or revocation.',
  },
]

export const testimonials = [
  {
    initials: 'AM',
    name: 'Amara M.',
    role: 'HR Director, NHS Foundation Trust',
    text: '"BritPath handled our NHS trust\'s entire CoS pipeline — over 120 nurses onboarded in 6 months with zero compliance issues. Absolutely indispensable."',
  },
  {
    initials: 'CO',
    name: 'Chidi O.',
    role: 'Senior Developer, London FinTech',
    text: '"I moved from Lagos to London as a software engineer. My case manager walked me through every document, every fee. I got my visa in 18 days."',
  },
  {
    initials: 'SR',
    name: 'Sunita R.',
    role: 'Operations Director, Care Homes Group',
    text: '"We were worried our sponsor licence might be revoked after a UKVI audit letter. BritPath\'s compliance team fixed everything in 72 hours. Truly saved our business."',
  },
]

export const employerDocs = [
  { icon: '📋', name: 'Valid Sponsor Licence details (SMS access)', req: 'Required' },
  { icon: '💼', name: 'Signed employment contract / job offer letter', req: 'Required' },
  { icon: '💷', name: 'Salary confirmation meeting going rate & threshold', req: 'Required' },
  { icon: '🔢', name: 'SOC 2020 occupation code confirmation', req: 'Required' },
  { icon: '🏢', name: 'Company registration documents (Companies House)', req: 'Required' },
  { icon: '📊', name: 'Business bank statements (recent 3 months)', req: 'Optional' },
]

export const workerDocs = [
  { icon: '🛂', name: 'Valid passport (at least 6 months remaining)', req: 'Required' },
  { icon: '📜', name: 'Certificate of Sponsorship reference number', req: 'Required' },
  { icon: '🎓', name: 'Degree certificates & professional qualifications', req: 'Required' },
  { icon: '🗣️', name: 'English language test results (IELTS / SELT)', req: 'Required' },
  { icon: '💰', name: 'Proof of personal savings (£1,270 maintenance)', req: 'Required' },
  { icon: '📸', name: 'Biometric photograph (passport-standard)', req: 'Required' },
  { icon: '🏥', name: 'TB test certificate (if from listed country)', req: 'If applicable' },
  { icon: '👨‍👩‍👧', name: 'Dependant documents (birth/marriage certificates)', req: 'Optional' },
]

export const fees = [
  { label: 'CoS Assignment Fee (employer)', amount: '£239' },
  { label: 'Skilled Worker Visa (3 years)', amount: '£827' },
  { label: 'Skilled Worker Visa (5 years)', amount: '£1,500' },
  { label: 'Immigration Health Surcharge (p.a.)', amount: '£1,035' },
  { label: 'Priority Service (optional)', amount: '£500' },
  { label: 'Super-Priority Service (optional)', amount: '£1,000' },
  { label: 'Dependant Visa (per person)', amount: '£827–£1,500' },
]

export const processSteps = [
  {
    num: '1',
    title: 'Initial Assessment',
    desc: "We assess employer sponsorship eligibility and the worker's qualification and salary against Skilled Worker thresholds and SOC occupation codes.",
  },
  {
    num: '2',
    title: 'Sponsor Licence Check or Application',
    desc: "If the employer isn't a licensed sponsor, we submit the licence application. Typical UKVI processing: 8 weeks standard, 10 days priority.",
  },
  {
    num: '3',
    title: 'Certificate of Sponsorship Assigned',
    desc: 'We log into the Sponsorship Management System (SMS), create the vacancy, and assign the CoS with full compliance documentation.',
  },
  {
    num: '4',
    title: 'Visa Application Submitted',
    desc: 'The sponsored worker completes the online visa application, uploads documents, pays the IHS and visa fee, and attends biometrics.',
  },
  {
    num: '5',
    title: 'Decision & Entry to UK',
    desc: 'UKVI issues the visa decision. We debrief the applicant on entry requirements and ongoing compliance obligations.',
  },
]

export const timeline = [
  { tag: 'Day 1', title: 'Onboarding & Assessment', desc: 'Case manager assigned, documents collected' },
  { tag: 'Day 2', title: 'Document Review', desc: 'Submitted documents verified and gaps identified' },
  { tag: 'Day 3', title: 'Compliance Checks', desc: 'Salary, SOC code, and HR records verified' },
  { tag: 'Day 4', title: 'CoS Assigned via SMS', desc: 'Reference number issued to sponsored worker' },
  { tag: 'Day 5–6', title: 'Visa Application Submitted', desc: 'UKVCAS biometrics appointment booked' },
]
