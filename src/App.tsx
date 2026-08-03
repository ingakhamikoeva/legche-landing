import {
  Header, Hero, WhyDietsFail, WhyItWorks, Showcase, WhatsInside,
  HonestExpectations, Pricing, FinalAsk, Footer, CookieBanner,
} from './components/Sections';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <WhyItWorks />
        <WhyDietsFail />
        <WhatsInside />
        <HonestExpectations />
        <Pricing />
        <FinalAsk />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
