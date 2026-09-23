import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Indian HR & Talent database seed...');

  // Clean existing records in reverse dependency order
  await prisma.notification.deleteMany();
  await prisma.savedJob.deleteMany();
  await prisma.application.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.job.deleteMany();
  await prisma.candidateProfile.deleteMany();
  await prisma.employerProfile.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const employerPassword = await bcrypt.hash('Employer@123', 10);
  const candidatePassword = await bcrypt.hash('Candidate@123', 10);

  // 1. Create Admin (Pooja Sharma - Managing Partner)
  const adminUser = await prisma.user.create({
    data: {
      name: 'Pooja Sharma',
      email: 'admin@hirevibe.in',
      passwordHash: adminPassword,
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
  });

  // 2. Create Employers (Indian Tech Unicorn & Logistics Conglomerate)
  const employer1User = await prisma.user.create({
    data: {
      name: 'Karan Malhotra',
      email: 'recruiter@swifthire.in',
      passwordHash: employerPassword,
      role: 'EMPLOYER',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      employerProfile: {
        create: {
          companyName: 'RazorScale Technologies',
          logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          industry: 'FinTech, Payments & Developer SaaS',
          companySize: '500-1,000 employees',
          website: 'https://razorscale.in',
          location: 'Koramangala, Bengaluru / Hybrid',
          description: 'RazorScale Technologies is a Series D Indian fintech unicorn processing over ₹40,000 Cr in monthly digital commerce and UPI payments across India and Southeast Asia.',
          subscriptionTier: 'ENTERPRISE GCC',
        },
      },
    },
    include: { employerProfile: true },
  });

  const employer2User = await prisma.user.create({
    data: {
      name: 'Ananya Deshmukh',
      email: 'hr@bharatlogistics.in',
      passwordHash: employerPassword,
      role: 'EMPLOYER',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      employerProfile: {
        create: {
          companyName: 'Bharat Express Cargo & Supply Chain',
          logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&auto=format&fit=crop&q=80',
          industry: 'Multimodal Logistics & Supply Chain',
          companySize: '5,000+ employees',
          website: 'https://bharatexpress.in',
          location: 'Bandra-Kurla Complex (BKC), Mumbai',
          description: 'Bharat Express manages 42 automated hub fulfillment centres across Maharashtra, Karnataka, NCR, and Tamil Nadu, employing over 8,500 on-roll and contract logistics personnel.',
          subscriptionTier: 'GROWTH ADVISORY',
        },
      },
    },
    include: { employerProfile: true },
  });

  // 3. Create Candidates
  const candidate1User = await prisma.user.create({
    data: {
      name: 'Rohan Verma',
      email: 'candidate@rohanverma.dev',
      passwordHash: candidatePassword,
      role: 'CANDIDATE',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      candidateProfile: {
        create: {
          phone: '+91 98450 12891',
          location: 'Indiranagar, Bengaluru',
          headline: 'Staff Full-Stack Engineer | Distributed Systems & High-Scale Microservices',
          bio: 'B.Tech from IIT Madras with 8+ years building high-throughput payment rails, event-driven distributed systems, and modern Next.js/React architectures for Indian unicorns.',
          resumeUrl: '/uploads/resumes/rohan-verma-cv.pdf',
          skills: 'React, Next.js, TypeScript, Node.js, Golang, PostgreSQL, Redis, Kafka, AWS, Docker, Kubernetes',
          experience: JSON.stringify([
            {
              role: 'Lead Architect',
              company: 'PayQuick India',
              period: '2022 - Present',
              description: 'Architected UPI switch microservices handling 45,000 peak TPS with 99.999% uptime. Managed a team of 10 senior backend and full-stack engineers in Bengaluru.',
            },
            {
              role: 'Senior Software Engineer',
              company: 'Swiggy / InMobi Ecosystem',
              period: '2019 - 2022',
              description: 'Designed real-time geo-dispatch telemetry and frontend partner portals using Next.js and Redis.',
            },
          ]),
          education: JSON.stringify([
            {
              degree: 'B.Tech in Computer Science & Engineering',
              institution: 'Indian Institute of Technology (IIT) Madras',
              year: '2018',
            },
          ]),
          portfolioUrl: 'https://rohanverma.dev',
          currentCompany: 'PayQuick India',
          yearsOfExperience: 8,
        },
      },
    },
  });

  const candidate2User = await prisma.user.create({
    data: {
      name: 'Priya Nair',
      email: 'priya.nair@peopleindia.in',
      passwordHash: candidatePassword,
      role: 'CANDIDATE',
      avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
      candidateProfile: {
        create: {
          phone: '+91 98200 44812',
          location: 'Powai, Mumbai',
          headline: 'VP - People Operations & Statutory Compliance (Labour Codes, POSH, PF/ESIC)',
          bio: 'XLRI Jamshedpur alumna with 11+ years leading enterprise human resources, Indian Labour Law compliance, certified POSH Internal Committee presiding officer, and executive leadership recruitment.',
          resumeUrl: '/uploads/resumes/priya-nair-resume.pdf',
          skills: 'Indian Labour Codes, POSH Act 2013, EPF & ESIC, Gratuity Act, CLRA, Darwinbox, Workday, Executive Hiring, CTC Structuring',
          experience: JSON.stringify([
            {
              role: 'Head of People Operations',
              company: 'FinEdge Capital India',
              period: '2021 - Present',
              description: 'Built HR governance for 1,200 employees across Mumbai, Delhi, and Bengaluru. Restructured CTCs for New Labour Code compliance, saving ₹4.2 Cr in liability.',
            },
            {
              role: 'Senior HR Manager - Compliance & Industrial Relations',
              company: 'Mahindra Logistics',
              period: '2017 - 2021',
              description: 'Managed statutory compliance audits across 8 states, headed POSH Internal Committee, and negotiated multi-union wage settlements.',
            },
          ]),
          education: JSON.stringify([
            {
              degree: 'MBA in Human Resource Management',
              institution: 'XLRI Jamshedpur',
              year: '2015',
            },
            {
              degree: 'B.A. (Hons) in Psychology',
              institution: 'Lady Shri Ram College (LSR), Delhi University',
              year: '2013',
            },
          ]),
          portfolioUrl: 'https://linkedin.com/in/priyanair-hr',
          currentCompany: 'FinEdge Capital India',
          yearsOfExperience: 11,
        },
      },
    },
  });

  // 4. Create Jobs in Indian Metros with CTC in INR (LPA)
  const razorScaleProfileId = employer1User.employerProfile!.id;
  const bharatExpressProfileId = employer2User.employerProfile!.id;

  const job1 = await prisma.job.create({
    data: {
      employerId: razorScaleProfileId,
      title: 'Staff Cloud & Distributed Systems Architect',
      slug: 'staff-cloud-distributed-systems-architect-razorscale',
      department: 'Engineering',
      location: 'Bengaluru / Hybrid',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 3800000,
      salaryMax: 5200000,
      currency: 'INR',
      description: 'RazorScale Technologies is hiring a visionary Staff Cloud & Systems Architect in Bengaluru to scale our core UPI and cross-border settlement engine processing ₹40,000 Cr+ monthly. You will partner with VP Engineering to architect zero-downtime microservices across AWS India and multi-region Kubernetes.',
      requirements: '- 8+ years architecting enterprise distributed backends in Java, Golang, or Node.js\n- Deep mastery of Kubernetes, AWS (Mumbai region), Kafka, and Redis caching\n- Proven expertise in ACID transaction consistency, zero-downtime PostgreSQL migrations, and RBI data localization regulations\n- B.Tech/M.Tech from IIT/NIT/BITS or equivalent top engineering tier',
      benefits: 'Attractive ESOP grant with liquidity buybacks, ₹10 Lakhs comprehensive family health cover including parents, ₹1.5 Lakhs annual continuous learning stipend, 30 days privilege leave, flexible hybrid working.',
      status: 'ACTIVE',
      isFeatured: true,
      viewsCount: 2840,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      employerId: bharatExpressProfileId,
      title: 'Vice President - Human Resources & Labour Relations',
      slug: 'vp-human-resources-labour-relations-bharat-express',
      department: 'Human Resources',
      location: 'Mumbai (BKC) / Gurugram',
      jobType: 'Full-time',
      experienceLevel: 'Executive',
      salaryMin: 5500000,
      salaryMax: 7500000,
      currency: 'INR',
      description: 'Bharat Express is looking for an astute VP of HR & Labour Relations to lead people strategy for 8,500+ employees across 22 states. You will oversee nationwide statutory compliance (PF, ESIC, CLRA, Gratuity), lead POSH governance, and prepare our organization for the 4 New Labour Codes.',
      requirements: '- 12+ years progressive HR leadership in logistics, supply chain, manufacturing, or large Indian conglomerates\n- Deep mastery of Indian Labour Laws (Shops & Est Act, CLRA, Minimum Wages, EPF, ESIC, Gratuity)\n- Certified POSH Lead Trainer and seasoned experience chairing Internal Complaints Committees (ICC)\n- MBA in PM&IR / HR from XLRI, TISS, SCMHRD, or IIMs',
      benefits: 'Executive performance bonus (up to 35%), corporate car lease scheme, executive wellness concierge, top-tier stock incentives, and comprehensive parent healthcare coverage.',
      status: 'ACTIVE',
      isFeatured: true,
      viewsCount: 1950,
    },
  });

  const job3 = await prisma.job.create({
    data: {
      employerId: razorScaleProfileId,
      title: 'Lead Full-Stack React & Next.js Engineer',
      slug: 'lead-full-stack-react-nextjs-engineer-razorscale',
      department: 'Engineering',
      location: 'Bengaluru (Koramangala) / Remote India',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      salaryMin: 2800000,
      salaryMax: 3800000,
      currency: 'INR',
      description: 'Join RazorScale\'s Merchant Experience team building responsive, high-performance dashboards for over 500,000 Indian MSMEs and enterprise brands. You will pioneer Next.js Server Components, real-time analytics, and sleek UI/UX.',
      requirements: '- 5+ years building production-grade web apps with React, Next.js, and TypeScript\n- Experience building REST / GraphQL APIs in Node.js or Python\n- Obsession with core web vitals, Tailwind CSS, accessible components, and micro-interactions\n- Ability to mentor junior engineers and conduct rigorous code reviews',
      benefits: 'ESOPs, ₹1 Lakh annual home-office setup allowance, quarterly performance bonuses, generous medical insurance with OPD cover, free gourmet lunches at Koramangala office.',
      status: 'ACTIVE',
      isFeatured: true,
      viewsCount: 3120,
    },
  });

  const job4 = await prisma.job.create({
    data: {
      employerId: bharatExpressProfileId,
      title: 'Head of Total Rewards & Statutory Compliance (PF/ESIC/POSH)',
      slug: 'head-total-rewards-statutory-compliance-bharat-express',
      department: 'Human Resources',
      location: 'Mumbai (BKC) / Hybrid',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 3200000,
      salaryMax: 4400000,
      currency: 'INR',
      description: 'Lead total compensation, executive incentive plans, annual increments, and 100% legal compliance across 22 state labor offices. Coordinate with EPFO commissioners, ESIC inspectors, and district POSH officers.',
      requirements: '- 7+ years specializing in Indian compensation benchmarking (Aon Hewitt / Mercer benchmarks) and statutory compliance\n- Hands-on experience with Darwinbox or SAP SuccessFactors payroll modules\n- Mastery of Section 80C tax optimization, NPS corporate benefit design, and New Labour Code 50% basic salary rules\n- Proven record handling statutory inspections without penal action',
      benefits: 'Competitive annual bonus, ₹7.5 Lakh family medical policy, gratuity benefits, flexi-basket allowances.',
      status: 'ACTIVE',
      isFeatured: false,
      viewsCount: 1420,
    },
  });

  const job5 = await prisma.job.create({
    data: {
      employerId: bharatExpressProfileId,
      title: 'Director of Operations & Automated Hub Logistics',
      slug: 'director-operations-automated-hub-logistics-bharat-express',
      department: 'Operations',
      location: 'Gurugram (Cyber City) / Delhi NCR',
      jobType: 'Full-time',
      experienceLevel: 'Executive',
      salaryMin: 4000000,
      salaryMax: 5800000,
      currency: 'INR',
      description: 'Oversee northern India multimodal warehouse logistics, fleet automation, and dispatch networks across Delhi NCR, Haryana, Punjab, and Uttar Pradesh. Drive contract labor efficiency and safety compliance.',
      requirements: '- 10+ years managing large-scale warehousing, express cargo, or e-commerce delivery networks\n- Deep knowledge of Contract Labour (Regulation & Abolition) Act compliance and safety guidelines\n- Demonstrated P&L management exceeding ₹150 Cr annually',
      benefits: 'Performance-linked quarterly incentive, company vehicle, comprehensive family healthcare.',
      status: 'ACTIVE',
      isFeatured: false,
      viewsCount: 1180,
    },
  });

  const job6 = await prisma.job.create({
    data: {
      employerId: razorScaleProfileId,
      title: 'Principal Product Manager - UPI & Checkout Solutions',
      slug: 'principal-product-manager-upi-checkout-razorscale',
      department: 'Product',
      location: 'Bengaluru / Hyderabad',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 3500000,
      salaryMax: 4800000,
      currency: 'INR',
      description: 'Own the roadmap for RazorScale\'s core UPI Intent, AutoPay, and Credit on UPI checkout integrations for top Indian merchants (Flipkart, Zomato, Tata Neu).',
      requirements: '- 6+ years in product management with at least 3 years in Indian digital payments / NPCI rails\n- Proven track record optimizing transaction success rates and checkout conversion\n- Deep data analytical capabilities (SQL, Mixpanel, Amplitude)',
      benefits: 'High equity upside, competitive performance bonus, annual health retreat.',
      status: 'ACTIVE',
      isFeatured: false,
      viewsCount: 1680,
    },
  });

  const job7 = await prisma.job.create({
    data: {
      employerId: bharatExpressProfileId,
      title: 'Senior Financial Controller & Indian Taxation Lead',
      slug: 'senior-financial-controller-indian-taxation-bharat-express',
      department: 'Finance',
      location: 'Mumbai (BKC)',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: 2600000,
      salaryMax: 3600000,
      currency: 'INR',
      description: 'Lead corporate finance, Ind-AS compliance, GST filings across 22 states, transfer pricing, and statutory audits for our multimodal freight business.',
      requirements: '- Chartered Accountant (CA) with 6+ years post-qualification experience in Big 4 or top logistics/manufacturing firm\n- Mastery of GST reconciliation (GSTR-1, 3B, 9C) and corporate income tax\n- Experience managing internal and statutory audits under tight deadlines',
      benefits: 'Performance bonus, corporate healthcare cover, annual vacation allowance.',
      status: 'ACTIVE',
      isFeatured: false,
      viewsCount: 920,
    },
  });

  const job8 = await prisma.job.create({
    data: {
      employerId: razorScaleProfileId,
      title: 'Campus & Lateral Talent Acquisition Specialist',
      slug: 'campus-lateral-talent-acquisition-specialist-razorscale',
      department: 'Human Resources',
      location: 'Hyderabad (Hitec City) / Bengaluru',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      salaryMin: 1600000,
      salaryMax: 2200000,
      currency: 'INR',
      description: 'Drive premier engineering hiring across IITs, NITs, IIITs, and lead lateral tech recruiting to overcome 90-day Indian notice period hurdles.',
      requirements: '- 3-5 years tech recruitment experience in Indian product startups or tier-1 staffing firms\n- Proven experience organizing campus placement drives and lateral tech pipelines\n- Expert capability in candidate engagement, offer negotiation, and buyout facilitation',
      benefits: 'Generous placement incentive structure, quarterly offsites in Goa, full medical coverage.',
      status: 'ACTIVE',
      isFeatured: false,
      viewsCount: 1340,
    },
  });

  // 5. Create Realistic Candidate Applications
  await prisma.application.create({
    data: {
      jobId: job1.id,
      candidateId: candidate1User.id,
      resumeUrl: '/uploads/resumes/rohan-verma-cv.pdf',
      coverLetter: 'Dear RazorScale Hiring Committee,\n\nI have followed RazorScale\'s UPI switch evolution with tremendous admiration. With 8+ years building distributed financial microservices handling 45k TPS at PayQuick India, I would love to lead your Core Systems architecture team in Bengaluru.\n\nCurrent CTC: ₹38 LPA | Notice Period: 30 Days (Negotiable/Buyout possible).\n\nBest regards,\nRohan Verma',
      status: 'SHORTLISTED',
      employerNotes: 'Excellent candidate from IIT Madras with proven UPI scale experience. Technical round with VP Eng scheduled for Thursday 3 PM.',
    },
  });

  await prisma.application.create({
    data: {
      jobId: job2.id,
      candidateId: candidate2User.id,
      resumeUrl: '/uploads/resumes/priya-nair-resume.pdf',
      coverLetter: 'Dear Bharat Express Leadership,\n\nI am pleased to submit my application for the VP - HR & Labour Relations position. Over the past decade, I have led multi-state statutory audits across 8 states, chaired Internal Complaints Committees under the POSH Act 2013, and restructured CTCs for New Labour Code compliance.\n\nCurrent CTC: ₹48 LPA | Notice Period: 60 Days.\n\nWarm regards,\nPriya Nair',
      status: 'INTERVIEW',
      employerNotes: 'Exceptional pedigree from XLRI. Deep knowledge of POSH, CLRA, and State Labour Officer liaisoning. Final promoter round scheduled next week.',
    },
  });

  await prisma.application.create({
    data: {
      jobId: job3.id,
      candidateId: candidate1User.id,
      resumeUrl: '/uploads/resumes/rohan-verma-cv.pdf',
      coverLetter: 'I am keen to contribute to RazorScale\'s frontend architecture and design systems across Next.js.',
      status: 'REVIEWING',
      employerNotes: 'Application received and screened by technical recruiters.',
    },
  });

  // 6. Create Saved Jobs
  await prisma.savedJob.create({
    data: {
      candidateId: candidate1User.id,
      jobId: job3.id,
    },
  });

  await prisma.savedJob.create({
    data: {
      candidateId: candidate2User.id,
      jobId: job4.id,
    },
  });

  // 7. Create Realistic Indian HR Consulting Requests
  await prisma.serviceRequest.create({
    data: {
      employerId: employer2User.id,
      serviceType: 'HR Policy & Compliance',
      title: 'POSH Compliance Audit, ICC Constitution & Annual District Filing (14 State Hubs)',
      details: 'Bharat Express has 14 regional logistics hubs across Maharashtra, Karnataka, and NCR. We urgently require a comprehensive POSH Act 2013 compliance audit: (1) Reconstituting Internal Complaints Committees (ICC) with external certified NGO members, (2) Mandatory employee awareness masterclasses in Hindi, Marathi, and Kannada, (3) Drafting and filing annual POSH returns with District Officers.',
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      assignedConsultant: 'Pooja Sharma (Managing Partner, POSH Lead)',
      consultantNotes: 'ICC constitution framework delivered. External NGO legal advisor assigned for Mumbai & Bengaluru hubs. Employee training kickoff scheduled for next Monday.',
    },
  });

  await prisma.serviceRequest.create({
    data: {
      employerId: employer1User.id,
      serviceType: 'Payroll Advisory',
      title: 'New Labour Codes Readiness & CTC Restructuring (50% Basic Salary Rule)',
      details: 'RazorScale is modeling the financial impact of the 4 New Labour Codes on our 850 employees in Bengaluru. We need a detailed CTC restructuring plan to ensure Basic Salary >= 50% of gross pay while managing employer PF liability, gratuity actuarial valuations, and employee net take-home pay.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      assignedConsultant: 'Dr. Arvind Swaminathan (Partner, Labour Economics)',
      consultantNotes: 'CTC simulation models completed for engineering, sales, and operations bands. Board presentation deck ready for compensation committee review.',
    },
  });

  await prisma.serviceRequest.create({
    data: {
      employerId: employer1User.id,
      serviceType: 'Executive Search',
      title: 'Confidential CXO Search for Chief Technology Officer (CTO)',
      details: 'RazorScale is commissioning a confidential retained executive search for our incoming CTO in Bengaluru to spearhead our next-gen payment platform and global expansion.',
      status: 'PENDING',
      priority: 'HIGH',
      assignedConsultant: 'Vikram Singhania (Head of Executive Search)',
      consultantNotes: 'Target candidate longlist sourced from top US & Indian unicorns. Initial screening interviews commenced.',
    },
  });

  // 8. Create Thought Leadership Blog Posts on Indian HR
  await prisma.blogPost.create({
    data: {
      authorId: adminUser.id,
      slug: 'mastering-indias-4-new-labour-codes-2026-employer-playbook',
      title: 'Mastering India’s 4 New Labour Codes in 2026: The Comprehensive Corporate Playbook',
      summary: 'A strategic, defensible guide for Indian enterprises and GCCs navigating the Code on Wages, Social Security, Industrial Relations, and OSH.',
      category: 'Labour Law & Compliance',
      tags: 'Indian Labour Codes, Code on Wages, Social Security, PF, Gratuity, Compliance',
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
      readTimeMinutes: 7,
      content: `The consolidation of 29 archaic central labour statutes into 4 streamlined Labour Codes marks the most monumental transformation in Indian employment jurisprudence in seven decades.

### The 50% Basic Salary Mandate and CTC Implications
The most profound operational shift introduced by the Code on Wages is the standardized definition of "Wages." Under the new framework:

1. **The 50% Ceiling Rule**: Specified exclusions (including HRA, conveyance, and overtime) cannot collectively exceed 50% of total remuneration. If exclusions exceed 50%, the surplus is automatically categorized as wages for statutory calculations.
2. **Impact on Provident Fund (PF) & Gratuity**: Companies that traditionally suppressed basic pay to 25-30% of CTC will experience an immediate 8% to 15% surge in statutory employer contributions.
3. **Gratuity for Fixed-Term Employees**: Under the Social Security Code, fixed-term employees become eligible for gratuity on a pro-rata basis after just one year of service, rather than the historic 5-year threshold.

### Strategic Recommendations from HireVibe
We advise all Indian corporate clients to execute a comprehensive CTC financial modeling audit. Align salary structures proactively with employee communication to explain the trade-off between current take-home pay and enhanced long-term retirement security.`,
      isPublished: true,
      publishedAt: new Date('2026-02-18'),
    },
  });

  await prisma.blogPost.create({
    data: {
      authorId: adminUser.id,
      slug: 'posh-act-2013-internal-committee-constitution-annual-returns',
      title: 'POSH Act 2013 Compliance: Internal Complaints Committee (ICC) Formation & District Filings',
      summary: 'Why non-compliance under POSH Act can result in license cancellations and criminal liability, and how to institute a foolproof gender-safe workplace.',
      category: 'POSH & Workplace Safety',
      tags: 'POSH Act, ICC, Workplace Safety, Annual Returns, District Officer, Legal Audit',
      coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      readTimeMinutes: 6,
      content: `The Prevention of Sexual Harassment (POSH) at Workplace Act 2013 is not a mere box-ticking exercise in India. The Ministry of Women and Child Development and municipal District Officers across Mumbai, Bengaluru, and Gurugram have intensified audits of corporate compliance.

### Mandatory Pillars of Indian POSH Compliance
Every organization employing 10 or more personnel must satisfy three critical statutory obligations:

- **Formal Constitution of the Internal Complaints Committee (ICC)**: The ICC must be presided over by a senior woman employee, include at least 50% female members, and strictly feature an accredited External Member from an NGO or legal background.
- **Bi-Annual Sensitization Workshops**: Mandatory workshops for all employees, plus specialized quasi-judicial inquiry training for ICC committee members.
- **Annual Return Filing with the District Officer**: Under Section 21 of the POSH Act, companies must submit an annual report detailing complaints received, disposed, and pending actions to the respective District Officer by January 31st each year.

HireVibe provides certified external ICC members, conducts bilingual sensitization sessions, and drafts legally defensible inquiry reports for premier Indian enterprises.`,
      isPublished: true,
      publishedAt: new Date('2026-03-02'),
    },
  });

  await prisma.blogPost.create({
    data: {
      authorId: adminUser.id,
      slug: 'cracking-the-90-day-notice-period-dilemma-in-indian-tech',
      title: 'Cracking the 90-Day Notice Period Dilemma in Indian Tech: Strategies for Hiring Velocity',
      summary: 'Data-driven recruitment tactics to minimize offer dropouts, manage buyouts, and secure high-demand engineers in Bengaluru, Hyderabad, and Pune.',
      category: 'Talent Acquisition & Hiring',
      tags: 'Notice Period, Indian Tech Hiring, Bengaluru, Candidate Engagement, Buyouts',
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      readTimeMinutes: 5,
      content: `In India's tech ecosystems—spanning Bengaluru, Hyderabad, Gurugram, and Pune—the customary 60 to 90-day notice period is the single largest bottleneck to engineering delivery.

### The Mechanics of Candidate Drop-Offs
Between day 1 of resignation and day 90 of joining, candidates in India receive an average of 3 to 4 competing counter-offers. Industry-wide offer dropout rates hover between 35% and 50%.

### How High-Velocity Firms Overcome This:
1. **Notice Period Buyout Negotiations**: Structuring formal notice buyout reimbursements directly into the offer letter.
2. **Continuous Pre-Boarding Immersion**: Weekly technical syncs with engineering directors, invitations to all-hands meetings, and early delivery of company hardware.
3. **Clawback-Protected Joining Bonuses**: Offering staggered joining bonuses tied to 12-month retention commitments to dissuade last-minute offer shopping.`,
      isPublished: true,
      publishedAt: new Date('2026-03-14'),
    },
  });

  await prisma.blogPost.create({
    data: {
      authorId: adminUser.id,
      slug: 'gcc-setup-in-india-navigating-talent-compliance-infrastructure',
      title: 'Global Capability Centers (GCCs) in India: The Blueprint for Setting Up Tech Hubs',
      summary: 'How multinational corporations are leveraging India’s Tier-1 talent to build strategic innovation hubs in Bengaluru, Hyderabad, and Pune.',
      category: 'GCC & Enterprise Advisory',
      tags: 'GCC India, Global Capability Centers, IT Hubs, Entity Setup, STPI, SEZ Compliance',
      coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      readTimeMinutes: 8,
      content: `India is home to over 1,600 Global Capability Centers (GCCs) employing more than 1.7 million professionals. MNCs are no longer treating India as a cost-arbitrage back office, but as a primary innovation engine for AI, cloud infrastructure, and core product design.

HireVibe provides turnkey GCC advisory: from Shops & Establishments registrations and STPI/SEZ liaising to executive leadership hiring and total rewards benchmarking.`,
      isPublished: true,
      publishedAt: new Date('2026-03-20'),
    },
  });

  // 9. Create Authentic Indian Case Studies
  await prisma.caseStudy.create({
    data: {
      clientName: 'RazorScale Technologies',
      industry: 'FinTech Unicorn (Bengaluru)',
      serviceProvided: 'Turnkey Engineering Scaling & ESOP Compensation Benchmarking',
      challenge: 'Following a $60M Series D funding round, RazorScale needed to hire 65 top-tier distributed systems engineers and product managers in Bengaluru within 90 days, while keeping offer dropouts under 10% despite 90-day notice periods.',
      solution: 'HireVibe deployed a dedicated team of five technical recruiters and an Executive HR Partner. We implemented targeted candidate engagement protocols, structured buyout packages, and benchmarked ESOP grant vesting against tier-1 Indian unicorns.',
      results: 'Delivered 65 technical hires in 74 days with a 92% offer acceptance rate and only 4% candidate dropout. First-year retention rate stands at 97%.',
      metrics: JSON.stringify({
        engineersHired: 65,
        turnaroundDays: 74,
        offerAcceptanceRate: '92%',
        firstYearRetention: '97%',
      }),
      isFeatured: true,
    },
  });

  await prisma.caseStudy.create({
    data: {
      clientName: 'Bharat Express Logistics',
      industry: 'Multimodal Freight & Warehousing (Pan-India)',
      serviceProvided: 'Multi-State Statutory Audit, POSH Reconstitution & CLRA Governance',
      challenge: 'Operating across 14 state hubs with over 8,500 personnel, Bharat Express faced disparate state compliance requirements, pending POSH district filings, and contractor wage discrepancies.',
      solution: 'HireVibe executed an end-to-end statutory audit across all 14 state jurisdictions. We standardized contractor master service agreements under CLRA, reconstituted all Internal Complaints Committees with certified external members, and trained 1,400 supervisors on POSH.',
      results: 'Attained 100% clean statutory audit scores across Maharashtra, Karnataka, and NCR. Successfully submitted all mandatory annual returns with zero regulatory notices.',
      metrics: JSON.stringify({
        statesCompliant: 14,
        employeesSensitized: '8,500+',
        regulatoryPenalties: '₹0',
        auditCompletionWeeks: 8,
      }),
      isFeatured: true,
    },
  });

  await prisma.caseStudy.create({
    data: {
      clientName: 'FinEdge Capital India',
      industry: 'Digital NBFC & WealthTech (Mumbai)',
      serviceProvided: 'Confidential CXO Search for Chief Risk Officer & Head of Lending',
      challenge: 'FinEdge needed a seasoned Chief Risk Officer with deep RBI regulatory experience to oversee their ₹12,000 Cr digital loan book.',
      solution: 'Our executive search team mapped senior risk leaders across HDFC, ICICI, Kotak, and leading fintech NBFCs. We conducted confidential vetting and structured performance-linked equity incentives.',
      results: 'Secured premier CRO placement in 42 days. Candidate seamlessly led RBI digital lending compliance review.',
      metrics: JSON.stringify({
        cxoSearchDays: 42,
        shortlistDeliveredDays: 14,
        boardAcceptance: '100%',
        candidateRetention: '100%',
      }),
      isFeatured: true,
    },
  });

  // 10. Create Indian Executive Testimonials
  await prisma.testimonial.create({
    data: {
      clientName: 'Karan Malhotra',
      clientRole: 'VP - Talent & Culture',
      company: 'RazorScale Technologies (Bengaluru)',
      message: 'In Bengaluru’s hyper-competitive tech market, HireVibe is the only recruitment partner that consistently beats the 90-day notice period challenge. Their engineering calibration is so precise that 4 out of every 5 candidates they present advance directly to final rounds.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isFeatured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      clientName: 'Ananya Deshmukh',
      clientRole: 'Chief Human Resources Officer',
      company: 'Bharat Express Logistics (Mumbai)',
      message: 'HireVibe’s statutory labour advisory is exceptional. Their deep expertise in POSH Act governance, New Labour Code transition, and state labour department liaising saved us countless hours and protected us from serious regulatory exposure.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      isFeatured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      clientName: 'Vikramaditya Singhal',
      clientRole: 'Co-Founder & CEO',
      company: 'FinEdge Capital (Mumbai / Gurugram)',
      message: 'Finding a recruitment firm in India that understands both high-growth startup speed and institutional banking compliance is rare. HireVibe placed our CRO and VP Engineering in record time with total professionalism.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      isFeatured: true,
    },
  });

  await prisma.testimonial.create({
    data: {
      clientName: 'Meera Sen',
      clientRole: 'Head of Legal & Governance',
      company: 'PayQuick India (Bengaluru)',
      message: 'The POSH Internal Committee masterclasses and external NGO presiding officers provided by HireVibe set an undeniable gold standard for safe, respectful corporate culture in our technology centers.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      isFeatured: true,
    },
  });

  // 11. Create Notifications
  await prisma.notification.create({
    data: {
      userId: candidate1User.id,
      title: 'Application Shortlisted 🎉',
      message: 'RazorScale Technologies has shortlisted your application for Staff Cloud & Distributed Systems Architect. Technical interview scheduled.',
      link: '/portal/candidate/applications',
      type: 'APPLICATION',
    },
  });

  await prisma.notification.create({
    data: {
      userId: candidate2User.id,
      title: 'Final Executive Interview 🗓️',
      message: 'Bharat Express Logistics scheduled promoter interview round for the VP of Human Resources position.',
      link: '/portal/candidate/applications',
      type: 'APPLICATION',
    },
  });

  await prisma.notification.create({
    data: {
      userId: employer1User.id,
      title: 'New Candidate Applied',
      message: 'Rohan Verma submitted an application for Lead Full-Stack React Engineer.',
      link: '/portal/employer/applicants',
      type: 'APPLICATION',
    },
  });

  console.log('✅ Indian HR & Talent seed completed successfully!');
  console.log('--- DEMO ACCOUNTS ---');
  console.log('Admin:     admin@hirevibe.in / Admin@123');
  console.log('Employer:  recruiter@swifthire.in / Employer@123');
  console.log('Candidate: candidate@rohanverma.dev / Candidate@123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
