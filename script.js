var MAP="HHRHHN"+"HAHHRR"+"NHHAHH"+"HHHRHH";
var D={H:{n:"Healthy",s:"Leave as is",a:{en:"No problem found. No spraying needed.",hi:"कोई समस्या नहीं मिली। छिड़काव की ज़रूरत नहीं।",pa:"ਕੋਈ ਸਮੱਸਿਆ ਨਹੀਂ ਮਿਲੀ। ਛਿੜਕਾਅ ਦੀ ਲੋੜ ਨਹੀਂ।"}},
R:{n:"Yellow rust",s:"Spot spray, then re-scan in a week",a:{en:"Yellow rust found. Spot-treat these plants only; confirm the fungicide with your KVK.",hi:"पीला रतुआ मिला। केवल इन्हीं पौधों पर छिड़काव करें; दवा की पुष्टि KVK से करें।",pa:"ਪੀਲੀ ਕੁੰਗੀ ਮਿਲੀ। ਸਿਰਫ਼ ਇਨ੍ਹਾਂ ਪੌਦਿਆਂ ਉੱਤੇ ਛਿੜਕਾਅ ਕਰੋ; ਦਵਾਈ ਦੀ ਪੁਸ਼ਟੀ KVK ਤੋਂ ਕਰੋ।"}},
A:{n:"Aphids",s:"Neem-based spray first",a:{en:"Aphids found. Try a neem-based spray first; no chemical needed yet.",hi:"माहू मिला। पहले नीम आधारित स्प्रे आज़माएं; अभी रसायन की ज़रूरत नहीं।",pa:"ਚੇਪਾ ਮਿਲਿਆ। ਪਹਿਲਾਂ ਨਿੰਮ ਵਾਲਾ ਸਪਰੇਅ ਵਰਤੋ; ਹਾਲੇ ਰਸਾਇਣ ਦੀ ਲੋੜ ਨਹੀਂ।"}},
N:{n:"Nitrogen shortage",s:"Check fertiliser, no spray",a:{en:"Looks like a nitrogen shortage, not a disease. No pesticide needed; check fertiliser.",hi:"यह नाइट्रोजन की कमी लगती है, रोग नहीं। कीटनाशक की ज़रूरत नहीं; खाद जाँचें।",pa:"ਇਹ ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਘਾਟ ਲੱਗਦੀ ਹੈ, ਬਿਮਾਰੀ ਨਹੀਂ। ਕੀਟਨਾਸ਼ਕ ਦੀ ਲੋੜ ਨਹੀਂ; ਖਾਦ ਜਾਂਚੋ।"}}};
var lang="en",sel=-1,pos=-1,timer=null,scanned=0,order=[],cells=[],field=document.getElementById("field");
function $(i){return document.getElementById(i)}
for(var r=0;r<4;r++)for(var c=0;c<6;c++)order.push(r*6+(r%2?5-c:c));
for(var i=0;i<24;i++){var b=document.createElement("button");b.className="cell";b.disabled=true;b.setAttribute("aria-label","Plant "+(i+1)+", not scanned");(function(i){b.onclick=function(){pick(i)}})(i);field.appendChild(b);cells.push(b)}
function stats(){var issues=0,spray=0;order.slice(0,scanned).forEach(function(i){var k=MAP[i];if(k!=="H")issues++;if(k==="R"||k==="A")spray++});
$("s1").textContent=scanned+" / 24";$("s2").textContent=issues;$("s3").textContent=spray;$("s4").textContent=scanned?Math.round((1-spray/scanned)*100)+"%":"–"}
function pick(i){sel=i;cells.forEach(function(c,j){c.classList.toggle("sel",j===i)});var k=MAP[i],d=D[k],sev=k==="H"?0:10+(i*13)%50,conf=82+(i*7)%15;
$("detail").innerHTML="<b>Plant "+(i+1)+": "+d.n+"</b><br>Confidence "+conf+"%"+(k==="H"?"":", leaf area affected about "+sev+"%")+"<br>Next step: "+d.s;$("adv").textContent=d.a[lang]}
function step(){if(pos>=0)cells[order[pos]].classList.remove("bot");pos++;
if(pos>=24){clearInterval(timer);$("st").textContent="Scan complete";$("sol").textContent="0 W";$("go").disabled=false;return}
var i=order[pos],k=MAP[i];cells[i].classList.add("bot","on",k);cells[i].disabled=false;cells[i].setAttribute("aria-label","Plant "+(i+1)+", "+D[k].n);
scanned=pos+1;stats();$("sol").textContent=(120+Math.round(Math.sin(pos/3)*18))+" W";$("bat").textContent=Math.min(100,78+Math.floor(pos/3))+"%";$("st").textContent="Scanning row "+(Math.floor(pos/6)+1)}
function reset(){clearInterval(timer);pos=-1;scanned=0;sel=-1;cells.forEach(function(c,i){c.className="cell";c.disabled=true;c.setAttribute("aria-label","Plant "+(i+1)+", not scanned")});
$("go").disabled=false;$("st").textContent="Idle";$("sol").textContent="0 W";$("bat").textContent="78%";$("detail").textContent="Select a scanned plant to see what the robot found.";$("adv").textContent="Advice appears here in the farmer’s language.";stats()}
$("go").onclick=function(){reset();$("go").disabled=true;timer=setInterval(step,380)};$("reset").onclick=reset;
document.querySelectorAll(".lang button").forEach(function(b){b.onclick=function(){lang=b.dataset.l;document.querySelectorAll(".lang button").forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});if(sel>=0)$("adv").textContent=D[MAP[sel]].a[lang]}});
stats();
