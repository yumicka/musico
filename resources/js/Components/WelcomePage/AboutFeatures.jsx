import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCheckCircle, 
  faInfinity,
  faMobileAlt,
  faUsers,
  faChartLine,
  faAward
} from '@fortawesome/free-solid-svg-icons'

export default function AboutFeatures() {
  const featuresRef = useRef(null)

  const features = [
    {
      icon: faInfinity,
      title: "Pieejams 24/7",
      description: "Mācieties jebkurā laikā, no jebkuras ierīces"
    },
    {
      icon: faMobileAlt,
      title: "Mobilitāte",
      description: "Lietotne iOS un Android ierīcēm mācībām ceļā"
    },
    {
      icon: faUsers,
      title: "Dzīva kopiena",
      description: "Saņemieties ar mūziķiem no visas pasaules"
    },
    {
      icon: faChartLine,
      title: "Progresa uzraudzība",
      description: "Personīgā statistika un ieteikumi"
    },
    {
      icon: faAward,
      title: "Sertifikācija",
      description: "Oficiāli sertifikāti par kursu apguvi"
    },
    {
      icon: faCheckCircle,
      title: "Kvalitātes garantija",
      description: "Visi materiāli pārbaudīti profesionāļu"
    }
  ]

  return (
    <div className='about-features fade' ref={featuresRef}>
      <div className='features-container'>
        <div className="section-header">
          <h2>Kāpēc izvēlēties mūs</h2>
          <p className="section-subtitle">Priekšrocības, kas padara mācīšanos efektīvu un aizraujošu</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <div className="feature-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}