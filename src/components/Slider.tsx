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
    <div className="max-w-[800px] m-0 mx-auto border border-gray-300 mb-2 rounded-md">
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
            <div className="h-[300px] flex flex-col gap-4 sm:flex-row md:flex-row sm:justify-center md:justify:center justify-start sm:gap-10  md:gap-4 items-center">
              <img
                src={slide.img}
                alt="Imagem 1"
                className="h-[60%] sm:h-full md:h-full object-contain"
              />
              <div className="flex flex-col text-gray-500">
                <span className="rounded-md p-2 text-2xl bg-orange-500 text-white">
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
