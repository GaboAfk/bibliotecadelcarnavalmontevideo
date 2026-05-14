'use client'

import { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import {
    Box, IconButton, Tooltip, Button, TextField, Tabs, Tab,
    CircularProgress, MenuItem,
} from '@mui/material'
import { Edit, Delete, Add, ArrowBack, Save, OpenInNew } from '@mui/icons-material'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import {
    fetchCarnavalEdiciones,
    fetchMenciones2026ByEdition,
    fetchPuntajes2026ByEdition,
    updateCarnavalEdicion,
    createMencion,
    updateMencion,
    deleteMencion,
    createPuntaje,
    updatePuntaje,
    deletePuntaje,
} from '@/lib/data-queries'
import { CarnavalEdition, Mencion, Puntaje } from '@/lib/supabase'

const CATEGORIAS_PUNTAJE = ['murgas', 'parodistas', 'sociedades', 'humoristas', 'revistas']
const TIPOS_MENCION = ['directa', 'tecnica_directa', 'tecnica_nominacion', 'colectiva', 'individual']

// ---- inline modal simple ----
function MencionDialog({
    open, initial, editionId, onClose, onSave,
}: {
    open: boolean
    initial: Mencion | null
    editionId: string
    onClose: () => void
    onSave: (m: Mencion) => Promise<void>
}) {
    const blank: Mencion = { id: '', edition_id: editionId, tipo: 'directa', titulo: '', ganadores: [], categoria: null, seccion: null }
    const [form, setForm] = useState<Mencion>(initial ?? blank)
    const [ganadoresText, setGanadoresText] = useState((initial?.ganadores ?? []).join(', '))
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setForm(initial ?? { ...blank })
        setGanadoresText((initial?.ganadores ?? []).join(', '))
    }, [initial, open])

    if (!open) return null

    const set = (k: keyof Mencion, v: string | null) => setForm(f => ({ ...f, [k]: v }))

    const handleSave = async () => {
        const payload = {
            ...form,
            ganadores: ganadoresText.split(',').map(s => s.trim()).filter(Boolean),
        }
        setSaving(true)
        try { await onSave(payload) } finally { setSaving(false) }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md flex flex-col gap-4">
                <h2 className="text-xl font-bold">{initial ? 'Editar mención' : 'Nueva mención'}</h2>
                <TextField select size="small" label="Tipo" value={form.tipo} onChange={e => set('tipo', e.target.value)} fullWidth>
                    {TIPOS_MENCION.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
                <TextField size="small" label="Título" value={form.titulo} onChange={e => set('titulo', e.target.value)} fullWidth />
                <TextField size="small" label="Sección" value={form.seccion ?? ''} onChange={e => set('seccion', e.target.value || null)} fullWidth />
                <TextField size="small" label="Categoría" value={form.categoria ?? ''} onChange={e => set('categoria', e.target.value || null)} fullWidth />
                <TextField size="small" label="Ganadores (separados por coma)" value={ganadoresText} onChange={e => setGanadoresText(e.target.value)} fullWidth />
                <div className="flex gap-2 justify-end">
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSave} disabled={saving}
                        startIcon={saving ? <CircularProgress size={14} color="inherit" /> : <Save />}>
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}

