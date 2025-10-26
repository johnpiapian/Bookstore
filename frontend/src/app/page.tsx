'use client'
import { useEffect, useState } from 'react'
import { Book } from '@/lib/types'
import BookItem from '@/components/BookItem'
import BookItemAction from '@/components/BookItemAction'
import { redirect } from 'next/navigation'

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error))
  }, [])

  const handleOnEdit = (id: string) => {
    redirect(`/manage/edit/${id}`)
  }

  const handleOnDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return
    }

    fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
      })
      .catch((error) => console.error('Error deleting book:', error))
  }

  return (
    <>
      <section className="mt-10">
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <div key={book.id} className="border p-2 my-2 rounded dark:border-gray-600">
              <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                description={book.description}
                isbn={book.isbn}
              />
              <BookItemAction
                id={book.id}
                onEdit={handleOnEdit}
                onDelete={handleOnDelete}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}