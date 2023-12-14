import { useQuery } from "@tanstack/react-query";
import Container from "../Shared/Container";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";

const Feedbacks = () => {
  const axiosPublic = useAxiosPublic();
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/feedbacks");
      return res.data;
    },
  });
  return (
    <Container>
      <SectionTitle heading={"Students Feedback"} />
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {feedbacks?.map((item, index) => (
          <SwiperSlide item={item} key={index}>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-[450px] lg:h-[340px] mt-5">
              <div className="flex items-center">
                <div className="bg-white lg:h-[250px] shadow-md rounded-md mt-10 relative p-16 w-9/12 space-y-2 mx-auto">
                  <h2 className="text-black text-2xl font-medium">
                    {item?.name}
                  </h2>
                  <ReactStars
                    edit={false}
                    size={24}
                    value={item?.rating}
                    activeColor="#ffd700"
                  />
                  <div>
                    <img
                      className="w-20 h-20 rounded-full border-4  absolute -left-10 top-12"
                      src={item?.user_image}
                      alt={item?.user_name}
                    />
                  </div>
                  <p className="text-slate-600 text-md"> {item?.feedback}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Feedbacks;
