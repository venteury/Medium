import { useState } from "react";
import { createBlog } from "@/api/services/blogsServices";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = { title, content: text };
    try {
      const res = await createBlog(data);
      if (res.success) {
        alert("Blog created successfully");
        setTitle("");
        setText("");
        navigate("/my-blogs", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[78vh] bg-gray-100 p-4 overflow-scroll">
      <section className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-600  text-center mb-6">
          Add New Blog
        </h1>
        <div className="flex flex-col gap-4">
          <label className="text-lg font-medium">Title</label>
          <input
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Enter blog title..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-lg font-medium">Body</label>
          <textarea
            className="border border-gray-300 rounded-lg p-3 h-40 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Write your blog here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className=" bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditorPage;
