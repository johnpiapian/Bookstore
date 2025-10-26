
export type BookItemActionProps = {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BookItemAction({ id, onEdit, onDelete }: BookItemActionProps) {
  return (
    <div className="mt-2 flex w-full gap-2 justify-end">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => onEdit(id)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  )
}