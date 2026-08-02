import { readFile, writeFile } from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "universities.json");
const updatedAt = "2026-08-02";
const partnerSource = "AIMS Global partner fee sheet supplied 2 Aug 2026";
const defaultEligibility = "Confirm course-specific eligibility with the institution";
const defaultEntrance = "Merit / university admission process";

function fee(course, duration, amount, feeBasis, inclusions = "Tuition only", notes = "") {
  return {
    course,
    duration,
    annualFee: amount,
    feeBasis,
    inclusions,
    eligibility: defaultEligibility,
    entranceExam: defaultEntrance,
    notes,
  };
}

const commonDocuments = [
  "+2 / SEE marksheets and certificates",
  "Passport or citizenship copy",
  "Passport-size photographs",
  "Migration / transfer certificate",
  "Character certificate",
  "Course-specific entrance or eligibility documents, if required",
];

const commonFeeNotes = [
  "Fees are indicative and can change by intake, scholarship, admission route and room category.",
  "Confirm the complete written fee schedule, inclusions and refund terms before making payment.",
];

const gnmAuxiliaryNotes = [
  "GNM tuition-only estimate: UGC and registration ₹15,000 one time.",
  "GNM tuition-only estimate: special clinical posting ₹7,500–₹10,000 one time.",
  "GNM tuition-only estimate: examination fee approximately ₹5,000 per year.",
  "GNM tuition-only estimate: uniform and lamp-lighting approximately ₹7,500; Nepal NOC approximately ₹2,000.",
];

