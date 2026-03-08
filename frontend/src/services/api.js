/**
 * ShaktiNet — services/api.js
 * Centralised API layer for FastAPI backend.
 * All functions return { data, error } so callers never need try/catch.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ── Generic request helper ───────────────────────────────────────────────────
async function request(method, path, body = null, isForm = false) {
  const headers = {};
  const token = localStorage.getItem("shakti_token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = { method, headers };

  if (body) {
    if (isForm) {
      // FastAPI OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
      const form = new URLSearchParams();
      Object.entries(body).forEach(([k, v]) => form.append(k, v));
      opts.body = form;
    } else {
      headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, opts);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { data: null, error: json.detail || json.message || "Request failed" };
    return { data: json, error: null };
  } catch {
    return { data: null, error: "Network error — check your connection." };
  }
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export async function loginUser({ email, password }) {
  // FastAPI OAuth2 form expects username + password fields
  const { data, error } = await request("POST", "/auth/login", { username: email, password }, true);
  if (data?.access_token) localStorage.setItem("shakti_token", data.access_token);
  return { data, error };
}

export async function registerUser({ name, email, password, role }) {
  const { data, error } = await request("POST", "/auth/register", { name, email, password, role });
  if (data?.access_token) localStorage.setItem("shakti_token", data.access_token);
  return { data, error };
}

export function logoutUser() {
  localStorage.removeItem("shakti_token");
}

export async function getMe() {
  return request("GET", "/auth/me");
}

// ── Achievers ─────────────────────────────────────────────────────────────────
export async function getAchievers() {
  return request("GET", "/achievers/");
}

export async function nominateAchiever(payload) {
  return request("POST", "/achievers/nominate", payload);
}

// ── Businesses ───────────────────────────────────────────────────────────────
export async function getBusinesses({ category = "", city = "", search = "" } = {}) {
  const qs = new URLSearchParams();
  if (category) qs.append("category", category);
  if (city)     qs.append("city", city);
  if (search)   qs.append("search", search);
  const q = qs.toString() ? `?${qs}` : "";
  return request("GET", `/businesses/${q}`);
}

export async function addBusiness(payload) {
  return request("POST", "/businesses/", payload);
}

// ── Jobs ──────────────────────────────────────────────────────────────────────
export async function getJobs({ category = "", job_type = "", city = "" } = {}) {
  const qs = new URLSearchParams();
  if (category) qs.append("category", category);
  if (job_type) qs.append("job_type", job_type);
  if (city)     qs.append("city", city);
  const q = qs.toString() ? `?${qs}` : "";
  return request("GET", `/jobs/${q}`);
}

export async function postJob(payload) {
  return request("POST", "/jobs/", payload);
}

// ── SOS ───────────────────────────────────────────────────────────────────────
export async function sendSos({ latitude, longitude, contacts, message }) {
  return request("POST", "/sos/trigger", { latitude, longitude, contacts, message });
}

export async function resolveSos(logId) {
  return request("PATCH", `/sos/${logId}/resolve`);
}

// ── Incident Report ───────────────────────────────────────────────────────────
export async function fileReport(payload) {
  return request("POST", "/report", payload);
}

export async function getMyReports() {
  return request("GET", "/report/my");
}

// ── Resources ─────────────────────────────────────────────────────────────────
export async function getHelplines() {
  return request("GET", "/resources/helplines");
}

export async function getRights() {
  return request("GET", "/resources/rights");
}

