/**
 * GitHub Contents API helpers for admin: list, get, create, update, delete files.
 * All requests use Authorization: Bearer <token>. Token must have repo contents read/write.
 */
import { adminConfig, GITHUB_API_BASE } from "@/config/admin";

const { owner, repo, branch } = adminConfig;

function headers(token) {
  return {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function apiUrl(path) {
  return `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
}

/**
 * List files in a directory. Returns array of { name, path, sha, ... }.
 * If the directory does not exist (404), returns [] so you can add the first file.
 */
export async function listContent(token, dirPath) {
  const url = `${apiUrl(dirPath)}?ref=${branch}`;
  const res = await fetch(url, { headers: headers(token) });
  if (res.status === 404) return [];
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error("Invalid or expired token. Log out and enter a new PAT.");
    if (res.status === 403) throw new Error("Token lacks permission. Use a PAT with repo contents read/write.");
    throw new Error(err.message || `List failed: ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Get a single file. Returns { content: string (decoded), sha }.
 */
export async function getFile(token, filePath) {
  const url = `${apiUrl(filePath)}?ref=${branch}`;
  const res = await fetch(url, { headers: headers(token) });
  if (!res.ok) {
    if (res.status === 404) throw new Error("File not found");
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Get failed: ${res.status}`);
  }
  const data = await res.json();
  const content =
    data.content != null
      ? decodeURIComponent(escape(atob(data.content.replace(/\n/g, ""))))
      : "";
  return { content, sha: data.sha };
}

/**
 * Create or update a file. content = string (will be base64-encoded). For update, pass sha.
 */
export async function putFile(token, filePath, content, sha = null, message = "Update content") {
  const url = apiUrl(filePath);
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
    branch,
  };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Save failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Delete a file. Requires sha of the current file.
 */
export async function deleteFile(token, filePath, sha, message = "Delete content") {
  const url = apiUrl(filePath);
  const res = await fetch(url, {
    method: "DELETE",
    headers: headers(token),
    body: JSON.stringify({ message, sha, branch }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Delete failed: ${res.status}`);
  }
  return res.json();
}
