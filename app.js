const app=document.getElementById("app");
const state={page:location.hash.slice(1)||"intake",lang:"en",data:JSON.parse(localStorage.getItem("gramSaarthiData")||"{}")};

const states=["Andhra Pradesh","Telangana","Karnataka","Tamil Nadu","Maharashtra","Gujarat","Rajasthan","Madhya Pradesh","Uttar Pradesh","West Bengal","Odisha","Bihar","Kerala","Delhi","Haryana","Punjab"];
const categories=["Dairy","Tailoring / Textiles","Kirana / Grocery","Poultry / Livestock","Agriculture","Food Processing","Handicrafts","Retail / Services"];
const registrations=["Unregistered","Udyam Registration","GST Registration","SHG / Group"];
const schemes=[
 {name:"PM Mudra — Shishu",sub:"Pradhan Mantri Mudra Yojana — Shishu Tier",min:50000,fit:95,tag:"Shishu Tier",chips:["No Collateral","Micro-enterprise"],desc:"Collateral-free working capital loan for micro-enterprises"},
 {name:"Stand-Up India",sub:"Stand-Up India Scheme",min:10000000,fit:82,tag:"Greenfield",chips:["Women Entrepreneur","OBC/SC/ST eligible","Manufacturing/Services sector"],desc:"Greenfield enterprise loans for eligible entrepreneurs"},
 {name:"PM Mudra — Kishor",sub:"Pradhan Mantri Mudra Yojana — Kishor Tier",min:500000,fit:78,tag:"Kishor Tier",chips:["No Collateral","4+ years experience","Udyam registration eligible"],desc:"For established micro-enterprises seeking expansion capital"},
 {name:"PM SVANidhi",sub:"PM Street Vendor's AtmaNirbhar Nidhi",min:50000,fit:45,tag:"Subsidy Available",chips:["No Collateral","UPI cashback incentive"],desc:"Working-capital support for eligible street vendors"}
];

function save(){localStorage.setItem("gramSaarthiData",JSON.stringify(state.data))}
function money(n){return "₹"+Number(n||0).toLocaleString("en-IN")}
function val(id){return document.getElementById(id)?.value||""}
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.remove("hidden");setTimeout(()=>x.classList.add("hidden"),2400)}
function navigate(p){location.hash=p}
window.addEventListener("hashchange",()=>{state.page=location.hash.slice(1)||"intake";render()});

