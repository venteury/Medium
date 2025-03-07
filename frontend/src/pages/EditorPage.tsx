import { useState } from "react";
const EditorPage = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="flex items-center justify-center w-full">
      <section className="flex flex-col gap-7 border border-black/10 h-[75vh] p-5 rounded-md w-full">
        <h1 className="text-3xl py-3 text-blue-500 font-serif font-bold">
          Add New Blog
        </h1>
        <div className="flex flex-col gap-3 px-20">
          <label className="text-xl ">Title</label>
          <input
            className="border border-black rounded-md h-10 text-center "
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-xl  ">Body</label>
          <textarea
            className="border border-black rounded-md items-center p-3 text-center "
            placeholder="Write your blog here..."
            value={text}
            rows={10}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="bg-blue-500 text-white p-3 rounded-md mt-3 hover:bg-blue-600">
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditorPage;
