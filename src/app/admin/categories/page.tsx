'use client'

import { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, IconButton, Tooltip, Button } from '@mui/material'
import { Edit, Delete, Add, ArrowBack } from '@mui/icons-material'
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/lib/data-queries'
import { Category } from '@/lib/supabase'
import { CategoryPreviewModal } from '@/components/admin/CategoryPreviewModal'

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await fetchCategories()
      setCategories(data)
    } catch (err) {
      setError('Error al cargar categorías')
      console.error('Error loading categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 200,
      },
      {
        accessorKey: 'image',
        header: 'Imagen Principal',
        size: 200,
        Cell: ({ cell }) => (
          <Box
            component="img"
            src={cell.getValue<string>()}
            alt="Imagen"
            sx={{
              width: 100,
              height: 100,
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
        accessorKey: 'info_image',
        header: 'Imagen del Banner',
        size: 200,
        Cell: ({ cell }) => (
          <Box
            component="img"
            src={cell.getValue<string>()}
            alt="Imagen"
            sx={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 1
            }}
            onError={(e) => {
              e.currentTarget.src = '/logo_default.png'
            }}
          />
        ),
      },
    ],
    []
  )

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setIsCreating(false)
    setModalOpen(true)
  }

  const handleDelete = async (category: Category) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`)) {
      try {
        await deleteCategory(category.id)
        await loadCategories() // Recargar datos
        alert('Categoría eliminada exitosamente')
      } catch (error) {
        console.error('Error deleting category:', error)
        alert('Error al eliminar la categoría')
      }
    }
  }

  const handleCreate = () => {
    setSelectedCategory(null)
    setIsCreating(true)
    setModalOpen(true)
  }

  const handleModalSave = async (category: Category) => {
    try {
      if (isCreating) {
        await createCategory(category)
        alert('Categoría creada exitosamente')
      } else {
        await updateCategory(category.id, category)
        alert('Categoría actualizada exitosamente')
      }
      await loadCategories() // Recargar datos
    } catch (error) {
      console.error('Error saving category:', error)
      throw error // Re-throw para que el modal lo maneje
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedCategory(null)
    setIsCreating(false)
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            href="/admin/dashboard"
          >
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Administración de Categorías</h1>
        </div>
      </div>

      <MaterialReactTable
        columns={columns}
        data={categories}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }: { row: { original: Category } }) => (
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
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Tooltip title="Crear nueva categoría">
            <IconButton onClick={handleCreate} color="primary">
              <Add />
            </IconButton>
          </Tooltip>
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

      {/* Modal para crear/editar categorías */}
      <CategoryPreviewModal
        open={modalOpen}
        category={selectedCategory}
        onClose={handleModalClose}
        onSave={handleModalSave}
        isCreating={isCreating}
      />
    </div>
  )
}
