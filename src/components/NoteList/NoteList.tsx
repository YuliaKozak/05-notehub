import { type Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <>
      <ul className={css.list}>
        {/* Перебираємо масив нотаток через .map() */}
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>

              {/* Кнопка на своєму законному місці, тут вона бачить конкретний note.id */}
              <button className={css.button} onClick={() => onDelete(note.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NoteList;
