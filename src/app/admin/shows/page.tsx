'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, IconButton, Tooltip, TextField, MenuItem, InputAdornment } from '@mui/material'
import { Edit, Delete, Add, Clear, OpenInNew } from '@mui/icons-material'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import {
  fetchShows,
  fetchAgrupaciones,
  createShow,
  updateShow,
  deleteShow,
} from '@/lib/data-queries'
import { Show, Agrupacion } from '@/lib/supabase'
import { ShowModal } from '@/components/admin/ShowModal'

export default function ShowsAdminPage() {
  const searchParams = useSearchParams()
  const [shows, setShows] = useState<Show[]>([])
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<Show | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [filterAgrupacion, setFilterAgrupacion] = useState('')
  const [filterText, setFilterText] = useState(() => searchParams.get('show') ?? '')

  useEffect(() => {
    loadData()
  }, [])

  // Pre-filter by agrupacion slug from URL param once agrupaciones are loaded
  const agrupacionSlugParam = searchParams.get('agrupacion')
  useEffect(() => {
    if (agrupacionSlugParam && agrupaciones.length > 0) {
      const match = agrupaciones.find((a) => a.slug === agrupacionSlugParam)
      if (match) setFilterAgrupacion(match.id)
    }
  }, [agrupaciones, agrupacionSlugParam])

  const loadData = async () => {
    try {
      setLoading(true)
      const [showsData, agrupData] = await Promise.all([fetchShows(), fetchAgrupaciones()])
      setShows(showsData)
      setAgrupaciones(agrupData)
    } catch (err) {
      setError('Error al cargar espectáculos')
      console.error('Error loading shows:', err)
    } finally {
      setLoading(false)
    }
  }

  const agrupacionName = (id: string) =>
    agrupaciones.find((a) => a.id === id)?.name ?? id

  const filteredShows = useMemo(() => {
    let result = shows
    if (filterAgrupacion) {
      result = result.filter((s) => s.agrupacion_id === filterAgrupacion)
    }
    if (filterText.trim()) {
      const lower = filterText.toLowerCase()
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(lower) ||
          s.slug.toLowerCase().includes(lower) ||
          String(s.year ?? '').includes(lower)
      )
    }
    return result
  }, [shows, filterAgrupacion, filterText])

  const columns = useMemo<MRT_ColumnDef<Show>[]>(
    () => [
      {
        accessorKey: 'image',
        header: 'Imagen',
        size: 110,
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <Box
            component="img"
            src={cell.getValue<string>() || '/logo_default.png'}
            alt="Imagen"
            sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
            onError={(e) => {
              e.currentTarget.src = '/logo_default.png'
            }}
          />
        ),
      },
      {
        accessorKey: 'title',
        header: 'Título',
        size: 200,
      },
      {
        accessorKey: 'agrupacion_id',
        header: 'Agrupación',
        size: 180,
        Cell: ({ cell }) => agrupacionName(cell.getValue<string>()),
      },
      {
        accessorKey: 'year',
        header: 'Año',
        size: 90,
      },
      {
        accessorKey: 'promotion_date',
        header: 'Fecha Promoción',
        size: 150,
        Cell: ({ cell }) => {
          const val = cell.getValue<string | null>()
          return val ? new Date(val).toLocaleDateString('es-UY') : '—'
        },
      },
      {
        accessorKey: 'slug',
        header: 'Slug',
        size: 180,
      },
    ],
    [agrupaciones]
  )

  const handleEdit = (show: Show) => {
    setSelected(show)
    setIsCreating(false)
    setModalOpen(true)
  }

  const handleDelete = async (show: Show) => {
    if (window.confirm(`¿Eliminar el espectáculo "${show.title}"?`)) {
      try {
        await deleteShow(show.id)
        await loadData()
        alert('Espectáculo eliminado exitosamente')
      } catch (error) {
        console.error('Error deleting show:', error)
        alert('Error al eliminar el espectáculo')
      }
    }
  }

  const handleCreate = () => {
    setSelected(null)
    setIsCreating(true)
    setModalOpen(true)
  }

  const handleModalSave = async (show: Show) => {
    try {
      if (isCreating) {
        await createShow(show)
        alert('Espectáculo creado exitosamente')
      } else {
        await updateShow(show.id, show)
        alert('Espectáculo actualizado exitosamente')
      }
      await loadData()
    } catch (error) {
      console.error('Error saving show:', error)
      throw error
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelected(null)
    setIsCreating(false)
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-6">
      <AdminPageHeader title="Administración de Espectáculos" />

      <MaterialReactTable
        columns={columns}
        data={filteredShows}
        enableGlobalFilter={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }: { row: { original: Show } }) => {
          const ag = agrupaciones.find((a) => a.id === row.original.agrupacion_id)
          const publicUrl = ag
            ? `/categorias/${ag.category_slug}/${ag.slug}/espectaculos/${row.original.slug}`
            : null
          return (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Tooltip title="Editar">
                <IconButton onClick={() => handleEdit(row.original)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton onClick={() => handleDelete(row.original)} color="error">
                  <Delete />
                </IconButton>
              </Tooltip>
              {publicUrl && (
                <Tooltip title="Ver página">
                  <IconButton component="a" href={publicUrl}>
                    <OpenInNew />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )
        }}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Crear nuevo espectáculo">
              <IconButton onClick={handleCreate} color="primary">
                <Add />
              </IconButton>
            </Tooltip>
            <TextField
              size="small"
              label="Buscar"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              sx={{ minWidth: 180 }}
              placeholder="Título, slug, año..."
              slotProps={{ input: { endAdornment: filterText ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setFilterText('')}>
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null }}}
            />
            <TextField
              select
              size="small"
              label="Agrupación"
              value={filterAgrupacion}
              onChange={(e) => setFilterAgrupacion(e.target.value)}
              sx={{ minWidth: 220 }}
              slotProps={{ input: { endAdornment: filterAgrupacion ? (
                <InputAdornment position="end" sx={{ mr: 2 }}>
                  <IconButton size="small" onClick={() => setFilterAgrupacion('')}>
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null }}}
            >
              <MenuItem value="">Todas</MenuItem>
              {agrupaciones.map((ag) => (
                <MenuItem key={ag.id} value={ag.id}>
                  {ag.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        muiTableProps={{
          sx: { '& .MuiTableCell-head': { backgroundColor: '#f5f5f5' } },
        }}
        muiTableBodyRowProps={{
          sx: { '&:hover': { backgroundColor: '#f9f9f9' } },
        }}
        muiTableHeadCellProps={{
          sx: { fontWeight: 'bold' },
        }}
      />

      <ShowModal
        open={modalOpen}
        show={selected}
        agrupaciones={agrupaciones}
        onClose={handleModalClose}
        onSave={handleModalSave}
        isCreating={isCreating}
      />
    </div>
  )
}
