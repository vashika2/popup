// ================================================================
// THEMES
// Each occasion has its own colours, page background, and confetti.
// To add a new occasion, just add a new entry to this object.
// ================================================================
const themes = {

  birthday: {
    titleText:   name => `Happy Birthday, ${name}! 🎂`,
    cardImage:   'assets/design.png',   // your Canva birthday design
    cardBorder:  '#2d1b69',
    titleColor:  '#3b1f8c',
    ribbonBg:    'rgba(45, 27, 105, 0.83)',
    pageBg:      '#2d1b69',
    confetti:    ['#f472b6', '#c084fc', '#fbbf24', '#f9a8d4', '#ffffff']
  },

  congrats: {
    titleText:   name => `Congratulations, ${name}! 🏆`,
    cardImage:   'assets/design.png',   // swap for a congrats design if you make one
    cardBorder:  '#713f12',
    titleColor:  '#713f12',
    ribbonBg:    'rgba(113, 63, 18, 0.83)',
    pageBg:      '#451a03',
    confetti:    ['#fbbf24', '#f59e0b', '#fde68a', '#6ee7b7', '#ffffff']
  },

  love: {
    titleText:   name => `This is for you, ${name} 💖`,
    cardImage:   'assets/design.png',
    cardBorder:  '#881337',
    titleColor:  '#881337',
    ribbonBg:    'rgba(136, 19, 55, 0.83)',
    pageBg:      '#4c0519',
    confetti:    ['#fb7185', '#f43f5e', '#fda4af', '#fecdd3', '#ffffff']
  },

  thankyou: {
    titleText:   name => `Thank you so much, ${name}! 🌸`,
    cardImage:   'assets/design.png',
    cardBorder:  '#14532d',
    titleColor:  '#14532d',
    ribbonBg:    'rgba(20, 83, 45, 0.83)',
    pageBg:      '#052e16',
    confetti:    ['#4ade80', '#86efac', '#fbbf24', '#6ee7b7', '#ffffff']
  },

  goodluck: {
    titleText:   name => `You've got this, ${name}! 🍀`,
    cardImage:   'assets/design.png',
    cardBorder:  '#064e3b',
    titleColor:  '#064e3b',
    ribbonBg:    'rgba(6, 78, 59, 0.83)',
    pageBg:      '#022c22',
    confetti:    ['#34d399', '#6ee7b7', '#a78bfa', '#fbbf24', '#ffffff']
  },

  welcome: {
    titleText:   name => `Welcome, ${name}! 🎉`,
    cardImage:   'assets/design.png',
    cardBorder:  '#1e3a8a',
    titleColor:  '#1e3a8a',
    ribbonBg:    'rgba(30, 58, 138, 0.83)',
    pageBg:      '#172554',
    confetti:    ['#60a5fa', '#3b82f6', '#fbbf24', '#f472b6', '#ffffff']
  }

};

// ================================================================
// READ URL PARAMETERS
// These come from the link you send, e.g.:
// index.html?name=Priya&occasion=birthday&msg=Have+an+amazing+day!
// ================================================================
const params   = new URLSearchParams(window.location.search);
const name     = params.get('name')     || 'youu';
const occasion = params.get('occasion') || 'birthday';
const message  = params.get('msg')      || 'loveee youu mwahh 💖';

// ================================================================
// PICK THEME
// Falls back to birthday if the occasion in the URL doesn't match
// any key in the themes object above.
// ================================================================
const theme = themes[occasion] || themes['birthday'];

// ================================================================
// APPLY THEME TO THE PAGE
// ================================================================

// Page background colour
document.body.style.background = theme.pageBg;

// Card: set the background image and border colour
const card = document.getElementById('card');
card.style.backgroundImage = `url('${theme.cardImage}')`;
card.style.borderColor     = theme.cardBorder;

// Title text and colour
const titleEl = document.getElementById('title');
titleEl.textContent   = theme.titleText(name);
titleEl.style.color   = theme.titleColor;

// Message ribbon text and background colour
const ribbonEl = document.getElementById('message-ribbon');
ribbonEl.textContent       = message;
ribbonEl.style.background  = theme.ribbonBg;

// ================================================================
// CONFETTI ANIMATION
// Pieces fall from the top and loop back when they go off-screen.
// ================================================================
const canvas = document.getElementById('confetti-canvas');
const ctx    = canvas.getContext('2d');

// Make canvas fill the whole window, and resize if window changes
function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create confetti pieces with random properties
const pieces = [];
const count  = 90; // number of pieces — increase for more confetti

for (let i = 0; i < count; i++) {
  pieces.push({
    x:          Math.random() * window.innerWidth,
    y:          Math.random() * -window.innerHeight, // start above screen
    radius:     Math.random() * 7 + 3,               // size between 3–10px
    color:      theme.confetti[Math.floor(Math.random() * theme.confetti.length)],
    speed:      Math.random() * 2.5 + 1,             // fall speed
    tiltAngle:  Math.random() * Math.PI * 2,         // starting rotation
    tiltSpeed:  Math.random() * 0.08 + 0.02,         // rotation speed
    isCircle:   Math.random() > 0.5                  // circle or rectangle
  });
}

// Draw loop — runs every frame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of pieces) {

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.tiltAngle);
    ctx.globalAlpha = 0.78;
    ctx.fillStyle   = p.color;

    if (p.isCircle) {
      // Draw a circle
      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Draw a small rectangle (looks like a ribbon piece)
      ctx.fillRect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
    }

    ctx.restore();

    // Move the piece down and spin it
    p.y          += p.speed;
    p.tiltAngle  += p.tiltSpeed;

    // When it falls off the bottom, reset it to the top
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  }

  // Keep looping
  requestAnimationFrame(draw);
}

draw();