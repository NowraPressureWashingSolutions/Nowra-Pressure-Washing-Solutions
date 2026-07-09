'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.__npwsInit) return;
    window.__npwsInit = true;
const hdr=document.getElementById('hdr');
  window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',window.scrollY>20),{passive:true});

  const menuBtn=document.getElementById('menuBtn'),mobileNav=document.getElementById('mobileNav');
  menuBtn.addEventListener('click',()=>mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));

  (function(){const t=document.getElementById('ticker');t.innerHTML+=t.innerHTML;})();

  (function(){
    const ba=document.getElementById('ba'),before=document.getElementById('baBefore'),divider=document.getElementById('baDivider'),handle=document.getElementById('baHandle');
    let pos=50,userTouched=false;
    function set(p){pos=Math.max(0,Math.min(100,p));before.style.clipPath='inset(0 '+(100-pos)+'% 0 0)';divider.style.left=pos+'%';handle.style.left=pos+'%';ba.setAttribute('aria-valuenow',Math.round(pos));}
    function fromEvent(e){const r=ba.getBoundingClientRect();const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;set((x/r.width)*100);}
    let dragging=false;
    const start=e=>{dragging=true;userTouched=true;fromEvent(e);};
    const move=e=>{if(dragging){fromEvent(e);if(e.cancelable)e.preventDefault();}};
    const end=()=>dragging=false;
    ba.addEventListener('mousedown',start);window.addEventListener('mousemove',move);window.addEventListener('mouseup',end);
    ba.addEventListener('touchstart',start,{passive:true});window.addEventListener('touchmove',move,{passive:false});window.addEventListener('touchend',end);
    ba.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){userTouched=true;set(pos-4);e.preventDefault();}if(e.key==='ArrowRight'){userTouched=true;set(pos+4);e.preventDefault();}});
    set(50);
    const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(!reduce){
      const seq=[[18,700],[82,1400],[50,2100]];let t0=null;
      function step(ts){if(userTouched)return;if(!t0)t0=ts;const el=ts-t0;
        let from=50,to=18,s=0,dur=700;
        for(let i=0;i<seq.length;i++){const prevT=i===0?0:seq[i-1][1];if(el<seq[i][1]){from=i===0?50:seq[i-1][0];to=seq[i][0];s=prevT;dur=seq[i][1]-prevT;break;}if(i===seq.length-1){set(50);return;}}
        const k=Math.min(1,(el-s)/dur);set(from+(to-from)*(0.5-0.5*Math.cos(k*Math.PI)));requestAnimationFrame(step);}
      setTimeout(()=>requestAnimationFrame(step),600);
    }
  })();

  const io=new IntersectionObserver((es)=>{es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}})},{threshold:0.12});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3*0.07)+'s';io.observe(el);});

  const counters=document.querySelectorAll('.stat .n');
  const cio=new IntersectionObserver((es)=>{es.forEach(en=>{if(en.isIntersecting){const el=en.target;const target=+el.dataset.target;const suf=el.dataset.suffix||'';if(isNaN(target)){cio.unobserve(el);return;}const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(reduce){el.textContent=target+suf;cio.unobserve(el);return;}
    let s=null;const dur=1100;function tick(ts){if(!s)s=ts;const k=Math.min(1,(ts-s)/dur);el.textContent=Math.round(target*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);cio.unobserve(el);}})},{threshold:0.5});
  counters.forEach(c=>cio.observe(c));
  setTimeout(()=>{counters.forEach(c=>{if(c.textContent==='0'){c.textContent=(+c.dataset.target)+(c.dataset.suffix||'');}});},4000);

  document.getElementById('quoteForm').addEventListener('submit',function(e){
    e.preventDefault();
    const v=id=>(document.getElementById(id).value||'').trim();
    const name=v('name'),phone=v('phone');
    if(!name||!phone){alert('Please add your name and phone so we can get back to you.');return;}
    const body='Name: '+name+'\n'+'Phone: '+phone+'\n'+'Email: '+v('email')+'\n'+'Suburb: '+v('suburb')+'\n'+'Service: '+v('service')+'\n\n'+(v('message')?'Details: '+v('message'):'');
    window.location.href='mailto:NowraPressureWashingSolutions@gmail.com?subject='+encodeURIComponent('Quote request \u2014 '+name+(v('suburb')?' ('+v('suburb')+')':''))+'&body='+encodeURIComponent(body);
  });
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": [\"LocalBusiness\", \"HomeAndConstructionBusiness\"], \"@id\": \"https://YOURDOMAIN.com.au/#business\", \"name\": \"Nowra Pressure Washing Solutions\", \"url\": \"https://YOURDOMAIN.com.au/\", \"image\": \"https://YOURDOMAIN.com.au/social-share.jpg\", \"logo\": \"https://YOURDOMAIN.com.au/logo.png\", \"description\": \"Locally owned pressure washing in Nowra and the wider Shoalhaven — driveways, house and soft washing, decks, plus hot-water cleaning for trucks, fleet, machinery and commercial premises.\", \"telephone\": \"04XX XXX XXX\", \"email\": \"NowraPressureWashingSolutions@gmail.com\", \"priceRange\": \"$$\", \"currenciesAccepted\": \"AUD\", \"address\": {\"@type\": \"PostalAddress\", \"addressLocality\": \"Nowra\", \"addressRegion\": \"NSW\", \"postalCode\": \"2541\", \"addressCountry\": \"AU\"}, \"geo\": {\"@type\": \"GeoCoordinates\", \"latitude\": -34.8726, \"longitude\": 150.6004}, \"areaServed\": [\"Nowra\", \"Bomaderry\", \"North Nowra\", \"Worrigee\", \"Cambewarra\", \"Berry\", \"Culburra Beach\", \"Callala Bay\", \"Vincentia\", \"Huskisson\", \"Sanctuary Point\", \"St Georges Basin\", \"Sussex Inlet\", \"Shoalhaven Heads\", \"Greenwell Point\"], \"openingHoursSpecification\": [{\"@type\": \"OpeningHoursSpecification\", \"dayOfWeek\": [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"], \"opens\": \"07:00\", \"closes\": \"17:00\"}], \"hasOfferCatalog\": {\"@type\": \"OfferCatalog\", \"name\": \"Pressure washing services\", \"itemListElement\": [{\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"House &amp; soft washing\"}}, {\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"Driveway, path &amp; concrete cleaning\"}}, {\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"Deck, fence &amp; timber cleaning\"}}, {\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"Truck, fleet &amp; machinery hot-water cleaning\"}}, {\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"Shopfront, factory &amp; strata cleaning\"}}, {\"@type\": \"Offer\", \"itemOffered\": {\"@type\": \"Service\", \"name\": \"End-of-lease &amp; pre-sale cleaning\"}}]}}" }} />
      <header id="hdr">
