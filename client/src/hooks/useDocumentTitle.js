import { useEffect } from "react";

const SITE_NAME = "Online Auction";

/**
 * Sets the document title for the current page.
 * Appends the site name: "Page Title | Online Auction"
 * Resets to default on unmount.
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = prev;
    };
  }, [title]);
};
