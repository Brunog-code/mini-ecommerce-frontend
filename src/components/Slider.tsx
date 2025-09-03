import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = () => {
  return (
    <div className="max-w-[600px] m-0 mx-auto border border-gray-300 mb-2 rounded-md">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="h-[250px] flex justify-center items-center">
            <img
              src="https://t62533.vteximg.com.br/arquivos/ids/945598-1000-1000/1-48149-principal.jpg?v=638624657532530000"
              alt="Imagem 1"
              className="h-full object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[250px] flex justify-center items-center">
            <img
              src="https://t62533.vteximg.com.br/arquivos/ids/945598-1000-1000/1-48149-principal.jpg?v=638624657532530000"
              alt="Imagem 1"
              className="h-full object-contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[250px] flex justify-center items-center">
            <img
              src="https://t62533.vteximg.com.br/arquivos/ids/945598-1000-1000/1-48149-principal.jpg?v=638624657532530000"
              alt="Imagem 1"
              className="h-full object-contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
