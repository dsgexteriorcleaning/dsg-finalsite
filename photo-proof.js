document.addEventListener('DOMContentLoaded',()=>{
  // Emergency rollback for the 2026-08-24 photo-proof regression.
  // Remove any dynamically injected proof modules and the malformed featured gallery card.
  document.querySelectorAll('.dsg-proof').forEach((el)=>el.remove());
  document.querySelectorAll('.gallery-card').forEach((card)=>{
    const text=(card.textContent||'').toLowerCase();
    if(text.includes('featured house wash')&&text.includes('real dsg result')) card.remove();
  });
});
