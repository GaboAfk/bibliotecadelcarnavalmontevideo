'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from '@mui/material'
import { Close, Save, Add, Delete, Edit, DragHandle } from '@mui/icons-material'
import { Show, Agrupacion, Staff, ShowRepertory } from '@/lib/supabase'
import { ImageUploadField } from './ImageUploadField'
import {
  fetchStaffByShow,
  fetchShowRepertory,
  fetchAllStaffByAgrupacion,
  createStaff,
  updateStaff,
  deleteStaff,
  updateStaff as updateStaffOrder,
  createShowRepertoryItem,
  updateShowRepertoryItem,
  deleteShowRepertoryItem,
} from '@/lib/data-queries'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ─── Gallery ────────────────────────────────────────────────────────────────

function GalleryField({ values, onChange, slug }: { values: string[]; onChange: (v: string[]) => void; slug: string }) {
  const handleChange = (i: number, url: string) => { const n = [...values]; n[i] = url; onChange(n) }
  const handleAdd = () => onChange([...values, ''])
  const handleRemove = (i: number) => onChange(values.filter((_, idx) => idx !== i))

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Galería</Typography>
      {values.map((url, i) => (
        <Box key={i} sx={{ mb: 2, position: 'relative' }}>
          <IconButton size="small" color="error" onClick={() => handleRemove(i)}
            sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
            <Delete fontSize="small" />
          </IconButton>
          <ImageUploadField label={`Imagen ${i + 1}`} value={url}
            onChange={(u) => handleChange(i, u)} bucket="media" folder="shows" slug={slug} />
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={handleAdd} variant="outlined" size="small">Agregar imagen</Button>
    </Box>
  )
}

// ─── Staff Tab ───────────────────────────────────────────────────────────────

const EMPTY_STAFF = (showId: string, agrupacionId: string): Omit<Staff, 'id'> => ({
  show_id: showId, agrupacion_id: agrupacionId, category: '', role: '', names: [], order_index: null,
})

interface SortableStaffRowProps {
  staff: Staff
  onEdit: (s: Staff) => void
  onDelete: (id: string) => void
}

function SortableStaffRow({ staff, onEdit, onDelete }: SortableStaffRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: staff.id })
  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
    >
      <TableCell sx={{ width: 36, cursor: 'grab', color: 'text.secondary' }} {...attributes} {...listeners}>
        <DragHandle fontSize="small" />
      </TableCell>
      <TableCell>{staff.category}</TableCell>
      <TableCell>{staff.role}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {staff.names.map((n, i) => <Chip key={i} label={n} size="small" />)}
        </Box>
      </TableCell>
      <TableCell>
        <IconButton size="small" onClick={() => onEdit(staff)}><Edit fontSize="small" /></IconButton>
        <IconButton size="small" color="error" onClick={() => onDelete(staff.id)}><Delete fontSize="small" /></IconButton>
      </TableCell>
    </TableRow>
  )
}

