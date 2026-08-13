/* ============================================================
   ANA LUIZA FAVATO: HUB ESTRATEGICO
   Logica compartilhada: sincronizacao (Firebase/local) + telas.
   Este arquivo e usado por todas as paginas do site.
   ============================================================ */

/* ---------- 1) Configuracao do Firebase ----------
   Enquanto isto nao for preenchido, o site funciona 100% no
   navegador de cada pessoa (modo local). Veja o GUIA-DE-PUBLICACAO.md
   para os passos de como criar o projeto Firebase e colar as chaves aqui. */
const firebaseConfig = {
  apiKey: "COLE_AQUI_SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

const DOC_COLLECTION = "dashboards";
const DOC_ID = "ana-luiza-favato";
const LOCAL_KEY = "alf-hub-state-v3";

/* ---------- 2) Nucleo de sincronizacao (Hub) ---------- */
const Hub = (() => {
  let state = null;
  let listeners = [];
  let db = null;
  let fsMod = null;
  let docRef = null;
  let saveTimer = null;
  let isOnline = false;

  function defaultState() {
    const cards = {};
    const cardOrder = { todo: [], doing: [], done: [] };
    DATA.kanbanSeed.forEach((c) => {
      cards[c.id] = { titulo: c.titulo, area: c.area, owner: c.owner, prazo: c.prazo, obs: c.obs };
      if (!cardOrder[c.col]) cardOrder[c.col] = [];
      cardOrder[c.col].push(c.id);
    });
    const content = {};
    DATA.contentSeed.forEach((c) => { content[c.id] = { status: c.status, link: c.link || "" }; });
    const calendar = {};
    Object.keys(DATA.calendarSeed).forEach((k) => { calendar[k] = { ...DATA.calendarSeed[k] }; });
    return { cards, cardOrder, roadmap: {}, answers: {}, calendar, content };
  }

  function normalize(s) {
    const base = defaultState();
    if (!s || typeof s !== "object") return base;
    let content = s.content && Object.keys(s.content).length ? s.content : base.content;
    // migra de um formato antigo (string simples) para {status, link}
    Object.keys(content).forEach((k) => {
      if (typeof content[k] === "string") content[k] = { status: content[k], link: "" };
    });
    return {
      cards: s.cards && Object.keys(s.cards).length ? s.cards : base.cards,
      cardOrder: s.cardOrder && (s.cardOrder.todo || s.cardOrder.doing || s.cardOrder.done)
        ? { todo: s.cardOrder.todo || [], doing: s.cardOrder.doing || [], done: s.cardOrder.done || [] }
        : base.cardOrder,
      roadmap: s.roadmap || {},
      answers: s.answers || {},
      calendar: s.calendar && Object.keys(s.calendar).length ? s.calendar : base.calendar,
      content: content,
    };
  }

  function emit() {
    listeners.forEach((fn) => { try { fn(state); } catch (e) { console.error(e); } });
  }

  function loadLocal() {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveLocal() {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function setSyncPill(mode) {
    document.querySelectorAll(".sync-pill").forEach((p) => {
      p.classList.remove("online", "local");
      p.classList.add(mode);
      const txt = p.querySelector(".sync-text");
      if (txt) txt.textContent = mode === "online" ? "Sincronizado" : "Modo local";
    });
    document.querySelectorAll(".local-banner").forEach((b) => {
      b.classList.toggle("show", mode !== "online");
    });
  }

  async function initFirebase() {
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey.indexOf("COLE_AQUI") === 0) {
      return;
    }
    try {
      const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
      fsMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
      const app = appMod.initializeApp(firebaseConfig);
      db = fsMod.getFirestore(app);
      docRef = fsMod.doc(db, DOC_COLLECTION, DOC_ID);
      fsMod.onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists()) {
            state = normalize(snap.data());
            saveLocal();
          } else {
            state = normalize(loadLocal());
            fsMod.setDoc(docRef, state);
          }
          isOnline = true;
          setSyncPill("online");
          emit();
        },
        (err) => {
          console.warn("Firestore indisponivel, usando modo local:", err);
          isOnline = false;
          setSyncPill("local");
        }
      );
    } catch (e) {
      console.warn("Firebase nao carregou, usando modo local:", e);
      isOnline = false;
      setSyncPill("local");
    }
  }

  function init() {
    state = normalize(loadLocal());
    setSyncPill("local");
    emit();
    initFirebase();
  }

  function persist() {
    saveLocal();
    if (isOnline && docRef && fsMod) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        fsMod.setDoc(docRef, state).catch((e) => console.warn("Falha ao sincronizar:", e));
      }, 300);
    }
  }

  function update(mutator) {
    mutator(state);
    persist();
    emit();
  }

  function onChange(fn) {
    listeners.push(fn);
    if (state) fn(state);
  }

  function getState() { return state; }

  return { init, onChange, update, getState };
})();

