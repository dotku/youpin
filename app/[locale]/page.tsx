import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import About from "@/components/About";
import Promo from "@/components/Promo";
import Solutions from "@/components/Solutions";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Products />
        <About />
        <Promo />
        <Solutions />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
