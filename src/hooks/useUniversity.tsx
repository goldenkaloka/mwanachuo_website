import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

type University = {
  id: string;
  name: string;
  location: string;
};

type UniversityContextType = {
  selectedUniversity: University | null;
  setUniversity: (university: University) => void;
  universities: University[];
  loading: boolean;
  isInitialized: boolean;
};

const UniversityContext = createContext<UniversityContextType>({
  selectedUniversity: null,
  setUniversity: () => { },
  universities: [],
  loading: true,
  isInitialized: false,
});

export const UniversityProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, refreshProfile } = useAuth();
  
  // 0. Instant initialization from storage
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(() => {
    const saved = localStorage.getItem("selected_university"); // Store full object for 0ms load
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Initial Universities Fetch
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data, error } = await supabase
          .from("universities")
          .select("*")
          .order("name");

        if (!error && data) {
          setUniversities(data);
        }
      } catch (err) {
        console.error("[useUniversity] Error fetching universities:", err);
      } finally {
        setLoading(false);
        // Fail-forward: even if fetch fails, mark as initialized to show guest UI
        setIsInitialized(true); 
      }
    };

    fetchUniversities();
  }, []);

  // 2. Initial selection & Sync
  useEffect(() => {
    // If universities haven't loaded yet, try to use stale data from localStorage for speed
    if (loading && universities.length === 0) {
      const savedId = localStorage.getItem("selected_university_id");
      if (savedId && !selectedUniversity) {
        // We can't set the full object yet because we don't have the list, 
        // but we've already marked initialization as happening in parallel.
      }
      return;
    }

    const syncUniversity = () => {
      // Priority 1: User Profile (Database)
      if (user && profile?.primary_university_id) {
        const profileUni = universities.find(u => u.id === profile.primary_university_id);
        if (profileUni) {
          if (selectedUniversity?.id !== profileUni.id) {
            console.log("[useUniversity] Syncing with database profile:", profileUni.name);
            setSelectedUniversity(profileUni);
          }
          localStorage.setItem("selected_university_id", profileUni.id);
          setIsInitialized(true);
          return;
        }
      }

      // Priority 2: Local Storage (Guest or persistent choice)
      const savedId = localStorage.getItem("selected_university_id");
      if (savedId) {
        const savedUni = universities.find(u => u.id === savedId);
        if (savedUni) {
          if (selectedUniversity?.id !== savedUni.id) {
            console.log("[useUniversity] Loading from localStorage:", savedUni.name);
            setSelectedUniversity(savedUni);
          }
        }
      }

      setIsInitialized(true);
    };

    syncUniversity();
  }, [loading, user, profile?.primary_university_id, universities]);

  // 3. Cleanup on Logout
  useEffect(() => {
    if (!user && isInitialized) {
      // Check if we actually HAVE a user university currently but no user
      // This happens right after signOut
      const hasSavedUni = localStorage.getItem("selected_university_id");
      if (!hasSavedUni && selectedUniversity) {
        console.log("[useUniversity] Finalizing logout cleanup");
        setSelectedUniversity(null);
      }
    }
  }, [user, isInitialized, selectedUniversity]);

  const setUniversity = async (university: University) => {
    console.log("[useUniversity] Setting university:", university.name);
    setSelectedUniversity(university);
    localStorage.setItem("selected_university_id", university.id);
    localStorage.setItem("selected_university", JSON.stringify(university)); // Store full object

    if (user) {
      try {
        const { error } = await supabase
          .from("users")
          .update({ primary_university_id: university.id })
          .eq("id", user.id);

        if (!error) {
          console.log("[useUniversity] Database updated successfully");
          await refreshProfile(); // Refresh profile in context
        } else {
          console.error("[useUniversity] Database update error:", error);
        }
      } catch (err) {
        console.error("[useUniversity] Syncing failed:", err);
      }
    }
  };

  return (
    <UniversityContext.Provider value={{ selectedUniversity, setUniversity, universities, loading, isInitialized }}>
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversity = () => useContext(UniversityContext);
