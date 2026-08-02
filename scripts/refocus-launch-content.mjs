import { readFile, writeFile } from "fs/promises";
import path from "path";

const blogsFile = path.join(process.cwd(), "src", "data", "blogs.json");
const office = "Finance Chowk (Apple Entrance Building), 5th Floor, Butwal";

function article(title, introduction, sections, faqs) {
  const body = sections
    .map(([heading, paragraphs]) => `## ${heading}\n\n${paragraphs.join("\n\n")}`)
    .join("\n\n");
  const faq = faqs.map(([question, answer]) => `### ${question}\n${answer}`).join("\n\n");
  return `# ${title}\n\n${introduction}\n\n${body}\n\n## Frequently Asked Questions\n\n${faq}\n\n---\n\nFor personalised course and college guidance, visit AIMS Global at ${office}, call 974-3679606, or [send an enquiry](/contact).`;
}

const studyGuideTitle = "Study in India from Nepal: Admissions, Courses & Fees Guide 2026";
const studyGuideContent = article(
  studyGuideTitle,
  "India gives Nepali students a wide choice of recognised universities, practical courses and familiar culture close to home. The right decision, however, depends on course quality, total cost, location, eligibility and verified admission terms. This guide explains a clear way to compare those factors before applying.",
  [
    ["Courses AIMS Global Supports", [
      "AIMS Global supports management pathways such as BBA, BBS and MBA; engineering programs including B.Tech and specialised technology degrees; pharmacy programs such as B.Pharm and D.Pharm; allied health and paramedical courses; GNM and B.Sc Nursing; and selected programs in law, design, computer applications and other professional fields.",
      "AIMS Global keeps its guidance focused on management, engineering, pharmacy, nursing, allied health, paramedical and other actively supported study pathways.",
    ]],
    ["How to Shortlist a College", [
      "Start with the course curriculum and recognition, then compare accreditation, laboratories, internships, placement support, hostel arrangements and the total annual cost. A famous university name is useful only when the specific department and course fit your goals.",
      "Create a shortlist with three levels: an ambitious option, a strong match and a budget-safe option. Compare the same cost items for every college, including tuition, exam fees, hostel, food, travel and refundable deposits.",
    ]],
    ["Eligibility and Documents", [
      "Typical applications require recent academic mark sheets and certificates, passport-size photographs, citizenship or passport details, transfer or migration documents and course-specific eligibility evidence. Requirements vary by institution, so use the university's current written checklist before paying any amount.",
      "Management and many professional programs may admit students through merit or a university process. Engineering, nursing, pharmacy and allied programs can have subject requirements or entrance rules that differ by state and institution.",
    ]],
    ["Admission Process from Nepal", [
      "The practical sequence is counselling, profile review, college comparison, document verification, formal application, written offer review, fee confirmation and seat acceptance. Keep copies of every application, receipt and official communication.",
      "Pay only to an account named by the university or an authorised party shown in written documentation. Ask for a fee breakdown and refund policy before confirming a seat.",
    ]],
    ["Fees, Scholarships and Budget", [
      "Fees change by program, campus, intake and scholarship category. Treat online fee figures as an initial estimate until the university confirms the current amount in writing. Scholarships may depend on marks, entrance performance, early application or continuation criteria.",
      "A realistic budget should include more than tuition. Add hostel or rent, meals, local transport, books, exam charges, travel from Nepal and an emergency reserve.",
    ]],
    ["How AIMS Global Helps", [
      "Our team reviews your academic background, preferred course, city and budget, then helps you compare suitable institutions. We support document preparation, applications, offer review and post-admission coordination while keeping the final choice with the student and family.",
    ]],
  ],
  [
    ["Can Nepali students study in India?", "Yes. Nepali students can apply to Indian institutions when they meet the course and university requirements."],
    ["Which courses receive priority guidance?", "Management, engineering, pharmacy, allied health, paramedical, GNM Nursing and B.Sc Nursing are current priority areas."],
    ["Which healthcare courses receive AIMS Global guidance?", "AIMS Global focuses on pharmacy, nursing, allied health and paramedical study options for healthcare-related guidance."],
    ["Is the first counselling session free?", "Yes. Students can begin with a free profile and course discussion."],
  ]
);

