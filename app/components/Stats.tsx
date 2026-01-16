"use client";

const stats = [
    { number: "50K+", label: "Riders actifs" },
    { number: "1M+", label: "Km parcourus" },
    { number: "10K+", label: "Routes créées" },
    { number: "5K+", label: "Événements" },
];

export default function Stats() {
    return (
        <section className="py-20 bg-gradient-to-r from-wheelx-yellow to-wheelx-yellow-dark">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-4xl sm:text-5xl font-black text-wheelx-black mb-2">{stat.number}</p>
                            <p className="text-wheelx-black/70 font-bold text-lg uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
