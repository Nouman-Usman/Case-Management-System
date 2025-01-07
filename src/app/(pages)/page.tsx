"use client";
import useAuth from "@/context/useAuth";
import React from "react";
import ProfileCard from "@/components/ProfileCard";
import Login from "@/components/Login";
import {Footer} from "@/components/Footer";
import About from "@/components/About";
import Features from "@/components/Features";
import ContactForm from "@/components/Contact";
import PricingSectionCards from "@/components/Pricing";
import HeroFormSignUpForm from "@/components/Hero";
const Home = () => {
const {authStatus} = useAuth();
return (
    <div className="w-full max-w-7xl mx-auto px-8">
        <div className="">
            <HeroFormSignUpForm />
        </div>
        <div className="flex mt-8 border-t border-black/10">
            <Features />
        </div>
        <div className="flex mt-8 border-t border-black/10">
            <PricingSectionCards />
        </div>
        <div className="flex mt-8 border-t border-black/10">
            <ContactForm />
        </div>
        <div className="flex mt-8 border-t border-black/10">
            <Footer />
        </div>
    </div>
);
}

export default Home;