'use client';
import { useEffect } from 'react';

const STAR = 'M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z';

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': 'https://nowrapressurewashingsolutions.com.au/#business',
  name: 'Nowra Pressure Washing Solutions',
  url: 'https://nowrapressurewashingsolutions.com.au/',
  image: 'https://nowrapressurewashingsolutions.com.au/social-share.jpg',
  logo: 'https://nowrapressurewashingsolutions.com.au/logo.png',
  description:
    'Locally owned, insured pressure washing in Nowra and the wider Shoalhaven — driveways, patios, pavers, sandstone, retaining walls, decks and timber, plus hot-water cleaning for trucks, fleet, machinery and end-of-lease jobs.',
  slogan: 'Watch the years wash off.',
  email: 'enquiries@nowrapressurewashingsolutions.com.au',
  priceRange: '$$',
  currenciesAccepted: 'AUD',
  paymentAccepted: 'Cash, Bank transfer',
  knowsAbout: [
    'Pressure washing',
    'Driveway cleaning',
    'Patio and paver cleaning',
    'Sandstone and natural stone cleaning',
    'Retaining wall cleaning',
    'Deck and timber cleaning',
    'Soft washing',
    'Hot-water fleet and machinery cleaning',
    'End-of-lease and pre-sale cleaning',
  ],
  areaServed: [
    'Nowra', 'Bomaderry', 'North Nowra', 'Worrigee', 'Cambewarra', 'Berry',
    'Culburra Beach', 'Callala Bay', 'Vincentia', 'Huskisson', 'Sanctuary Point',
    'St Georges Basin', 'Sussex Inlet', 'Shoalhaven Heads', 'Greenwell Point',
    'Jervis Bay', 'Milton', 'Shoalhaven',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nowra',
    addressRegion: 'NSW',
    postalCode: '2541',
    addressCountry: 'AU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -34.8726, longitude: 150.6004 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '17:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pressure washing services',
    itemListElement: [
      'Driveway, patio & paver cleaning',
      'Sandstone & natural stone cleaning',
      'Retaining wall & blockwork cleaning',
      'Deck & timber cleaning',
      'Truck, fleet & machinery hot-water cleaning',
      'End-of-lease & pre-sale cleaning',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.__npwsInit) return;
    window.__npwsInit = true;

    const mnav = document.getElementById('mnav');
    const closeM = () => mnav && mnav.classList.remove('open');
    const burger = document.getElementById('burger');
    if (burger) burger.addEventListener('click', () => mnav.classList.toggle('open'));
    if (mnav) mnav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeM));

    // header shadow on scroll
    const hdr = document.getElementById('hdr');
    const onScroll = () => hdr && hdr.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });

    // before/after slider
    const slab = document.getElementById('slab');
    if (slab) {
      const reveal = document.getElementById('reveal');
      const div = document.getElementById('divider');
      const knob = document.getElementById('knob');
      const hint = slab.querySelector('.hint');
      const set = (p) => {
        p = Math.max(2, Math.min(98, p));
        reveal.style.clipPath = 'inset(0 0 0 ' + p + '%)';
        div.style.left = p + '%';
        knob.style.left = p + '%';
        knob.setAttribute('aria-valuenow', Math.round(p));
        if (hint) hint.style.opacity = p > 20 && p < 80 ? '0' : '1';
      };
      const fromX = (x) => {
        const r = slab.getBoundingClientRect();
        set(((x - r.left) / r.width) * 100);
      };
      let drag = false;
      const down = (e) => {
        drag = true;
        fromX((e.touches ? e.touches[0] : e).clientX);
        e.preventDefault();
      };
      slab.addEventListener('mousedown', down);
      slab.addEventListener('touchstart', down, { passive: false });
      window.addEventListener('mousemove', (e) => { if (drag) fromX(e.clientX); });
      window.addEventListener('touchmove', (e) => { if (drag) fromX(e.touches[0].clientX); }, { passive: false });
      window.addEventListener('mouseup', () => { drag = false; });
      window.addEventListener('touchend', () => { drag = false; });
      knob.addEventListener('keydown', (e) => {
        const n = parseFloat(knob.getAttribute('aria-valuenow')) || 50;
        if (e.key === 'ArrowLeft') { set(n - 4); e.preventDefault(); }
        if (e.key === 'ArrowRight') { set(n + 4); e.preventDefault(); }
      });
      set(38);
    }

    // quote form -> mailto
    const form = document.getElementById('quoteForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const g = (id) => (document.getElementById(id).value || '').trim();
        const body =
          'Name: ' + g('name') + '\r\n' +
          'Phone: ' + g('phone') + '\r\n' +
          'Email: ' + g('email') + '\r\n' +
          'Suburb: ' + g('suburb') + '\r\n' +
          'Service: ' + g('service') + '\r\n\r\n' +
          'Details:\r\n' + g('notes');
        window.location.href =
          'mailto:enquiries@nowrapressurewashingsolutions.com.au?subject=' +
          encodeURIComponent('Quote request — ' + (g('suburb') || 'Nowra')) +
          '&body=' + encodeURIComponent(body);
      });
    }

    // reveal on scroll
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver(
        (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }),
        { threshold: 0.12 }
      );
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    }
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />

      <header id="hdr">
        <div className="wrap nav">
          <a className="brand" href="#top" aria-label="Nowra Pressure Washing Solutions home">
            <img src="/logo.png" alt="Nowra Pressure Washing Solutions logo" width="1204" height="546" decoding="async" />
          </a>
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#why">Why us</a>
            <a href="#reviews">Reviews</a>
            <a href="#area">Service area</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-right">
            <a className="nav-phone" href="tel:04XXXXXXXX"><span>Call today</span>04XX XXX XXX</a>
            <a className="btn btn-hi" href="#quote">Get a free quote</a>
            <button className="burger" id="burger" aria-label="Menu"><i></i><i></i><i></i></button>
          </div>
        </div>
        <nav className="mnav" id="mnav">
          <a href="#services">Services</a>
          <a href="#why">Why us</a>
          <a href="#reviews">Reviews</a>
          <a href="#area">Service area</a>
          <a href="#faq">FAQ</a>
          <a href="tel:04XXXXXXXX">Call 04XX XXX XXX</a>
          <a className="btn btn-hi" href="#quote">Get a free quote</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" style={{ padding: 0 }}>
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Pressure Washing &middot; Nowra &middot; Shoalhaven</span>
              <h1>Watch the years<br /><em>wash off.</em></h1>
              <p className="lede">Reliable pressure washing for homes and business across Nowra and the Shoalhaven &mdash; from driveways, houses and decks to fleet washing and greasy machinery, cleaned properly with heated water. Clearing mould and organic growth doesn&rsquo;t just lift the look; it directly reduces the chance of falls, important around the house, critical at your business.</p>
              <div className="hero-actions">
                <a className="btn btn-hi" href="#quote">Get a free quote</a>
                <a className="btn btn-ghost" href="tel:04XXXXXXXX">Call 04XX XXX XXX</a>
              </div>
              <div className="trust">
                <b>Locally owned &amp; insured</b><b>Hot-water gear</b><b>Health professional endorsed</b>
              </div>
            </div>
            <div className="slab" id="slab">
              <div className="layer before"></div>
              <div className="layer after" id="reveal"></div>
              <div className="hint">Drag to see the difference</div>
              <span className="tag b">Before</span><span className="tag a">After</span>
              <div className="divider" id="divider"></div>
              <div className="knob" id="knob" role="slider" aria-label="Reveal clean surface" tabIndex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
                <svg viewBox="0 0 24 24"><path d="M9 7 4 12l5 5M15 7l5 5-5 5" /></svg>
              </div>
            </div>
          </div>
        </section>

        <section className="safety" style={{ padding: 0 }} id="safety">
          <div className="wrap safety-in">
            <div className="mark">!</div>
            <div>
              <h3>Slippery, dirty driveway? Act now.</h3>
              <p>Over 74,000 slip and trip related hospitalisations happen in Australia every year. We remove the organic growth on your driveway &mdash; restoring its grip and revitalising the look of your home.</p>
              <div className="src">Source: AIHW, 2022&ndash;23</div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">What we clean</span>
              <h2>One team for every hard surface</h2>
              <p>From a single driveway to a full commercial yard &mdash; the right pressure, the right chemistry, and hot water when the job calls for it. Pressure washing across Nowra and the Shoalhaven.</p>
            </div>
            <div className="svc-grid">
              <div className="svc reveal"><div className="num">01</div><h3>Driveways, patios &amp; pavers</h3><p>Concrete, brick and paver surfaces stripped of dirt, oil and years of grime.</p></div>
              <div className="svc reveal"><div className="num">02</div><h3>Sandstone &amp; natural stone</h3><p>Correct-pressure cleaning that lifts the muck without chewing up the finish.</p></div>
              <div className="svc reveal"><div className="num">03</div><h3>Retaining walls &amp; blockwork</h3><p>Moss, mould and staining cleared from walls, steps and structures.</p></div>
              <div className="svc reveal"><div className="num">04</div><h3>Decks &amp; timber</h3><p>Timber brought back to life without tearing up the grain.</p></div>
              <div className="svc reveal"><div className="num">05</div><h3>Trucks, fleet &amp; machinery</h3><p>Cutting through built-up grease, mud and road film on working gear.<span className="hot">Hot water</span></p></div>
              <div className="svc reveal"><div className="num">06</div><h3>End-of-lease &amp; pre-sale</h3><p>Sharp, photo-ready cleans for when first impressions actually count.</p></div>
            </div>
          </div>
        </section>

        <section id="why">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Why Nowra Pressure Washing</span>
              <h2>A local crew that turns up and does it right</h2>
              <p>No call centres. Just a Shoalhaven business that takes the work &mdash; and your property &mdash; seriously.</p>
            </div>
            <div className="why-grid">
              <div className="why-item reveal"><h3><span className="k">A</span>Locally owned &amp; insured</h3><p>A Nowra business you can actually get on the phone, fully insured for peace of mind.</p></div>
              <div className="why-item reveal"><h3><span className="k">B</span>Hot-water equipment</h3><p>Cuts through grease and oil that cold units simply leave behind.</p></div>
              <div className="why-item reveal"><h3><span className="k">C</span>Health professional endorsed</h3><p>Backed by a co-owner from the health profession &mdash; safety and hygiene taken seriously.</p></div>
              <div className="why-item reveal"><h3><span className="k">D</span>Cleaner runoff, by design</h3><p>With a civil-engineering background, we manage where the water goes and handle runoff responsibly.</p></div>
            </div>
          </div>
        </section>

        <section id="reviews">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">What people say</span>
              <h2>Built on word of mouth across the Shoalhaven</h2>
            </div>
            <div className="reviews">
              <div className="review reveal">
                <div className="stars"><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg></div>
                <p>&ldquo;Well spoken, considerate young crew who were able to answer all my questions. What a transformation.&rdquo;</p>
                <div className="who">Sharon K. <span>&middot; Bomaderry</span></div>
              </div>
              <div className="review reveal">
                <div className="stars"><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg></div>
                <p>&ldquo;Organised this service for my mother&rsquo;s place. Steep driveway with moss that had built up over the years, and the result was fantastic. Kind and courteous with her the whole time.&rdquo;</p>
                <div className="who">Melissa P. <span>&middot; Cambewarra</span></div>
              </div>
              <div className="review reveal">
                <div className="stars"><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg><svg viewBox="0 0 24 24"><path d={STAR} /></svg></div>
                <p>&ldquo;Got the driveway done surprisingly quick and to a high standard. Hassle-free service, thanks again.&rdquo;</p>
                <div className="who">Josh T. <span>&middot; Milton</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="area">
          <div className="wrap area-grid">
            <div className="reveal">
              <span className="eyebrow">Where we work</span>
              <h2 style={{ margin: '.6rem 0 1rem' }}>Nowra &amp; the surrounds</h2>
              <p className="lede">Based in Nowra, servicing from Berry to Sussex Inlet and everywhere in between. A little further out? Just ask &mdash; we&rsquo;ll do our best to schedule the work so we can still offer the value for money we&rsquo;re known for.</p>
              <div className="chips">
                <span className="chip star">Nowra</span><span className="chip">Bomaderry</span><span className="chip">North Nowra</span><span className="chip">Worrigee</span><span className="chip">Cambewarra</span><span className="chip">Berry</span><span className="chip">Culburra Beach</span><span className="chip">Callala Bay</span><span className="chip">Vincentia</span><span className="chip">Huskisson</span><span className="chip">Sanctuary Point</span><span className="chip">St Georges Basin</span><span className="chip">Sussex Inlet</span><span className="chip">Shoalhaven Heads</span><span className="chip">&amp; surrounds</span>
              </div>
            </div>
            <div className="reveal">
              <div className="radius" role="img" aria-label="Service radius centred on Nowra reaching Berry, Cambewarra, Culburra Beach, Jervis Bay and Sussex Inlet">
                <div className="compass"><svg viewBox="0 0 24 24"><path d="M12 3l4 9-4-2-4 2z" /></svg>N</div>
                <div className="ring r1"></div><div className="ring r2"></div><div className="ring r3"></div>
                <div className="core">NOWRA<br />BASE</div>
                <span className="tag" style={{ top: '9%', left: '54%' }}>Berry</span>
                <span className="tag" style={{ top: '23%', left: '5%' }}>Cambewarra</span>
                <span className="tag" style={{ top: '45%', right: 0 }}>Culburra Beach</span>
                <span className="tag" style={{ bottom: '17%', right: '8%' }}>Jervis Bay</span>
                <span className="tag" style={{ bottom: '5%', left: '40%' }}>Sussex Inlet</span>
              </div>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="wrap">
            <div className="sec-head reveal" style={{ textAlign: 'center', marginInline: 'auto' }}>
              <span className="eyebrow">Good to know</span>
              <h2>Questions we get asked a lot</h2>
            </div>
            <div className="faq">
              <details className="faq-item reveal"><summary>Will pressure washing damage my surfaces?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">We match the method to the surface. Timber, natural stone and other delicate finishes get low-pressure soft washing rather than high-pressure blasting, so they come up clean without being chewed up. Hard surfaces like concrete, aggregate and pavers handle more pressure.</div></details>
              <details className="faq-item reveal"><summary>Do you use my water and power?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">Typically yes &mdash; we run off your outdoor tap and power point. If that&rsquo;s not available or suitable, we can discuss alternatives as required.</div></details>
              <details className="faq-item reveal"><summary>Do you do commercial and fleet work?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">Yes. Our hot-water unit handles oil, grease and road grime on trucks, trailers, plant and workshop floors &mdash; the heavy-duty work cold-water-only operators can&rsquo;t shift. We also complete scheduled strata and commercial cleans.</div></details>
              <details className="faq-item reveal"><summary>Can you remove oil stains?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">We can make them a lot better, but it&rsquo;s worth being upfront &mdash; oil is one of the hardest things to shift. Concrete is porous, and unsealed concrete readily absorbs oil below the surface, so heat, pressure and specialised products lessen the stain but typically can&rsquo;t remove it entirely.</div></details>
              <details className="faq-item reveal"><summary>How much will it cost?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">Every job is priced on size and condition. For a standard driveway clean we can often quote straight from aerial imagery and a few photos &mdash; then we deliver the quote and walk you through it in detail. We work to a 24-hour turnaround.</div></details>
              <details className="faq-item reveal"><summary>What areas do you cover?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">Nowra and the surrounding Shoalhaven &mdash; from Berry down to Sussex Inlet and out to the Bay and coast. If you&rsquo;re a little further out, just ask and we&rsquo;ll be straight with you about whether we can make it work.</div></details>
              <details className="faq-item reveal"><summary>Are you insured?<span className="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span></summary><div className="faq-a">Yes, we carry the required insurances. We also implement sediment controls to manage runoff appropriately on every job.</div></details>
            </div>
          </div>
        </section>

        <section id="quote">
          <div className="wrap quote-grid">
            <div className="reveal">
              <span className="eyebrow">Get a free quote</span>
              <h2>Tell us what needs cleaning</h2>
              <p className="lede">Send a few details and we&rsquo;ll get back to you the same day with a price range. No obligation, no pressure.</p>
              <div className="contactlist">
                <a href="tel:04XXXXXXXX"><span className="ci"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg></span>04XX XXX XXX</a>
                <a href="mailto:enquiries@nowrapressurewashingsolutions.com.au"><span className="ci"><svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z" /><path d="m3 7 9 6 9-6" /></svg></span>enquiries@nowrapressurewashingsolutions.com.au</a>
              </div>
            </div>
            <form className="qform reveal" id="quoteForm" noValidate>
              <div className="photo-note">Got photos of the job? The button below opens your email app with your details filled in &mdash; attach a few photos there and we can quote straight off them.</div>
              <div className="fgrid">
                <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" /></div>
                <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
                <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" /></div>
                <div className="field"><label htmlFor="suburb">Suburb</label><input id="suburb" name="suburb" type="text" /></div>
              </div>
              <div className="field full"><label htmlFor="service">What needs cleaning?</label>
                <select id="service" name="service" defaultValue="">
                  <option value="" disabled>Choose a service&hellip;</option>
                  <option>Driveway, patios or concrete</option>
                  <option>Sandstone &amp; natural stone</option>
                  <option>Retaining walls &amp; blockwork</option>
                  <option>Decks &amp; timber</option>
                  <option>Trucks, fleet or machinery</option>
                  <option>End-of-lease or pre-sale clean</option>
                  <option>A few things</option>
                </select>
              </div>
              <div className="field full"><label htmlFor="notes">Anything else? (size, condition, access)</label><textarea id="notes" name="notes"></textarea></div>
              <button className="btn btn-hi" type="submit">Send my enquiry</button>
              <p className="hint">Opens your email app with the details ready to send. Prefer to talk? Call 04XX XXX XXX.</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <img src="/logo.png" alt="Nowra Pressure Washing Solutions logo" width="1204" height="546" decoding="async" />
              <p>Reliable, professional exterior cleaning for homes and business across Nowra and the surrounds &mdash; done properly, on time.</p>
              <div className="socials" aria-label="Follow us">
                <a href="https://www.facebook.com/YOUR-PAGE" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg></a>
                <a href="https://www.instagram.com/YOUR-HANDLE" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg></a>
              </div>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              <a href="#services">Driveways &amp; patios</a>
              <a href="#services">Sandstone &amp; natural stone</a>
              <a href="#services">Fleet &amp; hot-water</a>
              <a href="#services">End-of-lease cleans</a>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <a href="#why">Why us</a>
              <a href="#reviews">Reviews</a>
              <a href="#area">Service area</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <a href="tel:04XXXXXXXX">04XX XXX XXX</a>
              <a href="mailto:enquiries@nowrapressurewashingsolutions.com.au">enquiries@nowrapressurewashingsolutions.com.au</a>
              <a href="#quote">Request a quote</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>&copy; 2026 Nowra Pressure Washing Solutions &middot; ABN 21 785 952 316</span>
            <span className="badge">Locally owned &amp; insured &middot; Health professional endorsement</span>
          </div>
        </div>
      </footer>
    </>
  );
}
