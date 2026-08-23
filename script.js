const DATA = {
  name: "Anupam Kushwaha",
  navItems: [
    {id:'about', label:'About'},
    {id:'skills', label:'Skills'},
    {id:'projects', label:'Projects'},
    {id:'experience', label:'Experience'},
    {id:'achievements', label:'Achievements'},
    {id:'contact', label:'Contact'},
  ],
  skills: [
    {cat:'Frontend', items:['HTML','CSS','JavaScript']},
    {cat:'Languages', items:['Java','Python','C']},
    {cat:'Soft skills', items:['Problem solving','Critical thinking','Time management','Communication']},
    {cat:'Active on', items:['GitHub','LeetCode']},
  ],
  projects: [
    { size:'large', index:'01', name:'AI Resume Screening System',
      desc:'A machine learning system that screens and ranks resumes automatically, built to speed up shortlisting and reduce manual review effort.',
      tech:['Python','Machine Learning'],
      features:['Automatic resume ranking','Reduced manual review','Deployed live'],
      github:'https://github.com/Anupamkushwaha8', demo:'https://ai-resume-screening-system-f5ra.onrender.com/' },
    { size:'large', index:'02', name:'Food Ordering Web Application',
      desc:'A responsive food-ordering site where users browse a menu, pick items and place orders through an intuitive interface. JavaScript drives the cart — items and the order summary update in real time — on a clean, mobile-friendly layout.',
      tech:['HTML','CSS','JavaScript'],
      features:['Menu browsing','Live cart updates','Order summary','Mobile-friendly layout'],
      github:'https://github.com/Anupamkushwaha8', demo:'https://food-ordering-ng0yrxyka-anupamkushwaha8s-projects.vercel.app' },
    { size:'small', index:'03', name:'Hospital Patient Record System',
      desc:'A Java web-based patient record management system handling registration, secure data storage, search and record updates, built to reduce manual errors and improve hospital workflow efficiency.',
      tech:['Java','Web-based'],
      features:['Patient registration','Secure data storage','Search functionality','Record management'],
      github:'https://github.com/Anupamkushwaha8' },
    { size:'small', index:'04', name:'Personal Portfolio Website',
      desc:"A personal portfolio built and deployed on GitHub Pages, showcasing skills, projects and contact information — the site this page evolved from.",
      tech:['HTML','CSS','GitHub Pages'],
      features:['Responsive layout','Project showcase','Contact section'],
      github:'https://github.com/Anupamkushwaha8', demo:'https://anupamkushwaha8.github.io/portfolio' },
  ],
  timeline: [
    {year:'2022', title:'Secondary school (10th)', desc:'Central Public School, Azamgarh, Uttar Pradesh.', tech:'—'},
    {year:'2024', title:'Senior secondary (12th)', desc:'St. Xaviers School, Deoria, Uttar Pradesh.', tech:'—'},
    {year:'Started', title:'B.Tech in Computer Science & Engineering (AI & ML)', desc:'Ambalika Institute of Management and Technology — expected 2028.', tech:'C · Python · DSA basics'},
    {year:'Dec 2025', title:'Certified: Introduction to Prompt Engineering with GitHub Copilot', desc:'Certificate code 9637172.', tech:'GitHub Copilot'},
    {year:'Present', title:'Solving DSA on LeetCode, shipping projects & applying for SDE roles', desc:'3rd-year, actively building and job hunting.', tech:'LeetCode · GitHub'},
  ],
  achievements: [
    {idx:'01', title:'B.Tech CSE (AI & ML)', date:'Expected 2028', desc:'Ambalika Institute of Management and Technology.'},
    {idx:'02', title:'GitHub Copilot — Prompt Engineering', date:'Dec 2025', desc:'Certified, certificate code 9637172.'},
    {idx:'03', title:'Consistent DSA practice', date:'Ongoing', desc:'Working through Data Structures & Algorithms problems on LeetCode.'},
    {idx:'04', title:'Hackathons', date:'Add yours', desc:'Placeholder — add hackathon participation and results here.'},
    {idx:'05', title:'Open Source', date:'Add yours', desc:'Placeholder — add merged PRs or open-source contributions here.'},
  ]
};

document.getElementById('heroName').textContent = DATA.name;
document.getElementById('footerName').textContent = `${DATA.name} © 2026`;
document.querySelector('.about-frame .initials').textContent = DATA.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

