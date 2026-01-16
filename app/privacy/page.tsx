"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-wheelx-black text-white font-sans">
            <Navbar isScrolled={true} />
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl font-black mb-8 text-wheelx-yellow">Politique de Confidentialité</h1>
                <div className="space-y-6 text-gray-300">
                    <p>Dernière mise à jour : 16 Janvier 2026</p>
                    <p>
                        Chez WheelX, nous prenons la confidentialité de nos riders très au sérieux.
                        Cette politique décrit comment nous collectons, utilisons et protégeons vos données.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8">1. Données Collectées</h2>
                    <p>
                        Nous collectons les données nécessaires au bon fonctionnement de l'application :
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Données de localisation (pour le GPS et le suivi de groupe)</li>
                            <li>Informations de profil (nom, moto, photo)</li>
                            <li>Contacts d'urgence (pour la fonctionnalité SOS)</li>
                        </ul>
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8">2. Utilisation des Données</h2>
                    <p>
                        Vos données de localisation ne sont partagées qu'avec les membres de votre groupe de ride actif, et seulement lorsque vous activez le suivi.
                        Nous ne vendons pas vos données personnelles à des tiers.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8">3. Sécurité</h2>
                    <p>
                        Toutes les données sont chiffrées en transit et au repos. Nous utilisons les standards de sécurité les plus élevés pour protéger votre vie privée.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
