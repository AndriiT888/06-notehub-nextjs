"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/notes";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

const PER_PAGE = 12;

export default function NotesClient({ initialQuery }: { initialQuery: string }) {
  const [search, setSearch] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // якщо міняємо пошук — логічно скидати на 1 сторінку
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const queryKey = useMemo(
    () => ["notes", { page, perPage: PER_PAGE, search }],
    [page, search]
  );

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: search || undefined }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <main className={css.container}>
      <h1 className={css.title}>Notes</h1>

      <div className={css.controls}>
        <SearchBox value={search} onChange={handleSearchChange} />

        <button className={css.button} type="button" onClick={() => setIsCreateOpen(true)}>
          Create note
        </button>
      </div>

      {isLoading && <p>Loading, please wait...</p>}
      {error && (
  <pre style={{ whiteSpace: "pre-wrap" }}>
    {JSON.stringify(error, null, 2)}
  </pre>
)}

      {!isLoading && !error && (
        <>
          <NoteList notes={notes} />

          {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}

      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)}>
          <NoteForm onCancel={() => setIsCreateOpen(false)} />
        </Modal>
      )}
    </main>
  );
}
