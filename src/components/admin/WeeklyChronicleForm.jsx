import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultWeeklyChronicle } from "./defaults";

export default function WeeklyChronicleForm({
  initialData,
  isAdd,
  onSave,
  onCancel,
  saving,
}) {
  const [data, setData] = useState(() => {
    if (initialData) return JSON.parse(JSON.stringify(initialData));
    return defaultWeeklyChronicle();
  });

  useEffect(() => {
    if (initialData) setData(JSON.parse(JSON.stringify(initialData)));
    else setData(defaultWeeklyChronicle());
  }, [initialData]);

  const update = (path, value) => {
    setData((d) => {
      const next = JSON.parse(JSON.stringify(d));
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const updateArray = (path, index, value) => {
    setData((d) => {
      const next = JSON.parse(JSON.stringify(d));
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      const key = parts[parts.length - 1];
      if (Array.isArray(cur[key])) cur[key][index] = value;
      return next;
    });
  };

  const pushToArray = (path, item) => {
    setData((d) => {
      const next = JSON.parse(JSON.stringify(d));
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]].push(item);
      return next;
    });
  };

  const removeFromArray = (path, index) => {
    setData((d) => {
      const next = JSON.parse(JSON.stringify(d));
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]].splice(index, 1);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label>Slug (filename)</Label>
        <Input
          value={data.slug ?? ""}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="week-01"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Date range</Label>
          <Input
            value={data.dateRange ?? ""}
            onChange={(e) => update("dateRange", e.target.value)}
            placeholder="May 3-10, 2025"
          />
        </div>
        <div className="flex gap-2">
          <div>
            <Label>Volume</Label>
            <Input
              type="number"
              value={data.volume ?? 1}
              onChange={(e) => update("volume", parseInt(e.target.value, 10) || 0)}
            />
          </div>
          <div>
            <Label>Issue</Label>
            <Input
              type="number"
              value={data.issue ?? 1}
              onChange={(e) => update("issue", parseInt(e.target.value, 10) || 0)}
            />
          </div>
        </div>
      </div>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Front Page Story</legend>
        <div>
          <Label>Headline</Label>
          <Input
            value={data.frontPageStory?.headline ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                frontPageStory: { ...d.frontPageStory, headline: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Byline date</Label>
          <Input
            value={data.frontPageStory?.bylineDate ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                frontPageStory: { ...d.frontPageStory, bylineDate: e.target.value },
              }))
            }
            placeholder="Monday, May 5, 2025"
          />
        </div>
        <div>
          <Label>Body (paragraphs)</Label>
          {(data.frontPageStory?.body ?? [""]).map((p, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <Textarea
                value={p}
                onChange={(e) => updateArray("frontPageStory.body", i, e.target.value)}
                rows={2}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeFromArray("frontPageStory.body", i)}
              >
                −
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => pushToArray("frontPageStory.body", "")}
          >
            + Paragraph
          </Button>
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Engineering Desk</legend>
        <div>
          <Label>Title</Label>
          <Input
            value={data.engineeringDesk?.title ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                engineeringDesk: { ...d.engineeringDesk, title: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            value={data.engineeringDesk?.subtitle ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                engineeringDesk: { ...d.engineeringDesk, subtitle: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Bullets</Label>
          {(data.engineeringDesk?.bullets ?? [""]).map((b, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <Input
                value={b}
                onChange={(e) => updateArray("engineeringDesk.bullets", i, e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeFromArray("engineeringDesk.bullets", i)}
              >
                −
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => pushToArray("engineeringDesk.bullets", "")}
          >
            + Bullet
          </Button>
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Highlights</legend>
        <div>
          <Label>Section title</Label>
          <Input
            value={data.highlights?.title ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                highlights: { ...d.highlights, title: e.target.value },
              }))
            }
          />
        </div>
        {(data.highlights?.items ?? []).map((item, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Category"
              value={item.category ?? ""}
              onChange={(e) => {
                const items = [...(data.highlights?.items ?? [])];
                items[i] = { ...items[i], category: e.target.value };
                setData((d) => ({ ...d, highlights: { ...d.highlights, items } }));
              }}
            />
            <Input
              placeholder="Emoji"
              value={item.emoji ?? ""}
              onChange={(e) => {
                const items = [...(data.highlights?.items ?? [])];
                items[i] = { ...items[i], emoji: e.target.value };
                setData((d) => ({ ...d, highlights: { ...d.highlights, items } }));
              }}
            />
            <Input
              placeholder="Text"
              value={item.text ?? ""}
              onChange={(e) => {
                const items = [...(data.highlights?.items ?? [])];
                items[i] = { ...items[i], text: e.target.value };
                setData((d) => ({ ...d, highlights: { ...d.highlights, items } }));
              }}
            />
          </div>
        ))}
      </fieldset>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Personal Section</legend>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Title</Label>
            <Input
              value={data.personalSection?.title ?? ""}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  personalSection: { ...d.personalSection, title: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={data.personalSection?.subtitle ?? ""}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  personalSection: { ...d.personalSection, subtitle: e.target.value },
                }))
              }
            />
          </div>
        </div>
        {(data.personalSection?.entries ?? []).map((e, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Topic"
              value={e.topic ?? ""}
              onChange={(ev) => {
                const entries = [...(data.personalSection?.entries ?? [])];
                entries[i] = { ...entries[i], topic: ev.target.value };
                setData((d) => ({ ...d, personalSection: { ...d.personalSection, entries } }));
              }}
            />
            <Input
              placeholder="Body"
              value={e.body ?? ""}
              onChange={(ev) => {
                const entries = [...(data.personalSection?.entries ?? [])];
                entries[i] = { ...entries[i], body: ev.target.value };
                setData((d) => ({ ...d, personalSection: { ...d.personalSection, entries } }));
              }}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeFromArray("personalSection.entries", i)}
            >
              −
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => pushToArray("personalSection.entries", { topic: "", body: "" })}
        >
          + Entry
        </Button>
      </fieldset>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Technical Dispatch (optional, mini deep-dive)</legend>
        <div>
          <Label>Title</Label>
          <Input
            value={data.technicalDispatch?.title ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                technicalDispatch: { ...(d.technicalDispatch || {}), title: e.target.value },
              }))
            }
          />
        </div>
        {(data.technicalDispatch?.sections ?? []).map((s, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <Input
              placeholder="Label"
              value={s.label ?? ""}
              onChange={(e) => {
                const sections = [...(data.technicalDispatch?.sections ?? [])];
                sections[i] = { ...sections[i], label: e.target.value };
                setData((d) => ({ ...d, technicalDispatch: { ...d.technicalDispatch, sections } }));
              }}
              className="w-40"
            />
            <Textarea
              placeholder="Body"
              value={s.body ?? ""}
              onChange={(e) => {
                const sections = [...(data.technicalDispatch?.sections ?? [])];
                sections[i] = { ...sections[i], body: e.target.value };
                setData((d) => ({ ...d, technicalDispatch: { ...d.technicalDispatch, sections } }));
              }}
              rows={2}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const sections = (data.technicalDispatch?.sections ?? []).filter((_, j) => j !== i);
                setData((d) => ({ ...d, technicalDispatch: { ...d.technicalDispatch, sections } }));
              }}
            >
              −
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            setData((d) => ({
              ...d,
              technicalDispatch: {
                ...d.technicalDispatch,
                sections: [...(d.technicalDispatch?.sections ?? []), { label: "", body: "" }],
              },
            }))
          }
        >
          + Section
        </Button>
      </fieldset>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Metrics (optional)</legend>
        <div>
          <Label>Title</Label>
          <Input
            value={data.metrics?.title ?? ""}
            onChange={(e) =>
              setData((d) => ({ ...d, metrics: { ...d.metrics, title: e.target.value } }))
            }
          />
        </div>
        {(data.metrics?.items ?? []).map((m, i) => (
          <div key={i} className="flex gap-2 mt-1">
            <Input
              placeholder="Label"
              value={m.label ?? ""}
              onChange={(e) => {
                const items = [...(data.metrics?.items ?? [])];
                items[i] = { ...items[i], label: e.target.value };
                setData((d) => ({ ...d, metrics: { ...d.metrics, items } }));
              }}
            />
            <Input
              placeholder="Value"
              value={m.value ?? ""}
              onChange={(e) => {
                const items = [...(data.metrics?.items ?? [])];
                items[i] = { ...items[i], value: e.target.value };
                setData((d) => ({ ...d, metrics: { ...d.metrics, items } }));
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const items = (data.metrics?.items ?? []).filter((_, j) => j !== i);
                setData((d) => ({ ...d, metrics: { ...d.metrics, items } }));
              }}
            >
              −
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            setData((d) => ({
              ...d,
              metrics: {
                ...d.metrics,
                items: [...(d.metrics?.items ?? []), { label: "", value: "" }],
              },
            }))
          }
        >
          + Metric
        </Button>
      </fieldset>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Looking Ahead</legend>
        <div>
          <Label>Title</Label>
          <Input
            value={data.lookingAhead?.title ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                lookingAhead: { ...d.lookingAhead, title: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Body (paragraphs)</Label>
          {(data.lookingAhead?.body ?? [""]).map((p, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <Textarea
                value={p}
                onChange={(e) => updateArray("lookingAhead.body", i, e.target.value)}
                rows={2}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeFromArray("lookingAhead.body", i)}
              >
                −
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => pushToArray("lookingAhead.body", "")}
          >
            + Paragraph
          </Button>
        </div>
        <div>
          <Label>Pull quote</Label>
          <Input
            placeholder="Quote"
            value={data.lookingAhead?.pullQuote?.quote ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                lookingAhead: {
                  ...d.lookingAhead,
                  pullQuote: { ...d.lookingAhead?.pullQuote, quote: e.target.value },
                },
              }))
            }
          />
          <Input
            placeholder="Attribution"
            className="mt-1"
            value={data.lookingAhead?.pullQuote?.attribution ?? ""}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                lookingAhead: {
                  ...d.lookingAhead,
                  pullQuote: { ...d.lookingAhead?.pullQuote, attribution: e.target.value },
                },
              }))
            }
          />
        </div>
      </fieldset>

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
