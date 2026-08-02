import type { FaqItem } from "@/components/FaqSection";
import type { Course } from "@/lib/courses";

export interface CourseGuide {
  overview: string;
  level: string;
  duration: string;
  eligibility: string;
  bestFor: string;
  whyStudy: string[];
  subjects: string[];
  careers: string[];
  selectionChecklist: string[];
  documents: string[];
  faqs: FaqItem[];
  relatedBlogs: Array<{ href: string; label: string }>;
}

const commonDocuments = [
  "Recent academic marksheets and pass certificates",
  "Citizenship or passport details as requested by the institution",
  "Passport-size photographs",
  "Migration, transfer or character certificate when applicable",
  "Course-specific entrance, eligibility or registration documents",
  "The university's current application and declaration forms",
];

const guides: Record<string, CourseGuide> = {
  bba: {
    overview: "BBA is an undergraduate management degree for students who want a practical foundation in business, communication, finance, marketing and entrepreneurship after Grade 12. Indian universities may offer general BBA programs or tracks such as aviation, business analytics, international business and logistics.",
    level: "Undergraduate",
    duration: "Usually 3 to 4 years",
    eligibility: "Grade 12 or equivalent; minimum marks and subject rules vary by university",
    bestFor: "Students interested in business, leadership, startups, sales, finance or a future MBA",
    whyStudy: [
      "Build broad business knowledge before choosing a specialist career direction.",
      "Learn through presentations, projects, internships and team-based problem solving.",
      "Prepare for entry-level business roles, entrepreneurship or postgraduate management study.",
    ],
    subjects: ["Principles of management", "Marketing", "Accounting and finance", "Business economics", "Human resources", "Business analytics", "Entrepreneurship", "Communication and presentations"],
    careers: ["Marketing executive", "Business development associate", "Operations coordinator", "HR associate", "Financial services trainee", "Entrepreneur", "MBA or specialised master's study"],
    selectionChecklist: ["Compare the actual specialisation modules, not only the title", "Check internship and live-project access", "Review placement data for the BBA department", "Compare total tuition, hostel, exam and activity costs", "Confirm scholarship continuation conditions in writing"],
    documents: commonDocuments,
    faqs: [
      { question: "Can a Nepali student apply for BBA in India after Grade 12?", answer: "Yes. Students can apply when they meet the university's academic and document requirements. Streams accepted and minimum marks can differ." },
      { question: "Is BBA better than B.Com?", answer: "Neither is universally better. BBA is usually more management-oriented, while B.Com often gives deeper commerce and accounting foundations. Compare the curriculum with your career goal." },
      { question: "Can I study MBA after BBA?", answer: "Yes. A recognised bachelor's degree can support MBA eligibility, subject to the chosen university's admission rules." },
    ],
    relatedBlogs: [
      { href: "/blog/bba-in-india-nepali-students-guide", label: "BBA in India guide for Nepali students" },
      { href: "/blog/management-courses-india-nepali-students", label: "Compare BBA, BBS and MBA" },
    ],
  },
  bbs: {
    overview: "BBS and related business studies degrees provide a broad base in accounting, economics, management and commercial practice. The exact BBS title is not offered by every Indian university, so students should also compare closely related B.Com and business programs by curriculum and recognition.",
    level: "Undergraduate",
    duration: "Usually 3 years; structure varies",
    eligibility: "Grade 12 or equivalent under the institution's current admission policy",
    bestFor: "Students seeking broad commerce and business foundations with flexible career options",
    whyStudy: ["Develop grounding in commerce, economics and management", "Keep options open for banking, accounting, business and postgraduate study", "Build analytical and administrative skills useful across industries"],
    subjects: ["Financial accounting", "Business economics", "Business law", "Taxation basics", "Management", "Statistics", "Banking and finance", "Entrepreneurship"],
    careers: ["Accounts assistant", "Banking trainee", "Administrative officer", "Sales and operations roles", "Entrepreneurship", "M.Com or MBA study"],
    selectionChecklist: ["Confirm the awarded degree title", "Compare BBS with B.Com curriculum", "Check recognition and progression options", "Review internship opportunities", "Ask for the complete fee sheet"],
    documents: commonDocuments,
    faqs: [
      { question: "Is BBS widely available in India?", answer: "The exact title is less common at some institutions. Similar business and commerce pathways may be offered as B.Com or another bachelor's degree." },
      { question: "Can BBS graduates pursue MBA?", answer: "A recognised bachelor's degree can normally support MBA applications, but each institution sets its own eligibility and entrance route." },
      { question: "What should I compare before applying?", answer: "Compare the degree title, subjects, recognition, internships, total cost and postgraduate progression rather than relying on the course name alone." },
    ],
    relatedBlogs: [{ href: "/blog/management-courses-india-nepali-students", label: "Management courses in India" }],
  },
  mba: {
    overview: "MBA is a postgraduate management degree designed to develop decision-making, strategy, leadership and specialist business skills. Programs differ greatly in admissions, teaching style, industry access and placement outcomes, so the institute and specialisation should be evaluated together.",
    level: "Postgraduate",
    duration: "Usually 2 years",
    eligibility: "A recognised bachelor's degree; entrance and minimum-score requirements vary",
    bestFor: "Graduates seeking management responsibility, career change, entrepreneurship or specialist business roles",
    whyStudy: ["Develop strategic and cross-functional business thinking", "Build a professional network through projects and internships", "Specialise in finance, marketing, HR, operations, analytics or entrepreneurship"],
    subjects: ["Strategy", "Finance", "Marketing", "Operations", "Organisational behaviour", "Business analytics", "Leadership", "Capstone project or internship"],
    careers: ["Management trainee", "Business analyst", "Marketing manager", "HR professional", "Operations manager", "Financial analyst", "Consulting and entrepreneurship"],
    selectionChecklist: ["Check accepted entrance tests and selection stages", "Compare faculty and industry projects", "Ask for median or department-level placement data", "Review internship quality", "Calculate the full two-year cost and scholarship conditions"],
    documents: commonDocuments,
    faqs: [
      { question: "Do all MBA colleges in India require CAT?", answer: "No. Universities may accept different national, state, university or merit-based routes. Confirm the exact process for your chosen intake." },
      { question: "Which MBA specialisation is best?", answer: "The right specialisation depends on your strengths and target roles. Review modules, internships and recruiter mix before deciding." },
      { question: "Is work experience compulsory?", answer: "Not for every MBA. Some programs accept fresh graduates, while others prefer or require experience." },
    ],
    relatedBlogs: [
      { href: "/blog/mba-in-india-nepali-students-guide", label: "MBA admission guide for Nepali students" },
      { href: "/blog/management-courses-india-nepali-students", label: "Compare management pathways" },
    ],
  },
  "b-tech": {
    overview: "B.Tech is a professional undergraduate engineering degree combining mathematics, science, design, laboratories and project work. Nepali students can compare computer science and emerging technology branches with core fields such as civil, mechanical, electrical and electronics engineering.",
    level: "Undergraduate",
    duration: "Usually 4 years",
    eligibility: "Grade 12 science or equivalent with required subjects; entrance rules vary",
    bestFor: "Students who enjoy mathematics, technology, building systems and solving practical problems",
    whyStudy: ["Gain structured engineering fundamentals and branch-specific technical skills", "Build a project portfolio through laboratories, design work and internships", "Access diverse branches and technology ecosystems across Indian education hubs"],
    subjects: ["Engineering mathematics", "Programming or computing", "Core branch laboratories", "Design and manufacturing", "Electronics and systems", "Data and problem solving", "Industry internship", "Final-year project"],
    careers: ["Software or data roles", "Core engineering roles", "Product and quality engineering", "Technical sales", "Research assistance", "Startup roles", "M.Tech or specialist postgraduate study"],
    selectionChecklist: ["Verify university, affiliation and applicable program approval", "Inspect branch-specific labs and faculty", "Review internships and project culture", "Check placement data for the exact branch", "Compare the complete four-year package"],
    documents: commonDocuments,
    faqs: [
      { question: "Which B.Tech branch should I choose?", answer: "Choose by interest, aptitude, curriculum and likely work, not only current popularity. Compare semester subjects and speak with students in the branch." },
      { question: "Can Nepali students apply for engineering scholarships in India?", answer: "Some institutions offer merit or regional scholarships. Eligibility, renewal conditions and covered costs must be confirmed in writing." },
      { question: "How should I verify an engineering college?", answer: "Check the awarding university or affiliation, official recognition and any applicable professional approval using current official sources." },
    ],
    relatedBlogs: [
      { href: "/blog/btech-in-india-nepali-students-guide", label: "B.Tech in India admission guide" },
      { href: "/blog/top-engineering-colleges-bangalore-nepali-students", label: "Engineering colleges in Bangalore" },
    ],
  },
  "b-pharm": {
    overview: "B.Pharm is an undergraduate pharmacy degree covering medicines, formulation, pharmaceutical analysis, pharmacology, quality systems and patient-facing pharmacy practice. Students should pay close attention to program recognition, laboratories and practical training.",
    level: "Undergraduate",
    duration: "Usually 4 years",
    eligibility: "Grade 12 science or equivalent with the required subject combination",
    bestFor: "Students interested in medicines, chemistry, healthcare systems, quality control and pharmaceutical industry careers",
    whyStudy: ["Learn how medicines are developed, tested, produced and used", "Explore community, hospital, regulatory and industry pathways", "Build a base for postgraduate pharmacy specialisations"],
    subjects: ["Pharmaceutics", "Pharmaceutical chemistry", "Pharmacology", "Pharmacognosy", "Pharmaceutical analysis", "Biochemistry", "Quality assurance", "Practice and project work"],
    careers: ["Production trainee", "Quality control analyst", "Regulatory affairs associate", "Clinical research support", "Hospital or community pharmacy subject to registration", "Medical information roles", "M.Pharm study"],
    selectionChecklist: ["Verify current institution and program approval", "Inspect laboratories and practical exposure", "Check internship or industry links", "Confirm registration implications for your career country", "Compare tuition plus laboratory and examination charges"],
    documents: commonDocuments,
    faqs: [
      { question: "Is B.Pharm the same as D.Pharm?", answer: "No. They differ in level, duration, curriculum and progression. Compare the exact qualification and registration pathway." },
      { question: "Can B.Pharm graduates work in Nepal?", answer: "Recognition and professional registration are separate from admission. Verify the current Nepal requirements with the relevant authority before enrolling." },
      { question: "Does AIMS Global handle pharmacy admissions?", answer: "Yes. Pharmacy is one of AIMS Global's supported study areas for India admission guidance." },
    ],
    relatedBlogs: [{ href: "/blog/pharmacy-allied-health-india-nepali-students", label: "Pharmacy and allied health guide" }],
  },
  "allied-health": {
    overview: "Allied health is a broad group of practical healthcare programs supporting diagnosis, treatment, rehabilitation and patient care. Options can include medical laboratory technology, imaging, operation theatre technology, optometry, dialysis, cardiac care, physiotherapy and other university-specific fields.",
    level: "Undergraduate and diploma pathways",
    duration: "Varies by course, commonly 3 to 4 years",
    eligibility: "Usually Grade 12 science or equivalent; subject requirements differ",
    bestFor: "Students seeking specialised healthcare careers in allied and technical health fields",
    whyStudy: ["Choose a focused clinical or diagnostic skill area", "Combine classroom learning with laboratory and hospital exposure", "Access several healthcare pathways beyond medicine and dentistry"],
    subjects: ["Anatomy and physiology", "Course-specific diagnostics", "Clinical procedures", "Patient safety", "Laboratory or imaging practice", "Hospital posting", "Research basics", "Internship where included"],
    careers: ["Medical laboratory technologist", "Imaging technologist", "Operation theatre technologist", "Dialysis technologist", "Optometry roles", "Rehabilitation support", "Course-specific postgraduate study"],
    selectionChecklist: ["Confirm the exact awarded degree", "Verify recognition and clinical training arrangements", "Ask which hospitals support practical exposure", "Check internship duration and supervision", "Review registration or equivalence needs before admission"],
    documents: commonDocuments,
    faqs: [
      { question: "What does allied health usually include?", answer: "Allied health programs support diagnostic, technical, therapeutic and rehabilitation services such as laboratory technology, imaging, operation theatre, dialysis, optometry and physiotherapy." },
      { question: "Are allied health course names standard everywhere?", answer: "No. Names and scopes can vary, so compare the full curriculum, qualification and clinical training." },
      { question: "What is most important when choosing a college?", answer: "Recognition, the exact degree title, laboratory quality, supervised clinical exposure and career registration plans are central." },
    ],
    relatedBlogs: [{ href: "/blog/pharmacy-allied-health-india-nepali-students", label: "Allied health options in India" }],
  },
  "gnm-nursing": {
    overview: "GNM is a diploma-level nursing pathway with classroom, skills-lab and supervised clinical learning. Applicants should compare eligibility, current recognition, hospital exposure, accommodation and all auxiliary costs before choosing an institution.",
    level: "Diploma",
    duration: "Usually 3 years; confirm the current program structure",
    eligibility: "Grade 12 or equivalent under current institution and nursing rules",
    bestFor: "Students seeking a practical nursing pathway with substantial clinical training",
    whyStudy: ["Develop bedside nursing and patient-care foundations", "Learn through skills labs and clinical rotations", "Build a base for nursing service and further study subject to current rules"],
    subjects: ["Nursing foundations", "Community health", "Medical-surgical nursing", "Child health", "Mental health", "Midwifery concepts", "Clinical rotations", "Professional practice"],
    careers: ["Entry-level nursing services subject to registration", "Community and clinical support", "Further nursing education where eligible", "Healthcare programme support"],
    selectionChecklist: ["Check current nursing recognition", "Verify clinical hospitals and rotation schedules", "Review hostel, food and transport", "Include uniforms, exams and clinical charges in the budget", "Confirm registration plans for Nepal before enrolling"],
    documents: commonDocuments,
    faqs: [
      { question: "Is GNM a degree?", answer: "GNM is generally a diploma-level nursing qualification. Compare it with B.Sc Nursing based on eligibility and long-term plans." },
      { question: "Are hostel and clinical costs always included?", answer: "No. Fee packages differ. Ask for a written breakdown covering tuition, hostel, food, uniforms, examinations and clinical charges." },
      { question: "Does AIMS Global support GNM admission?", answer: "Yes. GNM Nursing is a supported priority area, subject to current institution eligibility and recognition checks." },
    ],
    relatedBlogs: [{ href: "/blog/nursing-india-nepali-students-gnm-bsc", label: "GNM and B.Sc Nursing compared" }],
  },
  "bsc-nursing": {
    overview: "B.Sc Nursing is an undergraduate professional degree combining nursing science, clinical practice, community health and research foundations. The quality of supervised clinical exposure and current program recognition should be central to college selection.",
    level: "Undergraduate",
    duration: "Usually 4 years",
    eligibility: "Grade 12 science or equivalent under current nursing and university rules",
    bestFor: "Students seeking a degree-level nursing pathway and broad clinical preparation",
    whyStudy: ["Build comprehensive nursing knowledge and clinical competence", "Study community, hospital and specialist nursing areas", "Prepare for professional practice and postgraduate routes subject to registration rules"],
    subjects: ["Nursing foundations", "Anatomy and physiology", "Medical-surgical nursing", "Community health", "Child health", "Mental health", "Midwifery", "Research and clinical internship"],
    careers: ["Hospital nursing subject to registration", "Community health roles", "Clinical coordination", "Public-health programme support", "Postgraduate nursing study", "Education or administration after experience"],
    selectionChecklist: ["Verify current recognition and degree-awarding body", "Check skills labs and hospital exposure", "Ask about clinical supervision and patient volume", "Compare complete course and living costs", "Confirm Nepal registration or equivalence steps"],
    documents: commonDocuments,
    faqs: [
      { question: "How is B.Sc Nursing different from GNM?", answer: "B.Sc Nursing is degree-level and usually broader academically, while GNM is diploma-level. Eligibility and progression routes also differ." },
      { question: "Should I check Indian Nursing Council information?", answer: "Yes. Use current official recognition information and also verify any Nepal registration requirements relevant to your plans." },
      { question: "Can AIMS Global help compare nursing packages?", answer: "Yes. We help compare written fee inclusions, clinical information and admission requirements for supported institutions." },
    ],
    relatedBlogs: [{ href: "/blog/nursing-india-nepali-students-gnm-bsc", label: "Nursing in India guide" }],
  },
};