function hubSetActiveNav(page) {
  document.querySelectorAll(".topnav a[data-nav]").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === page);
  });
}

/* ---------- 3) Helpers ---------- */
function hubNewId(prefix) {
  return prefix + "-" + Math.random().toString(36).slice(2, 9);
}
function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}
function formatDateBR(iso) {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}`;
}
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function hubConfirm(message, onYes) {
  let backdrop = document.getElementById("hub-modal-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "hub-modal-backdrop";
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `<div class="modal">
        <h4 id="hub-modal-msg"></h4>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn-mini" id="hub-modal-cancel">Cancelar</button>
          <button class="btn-mini primary" id="hub-modal-ok">Excluir</button>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
  }
  backdrop.querySelector("#hub-modal-msg").textContent = message;
  backdrop.classList.add("show");
  const okBtn = backdrop.querySelector("#hub-modal-ok");
  const cancelBtn = backdrop.querySelector("#hub-modal-cancel");
  const cleanup = () => { backdrop.classList.remove("show"); okBtn.onclick = null; cancelBtn.onclick = null; backdrop.onclick = null; };
  okBtn.onclick = () => { cleanup(); onYes(); };
  cancelBtn.onclick = cleanup;
  backdrop.onclick = (e) => { if (e.target === backdrop) cleanup(); };
}

/* ---------- 4) Pilares (estatica, com exemplos no pilar 1) ---------- */
function renderPillars(el) {
  el.innerHTML = DATA.pilares.map((p) => `
    <div class="gcard">
      <div class="gcard-head">
        <div class="num-badge">${String(p.num).padStart(2, "0")}</div>
      </div>
      <h3>${escapeHtml(p.titulo)}</h3>
      <div class="sub">${escapeHtml(p.sub)}</div>
      <p>${escapeHtml(p.desc)}</p>
      <div class="gcard-foot">
        <div class="tag-row">${p.formatos.map((f) => `<span class="tag">${escapeHtml(f)}</span>`).join("")}</div>
      </div>
      ${p.exemplos ? `
        <div class="pilar-exemplos">
          ${p.exemplos.map((ex) => `<div class="pilar-exemplo"><b>${escapeHtml(ex.t)}</b><p>${escapeHtml(ex.d)}</p></div>`).join("")}
        </div>` : ""}
    </div>`).join("");
}

/* ---------- 5) Fases (accordion estatico) ---------- */
function renderFases(el) {
  el.innerHTML = DATA.fases.map((f) => `
    <div class="fase-card">
      <div class="fase-head">
        <div class="fase-badge">${f.n}</div>
        <div class="fase-title"><b>${escapeHtml(f.titulo)}</b><span>${escapeHtml(f.resumo)}</span></div>
        <div class="fase-chevron">▾</div>
      </div>
      <div class="fase-body">
        <div class="fase-points">
          ${f.pontos.map((p) => `<div class="fase-point"><b>${escapeHtml(p.t)}</b><p>${escapeHtml(p.d)}</p></div>`).join("")}
        </div>
      </div>
    </div>`).join("");
  wireAccordion(el, ".fase-card", ".fase-head", ".fase-body");
}

function wireAccordion(el, cardSel, headSel, bodySel) {
  el.querySelectorAll(cardSel).forEach((card) => {
    card.querySelector(headSel).addEventListener("click", () => {
      const body = card.querySelector(bodySel);
      const isOpen = card.classList.contains("open");
      if (isOpen) {
        body.style.maxHeight = null;
        card.classList.remove("open");
      } else {
        card.classList.add("open");
        body.style.maxHeight = body.scrollHeight + 40 + "px";
      }
    });
  });
}

