import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Category {
    id: string;
    name: string;
    icon: string;
    display_order: number;
}

export interface Condition {
    id: string;
    name: string;
    display_order: number;
}

export const useCategories = () => {
    return useQuery({
        queryKey: ["product-categories"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("product_categories")
                .select("*")
                .eq("is_active", true)
                .order("display_order", { ascending: true });

            if (error) throw error;
            return data as Category[];
        },
    });
};

export const useConditions = () => {
    return useQuery({
        queryKey: ["product-conditions"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("product_conditions")
                .select("*")
                .eq("is_active", true)
                .order("display_order", { ascending: true });

            if (error) throw error;
            return data as Condition[];
        },
    });
};
