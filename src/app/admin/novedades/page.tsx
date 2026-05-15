'use client'

import { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, IconButton, Tooltip, TextField, MenuItem } from '@mui/material'
import { Edit, Delete, Add, OpenInNew } from '@mui/icons-material'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { fetchNovedades, createNovedad, updateNovedad, deleteNovedad } from '@/lib/data-queries'
import { Novedad } from '@/lib/supabase'
import { NovedadPreviewModal } from '@/components/admin/NovedadPreviewModal'

export default function NovedadesAdminPage() {
  const [novedades, setNovedades] = useState<Novedad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedNovedad, setSelectedNovedad] = useState<Novedad | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [filterColor, setFilterColor] = useState('')

  useEffect(() => {
    loadNovedades()
  }, [])

  const loadNovedades = async () => {
    try {
      setLoading(true)
      const data = await fetchNovedades()
      setNovedades(data)
    } catch (err) {
      setError('Error al cargar novedades')
      console.error('Error loading novedades:', err)
    } finally {
      setLoading(false)
    }
  }

  const COLOR_PRESETS = [
    { label: 'Naranja', value: '#F5A623' },
    { label: 'Amarillo', value: '#F8E71C' },
    { label: 'Verde', value: '#417505' },
    { label: 'Rosa', value: '#FF69B4' },
    { label: 'Violeta', value: '#8B5CF6' },
    { label: 'Rose', value: '#EC4899' },
    { label: 'Rojo', value: '#EF4444' },
    { label: 'Azul', value: '#3B82F6' },
    { label: 'Negro', value: '#000000' },
  ]

  const filteredNovedades = useMemo(() => {
    let result = novedades
    if (filterText.trim()) {
      const lower = filterText.toLowerCase()
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(lower) ||
          (n.description ?? '').toLowerCase().includes(lower)
      )
    }
    if (filterColor) {
      result = result.filter((n) => (n.color ?? '').toLowerCase() === filterColor.toLowerCase())
    }
    return result
  }, [novedades, filterText, filterColor])

  const columns = useMemo<MRT_ColumnDef<Novedad>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Título',
        size: 250,
      },
      {
        accessorKey: 'image',
        header: 'Imagen',
        size: 150,
        Cell: ({ cell }) => (
          <Box
            component="img"
            src={cell.getValue<string>() || '/logo_default.png'}
            alt="Imagen"
            sx={{
              width: 100,
              height: 70,
              objectFit: 'cover',
              borderRadius: 1
            }}
            onError={(e) => {
              e.currentTarget.src = '/logo_default.png'
            }}
          />
        ),
      },
      {
        accessorKey: 'date',
        header: 'Fecha',
        size: 150,
        Cell: ({ cell }) => {
          const val = cell.getValue<string>()
          if (!val) return <span>—</span>
          return (
            <span>
              {new Date(val).toLocaleDateString('es-UY', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )
        },
      },
      {
        accessorKey: 'color',
        header: 'Color',
        size: 130,
        Cell: ({ cell }) => {
          const val = cell.getValue<string>()
          const presets = [
            { label: 'Naranja', value: '#F5A623', vars: ['var(--color-carnaval-orange)'] },
            { label: 'Amarillo', value: '#F8E71C', vars: ['var(--color-carnaval-yellow)'] },
            { label: 'Verde', value: '#417505', vars: ['var(--color-carnaval-green)'] },
            { label: 'Rosa', value: '#FF69B4', vars: ['var(--color-carnaval-pink)'] },
            { label: 'Violeta', value: '#8B5CF6', vars: ['var(--color-carnaval-purple)'] },
            { label: 'Rose', value: '#EC4899', vars: ['var(--color-carnaval-rose)'] },
            { label: 'Rojo', value: '#EF4444', vars: [] },
            { label: 'Azul', value: '#3B82F6', vars: [] },
            { label: 'Negro', value: '#000000', vars: [] },
          ]
          const lower = val?.toLowerCase() ?? ''
          const matched = presets.find(p =>
            p.value.toLowerCase() === lower ||
            p.vars.some(v => v.toLowerCase() === lower)
          )
          const displayColor = matched?.value ?? val ?? '#000'
          const displayLabel = matched?.label ?? val ?? '—'
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: displayColor,
                border: '1px solid #ccc',
                flexShrink: 0
              }} />
              <span>{displayLabel}</span>
            </Box>
          )
        },
      },
      {
        accessorKey: 'description',
        header: 'Descripción',
        size: 300,
        Cell: ({ cell }) => {
          const val = cell.getValue<string>()
          return <span>{val ? val.substring(0, 80) + (val.length > 80 ? '...' : '') : '—'}</span>
        },
      },
    ],
    []
  )

  const handleEdit = (novedad: Novedad) => {
    setSelectedNovedad(novedad)
    setIsCreating(false)
    setModalOpen(true)
  }

  const handleDelete = async (novedad: Novedad) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la novedad "${novedad.title}"?`)) {
      try {
        await deleteNovedad(novedad.id)
        await loadNovedades()
        alert('Novedad eliminada exitosamente')
      } catch (error) {
        console.error('Error deleting novedad:', error)
        alert('Error al eliminar la novedad')
      }
    }
  }

  const handleCreate = () => {
    setSelectedNovedad(null)
    setIsCreating(true)
    setModalOpen(true)
  }

  const handleModalSave = async (novedad: Novedad) => {
    try {
      if (isCreating) {
        await createNovedad(novedad)
        alert('Novedad creada exitosamente')
      } else {
        await updateNovedad(novedad.id, novedad)
        alert('Novedad actualizada exitosamente')
      }
      await loadNovedades()
    } catch (error) {
      console.error('Error saving novedad:', error)
      throw error
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedNovedad(null)
    setIsCreating(false)
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-6">
      <AdminPageHeader title="Administración de Novedades" />

      <MaterialReactTable
        columns={columns}
        data={filteredNovedades}
        enableGlobalFilter={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }: { row: { original: Novedad } }) => (
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="Editar">
              <IconButton onClick={() => handleEdit(row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => handleDelete(row.original)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver página">
              <IconButton
                component="a"
                href={`/novedades/${row.original.id}`}
              >
                <OpenInNew />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Crear nueva novedad">
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
              placeholder="Título, descripción..."
            />
            <TextField
              select
              size="small"
              label="Color"
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Todos</MenuItem>
              {COLOR_PRESETS.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: c.value, border: '1px solid #ccc' }} />
                    {c.label}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        muiTableProps={{
          sx: {
            '& .MuiTableCell-head': {
              backgroundColor: '#f5f5f5',
            },
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            '&:hover': {
              backgroundColor: '#f9f9f9',
            },
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            fontWeight: 'bold',
          },
        }}
      />

      <NovedadPreviewModal
        open={modalOpen}
        novedad={selectedNovedad}
        onClose={handleModalClose}
        onSave={handleModalSave}
        isCreating={isCreating}
      />
    </div>
  )
}
