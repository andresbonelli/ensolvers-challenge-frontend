import { useState, useEffect } from "react";
import { NoteCreate, NoteFromDB } from "../../interfaces";
import api from "../../api";
import NoteCard from "../../components/noteCard";
import CreateNoteForm from "../../components/noteForm";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState(() => {
    return localStorage.getItem("filter") || "";
  });
  const [filterInput, setFilterInput] = useState("");
  const [currentNotes, setCurrentNotes] = useState<NoteFromDB[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes(archived: boolean = false) {
    const getArchived = archived ? "?getArchived=1" : "?getArchived=0";
    setIsLoading(true);
    try {
      const res = await api.get(`/note${getArchived}`);
      if (res.status === 200) {
        setCurrentNotes(res.data);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleArchiveNote(id: number, restoring: boolean = false) {
    setIsLoading(true);
    try {
      const res = await api.put(`/note/archive/${id}`);
      if (res.status === 200) {
        console.log("Note archived!");
      } else alert("Failed to archive");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      restoring ? getNotes(true) : getNotes();
    }
  }

  async function handleEditNote(id: number, note: NoteCreate) {
    setIsLoading(true);
    try {
      const res = await api.put(`/note/${id}`, note);
      if (res.status === 200) {
        console.log("Note edited!");
      } else alert("Failed to edit note");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      getNotes();
    }
  }

  async function handleDeleteNote(id: number) {
    setIsLoading(true);
    try {
      const res = await api.delete(`/note/${id}`);
      if (res.status === 200) {
        console.log("Note deleted!");
      } else alert("Failed to delete note");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      getNotes(true);
    }
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
      {/* TODO: make section scrollable on big screens */}
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
            {isLoading && <Loader />}
            {currentNotes?.map((note) => {
              if (currentFilter) {
                if (currentFilter === note.category) {
                  return (
                    <div
                      className="relative w-full sm:max-w-96 max-w-80  "
                      key={note.id}
                    >
                      <NoteCard
                        id={note.id}
                        content={note.title}
                        category={note.category}
                        onDelete={handleDeleteNote}
                        onArchive={handleArchiveNote}
                        isArchived={note.isArchived}
                        onEdit={handleEditNote}
                      />
                    </div>
                  );
                }
              } else {
                return (
                  <div
                    className="relative w-full sm:max-w-96 max-w-80  "
                    key={note.id}
                  >
                    <NoteCard
                      id={note.id}
                      content={note.title}
                      category={note.category}
                      onDelete={handleDeleteNote}
                      onArchive={handleArchiveNote}
                      isArchived={note.isArchived}
                      onEdit={handleEditNote}
                    />
                  </div>
                );
              }
            })}
          </div>
        </section>
      </aside>
    </main>
  );
}
