"use client";
import type { ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import { UniversitiesPageClient } from "@/components/UniversitiesPageClient";

type Props = Omit<
  ComponentProps<typeof UniversitiesPageClient>,
  "initialSearch" | "initialState" | "initialCourseType"
>;

export function UniversitiesWithParams(props: Props) {
  const params = useSearchParams();
  return (
    <UniversitiesPageClient
      {...props}
      initialSearch={params.get("search") || ""}
      initialState={params.get("state") || "All"}
      initialCourseType={params.get("courseType") || "All"}
    />
  );
}
