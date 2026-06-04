import { useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import noteService from "..//../services/noteService";

import css from "./App.module.css";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          <SearchBox />
          {/* Пагінація */}
          <Pagination />
          {/* Кнопка створення нотатки */}
        </header>

        <main>
          <NoteList />
        </main>
      </div>

      <Modal />
      <NoteForm />
    </>
  );
}

export default App;