const engineeringTitle = "Top Engineering Colleges in Bangalore for Nepali Students 2026";
const engineeringContent = article(
  engineeringTitle,
  "Bangalore combines a large engineering education network with technology companies, internships and a strong student community. For Nepali students, the best college is not simply the one with the loudest marketing; it is the institution that offers the right branch, credible teaching, practical exposure and a manageable total cost.",
  [
    ["Why Bangalore for Engineering", [
      "The city offers engineering programs across computer science, artificial intelligence, electronics, mechanical, civil and emerging specialisations. Its technology ecosystem can make industry talks, project work and internships more accessible, although opportunities still depend on the student's skills and the college's active partnerships.",
    ]],
    ["What to Compare Between Colleges", [
      "Compare affiliation or university status, accreditation, department laboratories, faculty stability, placement reporting, internship support and graduate outcomes. Ask whether placement numbers are department-specific and whether the advertised package is an average, median or single highest offer.",
      "Also compare campus location, hostel rules, food, transport and the full four-year cost. A lower tuition fee can be offset by expensive accommodation or travel.",
    ]],
    ["Eligibility and Admission", [
      "B.Tech applicants generally need the required science subjects in Grade 12 or an equivalent qualification. Minimum marks, entrance routes and scholarship rules vary, so confirm the current criteria for the exact branch and intake before applying.",
      "Keep academic documents, identity documents, photographs, migration or transfer papers and any required entrance records ready. Submit only complete, consistent information.",
    ]],
    ["Choosing an Engineering Branch", [
      "Choose a branch by combining interest, aptitude and curriculum rather than following a trend alone. Review the actual semester subjects, laboratory work and likely entry-level roles. Students unsure between branches should compare first-year common subjects and talk to current students or graduates.",
    ]],
    ["Application Checklist", [
      "Shortlist several colleges, confirm the current fee sheet, review the offer and refund policy, verify hostel availability and keep every payment receipt. AIMS Global can help organise those comparisons and coordinate applications from Nepal.",
    ]],
  ],
  [
    ["Is Bangalore suitable for Nepali engineering students?", "It can be a strong choice for students who want broad college options and exposure to a major technology city."],
    ["Which engineering branch is best?", "There is no universal best branch. The right option matches your interests, academic strengths and preferred career direction."],
    ["Can AIMS Global compare fees and colleges?", "Yes. We help students compare current written information before they decide."],
  ]
);

const pharmacyTitle = "Pharmacy, Paramedical & Allied Health Courses in India for Nepali Students 2026";
const pharmacyContent = article(
  pharmacyTitle,
  "Healthcare careers extend far beyond medicine and dentistry. Pharmacy, laboratory sciences, imaging, physiotherapy and other allied health programs can lead to practical clinical, scientific and industry roles. Nepali students should compare recognition, training facilities and career fit before choosing a course.",
  [
    ["Popular Study Pathways", [
      "Options may include B.Pharm, D.Pharm, medical laboratory technology, radiology and imaging technology, operation theatre technology, optometry, physiotherapy and other institution-specific allied health programs. Course names and professional scopes can differ, so verify the curriculum and awarding body.",
    ]],
    ["How to Choose the Right Course", [
      "Pharmacy suits students interested in medicines, formulation, quality control, community practice or the pharmaceutical industry. Laboratory and imaging programs suit students who enjoy diagnostics and technical procedures, while physiotherapy focuses more on movement, rehabilitation and direct patient support.",
      "Review practical hours, simulation facilities, hospital or industry exposure, internship structure and the qualification needed for further study or registration in the country where you plan to work.",
    ]],
    ["Eligibility and Recognition", [
      "Science subjects are commonly required, but exact combinations and minimum marks vary. Before paying, confirm institutional recognition, course approval where applicable, internship arrangements and whether the qualification supports your intended registration or further study path in Nepal or elsewhere.",
    ]],
    ["Fees and Training Costs", [
      "Compare tuition together with laboratory charges, uniforms, instruments, examinations, hostel and transport. Ask for the current fee sheet and refund terms in writing because estimates can change by intake and scholarship category.",
    ]],
    ["Admission Support from Nepal", [
      "AIMS Global helps students compare supported pharmacy, paramedical and allied health programs, prepare documents, review offer details and coordinate admission steps.",
    ]],
  ],
  [
    ["Is B.Pharm different from D.Pharm?", "Yes. They differ in duration, curriculum and progression options; confirm the current structure with the institution and relevant regulator."],
    ["Are allied health courses the same at every university?", "No. Names, clinical exposure and approval can vary significantly, so compare the exact course rather than only the category."],
    ["Does AIMS Global support medicine or dentistry?", "No. Our health-related guidance focuses on pharmacy, nursing, paramedical and allied health programs."],
  ]
);

