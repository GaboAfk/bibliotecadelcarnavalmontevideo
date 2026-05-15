'use client'

import React, { useState } from 'react'
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton
} from '@mui/material'
import { Close, Save } from '@mui/icons-material'
import { Category } from '@/lib/supabase'
import { ImageUploadField } from './ImageUploadField'

interface CategoryPreviewModalProps {
  open: boolean
  category: Category | null
  onClose: () => void
  onSave: (category: Category) => Promise<void>
  isCreating: boolean
}

export function CategoryPreviewModal({
  open,
  category,
  onClose,
  onSave,
  isCreating
}: CategoryPreviewModalProps) {
  const [editedCategory, setEditedCategory] = useState<Category | null>(category)
  const [saving, setSaving] = useState(false)

  // Reset form when category changes
  React.useEffect(() => {
    if (category) {
      setEditedCategory({ ...category })
    } else if (isCreating) {
      // Default values for new category
      setEditedCategory({
        id: '',
        name: '',
        slug: '',
        image: '',
        info_image: '',
        info_alt: '',
        info_badge: '',
        info_description: '',
        created_at: new Date().toISOString()
      })
    }
  }, [category, isCreating, open])

  const handleChange = (field: keyof Category, value: string) => {
    if (editedCategory) {
      // Auto-generate slug when name changes
      if (field === 'name') {
        const slug = value.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        setEditedCategory({ ...editedCategory, [field]: value, slug })
      } else {
        setEditedCategory({ ...editedCategory, [field]: value })
      }
    }
  }

  const handleSave = async () => {
    if (!editedCategory) return

    setSaving(true)
    try {
      await onSave(editedCategory)
      onClose()
    } catch (error) {
      console.error('Error saving category:', error)
    } finally {
      setSaving(false)
    }
  }

  if (!editedCategory) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="category-modal-title"
      aria-describedby="category-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 800,
        maxHeight: '90vh',
        overflow: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        p: 0
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography id="category-modal-title" variant="h6">
            {isCreating ? 'Crear Nueva Categoría' : 'Editar Categoría'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Preview Header */}
          <Box sx={{
            bgcolor: 'black',
            color: 'white',
            py: 2,
            mb: 3,
            textAlign: 'center',
            borderRadius: 1
          }}>
            <TextField
              value={editedCategory.name}
              onChange={(e) => handleChange('name', e.target.value)}
              variant="standard"
              sx={{
                input: {
                  color: 'white',
                  fontSize: '2rem',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }
              }}
              placeholder="Nombre de la categoría"
              fullWidth
            />
          </Box>

          {/* Hero Image Section */}
          <Box sx={{ position: 'relative', height: 384, mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            {editedCategory.info_image ? (
              <Box
                component="img"
                src={editedCategory.info_image}
                alt={editedCategory.info_alt || ''}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Box sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography color="text.secondary">Sin imagen de banner</Typography>
              </Box>
            )}

            {/* Gradiente overlay */}
            <Box sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.05), transparent)'
            }} />
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Badge</Typography>
              <TextField
                value={editedCategory.info_badge}
                onChange={(e) => handleChange('info_badge', e.target.value)}
                variant="outlined"
                fullWidth
                placeholder="Texto del badge"
              />
            </Box>

            <ImageUploadField
              label="Imagen Principal"
              value={editedCategory.image || ''}
              onChange={(url) => handleChange('image', url)}
              bucket="media"
              folder="categorias"
              slug={editedCategory.slug}
            />

            <ImageUploadField
              label="Imagen del Banner"
              value={editedCategory.info_image || ''}
              onChange={(url) => handleChange('info_image', url)}
              bucket="media"
              folder="categorias"
              slug={editedCategory.slug}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Texto Alternativo de Imagen</Typography>
              <TextField
                value={editedCategory.info_alt}
                onChange={(e) => handleChange('info_alt', e.target.value)}
                variant="outlined"
                fullWidth
                placeholder="Texto alternativo para accesibilidad"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Slug (URL)</Typography>
              <TextField
                value={editedCategory.slug}
                variant="outlined"
                fullWidth
                disabled
                helperText="Se genera automáticamente desde el nombre"
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Descripción</Typography>
              <TextField
                value={editedCategory.info_description}
                onChange={(e) => handleChange('info_description', e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Descripción detallada de la categoría"
              />
            </Box>
          </Box>
        </Box>

        {/* Actions */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          p: 2,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={saving}
            startIcon={<Save />}
          >
            {saving ? 'Guardando...' : (isCreating ? 'Crear' : 'Guardar Cambios')}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
