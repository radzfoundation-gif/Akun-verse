import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import PopularGames from "@/components/PopularGames";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoSection from "@/components/PromoSection";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import RealtimeOrders from "@/components/RealtimeOrders";
import NewArrivals from "@/components/NewArrivals";
import ShopeeBanner from "@/components/ShopeeBanner";
import FeatureIcons from "@/components/FeatureIcons";
import RecommendationSection from "@/components/RecommendationSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="space-y-4 md:space-y-6 pb-8">
        <ShopeeBanner />
        <FeatureIcons />
        <div className="bg-[#111827] py-2 border-y border-white/5">
          <NewArrivals />
        </div>
        <RecommendationSection />
        <RealtimeOrders />
        <CategoryGrid />
      </div>
      <PopularGames />
      <FeaturedProducts />
      <PromoSection />
      <Testimonials />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  );
}

