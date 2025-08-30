import HeroSection from "./hero";
import Footer from "./sections/footer";

export default function HomeView() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"
      style={{
        backgroundImage: "url('/image/vector-bg.png')",
      }}
    >
      <main className="flex-1 flex items-center justify-center">
        <HeroSection />
      </main>

      <Footer />
    </div>
  );
}
