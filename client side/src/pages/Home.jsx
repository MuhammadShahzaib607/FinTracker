import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faCheckCircle, faLifeRing } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal.jsx'
import { Button } from '@mui/material'

const HomePage = () => {

    const navigate = useNavigate()

    const [isTokenExist, setIsTokenExist] = useState(true)
const token = localStorage.getItem("token")

const tokenCheck = ()=> {
    if (!token) {
    setIsTokenExist(false)
} else {
    setIsTokenExist(true)
}
}

const logout = ()=> {
    localStorage.removeItem("token");
    navigate("/login")
}

useEffect(()=> {
tokenCheck()
}, [])
    
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">
                        <img src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-business-finance-logo-arrow-up-account-vector-picture-image_9798642.png" alt="FairRate Logo" />
                        <span>FinTracker</span>
                    </div>
                    <div className="contact-info">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+92 340 3004439</span>
                    </div>
                    <nav>
                        <ul style={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <li><Link to="/home">HOME</Link></li>
                            <li><Link to="/client">CLIENTS</Link></li>
                            <li><Link to="/recordEntry">TRANSACION</Link></li>
                          <Button variant="text" style={{
                            marginLeft: "10px"
                          }} onClick={logout}>Logout</Button>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1>Use FinTracker to Compare and Track Rates Easily</h1>
                        <p>Simple and smart way to explore different rates. Make better decisions with clear and organized information — all in one place.</p>
                        <p className="subtitle">No confusion. Just clarity.</p>
                        <a href="#" className="btn-primary">Start Using FinTracker</a>
                    </div>
                    <div className="hero-image">
                        <div className="rate-bubble" style={{ top: '10%', left: '70%' }}>12%</div>
                        <div className="rate-bubble" style={{ top: '25%', left: '60%' }}>18%</div>
                        <div className="rate-bubble" style={{ top: '15%', left: '85%' }}>10%</div>
                        <div className="rate-bubble large" style={{ top: '45%', left: '55%' }}>30%</div>
                        <div className="rate-bubble" style={{ top: '40%', left: '85%' }}>25%</div>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
            <div className="container">
  <h2 className="fin-title">How FinTracker Works?</h2>
  <div className="fin-steps">
    
    <div className="fin-step">
      <div className="fin-step-icon">
        <img src="/magnifyingGlassIcon.png" className="fin-img-1" alt="Home Icon" />
      </div>
      <h3 className="fin-step-heading">EXPLORE RATES</h3>
      <p className="fin-step-text">Discover various rate options from multiple providers—instantly and easily.</p>
    </div>

    <div className="fin-arrow">→</div>

    <div className="fin-step">
      <div className="fin-step-icon">
        <img src="/funnelIcon.png" className="fin-img-2" alt="Form Icon" />
      </div>
      <h3 className="fin-step-heading">FILTER YOUR NEEDS</h3>
      <p className="fin-step-text">Use simple filters to personalize what kind of rates you're looking for.</p>
    </div>

    <div className="fin-arrow">→</div>

    <div className="fin-step">
      <div className="fin-step-icon">
        <img src="/analysisIcon.png" className="fin-img-3" alt="Rate Icon" />
      </div>
      <h3 className="fin-step-heading">COMPARE & DECIDE</h3>
      <p className="fin-step-text">Review, compare, and choose the fairest rate that suits you best.</p>
    </div>

  </div>
</div>

            </section>

            <section className="testimonial">
                <div className="container">
                    <blockquote>
                        " FinTracker is simple, clean, and incredibly useful. I found the perfect rate in just a few minutes. Highly recommend giving it a try! "
                    </blockquote>
                    <div className="testimonial-author">
                        <p className="author-name">Muhammad Shahzaib</p>
                        <p className="author-title">Full Stack Developer</p>
                    </div>
                </div>
            </section>

            <section className="rate-finder">
                <div className="container">
                    <div className="rate-finder-content">
                        <h2>Need help comparing all those confusing rates?</h2>
                        <h3>FinTracker makes it easy</h3>
                        <p>With FinTracker, you don’t have to guess. Just explore and pick the best rate from real-time data in seconds.</p>
                        <ul className="benefits">
                            <li> Fast and easy to understand.</li>
                            <li> No sign-up or extra steps required.</li>
                        </ul>
                        <a href="#" className="btn-primary">EXPLORE FAIR RATES</a>
                    </div>
                    <div className="rate-bubbles">
                        {[
                            { top: '20%', left: '20%', rate: '10%' },
                            { top: '30%', left: '40%', rate: '9%' },
                            { top: '15%', left: '60%', rate: '25%' },
                            { top: '50%', left: '30%', rate: '18%' },
                            { top: '60%', left: '50%', rate: '10%' },
                            { top: '70%', left: '20%', rate: '9%' },
                            { top: '80%', left: '40%', rate: '30%', large: true },
                            { top: '85%', left: '60%', rate: '25%' },
                            { top: '70%', left: '70%', rate: '25%' },
                        ].map((bubble, i) => (
                            <div
                                key={i}
                                className={`rate-bubble${bubble.large ? ' large' : ''}`}
                                style={{ top: bubble.top, left: bubble.left }}
                            >
                                {bubble.rate}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="help">
                <div className="container">
                    <div className="help-icon">
                        <FontAwesomeIcon icon={faLifeRing} />
                    </div>
                    <h2>Need Help?</h2>
                    <p>Contact our Customer Support that is always ready to help you with any possible questions, problems or information.</p>
                    <div className="support-email">fintracker208@gmail.com</div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <div className="footer-columns">
                        <div className="footer-column">
                            <h4>Let’s connect</h4>
                            <div>fintracker208@gmail.com</div>
                            <p className="phone"><FontAwesomeIcon icon={faPhone} /> +92 340 3004439</p>
                            <div className="social-icons">
                                <a href="#"><img src='/facebookLogo.png' className="fab fa-facebook" /></a>
                                <a href="#"><img src='/instagramLogo.png' className="fab fa-instagram" /></a>
                                <a href="#"><img src='/linkedInLogo.png' className="fab fa-linkedin" /></a>
                            </div>
                        </div>
                        <div className="footer-column">
                            <h4>COMPANY</h4>
                            <ul>
                                <li><a href="">Resources</a></li>
                                <li><a href="">Careers</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>LEGAL</h4>
                            <ul>
                                <li><a href="">Privacy Policy</a></li>
                                <li><a href="">Terms of Use</a></li>
                                <li><a href="">Licensing & Disclosures</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <div className="footer-logo">
                                <img src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-business-finance-logo-arrow-up-account-vector-picture-image_9798642.png" alt="FairRate Logo" />
                                <span>FinTracker</span>
                            </div>
                            <p>FinTracker helps you understand and compare financial rates with ease — no signups, no hassle.</p>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>© 2025 FinTracker. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default HomePage