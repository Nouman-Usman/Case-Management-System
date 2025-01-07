import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const About: React.FC = () => {
    return (
        <section className="bg-white text-green-600 min-h-screen flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold mb-4">
                    <Typewriter
                        words={['AI Legal Case Management', 'Streamline your legal case management with AI-powered solutions.']}
                        loop={0}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
                <p className="text-xl mb-8">
                    Streamline your legal case management with AI-powered solutions.
                </p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                    Get Started
                </motion.button>
            </motion.div>
        </section>
    );
};

export default About;