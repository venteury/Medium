import { getBlogById } from "@/api/services/blogsServices";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const ReadBlog = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id?.toString() || "");
        setBlog(res.post);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  return (
    <div>
      <div className="flex items-center justify-center h-[78vh] bg-gray-100 p-4 overflow-scroll relative">
        <div>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="absolute top-4 right-4 px-5"
          >
            <ArrowLeftIcon />
          </Button>
        </div>
        <section className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl h-[55vh] overflow-y-scroll">
          <h1 className="text-3xl font-bold text-gray-600  text-center mb-6">
            {blog?.title}
          </h1>
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 justify-items-center">
              {blog?.content || ""}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReadBlog;
