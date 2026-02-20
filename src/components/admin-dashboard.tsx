"use client";

import { useMemo, useState } from "react";
import { AgeRange, GenderPresentation, OrderStatus } from "@prisma/client";
import { useToast } from "@/components/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AGE_RANGE_LABELS, GENDER_LABELS, ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from "@/lib/constants";

type AdminActor = {
  id: string;
  name: string;
  ageRange: AgeRange;
  genderPresentation: GenderPresentation;
  styleTags: string[];
  vibeTags: string[];
  emotionTags: string[];
  languages: string[];
  bioShort: string;
  imageUrls: string[];
  voiceSampleUrl: string | null;
  videoSampleUrl: string | null;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
};

type AdminOrder = {
  id: string;
  type: string;
  status: OrderStatus;
  companyName: string | null;
  notes: string | null;
  createdAt: string;
  user: { email: string };
  actor: { name: string } | null;
  plan: { name: string } | null;
};

type Plan = {
  id: string;
  name: string;
  isActive: boolean;
};

type ActorFormState = {
  name: string;
  ageRange: AgeRange;
  genderPresentation: GenderPresentation;
  styleTags: string;
  vibeTags: string;
  emotionTags: string;
  languages: string;
  bioShort: string;
  imageUrls: string;
  voiceSampleUrl: string;
  videoSampleUrl: string;
  isPublished: boolean;
};

const emptyActorForm: ActorFormState = {
  name: "",
  ageRange: AgeRange.AGE_26_35,
  genderPresentation: GenderPresentation.OTHER,
  styleTags: "",
  vibeTags: "",
  emotionTags: "",
  languages: "en",
  bioShort: "",
  imageUrls: "",
  voiceSampleUrl: "",
  videoSampleUrl: "",
  isPublished: false
};