const managementTitle = "Management Courses in India for Nepali Students: BBA, BBS & MBA 2026";
const managementContent = article(
  managementTitle,
  "Management education can begin after Grade 12 through BBA or BBS-style pathways, or after a bachelor's degree through an MBA. The best route depends on your current qualification, preferred specialisation, budget and whether you want a broad business foundation or advanced management study.",
  [
    ["BBA, BBS and MBA Compared", [
      "BBA commonly emphasises business administration, presentations, projects and specialisations. BBS or similarly named commerce and business degrees may place more weight on accounting, economics and broad business fundamentals. MBA programs are postgraduate and usually expect a completed bachelor's degree.",
    ]],
    ["Specialisations and Career Direction", [
      "Common areas include finance, marketing, human resources, operations, business analytics, entrepreneurship and international business. Review the actual course modules and internship model instead of choosing from the specialisation title alone.",
    ]],
    ["Choosing a College", [
      "Compare academic recognition, faculty, live projects, internship access, placement transparency, alumni activity and total cost. For MBA applicants, also check the accepted entrance route and whether prior work experience is preferred for a particular program."],
    ],
    ["Application Planning", [
      "Prepare academic documents, identity details, photographs and any entrance records required by the institution. Ask for the current fee sheet, scholarship conditions and refund policy before confirming admission."],
    ],
  ],
  [
    ["Can I study BBA in India after Grade 12 in Nepal?", "Yes, if you meet the institution's academic and document requirements."],
    ["Is BBS available at every Indian university?", "No. Degree names vary, so compare BBS with related B.Com and business programs by curriculum."],
    ["Do all MBA colleges require CAT?", "No. Entrance requirements vary by institution and program."],
  ]
);

const nursingTitle = "GNM Nursing and B.Sc Nursing in India for Nepali Students 2026";
const nursingContent = article(
  nursingTitle,
  "GNM and B.Sc Nursing are different routes into nursing education. Students should compare eligibility, course level, clinical training, recognition and future registration plans before choosing a college in India.",
  [
    ["GNM and B.Sc Nursing Compared", [
      "GNM is a diploma-level nursing pathway, while B.Sc Nursing is an undergraduate degree with broader academic and clinical study. Availability and progression routes vary, so examine the current curriculum and long-term study options."],
    ],
    ["Clinical Training Matters", [
      "A nursing program should provide structured skills-lab practice and supervised clinical exposure. Ask which hospitals support training, how rotations are organised, and whether hostel and transport arrangements fit clinical schedules."],
    ],
    ["Eligibility and Recognition", [
      "Subject requirements, minimum marks, age rules and entrance processes can differ. Confirm institutional and program recognition, and check the registration requirements that apply where you intend to work after graduation."],
    ],
    ["Budget and Admission Documents", [
      "Include tuition, clinical or laboratory charges, uniforms, equipment, examinations, hostel, meals and travel in the budget. Prepare current academic and identity documents, and rely on the university's written checklist."],
    ],
    ["How AIMS Global Supports Nursing Applicants", [
      "We help Nepali students compare supported GNM and B.Sc Nursing options, organise applications and review admission information. Our medical-related services do not include medicine or dentistry."],
    ],
  ],
  [
    ["Which is better, GNM or B.Sc Nursing?", "The right choice depends on eligibility, desired qualification level, budget and long-term study or registration plans."],
    ["Should I verify clinical affiliations?", "Yes. Ask for current written information about skills labs, clinical partners and supervised training."],
    ["Can AIMS Global help from Nepal?", "Yes. We support course comparison, document preparation and admission coordination for supported nursing programs."],
  ]
);