export function getCourseGuide(course: Course): CourseGuide {
  const direct = guides[course.slug];
  if (direct) return direct;

  return {
    overview: `${course.name} programs in India vary by university, curriculum, duration and admission route. Nepali students should compare the exact qualification, recognition, practical learning, total cost and progression options before applying.`,
    level: "Confirm with the university",
    duration: "Varies by program and institution",
    eligibility: "Depends on course level, academic background and current university rules",
    bestFor: `Students whose academic interests and career plan match the ${course.name} curriculum`,
    whyStudy: [
      `Develop subject knowledge and practical skills in ${course.name}.`,
      "Compare several Indian education hubs, course structures and budget options.",
      "Build a study plan around recognised qualifications and realistic career goals.",
    ],
    subjects: ["Foundation subjects", "Core course modules", "Elective or specialisation subjects", "Practical or laboratory work where applicable", "Project or internship where included"],
    careers: ["Course-related entry-level roles", "Further specialist study", "Research or project support", "Entrepreneurship where relevant"],
    selectionChecklist: ["Confirm the exact degree title and duration", "Verify institutional recognition and applicable approval", "Review the detailed curriculum", "Compare practical training and outcomes", "Ask for the complete written fee and refund policy"],
    documents: commonDocuments,
    faqs: [
      { question: `Can Nepali students apply for ${course.name} in India?`, answer: "Yes, when they meet the chosen institution's current eligibility and documentation requirements." },
      { question: "Are fees the same at every university?", answer: "No. Tuition, hostel, exam fees and scholarships vary by institution, campus and intake. Confirm the current written fee sheet." },
      { question: "How can AIMS Global help?", answer: "AIMS Global can help compare supported institutions, organise documents, review admission information and coordinate the application process." },
    ],
    relatedBlogs: [{ href: "/blog/study-in-india-from-nepal-guide", label: "Study in India from Nepal guide" }],
  };
}

export function createFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
