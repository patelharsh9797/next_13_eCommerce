"use client";
import { ReactNode, useEffect, useState } from "react";
import { LoadingPage, LoadingSpinner } from "./Loading";
import { userThemeStore } from "@/store";

export default function Hydrate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = userThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body
          // className={`px-4 lg:px-24 ${
          //   themeStore.mode === "dark" ? "bg-base-300" : ""
          // }`}
          className="px-4 lg:px-24"
          data-theme={themeStore.mode}
        >
          {children}
        </body>
      ) : (
        <body>
          <LoadingPage />
        </body>
      )}
    </>
  );
}
