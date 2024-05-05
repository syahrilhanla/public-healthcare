"use client"

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router]
  );

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router]
  );

  return { createQueryString, removeQueryString };
};