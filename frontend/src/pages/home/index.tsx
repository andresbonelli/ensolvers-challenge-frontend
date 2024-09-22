import { useState, useEffect } from "react";
import { NoteCreate, NoteFromDB } from "../../interfaces";
import api from "../../api";
import NoteCard from "../../components/noteCard";
import CreateNoteForm from "../../components/noteForm";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState(() => {
    return localStorage.getItem("filter") || "";
  });
  const [filterInput, setFilterInput] = useState("");
  const [currentNotes, setCurrentNotes] = useState<NoteFromDB[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  function getNotes(archived: boolean = false) {
    const getArchived = archived ? "?getArchived=1" : "?getArchived=0";
    api
      .get(`/note${getArchived}`)
      .then((res) => res.data)
      .then((data) => {
        setCurrentNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  }

  function handleArchiveNote(id: number) {
    api
      .put(`/note/archive/${id}`)
      .then((res) => {
        if (res.status === 200) console.log("Note archived!");
        else alert("Failed to archive");
      })
      .catch((error) => alert(error));
    window.location.reload();
  }

  function handleEditNote(id: number, note: NoteCreate) {
    api
      .put(`/note/${id}`, note)
      .then((res) => {
        if (res.status === 200) console.log("Note edited");
        else alert("failed to edit note");
      })
      .catch((error) => alert(error));
    getNotes();
    window.location.reload();
  }

  function handleDeleteNote(id: number) {
    api
      .delete(`/note/${id}`)
      .then((res) => {
        if (res.status === 200) console.log("Note deleted!");
        else alert("Failed to delete");
      })
      .catch((error) => alert(error));
    window.location.reload();
  }
  function handleNotesFilter(category: string) {
    setCurrentFilter(category);
    localStorage.setItem("filter", category);
  }
  function Logout() {
    localStorage.clear();
    console.log("Access token cleared!");
    navigate("/login");
  }

  return (
    <main className="relative flex sm:flex-row flex-col sm:gap-20 ">
      <div className="sm:absolute sm:top-10 sm:right-20 flex justify-center place-items-center mt-5 ">
        <button
          onClick={Logout}
          className="bg-gray-400 hover:bg-gray-600 text-white text-sm font-MontserratSemibold rounded p-2 shadow-md w-24"
        >
          logout
        </button>
      </div>
      <aside className="flex flex-col sm:place-items-end place-items-center sm:w-1/2 max-w-full font-Montserrat pt-10 ">
        <section
          id="create-note-form"
          className="flex flex-col justify-start place-content-center sm:w-1/2 w-80 "
        >
          <h3 className=" font-MontserratSemibold text-3xl text-center  mb-10  ">
            Add a new note:
          </h3>
          <CreateNoteForm onCreateNote={() => getNotes()} />
        </section>
      </aside>
      <aside
        id="notes-list"
        className="flex flex-col sm:place-items-start place-items-center sm:w-1/2 min-h-screen w-full font-Montserrat py-10 "
      >
        <section
          id="my-notes"
          className="flex flex-col justify-start place-content-center sm:w-1/2  gap-10 "
        >
          <h3 className="font-MontserratSemibold text-3xl text-center ">
            My notes
          </h3>
          <div className="flex flex-row  justify-center w-full gap-5 ">
            <button
              onClick={() => getNotes()}
              className="bg-softGreen hover:bg-green text-white text-sm font-MontserratSemibold rounded p-2 shadow-md w-24"
            >
              active
            </button>
            <button
              onClick={() => getNotes(true)}
              className="bg-softGreen hover:bg-green text-white text-sm font-MontserratSemibold rounded p-2 shadow-md w-24"
            >
              archived
            </button>
          </div>
          <div className="flex flex-row justify-center place-items-center max-w-full gap-5  ">
            <input
              value={filterInput ?? ""}
              onChange={(e) => setFilterInput(e.target.value)}
              type="text"
              id="filter-notes"
              placeholder={"filter by category..."}
              className=" p-2   bg-gray-50 focus:ring-grey focus:border-grey shadow-md "
            ></input>
            <button
              onClick={() => handleNotesFilter(filterInput)}
              type="submit"
              className="h-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 shadow-md"
            >
              filter
            </button>
            <button
              onClick={() => handleNotesFilter("")}
              type="submit"
              className="h-full bg-softBlue hover:bg-blue text-white text-sm font-MontserratSemibold rounded p-2 shadow-md"
            >
              clear
            </button>
          </div>
          <div
            id="notes-container"
            className="flex flex-col justify-start gap-5 place-items-center"
          >
            {currentNotes?.map((note) => {
              if (currentFilter) {
                if (currentFilter === note.category) {
                  return (
                    <NoteCard
                      id={note.id}
                      content={note.title}
                      category={note.category}
                      onDelete={handleDeleteNote}
                      onArchive={handleArchiveNote}
                      isArchived={note.isArchived}
                      onEdit={handleEditNote}
                    />
                  );
                }
              } else {
                return (
                  <NoteCard
                    id={note.id}
                    content={note.title}
                    category={note.category}
                    onDelete={handleDeleteNote}
                    onArchive={handleArchiveNote}
                    isArchived={note.isArchived}
                    onEdit={handleEditNote}
                  />
                );
              }
            })}
          </div>
        </section>
      </aside>
    </main>
  );
}
