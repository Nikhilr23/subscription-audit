const cats=['Streaming','Productivity','Storage','Design','AI tools','Fitness','Finance','Communication','Other'];
const known={notion:'Productivity',evernote:'Productivity',obsidian:'Productivity',dropbox:'Storage','google one':'Storage',icloud:'Storage',canva:'Design',figma:'Design',chatgpt:'AI tools',claude:'AI tools',netflix:'Streaming',hulu:'Streaming',spotify:'Streaming',slack:'Communication',zoom:'Communication'};
const rows=document.getElementById('rows');
const flagsEl=document.getElementById('flags');

function add(name='',cost='',cat='Other'){
  const r=document.createElement('div');
  r.className='subrow';

  const nameInput=document.createElement('input');
  nameInput.className='name';
  nameInput.placeholder='Subscription';
  nameInput.value=name;

  const costInput=document.createElement('input');
  costInput.className='cost';
  costInput.type='number';
  costInput.min='0';
  costInput.step='.01';
  costInput.placeholder='$ / month';
  costInput.value=cost;

  const select=document.createElement('select');
  cats.forEach(category=>{
    const option=document.createElement('option');
    option.value=category;
    option.textContent=category;
    option.selected=category===cat;
    select.appendChild(option);
  });

  const remove=document.createElement('button');
  remove.className='remove';
  remove.type='button';
  remove.setAttribute('aria-label','Remove subscription');
  remove.textContent='×';

  remove.addEventListener('click',()=>{r.remove();calc();});
  nameInput.addEventListener('change',()=>{
    const guess=known[nameInput.value.trim().toLowerCase()];
    if(guess)select.value=guess;
    calc();
  });
  [nameInput,costInput,select].forEach(control=>control.addEventListener('input',calc));

  r.append(nameInput,costInput,select,remove);
  rows.appendChild(r);
  calc();
}

function calc(){
  let monthly=0;
  const groups={};
  [...rows.children].forEach(r=>{
    const rawName=r.querySelector('.name').value.trim();
    const name=rawName||'Unnamed';
    const cost=Math.max(0,Number(r.querySelector('.cost').value)||0);
    const cat=r.querySelector('select').value;
    monthly+=cost;
    (groups[cat]??=[]).push({name,cost});
  });

  let potential=0;
  flagsEl.replaceChildren();
  let hasFlags=false;

  Object.entries(groups).forEach(([cat,items])=>{
    if(cat==='Other'||items.length<=1)return;
    const sorted=[...items].sort((a,b)=>b.cost-a.cost);
    const save=sorted.slice(1).reduce((sum,item)=>sum+item.cost,0);
    potential+=save;
    hasFlags=true;

    const flag=document.createElement('div');
    flag.className='flag';
    const title=document.createElement('b');
    title.textContent=`${cat}: ${items.map(item=>item.name).join(', ')}`;
    const lineBreak=document.createElement('br');
    const detail=document.createElement('span');
    detail.textContent=`${items.length} subscriptions · up to $${save.toFixed(2)}/mo overlap if only the highest-cost item were kept. Review features before canceling anything.`;
    flag.append(title,lineBreak,detail);
    flagsEl.appendChild(flag);
  });

  if(!hasFlags){
    const empty=document.createElement('p');
    empty.textContent='No same-category overlaps detected yet.';
    flagsEl.appendChild(empty);
  }

  document.getElementById('monthly').textContent='$'+monthly.toFixed(2);
  document.getElementById('annual').textContent='$'+(monthly*12).toFixed(2);
  document.getElementById('potential').textContent='$'+potential.toFixed(2);
}

document.getElementById('add').onclick=()=>add();
add('Notion',10,'Productivity');
add('Evernote',15,'Productivity');
add('Dropbox',12,'Storage');