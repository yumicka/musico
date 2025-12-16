import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faHeart, faHandsHelping } from '@fortawesome/free-solid-svg-icons'

export default function AboutMission() {
  const missionRef = useRef(null)

  const missionPoints = [
    {
      icon: faBullseye,
      title: "Mūsu mērķis",
      description: "Padarīt mūzikas izglītību pieejamu ikvienam, neatkarīgi no vecuma, līmeņa vai dzīvesvietas."
    },
    {
      icon: faHeart,
      title: "Mūsu vērtības",
      description: "Mēs ticam mūzikas spējai vienot cilvēkus, iedvesmot radošumu un attīstīt personību."
    },
    {
      icon: faHandsHelping,
      title: "Mūsu pieeja",
      description: "Tradicionālo metožu apvienošana ar modernām tehnoloģijām efektīvai un aizraujošai mācīšanai."
    }
  ]

  return (
    <div className='about-mission fade' ref={missionRef}>
      <div className='mission-container'>
        <div className="section-header">
          <h2>Mūsu misija</h2>
        </div>
        
        <div className="mission-content">
          <div className="mission-text">
            <p>
              Mūzika ir universāla valoda, ko saprot ikviens. Mēs izveidojām šo platformu, 
              lai nojauktu barjeras mūzikas izglītībā un dotu iespēju ikvienam 
              realizēt savu radošo potenciālu.
            </p>
          </div>
          
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-number">6 gadi</div>
              <div className="stat-label">tirgū</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">40+</div>
              <div className="stat-label">valstis</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">apmierināto skolēnu</div>
            </div>
          </div>
        </div>
        
        <div className="mission-points">
          {missionPoints.map((point, index) => (
            <div className="mission-point" key={index}>
              <div className="point-icon">
                <FontAwesomeIcon icon={point.icon} />
              </div>
              <h3 className="point-title">{point.title}</h3>
              <p className="point-description">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}