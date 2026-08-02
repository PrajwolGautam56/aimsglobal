import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export function CourseCard({ name, slug, icon, description }: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`}>
      <Card className="min-w-[220px] transition-all hover:-translate-y-1 hover:shadow-md">
        <CardHeader className="pb-2">
          <span className="text-3xl">{icon}</span>
          <CardTitle className="text-lg">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-muted line-clamp-2">{description}</p>
          <p className="mt-3 text-sm font-semibold text-primary-light">Explore →</p>
        </CardContent>
      </Card>
    </Link>
  );
}
