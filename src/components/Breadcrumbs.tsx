import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SchemaOrg } from "@/components/SchemaOrg";
import { SITE_URL } from "@/lib/constants";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href && { item: new URL(item.href, SITE_URL).toString() }),
    })),
  };

  return (
    <>
      <SchemaOrg data={schema} />
      <nav aria-label="Breadcrumb" className="border-b border-border bg-white">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 text-sm text-text-muted sm:px-6 lg:px-8">
          {items.map((item, index) => (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-primary-light">
                  {item.name}
                </Link>
              ) : (
                <span className="text-text-primary" aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
