'use client'

import React, { useState } from 'react'
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'
import { Close, Save } from '@mui/icons-material'
import { Novedad } from '@/lib/supabase'
import { ImageUploadField } from './ImageUploadField'

interface NovedadPreviewModalProps {
  open: boolean
  novedad: Novedad | null
  onClose: () => void
  onSave: (novedad: Novedad) => Promise<void>
  isCreating: boolean
}

export function NovedadPreviewModal({
  open,
  novedad,
  onClose,
  onSave,
  isCreating
}: NovedadPreviewModalProps) {
  const [editedNovedad, setEditedNovedad] = useState<Novedad | null>(novedad)
  const [saving, setSaving] = useState(false)

  React.useEffect(() => {
    if (novedad) {
      setEditedNovedad({ ...novedad })
    } else if (isCreating) {
      setEditedNovedad({
        id: '',
        title: '',
        description: '',
        content: '',
        image: '',
        color: '#000000',
        date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString()
      })
    }
  }, [novedad, isCreating, open])

  const handleChange = (field: keyof Novedad, value: string) => {
    if (editedNovedad) {
      setEditedNovedad({ ...editedNovedad, [field]: value })
    }
  }

  const handleSave = async () => {
    if (!editedNovedad) return

    setSaving(true)
    try {
      await onSave(editedNovedad)
      onClose()
    } catch (error) {
      console.error('Error saving novedad:', error)
    } finally {
      setSaving(false)
    }
  }

  if (!editedNovedad) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="novedad-modal-title"
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
          <Typography id="novedad-modal-title" variant="h6">
            {isCreating ? 'Crear Nueva Novedad' : 'Editar Novedad'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Title preview */}
          <Box sx={{
            bgcolor: 'black',
            color: 'white',
            py: 2,
            mb: 3,
            textAlign: 'center',
            borderRadius: 1
          }}>
            <TextField
              value={editedNovedad.title}
              onChange={(e) => handleChange('title', e.target.value)}
              variant="standard"
              sx={{
                input: {
                  color: 'white',
                  fontSize: '2rem',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }
              }}
              placeholder="Título de la novedad"
              fullWidth
            />
          </Box>

          {/* Hero Image preview */}
          <Box sx={{ position: 'relative', height: 300, mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            {editedNovedad.image ? (
              <Box
                component="img"
                src={editedNovedad.image}
                alt={editedNovedad.title}
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
                <Typography color="text.secondary">Sin imagen</Typography>
              </Box>
            )}
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ImageUploadField
              label="Imagen"
              value={editedNovedad.image || ''}
              onChange={(url) => handleChange('image', url)}
              bucket="media"
              folder="novedades"
              slug={editedNovedad.id || 'nueva'}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Fecha</Typography>
              <TextField
                type="date"
                value={editedNovedad.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                variant="outlined"
                fullWidth

              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Color</Typography>
              {(() => {
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
                const currentColor = editedNovedad.color?.toLowerCase() ?? ''
                const matched = presets.find(p =>
                  p.value.toLowerCase() === currentColor ||
                  p.vars.some(v => v.toLowerCase() === currentColor)
                )
                return (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      {presets.map(({ label, value, vars }) => {
                        const isSelected =
                          currentColor === value.toLowerCase() ||
                          vars.some(v => v.toLowerCase() === currentColor)
                        return (
                          <Tooltip key={value} title={label}>
                            <Box
                              onClick={() => handleChange('color', value)}
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                bgcolor: value,
                                cursor: 'pointer',
                                border: isSelected ? '3px solid #000' : '2px solid #ccc',
                                '&:hover': { transform: 'scale(1.15)' },
                                transition: 'transform 0.1s'
                              }}
                            />
                          </Tooltip>
                        )
                      })}
                      <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>
                        {matched ? matched.label : (editedNovedad.color || '—')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <input
                        type="color"
                        value={editedNovedad.color || '#000000'}
                        onChange={(e) => handleChange('color', e.target.value)}
                        style={{
                          width: 32,
                          height: 32,
                          cursor: 'pointer',
                          border: '2px solid #ccc',
                          borderRadius: 4,
                          padding: 0,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Color personalizado
                      </Typography>
                    </Box>
                  </Box>
                )
              })()}
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Descripción corta</Typography>
              <TextField
                value={editedNovedad.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                placeholder="Resumen breve de la novedad"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Contenido</Typography>
              <TextField
                value={editedNovedad.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={8}
                placeholder="Contenido completo de la novedad"
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