import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultTechnicalDispatch } from "./defaults";

export default function TechnicalDispatchForm({
  initialData,
  isAdd,
  onSave,
  onCancel,
  saving,
}) {
  const [data, setData] = useState(() => {
    if (initialData) return JSON.parse(JSON.stringify(initialData));
    return defaultTechnicalDispatch();
  });

  useEffect(() => {
    if (initialData) setData(JSON.parse(JSON.stringify(initialData)));
    else setData(defaultTechnicalDispatch());
  }, [initialData]);

  const updateSection = (index, field, value) => {
    setData((d) => {
      const next = JSON.parse(JSON.stringify(d));
      next.sections[index] = { ...next.sections[index], [field]: value };
      return next;
    });
  };

  const addSection = () => {
    setData((d) => ({
      ...d,
      sections: [...(d.sections ?? []), { label: "", body: "" }],
    }));
  };

  const removeSection = (index) => {
    setData((d) => ({
      ...d,
      sections: d.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label>Slug (filename, e.g. my-post)</Label>
        <Input
          value={data.slug ?? ""}
          onChange={(e) => setData((d) => ({ ...d, slug: e.target.value }))}
          placeholder="mysql-1130-fix"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input
          value={data.title ?? ""}
          onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
          placeholder="Resolving MySQL Host Access Denied"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>Date</Label>
        <Input
          type="date"
          value={(data.date ?? "").slice(0, 10)}
          onChange={(e) => setData((d) => ({ ...d, date: e.target.value }))}
        />
      </div>

      <fieldset className="border p-4 rounded space-y-2">
        <legend className="font-medium">Sections (Problem, Context, Solution, etc.)</legend>
        {(data.sections ?? []).map((section, i) => (
          <div key={i} className="border-b pb-4 mb-4">
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Label (e.g. Problem)"
                value={section.label ?? ""}
                onChange={(e) => updateSection(i, "label", e.target.value)}
                className="w-48"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSection(i)}
              >
                −
              </Button>
            </div>
            <Textarea
              placeholder="Body"
              value={section.body ?? ""}
              onChange={(e) => updateSection(i, "body", e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addSection}>
          + Section
        </Button>
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
