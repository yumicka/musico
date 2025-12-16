import Header from '@/Components/MainPage/Logged/Header'
import AnimatedBackground from '@/Components/MainPage/Logged/AnimatedBackground'
import Footer from '@/Components/WelcomePage/Footer'
import { useEffect } from 'react';

export default function LoggedMainPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
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
    <div className="logged-main-page min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header />
      </div>

      <div className="relative z-20">
          <Footer />
      </div>

    </div>
  );
}