<div className="wrap nav">
<a className="brand" href="#top" aria-label="Nowra Pressure Washing Solutions home"><img src="/logo.png" alt="Nowra Pressure Washing Solutions logo" width="860" height="401" decoding="async" /></a>
<nav>
<ul>
<li><a href="#services">Services</a></li>
<li><a href="#why">Why us</a></li>
<li><a href="#area">Service area</a></li>
<li><a href="#faq">FAQ</a></li>
</ul>
</nav>
<div className="nav-cta">
<a className="nav-phone" href="tel:+61400000000"><svg viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1z" fill="currentColor" /></svg>04XX XXX XXX</a>
<a className="btn btn-primary" href="#quote">Get a free quote</a>
</div>
<button className="menu-btn" aria-label="Open menu" id="menuBtn"><span></span><span></span><span></span></button>
</div>
<div className="mobile-nav" id="mobileNav">
<a href="#services">Services</a>
<a href="#why">Why us</a>
<a href="#area">Service area</a>
<a href="#faq">FAQ</a>
<a href="tel:+61400000000">Call 04XX XXX XXX</a>
<a href="#quote">Get a free quote</a>
</div>
</header>
      <main id="top">
<section className="hero">
<div className="hero-bg" aria-hidden="true">
<span className="blob b1"></span><span className="blob b2"></span><span className="blob b3"></span>
<span className="droplet" style={{left: "12%", width: "14px", height: "18px", animationDuration: "9s", animationDelay: "0s"}}></span>
<span className="droplet" style={{left: "30%", width: "10px", height: "13px", animationDuration: "11s", animationDelay: "2.4s"}}></span>
<span className="droplet" style={{left: "48%", width: "18px", height: "23px", animationDuration: "10s", animationDelay: "1.2s"}}></span>
<span className="droplet" style={{left: "66%", width: "9px", height: "12px", animationDuration: "12s", animationDelay: "3.1s"}}></span>
<span className="droplet" style={{left: "82%", width: "15px", height: "19px", animationDuration: "9.5s", animationDelay: ".7s"}}></span>
</div>
<div className="wrap hero-grid">
<div>
<span className="rating-pill anim-up d1"><span className="s"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg></span>Locally owned & insured</span>
<h1 className="anim-up d2">Watch the years <span className="hl">wash off</span>.</h1>
<p className="lead anim-up d3">Reliable pressure washing for homes and business across the Shoalhaven — from driveways, houses and decks to fleet washing and greasy machinery, cleaned properly with heated water. Clearing mould and organic growth doesn’t just lift the look; it directly reduces the chance of falls, important around the house, critical at your business. </p>
<div className="hero-actions anim-up d4">
<a className="btn btn-primary pulse" href="#quote">Get a free quote</a>
<a className="btn btn-ghost" href="#services">See what we clean</a>
</div>
<div className="trust anim-up d5">
<span className="chip"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z" stroke="currentColor" strokeWidth="1.7" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>Locally owned & insured</span>
<span className="chip"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>Same-day quotes</span>
<span className="chip"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" /></svg>Nowra & surrounds</span>
<span className="chip"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3c2.5 3 4 5.2 4 7.5a4 4 0 1 1-8 0C8 8.2 9.5 6 12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M5 20c2-1.5 12-1.5 14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>Hot-water equipped</span>
</div>
</div>
<div className="anim-up d3">
<div className="ba-shell">
<div className="ba" id="ba" role="slider" aria-label="Driveway before and after pressure washing" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" tabIndex="0">
<img className="ba-img ba-after-img" src="/after.jpg" alt="Concrete driveway in Nowra after pressure washing by Nowra Pressure Washing Solutions" width="560" height="700" decoding="async" />
<div className="ba-before" id="baBefore"><img className="ba-img" src="/before.jpg" alt="Dirty concrete driveway in Nowra before pressure washing" width="560" height="700" decoding="async" /></div>
<span className="ba-label before">Before</span>
<span className="ba-label after">After</span>
<div className="ba-divider" id="baDivider"></div>
<div className="ba-handle" id="baHandle"><svg viewBox="0 0 24 24" fill="none"><path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
</div>
</div>
<div className="ba-caption"><svg viewBox="0 0 24 24" fill="none"><path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Drag to see the difference!</div>
</div>
</div>
</section>
<div className="ticker" aria-hidden="true">
<div className="ticker-track" id="ticker">
<span>Driveways</span><span>House washing</span><span>Soft washing</span><span>Decks & timber</span><span>Fleet & machinery</span><span>Hot-water degreasing</span><span>End-of-lease</span><span>Strata & commercial</span><span>Pre-sale cleans</span>
</div>
</div>
<section className="block stats">
<div className="wrap">
<div className="stats-grid">
<div className="stat reveal"><div className="n" data-target="6" data-suffix="">0</div><div className="l">Days a week (Mon–Sat)</div></div>
<div className="stat reveal"><div className="n" data-target="24" data-suffix="h">0</div><div className="l">Typical quote turnaround</div></div>
<div className="stat reveal"><div className="n">Free</div><div className="l">Quotes — no obligation</div></div>
</div>
</div>
</section>
<section className="block services" id="services">
<span className="wave wave-top"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#f3f9fb" d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,36 L1440,0 L0,0 Z" /></svg></span>
<div className="wrap">
<div className="sec-head reveal">
<span className="eyebrow">What we clean</span>
<h2>One crew for your home and your business.</h2>
<p>From the family driveway to the work ute and the factory floor — we match the method and pressure to the surface, so it comes up clean and stays sound.</p>
</div>
<div className="grp-label reveal"><span className="tag">Around the home</span></div>
<div className="svc-grid three">
<article className="svc reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 10v9h14v-9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg></div><h3>House & soft washing</h3><p>Low-pressure soft washing for render, cladding and painted walls — lifts mould, dirt and grime without stripping your finish.</p></article>
<article className="svc reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" /><path d="M3 11h18M8 6v12" stroke="currentColor" strokeWidth="1.8" /></svg></div><h3>Driveways, paths & concrete</h3><p>Aggregate, pavers, pebblecrete and plain concrete — grime, mould and tyre marks stripped back and evened out across the slab.</p></article>
<article className="svc reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M4 18V8l8-4 8 4v10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M4 18h16M8 18V10m4 8v-8m4 8v-8" stroke="currentColor" strokeWidth="1.8" /></svg></div><h3>Decks, fences & timber</h3><p>Timber-safe cleaning that brings greyed decks and fences back to life and leaves them ready for oil or stain.</p></article>
</div>
<div className="grp-label reveal"><span className="tag">For business & fleet</span></div>
<div className="svc-grid three">
<article className="svc reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M3 7h11v8H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M14 10h3.5L20 12.5V15h-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="7" cy="17" r="1.7" stroke="currentColor" strokeWidth="1.8" /><circle cx="17" cy="17" r="1.7" stroke="currentColor" strokeWidth="1.8" /></svg></div><h3>Trucks, fleet & machinery</h3><p>Hot water cuts through oil, grease and road grime on vehicles, trailers, plant and workshop floors that cold water just smears around.</p></article>
<article className="svc reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M4 9l1-4h14l1 4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M4 9h16v10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 19v-5h6v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg></div><h3>Shopfronts, factories & strata</h3><p>Scheduled, dependable exterior cleaning for businesses and complexes — entrances, awnings, bin areas and common ground kept presentable.</p></article>
<article className="svc reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" /><path d="M10.4 11.4 19 20m-3-1 2-2m-4 0 2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h3>End-of-lease & pre-sale</h3><p>Vacating or listing the property? A sharp clean of the driveway, paths and exterior helps tick the bond box and lift kerb appeal before inspections.</p></article>
</div>
</div>
</section>
<section className="block hotwater" id="hotwater">
<span className="wave wave-top"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#ffffff" d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,36 L1440,0 L0,0 Z" /></svg></span>
<div className="wrap hw-grid">
<div className="reveal">
<span className="eyebrow">The hot-water advantage</span>
<h2>Cold water for the everyday — <em>hot</em> water when it counts.</h2>
<p className="lead">We run standard pressure washers for the everyday work, plus a hot-water unit that heats the pressurised water. Heat is what cuts through oil, grease and ingrained grime that cold water just moves around — so one call covers both the family driveway and the greasy workshop floor.</p>
</div>
<div className="hw-split reveal">
<div className="hw-row"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3c2.5 3 4 5.2 4 7.5a4 4 0 1 1-8 0C8 8.2 9.5 6 12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></div><div><h3>Everyday cleaning — standard pressure</h3><p>Driveways, paths, house exteriors and decks, cleaned with our pressure washers at the right pressure for each surface.</p></div></div>
<div className="hw-row warm"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M9 3v4M13 2v5M17 4v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M5 11h14v3a7 7 0 0 1-14 0z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></div><div><h3>Tough, greasy jobs — hot water</h3><p>Our hot-water unit heats the pressurised water to lift oil, grease and ingrained grime off machinery, fleet, workshop floors and concrete — the jobs cold water just leaves behind.</p></div></div>
</div>
</div>
</section>
<section className="block why" id="why">
<div className="wrap">
<div className="sec-head reveal">
<span className="eyebrow">Why Nowra Pressure Washing</span>
<h2>The difference is in the details most operators skip.</h2>
<p>Anyone can hire a gurney. We compete on the four things customers actually tell us matter.</p>
</div>
<div className="why-grid">
<article className="why-card reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></div><h3>We turn up and we reply</h3><p>Fast quotes, clear communication and a job booked when we say. Reliability is the thing most people can’t get locally — so it’s where we start.</p></article>
<article className="why-card reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></div><h3>Safety-first, by background</h3><p>One of us is a registered nurse — it shows in how we work: clearing slip hazards properly and keeping chemicals and runoff away from kids, pets and garden beds.</p></article>
<article className="why-card reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.8" /><path d="M8 6l1.5-2h5L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg></div><h3>Proof, before and after</h3><p>We photograph every job, like the driveway up top. You see exactly what changed — and so can the next person deciding whether to book us.</p></article>
<article className="why-card reveal"><div className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21c5-2 8-6 8-11V5l-8-2-8 2v5c0 5 3 9 8 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 11c2 0 3-1 3-3 0 2 1 3 3 3-2 0-3 1-3 3 0-2-1-3-3-3z" fill="currentColor" /></svg></div><h3>Cleaner runoff, by design</h3><p>With a civil-engineering background, we manage where the water goes and put appropriate measures in place to handle runoff responsibly — the way councils and strata expect.</p></article>
</div>
</div>
</section>
<section className="block" id="process">
<span className="wave wave-top"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#082a3d" d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,36 L1440,0 L0,0 Z" /></svg></span>
<div className="wrap">
<div className="sec-head reveal"><span className="eyebrow">How it works</span><h2>From first call to clean, in three steps.</h2></div>
<div className="steps">
<article className="step reveal"><h3>Tell us about it</h3><p>Send us a few details or give us a quick call. We’ll give you a clear price range straight away, and confirm on site if needed — usually same day.</p></article>
<article className="step reveal"><h3>We clean it properly</h3><p>We pre-treat, pick the right pressure, temperature and method for each surface, manage runoff, and work tidy from start to finish.</p></article>
<article className="step reveal"><h3>You see the difference</h3><p>We walk the job with you, send before/after photos, and invoice the same day.</p></article>
</div>
</div>
</section>
<section className="block area" id="area">
<div className="wrap area-grid">
<div className="reveal">
<span className="eyebrow">Where we work</span>
<h2 style={{fontFamily: "var(--display)", fontSize: "clamp(1.9rem,3.6vw,2.7rem)", fontWeight: "800", margin: ".7rem 0 0"}}>Nowra and the surrounds.</h2>
<p style={{color: "var(--slate)", fontSize: "1.08rem", marginTop: "1rem", maxWidth: "48ch"}}>Based in Nowra, servicing from Berry to Sussex Inlet and everywhere in between. If you’re a little further out, just ask — we’ll do our best to schedule our work so we can still offer you the value for money we’re known for.</p>
<div className="suburbs">
<span>Nowra</span><span>Bomaderry</span><span>Worrigee</span><span>North Nowra</span>
<span>Cambewarra</span><span>Berry</span><span>Culburra Beach</span><span>Callala Bay</span>
<span>Vincentia</span><span>Huskisson</span><span>Sanctuary Point</span><span>St Georges Basin</span>
<span>Sussex Inlet</span><span>Shoalhaven Heads</span><span>Greenwell Point</span>
</div>
</div>
<div className="reveal">
<div className="radius">
<div className="compass"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l4 9-4-2-4 2z" fill="currentColor" /></svg>N</div>
<div className="ring r1"></div><div className="ring r2"></div><div className="ring r3"></div>
<div className="core">NOWRA<br />BASE</div>
<span className="tag" style={{top: "9%", left: "54%"}}>Berry</span>
<span className="tag" style={{top: "23%", left: "7%"}}>Cambewarra</span>
<span className="tag" style={{top: "45%", right: "1%"}}>Culburra Beach</span>
<span className="tag" style={{bottom: "17%", right: "8%"}}>Jervis Bay</span>
<span className="tag" style={{bottom: "5%", left: "42%"}}>Sussex Inlet</span>
</div>
</div>
</div>
</section>
<section className="block move" id="selling">
<span className="wave wave-top"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#ffffff" d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,36 L1440,0 L0,0 Z" /></svg></span>
<div className="wrap">
<span className="eyebrow center">Moving out or selling up?</span>
<h2>A clean exterior is the cheapest value you can add.</h2>
<p>Before you list or hand back the keys, consider a basic service from us. A sharp driveway, clean house and tidy paths lift kerb appeal and first impressions — boosting sellability and maximising your return on investment. Thinking of selling? Contact us today for a free quote.</p>
<a className="btn btn-aqua" href="#quote">Get my free quote</a>
</div>
<span className="wave wave-bottom"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#f3f9fb" d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,36 L1440,0 L0,0 Z" /></svg></span>
</section>
<section className="block" id="reviews">
<div className="wrap">
<div className="sec-head center reveal"><span className="eyebrow center">What people say</span><h2>Built on word of mouth across the Shoalhaven.</h2></div>
<div className="rev-grid">
<article className="rev reveal"><div className="stars" aria-label="5 out of 5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg></div><p>“Well spoken, considerate young crew who were able to answer all my questions. What a transformation.”</p><div className="who">Sharon K.<small>Bomaderry</small></div></article>
<article className="rev reveal"><div className="stars" aria-label="5 out of 5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg></div><p>“Organised this service for my mother’s place. Steep driveway with moss that had built up over the years, and the result was fantastic. Kind and courteous with her the whole time.”</p><div className="who">Melissa P.<small>Cambewarra</small></div></article>
<article className="rev reveal"><div className="stars" aria-label="5 out of 5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z" /></svg></div><p>“Got the driveway done surprisingly quick and to a high standard. Hassle free service, thanks again.”</p><div className="who">Josh T.<small>Culburra Beach</small></div></article>
</div>
</div>
</section>
<section className="block faq" id="faq">
<div className="wrap">
<div className="sec-head center reveal"><span className="eyebrow center">Good to know</span><h2>Questions we get asked a lot.</h2></div>
<div className="faq-list">
<details className="faq-item reveal"><summary>Will pressure washing damage my surfaces?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">We match the method to the surface. Render, painted walls and timber get low-pressure soft washing rather than high-pressure blasting, so they come up clean without being chewed up. Hard surfaces like concrete and aggregate handle more pressure.</div></details>
<details className="faq-item reveal"><summary>Do you use my water and power?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">Typically yes — we run off your outdoor tap and power point. If that’s not available or suitable, we can discuss alternatives as required.</div></details>
<details className="faq-item reveal"><summary>Do you do commercial and fleet work?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">Yes. Our hot-water unit handles oil, grease and road grime on trucks, trailers, plant, workshop floors and shopfronts — the heavy-duty work cold-water-only operators can’t shift. We also complete scheduled strata and commercial cleans.</div></details><details className="faq-item reveal"><summary>Can you remove oil stains?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">We can make them a lot better, but it’s worth being upfront — oil is one of the hardest things to shift. Concrete is porous, and unsealed concrete readily absorbs oil below the surface, so heat, pressure and specialised chemical products lessen the stain, however, typically cannot remove the stain in its entirety.</div></details>
<details className="faq-item reveal"><summary>How much will it cost?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">Every job is priced on size and condition. For a standard driveway clean we can often quote straight from aerial imagery and a few photos — then we deliver the quote and walk you through it in detail. We work to a 24-hour turnaround.</div></details>
<details className="faq-item reveal"><summary>What areas do you cover?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">Nowra and the surrounding Shoalhaven — from Berry down to Sussex Inlet and out to the Bay and coast. If you’re a little further out, just ask and we’ll be straight with you about whether we can make it work.</div></details>
<details className="faq-item reveal"><summary>Are you insured?<span className="plus"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg></span></summary><div className="a">Yes, we carry the required insurances. We also implement sediment controls to manage runoff appropriately on every job.</div></details>
</div>
</div>
</section>
<section className="block quote" id="quote">
<span className="wave wave-top"><svg viewBox="0 0 1440 64" preserveAspectRatio="none"><path fill="#f3f9fb" d="M0,32 C240,72 480,0 720,24 C960,48 1200,8 1440,36 L1440,0 L0,0 Z" /></svg></span>
<div className="wrap quote-grid">
<div className="reveal">
<span className="eyebrow" style={{color: "var(--aqua)"}}>Get a free quote</span>
<h2>Tell us what needs cleaning.</h2>
<p className="lead">Send a few details and we’ll get back to you the same day with a price range. No obligation, no pressure.</p>
<div className="qcontact">
<a href="tel:+61400000000"><span className="ic"><svg viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1z" fill="currentColor" /></svg></span><span className="big">04XX XXX XXX</span></a>
<a href="mailto:NowraPressureWashingSolutions@gmail.com"><span className="ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></span>NowraPressureWashingSolutions@gmail.com</a>
</div>
</div>
<form id="quoteForm" noValidate="">
<div className="two">
<div className="field"><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" required /></div>
<div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" required /></div>
</div>
<div className="two">
<div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" /></div>
<div className="field"><label htmlFor="suburb">Suburb</label><input id="suburb" name="suburb" type="text" /></div>
</div>
<div className="field">
<label htmlFor="service">What needs cleaning?</label>
<select id="service" name="service">
<option value="" selected disabled>Choose a service…</option>
<option>House / soft washing</option>
<option>Driveway, paths or concrete</option>
<option>Deck / timber</option>
<option>Truck, fleet or machinery</option>
<option>Shopfront / strata / commercial</option>
<option>End-of-lease or pre-sale clean</option>
<option>A few things</option>
</select>
</div>
<div className="field"><label htmlFor="message">Anything else? (size, condition, access)</label><textarea id="message" name="message"></textarea></div>
<div className="photo-note"><span className="ic"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="8.5" cy="10" r="1.6" fill="currentColor" /><path d="M21 16l-5.5-5-4 4-2-2L3 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span><p>Got photos of the job? This button opens your email app with your details already filled in — attach a few photos there before you hit send and we’ll quote straight off them.</p></div>
<button className="btn btn-primary" type="submit">Send my enquiry</button>
<p className="form-note">Opens your email app with the details ready to send. Prefer to talk? Call 04XX XXX XXX.</p>
</form>
</div>
</section>
</main>
      <footer>
