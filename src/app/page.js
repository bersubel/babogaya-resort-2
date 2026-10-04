import Hero from '@/components/home/Hero';
import AntarcticaIntro from '@/components/home/AntarcticaIntro';
import SeasonBlock from '@/components/home/SeasonBlock';
import TripsRail from '@/components/home/TripsRail';
import FounderQuote from '@/components/home/FounderQuote';
import CampsStack from '@/components/home/CampsStack';
import FlightPath from '@/components/home/FlightPath';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-snow">
      <Hero />
      <AntarcticaIntro />
      <SeasonBlock />
      <TripsRail />
      <FounderQuote />
      <CampsStack />
      <FlightPath />
      <CTASection />
    </main>
  );
}