function headerActive(){
 document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.dataset.page===state.page));
}
function render(){
 if(state.page==="dashboard") dashboard();
 else if(state.page==="schemes") schemesPage();
 else intake();
 headerActive();
}
function intake(){
 const d=state.data;
 app.innerHTML=`<div class="container">
  <div class="hero">
   <div class="eyebrow">ⓘ &nbsp; FINANCIAL INTAKE</div>
   <h1>Business &amp; Entrepreneur Profile</h1>
   <p class="sub">Tell us about yourself and your business so we can personalize your financial roadmap</p>
   <div class="progress"><i></i></div>
   <div class="steps"><div><div class="step-dot active">1</div><b>Business Profile</b></div><div><div class="step-dot">2</div>Financial Health</div></div>
  </div>
  <form id="intakeForm" class="card form-card">
   <div class="section-title">Personal Information</div>
   <div class="field"><label>Full Name <span class="req">*</span></label><input id="name" required placeholder="e.g. Meena Devi Sharma" value="${d.name||""}"></div>
   <div class="grid2">
    <div class="field"><label>Gender <span class="req">*</span></label><select id="gender" required><option value="">Select gender</option><option>Female</option><option>Male</option><option>Non-Binary</option><option>Prefer not to say</option></select></div>
    <div class="field"><label>Social Category <span class="req">*</span></label><select id="category" required><option value="">Select category</option><option>SC</option><option>ST</option><option>OBC</option><option>General</option><option>Minority</option><option>Differently Abled</option></select></div>
    <div class="field"><label>State / UT <span class="req">*</span></label><select id="state" required><option value="">Select state</option>${states.map(s=>`<option>${s}</option>`).join("")}</select></div>
    <div class="field"><label>District</label><input id="district" placeholder="Enter your district name" value="${d.district||""}"></div>
   </div>
   <div class="section-title">Business Details</div>
   <div class="field"><label>Business Category <span class="req">*</span></label><select id="business" required><option value="">Select business type</option>${categories.map(x=>`<option>${x}</option>`).join("")}</select></div>
   <div class="grid2">
    <div class="field"><label>Years in Operation <span class="req">*</span></label><div class="help">How long has your business been running?</div><input id="years" type="number" min="0" required placeholder="e.g. 4" value="${d.years||""}"></div>
    <div class="field"><label>Business Registration <span class="req">*</span></label><div class="help">Formal registration improves loan eligibility</div><select id="registration" required><option value="">Select registration type</option>${registrations.map(x=>`<option>${x}</option>`).join("")}</select></div>
   </div>
   <div class="section-title">Financial Health</div>
   <div class="grid2">
    <div class="field"><label>Monthly Business Income (₹) <span class="req">*</span></label><input id="income" type="number" min="0" required placeholder="e.g. 50000" value="${d.income||""}"></div>
    <div class="field"><label>Monthly Business Expenses (₹) <span class="req">*</span></label><input id="expense" type="number" min="0" required placeholder="e.g. 30000" value="${d.expense||""}"></div>
    <div class="field"><label>Household Expenses / month (₹)</label><input id="household" type="number" min="0" placeholder="e.g. 10000" value="${d.household||""}"></div>
    <div class="field"><label>Monthly EMI / Debt Payment (₹)</label><input id="emi" type="number" min="0" placeholder="e.g. 6000" value="${d.emi||""}"></div>
    <div class="field"><label>Liquid Savings (₹)</label><input id="savings" type="number" min="0" placeholder="e.g. 10000" value="${d.savings||""}"></div>
    <div class="field"><label>Current Debt Outstanding (₹)</label><input id="debt" type="number" min="0" placeholder="e.g. 50000" value="${d.debt||""}"></div>
   </div>
   <div class="actions"><button class="primary" type="submit">Save &amp; View Financial Health →</button></div>
  </form>
 </div>${footer()}`;
 const set=(id,k)=>{if(d[k])document.getElementById(id).value=d[k]};
 set("gender","gender");set("category","category");set("state","state");set("business","business");set("registration","registration");
 document.getElementById("intakeForm").onsubmit=e=>{e.preventDefault();["name","gender","category","state","district","business","years","registration","income","expense","household","emi","savings","debt"].forEach(k=>state.data[k]=val(k));save();toast("Assessment saved");navigate("dashboard")}
}
function footer(){return `<div class="footer">Built for Smart India Hackathon 2026 | Empowering Rural Entrepreneurship 🌱</div>`}

