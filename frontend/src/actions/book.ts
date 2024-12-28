'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createBook(form: FormData) {
  const res = await api('POST', '/books', { data: form })

  if (!res.error) {
    revalidatePath('admin/livros')
  }

  return JSON.stringify(res)
}

export async function updateBook(form: FormData) {
  const res = await api('POST', `/books/${form.get('id')}`, { data: form })

  if (!res.error) {
    revalidatePath('/adim/livros')
  }

  return JSON.stringify(res)
}

export async function destroyBook(id: string) {
  const res = await api('DELETE', `/books/${id}`)

  if (!res.error) {
    revalidatePath('/admin/livros')
  }

  return JSON.stringify(res)
}
