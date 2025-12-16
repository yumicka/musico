import Header from '@/Components/MainPage/Logged/Header'
import AnimatedBackground from '@/Components/MainPage/Logged/AnimatedBackground'
import Sidebar from '@/Components/MainPage/Logged/Sidebar'
import NewsFeed from '@/Components/MainPage/Logged/NewsFeed';
import Footer from '@/Components/WelcomePage/Footer'
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';


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

  const { auth } = usePage().props;
  const user = auth.user;

  return (
    <div className="logged-main-page min-h-screen bg-black text-white">
      <AnimatedBackground />
      
      <div className="relative z-20">
        <Header />
      </div>

      <div className="relative z-10">
        <div className="content-wrapper">
          <aside className="loggedMainPage__sidebar">
            <Sidebar />
          </aside>

          <main className="loggedMainPage__content">
            <div className="fade">
              <h1>Ar kādu noti sāksi savu dienu, {user.name}?</h1>
            </div>

            <div style={{ marginTop: 24 }}>
              <NewsFeed />
            </div>
          </main>
        </div>
        <Footer />
      </div>

    </div>
  );
}