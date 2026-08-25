document.addEventListener('DOMContentLoaded',()=>{
  const path=window.location.pathname.toLowerCase();
  const isHome=path==='/'||path.endsWith('/index.html');
  const isVeterans=path.endsWith('/veterans.html');
  const style=document.createElement('style');
  style.textContent=`
    .dsg-proof{padding:72px 20px;background:#fff}
    .dsg-proof-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.15fr .85fr;gap:42px;align-items:center}
    .dsg-proof-media{border-radius:20px;overflow:hidden;box-shadow:0 22px 60px rgba(15,36,68,.18);background:#0f2444}
    .dsg-proof-media img{display:block;width:100%;height:auto}
    .dsg-proof-kicker{font-size:12px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase;color:#9a7415;margin-bottom:10px}
    .dsg-proof h2{font-size:clamp(30px,4vw,46px);line-height:1.08;color:#0f2444;margin:0 0 16px;font-weight:900}
    .dsg-proof p{font-size:17px;line-height:1.7;color:#526173;margin:0 0 20px}
    .dsg-proof-meta{display:flex;gap:9px;flex-wrap:wrap;margin:18px 0 24px}
    .dsg-proof-meta span{font-size:12px;font-weight:800;background:#f4f7fb;border:1px solid #dbe3ee;border-radius:999px;padding:7px 10px;color:#1e3a5f}
    .dsg-proof-cta{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 18px;border-radius:9px;background:#d4af37;color:#0f2444;text-decoration:none;font-weight:900}
    .dsg-proof.veteran-proof{background:linear-gradient(180deg,#f8fbff,#eef5ff)}
    @media(max-width:800px){.dsg-proof{padding:52px 16px}.dsg-proof-inner{grid-template-columns:1fr;gap:26px}.dsg-proof-copy{order:1}.dsg-proof-media{order:2}}
  `;
  document.head.appendChild(style);

  if(isHome && !document.querySelector('.dsg-proof.home-proof')){
    const target=document.querySelector('.gallery-section');
    if(target){
      const section=document.createElement('section');
      section.className='dsg-proof home-proof';
      section.innerHTML=`<div class="dsg-proof-inner"><div class="dsg-proof-media"><img src="images/house-wash-before-after-feature.jpg" alt="DSG Exterior Cleaning house wash before and after" loading="lazy"></div><div class="dsg-proof-copy"><div class="dsg-proof-kicker">Real DSG Work</div><h2>Results That Make the Property Look Maintained Again.</h2><p>This is the kind of transformation DSG is built to deliver: professional exterior cleaning, clear communication and a finished property that looks cared for—not just rinsed off.</p><div class="dsg-proof-meta"><span>Real customer property</span><span>House soft wash</span><span>No stock photography</span></div><a class="dsg-proof-cta" href="quote.html">Get My Free Quote →</a></div></div>`;
      target.insertAdjacentElement('afterend',section);
    }
  }

  if(isVeterans && !document.querySelector('.dsg-proof.veteran-proof')){
    const hero=document.querySelector('.veterans-hero');
    if(hero){
      const section=document.createElement('section');
      section.className='dsg-proof veteran-proof';
      section.innerHTML=`<div class="dsg-proof-inner"><div class="dsg-proof-media"><img src="images/veteran-free-house-wash.jpg" alt="Veteran homeowner after a complimentary DSG house wash" loading="lazy"></div><div class="dsg-proof-copy"><div class="dsg-proof-kicker">Program In Action</div><h2>A Real Complimentary Veterans Program House Wash.</h2><p>DSG's Veterans Program is more than website copy. This home received a complimentary house wash as part of our commitment to serve local veterans and military families.</p><div class="dsg-proof-meta"><span>Real DSG program recipient</span><span>Complimentary house wash</span><span>Local community commitment</span></div><a class="dsg-proof-cta" href="veterans-form.html">Apply for the Veterans Program →</a></div></div>`;
      hero.insertAdjacentElement('afterend',section);
    }
  }
});
