import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

// import "./style.css";

export const Footer = () => {
    return (
        <div id="webcrumbs">
            <div className="w-[1200px] bg-white text-neutral-950 rounded-lg shadow-lg p-8">  <footer className="grid grid-cols-3 gap-8 text-neutral-950">
                <div>
                    <h3 className="text-xl font-title text-primary-500 mb-4">About Us</h3>
                    <p className="text-neutral-600">We are a team dedicated to providing the best solutions for our clients. Our mission is to enhance your business through innovative digital products.</p>
                </div>
                <div>
                    <h3 className="text-xl font-title text-primary-500 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-neutral-600">
                        <li><a href="#" className="hover:text-primary-500">Home</a></li>
                        <li><a href="#" className="hover:text-primary-500">Services</a></li>
                        <li><a href="#" className="hover:text-primary-500">Pricing</a></li>
                        <li><a href="#" className="hover:text-primary-500">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-title text-primary-500 mb-4">Our Location</h3>
                    <iframe
                        className="w-full h-56 rounded-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092982!2d144.95565101591234!3d-37.81732744208664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c9c7c8fa4090!2sFederation+Square!5e0!3m2!1sen!2sus!4v1638183448711!5m2!1sen!2sus"
                        loading="lazy"
                        allowFullScreen></iframe>
                </div>
            </footer>
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-6">
                        <a href="#"><i className="fa-brands fa-facebook text-primary-500 hover:text-primary-400 text-3xl"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter text-primary-500 hover:text-primary-400 text-3xl"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram text-primary-500 hover:text-primary-400 text-3xl"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin text-primary-500 hover:text-primary-400 text-3xl"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