function toCommaList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function toUrlList(value: string): string[] {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function actorToForm(actor: AdminActor): ActorFormState {
  return {
    name: actor.name,
    ageRange: actor.ageRange,
    genderPresentation: actor.genderPresentation,
    styleTags: actor.styleTags.join(", "),
    vibeTags: actor.vibeTags.join(", "),
    emotionTags: actor.emotionTags.join(", "),
    languages: actor.languages.join(", "),
    bioShort: actor.bioShort,
    imageUrls: actor.imageUrls.join("\n"),
    voiceSampleUrl: actor.voiceSampleUrl ?? "",
    videoSampleUrl: actor.videoSampleUrl ?? "",
    isPublished: actor.isPublished
  };
}

export function AdminDashboard({
  initialActors,
  initialOrders,
  plans
}: {
  initialActors: AdminActor[];
  initialOrders: AdminOrder[];
  plans: Plan[];
}) {
  const { toast } = useToast();
  const [actors, setActors] = useState<AdminActor[]>(initialActors);
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [editingActorId, setEditingActorId] = useState<string | null>(null);
  const [form, setForm] = useState<ActorFormState>(emptyActorForm);
  const [isSavingActor, setIsSavingActor] = useState(false);
  const [uploadKind, setUploadKind] = useState<"image" | "audio" | "video">("image");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sortedActors = useMemo(
    () => [...actors].sort((a, b) => Number(b.isPublished) - Number(a.isPublished)),
    [actors]
  );

  const resetForm = () => {
    setForm(emptyActorForm);
    setEditingActorId(null);
  };

  const submitActor = async () => {
    setIsSavingActor(true);

    try {
      const payload = {
        name: form.name,
        ageRange: form.ageRange,
        genderPresentation: form.genderPresentation,
        styleTags: toCommaList(form.styleTags),
        vibeTags: toCommaList(form.vibeTags),
        emotionTags: toCommaList(form.emotionTags),
        languages: toCommaList(form.languages),
        bioShort: form.bioShort,
        imageUrls: toUrlList(form.imageUrls),
        voiceSampleUrl: form.voiceSampleUrl.trim() || null,
        videoSampleUrl: form.videoSampleUrl.trim() || null,
        isPublished: form.isPublished
      };

      const endpoint = editingActorId ? `/api/admin/actors/${editingActorId}` : "/api/admin/actors";
      const method = editingActorId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.error ?? "Failed to save actor");
      }

      const actor = response.actor as AdminActor;

      setActors((prev) => {
        if (editingActorId) {
          return prev.map((item) => (item.id === actor.id ? actor : item));
        }

        return [actor, ...prev];
      });

      toast({ title: editingActorId ? "Actor updated" : "Actor created", variant: "success" });
      resetForm();
    } catch (error) {
      toast({
        title: "Actor save failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    } finally {
      setIsSavingActor(false);
    }
  };

  const togglePublish = async (actor: AdminActor) => {
    try {
      const res = await fetch(`/api/admin/actors/${actor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !actor.isPublished })
      });
      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.error ?? "Failed to update publish state");
      }

      setActors((prev) => prev.map((item) => (item.id === actor.id ? response.actor : item)));
      toast({ title: actor.isPublished ? "Actor unpublished" : "Actor published", variant: "success" });
    } catch (error) {
      toast({
        title: "Publish update failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    }
  };

  const deleteActor = async (actorId: string) => {
    const confirmation = window.confirm("Delete actor? Existing orders keep history with null actor.");
    if (!confirmation) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/actors/${actorId}`, { method: "DELETE" });
      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.error ?? "Failed to delete actor");
      }

      setActors((prev) => prev.filter((item) => item.id !== actorId));
      if (editingActorId === actorId) {
        resetForm();
      }

      toast({ title: "Actor deleted", variant: "success" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    }
  };

  const uploadMedia = async () => {
    if (!uploadFile) {
      toast({ title: "Choose a file first", variant: "error" });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("kind", uploadKind);
      formData.append("file", uploadFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.error ?? "Upload failed");
      }

      const url = response.url as string;
      setForm((prev) => {
        if (uploadKind === "image") {
          const combined = [prev.imageUrls, url].filter(Boolean).join("\n");
          return { ...prev, imageUrls: combined };
        }

        if (uploadKind === "audio") {
          return { ...prev, voiceSampleUrl: url };
        }

        return { ...prev, videoSampleUrl: url };
      });

      setUploadFile(null);
      toast({ title: "Upload successful", description: url, variant: "success" });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      const response = await res.json();
      if (!res.ok) {
        throw new Error(response.error ?? "Failed to update order status");
      }

      setOrders((prev) => prev.map((item) => (item.id === orderId ? { ...item, status } : item)));
      toast({ title: "Order status updated", variant: "success" });
    } catch (error) {
      toast({
        title: "Order update failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "error"
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingActorId ? "Edit actor" : "Create actor"}</CardTitle>
          <CardDescription>Manage profile metadata and media URLs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </div>

            <div className="space-y-2">
              <Label>Age range</Label>
              <Select
                value={form.ageRange}
                onChange={(event) =>
                  setForm({
                    ...form,
                    ageRange: event.target.value as AgeRange
                  })
                }
              >
                {Object.values(AgeRange).map((ageRange) => (
                  <option key={ageRange} value={ageRange}>
                    {AGE_RANGE_LABELS[ageRange]}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gender presentation</Label>
              <Select
                value={form.genderPresentation}
                onChange={(event) =>
                  setForm({
                    ...form,
                    genderPresentation: event.target.value as GenderPresentation
                  })
                }
              >
                {Object.values(GenderPresentation).map((genderPresentation) => (
                  <option key={genderPresentation} value={genderPresentation}>
                    {GENDER_LABELS[genderPresentation]}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Bio short</Label>
              <Textarea
                value={form.bioShort}
                onChange={(event) => setForm({ ...form, bioShort: event.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Style tags (comma separated)</Label>
              <Input
                value={form.styleTags}
                onChange={(event) => setForm({ ...form, styleTags: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Vibe tags (comma separated)</Label>
              <Input value={form.vibeTags} onChange={(event) => setForm({ ...form, vibeTags: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Emotion tags (comma separated)</Label>
              <Input
                value={form.emotionTags}
                onChange={(event) => setForm({ ...form, emotionTags: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Languages (comma separated)</Label>
              <Input
                value={form.languages}
                onChange={(event) => setForm({ ...form, languages: event.target.value })}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Image URLs (one per line)</Label>
              <Textarea
                value={form.imageUrls}
                onChange={(event) => setForm({ ...form, imageUrls: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Voice sample URL</Label>
              <Input
                value={form.voiceSampleUrl}
                onChange={(event) => setForm({ ...form, voiceSampleUrl: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Video sample URL</Label>
              <Input
                value={form.videoSampleUrl}
                onChange={(event) => setForm({ ...form, videoSampleUrl: event.target.value })}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm({ ...form, isPublished: event.target.checked })}
            />
            Publish actor
          </label>

          <div className="rounded-lg border border-slate-800 p-3">
            <p className="mb-3 text-sm font-semibold text-slate-200">Media upload (local filesystem)</p>
            <div className="grid gap-2 sm:grid-cols-[150px_1fr_auto]">
              <Select value={uploadKind} onChange={(event) => setUploadKind(event.target.value as typeof uploadKind)}>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
              </Select>
              <Input
                type="file"
                onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
                accept={uploadKind === "image" ? "image/*" : uploadKind === "audio" ? "audio/*" : "video/*"}
              />
              <Button type="button" variant="outline" onClick={uploadMedia} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={submitActor} disabled={isSavingActor}>
              {isSavingActor ? "Saving..." : editingActorId ? "Update actor" : "Create actor"}
            </Button>
            {editingActorId ? (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel edit
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actors ({actors.length})</CardTitle>
          <CardDescription>Publish/unpublish and edit existing actors.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedActors.map((actor) => (
            <div
              key={actor.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-800 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-white">{actor.name}</p>
                <p className="text-xs text-slate-400">
                  {AGE_RANGE_LABELS[actor.ageRange]} | {actor.languages.map((item) => item.toUpperCase()).join(", ")} | {" "}
                  {actor.viewCount} views
                </p>
                <div className="mt-1">
                  <Badge variant={actor.isPublished ? "calm" : "subtle"}>
                    {actor.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setForm(actorToForm(actor));
                    setEditingActorId(actor.id);
                  }}
                >
                  Edit
                </Button>
                <Button type="button" size="sm" variant="secondary" onClick={() => togglePublish(actor)}>
                  {actor.isPublished ? "Unpublish" : "Publish"}
                </Button>
                <Button type="button" size="sm" variant="destructive" onClick={() => deleteActor(actor.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>License plans</CardTitle>
          <CardDescription>MVP uses pre-seeded plans.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {plans.map((plan) => (
            <Badge key={plan.id} variant={plan.isActive ? "accent" : "subtle"}>
              {plan.name}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders ({orders.length})</CardTitle>
          <CardDescription>Basic audit and status updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-slate-800 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">
                    {ORDER_TYPE_LABELS[order.type as keyof typeof ORDER_TYPE_LABELS]} | {order.user.email}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(order.createdAt).toLocaleString()} | Plan: {order.plan?.name ?? "N/A"} | Actor: {" "}
                    {order.actor?.name ?? "N/A"}
                  </p>
                  {order.companyName ? <p className="text-xs text-slate-400">Company: {order.companyName}</p> : null}
                  {order.notes ? <p className="text-xs text-slate-400">Notes: {order.notes}</p> : null}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="subtle">{ORDER_STATUS_LABELS[order.status]}</Badge>
                  <Select
                    value={order.status}
                    onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                    className="w-[150px]"
                  >
                    {Object.values(OrderStatus).map((status) => (
                      <option key={status} value={status}>
                        {ORDER_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
