"use client";
import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Twitter, Instagram, Linkedin, Moon, Sun } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { ChevronLeft, SendHorizonal, Settings } from "lucide-react";
import { useRouter } from "next/navigation";


const App = () => {
  type FormError = {
    field: string | null;
    message: string;
  };

  type FormState = {
    succeeded: boolean;
    submitting: boolean;
    errors: FormError[];
  };

  const [state, setState] = useState<FormState>({ succeeded: false, submitting: false, errors: [] });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const router = useRouter();
  const handleGoBack = () => {
    router.push('/');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formFields = [
    { label: "First Name", id: "firstName", name: "firstName", type: "text" },
    { label: "Last Name", id: "lastName", name: "lastName", type: "text" },
    { label: "Email", id: "email", name: "email", type: "email" },
    { label: "Phone Number", id: "phoneNumber", name: "phoneNumber", type: "text", prefix: "+94" }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, submitting: true }));
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mzzalagr", {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setState({ succeeded: true, submitting: false, errors: [] });
        form.reset();
      } else {
        const errorData = await response.json();
        setState({ succeeded: false, submitting: false, errors: errorData.errors || [] });
      }
    } catch (error) {
      setState({ succeeded: false, submitting: false, errors: [{ field: null, message: 'Submission failed. Please try again.' }] });
    }
  };

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-zinc-900 transition-colors duration-500">
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-300">Your message has been sent successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100/80 dark:bg-zinc-900/80 transition-colors duration-500">
  <div className="relative bg-white/70 dark:bg-zinc-800/70 p-8 md:p-16 rounded-2xl shadow-xl w-full max-w-5xl backdrop-blur-sm">
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      
          <div className="flex items-center mb-10">
           <button   onClick={handleGoBack} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300 ">
             <ChevronLeft className=" w-7 h-7 text-black dark:text-white" />
             
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="MerdiAI Logo" className="w-8 h-8 rounded" />
                <span className="text-xl font-semibold text-foreground">MerdiAI</span>
              </div>
            </button>
          </div>
     

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex flex-col flex">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Contact Information</h1>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail size={24} className="text-gray-600 dark:text-gray-400" />
                <span className="text-lg text-gray-600 dark:text-gray-300">contact@merdiai.com</span>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin size={24} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
                <span className="text-lg text-gray-600 dark:text-gray-300">
                  16 Madurukatiya, Monaragala, Uva, Sri Lanka.
                </span>
              </div>
            </div>
           <div className="flex mt-0 md:mt-60 space-x-4">
              <a href="https://twitter.com/merdiai" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                <Twitter size={24} className="text-[#1DA1F2] dark:text-[#4AB3F4] transition-colors duration-300 hover:text-[#0f88dc] dark:hover:text-[#2a9ae6]" />
              </a>
              <a href="https://instagram.com/merdiai" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                <Instagram size={24} className="text-[#E1306C] dark:text-[#FF698E] transition-colors duration-300 hover:text-[#c4255a] dark:hover:text-[#e85078]" />
              </a>
              <a href="https://linkedin.com/company/merdiai" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
                <Linkedin size={24} className="text-[#0077B5] dark:text-[#2196f3] transition-colors duration-300 hover:text-[#005a8b] dark:hover:text-[#1875d0]" />
              </a>
            </div>
          </div>
          <div >
            <div className="absolute inset-0 z opacity-40 md:opacity-100 rounded-full">
              <Spline 
                scene="https://prod.spline.design/hYfTPbDZcK6MMlah/scene.splinecode" 
                style={{ 
                  width: '80%', 
                  height: '90%', 
                  position: 'absolute', 
                  top: '12%', 
                  right: '-20%',
                  transform: 'scale(1.0)',
                  mixBlendMode: 'color-burn'
                
                }}
              />
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" method="POST" action="https://formspree.io/f/mzzalagr">
              {formFields.map((field) => (
                <div key={field.id} className={`${field.id === 'email' || field.id === 'phoneNumber' ? 'md:col-span-1' : ''}`}>
                  <label htmlFor={field.id} className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    {field.prefix && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                        {field.prefix}
                      </span>
                    )}
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      className={`w-full p-3 border-b-2 border-gray-300 dark:border-zinc-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-300 ${field.prefix ? 'pl-10' : ''}`}
                    />
                  </div>
                  {state.errors.find(err => err.field === field.name) && (
                    <p className="text-red-500 text-sm mt-1">
                      {state.errors.find(err => err.field === field.name)?.message}
                    </p>
                  )}
                </div>
              ))}

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Write your message.."
                  className="w-full p-3 border-b-2 border-gray-300 dark:border-zinc-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-300"
                />
                {state.errors.find(err => err.field === 'message') && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.errors.find(err => err.field === 'message')?.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 mt-4">
               <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-3 px-6 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2
                    bg-black shadow-md
                    dark:bg-white dark:text-black"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;