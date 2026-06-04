import axios from "axios";
interface ApiNote {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tag: string;
}
const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

export const fetchNotes = async (page: number, search: string) => {
  const response = await noteInstance.get("/notes", {
    params: {
      page: page,
      search: search,
    },
  });
  return response.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
}) => {
  const response = await noteInstance.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await noteInstance.delete(`/notes/${id}`);
  return response.data;
};