/* ---------- 6) Cronograma de lancamento (tabs + checklist) ---------- */
let roadmapActiveMonth = "m1";
function renderRoadmap(el, state) {
  const tabsHtml = DATA.meses.map((m) => `
    <button class="tab-btn ${m.id === roadmapActiveMonth ? "active" : ""}" data-tab="${m.id}">
      ${m.titulo}
      <span class="tab-status ${m.statusLabel === "Mês atual" ? "current" : ""}">${escapeHtml(m.statusLabel || "")}</span>
    </button>`).join("");
  const panelsHtml = DATA.meses.map((m) => {
    const total = m.itens.length;
    const doneCount = m.itens.filter((_, i) => state.roadmap[`${m.id}-${i}`]).length;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;
    const itemsHtml = m.itens.map((txt, i) => {
      const key = `${m.id}-${i}`;
      const checked = !!state.roadmap[key];
      return `
        <div class="check-item ${checked ? "checked" : ""}">
          <input type="checkbox" id="rm-${key}" data-roadmap-key="${key}" ${checked ? "checked" : ""}>
          <label for="rm-${key}">${escapeHtml(txt)}</label>
        </div>`;
    }).join("");
    return `
      <div class="tab-panel ${m.id === roadmapActiveMonth ? "active" : ""}" data-panel="${m.id}">
        <div class="month-head"><b>${escapeHtml(m.titulo)}</b><span>${escapeHtml(m.sub)}</span></div>
        <div class="checklist">${itemsHtml}</div>
        <div class="progress-wrap">
          <div class="progress-track"><span style="width:${pct}%"></span></div>
          <div class="progress-label">${doneCount}/${total} concluídos · ${pct}%</div>
        </div>
      </div>`;
  }).join("");
  el.innerHTML = `<div class="tabs">${tabsHtml}</div>${panelsHtml}`;
  el.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      roadmapActiveMonth = btn.dataset.tab;
      renderRoadmap(el, Hub.getState());
    });
  });
  el.querySelectorAll("[data-roadmap-key]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const key = cb.dataset.roadmapKey;
      Hub.update((s) => { s.roadmap[key] = cb.checked; });
    });
  });
}

/* ---------- 7) Quadro de entregas (kanban) ---------- */
function renderBoard(el, state) {
  const cols = [
    { key: "todo", label: "A Fazer" },
    { key: "doing", label: "Atualizar" },
    { key: "done", label: "Concluído" },
  ];
  const legend = Object.keys(DATA.areas).map((a) => {
    const c = DATA.areas[a];
    return `<span class="legend-chip"><span class="legend-dot" style="background:${c.color}"></span>${escapeHtml(a)}</span>`;
  }).join("");
  el.innerHTML = `
    <div class="board-toolbar">
      <div class="board-legend">${legend}</div>
    </div>
    <div class="board">${cols.map((c) => renderBoardCol(c, state)).join("")}</div>`;
  wireBoard(el);
}

function renderBoardCol(col, state) {
  const ids = state.cardOrder[col.key] || [];
  const cardsHtml = ids.map((id) => {
    const c = state.cards[id];
    if (!c) return "";
    const areaColor = DATA.areas[c.area] || { color: "var(--ink-soft)", bg: "var(--line-soft)" };
    return `
      <div class="kcard" draggable="true" data-id="${id}">
        <div class="kcard-title">${escapeHtml(c.titulo)}</div>
        ${c.obs ? `<div class="kcard-obs">${escapeHtml(c.obs)}</div>` : ""}
        <div class="kcard-meta">
          <span class="kcard-tag" style="color:${areaColor.color};background:${areaColor.bg}">${escapeHtml(c.area || "")}</span>
          <span class="kcard-owner">${escapeHtml(c.owner || "")}</span>
        </div>
        ${c.prazo ? `<div class="kcard-date">Prazo · ${formatDateBR(c.prazo)}</div>` : ""}
        <div class="kcard-actions">
          <button type="button" data-action="edit" data-id="${id}">Editar</button>
          <button type="button" data-action="delete" data-id="${id}">Excluir</button>
        </div>
      </div>`;
  }).join("");
  return `
    <div class="board-col">
      <div class="board-col-head"><b>${col.label}</b><span class="col-count">${ids.length}</span></div>
      <div class="card-list" data-col="${col.key}">${cardsHtml}</div>
      <button type="button" class="add-card-btn" data-add="${col.key}">+ Nova entrega</button>
    </div>`;
}