const orbitWrapper = document.getElementById('orbitWrapper');
const mobileMenu = document.getElementById('mobileMenu');
const N = DATA.navItems.length;
const radius = 112;
const baseAngles = [];
DATA.navItems.forEach((item, i) => {
  const angle = (360 / N) * i - 90;
  baseAngles.push(angle);
  const el = document.createElement('div');
  el.className = 'orbit-item';
  el.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`;
  el.innerHTML = `<div class="orbit-item-inner"><a href="#${item.id}" class="orbit-link" data-section="${item.id}"><span class="tick"></span>${item.label}</a></div>`;
  orbitWrapper.appendChild(el);

  const mEl = document.createElement('a');
  mEl.href = `#${item.id}`;
  mEl.dataset.section = item.id;
  mEl.textContent = item.label;
  mobileMenu.appendChild(mEl);
});

const skillCats = document.getElementById('skillCats');
DATA.skills.forEach(s => {
  const div = document.createElement('div');
  div.className = 'skill-cat';
  div.innerHTML = `<h4>${s.cat}</h4><ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
  skillCats.appendChild(div);
});


/* ---- Projects rendering (built-in + user-added external projects) ---- */
const PROJECTS_STORAGE_KEY = 'ak_portfolio_user_projects';
const projectGrid = document.getElementById('projectGrid');

function loadUserProjects(){
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveUserProjects(list){
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(list));
}

function renderProjects(){
  const userProjects = loadUserProjects();
  const all = DATA.projects.concat(userProjects);
  projectGrid.innerHTML = '';
  all.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = `project-card ${p.size || 'small'}${p.userAdded ? ' user-added' : ''}`;
    const links = [
      p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : '',
      p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ''
    ].join('');
    const removeBtn = p.userAdded ? `<button type="button" class="remove-project" data-uid="${p.uid}" title="Remove project">✕</button>` : '';
    div.innerHTML = `
      ${removeBtn}
      <div class="project-index">${p.index || String(i+1).padStart(2,'0')}</div>
      <div class="project-body">
        <div class="pname">${p.name}</div>
        <div class="pdesc">${p.desc}</div>
        <div class="tag-row">${p.tech.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="feat-row">${p.features.map(f=>`<span>${f}</span>`).join('')}</div>
        <div class="proj-links">${links}</div>
      </div>`;
    projectGrid.appendChild(div);
  });

  projectGrid.querySelectorAll('.remove-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const uid = btn.dataset.uid;
      const remaining = loadUserProjects().filter(p => p.uid !== uid);
      saveUserProjects(remaining);
      renderProjects();
    });
  });
}
renderProjects();

/* ---- External Project Adder (modal) ---- */
const addProjectBtn = document.getElementById('addProjectBtn');
const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalCancel = document.getElementById('projectModalCancel');
const addProjectForm = document.getElementById('addProjectForm');
const projectFormMsg = document.getElementById('projectFormMsg');

function openProjectModal(){
  projectModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('proj-name').focus();
}
function closeProjectModal(){
  projectModalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  addProjectForm.reset();
  projectFormMsg.className = 'form-msg';
  ['f-proj-name','f-proj-desc'].forEach(id => document.getElementById(id).classList.remove('invalid'));
}

addProjectBtn.addEventListener('click', openProjectModal);
projectModalClose.addEventListener('click', closeProjectModal);
projectModalCancel.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', (e) => { if (e.target === projectModalOverlay) closeProjectModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && projectModalOverlay.classList.contains('open')) closeProjectModal(); });

addProjectForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('proj-name');
  const desc = document.getElementById('proj-desc');
  const tech = document.getElementById('proj-tech').value;
  const features = document.getElementById('proj-features').value;
  const github = document.getElementById('proj-github').value.trim();
  const demo = document.getElementById('proj-demo').value.trim();

  let valid = true;
  function toggle(field, ok){ document.getElementById('f-'+field.id).classList.toggle('invalid', !ok); if (!ok) valid = false; }
  toggle(name, name.value.trim().length > 1);
  toggle(desc, desc.value.trim().length > 3);

  projectFormMsg.className = 'form-msg';
  if (!valid){ projectFormMsg.textContent = 'Please fill in the required fields.'; projectFormMsg.classList.add('error'); return; }

  const userProjects = loadUserProjects();
  const newProject = {
    size: 'small',
    index: 'EX',
    name: name.value.trim(),
    desc: desc.value.trim(),
    tech: tech.split(',').map(s=>s.trim()).filter(Boolean),
    features: features.split(',').map(s=>s.trim()).filter(Boolean),
    github: github || '',
    demo: demo || '',
    userAdded: true,
    uid: 'p' + Date.now()
  };
  if (newProject.tech.length === 0) newProject.tech = ['External'];
  if (newProject.features.length === 0) newProject.features = ['Added externally'];

  userProjects.push(newProject);
  saveUserProjects(userProjects);
  renderProjects();

  projectFormMsg.classList.add('success');
  projectFormMsg.textContent = 'Project added!';
  setTimeout(closeProjectModal, 700);
});

const timelineEl = document.getElementById('timeline');
DATA.timeline.forEach(t => {
  const div = document.createElement('div');
  div.className = 't-item';
  div.innerHTML = `<div class="year">${t.year}</div><h4>${t.title}</h4><p>${t.desc}</p><div class="tag-row"><span class="tag">${t.tech}</span></div>`;
  timelineEl.appendChild(div);
});

const achGrid = document.getElementById('achGrid');
DATA.achievements.forEach(a => {
  const div = document.createElement('div');
  div.className = 'ach-card';
  div.innerHTML = `<div class="idx">${a.idx}</div><h4>${a.title}</h4><div class="date">${a.date}</div><p>${a.desc}</p>`;
  achGrid.appendChild(div);
});

const contribGraph = document.getElementById('contribGraph');
for (let i=0;i<7*26;i++){
  const c = document.createElement('div');
  c.className = 'cell';
  if (Math.random() > .88) c.style.background = 'var(--mustard)';
  contribGraph.appendChild(c);
}

const navbar = document.getElementById('navbar');
function updateNavbarState(){ navbar.classList.toggle('scrolled', window.scrollY > 40); }
updateNavbarState();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const orbitProgressFill = document.getElementById('orbitProgressFill');
const RING_CIRC = 2 * Math.PI * 128;
const LAPS = 2.2;

let current = 0;
let targetR = 0;

function scrollProgress(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
}

function onScroll(){
  const p = scrollProgress();
  targetR = p * 360 * LAPS;
  orbitProgressFill.style.strokeDashoffset = (RING_CIRC * (1 - p)).toFixed(1);
  updateNavbarState();
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

function tick(){
  if (!reduceMotion){
    current += (targetR - current) * 0.08;
    orbitWrapper.style.setProperty('--r', current.toFixed(3));
  } else {
    orbitWrapper.style.setProperty('--r', targetR.toFixed(3));
  }
  requestAnimationFrame(tick);
}
tick();

const sectionIds = DATA.navItems.map(i=>i.id);
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const orbitLinks = [...document.querySelectorAll('.orbit-link')];
const mobileLinks = [...document.querySelectorAll('.mobile-menu a')];

function setActive(id){
  orbitLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
  mobileLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
}

const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if (entry.isIntersecting) setActive(entry.target.id); });
}, {rootMargin:'-40% 0px -50% 0px', threshold:0});
sections.forEach(s=>io.observe(s));

const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', ()=>{
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add('in'); revealIo.unobserve(e.target); } });
}, {threshold:0.15});
revealItems.forEach(el=>revealIo.observe(el));


document.getElementById('themeToggle').addEventListener('click', function(){
  this.textContent = this.textContent === '◐' ? '◑' : '◐';
});

const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;
  function toggle(field, ok){ document.getElementById('f-'+field.id).classList.toggle('invalid', !ok); if (!ok) valid = false; }
  toggle(name, name.value.trim().length > 1);
  toggle(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
  toggle(message, message.value.trim().length > 5);

  formMsg.className = 'form-msg';
  if (!valid){ formMsg.textContent = 'Please fix the highlighted fields.'; formMsg.classList.add('error'); return; }

  const btn = form.querySelector('.submit-btn');
  btn.classList.add('loading'); btn.disabled = true;
  setTimeout(()=>{
    btn.classList.remove('loading'); btn.disabled = false;
    formMsg.classList.add('success');
    formMsg.textContent = `Thanks — message received. I'll get back to you soon.`;
    form.reset();
  }, 1100);
});
