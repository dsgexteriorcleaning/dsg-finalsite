(function(){
  function cleanupProofRegression(){
    document.querySelectorAll('.dsg-proof, .dsg-proof-v2').forEach((el)=>el.remove());
    document.querySelectorAll('.gallery-card').forEach((card)=>{
      const text=(card.textContent||'').toLowerCase();
      if(text.includes('featured house wash')&&text.includes('real dsg result')) card.remove();
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', cleanupProofRegression, {once:true});
  } else {
    cleanupProofRegression();
  }
})();