const updates = new Map([
  ["study-in-india-from-nepal-guide", {
    slug: "study-in-india-from-nepal-guide", title: studyGuideTitle, metaTitle: "Study in India from Nepal 2026: Admission, Courses & Fees", metaDescription: "A practical 2026 guide for Nepali students comparing courses, fees, documents and verified admission steps for studying in India.", focusKeyword: "study in India from Nepal", secondaryKeywords: "India admission for Nepali students, courses in India, education consultancy Butwal", category: "Study Abroad Guide", tags: ["India", "Nepal", "Admission", "Management", "Engineering", "Pharmacy", "Nursing"], targetAudience: "Nepali students and parents", outline: "Supported Courses | College Shortlist | Eligibility | Admission Process | Fees | AIMS Global Support", internalLinks: "/universities, /courses, /contact", status: "Published", priority: "High", notes: "Primary pillar guide for supported India study pathways.", publishedAt: "2026-08-02", excerpt: "Compare supported courses, costs, documents and verified admission steps for studying in India from Nepal.", featured: true, content: studyGuideContent,
  }],
  ["top-engineering-colleges-bangalore-nepali-students", {
    slug: "top-engineering-colleges-bangalore-nepali-students", title: engineeringTitle, metaTitle: "Engineering Colleges in Bangalore for Nepali Students 2026", metaDescription: "Compare Bangalore engineering colleges, branches, eligibility, fees and admission checks for Nepali students planning B.Tech in 2026.", focusKeyword: "engineering colleges Bangalore for Nepali students", secondaryKeywords: "B.Tech Bangalore, engineering admission India from Nepal, Bangalore colleges", category: "Engineering", tags: ["B.Tech", "Bangalore", "Engineering", "Karnataka", "Nepali Students"], targetAudience: "Engineering applicants from Nepal", outline: "Why Bangalore | College Comparison | Eligibility | Branch Selection | Application Checklist", internalLinks: "/universities?city=bangalore, /courses/b-tech, /contact", status: "Published", priority: "High", publishedAt: "2026-08-02", excerpt: "A practical guide to comparing engineering colleges, branches, fees and admissions in Bangalore.", featured: true, content: engineeringContent,
  }],
  ["mbbs-india-nepali-students-admission-guide", {
    slug: "pharmacy-allied-health-india-nepali-students", title: pharmacyTitle, imgAlt: "Nepali pharmacy student learning in a modern university laboratory in India", metaTitle: "Pharmacy & Allied Health in India for Nepali Students 2026", metaDescription: "Compare B.Pharm, D.Pharm, paramedical and allied health courses, eligibility, training and fees in India for Nepali students.", focusKeyword: "pharmacy courses in India for Nepali students", secondaryKeywords: "B.Pharm India Nepal, D.Pharm admission, paramedical courses India, allied health courses", category: "Pharmacy & Allied Health", tags: ["B.Pharm", "D.Pharm", "Pharmacy", "Paramedical", "Allied Health", "Nepal"], targetAudience: "Science students and parents in Nepal", outline: "Course Options | Choosing a Course | Eligibility | Fees | Admission Support", internalLinks: "/courses/b-pharm, /universities, /contact", status: "Published", priority: "High", notes: "Refocused toward supported healthcare pathways.", publishedAt: "2026-08-02", excerpt: "Explore pharmacy, paramedical and allied health study pathways in India with practical admission checks.", featured: true, content: pharmacyContent,
  }],
  ["mba-india-nepali-students-best-colleges", {
    slug: "management-courses-india-nepali-students", title: managementTitle, imgAlt: "Nepali students collaborating in a modern Indian business school", metaTitle: "BBA, BBS & MBA in India for Nepali Students 2026", metaDescription: "Compare BBA, BBS and MBA pathways, specialisations, college quality, fees and admission steps in India for Nepali students.", focusKeyword: "management courses in India for Nepali students", secondaryKeywords: "BBA India Nepal, BBS courses India, MBA colleges India", category: "Management", tags: ["BBA", "BBS", "MBA", "Management", "India", "Nepal"], targetAudience: "Management students from Nepal", outline: "BBA vs BBS vs MBA | Specialisations | Choosing a College | Application Planning", internalLinks: "/courses, /universities, /contact", priority: "High", notes: "Priority management cluster article.", excerpt: "Compare BBA, BBS and MBA pathways in India by level, curriculum, fees and career direction.", content: managementContent,
  }],
  ["sharda-university-mbbs-nepali-students-2025", {
    slug: "nursing-india-nepali-students-gnm-bsc", title: nursingTitle, imgAlt: "Nepali nursing students practising in a university simulation lab in India", metaTitle: "GNM & B.Sc Nursing in India for Nepali Students 2026", metaDescription: "Compare GNM and B.Sc Nursing in India, including eligibility, clinical training, recognition, costs and admission support from Nepal.", focusKeyword: "nursing in India for Nepali students", secondaryKeywords: "GNM Nursing India Nepal, BSc Nursing admission India, nursing colleges", category: "Nursing", tags: ["GNM Nursing", "B.Sc Nursing", "Nursing", "India", "Nepal"], targetAudience: "Nursing applicants from Nepal", outline: "GNM vs B.Sc Nursing | Clinical Training | Eligibility | Costs | Admission Support", internalLinks: "/courses, /universities, /contact", priority: "High", notes: "Refocused toward supported healthcare pathways.", excerpt: "Compare GNM and B.Sc Nursing options in India, from eligibility and training to costs and recognition.", content: nursingContent,
  }],
]);

const blogs = JSON.parse(await readFile(blogsFile, "utf8"));
for (const blog of blogs) {
  const update = updates.get(blog.slug);
  if (update) Object.assign(blog, update);
  blog.title = blog.title.replaceAll("2025", "2026");
  blog.metaTitle = blog.metaTitle.replaceAll("2025", "2026");
  blog.metaDescription = blog.metaDescription.replaceAll("2025", "2026");
  blog.secondaryKeywords = blog.secondaryKeywords.replaceAll("2025", "2026");
  blog.outline = blog.outline.replaceAll("2025", "2026");
  blog.content = blog.content.replaceAll("2025", "2026");
  blog.imgAlt = blog.imgAlt.replaceAll("2025", "2026");
  blog.wordCount = blog.content.trim().split(/\s+/).length;
  blog.readTime = Math.max(1, Math.ceil(blog.wordCount / 220));
}

await writeFile(blogsFile, `${JSON.stringify(blogs, null, 2)}\n`);
console.log("Refocused blog content for the 2026 launch and removed MBBS/BDS service promotion.");
