/* Shared single mobile navigation – standalone, no dependencies. */
(()=>{'use strict';for(const header of document.querySelectorAll('[data-dng-common="header"]')){
 const toggle=header.querySelector('.dng-global-toggle'),panel=header.querySelector('.dng-global-panel');
 if(!toggle||!panel)continue;
 const close=()=>{toggle.setAttribute('aria-expanded','false');panel.hidden=true;header.classList.remove('dng-global-open')};
 toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';if(expanded)close();else{toggle.setAttribute('aria-expanded','true');panel.hidden=false;header.classList.add('dng-global-open')}});
 panel.addEventListener('click',e=>{if(e.target.closest('a'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 window.matchMedia('(min-width: 981px)').addEventListener('change',e=>{if(e.matches)close()});
 }} )();
