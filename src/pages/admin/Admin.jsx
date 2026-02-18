import { useEffect, useState } from "react";

const ADMIN_TITLE = "Blog Admin — Jjay Fabor";
const SITE_TITLE = "Jjay Fabor — Software Developer | Backend Engineer";
import { getFile, putFile, deleteFile } from "@/lib/githubContent";
import { adminConfig } from "@/config/admin";
import { weeklyChronicleIssues } from "@/data/weeklyChronicle";
import {
  technicalDispatchSlugs,
  getTechnicalDispatchBySlug,
} from "@/data/technicalDispatches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import WeeklyChronicleForm from "@/components/admin/WeeklyChronicleForm";
import TechnicalDispatchForm from "@/components/admin/TechnicalDispatchForm";

const TOKEN_KEY = "admin_github_token";

function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}

function setStoredToken(t) {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    if (t) sessionStorage.setItem(TOKEN_KEY, t);
    else sessionStorage.removeItem(TOKEN_KEY);
  }
}

export default function Admin() {
  const [token, setTokenState] = useState(getStoredToken);
  const [tokenInput, setTokenInput] = useState("");
  const [activeTab, setActiveTab] = useState("weekly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [wcList, setWcList] = useState(() =>
    weeklyChronicleIssues.map((i) => ({ name: `${i.slug}.json`, slug: i.slug, dateRange: i.dateRange }))
  );
  const [tdList, setTdList] = useState(() =>
    technicalDispatchSlugs.map((slug) => {
      const post = getTechnicalDispatchBySlug(slug);
      return {
        name: `${slug}.json`,
        slug,
        title: post?.title ?? slug,
      };
    })
  );
  const [wcFormMode, setWcFormMode] = useState(null);
  const [wcFormData, setWcFormData] = useState(null);
  const [wcFormSha, setWcFormSha] = useState(null);
  const [tdFormMode, setTdFormMode] = useState(null);
  const [tdFormData, setTdFormData] = useState(null);
  const [tdFormSha, setTdFormSha] = useState(null);

  const setToken = (t) => {
    setStoredToken(t);
    setTokenState(t);
  };

  const handleSaveToken = () => {
    const t = tokenInput.trim();
    if (!t) return;
    setToken(t);
    setTokenInput("");
    setMessage("Token saved. Loading lists...");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    setToken(null);
    setWcFormMode(null);
    setTdFormMode(null);
    setError(null);
    setMessage(null);
  };

  const openWcAdd = () => {
    setWcFormData(null);
    setWcFormSha(null);
    setWcFormMode("add");
  };
  const openWcEdit = async (name) => {
    const slug = name.replace(/\.json$/, "");
    const path = `${adminConfig.paths.weeklyChronicle}/${name}`;
    setLoading(true);
    setError(null);
    try {
      const { content, sha } = await getFile(token, path);
      const data = JSON.parse(content);
      setWcFormData(data);
      setWcFormSha(sha);
      setWcFormMode(slug);
    } catch (e) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };
  const saveWc = async (data) => {
    const slug = data.slug || (wcFormMode === "add" ? "week-01" : wcFormMode);
    const path = `${adminConfig.paths.weeklyChronicle}/${slug}.json`;
    setLoading(true);
    setError(null);
    try {
      await putFile(token, path, JSON.stringify(data, null, 2), wcFormSha, `Update weekly chronicle ${slug}`);
      setMessage("Saved. Site will update after deploy (1–2 min).");
      setTimeout(() => setMessage(null), 5000);
      setWcFormMode(null);
      if (wcFormMode === "add") {
        setWcList((prev) => [
          ...prev,
          { name: `${slug}.json`, slug, dateRange: data.dateRange },
        ]);
      }
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };
  const deleteWc = async (name) => {
    if (!confirm(`Delete ${name}?`)) return;
    const path = `${adminConfig.paths.weeklyChronicle}/${name}`;
    setLoading(true);
    setError(null);
    try {
      const { sha } = await getFile(token, path);
      await deleteFile(token, path, sha, `Delete ${name}`);
      setMessage("Deleted. Site will update after deploy.");
      setTimeout(() => setMessage(null), 5000);
      setWcFormMode(null);
      setWcList((prev) => prev.filter((f) => f.name !== name));
    } catch (e) {
      setError(e.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const openTdAdd = () => {
    setTdFormData(null);
    setTdFormSha(null);
    setTdFormMode("add");
  };
  const openTdEdit = async (name) => {
    const path = `${adminConfig.paths.technicalDispatch}/${name}`;
    setLoading(true);
    setError(null);
    try {
      const { content, sha } = await getFile(token, path);
      const data = JSON.parse(content);
      setTdFormData(data);
      setTdFormSha(sha);
      setTdFormMode(name.replace(/\.json$/, ""));
    } catch (e) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };
  const saveTd = async (data) => {
    const slug = data.slug || (tdFormMode === "add" ? "my-post" : tdFormMode);
    const path = `${adminConfig.paths.technicalDispatch}/${slug}.json`;
    setLoading(true);
    setError(null);
    try {
      await putFile(token, path, JSON.stringify(data, null, 2), tdFormSha, `Update dispatch ${slug}`);
      setMessage("Saved. Site will update after deploy (1–2 min).");
      setTimeout(() => setMessage(null), 5000);
      setTdFormMode(null);
      if (tdFormMode === "add") {
        setTdList((prev) => [
          ...prev,
          { name: `${slug}.json`, slug, title: data.title ?? slug },
        ]);
      }
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };
  const deleteTd = async (name) => {
    if (!confirm(`Delete ${name}?`)) return;
    const path = `${adminConfig.paths.technicalDispatch}/${name}`;
    setLoading(true);
    setError(null);
    try {
      const { sha } = await getFile(token, path);
      await deleteFile(token, path, sha, `Delete ${name}`);
      setMessage("Deleted. Site will update after deploy.");
      setTimeout(() => setMessage(null), 5000);
      setTdFormMode(null);
      setTdList((prev) => prev.filter((f) => f.name !== name));
    } catch (e) {
      setError(e.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = ADMIN_TITLE;
    return () => { document.title = SITE_TITLE; };
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen bg-background p-8 max-w-md mx-auto">
        <h1 className="text-xl font-semibold mb-4">Admin</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your GitHub Personal Access Token (repo contents read/write). It is saved in this browser until you log out.
        </p>
        <Label htmlFor="token">Token</Label>
        <Input
          id="token"
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          placeholder="ghp_..."
          className="mt-1 mb-4"
        />
        <Button onClick={handleSaveToken} disabled={!tokenInput.trim()}>
          Save and continue
        </Button>
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Blog Admin</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        {message && <p className="mb-4 text-sm text-green-600 dark:text-green-400">{message}</p>}
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        {loading && <p className="mb-4 text-sm text-muted-foreground">Loading...</p>}

        <div className="flex gap-2 border-b mb-4">
          <Button
            variant={activeTab === "weekly" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setError(null); setActiveTab("weekly"); }}
          >
            Weekly Chronicle
          </Button>
          <Button
            variant={activeTab === "dispatch" ? "default" : "ghost"}
            size="sm"
            onClick={() => { setError(null); setActiveTab("dispatch"); }}
          >
            Technical Dispatches
          </Button>
        </div>

        {activeTab === "weekly" && (
          <>
            {wcFormMode != null ? (
              <WeeklyChronicleForm
                initialData={wcFormData}
                isAdd={wcFormMode === "add"}
                onSave={saveWc}
                onCancel={() => setWcFormMode(null)}
                saving={loading}
              />
            ) : (
              <>
                <Button className="mb-4" onClick={openWcAdd}>
                  Add issue
                </Button>
                <ul className="space-y-2">
                  {wcList.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 py-2 border-b">
                      <span className="flex-1 font-mono text-sm">
                        {f.name}
                        {f.dateRange && (
                          <span className="text-muted-foreground ml-2 font-sans normal-case">
                            {f.dateRange}
                          </span>
                        )}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => openWcEdit(f.name)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteWc(f.name)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
                {wcList.length === 0 && !loading && (
                  <p className="text-muted-foreground text-sm">
                    No issues yet. Add one above, or push your content/weekly-chronicle/ folder to
                    main and redeploy so the list appears here.
                  </p>
                )}
              </>
            )}
          </>
        )}

        {activeTab === "dispatch" && (
          <>
            {tdFormMode != null ? (
              <TechnicalDispatchForm
                initialData={tdFormData}
                isAdd={tdFormMode === "add"}
                onSave={saveTd}
                onCancel={() => setTdFormMode(null)}
                saving={loading}
              />
            ) : (
              <>
                <Button className="mb-4" onClick={openTdAdd}>
                  Add dispatch
                </Button>
                <ul className="space-y-2">
                  {tdList.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 py-2 border-b">
                      <span className="flex-1 font-mono text-sm">
                        {f.title ?? f.name}
                        <span className="text-muted-foreground ml-2 font-sans text-xs">
                          {f.name}
                        </span>
                      </span>
                      <Button size="sm" variant="outline" onClick={() => openTdEdit(f.name)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteTd(f.name)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
                {tdList.length === 0 && !loading && (
                  <p className="text-muted-foreground text-sm">
                    No dispatches yet. Add one above, or push your content/technical-dispatch/ folder
                    to main and redeploy so the list appears here.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
