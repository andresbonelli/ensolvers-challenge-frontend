import { useState } from "react";
import ArchiveIcon from "../icons/archive";
import EditSquareIcon from "../icons/edit";
import RestoreIcon from "../icons/restore";
import TrashIcon from "../icons/trash";
import SaveIcon from "../icons/save";
import { NoteCreate } from "../../interfaces";

interface NoteCardProps {
  id: number;
  content: string;
  category?: string | null;
  isArchived?: boolean;
  onDelete: Function;
  onArchive: Function;
  onEdit: Function;
}

export default function NoteCard({
  id,
  content,
  category,
  isArchived,
  onDelete,
  onArchive,
  onEdit,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editCategory, setEditCategory] = useState(category ?? "");
  const [showToolTip, setShowToolTip] = useState("");
  const bgColor = isArchived ? "bg-gray-200" : "bg-orange-100";
  const fontColor = isArchived ? "text-gray-400" : "text-black";

  const handleEdit = () => {
    setIsEditing(false);
    const editedNote: NoteCreate = {
      title: editContent,
      category: editCategory,
    };
    onEdit(id, editedNote); // Call the onEdit function with the new content
  };

  return (
    <div
      id="note-card"
      className={`flex flex-col  justify-between min-h-44 p-5 ${bgColor} ${fontColor} shadow-md gap-2`}
    >
      {isEditing ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={`text-lg border border-black font-MontserratLight ${bgColor}`}
          />
          <input
            type="text"
            className={`text-sm border border-black font-MontserratLight ${bgColor}`}
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />
          <button
            onMouseEnter={() => setShowToolTip("save")}
            onMouseLeave={() => setShowToolTip("")}
            onClick={handleEdit}
            className="absolute bottom-1 -right-10"
          >
            <SaveIcon size={30} fill="green" />
          </button>
          {showToolTip === "save" && (
            <label
              htmlFor="save-note"
              className="absolute bottom-1 right-1 text-white text-xs p-1 bg-gray-500 "
            >
              save
            </label>
          )}
        </>
      ) : (
        <>
          <p className="text-lg  ">{content}</p>
          <p className="text-sm font-MontserratLight ">{category}</p>
        </>
      )}
      {isArchived ? (
        <>
          <button
            onMouseEnter={() => setShowToolTip("restore")}
            onMouseLeave={() => setShowToolTip("")}
            onClick={() => onArchive(id, true)}
            className="absolute top-1 -right-10"
          >
            <RestoreIcon size={30} stroke="black" />
          </button>
          {showToolTip === "restore" && (
            <label
              htmlFor="restore-note"
              className="absolute top-1 right-1 text-white text-xs p-1 bg-gray-500 "
            >
              restore
            </label>
          )}

          <button
            onMouseEnter={() => setShowToolTip("delete")}
            onMouseLeave={() => setShowToolTip("")}
            onClick={() => onDelete(id)}
            className="absolute top-11 -right-10"
          >
            <TrashIcon size={30} stroke="red" />
          </button>
          {showToolTip === "delete" && (
            <label
              htmlFor="restore-note"
              className="absolute top-11 right-1 text-white text-xs p-1 bg-gray-500 "
            >
              delete forever!
            </label>
          )}
        </>
      ) : (
        <>
          <button
            onMouseEnter={() => setShowToolTip("archive")}
            onMouseLeave={() => setShowToolTip("")}
            disabled={isEditing}
            onClick={() => onArchive(id)}
            className="absolute top-1 -right-10"
          >
            <ArchiveIcon size={30} stroke={isEditing ? "gray" : "black"} />
          </button>
          {showToolTip === "archive" && (
            <label
              htmlFor="restore-note"
              className="absolute top-1 right-1 text-white text-xs p-1 bg-gray-500 "
            >
              archive
            </label>
          )}
          <button
            onMouseEnter={() => setShowToolTip("edit")}
            onMouseLeave={() => setShowToolTip("")}
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-11 -right-10"
          >
            <EditSquareIcon size={27} stroke="black" />
          </button>
          {showToolTip === "edit" && (
            <label
              htmlFor="restore-note"
              className="absolute top-11 right-1 text-white text-xs p-1 bg-gray-500 "
            >
              edit
            </label>
          )}
        </>
      )}
    </div>
  );
}
