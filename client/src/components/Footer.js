import React from 'react'
import './footercss/footer.css'

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div>
        <span className="logo">Dream <br/> Pizza</span>
      </div>
      <div className="footer-item">
            <div className="email-item">
                <span>EMAIL</span>
                <p>dreampizza@gmail.com</p>
                <br/>
            </div>
            <div className="phone-item">
                <span>PHONE</span>
                <p>+48 221 564 725</p>
            </div>
      </div>
      <div className="footer-item">
            <br/>
            <span className="open">OPEN</span>
            <br/>
            <p>Monday: 8:00-20:00</p>
            <p>Tuesday: 8:00-20:00</p>
            <p>Saturday: 8:00-20:00</p>
            <p>Thursday: 8:00-20:00</p>
            <p>Friday: 8:00-20:00</p>
            <p>Saturday: 8:00-17:00</p>
            <p>Sunday: 8:00-15:00</p>
            <br/>
      </div>
      <div className="footer-item">
        <span>City: London</span>
        <br/>
        <span className="street">Street: Hallam Street 47</span>
        <br/>
      </div>
    </footer>
  )
}
