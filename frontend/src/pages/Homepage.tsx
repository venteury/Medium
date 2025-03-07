import { getPaginatedBlogs } from "@/api/services/blogsServices";
import { useEffect, useState } from "react";
import { Spin, Input, Pagination } from "antd";
// import { MagicCard } from "@/components/magicui/magic-card";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { FileTextIcon } from "@radix-ui/react-icons";

const Homepage = () => {
  const { Search } = Input;

  const [allBlogs, setAllBlogs] = useState([]);
  // const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 1000);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getPaginatedBlogs(
          page.toString(),
          // limit.toString(),
          "5",
          debouncedSearch
        );

        console.log(res);

        setAllBlogs(res.data);
        setTotalPages(res.pagination.totalPages);
        setCurrentPage(res.pagination.currentPage);
        setTotalBlogs(res.pagination.totalPosts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [debouncedSearch, page]);

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
          <div className=" flex justify-between">
            <div></div>
            <Search
              className="w-[17vw]"
              allowClear
              value={search}
              placeholder="Search by title"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className="mt-5 h-[70vh] overflow-y-scroll  pt-2">
            {allBlogs?.map((blog: any) => (
              <section key={blog.id} className=" py-3">
                <MagicCard
                  gradientColor="#D9D9D955"
                  className="flex items-center justify-center h-[21vh]"
                >
                  <div>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                  </div>
                </MagicCard>
              </section>
            ))}
          </div> */}

          <BentoGrid className="mt-5 h-[67vh] overflow-y-scroll no-scrollbar">
            {allBlogs
              ?.map((itm: any) => {
                return {
                  Icon: FileTextIcon,
                  name: itm.title,
                  description: itm.content,
                  cta: "Read More",
                  href: `/blog/${itm.id}`,
                  className: " bg-gray-200  h-[25vh] ",
                };
              })
              ?.map((blog: any) => (
                <BentoCard key={blog.id} name={blog.name} {...blog} />
              ))}
          </BentoGrid>
          <Pagination
            className="pt-2"
            align="center"
            defaultCurrent={1}
            total={totalBlogs}
            pageSize={5}
            hideOnSinglePage={totalPages === 1}
            current={currentPage}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
