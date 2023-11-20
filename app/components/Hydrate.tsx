"use client";
import { ReactNode, useEffect, useState } from "react";
import { LoadingSpinner } from "./Loading";

export default function Hydrate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <>{children}</>
      ) : (
        <div className={className}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
