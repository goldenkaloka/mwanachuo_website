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
};

const UniversityContext = createContext<UniversityContextType>({
    selectedUniversity: null,
    setUniversity: () => { },
    universities: [],
    loading: true,
});

export const UniversityProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, profile, refreshProfile } = useAuth();
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);

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
        if (universities.length === 0) return;

        // Try to load from localStorage first for immediate UI
        if (!selectedUniversity) {
            const savedId = localStorage.getItem('selected_university_id');
            if (savedId) {
                const savedUni = universities.find(u => u.id === savedId);
                if (savedUni) {
                    console.log('[useUniversity] Loaded from localStorage:', savedUni.name);
                    setSelectedUniversity(savedUni);
                }
            }
        }

        // Overwrite/Sync with profile if user is logged in
        if (user && profile?.primary_university_id) {
            const profileUni = universities.find(u => u.id === profile.primary_university_id);
            if (profileUni && selectedUniversity?.id !== profileUni.id) {
                console.log('[useUniversity] Syncing with profile:', profileUni.name);
                setSelectedUniversity(profileUni);
                localStorage.setItem('selected_university_id', profileUni.id);
            }
        }
    }, [user, profile, universities]);

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
        <UniversityContext.Provider value={{ selectedUniversity, setUniversity, universities, loading }}>
            {children}
        </UniversityContext.Provider>
    );
};

export const useUniversity = () => useContext(UniversityContext);
