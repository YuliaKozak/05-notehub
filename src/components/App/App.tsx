import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import {
  fetchNotes,
  createNote,
  deleteNote,
} from "..//../services/noteService";
//import { type Note } from "..//../types/note";

import css from "./App.module.css";

function App() {
  const [page, setPage] = useState<number>(1);

  const [search, setSearch] = useState<string>("");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    // queryKey — це унікальний ідентифікатор запиту.
    // Щоразу, коли змінюються page або search, TanStack Query автоматично перезапустить запит!
    queryKey: ["notes", page, search],
    // queryFn — функція, яка безпосередньо робить запит через Axios
    queryFn: () => fetchNotes(page, search),
  });

  // Масив нотаток беремо з data (залежно від того, як сервер повертає: data.notes чи просто data)
  const notes = data?.notes || data || [];

  const totalPages = data?.totalPages || 1;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Оновлює список на екрані
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id), // або просто deleteNote, якщо функція приймає id
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); // Оновлюємо список на екрані
    },
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={debouncedSetSearch} />

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>

        <main>
          {isLoading && <p>Loading notes...</p>}
          {isError && <p>Something went wrong...</p>}
          <NoteList
            notes={notes}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSubmit={(values) => createMutation.mutate(values)}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default App;
