'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { ResponseErrorType } from '@/services/api'
import { bookType } from '@/types/book'
import { categoryType } from '@/types/category'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsBookProps {
  book?: bookType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
  categories?: categoryType[]
}

export default function FormFieldsBook({
  book,
  readOnly,
  error,
  categories,
}: FormFieldsBookProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>(
    book?.image,
  )
  const [selectCategory, setSelectCategory] = useState<string | undefined>(
    book?.categories_id,
  )
  return (
    <>
      <FormFieldsGroup>
        {book && <Input defaultValue={book.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="title" required={!book}>
            Título
          </Label>
          <Input
            name="title"
            id="title"
            placeholder="Insira o título do livro"
            defaultValue={book?.title}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.title}
          />
        </FormField>

        <FormField>
          <Label htmlFor="description" required={!book}>
            Descrição
          </Label>
          <Input
            name="description"
            id="description"
            placeholder="Insira a descrição do livro"
            defaultValue={book?.description}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.description}
          />
        </FormField>

        <FormField>
          <Label>Categoria</Label>
          <Select
            disabled={pending || readOnly}
            onValueChange={setSelectCategory}
            value={selectCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria do livro" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem value={category.id} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            name="category_id"
            type="hidden"
            value={selectCategory}
            readOnly
          />
        </FormField>

        <FormField>
          <Label htmlFor="price" required={!book}>
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            type="number"
            defaultValue={book?.price}
            readOnly={readOnly}
            placeholder="Insira o valor do livro"
            disabled={pending}
            error={error?.errors?.price}
          />
        </FormField>

        <FormField>
          <Label htmlFor="amount" required={!book}>
            Quantidade
          </Label>
          <Input
            name="amount"
            id="amount"
            type="number"
            defaultValue={book?.amount}
            readOnly={readOnly}
            placeholder="Insira a quantidade do livros"
            disabled={pending}
            error={error?.errors?.amount}
          />
        </FormField>

        <FormField>
          <Label hidden={readOnly && !book?.image} required={!book}>
            Imagem
          </Label>
          {!readOnly && (
            <Input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              disabled={pending}
              onChange={(e) => handleImageChange(e, setUpdateImage)}
              error={error?.errors?.image}
            />
          )}
          <ImageForm src={updateImage} className="aspect-square size-40" />
        </FormField>
      </FormFieldsGroup>

      {!readOnly && (
        <DialogFooter>
          <Button type="submit" pending={pending}>
            Salvar
          </Button>
        </DialogFooter>
      )}
    </>
  )
}
