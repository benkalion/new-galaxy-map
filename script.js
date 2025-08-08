const systems = [
  { name: 'Coruscant', x: 950, y: 980, region: 'core' },
  { name: 'Alderaan', x: 900, y: 940, region: 'core' },
  { name: 'Corellia', x: 930, y: 1000, region: 'core' },
  { name: 'Naboo', x: 1100, y: 1200, region: 'midrim' },
  { name: 'Endor', x: 1300, y: 900, region: 'midrim' },
  { name: 'Bespin', x: 1250, y: 800, region: 'midrim' },
  { name: 'Hoth', x: 1400, y: 700, region: 'outer' },
  { name: 'Dagobah', x: 1200, y: 1100, region: 'midrim' },
  { name: 'Tatooine', x: 1500, y: 1300, region: 'outer' },
  { name: 'Geonosis', x: 1450, y: 1250, region: 'outer' },
  { name: 'Mustafar', x: 1420, y: 1180, region: 'outer' },
  { name: 'Kamino', x: 1600, y: 1200, region: 'outer' },
  { name: 'Jakku', x: 1700, y: 800, region: 'outer' },
  { name: 'Lothal', x: 1350, y: 1150, region: 'midrim' },
  { name: 'Mandalore', x: 1200, y: 950, region: 'midrim' },
  { name: 'Yavin', x: 1000, y: 850, region: 'midrim' },
  { name: 'Kashyyyk', x: 1250, y: 1250, region: 'midrim' },
  { name: 'Ryloth', x: 1400, y: 1350, region: 'outer' },
  { name: 'Mon Cala', x: 1150, y: 1300, region: 'midrim' },
  { name: 'Dantooine', x: 1050, y: 1050, region: 'midrim' }
];

const map = document.getElementById('map');
const mapContent = document.getElementById('mapContent');

// Generate star field background
function generateStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    star.className = 'star';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.opacity = Math.random();
    star.style.left = `${Math.random() * 2000}px`;
    star.style.top = `${Math.random() * 2000}px`;
    mapContent.appendChild(star);
  }
}

generateStars(800);

// Populate systems
systems.forEach(sys => {
  const el = document.createElement('div');
  el.className = `system ${sys.region}`;
  el.style.left = `${sys.x}px`;
  el.style.top = `${sys.y}px`;
  el.innerHTML = `<span class="dot"></span><span class="label">${sys.name}</span>`;
  el.title = sys.name;
  mapContent.appendChild(el);
});

// Pan and zoom logic
let isPanning = false;
let startX = 0, startY = 0;
let translateX = -900, translateY = -900; // initial center
let scale = 0.5;

function updateTransform() {
  mapContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

updateTransform();

map.addEventListener('mousedown', e => {
  isPanning = true;
  startX = e.clientX;
  startY = e.clientY;
});

map.addEventListener('mousemove', e => {
  if (!isPanning) return;
  translateX += e.clientX - startX;
  translateY += e.clientY - startY;
  startX = e.clientX;
  startY = e.clientY;
  updateTransform();
});

map.addEventListener('mouseup', () => {
  isPanning = false;
});

map.addEventListener('mouseleave', () => {
  isPanning = false;
});

map.addEventListener('wheel', e => {
  e.preventDefault();
  const scaleAmount = -e.deltaY * 0.001;
  const newScale = Math.min(5, Math.max(0.1, scale + scaleAmount));
  scale = newScale;
  updateTransform();
});

// Touch support
map.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    isPanning = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }
});

map.addEventListener('touchmove', e => {
  if (!isPanning || e.touches.length !== 1) return;
  translateX += e.touches[0].clientX - startX;
  translateY += e.touches[0].clientY - startY;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  updateTransform();
});

map.addEventListener('touchend', () => {
  isPanning = false;
});