function calc(){
 const d=state.data; const income=+d.income||0, expense=+d.expense||0, household=+d.household||0, emi=+d.emi||0, savings=+d.savings||0;
 const cash=Math.max(0,income-expense-household-emi), margin=income?cash/income*100:0;
 const debtBurden=income?emi/income*100:0, dscr=emi?Math.max(0,income-expense-household)/emi:0;
 const buffer=(expense+household+emi)>0?savings/(expense+household+emi):0;
 let score=Math.round(Math.min(100, 40 + margin*.7 + (dscr>=1.25?18:dscr*10) + (debtBurden<35?12:0) + Math.min(10,buffer*5)));
 return {income,expense,household,emi,savings,cash,margin,debtBurden,dscr,buffer,score}
}
function dashboard(){
 const d=state.data,c=calc(),score=c.score;
 app.innerHTML=`<div class="container">
 <div class="dashboard-top"><div><h1>Financial Health Dashboard</h1><p class="sub">Last updated: ${new Date().toLocaleString("en-IN")} · Based on submitted intake data</p></div><div class="btn-row"><button class="secondary" onclick="navigate('intake')">↻ New Assessment</button><button class="primary" onclick="window.print()">⇩ Download Blueprint</button></div></div>
 <div class="card profile-strip"><div class="profile-info"><div class="kv"><span>Entrepreneur</span><strong>${d.name||"Not provided"}</strong></div><div class="kv"><span>Business</span><strong>${d.business||"Not provided"}</strong></div><div class="kv"><span>Location</span><strong>${d.district||"—"}, ${d.state||"—"}</strong></div><div class="kv"><span>Experience</span><strong>${d.years||0} years</strong></div></div><div class="badges"><span class="badge">${d.category||"Category"}</span><span class="badge">${d.gender||"Entrepreneur"}</span><span class="badge gray">${d.registration||"Unregistered"}</span></div></div>
 <div class="health-grid">
  <div class="score"><div><div style="text-align:center;color:#617794;font-weight:700">FINANCIAL HEALTH INDEX</div><div style="text-align:center;color:#7184a0">Composite creditworthiness score</div><div class="gauge"><div class="score-num">${score}</div></div><div style="text-align:center;color:${score>=73?'#168441':score>=46?'#df7b00':'#df302f'};font-weight:700">${score>=73?"Bank-Ready":score>=46?"Moderate Stability / Needs Optimization":"High Risk"}</div></div></div>
  ${healthCard("Cash Flow Health",money(c.cash),c.margin.toFixed(1)+"% margin",c.margin>20?"Safe Zone: positive monthly surplus":"Needs improvement",c.margin>20)}
  ${healthCard("Debt Toxicity Gauge",c.debtBurden.toFixed(1)+"%","₹"+Number(c.emi).toLocaleString("en-IN")+"/month EMI",c.debtBurden<35?"Healthy: Debt within safe limits":"Debt burden needs attention",c.debtBurden<35)}
  ${healthCard("Emergency Resilience",c.buffer.toFixed(1)+" months","₹"+Number(c.savings).toLocaleString("en-IN")+" liquid savings",c.buffer>=1?"Healthy reserve":"Critical: Less than 1 month of reserves",c.buffer>=1)}
  ${healthCard("Working Capital Efficiency",money(Math.max(0,c.income-c.expense)),(c.income?((c.income-c.expense)/c.income*100):0).toFixed(0)+"% of revenue","Good buffer for inventory and restocking",true)}
 </div>
 <div class="section-row"><div><h2>Financial Projection</h2><p class="sub">Scenario planning based on your current monthly figures</p></div></div>
 <div class="charts"><div class="card chart"><h3>12-Month Cash Flow Path</h3>${lineChart(c)}</div><div class="card chart"><h3>Monthly Revenue &amp; Expenses</h3>${barChart(c)}</div></div>
 <div class="section-row"><div><h2>Personalized Strategic Roadmap</h2><p class="sub">Action plans tailored for your ${d.business||"business"} — ranked by impact</p></div></div>
 <div class="roadmap">${road("Debt Restructuring","Medium","Implement in 30–45 days","Review EMI burden and compare lower-cost credit options.")}${road("Cost Reduction","Easy","Implement in 14 days","Reduce expenses by ₹1,200–₹2,800/month through supplier and process improvements.")}${road("Growth Financing","Medium","Implement in 45–90 days","Build documentation and access institutional credit when ready.")}</div>
 <div class="card"><h2>Loan Readiness Breakdown</h2><div class="stats"><div class="stat green"><span>Debt Service Coverage Ratio</span><div class="n">${c.dscr.toFixed(2)}x</div><small>Banks often look for ≥1.25x</small></div><div class="stat green"><span>Debt Burden Ratio</span><div class="n">${c.debtBurden.toFixed(1)}%</div><small>Safe zone: below 35%</small></div><div class="stat amber"><span>Overall Credit Readiness</span><div class="n">${score}/100</div><small>Indicative, not a loan approval</small></div><div class="stat"><span>Monthly Surplus</span><div class="n">${money(c.cash)}</div><small>After business, household and EMI</small></div></div></div>
 </div>${footer()}`;
}
function healthCard(title,metric,sub,note,good){return `<div class="health-card ${good?'':'alert'}"><div style="font-size:28px">${good?'↗':'⚠'}</div><div class="metric-title">${title}</div><div class="metric">${metric}</div><div style="color:#7184a2">${sub}</div><p class="metric-note"><span class="dot"></span>${note}</p></div>`}
function road(a,b,c,d){return `<div class="road"><h3>${a} <span class="badge" style="font-size:12px">${b}</span></h3><p>◷ ${c}</p><p>${d}</p></div>`}
function lineChart(c){let pts=[],opt=[];for(let i=0;i<12;i++){let x=35+i*48,y=265-(c.cash*i*0.6);let y2=265-(c.cash*i*0.48);pts.push(`${x},${Math.max(40,y)}`);opt.push(`${x},${Math.max(40,y2)}`)}return `<svg viewBox="0 0 580 300"><g stroke="#d7e1ee" stroke-dasharray="4 5">${[50,110,170,230,270].map(y=>`<line x1="35" x2="560" y1="${y}" y2="${y}"/>`).join("")}</g><polyline fill="none" stroke="#168441" stroke-width="4" points="${pts.join(" ")}"/><polyline fill="none" stroke="#647994" stroke-width="3" stroke-dasharray="7 5" points="${opt.join(" ")}"/><text x="250" y="295" fill="#6c809c">Sep → Aug</text></svg>`}
function barChart(c){let bars="";for(let i=0;i<12;i++){let x=30+i*45,h=Math.max(25,(c.income/1000)*.9),e=Math.max(20,(c.expense/1000)*.7),n=Math.max(10,(c.cash/1000)*.6);bars+=`<rect x="${x}" y="${250-h}" width="13" height="${h}" rx="2" fill="#168441"/><rect x="${x+14}" y="${250-e}" width="10" height="${e}" rx="2" fill="#ee6969"/><rect x="${x+25}" y="${250-n}" width="10" height="${n}" rx="2" fill="#2447bd"/>`}return `<svg viewBox="0 0 580 300"><g stroke="#d7e1ee" stroke-dasharray="4 5">${[70,130,190,250].map(y=>`<line x1="25" x2="570" y1="${y}" y2="${y}"/>`).join("")}</g>${bars}<text x="235" y="290" fill="#6c809c">Sep  Oct  Nov  Dec  Jan  Feb  Mar  Apr  May  Jun  Jul  Aug</text></svg>`}