function PuntajeDialog({
    open, initial, editionId, onClose, onSave,
}: {
    open: boolean
    initial: Puntaje | null
    editionId: string
    onClose: () => void
    onSave: (p: Puntaje) => Promise<void>
}) {
    const blank: Puntaje = { id: '', edition_id: editionId, categoria: 'murgas', nombre: '', puesto: 1, puntos: 0 }
    const [form, setForm] = useState<Puntaje>(initial ?? blank)
    const [saving, setSaving] = useState(false)

    useEffect(() => { setForm(initial ?? { ...blank }) }, [initial, open])

    if (!open) return null

    const set = (k: keyof Puntaje, v: string | number) => setForm(f => ({ ...f, [k]: v }))

    const handleSave = async () => {
        setSaving(true)
        try { await onSave(form) } finally { setSaving(false) }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm flex flex-col gap-4">
                <h2 className="text-xl font-bold">{initial ? 'Editar puntaje' : 'Nuevo puntaje'}</h2>
                <TextField select size="small" label="Categoría" value={form.categoria} onChange={e => set('categoria', e.target.value)} fullWidth>
                    {CATEGORIAS_PUNTAJE.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
                <TextField size="small" label="Nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} fullWidth />
                <TextField size="small" type="number" label="Puesto" value={form.puesto} onChange={e => set('puesto', Number(e.target.value))} fullWidth />
                <TextField size="small" type="number" label="Puntos" value={form.puntos} onChange={e => set('puntos', Number(e.target.value))} fullWidth />
                <div className="flex gap-2 justify-end">
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSave} disabled={saving}
                        startIcon={saving ? <CircularProgress size={14} color="inherit" /> : <Save />}>
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function Carnaval2026AdminPage() {
    const [tab, setTab] = useState(0)
    const [edicion, setEdicion] = useState<CarnavalEdition | null>(null)
    const [menciones, setMenciones] = useState<Mencion[]>([])
    const [puntajes, setPuntajes] = useState<Puntaje[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Edition form
    const [edForm, setEdForm] = useState({ title: '', intro: '', image: '', alt: '', badge: '' })
    const [savingEd, setSavingEd] = useState(false)

    // Dialogs
    const [mencionDialog, setMencionDialog] = useState<{ open: boolean; item: Mencion | null }>({ open: false, item: null })
    const [puntajeDialog, setPuntajeDialog] = useState<{ open: boolean; item: Puntaje | null }>({ open: false, item: null })

    useEffect(() => { loadData() }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const ediciones = await fetchCarnavalEdiciones()
            const ed = ediciones.find(e => e.year === 2026) ?? null
            setEdicion(ed)
            if (ed) {
                setEdForm({
                    title: ed.title ?? '',
                    intro: ed.intro ?? '',
                    image: ed.image ?? '',
                    alt: ed.alt ?? '',
                    badge: ed.badge ?? '',
                })
                const [mencionesData, puntajesData] = await Promise.all([
                    fetchMenciones2026ByEdition(ed.id),
                    fetchPuntajes2026ByEdition(ed.id),
                ])
                setMenciones(mencionesData)
                setPuntajes(puntajesData)
            }
        } catch {
            setError('Error al cargar datos')
        } finally {
            setLoading(false)
        }
    }

    const handleSaveEdicion = async () => {
        if (!edicion) return
        setSavingEd(true)
        try {
            await updateCarnavalEdicion(edicion.id, {
                title: edForm.title,
                intro: edForm.intro || null,
                image: edForm.image || null,
                alt: edForm.alt || null,
                badge: edForm.badge || null,
            })
            alert('Edición guardada')
        } catch { alert('Error al guardar') }
        finally { setSavingEd(false) }
    }

    // Menciones
    const mencionColumns = useMemo<MRT_ColumnDef<Mencion>[]>(() => [
        { accessorKey: 'tipo', header: 'Tipo', size: 150 },
        { accessorKey: 'titulo', header: 'Título', size: 200 },
        { accessorKey: 'seccion', header: 'Sección', size: 130 },
        { accessorKey: 'categoria', header: 'Categoría', size: 130 },
        {
            accessorKey: 'ganadores', header: 'Ganadores', size: 250,
            Cell: ({ cell }) => (cell.getValue<string[]>() ?? []).join(', '),
        },
    ], [])

    const handleSaveMencion = async (m: Mencion) => {
        if (m.id) {
            await updateMencion(m.id, m)
        } else {
            await createMencion({ ...m, edition_id: edicion!.id })
        }
        await loadData()
        setMencionDialog({ open: false, item: null })
    }

    const handleDeleteMencion = async (m: Mencion) => {
        if (!window.confirm(`¿Eliminar "${m.titulo}"?`)) return
        await deleteMencion(m.id)
        await loadData()
    }

    // Puntajes
    const puntajeColumns = useMemo<MRT_ColumnDef<Puntaje>[]>(() => [
        { accessorKey: 'categoria', header: 'Categoría', size: 130 },
        { accessorKey: 'puesto', header: 'Puesto', size: 80 },
        { accessorKey: 'nombre', header: 'Nombre', size: 200 },
        { accessorKey: 'puntos', header: 'Puntos', size: 90 },
    ], [])

    const handleSavePuntaje = async (p: Puntaje) => {
        if (p.id) {
            await updatePuntaje(p.id, p)
        } else {
            await createPuntaje({ ...p, edition_id: edicion!.id })
        }
        await loadData()
        setPuntajeDialog({ open: false, item: null })
    }

    const handleDeletePuntaje = async (p: Puntaje) => {
        if (!window.confirm(`¿Eliminar "${p.nombre}"?`)) return
        await deletePuntaje(p.id)
        await loadData()
    }

    if (loading) return <div className="p-6">Cargando...</div>
    if (error) return <div className="p-6 text-red-600">{error}</div>
    if (!edicion) return <div className="p-6">No se encontró la edición 2026.</div>

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outlined" startIcon={<ArrowBack />} href="/admin/dashboard">
                    Volver
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Carnaval 2026</h1>
                <Tooltip title="Ver página">
                    <IconButton component="a" href="/carnaval-2026">
                        <OpenInNew />
                    </IconButton>
                </Tooltip>
            </div>

            <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 3 }}>
                <Tab label="Edición" />
                <Tab label={`Puntajes (${puntajes.length})`} />
                <Tab label={`Menciones (${menciones.length})`} />
            </Tabs>

            {/* Tab Edición */}
            {tab === 0 && (
                <div className="max-w-lg mx-auto flex flex-col gap-4">
                    <TextField label="Título" value={edForm.title} onChange={e => setEdForm(f => ({ ...f, title: e.target.value }))} fullWidth />
                    <TextField label="Intro" value={edForm.intro} onChange={e => setEdForm(f => ({ ...f, intro: e.target.value }))} multiline rows={3} fullWidth />
                    <ImageUploadField
                        label="Imagen hero"
                        value={edForm.image}
                        onChange={url => setEdForm(f => ({ ...f, image: url }))}
                        bucket="media"
                        folder="carnaval-ediciones"
                        slug="2026"
                    />
                    <TextField label="Alt imagen" value={edForm.alt} onChange={e => setEdForm(f => ({ ...f, alt: e.target.value }))} fullWidth />
                    <TextField label="Badge" value={edForm.badge} onChange={e => setEdForm(f => ({ ...f, badge: e.target.value }))} fullWidth />
                    <div>
                        <Button variant="contained" onClick={handleSaveEdicion} disabled={savingEd}
                            startIcon={savingEd ? <CircularProgress size={14} color="inherit" /> : <Save />}>
                            Guardar
                        </Button>
                    </div>
                </div>
            )}

            {/* Tab Puntajes */}
            {tab === 1 && (
                <>
                    <MaterialReactTable
                        columns={puntajeColumns}
                        data={puntajes}
                        enableGlobalFilter={false}
                        enableRowActions
                        positionActionsColumn="last"
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                <Tooltip title="Editar">
                                    <IconButton onClick={() => setPuntajeDialog({ open: true, item: row.original })}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton onClick={() => handleDeletePuntaje(row.original)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <Tooltip title="Agregar puntaje">
                                <IconButton onClick={() => setPuntajeDialog({ open: true, item: null })} color="primary">
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        )}
                        muiTableProps={{ sx: { '& .MuiTableCell-head': { backgroundColor: '#f5f5f5' } } }}
                    />
                    <PuntajeDialog
                        open={puntajeDialog.open}
                        initial={puntajeDialog.item}
                        editionId={edicion.id}
                        onClose={() => setPuntajeDialog({ open: false, item: null })}
                        onSave={handleSavePuntaje}
                    />
                </>
            )}

            {/* Tab Menciones */}
            {tab === 2 && (
                <>
                    <MaterialReactTable
                        columns={mencionColumns}
                        data={menciones}
                        enableGlobalFilter={false}
                        enableRowActions
                        positionActionsColumn="last"
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                <Tooltip title="Editar">
                                    <IconButton onClick={() => setMencionDialog({ open: true, item: row.original })}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton onClick={() => handleDeleteMencion(row.original)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <Tooltip title="Agregar mención">
                                <IconButton onClick={() => setMencionDialog({ open: true, item: null })} color="primary">
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        )}
                        muiTableProps={{ sx: { '& .MuiTableCell-head': { backgroundColor: '#f5f5f5' } } }}
                    />
                    <MencionDialog
                        open={mencionDialog.open}
                        initial={mencionDialog.item}
                        editionId={edicion.id}
                        onClose={() => setMencionDialog({ open: false, item: null })}
                        onSave={handleSaveMencion}
                    />
                </>
            )}
        </div>
    )
}
