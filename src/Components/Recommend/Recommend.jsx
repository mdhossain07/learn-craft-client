import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import Container from "../../Components/Shared/Container";
import SectionTitle from "../Shared/SectionTitle";
import { Link } from "react-router-dom";

const Recommend = () => {
  const axiosPublic = useAxiosPublic();

  const { data: recommended = [] } = useQuery({
    queryKey: ["recommended"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/recommend-class");
      return res.data;
    },
  });

  return (
    <div className="my-20">
      <Container>
        <SectionTitle heading={"Recommended Courses"} />

        <Swiper
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {recommended.map((item, index) => (
            <div key={index}>
              <SwiperSlide>
                <Link to={`/class-info/${item?._id}`}>
                  <div className="group cursor-pointer">
                    <img
                      className="transition-transform duration-300 transform scale-100 group-hover:scale-110 h-[150px] lg:h-[300px] rounded-lg"
                      src={item?.image}
                      alt=""
                    />
                    <h2 className="my-3 font-semibold text-xl text-center">
                      {item?.title}
                    </h2>
                  </div>
                </Link>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Recommend;
