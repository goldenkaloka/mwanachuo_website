import React, { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import { cacheStore } from "@/utils/cacheStore";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => { },
  refreshProfile: async () => { },
  updateProfile: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      return data;
    } catch (err) {
      console.error("Fetch profile catch:", err);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    const p = await fetchProfile(user.id);
    setProfile(p);
  };

  useEffect(() => {
    let isMounted = true;

    // Unified function to handle profile and metadata sync
    const syncProfileAndState = async (session: Session | null) => {
      const currentUser = session?.user ?? null;
      
      if (!isMounted) return;
      
      setSession(session);
      setUser(currentUser);

      if (currentUser) {
        const profileData = await fetchProfile(currentUser.id);
        if (isMounted) setProfile(profileData);
      } else {
        if (isMounted) setProfile(null);
      }

      if (isMounted) setLoading(false);
    };

    // 1. Initial check (Immediate recovery)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        syncProfileAndState(session);
      }
    }).catch(err => {
      console.error("Supabase getSession error:", err);
      if (isMounted) setLoading(false);
    });

    // 2. Auth state subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[useAuth] Auth event:", event);
      
      // We ignore INITIAL_SESSION since we handle it via getSession for better control
      if (event === "INITIAL_SESSION") return;
      
      if (isMounted) {
        // For other events (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED), sync state
        syncProfileAndState(session);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("[useAuth] Signing out and clearing app state...");
    try {
      // 1. Clear all app cache first to prevent local state race conditions
      cacheStore.clearAppCache();

      // 2. Perform Supabase signout
      await supabase.auth.signOut();
    } catch (err) {
      console.error("[useAuth] SignOut error:", err);
    } finally {
      // 3. Reset local state
      setUser(null);
      setSession(null);
      setProfile(null);
      
      // 4. Force a clean reload to the landing page to ensure all contexts are reset
      window.location.href = "/";
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;
    if (data) setProfile(data);
  };

  const value = React.useMemo(() => ({
    user,
    session,
    profile,
    loading,
    signOut,
    refreshProfile,
    updateProfile
  }), [user, session, profile, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
