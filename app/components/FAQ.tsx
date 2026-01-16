"use client";

import { useState } from "react";

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const faqs = [
    {
        question: "WheelX est-il gratuit ?",
        answer: "Oui ! WheelX est gratuit avec toutes les fonctionnalités de base. Une version Premium sera disponible pour des fonctionnalités avancées.",
    },
    {
        question: "Sur quelles plateformes est disponible WheelX ?",
        answer: "WheelX est disponible sur iOS et Android. Téléchargez l'app sur l'App Store ou Google Play Store.",
    },
    {
        question: "Comment fonctionne le suivi de groupe ?",
        answer: "Créez ou rejoignez une balade, et suivez la position de tous les participants en temps réel sur la carte. C'est parfait pour ne jamais perdre votre groupe !",
    },
    {
        question: "Le mode hors-ligne fonctionne-t-il ?",
        answer: "Oui ! Téléchargez vos cartes à l'avance pour naviguer même sans connexion internet. Idéal pour les zones reculées.",
    },
    {
        question: "Comment fonctionne la détection de chute ?",
        answer: "L'app utilise les capteurs de votre téléphone pour détecter les chutes. Une alerte est envoyée automatiquement à vos contacts d'urgence avec votre position GPS.",
    },
];

export default function FAQ() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-wheelx-black">
            <div className="max-w-3xl mx-auto px-6 md:px-8">
                <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4">
                    Questions <span className="text-wheelx-yellow">fréquentes</span>
                </h2>
                <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
                    Tout ce que vous devez savoir sur WheelX
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-800 rounded-2xl overflow-hidden bg-wheelx-dark/50"
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <span className="text-white font-semibold pr-4 text-lg">{faq.question}</span>
                                <span className={`text-wheelx-yellow transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}>
                                    <ChevronDownIcon />
                                </span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                                <p className="px-6 pb-6 text-gray-400 leading-relaxed text-base">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
