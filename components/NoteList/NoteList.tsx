import Link from "next/link";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.tag}>{note.tag}</p>

          <div className={css.actions}>
            {/* ВИМОГА: перед Delete */}
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button type="button" className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
