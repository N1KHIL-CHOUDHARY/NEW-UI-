import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
    const inputVariants = {
        focus: { 
            borderColor: "#193A83", 
            boxShadow: "0 0 0 2px rgba(25, 58, 131, 0.2)" 
        },
        blur: { 
            borderColor: "#E2E8F0" 
        }
    };

    return (
        <div className="bg-white w-screen min-h-screen overflow-x-hidden font-sans">
            <div className="container mx-auto px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm font-semibold text-[#193A83] mb-1">QUESTIONS?</p>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#19154E]">Contact Us</h1>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-16 mt-12">
                        <motion.form 
                            className="md:col-span-2 space-y-6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="grid sm:grid-cols-2 gap-6 text-[#19154E]">
                                <motion.input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="w-full px-4 py-3 bg-[#F0F5FA] rounded-lg border-2 border-transparent focus:outline-none"
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    initial="blur"
                                />
                                <motion.input 
                                    type="email" 
                                    placeholder="Email" 
                                    className="w-full px-4 py-3 bg-[#F0F5FA] rounded-lg border-2 border-transparent focus:outline-none"
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    initial="blur"
                                />
                            </div>
                            <motion.textarea 
                                placeholder="Message" 
                                rows="8" 
                                className="w-full px-4 py-3 bg-[#F0F5FA] rounded-lg border-2 border-transparent focus:outline-none"
                                variants={inputVariants}
                                whileFocus="focus"
                                initial="blur"
                            ></motion.textarea>
                            <motion.button
                                type="submit"
                                className="w-full bg-[#193A83] text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </motion.form>

                        <motion.div 
                            className="text-gray-600"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold text-[#19154E] mb-3">Get in touch</h2>
                            <p className="mb-6">We're always here to help. Contact us if you have any questions, suggestions, or concerns.</p>                            
                            
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;