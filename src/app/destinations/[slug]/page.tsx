import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DESTINATIONS, TOUR_PACKAGES } from "@/lib/data";
import { ArrowLeft, Star, MapPin, Clock, CheckCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `${dest.name}, ${dest.country}`,
    description: dest.description,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = DESTINATIONS.find(
    (d) => d.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (!dest) notFound();

  const relatedPackages = TOUR_PACKAGES.filter(
    (p) =>
      p.destination.toLowerCase().includes(dest.name.toLowerCase()) ||
      p.destination.toLowerCase().includes(dest.country.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/destinations" className="inline-flex items-center gap-2 text-sm text-text-light hover:text-accent mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Destinations
        </Link>

        <div className="relative mb-12 h-[400px] overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-white/70">{dest.country}</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">{dest.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="text-white">{dest.rating}</span>
              </div>
              <span className="text-white/50">{dest.packages} packages available</span>
            </div>
          </div>
        </div>

        <p className="max-w-3xl text-lg leading-relaxed text-text-light">{dest.description}</p>

        {relatedPackages.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-text">Available Packages</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {relatedPackages.map((pkg) => (
                <Link key={pkg.id} href={`/holiday-packages/${pkg.slug}`} className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center gap-2 text-xs text-text-light">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {pkg.duration}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-text group-hover:text-accent transition-colors">{pkg.title}</h3>
                  <p className="mt-2 text-sm text-text-light line-clamp-2">{pkg.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-display text-2xl font-bold text-primary">PKR {pkg.price.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm">{pkg.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg">
            Book Your Trip to {dest.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