const updates = {
  "bms-institute-technology-management-bangalore": {
    name: "BMS Institute of Technology & Management (BMSIT&M)",
    type: "Autonomous Engineering Institute under VTU",
    naacGrade: "A",
    established: "2002",
    annualFees: "₹8L–₹14L total package",
    feeBasis: "Total 4-year package",
    popularCourses: ["B.E. CSE", "B.E. AI & ML", "B.E. ECE", "B.E. EEE", "B.E. Mechanical", "B.E. Civil"],
    topCourse: "B.E. CSE",
    keyHighlights: "Autonomous institute under VTU; NAAC A; package includes hostel and vegetarian/non-vegetarian food",
    overview: "BMSIT&M is an autonomous engineering institute under Visvesvaraya Technological University in Bangalore. The listed partner packages cover four years and include hostel and food.",
    coursesFees: [
      fee("B.E. Civil / Mechanical / EEE / ECE", "4 years", "₹8,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
      fee("B.E. Computer Science & Engineering", "4 years", "₹14,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
      fee("B.E. Artificial Intelligence & Machine Learning", "4 years", "₹12,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
    ],
  },
  "bms-college-engineering-bangalore": {
    established: "1946",
    annualFees: "₹10L–₹22L total package",
    feeBasis: "Total 4-year package",
    popularCourses: ["B.E. CSE", "B.E. CSE Specialisations", "B.E. Biotechnology", "B.E. ECE", "B.E. EEE", "B.E. Mechanical", "B.E. Civil"],
    topCourse: "B.E. CSE",
    keyHighlights: "Established 1946; among India's earliest private engineering colleges; NAAC A++; hostel and food included in listed partner packages",
    overview: "BMS College of Engineering is an autonomous engineering institution in Bangalore established in 1946. The listed four-year partner packages include hostel and vegetarian/non-vegetarian food.",
    coursesFees: [
      fee("B.E. Civil / Mechanical / EEE / ECE / Chemical", "4 years", "₹10,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
      fee("B.E. Biotechnology", "4 years", "₹12,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
      fee("B.E. Computer Science & Engineering", "4 years", "₹22,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
      fee("B.E. CSE specialisations: AI/ML, Business Systems, AI & DS, IoT/Cyber, Data Science", "4 years", "₹14,00,000", "Total package", "Tuition + hostel + veg/non-veg food"),
    ],
  },
  "cambridge-institute-technology-bangalore": {
    annualFees: "₹7L–₹10.5L total package",
    feeBasis: "Total 4-year package",
    popularCourses: ["B.E. CSE", "B.E. AI & ML", "B.E. Data Science", "B.E. IoT & Cyber Security", "B.E. ECE", "B.E. Mechanical", "B.E. Civil", "B.E. EEE"],
    topCourse: "B.E. CSE",
    keyHighlights: "VTU affiliated; listed package includes 3/4-sharing hostel and Wi-Fi; subtract ₹50,000 per year when hostel is not required",
    overview: "Cambridge Institute of Technology is a VTU-affiliated engineering college in Bangalore. The listed four-year packages include shared hostel accommodation and Wi-Fi.",
    coursesFees: [
      fee("B.E. CSE", "4 years", "₹10,50,000", "Total package", "Tuition + 3/4-sharing hostel + Wi-Fi"),
      fee("B.E. AI & ML / IoT & Cyber Security / Data Science", "4 years", "₹9,50,000", "Total package", "Tuition + 3/4-sharing hostel + Wi-Fi"),
      fee("B.E. ECE / Mechanical / Civil / EEE", "4 years", "₹7,00,000", "Total package", "Tuition + 3/4-sharing hostel + Wi-Fi"),
    ],
    feeNotes: ["If hostel is not required, deduct ₹50,000 per year from the listed package."],
  },
  "east-point-group-institutions-bangalore": {
    annualFees: "₹90K–₹16.6L course total",
    feeBasis: "Course total; engineering and nursing rows may include hostel",
    popularCourses: ["B.E.", "BBA", "BCA", "MBA", "MCA", "B.Com", "B.Pharm", "D.Pharm", "Pharm.D", "GNM", "B.Sc Nursing", "BPT", "Allied Health"],
    topCourse: "B.E. CSE",
    keyHighlights: "Multi-disciplinary Bangalore campus; engineering, management, computing, pharmacy, nursing, physiotherapy and allied health; detailed SAARC hostel tiers available",
    overview: "East Point Group of Institutions offers engineering, management, computing, pharmacy, nursing, physiotherapy and allied health programs in Bangalore. Fee basis varies by course and hostel selection.",
    coursesFees: [
      fee("B.E. CSE / AI & ML / Data Science / IoT & Cyber Security", "4 years", "₹10,60,000 with hostel / ₹8,40,000 without", "Total package / tuition", "Hostel included only in first amount"),
      fee("B.E. ISE / ECE", "4 years", "₹9,40,000 with hostel / ₹8,10,000 without", "Total package / tuition", "Hostel included only in first amount"),
      fee("B.E. Civil", "4 years", "₹7,80,000 with hostel / ₹6,50,000 without", "Total package / tuition", "Hostel included only in first amount"),
      fee("BBA Professional / Aviation; BCA Professional", "3 years", "₹2,20,000", "Total tuition"),
      fee("BCA AI / Data Science", "3 years", "₹2,70,000", "Total tuition"),
      fee("B.Com Professional", "3 years", "₹1,80,000", "Total tuition"),
      fee("MBA Regular / Professional", "2 years", "₹2,70,000 / ₹3,20,000", "Total tuition"),
      fee("MCA / M.Com", "2 years", "₹2,70,000 / ₹90,000", "Total tuition"),
      fee("D.Pharm / B.Pharm / Pharm.D / M.Pharm", "2–6 years", "₹2,10,000 / ₹4,70,000 / ₹16,60,000 / ₹4,70,000", "Total tuition"),
      fee("GNM", "3 years", "₹5,65,000", "Total package", "Tuition + hostel"),
      fee("B.Sc Nursing", "4 years", "₹11,50,000", "Total package", "Tuition + hostel"),
      fee("BPT", "4.5 years", "₹6,50,000", "Total tuition"),
      fee("MPT specialisations", "2 years", "₹4,00,000–₹4,50,000", "Total tuition", "", "Pediatrics, cardiovascular, pulmonary sciences and community health options listed"),
      fee("B.Sc Cardiac Care", "4 years", "₹8,75,000", "Total tuition"),
      fee("B.Sc Perfusion / Anaesthesia & OT", "4 years", "₹4,76,000 / ₹6,20,000", "Total tuition"),
      fee("B.Sc Medical Imaging / Medical Lab", "4 years", "₹4,80,000 / ₹4,00,000", "Total tuition"),
      fee("B.Sc Emergency & Trauma / Occupational Therapy", "4 years", "₹3,55,000 / ₹5,10,000", "Total tuition"),
    ],
    feeNotes: [
      "Boys hostel per year: premium double ₹1,80,000; premium triple ₹1,40,000; regular 4-sharing ₹1,05,000.",
      "Girls hostel per year: premium double ₹1,80,000; premium triple ₹1,30,000; regular triple ₹1,20,000; regular 4-sharing ₹1,05,000.",
    ],
  },
  "akash-group-institutions-bangalore": {
    annualFees: "₹1.5L–₹8.25L course total",
    feeBasis: "Total tuition",
    popularCourses: ["B.E.", "BBA", "BCA", "B.Com", "MBA", "MCA", "BPT", "MPT", "B.Pharm", "B.Sc Nursing", "Allied Health", "Paramedical Diploma"],
    topCourse: "B.E. CSE",
    keyHighlights: "On-campus teaching hospital; engineering, management, pharmacy, nursing, physiotherapy, allied health and paramedical programs",
    overview: "Akash Group of Institutions in Bangalore offers engineering and professional programs alongside health sciences supported by an on-campus teaching hospital.",
    coursesFees: [
      fee("B.E. CSE / AI & ML", "4 years", "₹8,25,000", "Total tuition"),
      fee("B.E. AI & Data Science", "4 years", "₹7,50,000", "Total tuition"),
      fee("B.E. Cyber Security / Data Science", "4 years", "₹6,60,000", "Total tuition"),
      fee("B.E. ISE / ECE / Mechanical", "4 years", "₹5,50,000 / ₹5,50,000 / ₹3,45,000", "Total tuition"),
      fee("MBA Advanced / MCA Advanced", "2 years", "₹3,60,000 / ₹2,90,000", "Total tuition"),
      fee("BBA Advanced / BBA Aviation / BCA Advanced", "3 years", "₹3,55,000", "Total tuition"),
      fee("B.Com Advanced", "3 years", "₹2,20,000", "Total tuition"),
      fee("BPT / MPT", "4.5 / 2 years", "₹6,65,000 / ₹3,25,000–₹4,75,000", "Total tuition"),
      fee("B.Pharm / B.Pharm Lateral Entry", "4 / 3 years", "₹5,45,000 / ₹3,75,000", "Total tuition", "", "Lateral: ₹1,75,000 in entry year, then ₹1,00,000 in each remaining year"),
      fee("B.Sc Nursing", "4 years", "₹6,95,000", "Total tuition"),
      fee("B.Sc Cardiac Care", "4 years", "₹7,75,000", "Total tuition"),
      fee("B.Sc Anaesthesia & OT / Medical Imaging", "4 years", "₹5,15,000", "Total tuition"),
      fee("B.Sc Perfusion / Neuroscience / Radiotherapy", "4 years", "₹4,45,000 / ₹4,25,000", "Total tuition"),
      fee("B.Sc Emergency / Respiratory / MLT / Renal Dialysis / Optometry", "4 years", "₹2,95,000–₹3,50,000", "Total tuition"),
      fee("Paramedical diplomas", "2–3 years", "₹1,50,000–₹2,05,000", "Total tuition"),
    ],
  },
  "east-west-group-institutions-bangalore": {
    annualFees: "₹2L–₹15L course total",
    feeBasis: "Total tuition or engineering/nursing package",
    popularCourses: ["B.E.", "BBA", "BCA", "B.Com", "MBA", "MCA", "B.Pharm", "D.Pharm", "Pharm.D", "GNM", "B.Sc Nursing", "Law", "Hotel Management"],
    topCourse: "B.E. CSE",
    keyHighlights: "Affiliated to VTU, RGUHS and Bangalore University; engineering packages include accommodation and food",
    overview: "East West Group of Institutions in Bangalore provides engineering, management, computing, pharmacy, nursing, law and hospitality programs under multiple university affiliations.",
    coursesFees: [
      fee("B.E. Computer Science", "4 years", "₹9,75,000", "Total package", "Tuition + accommodation + food"),
      fee("B.E. AI & ML / ISE / AI & DS / IoT / Cyber Security", "4 years", "₹8,60,000", "Total package", "Tuition + accommodation + food"),
      fee("B.E. ECE / Civil / Mechanical / EEE", "4 years", "₹7,15,000", "Total package", "Tuition + accommodation + food"),
      fee("D.Pharm / B.Pharm / Pharm.D / M.Pharm", "2–6 years", "₹2,55,000 / ₹6,65,000 / ₹15,00,000 / ₹5,00,000", "Total tuition"),
      fee("B.Com / BBA / BBA Aviation / BCA", "3 years", "₹3,50,000 / ₹3,15,000 / ₹4,65,000 / ₹4,65,000", "Total tuition"),
      fee("M.Com / MBA / MCA", "2 years", "₹2,00,000 / ₹5,25,000 / ₹4,75,000", "Total tuition"),
      fee("LLB / BBA-LLB / BHM", "3–5 years", "₹5,25,000 / ₹4,50,000 / ₹5,25,000", "Total tuition"),
      fee("GNM", "3 years", "₹5,10,000", "Total package"),
      fee("B.Sc Nursing - main / Yelahanka campus", "4 years", "₹11,50,000 / ₹10,50,000", "Total package"),
    ],
  },
  "cmr-institute-technology-cmrit-bangalore": {
    annualFees: "₹11L–₹14L B.E. total",
    feeBasis: "Total course package",
    popularCourses: ["B.E. CSE", "B.E. CSE Specialisations", "B.E. ECE", "B.E. Core"],
    topCourse: "B.E. CSE",
    coursesFees: [
      fee("B.E. CSE branches", "4 years", "₹14,00,000 with hostel / ₹11,00,000 without", "Total package / tuition", "Hostel included only in first amount"),
      fee("B.E. other branches", "4 years", "₹13,50,000 with hostel / ₹11,00,000 without", "Total package / tuition", "Hostel included only in first amount"),
    ],
  },
  "cmru-cmr-university-bangalore": {
    annualFees: "₹9.5L–₹11.5L B.Tech total",
    feeBasis: "Total course package",
    popularCourses: ["B.Tech CSE", "B.Tech AI & ML", "B.Tech Data Science", "B.Tech IT", "B.Tech ECE"],
    topCourse: "B.Tech CSE",
    coursesFees: [
      fee("B.Tech CSE", "4 years", "₹11,50,000 with hostel / ₹10,00,000 without", "Total package / tuition", "Hostel included only in first amount"),
      fee("B.Tech CSE-AI & ML / CSE-DS / CE / CS&T / IT / ECE", "4 years", "₹11,00,000 with hostel / ₹9,50,000 without", "Total package / tuition", "Hostel included only in first amount"),
    ],
  },
  "alliance-university-bangalore": {
    annualFees: "₹7.1L–₹17.2L total",
    feeBasis: "Total tuition; B.Tech CSE amount includes hostel package",
    popularCourses: ["B.Tech", "BCA", "MCA", "BBA", "B.Com", "MBA", "Law", "B.Des", "Liberal Arts", "B.Sc"],
    topCourse: "B.Tech CSE",
    keyHighlights: "Private university in Bangalore; management, engineering, computing, law, design, liberal arts and sciences",
    coursesFees: [
      fee("B.Tech CSE - all specialisations", "4 years", "₹17,20,000", "Total package", "Tuition + hostel package"),
      fee("B.Tech IT / Aerospace", "4 years", "₹15,20,000", "Total tuition"),
      fee("B.Tech Civil / ECE / Mechanical / EEE", "4 years", "₹12,20,000", "Total tuition"),
      fee("BCA / MCA", "3 / 2 years", "₹13,20,000 / ₹7,10,000", "Total tuition"),
      fee("BBA / B.Com / MBA", "3 / 3 / 2 years", "₹14,20,000 / ₹12,20,000 / ₹12,10,000", "Total tuition"),
      fee("LLB / B.Des", "3 / 4 years", "₹10,90,000 / ₹16,20,000", "Total tuition"),
      fee("Liberal Arts / B.Sc", "3–4 years", "₹15,20,000 / ₹12,20,000", "Total tuition"),
    ],
  },
  "siddaganga-medical-college-tumkur": {
    name: "Siddaganga Institutions, Tumakuru",
    type: "Engineering & Health Sciences Institutions",
    annualFees: "₹2.25L–₹3L/year engineering",
    feeBasis: "Engineering per year; allied health total tuition",
    popularCourses: ["B.E. CSE", "B.E. ECE", "B.E. ISE", "B.E. AI & ML", "B.E. Civil", "B.E. Biotechnology", "Allied Health"],
    topCourse: "B.E. CSE",
    keyHighlights: "Engineering options and supported allied health programs in Tumakuru; fee basis differs by faculty",
    overview: "Siddaganga institutions in Tumakuru offer engineering and supported allied health study options. Engineering figures are yearly tuition, while allied health figures are total four-year tuition.",
    coursesFees: [
      fee("B.E. CSE", "4 years", "₹3,00,000/year", "Yearly tuition"),
      fee("B.E. ECE / ISE / AI & ML", "4 years", "₹2,75,000/year", "Yearly tuition"),
      fee("B.E. Biotechnology / Chemical / Civil", "4 years", "₹2,25,000/year", "Yearly tuition"),
      fee("B.Sc Cardiac Care", "4 years", "₹6,25,000", "Total tuition"),
      fee("B.Sc Anaesthesia / Medical Imaging", "4 years", "₹4,45,000", "Total tuition"),
      fee("B.Sc Emergency / MLT / Renal Dialysis", "4 years", "₹3,75,000", "Total tuition"),
    ],
  },
  "nagarjuna-college-engineering-bangalore": {
    annualFees: "₹9L–₹11L total package",
    feeBasis: "Total package",
    popularCourses: ["B.E. CSE", "B.E. AI & ML", "B.E. Data Science", "B.E. Cyber Security", "B.E. ISE", "B.E. ECE", "B.E. Civil"],
    topCourse: "B.E. CSE",
    coursesFees: [
      fee("B.E. CSE / AI & ML / Data Science / Cyber Security", "4 years", "₹11,00,000", "Total package", "Tuition + 3-sharing hostel"),
      fee("B.E. ISE / ECE", "4 years", "₹10,00,000", "Total package", "Tuition + 3-sharing hostel"),
      fee("B.E. Civil", "4 years", "₹9,00,000", "Total package", "Tuition + 3-sharing hostel"),
    ],
  },
  "chennai-institute-technology-chennai": {
    annualFees: "₹8.9L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.E./B.Tech CSE", "Cyber Security", "AI & ML", "ECE", "Biomedical", "EEE", "Mechanical", "Civil", "IT", "AI & DS", "CSBS"],
    topCourse: "B.E./B.Tech CSE",
    coursesFees: [fee("B.E./B.Tech supported branches", "4 years", "₹8,90,000", "Total package", "Tuition + 3/4-sharing AC hostel + food")],
  },
  "easwari-engineering-college-chennai": {
    annualFees: "₹3L–₹8L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.Tech CSE", "B.Tech IT", "B.Tech ECE", "Biomedical", "Biotechnology", "Mechanical", "Civil", "EEE", "Robotics", "MBA", "MCA", "M.E."],
    topCourse: "B.Tech CSE",
    coursesFees: [
      fee("B.Tech CSE / IT / ECE", "4 years", "₹8,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("B.Tech Biomedical / Biotech / Mechanical / Auto / Civil / EEE / Robotics", "4 years", "₹6,50,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("MBA / MCA", "2 years", "₹5,00,000", "Total package"),
      fee("M.E.", "2 years", "₹3,00,000", "Total package"),
    ],
  },
  "mahendra-engineering-college-salem": {
    annualFees: "₹5L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.Tech/B.E. CSE", "AI", "IT", "Aerospace", "Civil", "Mechanical", "ECE"],
    topCourse: "B.Tech/B.E. CSE",
    coursesFees: [fee("B.Tech/B.E. supported branches", "4 years", "₹5,00,000", "Total package", "Tuition + hostel + mess")],
  },
  "vel-tech-university-chennai": {
    annualFees: "₹3.75L–₹8.95L total",
    feeBasis: "Total course fee with hostel",
    popularCourses: ["B.Tech CSE", "AI & ML", "AI & DS", "Cyber Security", "IT", "Biomedical", "Biotechnology", "M.Tech", "BBA", "MBA"],
    topCourse: "B.Tech CSE",
    coursesFees: [
      fee("B.Tech CSE - AI & ML / AI & DS / Cyber Security", "4 years", "₹8,95,000", "Total fee", "Hostel included"),
      fee("B.Tech Core / IT / Biomedical / Biotechnology", "4 years", "₹6,95,000", "Total fee", "Hostel included"),
      fee("M.Tech", "2 years", "₹3,75,000", "Total fee", "Hostel included"),
      fee("BBA / MBA", "3 / 2 years", "₹4,50,000", "Total fee", "Hostel included"),
    ],
  },
  "srm-institute-science-technology-chennai": {
    name: "SRM Institute of Science & Technology - Ramapuram Campus",
    annualFees: "₹5L–₹12L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.Tech CSE", "IT", "ECE", "Core Engineering", "B.Arch", "B.Sc", "B.Com", "BBA", "BCA", "MBA", "B.Des", "MCA", "M.Tech"],
    topCourse: "B.Tech CSE",
    coursesFees: [
      fee("B.Tech CSE / IT / ECE", "4 years", "₹12,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("B.Tech Core / B.Arch", "4–5 years", "₹10,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("B.Sc / B.Com / BBA / BCA / MBA / B.Des", "2–4 years", "₹6,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("MCA / M.Tech", "2 years", "₹5,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
    ],
  },
  "srm-institute-science-technology-trichy": {
    annualFees: "₹4.25L–₹10L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.Tech CSE", "IT", "ECE", "Mechanical", "EEE", "Biomedical", "Biotechnology", "B.Sc Nursing", "Allied Health", "MBA", "MCA"],
    topCourse: "B.Tech CSE",
    coursesFees: [
      fee("B.Tech CSE", "4 years", "₹10,00,000", "Total package", "Tuition + 3-sharing AC hostel + food + free iPad"),
      fee("B.Tech IT / ECE / Mechanical / EEE / Biomedical / Biotechnology", "4 years", "₹8,00,000", "Total package", "Tuition + 3-sharing AC hostel + food + free iPad"),
      fee("B.Sc Nursing", "4 years", "₹10,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("Allied Health UG / PG", "3–4 / 2 years", "₹6,00,000 / ₹4,00,000", "Total package"),
      fee("MBA / MCA", "2 years", "₹4,50,000 / ₹4,25,000", "Total package"),
    ],
  },
  "srm-trp-engineering-college-trichy": {
    annualFees: "₹1.5L–₹6L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.E. CSE", "IT", "ECE", "Mechanical", "EEE", "MBA", "M.E."],
    topCourse: "B.E. CSE",
    coursesFees: [
      fee("UG CSE / IT / ECE", "4 years", "₹6,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("UG Mechanical / EEE", "4 years", "₹5,00,000", "Total package", "Tuition + 3-sharing AC hostel + food"),
      fee("MBA", "2 years", "₹3,00,000", "Total package"),
      fee("M.E.", "2 years", "₹1,50,000", "Total package"),
    ],
  },
  "rathinam-technical-campus-coimbatore": {
    annualFees: "₹5.75L total package",
    feeBasis: "Total course package",
    popularCourses: ["B.E./B.Tech CSE", "AI", "IT", "Biotechnology", "Mechanical", "ECE"],
    topCourse: "B.E./B.Tech CSE",
    coursesFees: [fee("B.E./B.Tech supported branches", "4 years", "₹5,75,000", "Total package", "Tuition + 3-sharing hostel + food")],
  },
  "sharda-university-greater-noida-delhi": {
    annualFees: "₹80K–₹4.75L first year",
    feeBasis: "First-year tuition; progressive yearly model",
    popularCourses: ["B.Tech", "BCA", "MCA", "B.Sc", "BBA", "B.Com", "MBA", "Media", "Law", "B.Sc Nursing", "B.Pharm", "Allied Health"],
    topCourse: "B.Tech CSE",
    keyHighlights: "Progressive annual tuition; 2026-27 official CSE starts at ₹2.95L; hostel and mandatory university charges are extra",
    overview: "Sharda University in Greater Noida uses a progressive annual tuition model, so later-year tuition rises from the first-year amount. The table shows starting first-year tuition unless stated otherwise.",
    coursesFees: [
      fee("B.Tech CSE", "4 years", "₹2,95,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Tech CSE specialisations - AI/ML, Data Science, Cyber Security", "4 years", "₹3,05,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Tech IT", "4 years", "₹2,00,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Tech EEE / ECE / Mechanical / Civil", "4 years", "₹1,40,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Tech EV / Semiconductor / Robotics", "4 years", "₹1,50,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Tech Biotechnology / Food Technology", "4 years", "₹2,15,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("BCA / B.Sc Computing", "3 years", "₹1,85,000 / ₹1,25,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("MCA / M.Tech", "2 years", "₹1,95,000 / ₹1,13,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("BBA / B.Com", "3 years", "₹2,40,000 / ₹1,80,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("MBA", "2 years", "₹4,25,000–₹4,75,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("BA Media / B.Sc Animation, VFX & Gaming", "3 years", "₹1,85,000 / ₹1,95,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("BBA LLB / BA LLB", "5 years", "₹2,55,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Sc Nursing", "4 years", "₹2,60,000 first year", "Progressive yearly tuition", "Tuition only"),
      fee("B.Pharm / Allied Health B.Sc", "4 years", "₹2,30,000–₹2,50,000 / ₹1,50,000–₹2,10,000 first year", "Progressive yearly tuition", "Tuition only"),
    ],
    feeSource: "AIMS partner sheet; Sharda official 2026-27 fee structure checked",
    feeSourceUrl: "https://suat.sharda.ac.in/fee-structure/",
    feeNotes: [
      "Hostel is extra.",
      "Official 2026-27 page lists a one-time ₹30,000 admission fee, ₹6,000 examination fee per semester and ₹15,000 annual registration from the second year.",
      "Later-year tuition rises under the progressive fee model; use the official course schedule for the full degree total.",
    ],
  },
  "parul-university-vadodara-gujarat": {
    annualFees: "₹1.65L–₹13L total after scholarship",
    feeBasis: "Total tuition after stated 50% SAARC scholarship",
    popularCourses: ["B.Tech", "Diploma Engineering", "BBA", "BCA", "B.Com", "MBA", "MCA", "M.Tech", "B.Pharm", "Pharm.D", "GNM", "B.Sc Nursing", "BPT", "Allied Health", "Law", "Design", "Architecture"],
    topCourse: "B.Tech",
    keyHighlights: "Partner figures reflect total tuition after a stated 50% SAARC scholarship; hostel extra",
    overview: "Parul University in Vadodara offers engineering, management, computing, pharmacy, nursing, allied health, law and design programs. Listed amounts reflect the supplied SAARC scholarship estimate.",
    coursesFees: [
      fee("B.Tech / Diploma Engineering", "4 / 3 years", "₹4,00,000–₹4,40,000 / ₹1,65,000", "Total tuition after scholarship"),
      fee("BBA / BCA / B.Com", "3 years", "₹2,40,000–₹3,20,000 / ₹1,80,000–₹2,40,000", "Total tuition after scholarship"),
      fee("MBA / MCA / M.Tech / M.Sc IT", "2 years", "₹2,00,000", "Total tuition after scholarship"),
      fee("B.Pharm / B.Sc Nursing / BPT", "4–4.5 years", "₹4,40,000", "Total tuition after scholarship"),
      fee("Pharm.D", "6 years", "₹13,00,000", "Total tuition after scholarship"),
      fee("GNM / Allied Health B.Sc", "3 / 4 years", "₹2,40,000", "Total tuition after scholarship"),
      fee("LLB / B.Des / B.Arch", "3 / 4 / 5 years", "₹2,10,000 / ₹4,40,000–₹5,40,000 / ₹6,75,000", "Total tuition after scholarship"),
    ],
    feeNotes: ["Hostel is extra.", "Scholarship continuation and eligibility must be confirmed in the written offer."],
  },
  "srm-university-amaravati-andhra-pradesh": {
    annualFees: "₹10L–₹12L engineering package",
    feeBasis: "Nepal package or yearly tuition depending on row",
    popularCourses: ["B.Tech CSE", "Core Engineering", "B.Sc", "BA", "B.Com", "BBA", "MBA"],
    topCourse: "B.Tech CSE",
    keyHighlights: "Global-standard Amaravati campus; supplied Nepal packages and SAARC scholarship figures; confirm the current scholarship letter",
    coursesFees: [
      fee("B.Tech CSE & specialisations", "4 years", "₹12,00,000 AC hostel / ₹11,00,000 non-AC", "Nepal total package", "Tuition + selected hostel"),
      fee("B.Tech Core - Mechanical / Civil / ECE / EEE", "4 years", "₹11,00,000 AC hostel / ₹10,00,000 non-AC", "Nepal total package", "Tuition + selected hostel"),
      fee("B.Tech CSE scholarship tuition", "4 years", "₹1,45,350–₹1,77,650/year", "Yearly tuition after stated scholarship"),
      fee("B.Tech Core scholarship tuition", "4 years", "₹1,36,850/year", "Yearly tuition after stated scholarship"),
      fee("B.Sc / BA / B.Com", "3–4 years", "₹3,82,500/year", "Yearly tuition", "Tuition only", "Figure supplied by partner sheet; confirm exact invoice"),
      fee("BBA / MBA", "3 / 2 years", "₹5,99,250/year / ₹1,66,175/year", "Yearly tuition", "Tuition only", "Figures supplied by partner sheet; confirm exact invoice"),
    ],
  },
  "maharishi-markandeshwar-mm-university-ambala": {
    annualFees: "₹30K–₹75K incentive tuition total",
    feeBasis: "Course-duration incentive; hostel extra",
    popularCourses: ["B.Tech", "BBA", "BCA", "B.Com", "Hotel Management", "B.Sc Nursing", "Paramedical", "B.Pharm", "Pharm.D", "GNM", "Law", "MBA", "M.Tech", "M.Pharm", "MPT", "M.Sc Nursing", "MCA"],
    topCourse: "B.Tech CSE",
    keyHighlights: "Supplied Nepal student course-duration incentive figures; hostel and other charges extra; written scholarship confirmation essential",
    overview: "MM University in Mullana, Haryana offers engineering, management, computing, health sciences, pharmacy, nursing and law. The unusually low figures shown are supplied course-duration incentive tuition amounts for Nepali students and require written confirmation.",
    coursesFees: [
      fee("B.Tech CSE / AI / Biotechnology / Core", "4 years", "₹65,000–₹75,000", "Total incentive tuition", "Tuition only; hostel extra"),
      fee("BBA / BCA / B.Com / Hotel Management", "3–4 years", "₹50,000", "Total incentive tuition", "Tuition only; hostel extra"),
      fee("B.Sc Nursing / Paramedical", "3–4 years", "₹50,000", "Total incentive tuition", "Tuition only; hostel extra"),
      fee("B.Pharm / Pharm.D / GNM", "4 / 6 / 3 years", "₹50,000 / ₹70,000 / ₹40,000", "Total incentive tuition", "Tuition only; hostel extra"),
      fee("Law integrated programs", "5 years", "₹50,000", "Total incentive tuition", "Tuition only; hostel extra"),
      fee("MBA / M.Tech / M.Pharm / MPT / M.Sc Nursing", "2 years", "₹50,000", "Total incentive tuition", "Tuition only; hostel extra"),
      fee("MCA", "2 years", "₹30,000", "Total incentive tuition", "Tuition only; hostel extra"),
    ],
    feeNotes: ["These incentive amounts are not a full cost of attendance. Hostel, food, examinations, registration and other charges may apply."],
  },
  "dhanvantari-group-institutions-bangalore": {
    annualFees: "₹1.8L–₹9.5L course total",
    feeBasis: "Total tuition unless stated",
    popularCourses: ["GNM", "B.Sc Nursing", "Allied Health", "BPT", "B.Pharm", "D.Pharm"],
    topCourse: "B.Sc Nursing",
    coursesFees: [
      fee("GNM", "3 years", "₹4,50,000", "Total tuition", "Tuition only"),
      fee("B.Sc Nursing", "4 years", "₹9,50,000", "Total tuition"),
      fee("Allied Health B.Sc", "4 years", "₹5,80,000–₹6,80,000", "Total tuition"),
      fee("BPT", "4.5 years", "₹8,40,000", "Total tuition"),
      fee("B.Pharm / D.Pharm", "4 / 2 years", "₹7,90,000 / ₹1,80,000", "Total tuition"),
    ],
    feeNotes: gnmAuxiliaryNotes,
  },
  "sb-group-institutions-bangalore": {
    annualFees: "₹4L GNM total tuition",
    feeBasis: "Total tuition",
    popularCourses: ["GNM"],
    topCourse: "GNM",
    coursesFees: [fee("GNM", "3 years", "₹4,00,000", "Total tuition", "Tuition only")],
    feeNotes: gnmAuxiliaryNotes,
  },
};

function newUniversity({ name, slug, city = "Bangalore", type, courses, summary, basis, highlights, rows, notes = [], website = "", sourceUrl = "" }) {
  return {
    name,
    image: null,
    imgAlt: `${name} logo`,
    city,
    state: "Karnataka",
    type,
    naacGrade: "—",
    nirfRanking: "—",
    popularCourses: courses,
    annualFees: summary,
    feeBasis: basis,
    feeUpdatedAt: updatedAt,
    feeSource: partnerSource,
    feeSourceUrl: sourceUrl,
    feeNotes: [...commonFeeNotes, ...notes],
    highestPackage: "Contact for details",
    keyHighlights: highlights,
    officialWebsite: website,
    slug,
    metaTitle: `${name} Admission 2026 - Courses & Fees`,
    metaDescription: `Explore supported courses, indicative fees and admission guidance for ${name} from AIMS Global Butwal.`,
    isFeatured: false,
    status: "Active",
    established: "—",
    topCourse: courses[0] || "Contact for courses",
    overview: `${name} is located in ${city}, Karnataka. ${highlights}`,
    admissionSteps: [
      "Share academic documents and preferred course with AIMS Global",
      "Confirm the current fee basis, inclusions and eligibility",
      "Submit the official application and required documents",
      "Review the written offer, refund terms and payment schedule",
      "Complete admission and accommodation arrangements",
    ],
    documentsRequired: commonDocuments,
    placements: { averagePackage: "Contact for details", highestPackage: "Contact for details", recruiters: [] },
    coursesFees: rows,
  };
}

const newRecords = [
  newUniversity({
    name: "JAIN (Deemed-to-be University)", slug: "jain-university-bangalore", type: "Deemed-to-be University",
    courses: ["B.Tech", "B.Com", "BBA", "MBA", "BCA", "MCA", "B.Sc", "Allied Health", "B.Des", "Law"],
    summary: "₹1.26L–₹7.5L/year", basis: "SAARC special tuition per year",
    highlights: "SAARC special yearly tuition across engineering, management, computing, sciences, allied health, design and law",
    website: "https://www.jainuniversity.ac.in",
    rows: [
      fee("B.Tech CSE / AI & ML or Data Engineering / Aerospace or Core", "4 years", "₹3,60,000 / ₹5,00,000 / ₹2,85,000 per year", "Yearly SAARC package", "Hostel included in supplied B.Tech figures"),
      fee("B.Com / BBA / MBA", "3 / 3 / 2 years", "₹1,90,000–₹2,50,000 / ₹2,25,000–₹3,65,000 / ₹4,00,000–₹7,50,000 per year", "Yearly SAARC tuition"),
      fee("BCA / MCA / B.Sc", "3 / 2 / 3–4 years", "₹1,75,000–₹2,45,000 / ₹1,90,000–₹2,90,000 / ₹1,26,000–₹1,99,000 per year", "Yearly SAARC tuition"),
      fee("Allied Health B.Sc / B.Des / Law", "3–5 years", "₹1,70,000–₹1,90,000 / ₹4,65,000 / ₹2,35,000–₹2,90,000 per year", "Yearly SAARC tuition"),
    ],
  }),
  newUniversity({
    name: "RV University", slug: "rv-university-bangalore", type: "Private University",
    courses: ["B.Tech CSE", "B.Sc Computer Science", "BCA", "B.Des", "BBA", "B.Com", "Allied Health", "Law", "MBA"],
    summary: "₹72K–₹3.75L tuition", basis: "Tuition; mandatory skill/exam fees extra",
    highlights: "Course-specific tuition with mandatory skill, other and examination charges; fees vary by admission route",
    website: "https://rvu.edu.in",
    sourceUrl: "https://socse.rvu.edu.in/programmes/undergraduate-programmes/btech-hon-computer-science-and-engineering-program/",
    rows: [
      fee("B.Tech CSE - AI & ML / Data Science / Cyber Security", "4 years", "₹3,00,000 tuition + ₹50,000 fees", "Tuition + mandatory charges", "₹50,000 exam/skill charge per supplied direct-route sheet"),
      fee("B.Sc Computer Science / Data Science", "3–4 years", "₹1,05,000 tuition + ₹21,000 fees", "Tuition + mandatory charges"),
      fee("BCA Hons", "3–4 years", "₹1,50,000 tuition + ₹21,000 fees", "Tuition + mandatory charges"),
      fee("B.Des", "4 years", "₹2,40,000 tuition + ₹31,000 fees", "Tuition + mandatory charges"),
      fee("BBA / B.Com / Allied Health B.Sc / Law", "3–5 years", "₹72,000–₹1,50,000 tuition + ₹16,000 fees", "Tuition + mandatory charges"),
      fee("MBA", "2 years", "₹3,30,000–₹3,75,000 tuition", "Tuition", "Mandatory charges extra"),
    ],
    notes: ["Official RVU documents show different skill/exam charges for KEA seats; confirm the exact admission route and offer letter."],
  }),
  newUniversity({
    name: "Karnataka College Group of Institutions (KCGI)", slug: "karnataka-college-group-institutions-bangalore", type: "College Group",
    courses: ["B.Com", "BBA", "BCA", "B.Sc Renal Dialysis", "LLB", "BA LLB", "B.Com LLB"],
    summary: "₹2.45L–₹5.5L total tuition", basis: "Total tuition",
    highlights: "Management, computing, law and renal dialysis programs in Bangalore",
    rows: [
      fee("B.Com / BBA", "3 years", "₹3,50,000", "Total tuition"),
      fee("BCA", "3 years", "₹3,70,000", "Total tuition"),
      fee("B.Sc Renal Dialysis", "4 years", "₹3,20,000–₹5,50,000", "Total tuition"),
      fee("LLB", "3 years", "₹2,45,000", "Total tuition"),
      fee("BA LLB / B.Com LLB", "5 years", "₹3,80,000", "Total tuition"),
    ],
  }),
  newUniversity({
    name: "NSS Group of Institutions", slug: "nss-group-institutions-bangalore", type: "Nursing & Paramedical College Group",
    courses: ["GNM", "B.Sc Nursing", "PB B.Sc Nursing", "M.Sc Nursing", "Paramedical Diploma", "D.Pharm"],
    summary: "₹1.4L–₹5.95L total tuition", basis: "Total tuition",
    highlights: "Nursing, paramedical and pharmacy options for Nepal/SAARC students",
    rows: [
      fee("GNM / B.Sc Nursing", "3 / 4 years", "₹2,90,000 / ₹5,95,000", "Total tuition"),
      fee("PB B.Sc Nursing / M.Sc Nursing", "2 years", "₹2,25,000 / ₹2,50,000", "Total tuition"),
      fee("Paramedical diplomas / D.Pharm", "2–3 / 2 years", "₹2,50,000 / ₹1,40,000", "Total tuition"),
    ],
    notes: gnmAuxiliaryNotes,
  }),
  newUniversity({
    name: "Noor College of Nursing", slug: "noor-college-nursing-bangalore", type: "Nursing College",
    courses: ["GNM", "B.Sc Nursing"], summary: "₹3.95L–₹8.6L package", basis: "Total package",
    highlights: "Nursing programs with supplied hostel-and-food packages",
    rows: [
      fee("GNM", "3 years", "₹3,95,000", "Total package", "Tuition + hostel + food"),
      fee("B.Sc Nursing", "4 years", "₹8,60,000", "Total package", "Confirm exact inclusions"),
    ],
  }),
  newUniversity({
    name: "New Sarvodaya School of Nursing", slug: "new-sarvodaya-school-nursing-bangalore", type: "Nursing School",
    courses: ["GNM"], summary: "₹4.4L GNM package", basis: "Total package",
    highlights: "GNM nursing package with hostel and food",
    rows: [fee("GNM", "3 years", "₹4,40,000", "Total package", "Tuition + hostel + food")],
  }),
  newUniversity({
    name: "PadmaShree Institute of Nursing", slug: "padmashree-institute-nursing-bangalore", type: "Nursing Institute",
    courses: ["GNM"], summary: "₹4.5L GNM package", basis: "Total package",
    highlights: "GNM nursing package with hostel and food",
    rows: [fee("GNM", "3 years", "₹4,50,000", "Total package", "Tuition + hostel + food")],
  }),
];

const universities = JSON.parse(await readFile(dataFile, "utf8"));
const bySlug = new Map(universities.map((university) => [university.slug, university]));

for (const [slug, update] of Object.entries(updates)) {
  const university = bySlug.get(slug);
  if (!university) throw new Error(`Missing university for fee update: ${slug}`);
  Object.assign(university, update, {
    feeUpdatedAt: updatedAt,
    feeSource: update.feeSource || partnerSource,
    feeNotes: [...commonFeeNotes, ...(update.feeNotes || [])],
    documentsRequired: commonDocuments,
    metaTitle: `${update.name || university.name} Admission 2026 - Courses & Fees`,
    metaDescription: `Explore supported courses, fee basis and admission guidance for ${update.name || university.name} with AIMS Global Butwal.`,
  });
}

for (const record of newRecords) {
  const existing = bySlug.get(record.slug);
  if (existing) {
    Object.assign(existing, record, {
      image: existing.image || record.image,
      imgAlt: existing.image ? existing.imgAlt : record.imgAlt,
      officialWebsite: record.officialWebsite || existing.officialWebsite,
    });
  }
  else universities.push(record);
}

universities.sort((a, b) => {
  const stateCompare = a.state.localeCompare(b.state);
  return stateCompare || a.city.localeCompare(b.city) || a.name.localeCompare(b.name);
});

await writeFile(dataFile, `${JSON.stringify(universities, null, 2)}\n`);
console.log(`Updated ${Object.keys(updates).length} institutions and upserted ${newRecords.length} new institutions.`);