function schemesPage(){
 const d=state.data, c=calc();
 app.innerHTML=`<div class="container">
 <div class="scheme-head"><div><h1>Government Schemes &amp; Loan Readiness</h1><p class="sub">Matched to ${d.name||"your profile"}'s profile · 4 high-fit schemes found</p></div><div class="funding">Total Accessible Funding<br>${money(16000000)}+</div></div>
 <div class="stats"><div class="stat"><span>◉ Total Schemes</span><div class="n">7</div></div><div class="stat green"><span>↗ High Fit (≥75%)</span><div class="n">4</div></div><div class="stat"><span>♙ No Collateral</span><div class="n">4</div></div><div class="stat amber"><span>♙ With Subsidy</span><div class="n">4</div></div></div>
 <div class="filters"><input id="searchScheme" class="search" placeholder="⌕  Search schemes by name, ministry, or category..."><div class="filter-row">${["All","Working Capital","Expansion","Subsidy Scheme","Micro-Credit","SHG Scheme","SC/ST Scheme","Greenfield"].map((x,i)=>`<button class="filter ${i===0?"active":""}">${x}</button>`).join("")}</div></div>
 <div class="match">🎯 Schemes below are matched to <strong>${d.name||"your profile"}</strong> — ${d.business||"business"}, ${d.state||"India"}. Fit scores are indicative and based on profile attributes. <span class="badge">${d.category||"Category"}</span></div>
 <div id="schemeList">${schemes.map((s,i)=>schemeCard(s,i===0)).join("")}</div>
 <div class="disclaimer"><strong>Disclaimer:</strong> Scheme details are illustrative and based on publicly available government information. Eligibility criteria, funding limits, and application processes may change. Always verify current details with the official scheme portal or your nearest Common Service Centre (CSC). GRAM SAARTHI does not guarantee loan approval or scheme eligibility.</div>
 </div>${footer()}`;
 document.getElementById("searchScheme").oninput=e=>{const q=e.target.value.toLowerCase();document.querySelectorAll(".scheme").forEach(x=>x.style.display=x.innerText.toLowerCase().includes(q)?"block":"none")}
}
function schemeCard(s,fit){return `<div class="scheme ${fit?"fit":""}"><div class="scheme-title">${s.name} <span class="badge">${s.tag}</span> <span class="badge green">No Collateral</span></div><div class="scheme-sub">${s.sub}<br>Ministry: Ministry of Finance / Relevant implementing agency</div>${fit?`<div class="fit-score">Profile Fit<br>${s.fit}%</div>`:""}<div class="scheme-meta"><div><span>Max Funding</span><div class="money">${money(s.min)}</div></div><div>${s.desc}</div></div><div class="chips">${s.chips.map(x=>`<span class="chip">✓ ${x}</span>`).join("")}</div><div class="docs">⌄ &nbsp; View Documents &amp; Application Steps</div></div>`}

