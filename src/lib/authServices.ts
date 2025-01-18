import { supabase } from "@/lib/supabaseClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
    async createUserAccount({ email, password, name }: { email: string, password: string, name: string }) {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        await prisma.profile.create({
            data: {
                id: user.id,
                email,
                fullName: name,
                role: "client", // or other roles based on your logic
            },
        });

        return this.login({ email, password });
    }

    async login({ email, password }: { email: string, password: string }) {
        const { session, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return session;
    }

    async isLoggedIn(): Promise<boolean> {
        const user = supabase.auth.user();
        return !!user;
    }

    async getCurrentUser() {
        return supabase.auth.user();
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }
}

const authService = new AuthService();
export default authService;