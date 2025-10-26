import { Book } from "@/lib/types"

export default function BookItem(book: Readonly<Book>) {
  return (
    <article className="dark:bg-gray-800 border border-gray-500 p-4 rounded w-full">
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="mb-2">{book.description}</p>
      <p className="text-sm text-gray-400">ISBN: {book.isbn}</p>
    </article>
  )
}