"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut, GitBranch, Loader, CheckCircle, XCircle,
    ArrowLeft, Plus, Trash2, Save, Upload, ChevronDown, ChevronUp, ImageIcon
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = { type: "success" | "error" | "loading"; message: string } | null;

interface ShowSection { title: string; content?: string; lyrics?: string; }
interface ShowCredit { role: string; names: string[]; }
interface Show {
    id: string; title: string; image: string;
    year?: number; promotionDate?: string;
    repertoire?: ShowSection[]; gallery?: string[];
    data?: string; credits?: ShowCredit[];
}
interface EntityData {
    name: string; description: string; history: string; shows: Show[];
    image?: string;
    positions?: string[]; discography?: string[]; trivia?: string[];
    gallery?: string[]; information?: string;
}
interface Novedad {
    id: string; color: string; title: string; image: string;
    description: string; content: string; date: string;
}

type View =
    | { type: "categories" }
    | { type: "entity-list"; category: string; label: string }
    | { type: "entity-detail"; category: string; slug: string }
    | { type: "show-detail"; category: string; slug: string; showId: string }
    | { type: "novedad-list" }
    | { type: "novedad-detail"; id: string };

const CATEGORIES = [
    { key: "murgas", label: "Murgas" },
    { key: "humoristas", label: "Humoristas" },
    { key: "parodistas", label: "Parodistas" },
    { key: "revistas", label: "Revistas" },
    { key: "sociedades", label: "Sociedades" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(title: string) {
    return title.toLowerCase().normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

function StatusBadge({ status }: { status: NonNullable<Status> }) {
    if (status.type === "loading") return (
        <span className="flex items-center gap-1 text-sm text-gray-500">
            <Loader size={14} className="animate-spin" />{status.message}
        </span>
    );
    if (status.type === "success") return (
        <span className="flex items-center gap-1 text-sm text-green-600">
            <CheckCircle size={14} />{status.message}
        </span>
    );
    return (
        <span className="flex items-center gap-1 text-sm text-red-600">
            <XCircle size={14} />{status.message}
        </span>
    );
}

function Collapsible({ title, defaultOpen = true, children }: {
    title: string; defaultOpen?: boolean; children: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-gray-100 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="text-sm font-medium text-gray-700">{title}</span>
                {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
            </button>
            {open && <div className="p-4 space-y-4">{children}</div>}
        </div>
    );
}

function Field({ label, value, onChange, textarea, rows }: {
    label: string; value: string;
    onChange: (v: string) => void;
    textarea?: boolean; rows?: number;
}) {
    const cls = "w-full border border-gray-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-black bg-white";
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
            {textarea
                ? <textarea className={cls} rows={rows || 4} value={value} onChange={e => onChange(e.target.value)} />
                : <input className={cls} value={value} onChange={e => onChange(e.target.value)} />
            }
        </div>
    );
}

function ImageField({ label, value, onChange, category, onUpload }: {
    label: string; value: string; onChange: (v: string) => void;
    category: string; onUpload: (file: File) => Promise<string | null>;
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
            <div className="flex gap-2">
                <input
                    className="flex-1 border border-gray-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-black bg-white"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="URL de imagen"
                />
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1 border border-gray-300 px-3 py-2 text-sm rounded hover:bg-gray-50 disabled:opacity-50"
                >
                    {uploading ? <Loader size={14} className="animate-spin" /> : <Upload size={14} />}
                    Subir
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={async e => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setUploading(true);
                        const url = await onUpload(f);
                        if (url) onChange(url);
                        setUploading(false);
                        e.target.value = "";
                    }}
                />
            </div>
            {value && (
                <img src={value} alt="" className="mt-2 h-24 w-auto rounded border border-gray-200 object-cover" onError={e => (e.currentTarget.style.display = "none")} />
            )}
        </div>
    );
}

function StringListField({ label, values, onChange }: {
    label: string; values: string[]; onChange: (v: string[]) => void;
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-500">{label}</label>
                <button type="button" onClick={() => onChange([...values, ""])}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-black">
                    <Plus size={12} /> Agregar
                </button>
            </div>
            <div className="space-y-1">
                {values.map((v, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            className="flex-1 border border-gray-200 px-3 py-1.5 text-sm rounded focus:outline-none focus:border-black bg-white"
                            value={v}
                            onChange={e => { const n = [...values]; n[i] = e.target.value; onChange(n); }}
                        />
                        <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))}
                            className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}


function GalleryField({ label, values, onChange, category, onUpload }: {
    label: string; values: string[]; onChange: (v: string[]) => void;
    category: string; onUpload: (file: File) => Promise<string | null>;
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-500">{label}</label>
                <div className="flex gap-2">
                    <button type="button" onClick={() => onChange([...values, ""])}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-black border border-gray-200 px-2 py-1 rounded">
                        <Plus size={11} /> URL
                    </button>
                    <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-black border border-gray-200 px-2 py-1 rounded disabled:opacity-50">
                        {uploading ? <Loader size={11} className="animate-spin" /> : <Upload size={11} />} Subir
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden"
                        onChange={async e => {
                            const f = e.target.files?.[0]; if (!f) return;
                            setUploading(true);
                            const url = await onUpload(f);
                            if (url) onChange([...values, url]);
                            setUploading(false);
                            e.target.value = "";
                        }}
                    />
                </div>
            </div>
            {values.length === 0 && <p className="text-xs text-gray-300 italic">Sin imágenes</p>}
            <div className="grid grid-cols-3 gap-2">
                {values.map((v, i) => (
                    <div key={i} className="relative group">
                        {v
                            ? <img src={v} alt="" className="w-full h-24 object-cover rounded border border-gray-200"
                                onError={e => (e.currentTarget.style.opacity = "0.3")} />
                            : <div className="w-full h-24 bg-gray-100 rounded border border-dashed border-gray-300 flex items-center justify-center">
                                <ImageIcon size={20} className="text-gray-300" />
                            </div>
                        }
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded transition-all flex flex-col items-end justify-start p-1 gap-1 opacity-0 group-hover:opacity-100">
                            <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))}
                                className="bg-red-500 text-white rounded p-0.5"><Trash2 size={11} /></button>
                        </div>
                        <input
                            className="mt-1 w-full border border-gray-200 px-2 py-1 text-xs rounded focus:outline-none focus:border-black bg-white"
                            value={v}
                            placeholder="URL..."
                            onChange={e => { const n = [...values]; n[i] = e.target.value; onChange(n); }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Show Detail Editor ───────────────────────────────────────────────────────

function ShowEditor({ show, category, onSave, onBack, onUploadImage }: {
    show: Show; category: string;
    onSave: (s: Show) => void;
    onBack: () => void;
    onUploadImage: (file: File, cat: string) => Promise<string | null>;
}) {
    const [s, setS] = useState<Show>(show);
    const u = (patch: Partial<Show>) => setS(prev => ({ ...prev, ...patch }));

    return (
        <div className="space-y-5">
            <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
                <ArrowLeft size={14} /> Volver al espectáculo
            </button>
            <h3 className="text-lg font-semibold">{s.title || "Nuevo espectáculo"}</h3>

            <div className="grid grid-cols-2 gap-4">
                <Field label="Título" value={s.title} onChange={v => u({ id: slugify(v), title: v })} />
                <Field label="Año" value={String(s.year || "")} onChange={v => u({ year: v ? Number(v) : undefined })} />
            </div>
            <Field label="Fecha de promoción (opcional)" value={s.promotionDate || ""} onChange={v => u({ promotionDate: v || undefined })} />
            <ImageField label="Imagen" value={s.image} onChange={v => u({ image: v })} category={category} onUpload={f => onUploadImage(f, category)} />
            <Field label="Datos generales" value={s.data || ""} onChange={v => u({ data: v })} textarea rows={3} />

            {/* Repertoire */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Repertorio</label>
                    <button type="button" onClick={() => u({ repertoire: [...(s.repertoire || []), { title: "" }] })}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-black"><Plus size={12} /> Agregar sección</button>
                </div>
                {(s.repertoire || []).map((sec, i) => (
                    <div key={i} className="border border-gray-100 rounded p-3 mb-2 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Sección {i + 1}</span>
                            <button type="button" onClick={() => u({ repertoire: s.repertoire!.filter((_, j) => j !== i) })}
                                className="text-gray-400 hover:text-red-500"><Trash2 size={13} /></button>
                        </div>
                        <Field label="Título" value={sec.title} onChange={v => {
                            const r = [...(s.repertoire || [])]; r[i] = { ...r[i], title: v }; u({ repertoire: r });
                        }} />
                        <Field label="Contenido" value={sec.content || ""} onChange={v => {
                            const r = [...(s.repertoire || [])]; r[i] = { ...r[i], content: v }; u({ repertoire: r });
                        }} textarea rows={2} />
                        <Field label="Letra" value={sec.lyrics || ""} onChange={v => {
                            const r = [...(s.repertoire || [])]; r[i] = { ...r[i], lyrics: v || undefined }; u({ repertoire: r });
                        }} textarea rows={4} />
                    </div>
                ))}
            </div>

            {/* Credits */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Créditos</label>
                    <button type="button" onClick={() => u({ credits: [...(s.credits || []), { role: "", names: [] }] })}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-black"><Plus size={12} /> Agregar crédito</button>
                </div>
                {(s.credits || []).map((cr, i) => (
                    <div key={i} className="border border-gray-100 rounded p-3 mb-2 space-y-2">
                        <div className="flex items-center justify-between">
                            <Field label="Rol" value={cr.role} onChange={v => {
                                const c = [...(s.credits || [])]; c[i] = { ...c[i], role: v }; u({ credits: c });
                            }} />
                            <button type="button" onClick={() => u({ credits: s.credits!.filter((_, j) => j !== i) })}
                                className="ml-2 mt-4 text-gray-400 hover:text-red-500"><Trash2 size={13} /></button>
                        </div>
                        <StringListField label="Personas" values={cr.names} onChange={v => {
                            const c = [...(s.credits || [])]; c[i] = { ...c[i], names: v }; u({ credits: c });
                        }} />
                    </div>
                ))}
            </div>

            <GalleryField label="Galería" values={s.gallery || []} onChange={v => u({ gallery: v })} category={category} onUpload={f => onUploadImage(f, category)} />

            <button onClick={() => onSave(s)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 text-sm rounded hover:bg-gray-800">
                <Save size={14} /> Guardar espectáculo
            </button>
        </div>
    );
}


// ─── Entity Detail Editor ─────────────────────────────────────────────────────

function EntityEditor({ slug, category, data, onSave, onBack, onUploadImage }: {
    slug: string; category: string; data: EntityData;
    onSave: (slug: string, d: EntityData) => void;
    onBack: () => void;
    onUploadImage: (file: File, cat: string) => Promise<string | null>;
}) {
    const [entity, setEntity] = useState<EntityData>(data);
    const [editingShow, setEditingShow] = useState<string | null>(null);
    const u = (patch: Partial<EntityData>) => setEntity(prev => ({ ...prev, ...patch }));
    const thumb = entity.image || entity.shows?.[0]?.image || null;

    if (editingShow !== null) {
        const show = entity.shows.find(s => s.id === editingShow) || {
            id: "", title: "", image: "", year: undefined
        };
        return (
            <ShowEditor
                show={show}
                category={category}
                onUploadImage={onUploadImage}
                onBack={() => setEditingShow(null)}
                onSave={saved => {
                    const exists = entity.shows.find(s => s.id === saved.id || s.id === editingShow);
                    const shows = exists
                        ? entity.shows.map(s => (s.id === editingShow ? saved : s))
                        : [...entity.shows, saved];
                    u({ shows });
                    setEditingShow(null);
                }}
            />
        );
    }

    return (
        <div className="space-y-4">
            <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
                <ArrowLeft size={14} /> Volver al listado
            </button>

            {/* Header con miniatura */}
            <div className="flex items-center gap-4">
                {thumb
                    ? <img src={thumb} alt="" className="w-20 h-20 object-cover rounded-lg border border-gray-200" onError={e => (e.currentTarget.style.display = "none")} />
                    : <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200"><ImageIcon size={24} className="text-gray-300" /></div>
                }
                <div>
                    <h3 className="text-lg font-semibold">{entity.name}</h3>
                    <p className="text-xs text-gray-400">{entity.shows.length} espectáculo{entity.shows.length !== 1 ? "s" : ""}</p>
                </div>
            </div>

            <Collapsible title="Información general">
                <Field label="Nombre" value={entity.name} onChange={v => u({ name: v })} />
                <ImageField label="Imagen principal" value={entity.image || ""} onChange={v => u({ image: v })} category={category} onUpload={f => onUploadImage(f, category)} />
                <Field label="Descripción" value={entity.description} onChange={v => u({ description: v })} textarea rows={3} />
                <Field label="Historia" value={entity.history} onChange={v => u({ history: v })} textarea rows={4} />
                <Field label="Información adicional" value={entity.information || ""} onChange={v => u({ information: v })} textarea rows={3} />
            </Collapsible>

            <Collapsible title="Listas" defaultOpen={false}>
                <StringListField label="Posiciones" values={entity.positions || []} onChange={v => u({ positions: v })} />
                <StringListField label="Discografía" values={entity.discography || []} onChange={v => u({ discography: v })} />
                <StringListField label="Trivia" values={entity.trivia || []} onChange={v => u({ trivia: v })} />
                <GalleryField label="Galería" values={entity.gallery || []} onChange={v => u({ gallery: v })} category={category} onUpload={f => onUploadImage(f, category)} />
            </Collapsible>

            {/* Shows */}
            <Collapsible title={`Espectáculos (${entity.shows.length})`}>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => {
                            const newShow: Show = { id: `nuevo-${Date.now()}`, title: "Nuevo espectáculo", image: "" };
                            u({ shows: [...entity.shows, newShow] });
                            setEditingShow(newShow.id);
                        }}
                        className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50"
                    >
                        <Plus size={14} /> Agregar espectáculo
                    </button>
                </div>
                {entity.shows.length === 0 && (
                    <p className="text-sm text-gray-400 italic">Sin espectáculos cargados</p>
                )}
                {entity.shows.map(show => (
                    <div key={show.id} className="flex items-center gap-3 border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                        {show.image
                            ? <img src={show.image} alt="" className="w-14 h-14 object-cover rounded" onError={e => (e.currentTarget.style.display = "none")} />
                            : <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center"><ImageIcon size={16} className="text-gray-400" /></div>
                        }
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{show.title}</p>
                            <p className="text-xs text-gray-400">{show.year || show.promotionDate || "Sin año"}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingShow(show.id)}
                                className="text-sm text-gray-500 hover:text-black border border-gray-200 px-3 py-1 rounded">
                                Editar
                            </button>
                            <button onClick={() => u({ shows: entity.shows.filter(s => s.id !== show.id) })}
                                className="text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
                        </div>
                    </div>
                ))}
            </Collapsible>

            <button onClick={() => onSave(slug, entity)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 text-sm rounded hover:bg-gray-800">
                <Save size={14} /> Guardar cambios
            </button>
        </div>
    );
}


// ─── Novedad Editor ───────────────────────────────────────────────────────────

function NovedadEditor({ novedad, onSave, onBack, onUploadImage }: {
    novedad: Novedad;
    onSave: (n: Novedad) => void;
    onBack: () => void;
    onUploadImage: (file: File, cat: string) => Promise<string | null>;
}) {
    const [n, setN] = useState<Novedad>(novedad);
    const u = (patch: Partial<Novedad>) => setN(prev => ({ ...prev, ...patch }));

    const COLORS = [
        { label: "Naranja", value: "var(--color-carnaval-orange)" },
        { label: "Amarillo", value: "var(--color-carnaval-yellow)" },
        { label: "Verde", value: "var(--color-carnaval-green)" },
        { label: "Rosa", value: "var(--color-carnaval-pink)" },
        { label: "Violeta", value: "var(--color-carnaval-purple)" },
        { label: "Rosa claro", value: "var(--color-carnaval-rose)" },
    ];

    return (
        <div className="space-y-5">
            <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
                <ArrowLeft size={14} /> Volver a novedades
            </button>
            <h3 className="text-lg font-semibold">{n.title || "Nueva novedad"}</h3>

            <Field label="Título" value={n.title} onChange={v => u({ id: slugify(v), title: v })} />
            <Field label="Fecha (YYYY-MM-DD)" value={n.date} onChange={v => u({ date: v })} />

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Color</label>
                <div className="flex gap-2 flex-wrap">
                    {COLORS.map(c => (
                        <button
                            key={c.value}
                            type="button"
                            onClick={() => u({ color: c.value })}
                            className={`px-3 py-1 text-xs rounded border-2 transition-all ${n.color === c.value ? "border-black" : "border-transparent"}`}
                            style={{ backgroundColor: c.value === n.color ? "#f5f5f5" : undefined }}
                        >
                            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: c.value.includes("var") ? undefined : c.value, background: c.value }} />
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            <ImageField label="Imagen" value={n.image} onChange={v => u({ image: v })} category="novedades" onUpload={f => onUploadImage(f, "novedades")} />
            <Field label="Descripción breve" value={n.description} onChange={v => u({ description: v })} textarea rows={2} />
            <Field label="Contenido completo" value={n.content} onChange={v => u({ content: v })} textarea rows={6} />

            <button onClick={() => onSave(n)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 text-sm rounded hover:bg-gray-800">
                <Save size={14} /> Guardar novedad
            </button>
        </div>
    );
}

// ─── Entity List ──────────────────────────────────────────────────────────────

function EntityList({ category, label, onSelect, onAdd, onDelete, onBack }: {
    category: string; label: string;
    onSelect: (slug: string) => void;
    onAdd: (name: string) => void;
    onDelete: (slug: string) => void;
    onBack: () => void;
}) {
    const [data, setData] = useState<Record<string, EntityData> | null>(null);
    const [available, setAvailable] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        fetch(`/api/admin/entities?category=${category}`)
            .then(r => r.json())
            .then(d => { setData(d.data); setAvailable(d.available || []); setLoading(false); });
    }, [category]);

    const entries = Object.entries(data || {}).filter(([, v]) =>
        v.name.toLowerCase().includes(search.toLowerCase())
    );

    // Names already in data
    const existingNames = new Set(Object.values(data || {}).map(e => e.name));
    // Suggestions: names in available but not yet in data
    const suggestions = available.filter(n => !existingNames.has(n));
    // Filtered suggestions in modal
    const filteredSuggestions = suggestions.filter(n =>
        n.toLowerCase().includes(newName.toLowerCase())
    );

    const handleAdd = () => {
        const name = newName.trim() || "Nueva entrada";
        onAdd(name);
        setShowAddModal(false);
        setNewName("");
    };

    return (
        <div className="space-y-4">
            {/* Add modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Agregar a {label}</h3>
                            <button onClick={() => { setShowAddModal(false); setNewName(""); }}
                                className="text-gray-400 hover:text-black"><XCircle size={18} /></button>
                        </div>
                        <input
                            autoFocus
                            placeholder="Nombre..."
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
                            className="w-full border border-gray-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-black"
                        />
                        {filteredSuggestions.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-400 mb-2">Sugerencias del alfabeto (no cargadas aún):</p>
                                <div className="max-h-52 overflow-y-auto space-y-1">
                                    {filteredSuggestions.map(name => (
                                        <button
                                            key={name}
                                            onClick={() => { onAdd(name); setShowAddModal(false); setNewName(""); }}
                                            className="w-full text-left text-sm px-3 py-2 rounded hover:bg-gray-100 border border-gray-100"
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {filteredSuggestions.length === 0 && newName && (
                            <p className="text-xs text-gray-400">No hay sugerencias. Se creará una entrada nueva con ese nombre.</p>
                        )}
                        <div className="flex gap-2 justify-end pt-1">
                            <button onClick={() => { setShowAddModal(false); setNewName(""); }}
                                className="text-sm border border-gray-200 px-4 py-2 rounded hover:bg-gray-50">Cancelar</button>
                            <button onClick={handleAdd}
                                className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                                <Plus size={13} className="inline mr-1" />Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
                <ArrowLeft size={14} /> Volver a categorías
            </button>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{label}</h2>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{Object.keys(data || {}).length} entradas</span>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800"
                    >
                        <Plus size={14} /> Nueva
                    </button>
                </div>
            </div>
            <input
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-black"
            />
            {loading && <div className="flex justify-center py-8"><Loader className="animate-spin text-gray-400" /></div>}
            <div className="space-y-2">
                {entries.map(([slug, entity]) => {
                    const complete = !!(entity.name && entity.description && entity.history);
                    const thumb = entity.image || entity.shows?.[0]?.image || null;
                    return (
                        <div key={slug} className="flex items-center gap-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden">
                            <button
                                onClick={() => onSelect(slug)}
                                className="flex items-center gap-3 flex-1 p-3 text-left min-w-0"
                            >
                                {thumb
                                    ? <img src={thumb} alt="" className="w-14 h-14 object-cover rounded flex-shrink-0" onError={e => (e.currentTarget.style.display = "none")} />
                                    : <div className="w-14 h-14 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center"><ImageIcon size={18} className="text-gray-300" /></div>
                                }
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${complete ? "bg-green-400" : "bg-yellow-400"}`} />
                                        <p className="font-medium text-sm">{entity.name}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate mt-0.5">{entity.description || "Sin descripción"}</p>
                                    <p className="text-xs text-gray-300 mt-0.5">{entity.shows.length} espectáculo{entity.shows.length !== 1 ? "s" : ""}</p>
                                </div>
                            </button>
                            <div className="pr-3 flex-shrink-0">
                                {confirmDelete === slug ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">¿Eliminar?</span>
                                        <button onClick={() => { onDelete(slug); setConfirmDelete(null); }}
                                            className="text-xs bg-red-500 text-white px-2 py-1 rounded">Sí</button>
                                        <button onClick={() => setConfirmDelete(null)}
                                            className="text-xs border border-gray-200 px-2 py-1 rounded">No</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setConfirmDelete(slug)}
                                        className="text-gray-300 hover:text-red-400 transition-colors">
                                        <Trash2 size={15} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Novedad List ─────────────────────────────────────────────────────────────

function NovedadList({ onSelect, onBack }: {
    onSelect: (id: string) => void;
    onBack: () => void;
}) {
    const [data, setData] = useState<Novedad[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/entities?category=novedades")
            .then(r => r.json())
            .then(d => { setData(d.data); setLoading(false); });
    }, []);

    return (
        <div className="space-y-4">
            <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
                <ArrowLeft size={14} /> Volver a categorías
            </button>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Novedades</h2>
                <span className="text-sm text-gray-400">{(data || []).length} novedades</span>
            </div>
            {loading && <div className="flex justify-center py-8"><Loader className="animate-spin text-gray-400" /></div>}
            <div className="space-y-2">
                {(data || []).map(n => (
                    <button
                        key={n.id}
                        onClick={() => onSelect(n.id)}
                        className="w-full flex items-center gap-4 border border-gray-100 rounded-lg p-4 hover:bg-gray-50 text-left transition-colors"
                    >
                        {n.image
                            ? <img src={n.image} alt="" className="w-12 h-12 object-cover rounded flex-shrink-0" onError={e => (e.currentTarget.style.display = "none")} />
                            : <div className="w-12 h-12 rounded flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: n.color }}><ImageIcon size={16} className="text-white" /></div>
                        }
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{n.title}</p>
                            <p className="text-xs text-gray-400 truncate">{n.description}</p>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">{n.date}</span>
                    </button>
                ))}
            </div>
            <button
                onClick={() => onSelect("__new__")}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg p-4 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
            >
                <Plus size={16} /> Nueva novedad
            </button>
        </div>
    );
}


// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const router = useRouter();
    const [view, setView] = useState<View>({ type: "categories" });
    const [categoryData, setCategoryData] = useState<Record<string, Record<string, EntityData>>>({});
    const [novedadesData, setNovedadesData] = useState<Novedad[]>([]);
    const [saveStatus, setSaveStatus] = useState<Status>(null);
    const [deployStatus, setDeployStatus] = useState<Status>(null);
    const [deployLog, setDeployLog] = useState("");
    const [commitMessage, setCommitMessage] = useState("Admin: update data");
    const [showDeploy, setShowDeploy] = useState(false);

    useEffect(() => {
        fetch("/api/admin/verify").then(r => {
            if (!r.ok) router.replace("/admin");
        });
    }, [router]);

    const uploadImage = useCallback(async (file: File, cat: string): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", cat);
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            const data = await res.json();
            return res.ok ? data.url : null;
        } catch { return null; }
    }, []);

    const loadCategory = useCallback(async (category: string) => {
        if (categoryData[category]) return categoryData[category];
        const res = await fetch(`/api/admin/entities?category=${category}`);
        const d = await res.json();
        setCategoryData(prev => ({ ...prev, [category]: d.data }));
        return d.data as Record<string, EntityData>;
    }, [categoryData]);

    const loadNovedades = useCallback(async () => {
        if (novedadesData.length > 0) return novedadesData;
        const res = await fetch("/api/admin/entities?category=novedades");
        const d = await res.json();
        setNovedadesData(d.data);
        return d.data as Novedad[];
    }, [novedadesData]);

    const saveEntity = async (category: string, slug: string, entity: EntityData) => {
        const updated = { ...categoryData[category], [slug]: entity };
        setSaveStatus({ type: "loading", message: "Guardando..." });
        const res = await fetch("/api/admin/entities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, data: updated }),
        });
        if (res.ok) {
            setCategoryData(prev => ({ ...prev, [category]: updated }));
            setSaveStatus({ type: "success", message: "Guardado correctamente" });
            setTimeout(() => setSaveStatus(null), 3000);
        } else {
            setSaveStatus({ type: "error", message: "Error al guardar" });
        }
    };

    const saveNovedad = async (novedad: Novedad) => {
        const current = novedadesData.length > 0 ? novedadesData : await loadNovedades();
        const exists = current.find(n => n.id === novedad.id);
        const updated = exists ? current.map(n => n.id === novedad.id ? novedad : n) : [...current, novedad];
        setSaveStatus({ type: "loading", message: "Guardando..." });
        const res = await fetch("/api/admin/entities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: "novedades", data: updated }),
        });
        if (res.ok) {
            setNovedadesData(updated);
            setSaveStatus({ type: "success", message: "Guardado correctamente" });
            setTimeout(() => setSaveStatus(null), 3000);
        } else {
            setSaveStatus({ type: "error", message: "Error al guardar" });
        }
    };

    const handleDeploy = async () => {
        setDeployStatus({ type: "loading", message: "Ejecutando build y push..." });
        setDeployLog("");
        try {
            const res = await fetch("/api/admin/deploy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ commitMessage }),
            });
            const data = await res.json();
            if (!res.ok) {
                setDeployStatus({ type: "error", message: "Error durante el deploy" });
                setDeployLog(data.stderr || data.error || "");
            } else {
                setDeployStatus({ type: "success", message: "Deploy exitoso" });
                setDeployLog(data.pushOutput || data.buildOutput || "");
            }
        } catch {
            setDeployStatus({ type: "error", message: "Error de conexión" });
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.replace("/admin");
    };

    // ── Breadcrumb ──
    const breadcrumb: { label: string; onClick: () => void }[] = [
        { label: "Categorías", onClick: () => setView({ type: "categories" }) },
    ];
    if (view.type === "entity-list") {
        breadcrumb.push({ label: view.label, onClick: () => { } });
    }
    if (view.type === "entity-detail") {
        const cat = CATEGORIES.find(c => c.key === view.category);
        breadcrumb.push({ label: cat?.label || view.category, onClick: () => setView({ type: "entity-list", category: view.category, label: cat?.label || "" }) });
        breadcrumb.push({ label: categoryData[view.category]?.[view.slug]?.name || view.slug, onClick: () => { } });
    }
    if (view.type === "novedad-list") {
        breadcrumb.push({ label: "Novedades", onClick: () => { } });
    }
    if (view.type === "novedad-detail") {
        breadcrumb.push({ label: "Novedades", onClick: () => setView({ type: "novedad-list" }) });
        const nov = novedadesData.find(n => n.id === view.id);
        breadcrumb.push({ label: nov?.title || "Nueva novedad", onClick: () => { } });
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top bar */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <h1 className="text-lg font-serif font-bold">Panel Admin</h1>
                    <p className="text-xs text-gray-400">Biblioteca del Carnaval Montevideano</p>
                </div>
                <div className="flex items-center gap-4">
                    {saveStatus && <StatusBadge status={saveStatus} />}
                    <button
                        onClick={() => setShowDeploy(p => !p)}
                        className="flex items-center gap-2 text-sm border border-gray-600 px-3 py-1.5 rounded hover:border-white transition-colors"
                    >
                        <GitBranch size={14} /> Deploy
                    </button>
                    <button onClick={handleLogout}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <LogOut size={14} /> Salir
                    </button>
                </div>
            </div>

            {/* Deploy panel */}
            {showDeploy && (
                <div className="bg-gray-900 text-white px-6 py-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={commitMessage}
                            onChange={e => setCommitMessage(e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:border-white text-white"
                            placeholder="Mensaje del commit"
                        />
                        <button
                            onClick={handleDeploy}
                            disabled={deployStatus?.type === "loading"}
                            className="flex items-center gap-2 bg-white text-black px-4 py-2 text-sm rounded hover:bg-gray-200 disabled:opacity-50"
                        >
                            {deployStatus?.type === "loading"
                                ? <><Loader size={14} className="animate-spin" /> Procesando...</>
                                : <><GitBranch size={14} /> Build & Push</>}
                        </button>
                    </div>
                    {deployStatus && <StatusBadge status={deployStatus} />}
                    {deployLog && (
                        <pre className="bg-black text-green-400 text-xs p-3 rounded max-h-48 overflow-y-auto whitespace-pre-wrap">
                            {deployLog}
                        </pre>
                    )}
                </div>
            )}

            {/* Breadcrumb */}
            {breadcrumb.length > 1 && (
                <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-1 text-sm text-gray-500">
                    {breadcrumb.map((b, i) => (
                        <span key={i} className="flex items-center gap-1">
                            {i > 0 && <span className="text-gray-300">/</span>}
                            {i < breadcrumb.length - 1
                                ? <button onClick={b.onClick} className="hover:text-black">{b.label}</button>
                                : <span className="text-gray-800 font-medium">{b.label}</span>
                            }
                        </span>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* Categories home */}
                {view.type === "categories" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Categorías</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.key}
                                    onClick={async () => {
                                        await loadCategory(cat.key);
                                        setView({ type: "entity-list", category: cat.key, label: cat.label });
                                    }}
                                    className="bg-white rounded-lg border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-semibold">{cat.label}</h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {categoryData[cat.key]
                                            ? `${Object.keys(categoryData[cat.key]).length} entradas`
                                            : "Haz click para cargar"}
                                    </p>
                                </button>
                            ))}
                            <button
                                onClick={async () => {
                                    await loadNovedades();
                                    setView({ type: "novedad-list" });
                                }}
                                className="bg-white rounded-lg border border-gray-100 p-6 text-left hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-semibold">Novedades</h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    {novedadesData.length > 0 ? `${novedadesData.length} novedades` : "Haz click para cargar"}
                                </p>
                            </button>
                        </div>
                    </div>
                )}

                {/* Entity list */}
                {view.type === "entity-list" && (
                    <EntityList
                        category={view.category}
                        label={view.label}
                        onBack={() => setView({ type: "categories" })}
                        onSelect={async slug => {
                            await loadCategory(view.category);
                            setView({ type: "entity-detail", category: view.category, slug });
                        }}
                        onAdd={async (name: string) => {
                            const cat = view.category;
                            const current = await loadCategory(cat);
                            const newSlug = slugify(name) || `nueva-entrada-${Date.now()}`;
                            const blank: EntityData = {
                                name, description: "", history: "", shows: [],
                                positions: [], discography: [], trivia: [], gallery: [],
                            };
                            const updated = { ...current, [newSlug]: blank };
                            setCategoryData(prev => ({ ...prev, [cat]: updated }));
                            setView({ type: "entity-detail", category: cat, slug: newSlug });
                        }}
                        onDelete={async slug => {
                            const cat = view.category;
                            const current = categoryData[cat] || await loadCategory(cat);
                            const updated = { ...current };
                            delete updated[slug];
                            setSaveStatus({ type: "loading", message: "Eliminando..." });
                            const res = await fetch("/api/admin/entities", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ category: cat, data: updated }),
                            });
                            if (res.ok) {
                                setCategoryData(prev => ({ ...prev, [cat]: updated }));
                                setSaveStatus({ type: "success", message: "Eliminado" });
                                setTimeout(() => setSaveStatus(null), 3000);
                            } else {
                                setSaveStatus({ type: "error", message: "Error al eliminar" });
                            }
                        }}
                    />
                )}

                {/* Entity detail */}
                {view.type === "entity-detail" && categoryData[view.category]?.[view.slug] && (
                    <EntityEditor
                        slug={view.slug}
                        category={view.category}
                        data={categoryData[view.category][view.slug]}
                        onUploadImage={uploadImage}
                        onBack={() => setView({ type: "entity-list", category: view.category, label: CATEGORIES.find(c => c.key === view.category)?.label || "" })}
                        onSave={(slug, entity) => {
                            saveEntity(view.category, slug, entity);
                        }}
                    />
                )}

                {/* Novedad list */}
                {view.type === "novedad-list" && (
                    <NovedadList
                        onBack={() => setView({ type: "categories" })}
                        onSelect={id => {
                            if (id === "__new__") {
                                const blank: Novedad = {
                                    id: `nueva-${Date.now()}`, color: "var(--color-carnaval-orange)",
                                    title: "", image: "", description: "", content: "", date: new Date().toISOString().slice(0, 10),
                                };
                                setNovedadesData(prev => [...prev, blank]);
                                setView({ type: "novedad-detail", id: blank.id });
                            } else {
                                setView({ type: "novedad-detail", id });
                            }
                        }}
                    />
                )}

                {/* Novedad detail */}
                {view.type === "novedad-detail" && (() => {
                    const nov = novedadesData.find(n => n.id === view.id);
                    if (!nov) return null;
                    return (
                        <NovedadEditor
                            novedad={nov}
                            onUploadImage={uploadImage}
                            onBack={() => setView({ type: "novedad-list" })}
                            onSave={saveNovedad}
                        />
                    );
                })()}
            </div>
        </div>
    );
}
