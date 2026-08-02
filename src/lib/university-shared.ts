export interface CourseFee {
  course: string;
  duration: string;
  annualFee: string;
  feeBasis?: string;
  inclusions?: string;
  eligibility: string;
  entranceExam: string;
  notes?: string;
}

export interface University {
  name: string;
  image: string | null;
  imgAlt: string;
  city: string;
  state: string;
  type: string;
  naacGrade: string;
  nirfRanking: string;
  popularCourses: string[];
  annualFees: string;
  feeBasis?: string;
  feeUpdatedAt?: string;
  feeSource?: string;
  feeSourceUrl?: string;
  feeNotes?: string[];
  highestPackage: string;
  keyHighlights: string;
  officialWebsite: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  isFeatured: boolean;
  status: string;
  established: string;
  topCourse: string;
  overview: string;
  admissionSteps: string[];
  documentsRequired: string[];
  placements: {
    averagePackage: string;
    highestPackage: string;
    recruiters: string[];
  };
  coursesFees: CourseFee[];
}

export function getNaacBadgeClass(grade: string): string {
  if (grade.includes("A++")) return "bg-amber-100 text-amber-800 border-amber-300";
  if (grade.includes("A+")) return "bg-blue-100 text-blue-800 border-blue-300";
  if (grade.includes("A")) return "bg-green-100 text-green-800 border-green-300";
  return "bg-gray-100 text-gray-600 border-gray-300";
}
