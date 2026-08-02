import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { SheetImage } from "@/components/SheetImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type BlogPost } from "@/lib/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <SheetImage
        src={post.image}
        alt={post.imgAlt}
        variant="blog"
        containerClassName="h-44 w-full border-b border-border"
      />
      <CardHeader>
        <Badge variant="accent" className="w-fit">{post.category}</Badge>
        <CardTitle className="line-clamp-2 text-base">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-text-muted">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.publishedAt}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime} min read</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary-light hover:underline">
          Read More →
        </Link>
      </CardFooter>
    </Card>
  );
}
