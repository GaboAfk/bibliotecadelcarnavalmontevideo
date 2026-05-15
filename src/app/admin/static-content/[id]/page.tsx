'use client'

import { useState, useEffect } from 'react'
import { Button, TextField, CircularProgress } from '@mui/material'
import { Save } from '@mui/icons-material'
import { fetchStaticContent, updateStaticContent } from '@/lib/data-queries'
import { StaticContent } from '@/lib/supabase'
import { use } from 'react'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'

const LABELS: Record<string, string> = {
    'nuestra-biblioteca': 'Nuestra Biblioteca',
    'historia': 'Historia del Carnaval',
}

export default function StaticContentAdminPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [content, setContent] = useState<StaticContent | null>(null)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchStaticContent(id)
            .then((data) => {
                setContent(data)
                setTitle(data?.title ?? '')
                setBody(data?.body ?? '')
                setImage(data?.image ?? '')
            })
            .catch(() => setError('Error al cargar el contenido'))
            .finally(() => setLoading(false))
    }, [id])

    const handleSave = async () => {
        try {
            setSaving(true)
            await updateStaticContent(id, { title, body, image: image || null })
            alert('Contenido guardado')
        } catch {
            alert('Error al guardar')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-6">Cargando...</div>
    if (error) return <div className="p-6 text-red-600">{error}</div>

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <AdminPageHeader title={LABELS[id] ?? id} />

            <div className="flex flex-col gap-6">
                <TextField
                    label="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <ImageUploadField
                    label="Imagen"
                    value={image}
                    onChange={setImage}
                    bucket="media"
                    folder="static-content"
                    slug={id}
                />
                <TextField
                    label="Contenido"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    multiline
                    rows={16}
                    fullWidth
                    placeholder="Separá los párrafos con una línea en blanco."
                    helperText="Separá los párrafos con una línea en blanco (doble enter)."
                />
                <div>
                    <Button
                        variant="contained"
                        startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <Save />}
                        onClick={handleSave}
                        disabled={saving}
                    >
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}
