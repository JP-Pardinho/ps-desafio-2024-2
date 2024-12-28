'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { categoryType } from '@/types/category'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationCategoryProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCategory({
  id,
  children,
}: DialogInformationCategoryProps) {
  const [category, setCategory] = useState<categoryType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<categoryType>('GET', `/categories/{id}`)

      if (response) {
        setCategory(response)
      } else {
        setCategory(null)
        toast({
          title: 'Categoria não encontrada!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setCategory(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da categoria</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da categoria abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsCategory category={category} readOnly />
      </DialogContent>
    </Dialog>
  )
}
