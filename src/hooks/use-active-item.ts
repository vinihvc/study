import React from "react";

/**
 * Hook to track which heading is currently active based on scroll position
 * @param itemIds - Array of heading IDs to observe
 * @returns The ID of the currently active heading, or null if none
 */
export const useActiveItem = (itemIds: string[]): string | null => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (itemIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    for (const id of itemIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds) {
        const element = document.getElementById(id);

        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
};