let recognition=null;
function setupVoice(){
 const panel=document.getElementById("voicePanel");
 document.getElementById("voiceBtn").onclick=()=>panel.classList.toggle("hidden");
 document.getElementById("closeVoice").onclick=()=>panel.classList.add("hidden");
 document.getElementById("startVoice").onclick=()=>{
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRecognition){toast("Voice recognition is not supported. Use Chrome or Edge.");return}
  recognition=new SpeechRecognition(); recognition.lang={en:"en-IN",hi:"hi-IN",te:"te-IN",ta:"ta-IN"}[state.lang]||"en-IN"; recognition.interimResults=false; recognition.continuous=false;
  document.getElementById("voiceStatus").textContent="Listening… say the field and value.";
  recognition.onresult=e=>{const text=e.results[0][0].transcript.toLowerCase();handleVoice(text);};
  recognition.onerror=e=>document.getElementById("voiceStatus").textContent="Voice error: "+e.error;
  recognition.onend=()=>document.getElementById("voiceStatus").textContent="Ready. Start listening again.";
  recognition.start();
 };
 document.getElementById("stopVoice").onclick=()=>recognition?.stop();
}
function handleVoice(t){
 let target=null,value=t;
 const rules=[
  [/name (?:is|my name is) (.+)/,"name"],[/my name is (.+)/,"name"],
  [/(?:income|revenue).*(\d[\d,]*)/,"income"],[/(?:expense|expenses).*(\d[\d,]*)/,"expense"],
  [/(?:household).*(\d[\d,]*)/,"household"],[/(?:emi|installment).*(\d[\d,]*)/,"emi"],
  [/(?:saving|savings).*(\d[\d,]*)/,"savings"],[/(?:debt).*(\d[\d,]*)/,"debt"],
  [/(?:years|experience).*(\d+(?:\.\d+)?)/,"years"],[/district (?:is|:)?\s*(.+)/,"district"],
  [/state (?:is|:)?\s*(.+)/,"state"],[/business (?:is|:)?\s*(.+)/,"business"]
 ];
 for(const [re,k] of rules){const m=t.match(re);if(m){target=k;value=m[1];break}}
 if(target){
   if(["income","expense","household","emi","savings","debt","years"].includes(target)) value=value.replace(/,/g,"").replace(/[^\d.]/g,"");
   if(target==="state"){const s=states.find(x=>x.toLowerCase()===value.trim());if(s)value=s}
   state.data[target]=value;save();const el=document.getElementById(target);if(el)el.value=value;
   document.getElementById("voiceStatus").textContent=`Captured ${target}: ${value}`;
   toast(`Captured ${target}`);
 }else document.getElementById("voiceStatus").textContent=`I heard: “${t}”. Try “income 50000” or “name is Ravi”.`;
}
document.getElementById("language").onchange=e=>{state.lang=e.target.value;toast("Language preference changed")};
setupVoice();render();
