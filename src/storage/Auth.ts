import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";
import createCollections from "@/models/server/collections";

export interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;
  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
  updateProfile(
    name: string,
    email: string,
    phoneNumber: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  deleteAccount(): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  profileCompleted(): Promise<boolean>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,
      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("current");
          set({ session });
        } catch (error) {
          console.log(error);
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(email, password);
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          if (!user.prefs?.reputation)
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });

          set({ session, user, jwt });

          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name);
          await createCollections(); // Create collections when a new account is created
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.log(error);
        }
      },

      async updateProfile(name: string, email: string, password: string) {
        try {
          await account.updateName(name);
          await account.updateEmail(email, password);
          await account.updatePassword(email,password);
          const user = await account.get<UserPrefs>();
          set({ user });
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async changePassword(oldPassword: string, newPassword: string) {
        try {
          await account.updatePassword(newPassword, oldPassword);
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async deleteAccount() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async profileCompleted() {
        // check if the user profile Completed
        try {
            const user = await account.get<UserPrefs>();
            if (user.prefs?.reputation) return true;
            
            
        } catch (error) {
            return false
        }
        return false
      }
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);