/* DNGWORLD V53 — shared live V24 WebGL sculpture + matching Home atmosphere.
 * Native V24 mesh/shaders/render loop are injected by the V52 generator.
 * This light field adds atmospheric beams, curved paths, moving highlights.
 * No third-party library and no device/camera permissions. */
(()=>{
 'use strict';
 const art=document.getElementById('art');
 const state=window.__DNGV52_STATE,can=document.getElementById('dw52Field');
 if(!art||!state||!can)return;
 const ctx=can.getContext('2d',{alpha:true});
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const TAU=2*Math.PI,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 let w=0,h=0,last=0,clock=0,visible=true,frame=0;
 const paths=[
  [[-.18,.54],[.24,-.38],[.66,1.12],[1.20,.41]],
  [[-.20,.82],[.30,-.18],[.78,.65],[1.16,.14]],
  [[-.05,-.06],[.22,.63],[.75,.20],[1.11,1.05]],
  [[-.18,.33],[.43,1.04],[.63,-.55],[1.18,.72]],
  [[.01,.92],[.27,.12],[.77,1.25],[1.12,-.10]],
  [[-.08,.15],[.15,.95],[.86,.04],[1.20,.85]],
  [[.10,-.20],[.57,.30],[.43,1.35],[1.05,.65]]
 ];
 const palette=['rgba(213,176,115,','rgba(115,176,139,','rgba(153,211,181,'];
 const curve=(p,t)=>{
   const u=1-t;
   return [u*u*u*p[0][0]+3*u*u*t*p[1][0]+3*u*t*t*p[2][0]+t*t*t*p[3][0],
           u*u*u*p[0][1]+3*u*u*t*p[1][1]+3*u*t*t*p[2][1]+t*t*t*p[3][1]];
 };
 const observer='IntersectionObserver' in window?new IntersectionObserver(e=>{
   visible=e.some(v=>v.isIntersecting);state.visible=visible;
 },{threshold:0}):null;
 observer?.observe(art);
 const ambient=(now)=>{
   requestAnimationFrame(ambient);
   if(document.hidden||!visible||!ctx||now-last<35)return;
   const dt=Math.min(60,now-last||35);last=now;
   if(!reduced)clock+=dt*.001;
   const r=can.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.4);
   const ww=r.width,hh=r.height;
   if(!ww||!hh)return;
   const cw=Math.max(1,Math.round(ww*dpr)),ch=Math.max(1,Math.round(hh*dpr));
   if(cw!==w||ch!==h){can.width=w=cw;can.height=h=ch}
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,ww,hh);
   const halo=ctx.createRadialGradient(ww*.5,hh*.5,3,ww*.5,hh*.5,ww*.30);
   halo.addColorStop(0,'rgba(221,186,125,.12)');
   halo.addColorStop(.26,'rgba(125,190,157,.075)');
   halo.addColorStop(.7,'rgba(50,120,87,.025)');
   halo.addColorStop(1,'rgba(0,0,0,0)');
   ctx.fillStyle=halo;ctx.fillRect(0,0,ww,hh);
   ctx.globalCompositeOperation='lighter';
   for(let i=0;i<paths.length;i++){
     const path=paths[i],rgb=palette[i%palette.length];
     ctx.beginPath();
     for(let k=0;k<=68;k++){
       const p=curve(path,k/68),x=p[0]*ww,y=p[1]*hh;
       if(!k)ctx.moveTo(x,y);else ctx.lineTo(x,y);
     }
     ctx.strokeStyle=rgb+(i%3===0?'.24)':'.12)');
     ctx.lineWidth=i%4===0?1.25:.75;ctx.stroke();
     // Same gold/jade path with a travelling luminous source.
     for(let j=0;j<2;j++){
       const p=curve(path,((clock*(.025+i*.002)+i*.21+j*.53)%1));
       const x=p[0]*ww,y=p[1]*hh;
       const grad=ctx.createRadialGradient(x,y,0,x,y,16+j*5);
       grad.addColorStop(0,'rgba(248,241,209,.54)');
       grad.addColorStop(.14,rgb+'.48)');
       grad.addColorStop(1,'rgba(0,0,0,0)');
       ctx.fillStyle=grad;ctx.beginPath();ctx.arc(x,y,18+j*5,0,TAU);ctx.fill();
     }
   }
   // Sparse moving depth stars. No bright decorative cards or ring overlays.
   for(let i=0;i<54;i++){
     const x=((i*.137583+clock*.0005*(i%3+1))%1)*ww;
     const y=((i*.27711+Math.sin(clock*.12+i)*.018)%1)*hh;
     const pulse=.45+.45*Math.sin(clock*.7+i*1.87);
     const radius=i%8===0?1.45:.58;
     ctx.fillStyle=i%3===0?'rgba(221,191,137,'+(.23+pulse*.18)+')':'rgba(143,205,170,'+(.14+pulse*.15)+')';
     ctx.beginPath();ctx.arc(x,y,radius,0,TAU);ctx.fill();
   }
   ctx.globalCompositeOperation='source-over';
 };
 requestAnimationFrame(ambient);
 let pointer=null;
 art.addEventListener('pointerdown',e=>{
   if(e.pointerType==='mouse'&&e.button!==0)return;
   pointer={x:e.clientX,y:e.clientY};
   state.dragging=true;state.pointer=pointer;
   art.setPointerCapture?.(e.pointerId);
 });
 art.addEventListener('pointermove',e=>{
   if(!pointer)return;
   const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
   state.target[1]+=dx*.0045;
   state.target[0]=clamp(state.target[0]+dy*.004,-1.2,1.2);
   pointer={x:e.clientX,y:e.clientY};state.pointer=pointer;
 });
 const stop=()=>{pointer=null;state.dragging=false;state.pointer=null};
 art.addEventListener('pointerup',stop);
 art.addEventListener('pointercancel',stop);
 window.addEventListener('pagehide',()=>observer?.disconnect(),{once:true});
})();
