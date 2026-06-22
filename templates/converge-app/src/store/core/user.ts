import Cookies from "js-cookie";

import { clearAuthCookies, setAuthTokens } from "@/lib/auth-cookies";
import { createPersistMiddleware } from "../middleware/persist";
import type { Maybe, SigninResponse, User } from "@/types";

interface SignInOptions {
  redirect?: boolean;
  rememberMe?: boolean;
}

interface SignOutOptions {
  soft?: boolean;
}

interface UserStore {
  hydrate: () => void;
  isHydrated: boolean;
  signin: (payload: SigninResponse, options?: SignInOptions) => Promise<void>;
  signout: (options?: SignOutOptions) => Promise<void>;
  user: Maybe<User>;
}

const initialState: UserStore = {
  hydrate: () => {},
  isHydrated: false,
  signin: async () => {},
  signout: async () => {},
  user: null,
};

export const useUserStore = createPersistMiddleware<UserStore>("CONVERGE", (set) => ({
  ...initialState,
  hydrate: () => {
    // SESSION_EXISTS is a non-HttpOnly flag cookie set alongside the HttpOnly tokens.
    const hasSession = Cookies.get("SESSION_EXISTS") === "1";
    set({ isHydrated: true, ...(!hasSession && { user: null }) });
  },
  signin: async (payload, options) => {
    await setAuthTokens({
      accessToken: payload.tokens.accessToken,
      refreshToken: options?.rememberMe ? payload.tokens.refreshToken : undefined,
      companyId: payload.user.companyAccess[0].companyId,
    });
    set({ user: payload.user, isHydrated: true });
  },
  signout: async (options) => {
    if (!options?.soft) {
      await clearAuthCookies();
    }
    set({ user: null });
  },
}));
