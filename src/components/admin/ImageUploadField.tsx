'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { CloudUpload, Image as ImageIcon } from '@mui/icons-material'
import { createBrowserClientInstance } from '@/lib/supabase'

interface ImageUploadFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  bucket: string // 'media', 'agrupaciones', etc.
  folder: string // 'categories', 'artists', 'shows'
  slug?: string
}

export function ImageUploadField({
  label,
  value,
  onChange,
  bucket,
  folder,
  slug
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [showExplorer, setShowExplorer] = useState(false)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createBrowserClientInstance()

  // Cargar imágenes existentes cuando cambia el slug
  useEffect(() => {
    if (slug && showExplorer) {
      loadExistingImages()
    }
  }, [slug, showExplorer])

  // Cargar imágenes existentes de la carpeta
  const loadExistingImages = async () => {
    if (!slug) return

    try {
      const folderPath = `${folder}/${slug}/`
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folderPath, {
          limit: 50,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error

      // Generar URLs públicas para las imágenes
      const imageUrls = data
        ?.filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i))
        ?.map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(`${folderPath}${file.name}`)
          return publicUrl
        }) || []

      setExistingImages(imageUrls)
    } catch (error) {
      console.error('Error cargando imágenes existentes:', error)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido')
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB')
      return
    }

    // Crear preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Subir a Supabase
    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()

      // Generar path: media/folder/slug/nombre_archivo
      const basePath = slug ? `${folder}/${slug}` : folder
      const fileName = `${basePath}/${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw error
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      onChange(publicUrl)
    } catch (error) {
      console.error('Error subiendo imagen:', error)
      alert('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleSelectExistingImage = (imageUrl: string) => {
    onChange(imageUrl)
    setShowExplorer(false)
  }

  const handleOpenExplorer = () => {
    setShowExplorer(prev => !prev)
  }

  const currentImage = preview || value

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        {label}
      </Typography>

      {/* Preview actual */}
      <Box sx={{
        mb: 2,
        border: '2px dashed #ccc',
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        bgcolor: '#f9f9f9',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}>
        {currentImage ? (
          <>
            <Box
              component="img"
              src={currentImage}
              alt="Preview"
              sx={{
                maxWidth: '100%',
                maxHeight: 150,
                objectFit: 'contain',
                borderRadius: 1
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {currentImage.length > 50 ? currentImage.substring(0, 50) + '...' : currentImage}
            </Typography>
          </>
        ) : (
          <>
            <ImageIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography color="text.secondary">
              No hay imagen seleccionada
            </Typography>
          </>
        )}
      </Box>

      {/* Botones de acción */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<CloudUpload />}
          onClick={handleButtonClick}
          disabled={uploading}
          fullWidth
        >
          {uploading ? 'Subiendo...' : 'Subir Nueva'}
        </Button>

        {slug && (
          <Button
            variant={showExplorer ? "contained" : "outlined"}
            color="secondary"
            onClick={handleOpenExplorer}
            disabled={uploading}
          >
            Explorar
          </Button>
        )}

        {currentImage && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => onChange('')}
            disabled={uploading}
          >
            Quitar
          </Button>
        )}
      </Box>

      {/* Explorador de imágenes existentes */}
      {showExplorer && slug && (
        <Box sx={{
          mb: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          p: 2,
          maxHeight: 200,
          overflowY: 'auto'
        }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Imágenes existentes en {folder}/{slug}:
          </Typography>

          {existingImages.length > 0 ? (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: 1
            }}>
              {existingImages.map((imageUrl, index) => (
                <Box
                  key={index}
                  component="img"
                  src={imageUrl}
                  alt={`Imagen ${index + 1}`}
                  onClick={() => handleSelectExistingImage(imageUrl)}
                  sx={{
                    width: '100%',
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: imageUrl === currentImage ? '2px solid #1976d2' : '1px solid #ddd',
                    '&:hover': {
                      borderColor: '#1976d2'
                    }
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay imágenes existentes en esta carpeta
            </Typography>
          )}
        </Box>
      )}

      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </Box>
  )
}
