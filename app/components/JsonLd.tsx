export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WheelX",
        "applicationCategory": "NavigationApplication",
        "operatingSystem": "iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "description": "L'application ultime pour les motards. Navigation GPS optimisée, suivi de groupe en temps réel, événements et communauté.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        },
        "publisher": {
            "@type": "Organization",
            "name": "WheelX Inc.",
            "url": "https://wheelx.app",
            "logo": "https://wheelx.app/logo.png"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
