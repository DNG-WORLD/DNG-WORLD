/* V50: subtle pointer parallax for the V24-derived sculpture on desktop.
 * No camera/gyroscope access and no extra 3D renderer on subpages. */
(()=>{
 'use strict';
 if(!window.matchMedia('(pointer:fine)').matches||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 for(const card of document.querySelectorAll('[data-dng-cover-version="v50"]')){
   let raf=0;
   const reset=()=>{
     if(raf)cancelAnimationFrame(raf);
     card.style.setProperty('--dw50-x','0deg');
     card.style.setProperty('--dw50-y','0deg');
   };
   card.addEventListener('pointermove',event=>{
     if(event.pointerType&&event.pointerType!=='mouse')return;
     const box=card.getBoundingClientRect();
     if(!box.width||!box.height)return;
     const x=Math.max(-1,Math.min(1,(event.clientX-box.left)/box.width*2-1));
     const y=Math.max(-1,Math.min(1,(event.clientY-box.top)/box.height*2-1));
     if(raf)cancelAnimationFrame(raf);
     raf=requestAnimationFrame(()=>{
       card.style.setProperty('--dw50-x',(-y*4).toFixed(2)+'deg');
       card.style.setProperty('--dw50-y',(x*5).toFixed(2)+'deg');
     });
   },{passive:true});
   card.addEventListener('pointerleave',reset);
   card.addEventListener('pointercancel',reset);
 }
})();
