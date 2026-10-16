/* Ambient field adapted from the same color and motion vocabulary as V24.
 * Mesh/shader/GL draw code itself is extracted unchanged from V24 by build.
 */
(()=>{
 'use strict';
 const art=document.getElementById('art'),state=window.__DNGV52_STATE,can=document.getElementById('dw52Field');
 if(!art||!can||!state)return;
 const ctx=can.getContext('2d',{alpha:true});
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const TAU=Math.PI*2;
 let last=0,clock=0,w=0,h=0,vis=true;
 const watcher=new IntersectionObserver(entries=>{vis=entries.some(x=>x.isIntersecting);state.visible=vis;},{threshold:0});
 watcher.observe(art);
 function draw(now){
   requestAnimationFrame(draw);
   if(document.hidden||!vis||now-last<34||!ctx)return;
   const dt=Math.min(50,now-last||34);last=now;if(!reduced)clock+=dt*.00028;
   const r=can.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.3);
   const cw=Math.max(1,Math.round(r.width*dpr)),ch=Math.max(1,Math.round(r.height*dpr));
   if(cw!==w||ch!==h){can.width=w=cw;can.height=h=ch}
   ctx.clearRect(0,0,w,h);ctx.save();ctx.scale(dpr,dpr);
   const ww=r.width,hh=r.height;
   const glow=ctx.createRadialGradient(ww*.53,hh*.5,0,ww*.53,hh*.5,ww*.38);
   glow.addColorStop(0,'rgba(230,194,131,.17)');glow.addColorStop(.38,'rgba(100,160,125,.065)');glow.addColorStop(1,'rgba(255,255,255,0)');
   ctx.fillStyle=glow;ctx.fillRect(0,0,ww,hh);
   for(let row=0;row<13;row++){
     const y=(row+.5)*hh/13;ctx.beginPath();
     for(let x=0;x<=ww+14;x+=14){
       const wave=Math.sin(x*.007+row*.85+clock*1.7)*7+Math.cos(x*.002+row+clock)*5;
       if(!x)ctx.moveTo(x,y+wave);else ctx.lineTo(x,y+wave);
     }
     ctx.lineWidth=row%4===0?1.15:.65;
     ctx.strokeStyle=row%3===0?'rgba(190,150,87,.17)':'rgba(78,130,101,.10)';
     ctx.stroke();
   }
   for(let i=0;i<45;i++){
     const x=((i*.127+clock*.009)%1)*ww,y=((i*.173+clock*.006)%1)*hh;
     ctx.beginPath();ctx.arc(x,y,i%7===0?1.5:.7,0,TAU);
     ctx.fillStyle=i%3===0?'rgba(228,191,126,.40)':'rgba(108,159,126,.31)';ctx.fill();
   }
   ctx.restore();
 }
 requestAnimationFrame(draw);
 let pointer=null;
 art.addEventListener('pointerdown',e=>{
   if(e.pointerType==='mouse'&&e.button!==0)return;
   pointer={x:e.clientX,y:e.clientY};state.dragging=true;state.pointer=pointer;
   art.setPointerCapture?.(e.pointerId);
 });
 art.addEventListener('pointermove',e=>{
   if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
   state.target[1]+=dx*.0045;state.target[0]=Math.max(-1.2,Math.min(1.2,state.target[0]+dy*.004));
   pointer={x:e.clientX,y:e.clientY};state.pointer=pointer;
 });
 const stop=()=>{pointer=null;state.dragging=false;state.pointer=null};
 art.addEventListener('pointerup',stop);art.addEventListener('pointercancel',stop);
})();