function wireBoard(el) {
  el.querySelectorAll(".kcard").forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.dataset.id);
      setTimeout(() => card.classList.add("dragging"), 0);
    });
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
  });
  el.querySelectorAll(".card-list").forEach((list) => {
    list.addEventListener("dragover", (e) => { e.preventDefault(); list.classList.add("col-drop-hint"); });
    list.addEventListener("dragleave", () => list.classList.remove("col-drop-hint"));
    list.addEventListener("drop", (e) => {
      e.preventDefault();
      list.classList.remove("col-drop-hint");
      const id = e.dataTransfer.getData("text/plain");
      const targetCol = list.dataset.col;
      if (!id) return;
      Hub.update((s) => {
        Object.keys(s.cardOrder).forEach((k) => { s.cardOrder[k] = s.cardOrder[k].filter((x) => x !== id); });
        s.cardOrder[targetCol].push(id);
      });
    });
  });
  el.querySelectorAll("[data-action='delete']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      hubConfirm("Excluir esta entrega do quadro?", () => {
        Hub.update((s) => {
          delete s.cards[id];
          Object.keys(s.cardOrder).forEach((k) => { s.cardOrder[k] = s.cardOrder[k].filter((x) => x !== id); });
        });
      });
    });
  });
  el.querySelectorAll("[data-action='edit']").forEach((btn) => {
    btn.addEventListener("click", () => openCardForm(el, btn.dataset.id, null));
  });
  el.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => openCardForm(el, null, btn.dataset.add));
  });
}

function openCardForm(el, id, colForNew) {
  const state = Hub.getState();
  const existing = id ? state.cards[id] : null;
  const existingForm = el.querySelector(".new-card-form");
  if (existingForm) existingForm.remove();
  el.querySelectorAll(".kcard[style]").forEach((c) => { c.style.display = ""; });

  const areaOptions = Object.keys(DATA.areas).map((a) => `<option value="${a}" ${existing && existing.area === a ? "selected" : ""}>${a}</option>`).join("");
  const formHtml = `
    <div class="new-card-form">
      <input type="text" placeholder="Título da entrega" data-f="titulo" value="${escapeHtml(existing ? existing.titulo : "")}">
      <textarea placeholder="Observação (opcional)" data-f="obs">${escapeHtml(existing ? existing.obs || "" : "")}</textarea>
      <div class="row">
        <select data-f="area"><option value="">Área</option>${areaOptions}</select>
        <input type="text" placeholder="Responsável" data-f="owner" value="${escapeHtml(existing ? existing.owner || "" : "")}">
        <input type="date" data-f="prazo" value="${existing ? existing.prazo || "" : ""}">
      </div>
      <div class="row-actions">
        <button type="button" class="btn-mini" data-cancel-form>Cancelar</button>
        <button type="button" class="btn-mini primary" data-save-form>Salvar</button>
      </div>
    </div>`;

  let cardEl = null;
  if (id) {
    cardEl = el.querySelector(`.kcard[data-id="${id}"]`);
    cardEl.insertAdjacentHTML("afterend", formHtml);
    cardEl.style.display = "none";
  } else {
    const list = el.querySelector(`.card-list[data-col="${colForNew}"]`);
    list.insertAdjacentHTML("beforeend", formHtml);
  }
  const form = el.querySelector(".new-card-form");
  form.querySelector("[data-cancel-form]").addEventListener("click", () => {
    form.remove();
    if (cardEl) cardEl.style.display = "";
  });
  form.querySelector("[data-save-form]").addEventListener("click", () => {
    const titulo = form.querySelector("[data-f=titulo]").value.trim();
    if (!titulo) return;
    const area = form.querySelector("[data-f=area]").value;
    const owner = form.querySelector("[data-f=owner]").value.trim();
    const prazo = form.querySelector("[data-f=prazo]").value;
    const obs = form.querySelector("[data-f=obs]").value.trim();
    Hub.update((s) => {
      if (id) {
        s.cards[id] = { ...s.cards[id], titulo, area, owner, prazo, obs };
      } else {
        const newId = hubNewId("c");
        s.cards[newId] = { titulo, area, owner, prazo, obs };
        s.cardOrder[colForNew].push(newId);
      }
    });
  });
}

