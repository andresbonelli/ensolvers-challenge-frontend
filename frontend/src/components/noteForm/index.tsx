import api from "../../api";
import { useState } from "react";
import { NoteCreate } from "../../interfaces";
import Loader from "../loader";

export default function CreateNoteForm({
  onCreateNote,
}: {
  onCreateNote: Function;
}) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsloading] = useState(false);

  async function createNote(e: React.FormEvent<HTMLFormElement>) {
    setIsloading(true);
    e.preventDefault();
    const note: NoteCreate = { title: content, category: category };
    try {
      const res = await api.post("/note/", note);
      if (res.status === 201) {
        console.log("Note created");
      } else alert("failed to create note");
    } catch (error) {
      alert(error);
    } finally {
      setIsloading(false);
      setContent("");
      setCategory("");
      onCreateNote();
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={createNote} className="w-full">
        <div className="mb-5 ">
          <label
            htmlFor="note-title-input"
            className=" block mb-2  text-gray-900"
          >
            Note content:
          </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="large-input"
            placeholder="write something..."
            className="block w-full p-2   bg-gray-50  focus:ring-grey focus:border-grey shadow-md "
          ></textarea>
        </div>

        <div>
          {/* TODO: refactor categories into separate entity (backend) and change input to select */}
          <label
            htmlFor="note-category-input"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category:
            <span className="text-xs text-red font-MontserratLight pl-2">
              (optional)
            </span>
          </label>
          <input
            type="text"
            id="note-category-input"
            value={category}
            onChange={(e) => setCategory(e.target.value.toLowerCase())}
            placeholder="eg: chores, reminders..."
            className="block w-full p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
          ></input>
        </div>
        <button
          type="submit"
          className="w-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 mt-5 shadow-md"
        >
          create
        </button>
      </form>
    </>
  );
}
