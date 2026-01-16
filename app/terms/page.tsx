"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
    return (
        <div className="min-h-screen bg-wheelx-black text-white font-sans">
            <Navbar isScrolled={true} />
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl font-black mb-8 text-wheelx-yellow">Conditions Générales d'Utilisation</h1>
                <div className="space-y-6 text-gray-300">
                    <p>Dernière mise à jour : 16 Janvier 2026</p>
                    <p>
                        Bienvenue sur WheelX. En utilisant notre application, vous acceptez les conditions suivantes.
                        Roulez prudemment et respectez la loi.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8">1. Code de Conduite</h2>
                    <p>
                        WheelX est une communauté de passionnés. Tout comportement dangereux, harcèlement ou contenu inapproprié entraînera la suspension du compte.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8">2. Responsabilité</h2>
                    <p>
                        L'utilisation du GPS et des fonctionnalités de suivi se fait à vos propres risques.
                        WheelX n'est pas responsable des accidents, infractions au code de la route ou dommages matériels.
                        Gardez toujours les yeux sur la route.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8">3. Services Premium</h2>
                    <p>
                        Certaines fonctionnalités avancées peuvent nécessiter un abonnement Premium. Les conditions spécifiques seront affichées lors de la souscription.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
