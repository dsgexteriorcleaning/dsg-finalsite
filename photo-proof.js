document.addEventListener('DOMContentLoaded',()=>{
  const path=window.location.pathname.toLowerCase();
  const isHome=path==='/'||path.endsWith('/index.html');
  const isVeterans=path.endsWith('/veterans.html');
  const isGutterPage=path.includes('gutter-cleaning');
  const isServices=path.endsWith('/services.html');

  // Remove the malformed legacy featured card if a cached deployment still contains it.
  document.querySelectorAll('.gallery-card').forEach((card)=>{
    const text=(card.textContent||'').toLowerCase();
    if(text.includes('featured house wash')&&text.includes('real dsg result')) card.remove();
  });

  if(!document.getElementById('dsg-proof-v2-styles')){
    const style=document.createElement('style');
    style.id='dsg-proof-v2-styles';
    style.textContent=`
      .dsg-proof-v2{padding:76px 20px;background:#fff}
      .dsg-proof-v2.alt{background:#f6f8fb}
      .dsg-proof-v2-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:48px;align-items:center}
      .dsg-proof-v2-media{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:14px;box-shadow:0 20px 55px rgba(16,42,67,.12);overflow:hidden}
      .dsg-proof-v2-media img{display:block;width:100%;height:auto;max-height:680px;object-fit:contain;object-position:center;border-radius:10px;background:#fff}
      .dsg-proof-v2-copy{max-width:520px}
      .dsg-proof-v2-kicker{font-size:12px;font-weight:900;letter-spacing:1.6px;text-transform:uppercase;color:#9a7415;margin-bottom:10px}
      .dsg-proof-v2 h2{font-size:clamp(30px,4vw,46px);line-height:1.06;letter-spacing:-1px;color:#102a43;margin:0 0 16px;font-weight:900}
      .dsg-proof-v2 p{font-size:17px;line-height:1.7;color:#5b6b7b;margin:0 0 20px}
      .dsg-proof-v2-meta{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0 26px}
      .dsg-proof-v2-meta span{font-size:12px;font-weight:800;color:#173a61;background:#f7f9fc;border:1px solid #dfe6ee;border-radius:999px;padding:7px 10px}
      .dsg-proof-v2-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 20px;border-radius:8px;background:#d4af37;color:#102a43;text-decoration:none;font-weight:900}
      .dsg-proof-v2.home-proof .dsg-proof-v2-media img{max-height:none}
      .dsg-proof-v2.veteran-proof .dsg-proof-v2-media{max-width:560px}
      .dsg-proof-v2.gutter-proof .dsg-proof-v2-media{max-width:560px}
      @media(max-width:820px){
        .dsg-proof-v2{padding:56px 16px}
        .dsg-proof-v2-inner{grid-template-columns:1fr;gap:28px}
        .dsg-proof-v2-copy{max-width:none}
        .dsg-proof-v2-media{padding:10px;border-radius:14px}
        .dsg-proof-v2-media img{max-height:none}
      }
    `;
    document.head.appendChild(style);
  }

  function proofSection({classes='',img,alt,kicker,title,body,tags=[],ctaHref,ctaText}){
    const section=document.createElement('section');
    section.className=`dsg-proof-v2 ${classes}`.trim();
    section.innerHTML=`
      <div class="dsg-proof-v2-inner">
        <div class="dsg-proof-v2-media"><img src="${img}" alt="${alt}" loading="lazy" decoding="async"></div>
        <div class="dsg-proof-v2-copy">
          <div class="dsg-proof-v2-kicker">${kicker}</div>
          <h2>${title}</h2>
          <p>${body}</p>
          <div class="dsg-proof-v2-meta">${tags.map(t=>`<span>${t}</span>`).join('')}</div>
          <a class="dsg-proof-v2-cta" href="${ctaHref}">${ctaText}</a>
        </div>
      </div>`;
    return section;
  }

  if(isHome && !document.querySelector('.dsg-proof-v2.home-proof')){
    const gallery=document.querySelector('.gallery-section');
    if(gallery){
      gallery.insertAdjacentElement('afterend',proofSection({
        classes:'home-proof',
        img:'images/proof-v2/house-wash-before-after.jpg',
        alt:'Real DSG house soft wash before and after transformation',
        kicker:'Real DSG Transformation',
        title:'A Real Before & After — Shown Exactly as It Happened.',
        body:'No stock photography and no forced crop. This residential house wash shows the kind of visible exterior transformation DSG delivers with professional soft-wash methods.',
        tags:['Real customer property','House soft wash','Before & after'],
        ctaHref:'quote.html',
        ctaText:'Get My Free Quote →'
      }));
    }
  }

  if(isVeterans && !document.querySelector('.dsg-proof-v2.veteran-proof')){
    const hero=document.querySelector('.veterans-hero');
    if(hero){
      hero.insertAdjacentElement('afterend',proofSection({
        classes:'veteran-proof alt',
        img:'images/proof-v2/veterans-program-house-wash.jpg',
        alt:'Veteran homeowner standing in front of his home after a complimentary DSG house wash',
        kicker:'Veterans Program In Action',
        title:'A Real Complimentary House Wash for a Local Veteran.',
        body:'This is an actual DSG Veterans Program recipient standing in front of his home after the complimentary house wash. The program is something we actively carry out in our community.',
        tags:['Real program recipient','Complimentary house wash','Community commitment'],
        ctaHref:'veterans-form.html',
        ctaText:'Apply for the Veterans Program →'
      }));
    }
  }

  if(isGutterPage && !document.querySelector('.dsg-proof-v2.gutter-proof')){
    const anchor=document.querySelector('.page-hero,.service-hero,main,header');
    if(anchor){
      anchor.insertAdjacentElement('afterend',proofSection({
        classes:'gutter-proof alt',
        img:'images/proof-v2/gutter-cleaning-field-proof.jpg',
        alt:'Real DSG gutter cleaning field work at a residential roofline',
        kicker:'Real DSG Field Work',
        title:'Gutter Cleaning From the Roofline — Not Stock Photography.',
        body:'This is real field work from a DSG gutter-cleaning job. We remove built-up debris and verify the drainage path so the system can move water away from the home properly.',
        tags:['Real DSG job','Debris removal','Drainage check'],
        ctaHref:'quote.html',
        ctaText:'Get a Gutter Cleaning Quote →'
      }));
    }
  }

  if(isServices && !document.querySelector('.dsg-proof-v2.gutter-proof')){
    const gutter=document.querySelector('#gutter-cleaning');
    if(gutter){
      gutter.insertAdjacentElement('afterend',proofSection({
        classes:'gutter-proof alt',
        img:'images/proof-v2/gutter-cleaning-field-proof.jpg',
        alt:'Real DSG gutter cleaning field work at a residential roofline',
        kicker:'Real DSG Field Work',
        title:'Real Gutter Cleaning Work From the Roofline.',
        body:'Professional gutter service is easier to trust when you can see the work. This is an actual DSG residential gutter-cleaning job—not a stock image.',
        tags:['Real DSG job','Residential gutter cleaning','Field proof'],
        ctaHref:'quote.html',
        ctaText:'Get a Gutter Cleaning Quote →'
      }));
    }
  }
});
