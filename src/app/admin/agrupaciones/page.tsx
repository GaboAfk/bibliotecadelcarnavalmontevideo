'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, IconButton, Tooltip, Button, Chip, TextField, MenuItem, InputAdornment } from '@mui/material'
import { Edit, Delete, Add, Clear, OpenInNew } from '@mui/icons-material'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import {
  fetchAgrupaciones,
  fetchCategories,
  createAgrupacion,
  updateAgrupacion,
  deleteAgrupacion,
} from '@/lib/data-queries'
import { Agrupacion, Category } from '@/lib/supabase'
import { AgrupacionModal } from '@/components/admin/AgrupacionModal'

export default function AgrupacionesAdminPage() {
  const searchParams = useSearchParams()
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<Agrupacion | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [filterCategory, setFilterCategory] = useState(() => searchParams.get('category') ?? '')
  const [filterText, setFilterText] = useState(() => searchParams.get('slug') ?? '')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [agrupData, catData] = await Promise.all([fetchAgrupaciones(), fetchCategories()])
      setAgrupaciones(agrupData)
      setCategories(catData)
    } catch (err) {
      setError('Error al cargar agrupaciones')
      console.error('Error loading agrupaciones:', err)
    } finally {
      setLoading(false)
    }
  }

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug

  const filteredAgrupaciones = useMemo(() => {
    let result = agrupaciones
    if (filterCategory) {
      result = result.filter((a) => a.category_slug === filterCategory)
    }
    if (filterText.trim()) {
      const lower = filterText.toLowerCase()
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(lower) ||
          a.slug.toLowerCase().includes(lower)
      )
    }
    return result
  }, [agrupaciones, filterCategory, filterText])

  const columns = useMemo<MRT_ColumnDef<Agrupacion>[]>(
    () => [
      {
        accessorKey: 'image',
        header: 'Imagen',
        size: 120,
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
        accessorKey: 'name',
        header: 'Nombre',
        size: 200,
      },
      {
        accessorKey: 'category_slug',
        header: 'Categoría',
        size: 160,
        Cell: ({ cell }) => categoryName(cell.getValue<string>()),
      },
      {
        accessorKey: 'slug',
        header: 'Slug',
        size: 180,
      },
      {
        accessorKey: 'disponible',
        header: 'Disponible',
        size: 120,
        Cell: ({ cell }) =>
          cell.getValue<boolean>() ? (
            <Chip label="Sí" color="success" size="small" />
          ) : (
            <Chip label="No" color="default" size="small" />
          ),
      },
    ],
    [categories]
  )

  const handleEdit = (agrupacion: Agrupacion) => {
    setSelected(agrupacion)
    setIsCreating(false)
    setModalOpen(true)
  }

  const handleDelete = async (agrupacion: Agrupacion) => {
    if (window.confirm(`¿Eliminar la agrupación "${agrupacion.name}"?`)) {
      try {
        await deleteAgrupacion(agrupacion.id)
        await loadData()
        alert('Agrupación eliminada exitosamente')
      } catch (error) {
        console.error('Error deleting agrupacion:', error)
        alert('Error al eliminar la agrupación')
      }
    }
  }

  const handleCreate = () => {
    setSelected(null)
    setIsCreating(true)
    setModalOpen(true)
  }

  const handleModalSave = async (agrupacion: Agrupacion) => {
    try {
      if (isCreating) {
        await createAgrupacion(agrupacion)
        alert('Agrupación creada exitosamente')
      } else {
        await updateAgrupacion(agrupacion.id, agrupacion)
        alert('Agrupación actualizada exitosamente')
      }
      await loadData()
    } catch (error) {
      console.error('Error saving agrupacion:', error)
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
      <AdminPageHeader title="Administración de Agrupaciones" />

      <MaterialReactTable
        columns={columns}
        data={filteredAgrupaciones}
        enableGlobalFilter={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }: { row: { original: Agrupacion } }) => (
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
            <Tooltip title="Ver página">
              <IconButton
                component="a"
                href={`/categorias/${row.original.category_slug}/${row.original.slug}`}
              >
                <OpenInNew />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Tooltip title="Crear nueva agrupación">
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
              placeholder="Nombre, slug..."
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
              label="Categoría"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              sx={{ minWidth: 200 }}
              slotProps={{ input: { endAdornment: filterCategory ? (
                <InputAdornment position="end" sx={{ mr: 2 }}>
                  <IconButton size="small" onClick={() => setFilterCategory('')}>
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null }}}
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.slug} value={cat.slug}>
                  {cat.name}
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

      <AgrupacionModal
        open={modalOpen}
        agrupacion={selected}
        categories={categories}
        onClose={handleModalClose}
        onSave={handleModalSave}
        isCreating={isCreating}
      />
    </div>
  )
}
