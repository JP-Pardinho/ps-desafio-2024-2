import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { bookType } from '@/types/book'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateBook } from './dialog-update-book'
import { DialogBookDelete } from './dialog-delete-book'
import { DialogInformationBook } from './dialog-information-book'
import { DialogCreateBook } from './dialog-create-book'
import { categoryType } from '@/types/category'

export default async function ListBooks() {
  const { response } = await api<bookType[]>('GET', `/books`)
  const resposta = await api<categoryType[]>('GET', '/categories')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os usuários.
      </DashboardContainer>
    )
  }

  const categories: categoryType[] | undefined = resposta.response

  const books: bookType[] = response

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateBook>
          <Button size="sm">
            <LuPlusCircle />
            Novo livro
          </Button>
        </DialogCreateBook>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books?.map((book: bookType) => (
              <TableRow key={book.id}>
                <TableCell>
                  <TabbleCellImage src={book.image} />
                </TableCell>
                <TableCell className="pr-20">{book.title}</TableCell>
                <TableCell className="pr-20">{book.amount}</TableCell>
                <TableCell className="pr-20">{book.categories.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationBook id={book.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationBook>
                  <DialogUpdateBook id={book.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateBook>
                  <DialogBookDelete id={book.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogBookDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!books.length && (
            <TableCaption>Nenhum livro encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
