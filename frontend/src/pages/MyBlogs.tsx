import { getMyBlogs, deleteBlog } from "@/api/services/blogsServices";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [refresh, setRefresh] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getMyBlogs();
        setAllBlogs(res.posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [refresh]);

  const handleEdit = (id?: string) => {
    if (!id) return;
    navigate(`/editor?mode=edit&id=${id}`, { replace: true });
  };

  const handleDelete = async (id?: string) => {
    const cnf = confirm("Are you sure you want to delete this blog?");
    if (!cnf) return;
    if (!id) return;
    try {
      await deleteBlog(id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-[75vh]">
          <Spin
            className="flex items-center justify-center h-full"
            size="large"
          />
        </div>
      ) : (
        <div>
          <BentoGrid className="mt-5 h-[70vh] overflow-y-scroll">
            {allBlogs
              ?.map((itm: any) => {
                return {
                  Icon: FileTextIcon,
                  name: itm.title,
                  description: itm.content,
                  cta: "Read More",
                  href: `/blog/${itm.id}`,
                  id: itm.id,
                  className: " bg-gray-200  h-[25vh] ",
                };
              })
              ?.map((blog: any) => (
                <BentoCard
                  key={blog.id}
                  name={blog.name}
                  isMyBlog={true}
                  id={blog.id}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  {...blog}
                />
              ))}
          </BentoGrid>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
