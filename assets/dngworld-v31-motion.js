(()=>{'use strict';if(document.documentElement.dataset.dngMotion)return;document.documentElement.dataset.dngMotion='v31';
const isFullHome=location.pathname==='/' || /^\/(en|zh)\/?$/.test(location.pathname);
const area=document.querySelector('main .hero25,main .masthead,main .hero-banner,main .page-hero,main .section-hero,main .hero25 .shell')||(!isFullHome?document.querySelector('main > section:first-of-type'):null);
if(area&& !document.body.classList.contains('dng-home-v31')){
 const parent=area.classList.contains('shell')&&area.parentElement?area.parentElement:area;
 if(!parent.querySelector('.dng-spatial')){parent.classList.add('dng-spatial-parent');let visual=document.createElement('div');visual.className='dng-spatial';visual.setAttribute('aria-hidden','true');visual.innerHTML='<i class="dng-orbit"></i><i class="dng-orbit"></i><i class="dng-orbit"></i><i class="dng-spatial-core"></i><i class="dng-spatial-star"></i>';parent.appendChild(visual)}
}
document.body.classList.add('dng-motion-ready');
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const candidates=Array.from(document.querySelectorAll('main :is(.panel,.story-card,.feature,.metric-card,.service-card,.tool-card)')).slice(0,60).filter(e=>!e.closest('.hero-art,.tv-stage'));
const observer=new IntersectionObserver(entries=>{for(const en of entries)if(en.isIntersecting){en.target.classList.add('dng-visible');observer.unobserve(en.target)}},{rootMargin:'0px 0px 55px 0px',threshold:.06});
for(const element of candidates){element.classList.add('dng-reveal');observer.observe(element)}
})();