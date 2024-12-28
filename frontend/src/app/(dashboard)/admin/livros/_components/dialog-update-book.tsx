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
import { updateBook } from '@/actions/book'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { bookType } from '@/types/book'
import { ResponseErrorType, api } from '@/services/api'
import { categoryType } from '@/types/category'

interface DialogUpdateBookProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateBook({ id, children }: DialogUpdateBookProps) {
  const [book, setBook] = useState<bookType | undefined>()
  const [categories, setCategories] = useState<categoryType[] | undefined>()
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestBook = async () => {
      const { response } = await api<bookType>('GET', `/books/${id}`)

      if (response) {
        return response
      } else {
        toast({
          title: 'Livro  não encontrado!',
        })
        setOpen(false)
      }
    }
    if (open) {
      requestBook()
    } else {
      setError(null)
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

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await updateBook(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o livro!',
      })
    } else {
      toast({
        title: 'Livro editado com sucesso!',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar livro</DialogTitle>
          <DialogDescription>
            Atualize as informações do livro abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          {book && categories && (
            <FormFieldsBook error={error} book={book} categories={categories} />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
