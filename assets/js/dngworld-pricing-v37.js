(()=>{'use strict';
const menu=document.getElementById('p37-menu'),toggle=document.querySelector('.p37-toggle');
if(menu&&toggle){const close=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'};
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});
menu.addEventListener('click',ev=>{if(ev.target.closest('a'))close()});document.addEventListener('keydown',ev=>{if(ev.key==='Escape')close()});}
const budget=document.getElementById('p37-budget'),channels=document.getElementById('p37-channels'),months=document.getElementById('p37-months'),output=document.getElementById('p37-result');
if(budget&&channels&&months&&output){const lang=document.querySelector('.p37-calc')?.dataset.lang||'vi';const fmt=(v)=>new Intl.NumberFormat(lang==='en'?'en-US':'vi-VN',{maximumFractionDigits:0}).format(Math.round(v))+(lang==='zh'?' VND':' ₫');
const strings={vi:['Phí quản lý / tháng','Tổng phí quản lý','Ngân sách Ads','Tổng chi phí dự kiến'],en:['Monthly management','Total management','Ad spend','Estimated total'],zh:['每月管理费','管理费合计','广告预算','预估总费用']}[lang]||[];
const recompute=()=>{const b=Math.min(1e10,Math.max(0,Number(budget.value)||0)),c=Math.max(1,Math.min(3,Number(channels.value)||1)),m=Math.max(1,Math.min(12,Number(months.value)||1));const monthFee=Math.max(3000000,b*.15)+(c-1)*1500000,fee=monthFee*m,spend=b*m;output.replaceChildren();for(const [label,value,isTotal] of [[strings[0],monthFee,false],[strings[1],fee,false],[strings[2],spend,false],[strings[3],fee+spend,true]]){const div=document.createElement('div');if(isTotal)div.className='p37-sum';const key=document.createElement('span');key.textContent=label;const val=document.createElement('strong');val.textContent=fmt(value);div.append(key,val);output.appendChild(div)}};[budget,channels,months].forEach(x=>x.addEventListener('input',recompute));recompute();}
})();
