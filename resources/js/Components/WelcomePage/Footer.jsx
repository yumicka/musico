import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFacebook, 
  faInstagram, 
  faYoutube,
  faTwitter,
  faTiktok
} from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: faFacebook, url: "https://facebook.com", label: "Facebook" },
    { icon: faInstagram, url: "https://instagram.com", label: "Instagram" },
    { icon: faYoutube, url: "https://youtube.com", label: "YouTube" },
    { icon: faTwitter, url: "https://twitter.com", label: "Twitter" },
    { icon: faTiktok, url: "https://tiktok.com", label: "TikTok" }
  ]

  const footerLinks = [
    {
      title: "Mācības",
      links: [
        { text: "Kursi", url: "#" },
        { text: "Metodes", url: "#" },
        { text: "Pasniedzēji", url: "#" },
        { text: "Cenas", url: "#" }
      ]
    },
    {
      title: "Kopiena",
      links: [
        { text: "Forums", url: "#" },
        { text: "Pasākumi", url: "#" },
        { text: "Blogs", url: "#" },
        { text: "Panākumu stāsti", url: "#" }
      ]
    },
    {
      title: "Uzņēmums",
      links: [
        { text: "Par mums", url: "#" },
        { text: "Kontakti", url: "#" },
        { text: "Vakances", url: "#" },
        { text: "Partneri", url: "#" }
      ]
    },
    {
      title: "Juridiska informācija",
      links: [
        { text: "Privātuma politika", url: "#" },
        { text: "Lietošanas noteikumi", url: "#" },
        { text: "Sīkfaili", url: "#" },
        { text: "BUJ", url: "#" }
      ]
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>Musico Platform</h3>
            <p className="footer-tagline">
              Mūzikas izglītība katram
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-links">
            {footerLinks.map((section, index) => (
              <div className="footer-section" key={index}>
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} Musico Platform. Visas tiesības aizsargātas.
              <span className="footer-heart">
                Izveidots ar <FontAwesomeIcon icon={faHeart} /> mūziķiem
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}