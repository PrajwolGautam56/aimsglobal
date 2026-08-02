import Link from "next/link";
import { MapPin, IndianRupee } from "lucide-react";
import { SheetImage } from "@/components/SheetImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type University, getNaacBadgeClass } from "@/lib/university-shared";

export function UniversityCard({ university }: { university: University }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <SheetImage
        src={university.image}
        alt={university.imgAlt}
        variant="university"
        containerClassName="h-40 w-full border-b border-border"
      />
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg">{university.name}</CardTitle>
          {university.naacGrade !== "—" && (
            <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${getNaacBadgeClass(university.naacGrade)}`}>
              NAAC {university.naacGrade}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1">
            <MapPin className="h-3 w-3" /> {university.city}
          </Badge>
          <Badge variant="outline">{university.state}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {university.popularCourses.slice(0, 3).map((course) => (
            <Badge key={course} variant="default">{course}</Badge>
          ))}
        </div>
        <p className="flex items-center gap-1 text-sm text-text-muted">
          <IndianRupee className="h-4 w-4" /> {university.annualFees}
        </p>
        <p className="line-clamp-2 text-sm text-text-muted">{university.keyHighlights}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/universities/${university.slug}`}>View Details</Link>
        </Button>
        <Button variant="accent" className="flex-1" asChild>
          <Link href={`/contact?university=${encodeURIComponent(university.name)}`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
