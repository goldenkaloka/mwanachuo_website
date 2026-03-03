import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

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
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    // 1. Initial Universities Fetch
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const { data, error } = await supabase
                    .from('universities')
                    .select('*')
                    .order('name');

                if (!error && data) {
                    setUniversities(data);
                }
            } catch (err) {
                console.error('[useUniversity] Error fetching universities:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    // 2. Initial selection & Sync
    useEffect(() => {
        const syncUniversity = () => {
            if (universities.length === 0) return;

            // Priority 1: User Profile (Database)
            if (user && profile?.primary_university_id) {
                const profileUni = universities.find(u => u.id === profile.primary_university_id);
                if (profileUni) {
                    if (selectedUniversity?.id !== profileUni.id) {
                        console.log('[useUniversity] Syncing with database profile:', profileUni.name);
                        setSelectedUniversity(profileUni);
                    }
                    // Always keep localStorage in sync with database for guest fallback
                    localStorage.setItem('selected_university_id', profileUni.id);
                    return;
                }
            }

            // Priority 2: Local Storage (Guest or persistent choice)
            const savedId = localStorage.getItem('selected_university_id');
            if (savedId && !selectedUniversity) {
                const savedUni = universities.find(u => u.id === savedId);
                if (savedUni) {
                    console.log('[useUniversity] Loading from localStorage:', savedUni.name);
                    setSelectedUniversity(savedUni);
                    return;
                }
            }

            // Priority 3: No selection
            // We removed the auto-select first university logic to allow for a "Select University" state
        };

        syncUniversity();
        setIsInitialized(true);
    }, [user, profile?.primary_university_id, universities]);

    // 3. Cleanup on Logout
    useEffect(() => {
        if (!user && isInitialized) {
            // Check if we actually HAVE a user university currently but no user
            // This happens right after signOut
            const hasSavedUni = localStorage.getItem('selected_university_id');
            if (!hasSavedUni && selectedUniversity) {
                console.log('[useUniversity] Finalizing logout cleanup');
                setSelectedUniversity(null);
            }
        }
    }, [user, isInitialized, selectedUniversity]);

    const setUniversity = async (university: University) => {
        console.log('[useUniversity] Setting university:', university.name);
        setSelectedUniversity(university);
        localStorage.setItem('selected_university_id', university.id);

        if (user) {
            try {
                const { error } = await supabase
                    .from('users')
                    .update({ primary_university_id: university.id })
                    .eq('id', user.id);

                if (!error) {
                    console.log('[useUniversity] Database updated successfully');
                    await refreshProfile(); // Refresh profile in context
                } else {
                    console.error('[useUniversity] Database update error:', error);
                }
            } catch (err) {
                console.error('[useUniversity] Syncing failed:', err);
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
