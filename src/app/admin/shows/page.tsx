'use client'

import { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, IconButton, Tooltip, Button, TextField, MenuItem } from '@mui/material'
import { Edit, Delete, Add, ArrowBack } from '@mui/icons-material'
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
  const [shows, setShows] = useState<Show[]>([])
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<Show | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [filterAgrupacion, setFilterAgrupacion] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    loadData()
  }, [])

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
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outlined" startIcon={<ArrowBack />} href="/admin/dashboard">
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Administración de Espectáculos</h1>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={filteredShows}
        enableGlobalFilter={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }: { row: { original: Show } }) => (
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
          </Box>
        )}
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
            />
            <TextField
              select
              size="small"
              label="Agrupación"
              value={filterAgrupacion}
              onChange={(e) => setFilterAgrupacion(e.target.value)}
              sx={{ minWidth: 220 }}
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
