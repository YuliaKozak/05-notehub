import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import {
  fetchNotes,
  //createNote,
  //deleteNote,
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
        </header>

        <main>
          {isLoading && <p>Loading notes...</p>}
          {isError && <p>Something went wrong...</p>}
          <NoteList notes={notes} />
        </main>
      </div>

      <Modal />
      <NoteForm />
    </>
  );
}

export default App;
