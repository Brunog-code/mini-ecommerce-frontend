import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface ISliderProps {
  imgsSlides: { img: string; title: string; price: number }[];
}

export const Slider = ({ imgsSlides }: ISliderProps) => {
  return (
    <div className="m-0 mx-auto mb-2 border border-gray-300 rounded-md max-w-[800px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {imgsSlides.map((slide) => (
          <SwiperSlide>
            <div className="flex sm:flex-row md:flex-row flex-col justify-start sm:justify-center items-center gap-4 sm:gap-10 md:gap-4 h-[300px] md:justify:center">
              <img
                src={slide.img}
                alt="Imagem 1"
                className="h-[60%] sm:h-full md:h-full object-contain"
              />
              <div className="flex flex-col text-gray-500">
                <span className="bg-orange-500 p-1 rounded-md text-white text-2xl">
                  {slide.title}
                </span>
                <span className="self-end font-semibold">
                  Por apenas:{" "}
                  <span className="font-normal">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(slide.price)}
                  </span>
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
