// Client-side mock store for auth + generations (localStorage-based MVP).
// Ready to be replaced with Supabase later.

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type Generation = {
  id: string;
  userId: string;
  input: string;
  productUrl?: string;
  description: string;
  videoScript: string;
  adIdeas: string;
  createdAt: string;
};

const USER_KEY = "copy_user";
const USERS_KEY = "copy_users";
const GEN_KEY = "copy_generations";

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

function setCurrentUser(u: User | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
  else localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

function readUsers(): Array<User & { password: string }> {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function writeUsers(list: Array<User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function signup(email: string, password: string, name: string): User {
  const users = readUsers();
  if (users.some((u) => u.email === email)) throw new Error("هذا البريد مسجّل مسبقاً");
  const user: User = {
    id: crypto.randomUUID(),
    email,
    name,
    createdAt: new Date().toISOString(),
  };
  users.push({ ...user, password });
  writeUsers(users);
  setCurrentUser(user);
  return user;
}

export function login(email: string, password: string): User {
  const users = readUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) throw new Error("بيانات الدخول غير صحيحة");
  const { password: _pw, ...user } = found;
  setCurrentUser(user);
  return user;
}

export function logout() {
  setCurrentUser(null);
}

export function updateUser(patch: Partial<User>) {
  const cur = getCurrentUser();
  if (!cur) return;
  const next = { ...cur, ...patch };
  setCurrentUser(next);
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === cur.id);
  if (idx >= 0) {
    users[idx] = { ...users[idx], ...patch };
    writeUsers(users);
  }
}

export function listGenerations(userId: string): Generation[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(GEN_KEY);
  const all: Generation[] = raw ? JSON.parse(raw) : [];
  return all
    .filter((g) => g.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveGeneration(g: Generation) {
  const raw = localStorage.getItem(GEN_KEY);
  const all: Generation[] = raw ? JSON.parse(raw) : [];
  all.push(g);
  localStorage.setItem(GEN_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("gen-change"));
}

export function getGeneration(id: string): Generation | undefined {
  const raw = localStorage.getItem(GEN_KEY);
  const all: Generation[] = raw ? JSON.parse(raw) : [];
  return all.find((g) => g.id === id);
}
