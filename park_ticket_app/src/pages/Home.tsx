import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Home.css';
import heroImage from '../assets/images/hero-info-video-image-1.jpg';
import videoImage from '../assets/images/hero-info-video-image-2.jpg';
import aboutImg from '../assets/images/about-us-img-1.jpg';
import aboutImg1 from '../assets/images/about-us-img-2.jpg';
import aboutImg2 from '../assets/images/about-us-img-3.jpg';
import parkImage from '../assets/images/create_img.png';
import { FaRegClock, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";


const Home = () => {
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttraction();
  }, []);

  const fetchAttraction = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAttraction();
      if (response.success) {
        setAttraction(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate('/book');
  };

  if (loading) {
    return <LoadingSpinner message="Loading attraction details..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Attraction</h2>
        <p>{error}</p>
        <Button onClick={fetchAttraction}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className='overlapping-gradient'></div>
        <div className="hero-content">
          <h1 className="hero-title">{attraction?.name}</h1>
          <p className="hero-subtitle">
            Welcome to a vibrant destination where thrills ignite excitement, smiles come naturally, and every moment feels like a celebration. Set in the dynamic city of Dubai, this is where unforgettable experiences begin.
          </p>
          <Button onClick={handleBookNow} variant="secondary">
            Book Tickets Now →
          </Button>
          <a href="#attraction-details" className="btn btn-outline">
            Watch the Park Video →
          </a>
        </div>
        <div className="hero-secondary-layer">

          {/* Park Hours */}
          <div className="layer-content">
            <h3>
              <FaRegClock className="icon-clock" />
              Park Operating <br /> Hour
            </h3>

            <ul>
              <li>

                <strong>Monday - Thursday:</strong>
                <span> 10:00 AM - 8:00 PM</span>
              </li>
              <li>

                <strong>Friday - Saturday:</strong>
                <span> 10:00 AM - 8:00 PM</span>
              </li>
              <li>

                <strong>Sunday:</strong>
                <span> 9:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="layer-content imglyr">
            <img src={heroImage} alt="Attraction View" className="hero-image" />
          </div>

          {/* Contact Info */}
          <div className="layer-content">
            <h3>
              <FaPhoneAlt className="icon-clock" />
              Contact <br /> Information
            </h3>

            <ul>
              <li className='phone-text'>
                <FaPhoneAlt className="icon-text" />
                {attraction?.phone}
              </li>
              <li className='address-text'>
                <FaMapMarkerAlt className="icon-text" />
                {attraction?.location}
              </li>
            </ul>
          </div>

          <div className="layer-content imglyr">
            <img src={videoImage} alt="Attraction View" className="hero-image" />
            <span className="play-btn"></span>
          </div>

        </div>


      </div>

      <div className="list-of-park">
        <ul className="marquee-list">
          <li>Joyful Moments</li>
          <li>Magical Memories</li>
          <li>Thrilling Adventures</li>
          <li>Family Fun</li>
          <li>Exciting Rides</li>
          <li>Delicious Treats</li>
        </ul>
      </div>

      <div className="attraction-details">

        <div className="about-section">

          {/* Left Side - Images */}
          <div className="images-grid">
            <div className="image-card large-image">
              <img
                src={aboutImg}
                alt="Ferris wheel at sunset"
              />
            </div>

            <div className="image-card medium-image">
              <img
                src={aboutImg1}
                alt="Theme park overview"
              />
            </div>

            <div className="image-card small-image">
              <img
                src={aboutImg2}
                alt="Amusement park rides"
              />
            </div>

            <div className="experience-badge">
              <div className="icon"></div>
              <h3>25+</h3>
              <p>Years of experience</p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="content">


            <h1>About {attraction?.name}</h1>

            <p className="description">
              {attraction?.description}
            </p>

            {/* Contact Info */}
            <div className="contact-info">

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>Call Us At:</h4>
                  <p>{attraction?.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="contact-details">
                  <h4>Buy Tickets Online</h4>
                  <p>{attraction?.email}</p>
                </div>
              </div>

            </div>

            {/* Features */}
            <div className="features-list">
              <div className="feature-item">
                <div className="checkmark"></div>
                <p>Built for Fun-Lovers of All Ages</p>
              </div>
              <div className="feature-item">
                <div className="checkmark"></div>
                <p>Innovation That Elevates Every Visit</p>
              </div>
              <div className="feature-item">
                <div className="checkmark"></div>
                <p>A Celebration of Joy, Culture & Community</p>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-wrapper">
              <a href="#" className="cta-button">More About Us</a>

              <div className="years-badge">
                <div className="number">8</div>
                <div className="text">Years<br />Experience</div>
              </div>
            </div>

          </div>
        </div>

        <div className="middle-section">
          <div className="middle-content">


            <h1>Plan ahead for a full day of action, rides & festival vibes</h1>

            <p className="description">
              Step into a world of wonder where every ride brings joy and every
              corner is packed with adventure. From gentle rides for little ones
              to awe-inspiring attractions.
            </p>

            <div className="cta-section">
              <Button onClick={handleBookNow} variant="secondary">
                Book Tickets
              </Button>
              <div className="rating-section">
                <div className="avatars">
                  <div className="avatar avatar-1" />
                  <div className="avatar avatar-2" />
                  <div className="avatar avatar-3" />
                  <div className="avatar avatar-4" />
                  <div className="add-avatar">+</div>
                </div>

                <div className="rating-info">
                  <div className="rating-label">Google Rating</div>
                  <div className="rating-stars">
                    <span className="rating-number">5.0</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clouds */}
          <div className="clouds">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>

<div className="park-wrapper">
      <div className="park-track">
        <img src={parkImage} alt="Theme Park" />
        <img src={parkImage} alt="Theme Park clone" />
      </div>
    </div>

        </div>
      </div>
    </div>
  );
};

export default Home;