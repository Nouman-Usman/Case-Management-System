"use client";
import useAuth from "@/context/useAuth";
import React from "react";
import ProfileCard from "@/components/ProfileCard";
import Login from "@/components/Login";
import {StackedCircularFooterDemo} from "@/components/Footer";
import About from "@/components/About";
import Features from "@/components/Features";
import ContactForm from "@/components/Contact";
import HeroFormSignUpForm from "@/components/Hero";
import { PricingSectionDemo } from "@/components/price";
import {ParticlesDemo} from "@/components/background";
import getOrCreateDB from "@/models/server/dbSetup";
import { get } from "node:https";
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
            <PricingSectionDemo />
        </div>
        <div className="flex mt-8 border-t border-black/10">
            <ContactForm />
        </div>
        <div className="">
            <StackedCircularFooterDemo />
        </div>
    </div>
);
}

export default Home;