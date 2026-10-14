
(()=>{
 'use strict';
 const root=document.querySelector('.hero'), back=document.getElementById('quantumCanvas'),front=document.getElementById('quantumForeground');
 const far=document.getElementById('farField'),farCtx=far?.getContext('2d',{alpha:true});
 const c=back.getContext('2d',{alpha:true}),f=front.getContext('2d',{alpha:true});
 const api=window.DNGFusion;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const mobile=matchMedia('(max-width:760px)').matches;
 const PI=Math.PI,TAU=2*Math.PI;
 const colors={gold:[246,199,119],mint:[129,233,181],cream:[255,245,216],pearl:[226,244,228],jade:[75,183,142]};
 const rgb=(name,a)=>`rgba(${colors[name].join(',')},${a})`;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 let seed=3102026;
 const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 const between=(a,b)=>a+(b-a)*rand();
 let w=1,h=1,dpr=1,clock=0,last=0,loopN=0;
 const routes=[],points=[],dust=[],satellites=[],depthStars=[];
 const routeTheme=['gold','jade','mint','gold','mint','pearl'];
 function cubic(a,b,cc,d,t){const s=1-t;return [s*s*s*a[0]+3*s*s*t*b[0]+3*s*t*t*cc[0]+t*t*t*d[0],s*s*s*a[1]+3*s*s*t*b[1]+3*s*t*t*cc[1]+t*t*t*d[1]];}
 function makePath(i){
  const isOrbit=i%4===0, y=between(.06,.95), start=between(-.25,.02), end=between(.95,1.27), curve=between(-.45,.45);
  let nodes;
  if(isOrbit){const cy=between(.35,.66), ox=between(.48,.80);nodes=[[ox-.7,cy+between(-.05,.20)],[ox-.28,cy-.5],[ox+.20,cy+.50],[ox+.75,cy+between(-.08,.12)]];}
  else {nodes=[[start,y],[between(.21,.44),y+curve],[between(.58,.76),y-curve*1.25],[end,y+between(-.21,.21)]];}
  return {nodes,color:routeTheme[i%routeTheme.length],width:between(.55,1.4),alpha:between(.11,.36),depth:i%5===0?2:0,phase:between(0,TAU),speed:between(.018,.06),focus:i%3,segments:mobile?34:58};
 }
 const nPaths=mobile?22:42;
 for(let i=0;i<nPaths;i++)routes.push(makePath(i));
 for(let i=0;i<(mobile?85:200);i++){
  const ri=Math.floor(rand()*routes.length);
  points.push({ri,u:rand(),speed:between(.027,.12),size:between(.5,2.4),phase:between(0,TAU),tail:between(.009,.045),color:routes[ri].color});
 }
 for(let i=0;i<(mobile?65:210);i++)dust.push({x:rand(),y:rand(),r:between(.3,1.5),depth:between(.15,1.3),phase:rand()*TAU,speed:between(.1,1.2),col:rand()>.6?'gold':'mint'});
 for(let i=0;i<(mobile?5:10);i++)satellites.push({a:rand()*TAU,rx:between(.22,.48),ry:between(.12,.27),r:between(1.6,4),speed:between(.006,.032),offset:rand()*2-1,col:i%2?'gold':'jade'});
 for(let i=0;i<(mobile?105:230);i++)depthStars.push({x:rand(),y:rand(),depth:between(.22,1.7),speed:between(.005,.023),phase:between(0,TAU),r:between(.42,1.45),color:rand()<.24?'gold':'jade'});
 const sprite={};
 function makeSprite(color){const cc=document.createElement('canvas');cc.width=cc.height=96;const ctx=cc.getContext('2d');const g=ctx.createRadialGradient(48,48,1,48,48,48);
  g.addColorStop(0,'rgba(255,255,245,1)');g.addColorStop(.09,rgb(color,.9));g.addColorStop(.27,rgb(color,.35));g.addColorStop(.66,rgb(color,.055));g.addColorStop(1,rgb(color,0));
  ctx.fillStyle=g;ctx.fillRect(0,0,96,96);return cc;
 }
 ['gold','mint','pearl','jade','cream'].forEach(k=>sprite[k]=makeSprite(k));
 function dimensions(){const r=root.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,mobile?1.35:1.65);
  for(const canvas of [far,back,front]){const ww=Math.round(w*dpr),hh=Math.round(h*dpr);if(canvas.width!==ww||canvas.height!==hh){canvas.width=ww;canvas.height=hh;}}}
 function focalShift(depth=1){return [api.x*w*.025*depth,api.y*h*.027*depth];}
 function fadePath(ctx,route,depth=0){
  const [dx,dy]=focalShift(depth+route.depth*.45);const a=route.nodes;
  ctx.beginPath();for(let i=0;i<=route.segments;i++){const t=i/route.segments;const q=cubic(...a,t);const px=q[0]*w+dx,py=q[1]*h+dy;if(!i)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
  ctx.lineWidth=route.width;ctx.strokeStyle=rgb(route.color,route.alpha*(api.chapter===route.focus?1.4:.78));ctx.stroke();
 }
 function ellipseArc(ctx,i,t,frontLayer=false){
  const cx=w*(mobile?.56:.68)+api.x*w*.018,cy=h*(mobile?.65:.49)+api.y*h*.02;
  const rr=Math.min(w,h)*(frontLayer?.25:.31),radius=rr*(1+i*.21);
  const rot=(i%2?-.28:.25)+Math.sin(t*.006+i)*.055;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(rot);ctx.beginPath();ctx.ellipse(0,0,radius,radius*(.25+(i%3)*.06),0,0,TAU);
  ctx.lineWidth=i%3===0?1.4:.6;ctx.strokeStyle=rgb(i%2?'gold':'mint',frontLayer?.19:.10);ctx.stroke();ctx.restore();
 }
 function drawDust(ctx,t){for(let i=0;i<dust.length;i++){
  const p=dust[i],d=p.depth;const x=(p.x+api.x*.017*d+Math.sin(t*.003*p.speed+p.phase)*.003)*w;
  const y=(p.y+api.y*.012*d+Math.cos(t*.002*p.speed+p.phase)*.002)*h;
  ctx.fillStyle=rgb(p.col,.09+.16*(.5+.5*Math.sin(t*.4*p.speed+p.phase)));
  ctx.beginPath();ctx.arc(x,y,p.r,0,TAU);ctx.fill();
  if(i%22===0){const size=p.r*18;ctx.globalAlpha=.11;ctx.drawImage(sprite[p.col],x-size/2,y-size/2,size,size);ctx.globalAlpha=1;}
 }}
 function flowPoints(ctx,t,frontLayer=false){
  for(let i=0;i<points.length;i++){
   const p=points[i],r=routes[p.ri];if(frontLayer!==Boolean(r.depth===2))continue;
   const speed=api.chapter===r.focus?1.12:.75;
   const u=(p.u+t*p.speed*speed)%1;
   const q=cubic(...r.nodes,u),b=cubic(...r.nodes,Math.max(0,u-p.tail));
   const [dx,dy]=focalShift(1+r.depth*.2);
   const x=q[0]*w+dx,y=q[1]*h+dy,x0=b[0]*w+dx,y0=b[1]*h+dy;
   ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x,y);
   const g=ctx.createLinearGradient(x0,y0,x,y);g.addColorStop(0,rgb(p.color,0));g.addColorStop(.65,rgb(p.color,frontLayer?.26:.44));g.addColorStop(1,rgb('cream',frontLayer?.72:.66));
   ctx.strokeStyle=g;ctx.lineWidth=p.size*(frontLayer?1.4:1);ctx.stroke();
   const sz=p.size*(mobile?5:7);ctx.globalAlpha=frontLayer?.54:.68;ctx.drawImage(sprite[p.color],x-sz/2,y-sz/2,sz,sz);ctx.globalAlpha=1;
  }
 }
 function drawSatellites(ctx,t){const cx=w*(mobile?.52:.67)+api.x*w*.017,cy=h*(mobile?.64:.47)+api.y*h*.018;
   satellites.forEach((s,i)=>{
    const angle=s.a+t*s.speed,rx=Math.min(w,h)*s.rx,ry=Math.min(w,h)*s.ry;
    const x=cx+Math.cos(angle)*rx,y=cy+Math.sin(angle)*ry;
    const sz=s.r*14;
    ctx.globalAlpha=.75;ctx.drawImage(sprite[s.col],x-sz/2,y-sz/2,sz,sz);ctx.globalAlpha=1;
    if(i%2===0){ctx.lineWidth=.5;ctx.strokeStyle=rgb(s.col,.12);ctx.beginPath();ctx.arc(x,y,s.r*1.2,0,TAU);ctx.stroke();}
   });
 }
 function beams(ctx,t){const count=mobile?15:38;
  for(let i=0;i<count;i++){
   const x=(i+.4)/count*w + Math.sin(t*.1+i*3)*7+api.x*(i%3)*2;
   const y=((i*11.61)%count)/count*h + (t*(10+(i%5)*7))%(h*1.4)-h*.6;
   const len=h*(.08+(i%8)*.013);const g=ctx.createLinearGradient(x,y-len,x,y+len);
   g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.38,rgb(i%2?'gold':'jade',.012));g.addColorStop(.57,rgb(i%2?'gold':'mint',.15));g.addColorStop(1,'rgba(255,255,255,0)');
   ctx.strokeStyle=g;ctx.lineWidth=(i%6===0)?1.3:.65;ctx.beginPath();ctx.moveTo(x,y-len);ctx.lineTo(x,y+len);ctx.stroke();
  }
 }
 function energyContours(ctx,t){const N=mobile?5:11;
  for(let j=0;j<N;j++){
    const y0=h*(.71+j*.025),ampl=(3+j*.7),speed=t*(.17+j*.006);
    ctx.beginPath();for(let x=0;x<=w;x+=mobile?15:11){const y=y0+Math.sin(x*.008+speed+j*.34)*ampl+Math.cos(x*.003-speed*.6+j)*4;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
    ctx.lineWidth=j%4===0?1.6:.6;
    ctx.strokeStyle=rgb(j%3===0?'gold':'jade',.045+((j%5===0)?.12:.03));ctx.stroke();
  }
 }

  // V24 far-space choreography: photons travel L→R; nebulae and depth stars drift R→L.
  // Clock is driven from the same RAF and freezes together with the main field.
  function drawFarSpace(t){
    if(!farCtx)return;
    const ctx=farCtx;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    const parallaxX=-api.x*w*.024,parallaxY=-api.y*h*.017;
    const speeds=[.0019,.0038,.0054];
    ctx.globalCompositeOperation='screen';
    // Large slow-moving luminous layers: no hard circles, no overexposed bloom.
    const clusters=[
      {x:.20,y:.19,r:.37,c:[104,160,135],a:.075},
      {x:.74,y:.48,r:.48,c:[171,199,150],a:.083},
      {x:.43,y:.81,r:.33,c:[218,178,111],a:.064}
    ];
    clusters.forEach((cl,i)=>{
      const x=((((cl.x-t*speeds[i])%1.8)+1.8)%1.8-.40)*w+parallaxX*(.6+i*.16);
      const y=(cl.y+Math.sin(t*.047+i)*.045)*h+parallaxY;
      const rad=Math.max(w,h)*cl.r;
      const g=ctx.createRadialGradient(x,y,0,x,y,rad);
      g.addColorStop(0,`rgba(${cl.c.join(',')},${cl.a})`);
      g.addColorStop(.30,`rgba(${cl.c.join(',')},${cl.a*.53})`);
      g.addColorStop(.72,`rgba(${cl.c.join(',')},${cl.a*.16})`);
      g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(x-rad,y-rad,rad*2,rad*2);
    });
    // Background filaments slide left, away from the foreground energy routes.
    for(let j=0;j<(mobile?7:15);j++){
      const cycle=(t*(9+j*.75)+j*w*.133)%(w*1.6);
      const offset=w*.35-cycle+parallaxX*.72;
      const y0=h*(.08+j*.065)+Math.sin(t*.064+j)*h*.012+parallaxY;
      const g=ctx.createLinearGradient(offset,y0,offset+w*.68,y0+h*.065);
      g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.48,j%3===0?'rgba(220,187,128,.085)':'rgba(142,194,157,.07)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.strokeStyle=g;ctx.lineWidth=j%5===0?1.15:.6;
      ctx.beginPath();ctx.moveTo(offset,y0);ctx.bezierCurveTo(offset+w*.16,y0-h*.09,offset+w*.41,y0+h*.12,offset+w*.68,y0+h*.035);ctx.stroke();
    }
    for(let i=0;i<depthStars.length;i++){
      const p=depthStars[i];
      const x=((p.x-t*p.speed+20)%1.10-.05)*w+parallaxX*p.depth;
      const y=(p.y+.009*Math.sin(t*.09+p.phase))*h+parallaxY*p.depth;
      const alpha=.08+.18*(.5+.5*Math.sin(t*.6+p.phase));
      const col=p.color==='gold'?[229,198,146]:[155,218,184];
      ctx.fillStyle=`rgba(${col.join(',')},${alpha})`;
      ctx.beginPath();ctx.arc(x,y,p.r,0,TAU);ctx.fill();
      if(i%8===0){ const trail=6+p.depth*10;const g=ctx.createLinearGradient(x,y,x+trail,y-1.3);g.addColorStop(0,`rgba(${col.join(',')},${alpha*.8})`);g.addColorStop(1,'rgba(255,255,255,0)');ctx.strokeStyle=g;ctx.lineWidth=p.r*.55;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+trail,y-1.3);ctx.stroke(); }
    }
    ctx.globalCompositeOperation='source-over';
  }

 function backdrop(t){if(!c)return; c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);c.globalCompositeOperation='screen';
  const cx=w*(mobile?.59:.67),cy=h*(mobile?.59:.44);
  const radial=c.createRadialGradient(cx,cy,0,cx,cy,Math.min(w,h)*.65);radial.addColorStop(0,'rgba(240,191,123,.07)');radial.addColorStop(.38,'rgba(89,173,137,.035)');radial.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=radial;c.fillRect(0,0,w,h);
  for(let i=0;i<6;i++)ellipseArc(c,i,t);
  for(const r of routes){if(r.depth!==2)fadePath(c,r,0)}
  energyContours(c,t);beams(c,t);drawDust(c,t);flowPoints(c,t,false);drawSatellites(c,t);
  c.globalCompositeOperation='source-over';
 }
 function forefront(t){if(!f)return;f.setTransform(dpr,0,0,dpr,0,0);f.clearRect(0,0,w,h);f.globalCompositeOperation='screen';
  for(let i=0;i<3;i++)ellipseArc(f,i,t,true);
  routes.filter(r=>r.depth===2).forEach(r=>fadePath(f,r,1));flowPoints(f,t,true);
  f.globalCompositeOperation='source-over';
 }
 function loop(time){requestAnimationFrame(loop);if(document.hidden) {last=time;return;}const elapsed=Math.min(.06,last?(time-last)/1000:0);last=time;
  api.x+=(api.tx-api.x)*clamp(elapsed*3.6,0,1);api.y+=(api.ty-api.y)*clamp(elapsed*3.6,0,1);
  if(api.paused){if(!loopN){dimensions();drawFarSpace(clock);backdrop(clock);forefront(clock);}loopN++;return;}
  if(!reduced){clock+=elapsed;}
  // cap render to about 30fps on mobile for battery and smoothness
  if(mobile && ++loopN%2===1)return;
  if(!w||Math.abs(root.offsetWidth-w)>3||Math.abs(root.offsetHeight-h)>3)dimensions();
  drawFarSpace(clock);backdrop(clock);forefront(clock);
 }
 dimensions();requestAnimationFrame(loop);
 window.addEventListener('resize',dimensions,{passive:true});
 root.addEventListener('pointermove',e=>{if(api.mode!=='pointer')return;const r=root.getBoundingClientRect();api.tx=clamp(((e.clientX-r.left)/r.width-.5)*2,-1,1);api.ty=clamp(((e.clientY-r.top)/r.height-.5)*2,-1,1);api.lastInteraction=performance.now();},{passive:true});
 root.addEventListener('pointerleave',()=>{if(api.mode==='pointer'){api.tx*=.4;api.ty*=.4;}},{passive:true});
 const status=document.getElementById('motionStatus');
 const bPointer=document.getElementById('pointerMode'),bCamera=document.getElementById('cameraMode'),bTilt=document.getElementById('tiltMode'),bPause=document.getElementById('motionPause');
 const setStatus=message=>{status.textContent=message};
 const setMode=(mode)=>{api.mode=mode;bPointer.classList.toggle('active',mode==='pointer');bCamera.classList.toggle('active',mode==='camera');bTilt.classList.toggle('active',mode==='tilt');bCamera.setAttribute('aria-pressed',String(mode==='camera'));bTilt.setAttribute('aria-pressed',String(mode==='tilt'));};
 let stream=null,video=null,motionTimer=null,oldLum=null;
 async function stopCamera(){if(motionTimer){clearInterval(motionTimer);motionTimer=null;}if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}if(video){video.srcObject=null;video.remove();video=null;}oldLum=null;}
 async function startCamera(){
  if(!navigator.mediaDevices?.getUserMedia){setStatus('Camera unavailable — pointer active');return;}
  try{
   stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{width:{ideal:320},height:{ideal:240},facingMode:'user',frameRate:{ideal:15,max:24}}});
   video=document.createElement('video');video.muted=true;video.autoplay=true;video.playsInline=true;video.setAttribute('aria-hidden','true');video.style.display='none';document.body.appendChild(video);video.srcObject=stream;await video.play();
   setMode('camera');setStatus('Camera motion ON · processed locally · no recording');
   const off=document.createElement('canvas');off.width=80;off.height=60;const x=off.getContext('2d',{willReadFrequently:true});
   motionTimer=setInterval(()=>{
    if(!video||video.readyState<2||document.hidden)return;
    x.drawImage(video,0,0,80,60);const data=x.getImageData(0,0,80,60).data;
    const next=new Uint8Array(80*60);let sx=0,sy=0,total=0;
    for(let yy=0;yy<60;yy+=2)for(let xx=0;xx<80;xx+=2){const k=yy*80+xx,p=k*4;const lum=(data[p]*.299+data[p+1]*.587+data[p+2]*.114)|0;next[k]=lum;
       if(oldLum){let delta=Math.abs(lum-oldLum[k]);if(delta>20){let a=Math.min(80,delta-20);sx+=xx*a;sy+=yy*a;total+=a;}}
    }
    if(total>1700){let nx=sx/total/80,ny=sy/total/60;api.tx=clamp((.5-nx)*2.1,-1,1);api.ty=clamp((ny-.5)*2.1,-1,1);api.lastInteraction=performance.now();}
    oldLum=next;
   },120);
  }catch(error){await stopCamera();setMode('pointer');setStatus(error.name==='NotAllowedError'?'Camera permission denied · pointer active':'Unable to start camera · pointer active');}
 }
 let tiltHandler=null;
 function stopTilt(){if(tiltHandler){window.removeEventListener('deviceorientation',tiltHandler);tiltHandler=null;}}
 async function startTilt(){
  if(!('DeviceOrientationEvent' in window)){setStatus('Tilt unavailable · pointer active');return;}
  try{if(typeof DeviceOrientationEvent.requestPermission==='function'){const perm=await DeviceOrientationEvent.requestPermission();if(perm!=='granted'){setStatus('Tilt permission denied · pointer active');return;}}}
  catch(_){setStatus('Tilt permission denied · pointer active');return;}
  setMode('tilt');setStatus('Device tilt active');
  tiltHandler=e=>{if(e.gamma==null||e.beta==null)return;api.tx=clamp(e.gamma/32,-1,1);api.ty=clamp((e.beta-45)/40,-1,1);};
  window.addEventListener('deviceorientation',tiltHandler,{passive:true});
 }
 async function activatePointer(){await stopCamera();stopTilt();setMode('pointer');setStatus('Pointer / touch active');api.tx=0;api.ty=0;}
 bPointer.addEventListener('click',activatePointer);
 bCamera.addEventListener('click',async()=>{if(api.mode==='camera'){await activatePointer();return;}stopTilt();await stopCamera();await startCamera();});
 bTilt.addEventListener('click',async()=>{if(api.mode==='tilt'){await activatePointer();return;}await stopCamera();await startTilt();});
 function setPause(value){api.paused=value;root.classList.toggle('fx-paused',value);bPause.textContent=value?'▶':'Ⅱ';bPause.classList.toggle('active',value);bPause.setAttribute('aria-pressed',String(value));bPause.setAttribute('aria-label',value?'Tiếp tục hiệu ứng':'Tạm dừng hiệu ứng');setStatus(value?'Motion paused':'Motion resumed');loopN=0;}
 bPause.addEventListener('click',()=>setPause(!api.paused));
 if(reduced)setPause(true);
 window.addEventListener('pagehide',()=>{stopCamera();stopTilt()});
 for(const button of document.querySelectorAll('[data-scene]')){button.addEventListener('click',()=>{api.chapter=Number(button.dataset.scene)||0;});}
 for(const button of document.querySelectorAll('[data-route]')){button.addEventListener('click',()=>{api.chapter=Number(button.dataset.route)||0;});}
})();

