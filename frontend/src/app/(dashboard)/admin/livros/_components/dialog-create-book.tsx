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
import { createBook } from '@/actions/book'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { api, ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'

interface DialogCreateBookProps {
  children: React.ReactNode
}

export function DialogCreateBook({ children }: DialogCreateBookProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState<categoryType[] | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
      return
    }

    const requestData = async () => {
      const { response } = await api<categoryType[]>('GET', '/categoies')
      if (response) {
        setCategories(response)
      } else {
        toast({
          title: 'Categorias não encontradas',
        })
        setOpen(false)
      }
    }

    requestData()
  }, [open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await createBook(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar o livro!',
      })
    } else {
      toast({ title: 'Livro criado com sucesso!',})
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar livro</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo livro abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          {categories && (
            <FormFieldsBook error={error} categories={categories} />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
