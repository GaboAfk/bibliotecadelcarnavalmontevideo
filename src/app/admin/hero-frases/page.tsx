'use client'

import { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, IconButton, Tooltip, Switch, CircularProgress, Button } from '@mui/material'
import { Edit, Delete, Add, Save, OpenInNew } from '@mui/icons-material'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { fetchAllHeroFrases, createHeroFrase, updateHeroFrase, deleteHeroFrase } from '@/lib/data-queries'
import { HeroFrase } from '@/lib/supabase'

const blank: Omit<HeroFrase, 'id' | 'created_at'> = {
    title: '',
    subtitle: null,
    image: '',
    active: true,
    sort_order: null,
}

function FraseDialog({
    open, initial, onClose, onSave,
}: {
    open: boolean
    initial: HeroFrase | null
    onClose: () => void
    onSave: (f: Omit<HeroFrase, 'id' | 'created_at'>) => Promise<void>
}) {
    const [form, setForm] = useState<Omit<HeroFrase, 'id' | 'created_at'>>(
        initial ? { title: initial.title, subtitle: initial.subtitle, image: initial.image, active: initial.active, sort_order: initial.sort_order }
            : { ...blank }
    )
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setForm(
            initial ? { title: initial.title, subtitle: initial.subtitle, image: initial.image, active: initial.active, sort_order: initial.sort_order }
                : { ...blank }
        )
    }, [initial, open])

    if (!open) return null

    const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
        setForm(f => ({ ...f, [k]: v }))

    const handleSave = async () => {
        setSaving(true)
        try { await onSave(form) } finally { setSaving(false) }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg flex flex-col gap-4">
                <h2 className="text-xl font-bold">{initial ? 'Editar frase' : 'Nueva frase'}</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        value={form.title}
                        onChange={e => set('title', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                    <input
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        value={form.subtitle ?? ''}
                        onChange={e => set('subtitle', e.target.value || null)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        value={form.sort_order ?? ''}
                        onChange={e => set('sort_order', e.target.value ? Number(e.target.value) : null)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Switch
                        checked={form.active ?? true}
                        onChange={e => set('active', e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">Activa</span>
                </div>

                <ImageUploadField
                    label="Imagen"
                    value={form.image}
                    onChange={url => set('image', url)}
                    bucket="media"
                    folder="hero-frases"
                />

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

export default function HeroFrasesAdminPage() {
    const [frases, setFrases] = useState<HeroFrase[]>([])
    const [loading, setLoading] = useState(true)
    const [dialog, setDialog] = useState<{ open: boolean; item: HeroFrase | null }>({ open: false, item: null })

    const loadData = async () => {
        setLoading(true)
        try {
            setFrases(await fetchAllHeroFrases())
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadData() }, [])

    const handleSave = async (form: Omit<HeroFrase, 'id' | 'created_at'>) => {
        if (dialog.item) {
            await updateHeroFrase(dialog.item.id, form)
        } else {
            await createHeroFrase(form)
        }
        await loadData()
        setDialog({ open: false, item: null })
    }

    const handleDelete = async (frase: HeroFrase) => {
        if (!window.confirm(`¿Eliminar "${frase.title}"?`)) return
        await deleteHeroFrase(frase.id)
        await loadData()
    }

    const columns = useMemo<MRT_ColumnDef<HeroFrase>[]>(() => [
        { accessorKey: 'sort_order', header: 'Orden', size: 80 },
        { accessorKey: 'title', header: 'Título', size: 200 },
        { accessorKey: 'subtitle', header: 'Subtítulo', size: 200 },
        {
            accessorKey: 'active', header: 'Activa', size: 80,
            Cell: ({ cell }) => cell.getValue<boolean>() ? 'Sí' : 'No',
        },
        {
            accessorKey: 'image', header: 'Imagen', size: 120,
            Cell: ({ cell }) => {
                const url = cell.getValue<string>()
                return url ? (
                    <img src={url} alt="preview" style={{ height: 40, objectFit: 'cover', borderRadius: 4 }} />
                ) : <span className="text-gray-400 text-xs">Sin imagen</span>
            },
        },
    ], [])

    if (loading) return <div className="p-6">Cargando...</div>

    return (
        <div className="p-6">
            <AdminPageHeader title="Frases Hero">
                <Tooltip title="Ver página">
                    <IconButton component="a" href="/">
                        <OpenInNew />
                    </IconButton>
                </Tooltip>
            </AdminPageHeader>

            <MaterialReactTable
                columns={columns}
                data={frases}
                enableGlobalFilter={false}
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                        <Tooltip title="Editar">
                            <IconButton onClick={() => setDialog({ open: true, item: row.original })}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton onClick={() => handleDelete(row.original)} color="error">
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Tooltip title="Nueva frase">
                        <IconButton onClick={() => setDialog({ open: true, item: null })} color="primary">
                            <Add />
                        </IconButton>
                    </Tooltip>
                )}
                muiTableProps={{ sx: { '& .MuiTableCell-head': { backgroundColor: '#f5f5f5' } } }}
            />

            <FraseDialog
                open={dialog.open}
                initial={dialog.item}
                onClose={() => setDialog({ open: false, item: null })}
                onSave={handleSave}
            />
        </div>
    )
}
