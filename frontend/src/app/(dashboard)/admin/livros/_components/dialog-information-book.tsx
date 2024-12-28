'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsBook from './form-fields-book'
import { bookType } from '@/types/book'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { categoryType } from '@/types/category'

interface DialogInformationBookProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationBook({
  id,
  children,
}: DialogInformationBookProps) {
  const [book, setBook] = useState<bookType | undefined>()
  const [categories, setCategories] = useState<categoryType[] | undefined>()
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestBook = async () => {
      const { response } = await api<bookType>('GET', `/books/${id}`)

      if (response) {
        return response
      } else {
        toast({
          title: 'Livro não encontrado!',
        })
        setOpen(false)
      }
    }

    const requestCategories = async () => {
      const { response } = await api<categoryType[]>('GET', '/categories')

      if (response) {
        return response
      } else {
        toast({
          title: 'Categorias não encontradas!',
        })
        setOpen(false)
      }
    }

    const requestData = async () => {
      const bookResponse = requestBook()
      const categoriesResponse = requestCategories()

      setBook(await bookResponse)
      setCategories(await categoriesResponse)
    }

    requestData()

    return () => {
      setBook(undefined)
      setCategories(undefined)
    }
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do livro</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do livro abaixo.
          </DialogDescription>
        </DialogHeader>
        {book && categories && (
          <FormFieldsBook book={book} categories={categories} readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}