function StaffTab({ showId, agrupacionId }: { showId: string; agrupacionId: string }) {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [allStaff, setAllStaff] = useState<Staff[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Staff | null>(null)
  const [form, setForm] = useState<Omit<Staff, 'id'>>(EMPTY_STAFF(showId, agrupacionId))
  const [nameInput, setNameInput] = useState('')
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor))

  // Suggestions derived from all agrupacion staff
  const suggestions = useMemo(() => {
    const categories = [...new Set(allStaff.map((s) => s.category).filter(Boolean))]
    const roles = [...new Set(allStaff.map((s) => s.role).filter(Boolean))]
    const names = [...new Set(allStaff.flatMap((s) => s.names))]
    return { categories, roles, names }
  }, [allStaff])

  useEffect(() => {
    fetchStaffByShow(showId).then((data) => setStaffList(sortByOrder(data))).catch(console.error)
    fetchAllStaffByAgrupacion(agrupacionId).then(setAllStaff).catch(console.error)
  }, [showId, agrupacionId])

  const sortByOrder = (list: Staff[]) =>
    [...list].sort((a, b) => (a.order_index ?? 999) - (b.order_index ?? 999))

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_STAFF(showId, agrupacionId))
    setNameInput('')
    setDialogOpen(true)
  }

  const openEdit = (s: Staff) => {
    setEditing(s)
    setForm({ show_id: s.show_id, agrupacion_id: s.agrupacion_id, category: s.category, role: s.role, names: [...s.names], order_index: s.order_index })
    setNameInput('')
    setDialogOpen(true)
  }

  const handleAddName = (name?: string) => {
    const t = (name ?? nameInput).trim()
    if (!t || form.names.includes(t)) return
    setForm((f) => ({ ...f, names: [...f.names, t] }))
    setNameInput('')
  }

  const handleRemoveName = (i: number) => setForm((f) => ({ ...f, names: f.names.filter((_, idx) => idx !== i) }))

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await updateStaff(editing.id, form)
      } else {
        const maxOrder = staffList.length > 0 ? Math.max(...staffList.map((s) => s.order_index ?? 0)) : -1
        await createStaff({ ...form, order_index: maxOrder + 1 })
      }
      const updated = await fetchStaffByShow(showId)
      setStaffList(sortByOrder(updated))
      setDialogOpen(false)
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este integrante?')) return
    await deleteStaff(id)
    setStaffList((prev) => prev.filter((s) => s.id !== id))
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = staffList.findIndex((s) => s.id === active.id)
    const newIndex = staffList.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(staffList, oldIndex, newIndex)

    // Assign new order_index sequentially
    const updated = reordered.map((s, i) => ({ ...s, order_index: i }))
    setStaffList(updated) // optimistic update

    // Persist in background
    await Promise.all(updated.map((s) => updateStaffOrder(s.id, { order_index: s.order_index })))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button startIcon={<Add />} variant="outlined" size="small" onClick={openCreate}>
          Agregar integrante
        </Button>
      </Box>

      {staffList.length === 0 ? (
        <Typography variant="body2" color="text.secondary">Sin integrantes registrados</Typography>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={staffList.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 36 }} />
                  <TableCell>Categoría</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {staffList.map((s) => (
                  <SortableStaffRow key={s.id} staff={s} onEdit={openEdit} onDelete={handleDelete} />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? 'Editar integrante' : 'Agregar integrante'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Autocomplete
            freeSolo
            options={suggestions.categories}
            value={form.category}
            onInputChange={(_, val) => setForm((f) => ({ ...f, category: val }))}
            renderInput={(params) => <TextField {...params} label="Categoría" size="small" fullWidth />}
          />
          <Autocomplete
            freeSolo
            options={suggestions.roles}
            value={form.role}
            onInputChange={(_, val) => setForm((f) => ({ ...f, role: val }))}
            renderInput={(params) => <TextField {...params} label="Rol" size="small" fullWidth />}
          />
          <TextField
            label="Orden" size="small" type="number" fullWidth
            value={form.order_index ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, order_index: e.target.value ? Number(e.target.value) : null }))}
          />
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Nombres</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Autocomplete
                freeSolo
                options={suggestions.names.filter((n) => !form.names.includes(n))}
                inputValue={nameInput}
                onInputChange={(_, val) => setNameInput(val)}
                onChange={(_, val) => { if (val) handleAddName(val as string) }}
                sx={{ flex: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params} size="small" placeholder="Agregar nombre"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddName() } }}
                  />
                )}
              />
              <IconButton color="primary" onClick={() => handleAddName()}><Add /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {form.names.map((n, i) => (
                <Chip key={i} label={n} size="small" onDelete={() => handleRemoveName(i)} />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving} startIcon={<Save />}>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

// ─── Repertory Tab ───────────────────────────────────────────────────────────

const EMPTY_REPERTORY = (showId: string): Omit<ShowRepertory, 'id'> => ({
  show_id: showId, title: '', content: null, lyrics: null, sort_order: null,
})

function RepertoryTab({ showId }: { showId: string }) {
  const [list, setList] = useState<ShowRepertory[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ShowRepertory | null>(null)
  const [form, setForm] = useState<Omit<ShowRepertory, 'id'>>(EMPTY_REPERTORY(showId))
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchShowRepertory(showId).then(setList).catch(console.error)
  }, [showId])

  const openCreate = () => { setEditing(null); setForm(EMPTY_REPERTORY(showId)); setDialogOpen(true) }
  const openEdit = (item: ShowRepertory) => {
    setEditing(item)
    setForm({ show_id: item.show_id, title: item.title, content: item.content, lyrics: item.lyrics, sort_order: item.sort_order })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editing) {
        await updateShowRepertoryItem(editing.id, form)
      } else {
        await createShowRepertoryItem(form)
      }
      setList(await fetchShowRepertory(showId))
      setDialogOpen(false)
    } catch (e) { console.error(e) } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar esta pieza del repertorio?')) return
    await deleteShowRepertoryItem(id)
    setList((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button startIcon={<Add />} variant="outlined" size="small" onClick={openCreate}>Agregar pieza</Button>
      </Box>

      {list.length === 0 ? (
        <Typography variant="body2" color="text.secondary">Sin repertorio registrado</Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Orden</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Contenido</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.sort_order ?? '—'}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.content ?? '—'}
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => openEdit(item)}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><Delete fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? 'Editar pieza' : 'Agregar pieza'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Título" size="small" fullWidth required
            value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <TextField label="Orden" size="small" type="number" fullWidth
            value={form.sort_order ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value ? Number(e.target.value) : null }))} />
          <TextField label="Contenido" fullWidth multiline rows={4}
            value={form.content ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value || null }))} />
          <TextField label="Letra" fullWidth multiline rows={6}
            value={form.lyrics ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, lyrics: e.target.value || null }))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving} startIcon={<Save />}>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

