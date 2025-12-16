import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUserTie, 
  faGraduationCap, 
  faMusic, 
  faLightbulb 
} from '@fortawesome/free-solid-svg-icons'

export default function AboutTeam() {
  const teamRef = useRef(null)

  const teamMembers = [
    {
      name: "Anna Ivanova",
      role: "Dibinātāja & Metodiskā nodaļas vadītāja",
      bio: "Pedagoge ar 15 gadu pieredzi, mūzikas izglītības metožu autore",
      icon: faGraduationCap
    },
    {
      name: "Marks Pētersons",
      role: "Tehniskais direktors",
      bio: "Izstrādātājs ar aizraušanos ar mūziku, izveido interaktīvas platformas 10 gadus",
      icon: faUserTie
    },
    {
      name: "Elena Sīdorova",
      role: "Kopienas kuratore",
      bio: "Mūzikas pasākumu organizatore un iesācēju mūziķu mentore",
      icon: faMusic
    },
    {
      name: "Dmitrijs Kozlovs",
      role: "Galvenais metodists",
      bio: "Izstrādā izglītības programmas un kuras saturu",
      icon: faLightbulb
    }
  ]

  return (
    <div className='about-team fade' ref={teamRef}>
      <div className='team-container'>
        <div className="section-header">
          <h2>Mūsu komanda</h2>
          <p className="section-subtitle">Profesionāļi, kurus vieno mīlestība pret mūziku un mācīšanu</p>
        </div>
        
        <div className="team-intro">
          <p>
            Mūsu komandu veido pieredzējuši pedagogi, mūziķi un izstrādātāji, 
            kuri kopīgi veido unikālu izglītojošu vidi.
          </p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-card-icon">
                <FontAwesomeIcon icon={member.icon} />
              </div>
              <h3 className="team-card-name">{member.name}</h3>
              <div className="team-card-role">{member.role}</div>
              <p className="team-card-bio">{member.bio}</p>
            </div>
          ))}
        </div>
        
        <div className="team-message">
          <div className="message-content">
            <FontAwesomeIcon icon={faMusic} className="message-icon" />
            <p>
              "Mēs ticam, ka ikviens var iemācīties spēlēt un saprast mūziku. 
              Mūsu misija — padarīt šo ceļu aizraujošu un pieejamu."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}