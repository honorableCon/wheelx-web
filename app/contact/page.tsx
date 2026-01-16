"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
    return (
        <div className="min-h-screen bg-wheelx-black text-white font-sans">
            <Navbar isScrolled={true} />
            <main className="max-w-4xl mx-auto px-6 py-32">
                <h1 className="text-4xl font-black mb-8 text-wheelx-yellow">Contactez-nous</h1>
                <div className="space-y-6 text-gray-300">
                    <p className="text-xl">
                        Une question ? Un problème ? Une suggestion pour améliorer l'app ?
                        L'équipe WheelX est à l'écoute.
                    </p>

                    <div className="bg-wheelx-dark border border-gray-800 p-8 rounded-2xl mt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Support Rider</h2>
                        <p className="mb-4">
                            Pour toute assistance technique ou question sur votre compte :
                        </p>
                        <a href="mailto:support@wheelx.app" className="text-wheelx-yellow font-bold text-lg hover:underline">
                            support@wheelx.app
                        </a>
                    </div>

                    <div className="bg-wheelx-dark border border-gray-800 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-4">Partenariats</h2>
                        <p className="mb-4">
                            Vous organisez des événements ou gérez une marque moto ?
                        </p>
                        <a href="mailto:partners@wheelx.app" className="text-wheelx-yellow font-bold text-lg hover:underline">
                            partners@wheelx.app
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