// ─── Main Modal ──────────────────────────────────────────────────────────────

interface ShowModalProps {
  open: boolean
  show: Show | null
  agrupaciones: Agrupacion[]
  onClose: () => void
  onSave: (show: Show) => Promise<void>
  isCreating: boolean
}

export function ShowModal({ open, show, agrupaciones, onClose, onSave, isCreating }: ShowModalProps) {
  const [edited, setEdited] = useState<Show | null>(show)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    setTab(0)
    if (show) {
      setEdited({ ...show })
    } else if (isCreating) {
      setEdited({
        id: '', title: '', slug: '',
        agrupacion_id: agrupaciones[0]?.id ?? '',
        year: new Date().getFullYear(),
        image: null, gallery: null, data: null, promotion_date: null,
        created_at: new Date().toISOString(),
      })
    }
  }, [show, isCreating, open, agrupaciones])

  const handleChange = (field: keyof Show, value: unknown) => {
    if (!edited) return
    if (field === 'title') {
      const slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      setEdited({ ...edited, title: value as string, slug })
    } else {
      setEdited({ ...edited, [field]: value })
    }
  }

  const handleSave = async () => {
    if (!edited) return
    setSaving(true)
    try { await onSave(edited); onClose() }
    catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  if (!edited) return null
  const canEditSubtables = !isCreating && !!edited.id

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: 860, maxHeight: '90vh',
        overflow: 'auto', bgcolor: 'background.paper',
        boxShadow: 24, borderRadius: 2, p: 0,
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6">
            {isCreating ? 'Crear Nuevo Espectáculo' : `Editar: ${edited.title}`}
          </Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: '1px solid #e0e0e0', px: 2 }}>
          <Tab label="General" />
          <Tab label="Elenco" disabled={!canEditSubtables} />
          <Tab label="Repertorio" disabled={!canEditSubtables} />
        </Tabs>

        {/* Tab: General */}
        {tab === 0 && (
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField label="Título" value={edited.title} fullWidth required
              onChange={(e) => handleChange('title', e.target.value)} />
            <TextField label="Slug (URL)" value={edited.slug} fullWidth disabled
              helperText="Se genera automáticamente desde el título"
              sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000', backgroundColor: '#f5f5f5' } }} />
            <TextField select label="Agrupación" value={edited.agrupacion_id} fullWidth required
              onChange={(e) => handleChange('agrupacion_id', e.target.value)}
              slotProps={{ select: { native: true } }}>
              {agrupaciones.map((ag) => <option key={ag.id} value={ag.id}>{ag.name}</option>)}
            </TextField>
            <TextField label="Año" type="number" value={edited.year ?? ''} fullWidth
              onChange={(e) => handleChange('year', e.target.value ? Number(e.target.value) : null)}
              slotProps={{ htmlInput: { min: 1900, max: 2100 } }} />
            <TextField label="Fecha de Promoción" type="date" value={edited.promotion_date ?? ''} fullWidth
              onChange={(e) => handleChange('promotion_date', e.target.value || null)}
              slotProps={{ inputLabel: { shrink: true } }} />
            <Divider />
            <ImageUploadField label="Imagen Principal" value={edited.image || ''}
              onChange={(url) => handleChange('image', url)} bucket="media" folder="shows" slug={edited.slug} />
            <Divider />
            <TextField label="Datos / Contenido" value={edited.data ?? ''} fullWidth multiline rows={5}
              onChange={(e) => handleChange('data', e.target.value)} />
            <Divider />
            <GalleryField values={edited.gallery ?? []} onChange={(vals) => handleChange('gallery', vals)} slug={edited.slug} />
            {isCreating && (
              <Typography variant="caption" color="text.secondary">
                Guardá el espectáculo primero para poder agregar elenco y repertorio.
              </Typography>
            )}
          </Box>
        )}

        {/* Tab: Elenco */}
        {tab === 1 && canEditSubtables && (
          <Box sx={{ p: 3 }}>
            <StaffTab showId={edited.id} agrupacionId={edited.agrupacion_id} />
          </Box>
        )}

        {/* Tab: Repertorio */}
        {tab === 2 && canEditSubtables && (
          <Box sx={{ p: 3 }}>
            <RepertoryTab showId={edited.id} />
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Button onClick={onClose} disabled={saving}>Cancelar</Button>
          {tab === 0 && (
            <Button onClick={handleSave} variant="contained" disabled={saving} startIcon={<Save />}>
              {saving ? 'Guardando...' : isCreating ? 'Crear' : 'Guardar Cambios'}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
