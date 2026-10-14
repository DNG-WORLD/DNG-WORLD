(() => {
  'use strict';
  const art = document.getElementById('art');
  const canvas = document.getElementById('artCanvas');
  const sceneButtons = [...document.querySelectorAll('[data-scene]')];
  const caption = document.getElementById('sceneCaption');
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sceneData = [
    {label:'01 / STRATEGY', copy:'The decisions behind sustainable growth.', rotation:[.20,-.40,-.14]},
    {label:'02 / MARKETING + MEDIA', copy:'Make every customer touchpoint count.', rotation:[.40,1.28,.18]},
    {label:'03 / DATA + AI', copy:'Turn signals into better decisions.', rotation:[-.52,2.42,.12]}
  ];
  const state = {
    selection:0, rot:[.20,-.40,-.14], target:[.20,-.40,-.14],
    autoAngle:0, dragging:false, pointer:null, sceneGL:null, last:performance.now(),
    visible:true
  };

  const ambientCanvas = document.getElementById('ambientFx');
  const heroFx = document.getElementById('heroFx');
  const hotspotButtons = [...document.querySelectorAll('.route-hotspot')];
  const fx = {
    ambient:null, hero:null, pulseClock:0, pointer:{x:.74,y:.42},
    nodes:[
      {x:.09,y:.18,vx:.00006,vy:.00002,size:1.6,hue:'emerald'},{x:.16,y:.62,vx:.00005,vy:-.00003,size:1.1,hue:'gold'},{x:.25,y:.28,vx:-.00004,vy:.00004,size:1.4,hue:'mint'},
      {x:.33,y:.72,vx:.00003,vy:.00003,size:1.2,hue:'emerald'},{x:.44,y:.37,vx:-.00003,vy:.00004,size:1.8,hue:'gold'},{x:.51,y:.18,vx:.00004,vy:.00003,size:1.2,hue:'mint'},
      {x:.61,y:.58,vx:-.00003,vy:-.00002,size:1.4,hue:'gold'},{x:.72,y:.26,vx:.00004,vy:.00004,size:2.1,hue:'emerald'},{x:.81,y:.67,vx:-.00005,vy:.00003,size:1.5,hue:'mint'},{x:.91,y:.31,vx:-.00004,vy:-.00002,size:1.3,hue:'gold'}
    ],
    routes:[
      {scene:0,p0:[.05,.34],p1:[.26,.22],p2:[.45,.47],p3:[.66,.36],color:'rgba(96,168,134,',width:1.8},
      {scene:0,p0:[.14,.66],p1:[.34,.58],p2:[.47,.32],p3:[.67,.20],color:'rgba(224,188,112,',width:1.2},
      {scene:1,p0:[.19,.18],p1:[.38,.12],p2:[.61,.20],p3:[.82,.30],color:'rgba(94,173,142,',width:1.7},
      {scene:1,p0:[.28,.83],p1:[.41,.63],p2:[.63,.67],p3:[.86,.48],color:'rgba(235,200,132,',width:1.4},
      {scene:2,p0:[.33,.26],p1:[.53,.06],p2:[.73,.18],p3:[.94,.12],color:'rgba(122,196,168,',width:1.6},
      {scene:2,p0:[.35,.72],p1:[.53,.55],p2:[.73,.46],p3:[.93,.56],color:'rgba(92,165,136,',width:2.0},
      {scene:2,p0:[.08,.50],p1:[.26,.42],p2:[.55,.74],p3:[.82,.84],color:'rgba(220,186,117,',width:1.0}
    ], pulses:[]
  };
  function pulseForScene(sceneIndex,burst=2){
    fx.routes.forEach((route,idx)=>{ if(route.scene!==sceneIndex) return; for(let i=0;i<burst;i++){fx.pulses.push({route:idx,t:(-i*.28),speed:.0044+Math.random()*.0022,life:1+Math.random()*.55,size:2.5+Math.random()*2.7});}});
  }
  function bezier(p0,p1,p2,p3,t){
    const mt=1-t,mt2=mt*mt,t2=t*t;
    return [mt2*mt*p0[0]+3*mt2*t*p1[0]+3*mt*t2*p2[0]+t2*t*p3[0], mt2*mt*p0[1]+3*mt2*t*p1[1]+3*mt*t2*p2[1]+t2*t*p3[1]];
  }
  function colorTone(name,a){ return name==='gold' ? `rgba(224,188,112,${a})` : name==='mint' ? `rgba(173,225,204,${a})` : `rgba(87,152,122,${a})`; }
  function resizeCanvas(can,rect){
    const dpr=Math.min(window.devicePixelRatio||1,1.8), w=Math.max(1,Math.floor(rect.width*dpr)), h=Math.max(1,Math.floor(rect.height*dpr));
    if(can.width!==w||can.height!==h){ can.width=w; can.height=h; }
    return {dpr,w,h};
  }
  function init2D(){
    fx.ambient = ambientCanvas.getContext('2d');
    fx.hero = heroFx.getContext('2d');
  }
  init2D();
  function drawAmbient(now){
    if(!fx.ambient) return; const rect={width:window.innerWidth,height:window.innerHeight}; const {w,h,dpr}=resizeCanvas(ambientCanvas,rect); const ctx=fx.ambient; ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,w,h); ctx.scale(dpr,dpr); const vw=rect.width,vh=rect.height;
    const grd=ctx.createRadialGradient(vw*.76,vh*.18,20,vw*.76,vh*.18,vw*.58); grd.addColorStop(0,'rgba(255,245,220,.18)'); grd.addColorStop(.42,'rgba(110,170,140,.09)'); grd.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=grd; ctx.fillRect(0,0,vw,vh);
    ctx.globalCompositeOperation='lighter';
    for(let i=0;i<11;i++){ const y=(i/10)*vh; const drift=Math.sin(now*.00012+i*1.3)*26; const grad=ctx.createLinearGradient(0,y+drift,vw,y-drift); grad.addColorStop(0,'rgba(0,0,0,0)'); grad.addColorStop(.28,'rgba(83,146,118,.015)'); grad.addColorStop(.56,'rgba(236,204,135,.028)'); grad.addColorStop(1,'rgba(0,0,0,0)'); ctx.strokeStyle=grad; ctx.lineWidth=(i%3===0?1.4:.7); ctx.beginPath(); ctx.moveTo(0,y+drift); ctx.bezierCurveTo(vw*.25,y-18-drift,vw*.68,y+18+drift,vw,y-drift); ctx.stroke(); }
    fx.nodes.forEach((n,idx)=>{ n.x+=n.vx*(1+(idx%3)*.2); n.y+=n.vy*(1+(idx%2)*.2); if(n.x>1.06) n.x=-.04; if(n.x<-.06) n.x=1.04; if(n.y>1.08) n.y=-.05; if(n.y<-.08) n.y=1.05; const x=n.x*vw, y=n.y*vh; const glow=10+n.size*5; const g=ctx.createRadialGradient(x,y,0,x,y,glow); g.addColorStop(0,colorTone(n.hue,.55)); g.addColorStop(.45,colorTone(n.hue,.22)); g.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,glow,0,Math.PI*2); ctx.fill(); });
    ctx.globalCompositeOperation='source-over';
  }
  function drawHeroFx(now){
    if(!fx.hero) return; const rect=heroFx.getBoundingClientRect(); const {w,h,dpr}=resizeCanvas(heroFx,rect); const ctx=fx.hero; ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,w,h); ctx.scale(dpr,dpr); const vw=rect.width,vh=rect.height;
    const centerX=vw*(.63 + (fx.pointer.x-.5)*.015), centerY=vh*(.47 + (fx.pointer.y-.5)*.02);
    ctx.globalCompositeOperation='lighter';
    for(let ray=0; ray<18; ray++){ const ang=-1.25 + ray*.135 + Math.sin(now*.00018+ray)*.02; const len=vw*(.28 + (ray%5)*.09); const x2=centerX+Math.cos(ang)*len; const y2=centerY+Math.sin(ang)*len*.55; const grad=ctx.createLinearGradient(centerX,centerY,x2,y2); grad.addColorStop(0, ray%2 ? 'rgba(248,232,192,.22)' : 'rgba(163,226,200,.18)'); grad.addColorStop(.32, ray%2 ? 'rgba(236,198,120,.11)' : 'rgba(96,170,136,.11)'); grad.addColorStop(1,'rgba(255,255,255,0)'); ctx.strokeStyle=grad; ctx.lineWidth=ray%6===0?2.2:1.1; ctx.beginPath(); ctx.moveTo(centerX,centerY); ctx.lineTo(x2,y2); ctx.stroke(); }
    for(let ring=0; ring<5; ring++){ const rx=vw*(.18+ring*.085), ry=vh*(.07+ring*.038); ctx.save(); ctx.translate(centerX, centerY+vh*.025*ring); ctx.rotate(-.25+ring*.13+Math.sin(now*.00016+ring)*.03); ctx.strokeStyle=ring%2 ? 'rgba(95,160,130,.17)' : 'rgba(224,188,112,.15)'; ctx.lineWidth=ring===2?1.8:1.2; ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
    // network routes
    fx.routes.forEach((route,idx)=>{ const active = state.selection===route.scene; ctx.lineWidth=(route.width*4) + (active ? 3.6 : 0); ctx.strokeStyle=route.color + (active ? '0.08)' : '0.035)'); ctx.beginPath(); let p=bezier(route.p0,route.p1,route.p2,route.p3,0); ctx.moveTo(p[0]*vw,p[1]*vh); for(let t=.02;t<=1.001;t+=.02){ p=bezier(route.p0,route.p1,route.p2,route.p3,t); ctx.lineTo(p[0]*vw,p[1]*vh); } ctx.stroke(); ctx.lineWidth=route.width + (active ? 1.0 : .2); ctx.strokeStyle=route.color + (active ? '0.62)' : '0.28)'); ctx.stroke(); });
    // lower wave field
    for(let row=0; row<6; row++){ const y=vh*(.68 + row*.045); ctx.lineWidth=row===0?1.6:.9; const g=ctx.createLinearGradient(0,y,vw,y); g.addColorStop(0,'rgba(255,255,255,0)'); g.addColorStop(.22,'rgba(98,170,138,.12)'); g.addColorStop(.55,'rgba(232,197,122,.15)'); g.addColorStop(1,'rgba(255,255,255,0)'); ctx.strokeStyle=g; ctx.beginPath(); for(let x=0;x<=vw;x+=12){ const n=Math.sin((x*.011)+(now*.0012)+(row*.6))*12 + Math.cos((x*.005)+(row*.9))*4; if(x===0) ctx.moveTo(x,y+n); else ctx.lineTo(x,y+n); } ctx.stroke(); }
    // pulses
    for(let i=fx.pulses.length-1;i>=0;i--){ const pulse=fx.pulses[i]; pulse.t += pulse.speed*(isReduced?0.4:1); if(pulse.t>1.03){ fx.pulses.splice(i,1); continue; } const route=fx.routes[pulse.route], q=bezier(route.p0,route.p1,route.p2,route.p3,Math.max(0,pulse.t)); const x=q[0]*vw, y=q[1]*vh; const r=(pulse.size + Math.sin(now*.004+i)*.8) * (pulse.t<0 ? 0 : 1); const grad=ctx.createRadialGradient(x,y,0,x,y,22+r*4); grad.addColorStop(0, route.color+'0.95)'); grad.addColorStop(.16,'rgba(255,255,255,.85)'); grad.addColorStop(.36, route.color+'0.5)'); grad.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(x,y,24+r*2,0,Math.PI*2); ctx.fill(); }
    // scatter photons / vertical beams
    for(let i=0;i<78;i++){ const px=(i/77)*vw; const jitter=Math.sin(now*.00018+i*2.7)*vh*.09; const py=(.12 + (i%9)/10*.74)*vh + jitter; ctx.fillStyle = i%3===0 ? 'rgba(230,194,127,.34)' : 'rgba(97,168,135,.24)'; ctx.beginPath(); ctx.arc(px,py,1.4 + (i%3)*.45,0,Math.PI*2); ctx.fill(); if(i%5===0){ const beam=ctx.createLinearGradient(px,py-110,px,py+110); beam.addColorStop(0,'rgba(255,255,255,0)'); beam.addColorStop(.5, i%2===0 ? 'rgba(168,215,194,.14)' : 'rgba(235,203,136,.12)'); beam.addColorStop(1,'rgba(255,255,255,0)'); ctx.strokeStyle=beam; ctx.lineWidth=i%10===0?1.8:1.1; ctx.beginPath(); ctx.moveTo(px,py-96); ctx.lineTo(px,py+96); ctx.stroke(); } }
    // central halo
    const halo=ctx.createRadialGradient(centerX,centerY,10,centerX,centerY,vw*.28); halo.addColorStop(0,'rgba(255,248,236,.34)'); halo.addColorStop(.25,'rgba(213,238,223,.18)'); halo.addColorStop(.48,'rgba(229,195,125,.10)'); halo.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=halo; ctx.fillRect(0,0,vw,vh);
    ctx.globalCompositeOperation='source-over';
  }
  window.addEventListener('pointermove',e=>{ fx.pointer.x=e.clientX/window.innerWidth; fx.pointer.y=e.clientY/window.innerHeight; }, {passive:true});
  hotspotButtons.forEach((btn,idx)=>{btn.addEventListener('pointerdown',e=>e.stopPropagation());btn.addEventListener('pointermove',e=>e.stopPropagation());btn.addEventListener('click',e=>{e.stopPropagation();const scene=Number(btn.dataset.route)%3;selectScene(scene);pulseForScene(scene,3);});});

  function selectScene(index){
    const scene = sceneData[index]; if(!scene) return;
    state.selection=index;state.target=scene.rotation.slice();
    sceneButtons.forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-pressed', String(i===index));});hotspotButtons.forEach(b=>{const active=Number(b.dataset.route)===index;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});
    caption.innerHTML='<small>'+scene.label+'</small><p>'+scene.copy+'</p>';
    pulseForScene(index,2);
  }
  sceneButtons.forEach((b)=>b.addEventListener('click',()=>selectScene(Number(b.dataset.scene))));
  selectScene(0);
  pulseForScene(0,4);
  art.addEventListener('pointerdown', e=>{
    if(e.pointerType==='mouse' && e.button!==0)return;
    state.dragging=true;state.pointer={x:e.clientX,y:e.clientY};art.classList.add('dragging');
    art.setPointerCapture?.(e.pointerId);
  });
  art.addEventListener('pointermove',e=>{
    if(!state.dragging||!state.pointer)return;
    let dx=e.clientX-state.pointer.x,dy=e.clientY-state.pointer.y;
    state.target[1]+=dx*.006;state.target[0]=Math.max(-1.2,Math.min(1.2,state.target[0]+dy*.005));
    state.pointer={x:e.clientX,y:e.clientY};
  });
  const stopDrag=()=>{state.dragging=false;state.pointer=null;art.classList.remove('dragging');};
  art.addEventListener('pointerup',stopDrag);art.addEventListener('pointercancel',stopDrag);

  document.querySelectorAll('.work-row').forEach(row=>row.addEventListener('click',()=>{
    const isOpen=row.classList.contains('active');
    document.querySelectorAll('.work-row').forEach(r=>{r.classList.remove('active');r.setAttribute('aria-expanded','false');});
    if(!isOpen){row.classList.add('active');row.setAttribute('aria-expanded','true');}
  }));
  const navToggle=document.getElementById('navToggle'); const nav=document.getElementById('nav');
  navToggle.addEventListener('click',()=>{const open=!nav.classList.contains('show');nav.classList.toggle('show',open);navToggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('show');navToggle.setAttribute('aria-expanded','false');}));
  document.getElementById('brief').addEventListener('submit',async e=>{
    e.preventDefault();const form=e.currentTarget;
    const text='DNGWORLD — PROJECT BRIEF\nName: '+form.name.value+'\nCompany: '+form.company.value+'\nChallenge: '+form.challenge.value;
    try{await navigator.clipboard.writeText(text);document.getElementById('briefMessage').textContent='Đã sao chép brief. Bạn có thể dán vào email hoặc tin nhắn.';}
    catch(_){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();document.getElementById('briefMessage').textContent=ok?'Đã sao chép brief.':'Không thể sao chép tự động. Hãy chọn và sao chép nội dung thủ công.';}
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target);}
    }),{threshold:.10});
    document.querySelectorAll('.manifesto,.dark-section,.process,.contact,.manifesto-aside article,.process-step').forEach(e=>{e.classList.add('reveal');observer.observe(e);});
    const artWatch=new IntersectionObserver(entries=>{state.visible=entries[0].isIntersecting;},{threshold:0});artWatch.observe(art);
  }

  function perspective(fov,asp,near,far){
    const f=1/Math.tan(fov/2), nf=1/(near-far);
    return new Float32Array([f/asp,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0]);
  }
  function translateZ(z){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,z,1]);}
  function eulerMatrix(ax,ay,az){
    const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az);
    // Rz * Ry * Rx, column-major
    return new Float32Array([
      cz*cy,sz*cy,-sy,0,
      cz*sy*sx-sz*cx,sz*sy*sx+cz*cx,cy*sx,0,
      cz*sy*cx+sz*sx,sz*sy*cx-cz*sx,cy*cx,0,
      0,0,0,1
    ]);
  }

  // Render the *same* sculptural mesh at four small screen-space anchors.
  // Coordinates exactly match HTML hit targets; no image sprites or circular markers.
  function satelliteModel(ax,ay,az,x,y,z,scale){
    const m=eulerMatrix(ax,ay,az);
    for(let i=0;i<12;i++){ if(i%4!==3)m[i]*=scale; }
    m[12]=x;m[13]=y;m[14]=z;
    return m;
  }
  const satellites3d=[
    {x:.22,y:.30,phase:.4,scale:.062,route:0},
    {x:.61,y:.18,phase:2.3,scale:.057,route:1},
    {x:.75,y:.48,phase:4.0,scale:.066,route:2},
    {x:.40,y:.67,phase:5.2,scale:.060,route:1}
  ];

  const VERTEX=`
    attribute vec3 aPosition; attribute vec3 aNormal; attribute float aMat;
    uniform mat4 uModel,uView,uProjection;uniform float uTime;
    varying vec3 vNormal,vPosition;varying float vMat;
    void main(){
      vec4 world=uModel*vec4(aPosition,1.0);
      vNormal=normalize(mat3(uModel)*aNormal);vPosition=world.xyz;vMat=aMat;
      gl_Position=uProjection*uView*world;
    }
  `;
  const FRAGMENT=`
    precision highp float;
    varying vec3 vNormal,vPosition;varying float vMat;
    uniform vec3 uCamera;uniform float uTime,uFocus;
    vec3 baseColor(float m){
      if(m<.5)return vec3(.74,.71,.63);
      if(m<1.5)return vec3(.54,.35,.17);
      if(m<2.5)return vec3(.14,.29,.23);
      return vec3(.81,.63,.36);
    }
    void main(){
      vec3 n=normalize(vNormal),v=normalize(uCamera-vPosition);
      // soft studio lighting, with elongated reflection strips
      vec3 key=normalize(vec3(-.62,.79,1.2));vec3 fill=normalize(vec3(.9,-.16,.75));
      vec3 stripA=normalize(vec3(.58,.36,.91));vec3 stripB=normalize(vec3(-.77,.29,.63));
      float a=max(dot(n,key),0.),b=max(dot(n,fill),0.);
      float diff=.35+.54*a+.12*b;
      float gloss=pow(max(dot(n,normalize(key+v)),0.),42.);
      float fres=pow(1.-max(dot(n,v),0.),3.);
      float stripe1=exp(-pow((dot(n,stripA)-.76)*8.5,2.));
      float stripe2=exp(-pow((dot(n,stripB)-.72)*14.,2.));
      float brushed=.97+.03*sin(dot(vPosition,vec3(15.,55.,9.))*12.);
      vec3 base=baseColor(vMat);
      if(vMat>1.5&&vMat<2.5)base=mix(base,vec3(.25,.42,.34),.15+.15*sin(vPosition.y*4.));
      vec3 col=base*diff*brushed;
      col+=vec3(.94,.91,.85)*(gloss*.52+stripe1*.24);
      col+=vec3(.95,.76,.52)*stripe2*.26;
      col+=mix(vec3(.15,.25,.19),vec3(.66,.62,.52),step(1.5,vMat)) * fres*.32;
      if(vMat>2.5)col+=vec3(.28,.18,.06)*.15;
      col+=mix(vec3(.025,.036,.028),vec3(.04,.035,.016),uFocus/2.)*.10;
      col=col/(col+vec3(.24));
      col=pow(max(col,0.),vec3(.92));
      gl_FragColor=vec4(col,1.);
    }
  `;
  function shader(gl,type,source){
    let s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;
  }
  function program(gl){
    const p=gl.createProgram();gl.attachShader(p,shader(gl,gl.VERTEX_SHADER,VERTEX));gl.attachShader(p,shader(gl,gl.FRAGMENT_SHADER,FRAGMENT));gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;
  }
  function getMesh(){
    const b64=document.getElementById('mesh-data').textContent.trim();
    const binary=atob(b64);const raw=new Uint8Array(binary.length);
    for(let i=0;i<raw.length;i++)raw[i]=binary.charCodeAt(i);
    const dv=new DataView(raw.buffer), nV=dv.getUint32(0,true),nF=dv.getUint32(4,true),nBytes=nV*7*4;
    if(nV>200000||nF>300000)throw new Error('Invalid mesh');
    return {vertices:new Float32Array(raw.buffer,8,nV*7),indices:new Uint32Array(raw.buffer,8+nBytes,nF*3)};
  }
  let scene;
  function init(){
    const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,depth:true,preserveDrawingBuffer:false})||canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,preserveDrawingBuffer:false});
    if(!gl) return false;
    if(!gl.getExtension('OES_element_index_uint') && !(gl instanceof WebGL2RenderingContext))return false;
    const p=program(gl),mesh=getMesh();gl.useProgram(p);
    const vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vbo);gl.bufferData(gl.ARRAY_BUFFER,mesh.vertices,gl.STATIC_DRAW);
    const ebo=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.indices,gl.STATIC_DRAW);
    for(const [name,size,offset] of [['aPosition',3,0],['aNormal',3,12],['aMat',1,24]]){
      const loc=gl.getAttribLocation(p,name);if(loc<0)continue;
      gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,28,offset);
    }
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
    const uniforms={};for(const s of ['uModel','uView','uProjection','uCamera','uTime','uFocus'])uniforms[s]=gl.getUniformLocation(p,s);
    scene={gl,p,nIndices:mesh.indices.length,uniforms,dpr:0,width:0,height:0};art.classList.add('is-3d');
    return true;
  }
  try{init();}catch(e){console.warn('3D unavailable; using sculpture still render.',e);}
  function draw(now){
    requestAnimationFrame(draw);let dt=Math.min(60,now-state.last);state.last=now;
    if(!state.dragging&&!isReduced && !window.DNGFusion?.paused)state.target[1]+=.00010*dt;
    state.rot=state.rot.map((a,i)=>a+(state.target[i]-a)*Math.min(.15,dt*.0038));
    // V23 uses one coordinated field renderer; the V21 mesh remains unchanged.
    if(!scene||!state.visible)return;
    const {gl,p,uniforms}=scene;
    const rect=art.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.8);
    const w=Math.max(1,Math.floor(rect.width*dpr)),h=Math.max(1,Math.floor(rect.height*dpr));
    if(w!==scene.width||h!==scene.height){canvas.width=w;canvas.height=h;scene.width=w;scene.height=h;gl.viewport(0,0,w,h);}
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    const aspect=w/h;
    const fm=window.DNGFusion || {x:0,y:0,paused:false};
    const dragK=state.dragging?0:1;
    gl.uniformMatrix4fv(uniforms.uModel,false,eulerMatrix(state.rot[0] + fm.y*.33*dragK, state.rot[1] + fm.x*.52*dragK, state.rot[2] + fm.x*.08*dragK));
    gl.uniformMatrix4fv(uniforms.uView,false,translateZ(-4.55));
    gl.uniformMatrix4fv(uniforms.uProjection,false,perspective(47*Math.PI/180,aspect,.1,100));
    gl.uniform3f(uniforms.uCamera,0,0,4.55);
    gl.uniform1f(uniforms.uTime,now*.001);
    gl.uniform1f(uniforms.uFocus,state.selection);

    gl.drawElements(gl.TRIANGLES,scene.nIndices,gl.UNSIGNED_INT,0);
    // The four smaller shapes are the real V21 sculpture, not CSS circles.
    // Clear depth only: front silhouettes remain visually legible above the main mesh.
    gl.clear(gl.DEPTH_BUFFER_BIT);
    const isMobile=rect.width<650;
    const cameraZ=4.55,satZ=1.88;
    const visibleH=2*(cameraZ-satZ)*Math.tan(47*Math.PI/360);
    const visibleW=visibleH*aspect;
    const anim=window.DNGFusion?.paused ? (state.miniClock||0) : (state.miniClock=(state.miniClock||0)+Math.min(.05,dt*.001));
    satellites3d.forEach((s,i)=>{
      if(isMobile&&i===3)return;
      const x=(s.x-.5)*visibleW,y=(.5-s.y)*visibleH;
      const focus=s.route===state.selection;
      const sc=s.scale*(focus?1.10:1);
      const tilt=window.DNGFusion?.x || 0;
      const model=satelliteModel(.35+Math.sin(anim*.42+s.phase)*.27,
        anim*(.43+.06*i)+s.phase+tilt*.25,
        .20+anim*.19+s.phase*.3,x,y,satZ,sc);
      gl.uniformMatrix4fv(uniforms.uModel,false,model);
      gl.uniform1f(uniforms.uFocus,s.route);
      gl.drawElements(gl.TRIANGLES,scene.nIndices,gl.UNSIGNED_INT,0);
    });
    gl.enable(gl.DEPTH_TEST);
  }
  requestAnimationFrame(draw);
})();