/* ---------- 8) Equipe ---------- */
let equipeOpenKey = null;
function renderEquipe(el, state) {
  const cardsHtml = DATA.equipe.map((m) => `
    <div class="equipe-card" data-key="${m.key}">
      <div class="equipe-avatar">${m.iniciais}</div>
      <b class="nome">${escapeHtml(m.nome)}</b>
      <span class="papel">${escapeHtml(m.papel)}</span>
      <p class="resumo">${escapeHtml(m.resumo)}</p>
      <span class="clique">Ver funções e entregas →</span>
    </div>`).join("");
  el.innerHTML = `<div class="equipe-grid">${cardsHtml}</div><div class="equipe-detail" id="equipe-detail"></div>`;
  el.querySelectorAll(".equipe-card").forEach((card) => {
    card.addEventListener("click", () => {
      equipeOpenKey = equipeOpenKey === card.dataset.key ? null : card.dataset.key;
      renderEquipeDetail(el);
      if (equipeOpenKey) el.querySelector("#equipe-detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
  renderEquipeDetail(el);
}

function renderEquipeDetail(el) {
  const state = Hub.getState();
  const wrap = el.querySelector("#equipe-detail");
  if (!equipeOpenKey) { wrap.classList.remove("open"); wrap.innerHTML = ""; return; }
  const m = DATA.equipe.find((x) => x.key === equipeOpenKey);
  if (!m) return;
  const colLabel = { todo: "A Fazer", doing: "Atualizar", done: "Concluído" };
  const related = [];
  Object.keys(state.cardOrder).forEach((col) => {
    state.cardOrder[col].forEach((id) => {
      const c = state.cards[id];
      if (!c) return;
      const owner = (c.owner || "").toLowerCase();
      const matches = owner === "todos" || m.ownerMatch.some((k) => owner.includes(k.toLowerCase()));
      if (matches) related.push({ ...c, id, col });
    });
  });
  const entregasHtml = related.length
    ? related.map((c) => `<div class="func-item"><span class="dot"></span><div><b>${escapeHtml(c.titulo)}</b> (${colLabel[c.col]}${c.prazo ? `, prazo ${formatDateBR(c.prazo)}` : ""})</div></div>`).join("")
    : `<p style="font-size:12.5px;color:var(--muted)">Nenhuma entrega associada no momento.</p>`;
  wrap.classList.add("open");
  wrap.innerHTML = `
    <div class="equipe-detail-inner">
      <div class="equipe-detail-head">
        <div class="equipe-avatar">${m.iniciais}</div>
        <div><b class="nome" style="font-size:16px;font-family:'Poppins',sans-serif;display:block">${escapeHtml(m.nome)}</b><span class="papel">${escapeHtml(m.papel)}</span></div>
      </div>
      <div class="func-list">${m.funcoes.map((f) => `<div class="func-item"><span class="dot"></span><div>${escapeHtml(f)}</div></div>`).join("")}</div>
      <div class="entregas-sub">Entregas relacionadas</div>
      <div class="func-list">${entregasHtml}</div>
      <span class="close-detail" id="equipe-close">Fechar ✕</span>
    </div>`;
  el.querySelector("#equipe-close").addEventListener("click", () => { equipeOpenKey = null; renderEquipeDetail(el); });
}

/* ---------- 9) Calendario (tabs por mes, com destaque de hoje) ---------- */
const DOW = ["D", "S", "T", "Q", "Q", "S", "S"];
let calendarActiveMonth = null;
function renderCalendar(el, state) {
  if (!calendarActiveMonth) {
    const today = new Date();
    const found = DATA.calendarMonths.find((m) => m.year === today.getFullYear() && m.month === today.getMonth() + 1);
    calendarActiveMonth = found ? `${found.year}-${String(found.month).padStart(2, "0")}` : `${DATA.calendarMonths[0].year}-${String(DATA.calendarMonths[0].month).padStart(2, "0")}`;
  }
  const today = todayISO();
  const tabsHtml = DATA.calendarMonths.map((m) => {
    const key = `${m.year}-${String(m.month).padStart(2, "0")}`;
    const count = Object.keys(state.calendar[key] || {}).length;
    return `<button class="tab-btn ${key === calendarActiveMonth ? "active" : ""}" data-cal-tab="${key}">${m.label.split(" ")[0]}${count ? ` <span class="tab-status">${count}</span>` : ""}</button>`;
  }).join("");

  const m = DATA.calendarMonths.find((mm) => `${mm.year}-${String(mm.month).padStart(2, "0")}` === calendarActiveMonth) || DATA.calendarMonths[0];
  const key = calendarActiveMonth;
  const firstDow = new Date(m.year, m.month - 1, 1).getDay();
  const daysInMonth = new Date(m.year, m.month, 0).getDate();
  const filled = Object.keys(state.calendar[key] || {}).length;
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(`<div class="cal-cell empty"></div>`);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${key}-${String(d).padStart(2, "0")}`;
    const txt = (state.calendar[key] && state.calendar[key][String(d)]) || "";
    const classes = ["cal-cell"];
    if (iso === today) classes.push("today");
    if (txt) classes.push("has-content");
    cells.push(`
      <div class="${classes.join(" ")}">
        <span class="daynum">${d}</span>
        <textarea data-cal-key="${key}" data-cal-day="${d}" placeholder="Escrever aqui">${escapeHtml(txt)}</textarea>
      </div>`);
  }

  el.innerHTML = `
    <div class="tabs">${tabsHtml}</div>
    <div class="cal-month">
      <div class="cal-month-head"><b>${m.label}</b><span class="cal-count">${filled} dia${filled === 1 ? "" : "s"} com agenda</span></div>
      <div class="cal-grid">
        ${DOW.map((d) => `<div class="cal-dow">${d}</div>`).join("")}
        ${cells.join("")}
      </div>
    </div>`;

  el.querySelectorAll("[data-cal-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      calendarActiveMonth = btn.dataset.calTab;
      renderCalendar(el, Hub.getState());
    });
  });

  let saveTimer;
  el.querySelectorAll("textarea[data-cal-key]").forEach((ta) => {
    ta.addEventListener("input", () => {
      clearTimeout(saveTimer);
      const k = ta.dataset.calKey, day = ta.dataset.calDay, val = ta.value;
      saveTimer = setTimeout(() => {
        Hub.update((s) => {
          if (!s.calendar[k]) s.calendar[k] = {};
          if (val.trim()) s.calendar[k][day] = val;
          else delete s.calendar[k][day];
        });
      }, 500);
    });
  });
}

/* ---------- 10) Pauta de conteudo ---------- */
let contentFilter = "todos";
function renderContent(el, state) {
  const filters = ["todos", "p1", "p2", "p3", "p4"];
  const filterLabel = (k) => (k === "todos" ? "Todos" : PILAR_LABELS[k].split("·")[1].trim());
  const filtersHtml = filters.map((f) => `<button type="button" class="filter-btn ${contentFilter === f ? "active" : ""}" data-filter="${f}">${filterLabel(f)}</button>`).join("");
  const items = DATA.contentSeed.filter((c) => contentFilter === "todos" || c.pilar === contentFilter);
  const cardsHtml = items.map((c) => {
    const entry = (state.content && state.content[c.id]) || { status: c.status, link: c.link || "" };
    const objetivo = (c.objetivo || "").toLowerCase();
    return `
      <div class="content-card">
        <b class="titulo">${escapeHtml(c.material)}</b>
        ${c.tema ? `<p class="tema">${escapeHtml(c.tema)}</p>` : ""}
        <div class="content-meta-row">
          <span class="tag">${escapeHtml(PILAR_LABELS[c.pilar] || "")}</span>
          ${c.tipo ? `<span class="tag">${escapeHtml(c.tipo)}</span>` : ""}
          ${c.objetivo ? `<span class="objetivo-tag ${objetivo}">${escapeHtml(c.objetivo)}</span>` : ""}
        </div>
        ${c.clienteEvento ? `<div class="field"><b>Cliente/evento:</b> ${escapeHtml(c.clienteEvento)}</div>` : ""}
        ${c.desdobramento ? `<div class="field"><b>Desdobramento:</b> ${escapeHtml(c.desdobramento)}</div>` : ""}
        ${c.insumo ? `<div class="field"><b>Insumo:</b> ${escapeHtml(c.insumo)}</div>` : ""}
        ${c.roteiro ? `<div class="field"><b>Roteiro:</b> ${escapeHtml(c.roteiro)}</div>` : ""}
        <div class="content-card-foot">
          <div class="link-field">
            <input type="url" placeholder="Link do insumo ou roteiro" data-link-id="${c.id}" value="${escapeHtml(entry.link || "")}">
            ${entry.link ? `<a class="link-open" href="${escapeHtml(entry.link)}" target="_blank" rel="noopener">Abrir ↗</a>` : ""}
          </div>
          <select class="status-sel" data-content-id="${c.id}">
            ${DATA.statusOptions.map((s) => `<option value="${s}" ${s === entry.status ? "selected" : ""}>${s}</option>`).join("")}
          </select>
        </div>
      </div>`;
  }).join("");
  el.innerHTML = `<div class="content-filters">${filtersHtml}</div><div class="content-grid">${cardsHtml || '<p style="font-size:13px;color:var(--muted)">Nenhum item nesse pilar.</p>'}</div>`;
  el.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => { contentFilter = btn.dataset.filter; renderContent(el, Hub.getState()); });
  });
  el.querySelectorAll(".status-sel").forEach((sel) => {
    sel.addEventListener("change", () => {
      const id = sel.dataset.contentId;
      Hub.update((s) => {
        if (!s.content) s.content = {};
        if (!s.content[id]) s.content[id] = { status: sel.value, link: "" };
        else s.content[id].status = sel.value;
      });
    });
  });
  let linkTimer;
  el.querySelectorAll("[data-link-id]").forEach((inp) => {
    inp.addEventListener("input", () => {
      clearTimeout(linkTimer);
      const id = inp.dataset.linkId, val = inp.value.trim();
      linkTimer = setTimeout(() => {
        Hub.update((s) => {
          if (!s.content) s.content = {};
          if (!s.content[id]) s.content[id] = { status: "Ideia", link: val };
          else s.content[id].link = val;
        });
      }, 500);
    });
  });
}

/* ---------- 11) Insumos (pastas compartilhadas do Drive) ---------- */
function renderInsumos(el) {
  el.innerHTML = `<div class="grid-cards" style="--cols:2">${DATA.insumos.map((f, i) => `
    <a class="nav-card" href="${escapeHtml(f.url)}" target="_blank" rel="noopener">
      <div class="num-badge">${String(i + 1).padStart(2, "0")}</div>
      <b>${escapeHtml(f.titulo)}</b><span>${escapeHtml(f.desc)}</span>
      <span class="arrow">Abrir no Drive ↗</span>
    </a>`).join("")}</div>`;
}

/* ---------- 12) Documentos ---------- */
function renderDocumentos(el) {
  const dp = DATA.documentoProposta;
  el.innerHTML = `
    <div class="doc-card">
      <div class="doc-head"><b>${escapeHtml(dp.titulo)}</b><span class="fase-chevron">▾</span></div>
      <div class="doc-body"><p>${escapeHtml(dp.intro)}</p></div>
    </div>
    ${renderDocBlock(dp.parte1, true)}
    ${renderDocBlock(dp.parte2, false)}
    ${renderDocBlock(dp.parte3, false, dp.parte3.nota)}
  `;
  wireAccordion(el, ".doc-card", ".doc-head", ".doc-body");
}
function renderDocBlock(parte, withParagraphs, nota) {
  const paras = withParagraphs && parte.paragrafos ? parte.paragrafos.map((p) => `<p>${escapeHtml(p)}</p>`).join("") : "";
  const blocos = parte.blocos.map((b) => `<div class="doc-block"><b>${escapeHtml(b.t)}</b><p>${escapeHtml(b.d)}</p></div>`).join("");
  return `
    <div class="doc-card">
      <div class="doc-head"><b>${escapeHtml(parte.titulo)}</b><span class="fase-chevron">▾</span></div>
      <div class="doc-body">
        ${paras}
        <div style="margin-top:10px">${blocos}</div>
        ${nota ? `<p style="margin-top:12px;font-style:italic;color:var(--muted);font-size:12px">${escapeHtml(nota)}</p>` : ""}
      </div>
    </div>`;
}

/* ---------- 13) Identidade de marca (MIV) ---------- */
function renderMarca(el) {
  const m = DATA.marca;
  el.innerHTML = `
    <div class="marca-grid">
      <div class="marca-block">
        <b>Missão</b>
        <p>${escapeHtml(m.missao)}</p>
      </div>
      <div class="marca-block">
        <b>Visão</b>
        <p>${escapeHtml(m.visao)}</p>
      </div>
    </div>
    <div class="marca-block" style="margin-bottom:14px">
      <b>Valores</b>
      <div class="valores-row">${m.valores.map((v) => `<span class="tag">${escapeHtml(v)}</span>`).join("")}</div>
    </div>
    <div class="marca-block" style="margin-bottom:6px">
      <b>Paleta oficial</b>
      <div class="paleta-row">
        ${m.paleta.map((c) => `
          <div class="paleta-swatch">
            <div class="chip" style="background:${c.hex}"></div>
            <div class="nome">${escapeHtml(c.nome)}</div>
            <div class="hex">${escapeHtml(c.hex)}</div>
          </div>`).join("")}
      </div>
    </div>
    <div class="marca-block">
      <b>Tipografia</b>
      <div class="tipografia-row">
        ${m.tipografia.map((t) => `<div class="tipografia-item"><b>${escapeHtml(t.t)}</b><span>${escapeHtml(t.d)}</span></div>`).join("")}
      </div>
    </div>`;
}

/* ---------- 14) Conquistas, proximos passos, processo (inicio / estrategia) ---------- */
function renderConquistas(el) {
  const n = DATA.conquistas.length;
  el.innerHTML = `
    <div class="doc-card open">
      <div class="doc-head"><b>O que já foi feito · ${n} entregas concluídas</b><span class="fase-chevron">▾</span></div>
      <div class="doc-body">
        <div class="done-list">
          ${DATA.conquistas.map((c) => `
            <div class="done-row">
              <span class="done-check">✓</span>
              <div><b>${escapeHtml(c.t)}</b><p>${escapeHtml(c.d)}</p></div>
            </div>`).join("")}
        </div>
      </div>
    </div>`;
  wireAccordion(el, ".doc-card", ".doc-head", ".doc-body");
}
function renderProximosPassos(el) {
  el.innerHTML = `
    <div class="step-list">
      ${DATA.proximosPassos.map((p, i) => `
        <div class="step-row">
          <div class="step-num">${i + 1}</div>
          <div class="step-text"><b>${escapeHtml(p.t)}</b><p>${escapeHtml(p.d)}</p></div>
        </div>`).join("")}
    </div>`;
}
function renderProcesso(el) {
  const p = DATA.processo;
  el.innerHTML = `
    <div class="processo-meta">
      <div class="processo-meta-item"><div class="lbl">Objetivo</div><div class="val">${escapeHtml(p.objetivo)}</div></div>
      <div class="processo-meta-item"><div class="lbl">Frequência</div><div class="val">${escapeHtml(p.frequencia)}</div></div>
      <div class="processo-meta-item"><div class="lbl">Responsável</div><div class="val">${escapeHtml(p.responsavel)}</div></div>
    </div>
    <div class="processo-steps">
      ${p.passos.map((s) => `
        <div class="processo-step">
          <div class="num-badge">${s.n}</div>
          <div class="processo-step-body"><b>${escapeHtml(s.t)}</b><p>${escapeHtml(s.d)}</p></div>
        </div>`).join("")}
    </div>
    <div class="processo-criterio">
      <b>Como saber que ficou pronto</b>
      <ul>${p.criterioPronto.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
    </div>`;
}

/* ---------- 15) Estatisticas (Inicio) ---------- */
function renderStats(el, state) {
  const roadmapTotal = DATA.meses.reduce((a, m) => a + m.itens.length, 0);
  const roadmapDone = DATA.meses.reduce((a, m) => a + m.itens.filter((_, i) => state.roadmap[`${m.id}-${i}`]).length, 0);
  const boardTotal = Object.keys(state.cards || {}).length;
  const boardDone = (state.cardOrder && state.cardOrder.done ? state.cardOrder.done.length : 0);
  const contentPublished = DATA.contentSeed.filter((c) => {
    const entry = state.content && state.content[c.id];
    const status = entry ? entry.status : c.status;
    return status === "Publicado";
  }).length;
  let calFilled = 0;
  Object.values(state.calendar || {}).forEach((m) => { calFilled += Object.keys(m).length; });
  el.innerHTML = `
    <div class="stat-card"><div class="num">${roadmapDone}/${roadmapTotal}</div><div class="lbl">Cronograma cumprido</div></div>
    <div class="stat-card"><div class="num">${boardDone}/${boardTotal}</div><div class="lbl">Entregas concluídas</div></div>
    <div class="stat-card"><div class="num">${contentPublished}/${DATA.contentSeed.length}</div><div class="lbl">Conteúdos publicados</div></div>
    <div class="stat-card"><div class="num">${calFilled}</div><div class="lbl">Dias com agenda no calendário</div></div>`;
}