<div className="wrap">
<div className="foot-grid">
<div className="foot-brand">
<div className="name">Nowra Pressure Washing Solutions</div>
<p>Reliable, professional exterior cleaning for homes and business across Nowra and the surrounds — done properly, on time.</p>
<div className="socials" aria-label="Follow us on social media"><a href="https://www.facebook.com/YOUR-PAGE" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg></a><a href="https://www.instagram.com/YOUR-HANDLE" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg></a><a href="https://www.tiktok.com/@YOUR-HANDLE" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.33 2.1 1.62 3.63 3.5 3.86v2.62c-1.4.02-2.72-.42-3.82-1.2v6.03a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6.03.9.08v2.73a2.9 2.9 0 1 0 2 2.76V3h3.02z" /></svg></a></div></div>
<div><h4>Services</h4><ul><li><a href="#services">House & soft washing</a></li><li><a href="#services">Driveways & concrete</a></li><li><a href="#services">Trucks, fleet & machinery</a></li><li><a href="#selling">End-of-lease & pre-sale</a></li></ul></div>
<div><h4>Get in touch</h4><ul><li><a href="tel:+61400000000">04XX XXX XXX</a></li><li><a href="mailto:NowraPressureWashingSolutions@gmail.com">NowraPressureWashingSolutions@gmail.com</a></li><li>Mon–Sat, 7am–5pm</li><li><a href="#quote">Request a quote</a></li></ul></div>
</div>
<div className="foot-bottom">
<span>© 2026 Nowra Pressure Washing Solutions · ABN 21 785 952 316</span>
<span>Locally owned & insured · Servicing Nowra and the surrounds</span>
<span><a href="terms-and-conditions.pdf" target="_blank" rel="noopener" style={{color: "#9fb6c4", textDecoration: "underline"}}>Terms & Conditions</a></span>
</div>
</div>
</footer>
      <div className="mobile-bar">
<a className="call" href="tel:+61400000000">Call us</a>
<a className="quote" href="#quote">Free quote</a>
</div>
    </>
  );
}
