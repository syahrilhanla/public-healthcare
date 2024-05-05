"use client"

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

/**
 * Custom hook for managing URL query strings.
 *
 * Provides two functions, `createQueryString` and `removeQueryString`, which
 * allow you to add and remove query parameters from the current URL.
 *
 * @returns {Object} An object containing the `createQueryString` and `removeQueryString` functions.
 */
export const useQueryString = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  /**
  * Adds or updates a query parameter in the current URL.
  *
  * @param {string} name - The name of the query parameter to add or update.
  * @param {string} value - The value of the query parameter to add or update.
  */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router]
  );

  /**
   * Removes a query parameter from the current URL.
   *
   * @param {string} name - The name of the query parameter to remove.
   */
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