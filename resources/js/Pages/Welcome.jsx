import ButtonAppBar from '@/Components/WelcomePage/ButtonAppBar';
import MainPageTop from '@/Components/WelcomePage/MainPageTop';
import MainPageCenter from '@/Components/WelcomePage/MainPageCenter';
import AboutMission from '@/Components/WelcomePage/AboutMission';
import AboutTeam from '@/Components/WelcomePage/AboutTeam'
import AboutFeatures from '@/Components/WelcomePage/AboutFeatures'
import Footer from '@/Components/WelcomePage/Footer'
import { useEffect } from 'react'


export default function Welcome() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // один раз
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.fade');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ButtonAppBar />

      <MainPageTop />

      <MainPageCenter />

      <AboutMission />

      <AboutTeam />

      <AboutFeatures />

      <Footer />
    </>
  )
}
