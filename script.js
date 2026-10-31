const LOCS = [
  { name: "Kitchen", icon: "🍳", flow: 6, moist: 22 },
  { name: "Bathroom", icon: "🚿", flow: 8, moist: 35 },
  { name: "Utility Room", icon: "🧺", flow: 4, moist: 20 },
  { name: "Water Tank", icon: "🛢️", flow: 3, moist: 18 },
  { name: "Main Pipeline", icon: "🔧", flow: 0, moist: 15 }
];
const rnd = (a, b) => a + Math.random() * (b - a);
const $ = id => document.getElementById(id);

let leakIdx = null, leakExtra = 0, usage = 1250, saved = 0, wasted = 0;
let history = Array.from({ length: 14 }, () => ({ v: rnd(19, 24), bad: false }));
let readings = [];

function sense() {
  // Simulated sensor readings for each location
  readings = LOCS.slice(0, 4).map((l, i) => {
    const leaking = i === leakIdx;
    return {
      flow: l.flow * rnd(0.85, 1.15) + (leaking ? leakExtra : 0),
      moist: leaking ? rnd(82, 95) : l.moist * rnd(0.9, 1.1)
    };
  });
  const total = readings.reduce((s, r) => s + r.flow, 0);
  readings.push({ flow: total, moist: leakIdx !== null ? rnd(40, 55) : rnd(13, 18) });
}

function detect(r, i) {
  // Threshold-based leak detection
  if (i === 4) return leakIdx !== null ? "High Flow" : "Normal";
  return (r.moist > 70 || r.flow > LOCS[i].flow * 2) ? "Leak" : "Normal";
}

function update() {
  sense();
  const total = readings[4].flow;
  usage += total;                     // each tick simulates 1 minute
  if (leakIdx !== null) wasted += leakExtra;
  history.push({ v: total, bad: leakIdx !== null });
  history.shift();
  render(total);
}

function render(total) {
  $("cFlow").textContent = total.toFixed(1) + " L/min";
  $("cUsage").textContent = Math.round(usage) + " L";
  $("cSaved").textContent = Math.round(saved) + " L";
  $("cWasted").textContent = leakIdx !== null ? "Wasted by leak: " + Math.round(wasted) + " L" : "Early detection saves water";
  const leak = leakIdx !== null;
  $("cStatus").textContent = leak ? "⚠ Leakage Detected" : "✔ No Leakage";
  $("statusCard").className = "card " + (leak ? "leak" : "ok");

  const box = $("alertBox");
  box.classList.toggle("hidden", !leak);
  if (leak) box.textContent = `⚠ ALERT: Leakage detected in ${LOCS[leakIdx].name}! Abnormal flow and high moisture found. Water wasted so far: ${Math.round(wasted)} L. Please close the valve and inspect the pipe.`;

  $("locations").innerHTML = LOCS.map((l, i) => {
    const s = detect(readings[i], i);
    const cls = s === "Leak" ? "b-bad" : s === "High Flow" ? "b-warn" : "b-ok";
    const label = s === "Leak" ? "⚠ Leakage" : s === "High Flow" ? "⚠ High Flow" : "✔ Normal";
    return `<div class="loc ${s === "Leak" ? "leak" : ""}">
      <h3>${l.icon} ${l.name}</h3>
      <p>Flow: <b>${readings[i].flow.toFixed(1)} L/min</b></p>
      <p>Moisture: <b>${readings[i].moist.toFixed(0)}%</b></p>
      <p>Status: <span class="badge ${cls}">${label}</span></p></div>`;
  }).join("");
  drawChart();
}

function drawChart() {
  const c = $("chart"), g = c.getContext("2d"), W = c.width, H = c.height;
  const pad = 40, max = 70;
  g.clearRect(0, 0, W, H);
  g.font = "12px Segoe UI"; g.fillStyle = "#667"; g.strokeStyle = "#dde5ee";
  for (let y = 0; y <= max; y += 10) {
    const py = H - pad - (y / max) * (H - 2 * pad);
    g.beginPath(); g.moveTo(pad, py); g.lineTo(W - 10, py); g.stroke();
    g.fillText(y, 10, py + 4);
  }
  const step = (W - pad - 20) / (history.length - 1);
  const pts = history.map((h, i) => [pad + i * step, H - pad - (Math.min(h.v, max) / max) * (H - 2 * pad)]);
  g.beginPath(); g.moveTo(pts[0][0], H - pad);
  pts.forEach(p => g.lineTo(p[0], p[1])); g.lineTo(pts.at(-1)[0], H - pad);
  g.fillStyle = "rgba(11,114,185,.15)"; g.fill();
  g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]));
  g.strokeStyle = "#0b72b9"; g.lineWidth = 3; g.stroke();
  pts.forEach((p, i) => {
    g.beginPath(); g.arc(p[0], p[1], 5, 0, 7);
    g.fillStyle = history[i].bad ? "#d93025" : "#0b72b9"; g.fill();
  });
  g.fillStyle = "#667"; g.fillText("Time (last readings) →", W / 2 - 50, H - 10);
  g.save(); g.translate(14, H / 2 + 30); g.rotate(-Math.PI / 2); g.fillText("Flow (L/min)", 0, 0); g.restore();
}

function normal() {
  if (leakIdx !== null) saved += leakExtra * 30; // est. 30 min of waste avoided by early detection
  leakIdx = null; leakExtra = 0; update();
}
function leak() {
  leakIdx = Math.floor(Math.random() * 4);
  leakExtra = rnd(25, 35); update();
}
function reset() {
  leakIdx = null; leakExtra = 0; usage = 1250; saved = 0; wasted = 0;
  history = Array.from({ length: 14 }, () => ({ v: rnd(19, 24), bad: false }));
  update();
}

$("btnNormal").onclick = normal;
$("btnLeak").onclick = leak;
$("btnReset").onclick = reset;
update();
setInterval(update, 2000);
