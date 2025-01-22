"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import conf from "@/conf/config";
import { Client, Account, ID, OAuthProvider } from 'appwrite';
import {appwriteService} from "@/appwrite/config";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
const appwriteClient = new Client();
appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
const account = new Account(appwriteClient);

export function SignupForm() {
  const not = (message: string) => toast.error(message);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const name = `${firstname} ${lastname}`;

    setIsLoading(true);
    try {
      const userAccount = await appwriteService.createUserAccount({ email, password, name });
      console.log("User Account: ", userAccount);
      if (userAccount) {
        toast.success("Signup successful");
        await account.createSession(email, password);
        router.push('/profile'); // Redirect to profile page on success
      }
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast.error("Signup failed with following error: " , error.message);
      // alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google, // provider
        'http://localhost:3000/profile', // redirect here on success
        'http://localhost:3000/signup', // redirect here on failure
        ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'] // correct scopes
      );
      const session = await account.getSession('current');
      // Fetch user profile information from Google API
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${session.providerAccessToken}`,
        },
      });
      const profile = await response.json();
      setProfileImage(profile.picture);
      console.log("Profile Image URL: ", profile.picture);
      router.push('/profile'); // Redirect to profile page on success
    } catch (error: any) {
      console.error("Google sign in error:", error.message);
      alert("Google sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200" style={{ alignSelf: "center" }}>
        Welcome to Apna Waqeel
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="Muhammad" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Nouman" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="xyz@gmail.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Your twitter password</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"
          />
        </LabelInputContainer> */}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              {isLoading ? "Connecting..." : "Continue With Google"}
            </span>
            <BottomGradient />
          </button>
        </div>
        {profileImage && (
          <div className="mt-4">
            <img src={profileImage} alt="Profile" className="rounded-full w-16 h-16" />
          </div>
        )}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
