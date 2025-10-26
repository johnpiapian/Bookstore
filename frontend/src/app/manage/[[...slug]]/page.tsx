'use client'

import { use, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import BookForm, { BookFormType } from '@/components/BookForm'
import { Book } from '@/lib/types';

const extractInfoFromSlug = (slug: string[]): { type: BookFormType; id?: string } | null => {
  if (slug.length === 0) {
    return { type: BookFormType.ADD }
  } else if (slug.length === 1 && slug[0] === BookFormType.ADD) {
    return { type: BookFormType.ADD }
  } else if (slug.length === 2 && Object.values(BookFormType).includes(slug[0] as BookFormType)) {
    return { type: slug[0] as BookFormType, id: slug[1] }
  }
  return null
}

export default function ManagePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const slug = use(params).slug ?? []
  const info = extractInfoFromSlug(slug)
  const [prefillData, setPrefillData] = useState<Book | undefined>(undefined)
  const [hasFetched, setHasFetched] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [successfulMessage, setSuccessfulMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (info === null) {
    notFound()
  }

  useEffect(() => {
    if (info.type === BookFormType.EDIT && info.id && !hasFetched) {
      fetch('/api/books')
        .then((response) => response.json())
        .then((data: Book[]) => {
          const bookToEdit = data.find((book) => book.id === info.id)
          if (bookToEdit) {
            setPrefillData({
              id: bookToEdit.id,
              title: bookToEdit.title,
              description: bookToEdit.description,
              isbn: bookToEdit.isbn,
            })
          } else {
            notFound()
          }
        })
        .catch((error) => {
          console.error('Error fetching books:', error)
        })
        .finally(() => {
          setHasFetched(true)
        })
    }
  }, [info])

  const handleOnSubmit = (book: Book) => {
    if (isloading) return // prevent double submissions

    setSuccessfulMessage(null)
    setErrorMessage(null)

    if (info.type === BookFormType.EDIT) {
      setIsLoading(true)
      fetch('/api/books', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: book.id,
            title: book.title,
            description: book.description,
            isbn: book.isbn,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false)
          setSuccessfulMessage('Book updated successfully!')
        })
        .catch((error) => {
          setIsLoading(false)
          setErrorMessage('Error updating book.')
        })
    } else {
      setIsLoading(true)
      fetch('/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: book.title,
            description: book.description,
            isbn: book.isbn,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false)
          setSuccessfulMessage('Book added successfully!')
        })
        .catch((error) => {
          setIsLoading(false)
          setErrorMessage('Error adding book.')
        })
    }
  }

  return (
    <section className="p-8">
      <div className="mb-8 text-center">
        <>
          <h1 className="text-2xl font-semibold">
            {info.type === BookFormType.ADD ? 'Add a new book' : 'Edit book'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {info.type === BookFormType.ADD
              ? 'Fill out the form below to add a book to the catalog.'
              : hasFetched
              ? 'Make changes to the book details and submit to save.'
              : 'Loading book details…'}
          </p>

          {info.type === BookFormType.EDIT && info.id && (
            <p className="mt-1 text-xs text-gray-400">Book ID: {info.id}</p>
          )}

          {successfulMessage && (
            <p className="mt-4 text-green-600">
              {successfulMessage}
            </p>
          )}

          {errorMessage && (
            <p className="mt-4 text-red-600">
              {errorMessage}
            </p>
          )}
        </>
      </div>
      <BookForm
        type={info.type}
        prefillData={prefillData}
        appState={{ isLoading: isloading }}
        onSubmit={(book) => {
          handleOnSubmit(book)
        }}
      />
    </section>
  )

}