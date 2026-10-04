'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// Floating Label Input Component
const FloatingInput = ({ label, type = "text", id, required = false }) => (
  <div className="relative w-full group mb-8">
    <input
      type={type}
      id={id}
      required={required}
      placeholder=" " // Important for peer-placeholder-shown
      className="peer w-full bg-transparent border-b border-charcoal/20 pb-3 pt-4 text-charcoal focus:outline-none focus:border-polar transition-colors rounded-none"
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-4 text-charcoal/50 text-sm transition-all duration-300 pointer-events-none 
                 peer-focus:-top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-label peer-focus:text-polar
                 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-label"
    >
      {label}
    </label>
  </div>
);

export default function EnquirePage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = 3;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Variants for horizontal sliding form steps
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <main className="min-h-screen bg-snow flex flex-col md:flex-row pt-24 md:pt-0">
      
      {/* Left Side: Fixed Photo */}
      <div className="md:w-1/2 h-[40vh] md:h-screen md:sticky top-0 relative overflow-hidden bg-polar">
        <div 
          className="absolute inset-0 w-full h-full mix-blend-luminosity opacity-80"
          style={{
            // Fallback gradient until a cinematic image is added
            background: 'linear-gradient(to bottom, #9DB8C9 0%, #0B1B26 100%)',
            // backgroundImage: 'url(/media/enquire-bg.jpg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-polar/20" />
        <div className="absolute bottom-12 left-12 right-12 text-snow hidden md:block">
          <h1 className="font-display text-6xl tracking-display-tight mb-4">Begin the journey.</h1>
          <p className="text-sm opacity-80 max-w-sm leading-relaxed">
            Every expedition is strictly limited in capacity. Connect with our team to secure your placement on the ice.
          </p>
        </div>
      </div>

      {/* Right Side: Multi-Step Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 min-h-[60vh]">
        <div className="w-full max-w-md relative">
          
          <AnimatePresence mode="wait" custom={1}>
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Progress Line */}
                <div className="w-full h-[1px] bg-charcoal/10 mb-16 relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full bg-polar"
                    initial={{ width: '33%' }}
                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  />
                  <div className="absolute right-0 -top-3 text-[10px] uppercase tracking-label text-charcoal/40">
                    Step {step} of {totalSteps}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="relative overflow-visible">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Personal Details */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <h2 className="font-display text-4xl text-polar mb-8">Guest Details</h2>
                        <FloatingInput label="Full Name" id="name" required />
                        <FloatingInput label="Email Address" id="email" type="email" required />
                        <FloatingInput label="Phone Number (Optional)" id="phone" type="tel" />
                      </motion.div>
                    )}

                    {/* Step 2: Expedition Interests */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <h2 className="font-display text-4xl text-polar mb-8">Expedition</h2>
                        <FloatingInput label="Preferred Itinerary (e.g. South Pole)" id="itinerary" required />
                        <FloatingInput label="Estimated Travel Year" id="year" required />
                        
                        <div className="mt-8">
                          <label className="text-[10px] uppercase tracking-label text-charcoal/50 mb-4 block">Season Preference</label>
                          <div className="flex gap-4">
                            {['Early', 'Mid', 'Late'].map(season => (
                              <label key={season} className="flex-1 cursor-pointer">
                                <input type="radio" name="season" className="peer sr-only" />
                                <div className="text-center text-sm py-3 border border-charcoal/20 text-charcoal/60 peer-checked:border-polar peer-checked:bg-polar peer-checked:text-snow transition-all rounded-sm">
                                  {season}
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Message & Submit */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <h2 className="font-display text-4xl text-polar mb-8">Final Details</h2>
                        <FloatingInput label="Number of Guests" id="guests" type="number" required />
                        
                        <div className="relative w-full group mb-8 mt-4">
                          <textarea
                            id="message"
                            required
                            rows={4}
                            placeholder=" "
                            className="peer w-full bg-transparent border-b border-charcoal/20 pb-3 pt-4 text-charcoal focus:outline-none focus:border-polar transition-colors rounded-none resize-none"
                          />
                          <label
                            htmlFor="message"
                            className="absolute left-0 top-4 text-charcoal/50 text-sm transition-all duration-300 pointer-events-none 
                                       peer-focus:-top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-label peer-focus:text-polar
                                       peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-label"
                          >
                            Additional Requirements or Questions
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form Navigation Buttons */}
                  <div className="flex justify-between mt-12 pt-6 border-t border-charcoal/10">
                    {step > 1 ? (
                      <button type="button" onClick={prevStep} className="text-[11px] uppercase tracking-label font-medium text-charcoal/60 hover:text-polar transition-colors">
                        Back
                      </button>
                    ) : <div />}
                    
                    {step < totalSteps ? (
                      <button type="button" onClick={nextStep} className="text-[11px] uppercase tracking-label font-medium text-polar border-b border-polar pb-1 hover:opacity-70 transition-opacity">
                        Next Step
                      </button>
                    ) : (
                      <button type="submit" className="text-[11px] uppercase tracking-label font-medium text-snow bg-polar px-8 py-3 rounded-sm hover:bg-charcoal transition-colors">
                        Submit Enquiry
                      </button>
                    )}
                  </div>
                </form>

              </motion.div>
            ) : (
              // Success State
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full border border-glacier flex items-center justify-center text-glacier mb-8">
                  <Check strokeWidth={1.5} size={24} />
                </div>
                <h2 className="font-display text-4xl text-polar mb-4">Request Received</h2>
                <p className="text-charcoal/60 leading-relaxed text-sm mb-8 max-w-sm">
                  Our expedition team is reviewing your details. We will be in contact within 24 hours to discuss your journey to the ice.
                </p>
                <button 
                  onClick={() => { setIsSubmitted(false); setStep(1); }}
                  className="text-[11px] uppercase tracking-label font-medium text-polar border-b border-polar pb-1 hover:opacity-70 transition-opacity"
                >
                  Submit another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}