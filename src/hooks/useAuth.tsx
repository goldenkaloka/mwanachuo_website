import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

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
    const AUTH_INIT_TIMEOUT_MS = 12_000;

    const initAuth = async () => {
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.warn("Auth init timeout – setting loading false");
          setLoading(false);
        }
      }, AUTH_INIT_TIMEOUT_MS);

      try {
        // 1. Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Auth init error:", sessionError);
        }

        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
        }

        // 2. Fetch profile if session exists
        if (initialSession?.user) {
          const profileData = await fetchProfile(initialSession.user.id);
          if (isMounted) setProfile(profileData);
        }
      } catch (err) {
        console.error("Auth initialization caught exception:", err);
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change event:", event);

      if (isMounted) {
        setSession(session);
        setUser(session?.user ?? null);
      }

      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        if (isMounted) setProfile(p);
      } else {
        if (isMounted) setProfile(null);
      }

      // After any session change event, we ensure loading is false
      // But we only set it false once the initAuth has a chance to run or if the event is definitive
      if (isMounted && event !== "INITIAL_SESSION") {
        setLoading(false);
      }
    });

    initAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    // Clear local state first to prevent race conditions in listeners
    localStorage.removeItem("selected_university_id");

    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
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

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, refreshProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
