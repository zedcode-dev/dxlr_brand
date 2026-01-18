import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import AboutPreview from "@/components/home/AboutPreview";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <AboutPreview />
    </>
  );
}
