import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import {faEarthAmericas} from '@fortawesome/free-solid-svg-icons'

export default function MainPageCenter(){
const [count, setCount] = useState(700)
  const counterRef = useRef(null)
  const started = useRef(false)

    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          startCounter()
        }
      },
      {
        threshold: 0.8,
      }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const startCounter = () => {
    const start = 700
    const end = 1000
    const duration = 2000
    const startTime = performance.now()

    const easeOutExpo = (x) =>
      x === 1 ? 1 : 1 - Math.pow(2, -10 * x)

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const eased = easeOutExpo(progress)
      const value = Math.round(start + (end - start) * eased)

      setCount(value)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }


    return(
        <div className='MainPageCenter-hero fade'>
            <div className='MainPageCenter-content'>
                <div className="dynamic-text">
                    <h1>Vairāk nekā <span ref={counterRef} className="counter">{count}</span> lietotāju izvēlas</h1>   
                </div>
                <div className="pageCenterBox">
                    <div className="elementBox">
                        <div className="elementBox-i">
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        <div className="elementBox-text">
                            <p>Kvalitatīvu apmācību</p>
                        </div>
                    </div>

                    <div className="elementBox">
                        <div className="elementBox-i">
                            <FontAwesomeIcon icon={faPeopleGroup} />
                        </div>
                        <div className="elementBox-text">
                            <p>Draudzīgu kopienu</p>
                        </div>
                    </div>

                    <div className="elementBox">
                        <div className="elementBox-i">
                            <FontAwesomeIcon icon={faEarthAmericas} />
                        </div>
                        <div className="elementBox-text">
                            <p>Saziņu ar mūziķiem no visas pasaules</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}