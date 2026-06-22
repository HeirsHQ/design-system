"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { Company, HttpResponse, Maybe } from "@/types";
import { InactivityModal } from "./inactivity-modal";
import { useUserStore } from "@/store/core";
import { useApiQuery } from "@/lib/query";

const ACTIVITIES = ["mousemove", "keydown", "mousedown", "click", "scroll", "touch"];

interface AppContextProps {
  company: Maybe<Company>;
  companyId: string;
  isCollapsed: boolean;
  isInactivityTimerElapsed: boolean;
  setCompanyId: (company: string) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  stayActive: () => void;
}

const defaultContext: AppContextProps = {
  company: null,
  companyId: "",
  isCollapsed: false,
  isInactivityTimerElapsed: false,
  setIsCollapsed: () => {},
  setCompanyId: () => {},
  stayActive: () => {},
};

const AppContext = createContext<AppContextProps>({ ...defaultContext });
AppContext.displayName = "AppContext";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in ms

export const AppProvider = ({ children }: PropsWithChildren & {}) => {
  const [isInactivityTimerElapsed, setIsInactivityTimerElapsed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { signout, user } = useUserStore();
  const queryClient = useQueryClient();

  const companyId = useMemo(() => {
    const companies = user?.companyAccess ?? [];
    if (!companies.length) return "";
    return companies.find((company) => company.companyId === selectedId)?.companyId ?? companies[0].companyId;
  }, [user, selectedId]);

  const { data } = useApiQuery<HttpResponse<Company>>({
    serviceKey: "organization",
    url: `companies/${companyId}`,
    enabled: !!companyId,
  });

  const company = useMemo(() => {
    if (!data) return null;
    return data.Data;
  }, [data]);

  const setCompanyId = useCallback((company: string) => {
    setSelectedId(company);
  }, []);

  useEffect(() => {
    if (!companyId) return;
    if (Cookies.get("COMPANY_ID") === companyId) return;
    Cookies.set("COMPANY_ID", companyId);
    queryClient.clear();
    // queryClient is intentionally omitted: useQueryClient returns a stable singleton and including it would cause an unnecessary extra run on first mount.
  }, [companyId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || isInactivityTimerElapsed || process.env.NODE_ENV === "development") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsInactivityTimerElapsed(true), INACTIVITY_TIMEOUT);
    };

    ACTIVITIES.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      ACTIVITIES.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, isInactivityTimerElapsed]);

  const stayActive = useCallback(() => {
    setIsInactivityTimerElapsed(false);
  }, []);

  const handleSessionExpired = useCallback(() => {
    setIsInactivityTimerElapsed(false);
    signout();
    queryClient.clear();
  }, [signout, queryClient]);

  const value = { company, companyId, isCollapsed, isInactivityTimerElapsed, setIsCollapsed, setCompanyId, stayActive };

  return (
    <AppContext.Provider value={value}>
      {children}
      <InactivityModal
        key={isInactivityTimerElapsed ? 1 : 0}
        open={isInactivityTimerElapsed}
        onStayActive={stayActive}
        onSignout={handleSessionExpired}
      />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
};
