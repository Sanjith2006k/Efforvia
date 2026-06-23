import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import PageTransition from "../components/ui/PageTransition";
import CourseShowcase from "../components/CourseShowcase";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <PageTransition>
        <>
          <Navbar />

          <HeroSection />

          <CourseShowcase />

          <Categories />

          <Footer />
        </>
      </PageTransition>
    </>
  );
}

export default Home;
