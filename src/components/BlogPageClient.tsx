"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { type BlogPost } from "@/lib/blogs";

const PER_PAGE = 9;

export function BlogPageClient({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (category === "All") return posts;
    return posts.filter((p) => p.category === category);
  }, [posts, category]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <div className="border-b border-border bg-white py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === cat ? "bg-primary text-white" : "bg-bg-light text-text-primary hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`h-10 w-10 rounded-lg text-sm font-medium ${
                  p === page ? "bg-primary text-white" : "border border-border bg-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
