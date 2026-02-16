// types/note.ts
export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
};

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
