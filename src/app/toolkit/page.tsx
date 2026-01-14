import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolkitHero from "@/components/toolkit/ToolkitHero";
import ToolkitMenu from "@/components/toolkit/ToolkitMenu";
import ToolkitFeatures from "@/components/toolkit/ToolkitFeatures";
import ToolkitCTA from "@/components/toolkit/ToolkitCTA";

export const metadata = {
    title: "Windows PC Toolkit - RLabs Store",
    description: "Solusi legal untuk optimasi Windows PC. Fix error, bersihkan sampah, dan tingkatkan performa PC Anda.",
};

export default function ToolkitPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <ToolkitHero />
            <ToolkitMenu />
            <ToolkitFeatures />
            <ToolkitCTA />
            <Footer />
        </main>
    );
}
