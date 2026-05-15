'use client'

import { Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

interface AdminPageHeaderProps {
  title: string
  backHref?: string
  children?: React.ReactNode // elementos extra a la derecha
}

export function AdminPageHeader({ title, backHref = '/admin/dashboard', children }: AdminPageHeaderProps) {
  return (
    <div className="relative flex items-center mb-6">
      <Button variant="outlined" startIcon={<ArrowBack />} href={backHref}>
        Volver
      </Button>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-gray-900">
        {title}
      </h1>
      {children && <div className="ml-auto">{children}</div>}
    </div>
  )
}
