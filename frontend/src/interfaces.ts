export interface NoteFromDB {
  id: number;
  title: string;
  category?: string | null;
  isArchived: boolean;
}

export interface NoteCreate {
  title: string;
  category?: string | null;
}

export interface svgProps {
  size: number;
  fill?: string;
  stroke?: string;
}
