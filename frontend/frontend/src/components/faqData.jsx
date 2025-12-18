import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "How can I register my transport company?",
    answer:
      "Click on 'Register Your Fleet' and fill out your company details. Once verified, you'll get access to manage your services.",
  },
  {
    question: "Can passengers book directly from the app?",
    answer:
      "Yes, passengers can find and book rides using our user-friendly mobile interface in real time.",
  },
  {
    question: "Is there live vehicle tracking?",
    answer:
      "Yes, all vehicles can be tracked live using GPS through our integrated dashboard and mobile apps.",
  },
  {
    question: "How do I receive payments?",
    answer:
      "Payments are processed securely via digital wallets or bank transfers linked to your service provider profile.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-950 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12">
          FAQs <span className="text-cyan-400">Answered</span>
        </h2>

        {faqData.map((faq, index) => (
          <div
            key={index}
            className="mb-4 bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center text-white font-semibold hover:bg-white/10 transition"
            >
              <span>{faq.question}</span>
              <span className="text-cyan-400 text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-300 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
