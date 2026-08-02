"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { UniversityCard } from "@/components/UniversityCard";
import { type University } from "@/lib/university-shared";

const PER_PAGE = 12;

interface Props {
  universities: University[];
  initialSearch?: string;
  initialState?: string;
  initialCourseType?: string;
}

function parseFeeMin(fees: string): number {
  const match = fees.match(/₹?([\d.]+)\s*([kKlL])/);
  if (!match) return 999;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return unit === "l" ? value : value / 100;
}

const COURSE_TYPE_KEYWORDS: Record<string, string[]> = {
  Engineering: ["b.tech", "b.e.", "m.tech", "engineering", "cse", "ece"],
  "Health & Allied": ["nursing", "pharm", "paramedical", "allied", "physiotherapy", "gnm"],
  Management: ["mba", "bba", "mca", "management"],
  Law: ["law", "llb"],
  Design: ["design", "architecture"],
};

export function UniversitiesPageClient({
  universities,
  initialSearch = "",
  initialState = "All",
  initialCourseType = "All",
}: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [state, setState] = useState(initialState);
  const [courseType, setCourseType] = useState(initialCourseType);
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("ranking");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let results = [...universities];
    const q = search.toLowerCase().trim();

    if (q) {
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.state.toLowerCase().includes(q) ||
          u.popularCourses.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (state !== "All") {
      results = results.filter((u) => u.state.toLowerCase().includes(state.toLowerCase()));
    }

    if (courseType !== "All") {
      const keywords = COURSE_TYPE_KEYWORDS[courseType] || [];
      results = results.filter((u) => {
        const haystack = u.popularCourses.join(" ").toLowerCase();
        return keywords.some((kw) => haystack.includes(kw));
      });
    }

    if (budget !== "All") {
      results = results.filter((u) => {
        const min = parseFeeMin(u.annualFees);
        if (budget === "Under ₹2L") return min < 2;
        if (budget === "₹2L-₹5L") return min >= 2 && min <= 5;
        if (budget === "₹5L+") return min > 5;
        return true;
      });
    }

    if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "fees") {
      results.sort((a, b) => parseFeeMin(a.annualFees) - parseFeeMin(b.annualFees));
    }

    return results;
  }, [universities, search, state, courseType, budget, sort]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasPrevious = page > 1;
  const hasNext = page * PER_PAGE < filtered.length;

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        state={state}
        onStateChange={(v) => { setState(v); setPage(1); }}
        courseType={courseType}
        onCourseTypeChange={(v) => { setCourseType(v); setPage(1); }}
        budget={budget}
        onBudgetChange={(v) => { setBudget(v); setPage(1); }}
        sort={sort}
        onSortChange={(v) => { setSort(v); setPage(1); }}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((uni) => (
            <UniversityCard key={uni.slug} university={uni} />
          ))}
        </div>
        {paginated.length === 0 && (
          <p className="py-20 text-center text-text-muted">No universities match your filters.</p>
        )}
        {(hasPrevious || hasNext) && (
          <div className="mt-10 flex justify-center gap-3">
            {hasPrevious && (
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-medium text-text-primary transition-colors hover:bg-bg-light"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>
            )}
            {hasNext && (
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
