let currentStep = 1;
const stepTitles = ['Vos informations','Votre activite','Votre futur site','Budget & delai'];

function openDevis(e){if(e)e.preventDefault();document.getElementById('devisModal').classList.add('active');document.body.style.overflow='hidden';}
function closeDevis(){document.getElementById('devisModal').classList.remove('active');document.body.style.overflow='';}

window.addEventListener('load',function(){
  document.getElementById('devisModal').addEventListener('click',function(e){if(e.target===this)closeDevis();});

  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement,isOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!isOpen)item.classList.add('open');
    });
  });

  const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';}});},{threshold:0.1});
  document.querySelectorAll('.card,.testi,.step,.offer-card').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(20px)';el.style.transition='opacity 0.5s ease,transform 0.5s ease';obs.observe(el);});
});

function goTo(step){
  document.getElementById('page'+currentStep).classList.remove('active');
  currentStep=step;
  document.getElementById('page'+currentStep).classList.add('active');
  document.getElementById('progressFill').style.width=(step/4*100)+'%';
  document.getElementById('progressLabel').textContent='Etape '+step+' sur 4';
  document.getElementById('progressTitle').textContent=stepTitles[step-1];
  document.getElementById('devisBox').scrollTop=0;
}

function toggleChip(el){el.classList.toggle('selected');}
function selectChip(gid,el){document.querySelectorAll('#'+gid+' .chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');}
function getChips(gid){return Array.from(document.querySelectorAll('#'+gid+' .chip.selected')).map(c=>c.textContent).join(', ')||'-';}

function submitDevis(){
  const prenom=document.getElementById('f-prenom').value||'Client';
  const nom=document.getElementById('f-nom').value||'';
  const email=document.getElementById('f-email').value||'-';
  const tel=document.getElementById('f-tel').value||'-';
  const metier=document.getElementById('f-metier').value||'-';
  const zone=document.getElementById('f-zone').value||'-';
  const desc=document.getElementById('f-desc').value||'-';
  const services=document.getElementById('f-services').value||'-';
  const concurrent=document.getElementById('f-concurrent').value||'-';
  const exemples=document.getElementById('f-exemples').value||'-';
  const autres=document.getElementById('f-autres').value||'-';
  const couleurs=getChips('chips-couleurs');
  const photos=getChips('chips-photos');
  const budget=getChips('chips-budget');
  const delai=getChips('chips-delai');
  const logo=getChips('chips-logo');
  const domaine=getChips('chips-domaine');

  const waMsg='Nouvelle demande de devis RenoWeb\n\n'+
    'Nom : '+prenom+' '+nom+'\n'+
    'Email : '+email+'\nTel : '+tel+'\n\n'+
    'Metier : '+metier+'\nZone : '+zone+'\n'+
    'Budget : '+budget+'\nDelai : '+delai+'\n'+
    'Couleurs : '+couleurs+'\nPhotos : '+photos+'\n'+
    'Logo : '+logo+'\nDomaine : '+domaine+'\n\n'+
    'Services : '+services+'\nDescription : '+desc;
  window.open('https://wa.me/33614312919?text='+encodeURIComponent(waMsg),'_blank');

  document.getElementById('confirm-prenom').textContent=prenom;
  const rows=[['Nom',(prenom+' '+nom).trim()||'-'],['Email',email],['Tel',tel],['Metier',metier],['Zone',zone],['Couleurs',couleurs],['Photos',photos],['Budget',budget],['Delai',delai],['Logo',logo],['Domaine',domaine]];
  document.getElementById('summaryBox').innerHTML=rows.map(([k,v])=>'<div class="summary-row"><span>'+k+'</span><span>'+v+'</span></div>').join('');
  document.getElementById('page4').classList.remove('active');
  document.getElementById('progressWrap').style.display='none';
  document.getElementById('pageConfirm').classList.add('active');
  document.getElementById('devisBox').scrollTop=0;
}
