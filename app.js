/* Application Deadlines Calendar — no build step, no dependencies. */
(() => {
  const STORAGE_KEY = "deadline-calendar:v1";
  const TYPE_COLORS = {
    "Application": "#3b5bdb",
    "Early Decision": "#d6336c",
    "Early Action": "#f76707",
    "Regular Decision": "#1c7ed6",
    "Admissions test": "#7048e8",
    "Scholarship": "#2f9e44",
    "Financial aid": "#0c8599",
    "Interview": "#e8590c",
    "Other": "#868e96",
  };
  const CSV_FIELDS = ["title", "institution", "country", "type", "date", "time", "timezone", "priority", "link", "notes", "done"];

  const state = {
    deadlines: [],
    view: "month",
    cursor: startOfMonth(new Date()),
    filters: { search: "", country: "", type: "", hideDone: false },
    editingId: null,
    dayDialogDate: null,
  };

  const $ = (id) => document.getElementById(id);

  // ---------- Date helpers (all dates handled as local YYYY-MM-DD) ----------
  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function toKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function fromKey(k) { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); }
  function todayKey() { return toKey(new Date()); }
  function daysUntil(key) {
    const t = fromKey(todayKey());
    return Math.round((fromKey(key) - t) / 86400000);
  }
  function fmtDate(key, opts = { weekday: "short", day: "numeric", month: "short", year: "numeric" }) {
    return fromKey(key).toLocaleDateString("en-GB", opts);
  }
  function countdownLabel(key) {
    const n = daysUntil(key);
    if (n === 0) return { text: "Today", cls: "urgent" };
    if (n === 1) return { text: "Tomorrow", cls: "urgent" };
    if (n < 0) return { text: `${-n}d ago`, cls: "past" };
    return { text: `in ${n}d`, cls: n <= 7 ? "urgent" : "" };
  }

  // ---------- Storage ----------
  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
  function normalise(d) {
    return {
      id: d.id || uid(),
      title: String(d.title || "").trim(),
      institution: String(d.institution || "").trim(),
      country: String(d.country || "").trim(),
      type: TYPE_COLORS[d.type] ? d.type : (d.type ? String(d.type).trim() : "Other"),
      date: String(d.date || "").trim(),
      time: String(d.time || "").trim(),
      timezone: String(d.timezone || "").trim(),
      priority: ["high", "low", "normal"].includes(String(d.priority).toLowerCase()) ? String(d.priority).toLowerCase() : "normal",
      link: String(d.link || "").trim(),
      notes: String(d.notes || "").trim(),
      done: d.done === true || String(d.done).toLowerCase() === "true" || d.done === "1" || String(d.done).toLowerCase() === "yes",
    };
  }
  function isValid(d) { return d.title && /^\d{4}-\d{2}-\d{2}$/.test(d.date) && !isNaN(fromKey(d.date)); }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.deadlines)); } catch (_) { /* storage unavailable */ }
  }
  async function loadDefaults() {
    const res = await fetch("deadlines.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load deadlines.json");
    const data = await res.json();
    return data.map(normalise).filter(isValid);
  }
  async function load() {
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) {}
    if (Array.isArray(stored)) { state.deadlines = stored.map(normalise).filter(isValid); return; }
    try { state.deadlines = await loadDefaults(); save(); }
    catch (e) { state.deadlines = []; toast("No default data found — add deadlines or import a CSV."); }
  }

  // ---------- Filtering ----------
  function colorFor(type) { return TYPE_COLORS[type] || TYPE_COLORS.Other; }
  function filtered() {
    const { search, country, type, hideDone } = state.filters;
    const q = search.toLowerCase();
    return state.deadlines.filter((d) => {
      if (country && d.country !== country) return false;
      if (type && d.type !== type) return false;
      if (hideDone && d.done) return false;
      if (q && ![d.title, d.institution, d.notes, d.country, d.type].join(" ").toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => (a.date + (a.time || "99")).localeCompare(b.date + (b.time || "99")));
  }
  function byDate(list) {
    const map = {};
    for (const d of list) (map[d.date] ||= []).push(d);
    return map;
  }

  // ---------- Rendering ----------
  function render() {
    renderFilterOptions();
    $("todayLabel").textContent = "Today: " + fmtDate(todayKey(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const list = filtered();
    if (state.view === "month") {
      $("calendarView").hidden = false; $("agendaView").hidden = true;
      $("periodLabel").textContent = state.cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
      renderMonth(list);
    } else {
      $("calendarView").hidden = true; $("agendaView").hidden = false;
      $("periodLabel").textContent = "All deadlines";
      renderAgenda(list);
    }
    renderUpcoming(list);
    renderLegend();
  }

  function renderFilterOptions() {
    const countries = [...new Set(state.deadlines.map((d) => d.country).filter(Boolean))].sort();
    const types = [...new Set([...Object.keys(TYPE_COLORS), ...state.deadlines.map((d) => d.type)])];
    fillSelect($("countryFilter"), countries, "All countries", state.filters.country);
    fillSelect($("typeFilter"), types, "All types", state.filters.type);
    $("countryList").innerHTML = countries.map((c) => `<option value="${esc(c)}">`).join("");
  }
  function fillSelect(sel, values, allLabel, current) {
    sel.innerHTML = `<option value="">${allLabel}</option>` +
      values.map((v) => `<option ${v === current ? "selected" : ""} value="${esc(v)}">${esc(v)}</option>`).join("");
  }

  function renderMonth(list) {
    const map = byDate(list);
    const first = state.cursor;
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
    const weeks = Math.ceil((offset + new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()) / 7);
    const tKey = todayKey();
    let html = `<div class="weekdays">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => `<div>${d}</div>`).join("")}</div><div class="grid">`;
    for (let i = 0; i < weeks * 7; i++) {
      const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const key = toKey(day);
      const items = map[key] || [];
      const cls = ["cell", day.getMonth() !== first.getMonth() ? "other" : "", key === tKey ? "today" : ""].join(" ");
      const shown = items.slice(0, 3).map((d) => chip(d)).join("");
      const more = items.length > 3 ? `<span class="more">+${items.length - 3} more</span>` : "";
      html += `<div class="${cls}" data-day="${key}"><span class="num">${day.getDate()}</span>${shown}${more}</div>`;
    }
    $("calendarView").innerHTML = html + "</div>";
  }
  function chip(d) {
    const c = colorFor(d.type);
    const label = (d.institution ? d.institution + " — " : "") + d.title;
    return `<div class="chip ${d.done ? "done" : ""} ${d.priority === "high" ? "high" : ""}" data-id="${d.id}"
      style="border-color:${c};background:${c}1a" title="${esc(label)}">${esc(label)}</div>`;
  }

  function renderAgenda(list) {
    if (!list.length) { $("agendaView").innerHTML = `<div class="empty">No deadlines match your filters.</div>`; return; }
    let html = "", lastMonth = "";
    for (const d of list) {
      const m = fmtDate(d.date, { month: "long", year: "numeric" });
      if (m !== lastMonth) { html += `<h4>${m}</h4>`; lastMonth = m; }
      const cd = countdownLabel(d.date);
      html += `<div class="agenda-item ${d.done ? "done" : ""}" data-id="${d.id}" style="border-color:${colorFor(d.type)}">
        <div class="d">${fmtDate(d.date, { weekday: "short", day: "numeric", month: "short" })}${d.time ? `<div class="meta">${esc(d.time)} ${esc(d.timezone)}</div>` : ""}</div>
        <div><div class="t">${d.priority === "high" ? "⚑ " : ""}${esc(d.title)}</div>
          <div class="meta">${[d.institution, d.country, d.type].filter(Boolean).map(esc).join(" · ")}</div></div>
        <span class="badge ${d.done ? "" : cd.cls}">${d.done ? "Done" : cd.text}</span>
      </div>`;
    }
    $("agendaView").innerHTML = html;
  }

  function renderUpcoming(list) {
    const t = todayKey();
    const up = list.filter((d) => d.date >= t && !d.done).slice(0, 8);
    $("upcomingList").innerHTML = up.length ? up.map((d) => {
      const cd = countdownLabel(d.date);
      return `<li data-id="${d.id}" style="border-color:${colorFor(d.type)}">
        <div class="t">${esc(d.institution ? d.institution + " — " : "")}${esc(d.title)}</div>
        <div class="meta"><span>${fmtDate(d.date, { day: "numeric", month: "short", year: "numeric" })}</span><span class="badge ${cd.cls}">${cd.text}</span></div>
      </li>`;
    }).join("") : `<li class="empty" style="border:none">Nothing upcoming 🎉</li>`;
  }

  function renderLegend() {
    const used = new Set(state.deadlines.map((d) => d.type));
    $("legend").innerHTML = Object.entries(TYPE_COLORS).filter(([t]) => used.has(t))
      .map(([t, c]) => `<li><span class="swatch" style="background:${c}"></span>${t}</li>`).join("") || `<li class="meta">—</li>`;
  }

  // ---------- Dialogs ----------
  function openEdit(id = null, presetDate = null) {
    state.editingId = id;
    const f = $("editForm");
    f.reset();
    const d = id ? state.deadlines.find((x) => x.id === id) : null;
    $("dialogTitle").textContent = d ? "Edit deadline" : "Add deadline";
    $("deleteBtn").hidden = !d;
    const src = d || { date: presetDate || todayKey(), type: "Application", priority: "normal" };
    for (const k of ["title", "institution", "country", "type", "date", "time", "timezone", "priority", "link", "notes"]) {
      if (f.elements[k]) f.elements[k].value = src[k] || "";
    }
    if (f.elements.type.value === "" ) f.elements.type.value = "Other";
    f.elements.done.checked = !!src.done;
    $("editDialog").showModal();
  }

  function openDay(key) {
    state.dayDialogDate = key;
    $("dayTitle").textContent = fmtDate(key, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const items = filtered().filter((d) => d.date === key);
    $("dayList").innerHTML = items.length ? items.map((d) => `
      <li data-id="${d.id}" style="border-color:${colorFor(d.type)}">
        <strong>${esc(d.title)}</strong>${d.done ? " ✓" : ""}
        <div class="meta">${[d.institution, d.country, d.type, d.time && `${d.time} ${d.timezone}`].filter(Boolean).map(esc).join(" · ")}</div>
        ${d.notes ? `<div class="meta">${esc(d.notes)}</div>` : ""}
        ${safeUrl(d.link) ? `<a href="${esc(d.link)}" target="_blank" rel="noopener">Open link ↗</a>` : ""}
      </li>`).join("") : `<li class="empty" style="border:none">No deadlines on this day.</li>`;
    $("dayDialog").showModal();
  }

  // ---------- CSV / ICS ----------
  function parseCSV(text) {
    const rows = []; let row = [], field = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQ) {
        if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
        else field += ch;
      } else if (ch === '"') inQ = true;
      else if (ch === ",") { row.push(field); field = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += ch;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows.filter((r) => r.some((c) => c.trim() !== ""));
  }
  // Accepts YYYY-MM-DD, DD/MM/YYYY (UK style) or anything Date can parse.
  function normaliseDate(s) {
    s = String(s || "").trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const uk = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/);
    if (uk) return `${uk[3]}-${uk[2].padStart(2, "0")}-${uk[1].padStart(2, "0")}`;
    const d = new Date(s);
    return isNaN(d) ? "" : toKey(d);
  }
  function importCSV(text) {
    const rows = parseCSV(text.replace(/^﻿/, ""));
    if (rows.length < 2) throw new Error("CSV needs a header row and at least one data row.");
    const header = rows[0].map((h) => h.trim().toLowerCase());
    const alias = { university: "institution", school: "institution", deadline: "date", category: "type", url: "link", completed: "done" };
    const cols = header.map((h) => alias[h] || h);
    if (!cols.includes("title") || !cols.includes("date")) throw new Error('CSV must include "title" and "date" columns.');
    let added = 0, skipped = 0;
    for (const r of rows.slice(1)) {
      const obj = {};
      cols.forEach((c, i) => { obj[c] = r[i] ?? ""; });
      obj.date = normaliseDate(obj.date);
      const d = normalise(obj);
      if (isValid(d)) { state.deadlines.push(d); added++; } else skipped++;
    }
    save(); render();
    toast(`Imported ${added} deadline(s)` + (skipped ? `, skipped ${skipped} invalid row(s)` : ""));
  }
  function exportCSV() {
    const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [CSV_FIELDS.join(",")].concat(state.deadlines.map((d) => CSV_FIELDS.map((f) => q(d[f])).join(",")));
    download("deadlines.csv", lines.join("\n"), "text/csv");
  }
  function exportICS() {
    const esc2 = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Deadline Calendar//EN", "CALSCALE:GREGORIAN"];
    for (const d of filtered()) {
      const start = d.date.replace(/-/g, "");
      const end = toKey(new Date(fromKey(d.date).getTime() + 86400000)).replace(/-/g, "");
      const desc = [d.time && `Time: ${d.time} ${d.timezone}`, d.type, d.country, d.notes, d.link].filter(Boolean).join("\n");
      lines.push("BEGIN:VEVENT", `UID:${d.id}@deadline-calendar`, `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${esc2((d.institution ? d.institution + " — " : "") + d.title)}`,
        `DESCRIPTION:${esc2(desc)}`,
        "BEGIN:VALARM", "TRIGGER:-P7D", "ACTION:DISPLAY", "DESCRIPTION:Deadline in 7 days", "END:VALARM",
        "END:VEVENT");
    }
    lines.push("END:VCALENDAR");
    download("deadlines.ics", lines.join("\r\n"), "text/calendar");
  }
  function download(name, content, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ---------- Utils ----------
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function safeUrl(u) { return /^https?:\/\//i.test(u || ""); }
  let toastTimer;
  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 3000);
  }

  // ---------- Events ----------
  function bind() {
    $("prevBtn").onclick = () => { state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() - 1, 1); render(); };
    $("nextBtn").onclick = () => { state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() + 1, 1); render(); };
    $("todayBtn").onclick = () => { state.cursor = startOfMonth(new Date()); render(); };
    $("addBtn").onclick = () => openEdit();

    document.querySelectorAll(".seg button").forEach((b) => b.onclick = () => {
      document.querySelectorAll(".seg button").forEach((x) => x.classList.toggle("active", x === b));
      state.view = b.dataset.view; render();
    });

    $("searchInput").oninput = (e) => { state.filters.search = e.target.value; render(); };
    $("countryFilter").onchange = (e) => { state.filters.country = e.target.value; render(); };
    $("typeFilter").onchange = (e) => { state.filters.type = e.target.value; render(); };
    $("hideDone").onchange = (e) => { state.filters.hideDone = e.target.checked; render(); };

    // Calendar clicks: chip → edit, cell → day view
    $("calendarView").onclick = (e) => {
      const c = e.target.closest(".chip");
      if (c) return openEdit(c.dataset.id);
      const cell = e.target.closest(".cell");
      if (cell) openDay(cell.dataset.day);
    };
    $("agendaView").onclick = (e) => { const it = e.target.closest("[data-id]"); if (it) openEdit(it.dataset.id); };
    $("upcomingList").onclick = (e) => {
      const it = e.target.closest("[data-id]"); if (!it) return;
      const d = state.deadlines.find((x) => x.id === it.dataset.id);
      if (d) { state.cursor = startOfMonth(fromKey(d.date)); render(); openDay(d.date); }
    };
    $("dayList").onclick = (e) => {
      if (e.target.closest("a")) return;
      const it = e.target.closest("[data-id]"); if (!it) return;
      $("dayDialog").close(); openEdit(it.dataset.id);
    };
    $("dayAddBtn").onclick = () => { $("dayDialog").close(); openEdit(null, state.dayDialogDate); };
    $("dayCloseBtn").onclick = () => $("dayDialog").close();

    // Edit form
    $("editForm").onsubmit = (e) => {
      e.preventDefault();
      const f = e.target;
      const data = Object.fromEntries(new FormData(f).entries());
      data.done = f.elements.done.checked;
      const d = normalise({ ...data, id: state.editingId || undefined });
      if (!isValid(d)) return toast("Please enter a title and a valid date.");
      const idx = state.deadlines.findIndex((x) => x.id === d.id);
      if (idx >= 0) state.deadlines[idx] = d; else state.deadlines.push(d);
      save(); $("editDialog").close(); render(); toast("Saved");
    };
    $("cancelBtn").onclick = () => $("editDialog").close();
    $("deleteBtn").onclick = () => {
      if (!state.editingId) return;
      state.deadlines = state.deadlines.filter((x) => x.id !== state.editingId);
      save(); $("editDialog").close(); render(); toast("Deleted");
    };

    // Data menu
    $("menuBtn").onclick = (e) => { e.stopPropagation(); $("menuList").hidden = !$("menuList").hidden; };
    document.addEventListener("click", () => ($("menuList").hidden = true));
    $("importCsvBtn").onclick = () => $("csvInput").click();
    $("csvInput").onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try { importCSV(await file.text()); } catch (err) { toast(err.message); }
      e.target.value = "";
    };
    $("exportCsvBtn").onclick = exportCSV;
    $("exportIcsBtn").onclick = exportICS;
    $("resetBtn").onclick = async () => {
      // Two-click confirmation instead of a blocking confirm() dialog
      const b = $("resetBtn");
      if (b.dataset.armed !== "1") { b.dataset.armed = "1"; b.textContent = "Click again to confirm reset"; setTimeout(() => { b.dataset.armed = ""; b.textContent = "Reset to default data"; }, 4000); return; }
      b.dataset.armed = ""; b.textContent = "Reset to default data";
      try { state.deadlines = await loadDefaults(); save(); render(); toast("Reset to default data"); }
      catch (err) { toast(err.message); }
    };

    // Keyboard: ← → to change month, "n" for new
    document.addEventListener("keydown", (e) => {
      if (document.querySelector("dialog[open]") || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
      if (e.key === "ArrowLeft") $("prevBtn").click();
      if (e.key === "ArrowRight") $("nextBtn").click();
      if (e.key.toLowerCase() === "n") openEdit();
      if (e.key.toLowerCase() === "t") $("todayBtn").click();
    });
  }

  // ---------- Init ----------
  bind();
  load().then(render);
})();
