'use client'

import React, { useState } from 'react'
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
} from '@mui/material'
import { Close, Save, Add, Delete } from '@mui/icons-material'
import { Show, Agrupacion } from '@/lib/supabase'
import { ImageUploadField } from './ImageUploadField'

interface ShowModalProps {
  open: boolean
  show: Show | null
  agrupaciones: Agrupacion[]
  onClose: () => void
  onSave: (show: Show) => Promise<void>
  isCreating: boolean
}

function GalleryField({
  values,
  onChange,
  slug,
}: {
  values: string[]
  onChange: (values: string[]) => void
  slug: string
}) {
  const handleChange = (index: number, url: string) => {
    const next = [...values]
    next[index] = url
    onChange(next)
  }

  const handleAdd = () => onChange([...values, ''])

  const handleRemove = (index: number) => onChange(values.filter((_, i) => i !== index))

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Galería
      </Typography>
      {values.map((url, i) => (
        <Box key={i} sx={{ mb: 2, position: 'relative' }}>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleRemove(i)}
            sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          >
            <Delete fontSize="small" />
          </IconButton>
          <ImageUploadField
            label={`Imagen ${i + 1}`}
            value={url}
            onChange={(newUrl) => handleChange(i, newUrl)}
            bucket="media"
            folder="shows"
            slug={slug}
          />
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={handleAdd} variant="outlined" size="small">
        Agregar imagen
      </Button>
    </Box>
  )
}

export function ShowModal({
  open,
  show,
  agrupaciones,
  onClose,
  onSave,
  isCreating,
}: ShowModalProps) {
  const [edited, setEdited] = useState<Show | null>(show)
  const [saving, setSaving] = useState(false)

  React.useEffect(() => {
    if (show) {
      setEdited({ ...show })
    } else if (isCreating) {
      setEdited({
        id: '',
        title: '',
        slug: '',
        agrupacion_id: agrupaciones[0]?.id ?? '',
        year: new Date().getFullYear(),
        image: null,
        gallery: null,
        data: null,
        promotion_date: null,
        created_at: new Date().toISOString(),
      })
    }
  }, [show, isCreating, open, agrupaciones])

  const handleChange = (field: keyof Show, value: unknown) => {
    if (!edited) return
    if (field === 'title') {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setEdited({ ...edited, title: value as string, slug })
    } else {
      setEdited({ ...edited, [field]: value })
    }
  }

  const handleSave = async () => {
    if (!edited) return
    setSaving(true)
    try {
      await onSave(edited)
      onClose()
    } catch (error) {
      console.error('Error saving show:', error)
    } finally {
      setSaving(false)
    }
  }

  if (!edited) return null

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
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
          p: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h6">
            {isCreating ? 'Crear Nuevo Espectáculo' : 'Editar Espectáculo'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Título"
            value={edited.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Slug (URL)"
            value={edited.slug}
            fullWidth
            disabled
            helperText="Se genera automáticamente desde el título"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                backgroundColor: '#f5f5f5',
              },
            }}
          />

          <TextField
            select
            label="Agrupación"
            value={edited.agrupacion_id}
            onChange={(e) => handleChange('agrupacion_id', e.target.value)}
            fullWidth
            required
            slotProps={{ select: { native: true } }}
          >
            {agrupaciones.map((ag) => (
              <option key={ag.id} value={ag.id}>
                {ag.name}
              </option>
            ))}
          </TextField>

          <TextField
            label="Año"
            type="number"
            value={edited.year ?? ''}
            onChange={(e) =>
              handleChange('year', e.target.value ? Number(e.target.value) : null)
            }
            fullWidth
            slotProps={{ htmlInput: { min: 1900, max: 2100 } }}
          />

          <TextField
            label="Fecha de Promoción"
            type="date"
            value={edited.promotion_date ?? ''}
            onChange={(e) => handleChange('promotion_date', e.target.value || null)}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Divider />

          <ImageUploadField
            label="Imagen Principal"
            value={edited.image || ''}
            onChange={(url) => handleChange('image', url)}
            bucket="media"
            folder="shows"
            slug={edited.slug}
          />

          <Divider />

          <TextField
            label="Datos / Contenido"
            value={edited.data ?? ''}
            onChange={(e) => handleChange('data', e.target.value)}
            fullWidth
            multiline
            rows={5}
          />

          <Divider />

          <GalleryField
            values={edited.gallery ?? []}
            onChange={(vals) => handleChange('gallery', vals)}
            slug={edited.slug}
          />
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            p: 2,
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={saving}
            startIcon={<Save />}
          >
            {saving ? 'Guardando...' : isCreating ? 'Crear' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
