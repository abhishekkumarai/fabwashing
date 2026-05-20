'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import styles from './page.module.css';

// Active areas mapping
const ACTIVE_PINCODES = ['800025', '801503', '800001', '800020', '800013'];

export default function Home() {
  const router = useRouter();
  const { setSelectedService } = useCart();
  const [pincode, setPincode] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6) {
      setCheckStatus('error');
      return;
    }

    setChecking(true);
    setCheckStatus('idle');

    setTimeout(() => {
      setChecking(false);
      if (ACTIVE_PINCODES.includes(pincode.trim())) {
        setCheckStatus('success');
      } else {
        setCheckStatus('error');
      }
    }, 800);
  };

  const handleServiceSelect = (serviceKey: string) => {
    setSelectedService(serviceKey);
    router.push('/services');
  };

  const services = [
    {
      key: 'wash-fold',
      name: 'Wash & Fold',
      desc: 'Professionally washed, tumble-dried, and neatly folded everyday apparel.',
      icon: '🧺',
      rate: '₹20/piece',
      color: 'var(--color-wash-fold)',
      bgColor: 'rgba(0, 116, 188, 0.08)',
    },
    {
      key: 'wash-iron',
      name: 'Wash & Iron',
      desc: 'Thorough cleaning followed by professional ironing for crisp, clean apparel.',
      icon: '👔',
      rate: '₹25/piece',
      color: 'var(--color-wash-iron)',
      bgColor: 'rgba(198, 62, 150, 0.08)',
    },
    {
      key: 'steam-iron',
      name: 'Steam Ironing',
      desc: 'High-pressure steam treatment to eliminate creases and refresh fabric styling.',
      icon: '💨',
      rate: '₹15/piece',
      color: 'var(--color-steam-iron)',
      bgColor: 'rgba(104, 80, 161, 0.08)',
    },
    {
      key: 'dry-clean',
      name: 'Dry Cleaning',
      desc: 'Expert care and chemical processing for delicate, premium, and formal wear.',
      icon: '✨',
      rate: '₹70/piece',
      color: 'var(--color-dry-clean)',
      bgColor: 'rgba(0, 149, 153, 0.08)',
    },
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              <span>⚡</span> 24-Hour Doorstep Delivery
            </div>
            <h1 className={styles.heroTitle}>
              Your Laundry, <br />
              <span className={styles.heroTitleHighlight}>on Autopilot</span>
            </h1>
            <p className={styles.heroDesc}>
              No more washing, drying, or ironing. Experience India&apos;s premium eco-friendly digital laundry service. Doorstep pickup, sustainable processing, and express delivery.
            </p>

            {/* Serviceability Checker */}
            <div className={styles.checkerBox}>
              <h3 className={styles.checkerTitle}>Check Serviceability in Your Area</h3>
              <form onSubmit={handlePincodeSubmit} className={styles.checkerForm}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 800025)"
                  className={styles.checkerInput}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                />
                <button type="submit" className={styles.checkerBtn} disabled={checking}>
                  {checking ? 'Checking...' : 'Check Pincode'}
                </button>
              </form>

              {checkStatus === 'success' && (
                <div className={`${styles.checkerResult} ${styles.checkerSuccess}`}>
                  🎉 We serve your location! You can schedule a pickup now.
                </div>
              )}
              {checkStatus === 'error' && (
                <div className={`${styles.checkerResult} ${styles.checkerError}`}>
                  📍 Service not available or invalid pincode. (Try active mock codes: 800025, 801503, 800001)
                </div>
              )}
            </div>
          </div>

          {/* Hero Illustration / Statistics */}
          <div className={styles.heroRight}>
            <div className={styles.heroIllustration}>
              <div className={styles.statGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statVal}>24h</span>
                  <span className={styles.statLbl}>Standard Delivery</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statVal}>100%</span>
                  <span className={styles.statLbl}>EV Fleet Deliveries</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statVal}>30L+</span>
                  <span className={styles.statLbl}>Gallons Water Saved</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statVal}>4.8★</span>
                  <span className={styles.statLbl}>User App Rating</span>
                </div>
              </div>

              <div className={styles.sprintPromo}>
                <span className={styles.sprintBadge}>Sprint</span>
                <span className={styles.sprintText}>
                  Need it urgently? 4-Hour Express Sprint available at checkout!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <h2 className={styles.servicesTitle}>Our Professional Services</h2>
          <p className={styles.servicesSubtitle}>
            We handle everything from daily wear to premium silk sarees, leather jackets, and heavy comforters with specialized care.
          </p>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div
                key={service.key}
                className={styles.serviceCard}
                style={{ '--card-accent': service.color, '--card-accent-bg': service.bgColor } as React.CSSProperties}
                onClick={() => handleServiceSelect(service.key)}
              >
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <span className={styles.serviceRate}>Starts at {service.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ClubUltimate Autopilot Section */}
      <section className="container">
        <div className={styles.clubSection}>
          <div className={styles.clubGrid}>
            <div>
              <h2 className={styles.clubTitle}>Put Your Laundry on Autopilot</h2>
              <h3 className={styles.clubSubtitle}>Introducing ClubUltimate Memberships</h3>
              <p className={styles.clubText}>
                No more scheduling pick-ups every week. Enjoy automated recurring schedules, zero delivery charges, guaranteed priority slots, and flat cashbacks. Starting at just ₹149/month.
              </p>
              <button onClick={() => router.push('/club-ultimate')} className="btn-secondary">
                Explore Membership Plans
              </button>
            </div>
            <div className={styles.clubRight}>
              <ul className={styles.clubBenefitsList}>
                <li className={styles.clubBenefitItem}>
                  <span className={styles.clubBenefitCheck}>✓</span> Guaranteed pickup slot availability
                </li>
                <li className={styles.clubBenefitItem}>
                  <span className={styles.clubBenefitCheck}>✓</span> Set autopilot recurring schedules
                </li>
                <li className={styles.clubBenefitItem}>
                  <span className={styles.clubBenefitCheck}>✓</span> Up to 10% monthly cashback
                </li>
                <li className={styles.clubBenefitItem}>
                  <span className={styles.clubBenefitCheck}>✓</span> Zero surge pricing, zero delivery fees
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <h2 className={styles.hiwTitle}>How FabWashing Works</h2>
          <div className={styles.hiwTimeline}>
            <div className={styles.hiwStep}>
              <div className={styles.hiwNum}>1</div>
              <h3 className={styles.hiwHeading}>You Schedule</h3>
              <p className={styles.hiwText}>
                Select the items you want cleaned, pick a pickup and delivery window, and book in a couple of clicks.
              </p>
            </div>
            <div className={styles.hiwStep}>
              <div className={styles.hiwNum}>2</div>
              <h3 className={styles.hiwHeading}>We Clean</h3>
              <p className={styles.hiwText}>
                Our specialized facilities wash, dry, iron, or dry-clean your garments using eco-friendly materials.
              </p>
            </div>
            <div className={styles.hiwStep}>
              <div className={styles.hiwNum}>3</div>
              <h3 className={styles.hiwHeading}>We Deliver</h3>
              <p className={styles.hiwText}>
                Your fresh, neatly packed clothes are brought back to your doorstep within 24 hours via our EV fleet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className={styles.testimonialsTitle}>What Our Customers Say</h2>
          <p className={styles.testimonialsSubtitle}>
            Join thousands of happy households in Patna who use FabWashing.
          </p>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testCard}>
              <div className={styles.testStars}>★★★★★</div>
              <p className={styles.testQuote}>
                &quot;Absolutely flawless service. The 24-hour turnaround is real. The clothes came back smelling fresh, folded beautifully, and delivered in zero-plastic packaging. Highly recommended!&quot;
              </p>
              <div className={styles.testUser}>
                <div className={styles.testAvatar}>R</div>
                <div className={styles.testUserInfo}>
                  <span className={styles.testName}>Rohan Sharma</span>
                  <span className={styles.testLoc}>Chotti Rukanpura, Patna</span>
                </div>
              </div>
            </div>

            <div className={styles.testCard}>
              <div className={styles.testStars}>★★★★★</div>
              <p className={styles.testQuote}>
                &quot;ClubUltimate has put my laundry on autopilot. I have set weekly Saturday morning pickups. The delivery rider arrives in an EV exactly on time. Outstanding convenience.&quot;
              </p>
              <div className={styles.testUser}>
                <div className={styles.testAvatar}>P</div>
                <div className={styles.testUserInfo}>
                  <span className={styles.testName}>Priya Patel</span>
                  <span className={styles.testLoc}>Saguna More, Patna</span>
                </div>
              </div>
            </div>

            <div className={styles.testCard}>
              <div className={styles.testStars}>★★★★★</div>
              <p className={styles.testQuote}>
                &quot;Tried their Steam Ironing express. Got my formal wear back in 4 hours flat. The quality of packaging and care is superior to any local ironwalas around.&quot;
              </p>
              <div className={styles.testUser}>
                <div className={styles.testAvatar}>A</div>
                <div className={styles.testUserInfo}>
                  <span className={styles.testName}>Amit Verma</span>
                  <span className={styles.testLoc}>Kankarbagh, Patna</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
