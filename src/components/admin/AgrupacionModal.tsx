'use client'

import React, { useState } from 'react'
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  FormControlLabel,
  Switch,
  MenuItem,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Close, Save, Add, Delete } from '@mui/icons-material'
import { Agrupacion, Category, Show } from '@/lib/supabase'
import { ImageUploadField } from './ImageUploadField'
import { fetchShowsByAgrupacion } from '@/lib/data-queries'

interface AgrupacionModalProps {
  open: boolean
  agrupacion: Agrupacion | null
  categories: Category[]
  onClose: () => void
  onSave: (agrupacion: Agrupacion) => Promise<void>
  isCreating: boolean
}

function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onChange([...values, trimmed])
    setInput('')
  }

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAdd()
            }
          }}
          placeholder={placeholder ?? `Agregar ${label.toLowerCase()}`}
          fullWidth
        />
        <IconButton onClick={handleAdd} color="primary">
          <Add />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {values.map((val, i) => (
          <Chip
            key={i}
            label={val}
            onDelete={() => handleRemove(i)}
            size="small"
          />
        ))}
      </Box>
    </Box>
  )
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

  const handleAdd = () => {
    onChange([...values, ''])
  }

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

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
            folder="agrupaciones"
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

export function AgrupacionModal({
  open,
  agrupacion,
  categories,
  onClose,
  onSave,
  isCreating,
}: AgrupacionModalProps) {
  const [edited, setEdited] = useState<Agrupacion | null>(agrupacion)
  const [saving, setSaving] = useState(false)
  const [shows, setShows] = useState<Show[]>([])

  React.useEffect(() => {
    if (agrupacion) {
      setEdited({ ...agrupacion })
      if (agrupacion.id) {
        fetchShowsByAgrupacion(agrupacion.id)
          .then(setShows)
          .catch(console.error)
      }
    } else if (isCreating) {
      setEdited({
        id: '',
        name: '',
        slug: '',
        category_slug: categories[0]?.slug ?? '',
        image: null,
        description: null,
        history: null,
        information: null,
        discography: null,
        gallery: null,
        positions: null,
        trivia: null,
        disponible: true,
        created_at: new Date().toISOString(),
      })
      setShows([])
    }
  }, [agrupacion, isCreating, open, categories])

  const handleChange = (field: keyof Agrupacion, value: unknown) => {
    if (!edited) return
    if (field === 'name') {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setEdited({ ...edited, name: value as string, slug })
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
      console.error('Error saving agrupacion:', error)
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
            {isCreating ? 'Crear Nueva Agrupación' : 'Editar Agrupación'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Datos básicos */}
          <TextField
            label="Nombre"
            value={edited.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Slug (URL)"
            value={edited.slug}
            fullWidth
            disabled
            helperText="Se genera automáticamente desde el nombre"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000',
                backgroundColor: '#f5f5f5',
              },
            }}
          />

          <TextField
            select
            label="Categoría"
            value={edited.category_slug}
            onChange={(e) => handleChange('category_slug', e.target.value)}
            fullWidth
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <FormControlLabel
            control={
              <Switch
                checked={edited.disponible ?? false}
                onChange={(e) => handleChange('disponible', e.target.checked)}
              />
            }
            label="Disponible"
          />

          <Divider />

          {/* Imagen principal */}
          <ImageUploadField
            label="Imagen Principal"
            value={edited.image || ''}
            onChange={(url) => handleChange('image', url)}
            bucket="media"
            folder="agrupaciones"
            slug={edited.slug}
          />

          <Divider />

          {/* Textos */}
          <TextField
            label="Descripción"
            value={edited.description ?? ''}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Historia"
            value={edited.history ?? ''}
            onChange={(e) => handleChange('history', e.target.value)}
            fullWidth
            multiline
            rows={5}
          />

          <TextField
            label="Información"
            value={edited.information ?? ''}
            onChange={(e) => handleChange('information', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <Divider />

          {/* Campos de array */}
          <ArrayField
            label="Posiciones"
            values={edited.positions ?? []}
            onChange={(vals) => handleChange('positions', vals)}
            placeholder="Ej: 1° puesto 2023"
          />

          <ArrayField
            label="Discografía"
            values={edited.discography ?? []}
            onChange={(vals) => handleChange('discography', vals)}
            placeholder="Ej: Álbum 2023"
          />

          <ArrayField
            label="Trivia"
            values={edited.trivia ?? []}
            onChange={(vals) => handleChange('trivia', vals)}
            placeholder="Dato curioso..."
          />

          <Divider />

          {/* Galería */}
          <GalleryField
            values={edited.gallery ?? []}
            onChange={(vals) => handleChange('gallery', vals)}
            slug={edited.slug}
          />

          {/* Espectáculos (solo lectura) */}
          {!isCreating && (
            <>
              <Divider />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Espectáculos
                </Typography>
                {shows.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Sin espectáculos registrados
                  </Typography>
                ) : (
                  <List dense disablePadding>
                    {shows.map((show) => (
                      <ListItem key={show.id} disableGutters>
                        <ListItemText
                          primary={show.title}
                          secondary={show.year ?? ''}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </>
          )}
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
