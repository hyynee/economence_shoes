import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import bg_image from '../../assets/img/bg-carousel.jpg';
import slide_image_1 from "../../assets/img/product1.png";
import slide_image_2 from "../../assets/img/product2.png";
import slide_image_3 from "../../assets/img/product3.png";
import slide_image_4 from "../../assets/img/product4.png";
import slide_image_5 from "../../assets/img/product5.png";

const Carousel = () => {
  return (
    <div style={{
      backgroundImage: `url(${bg_image})`,
      backgroundPosition: 'center',
    }}>
      <div className="">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full max-w-2xl mx-auto relative"
        >
          <SwiperSlide className="rounded-md overflow-hidden shadow-lg">
            <img src={slide_image_1} alt="slide_image" className="mx-auto h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="rounded-lg overflow-hidden shadow-lg">
            <img src={slide_image_2} alt="slide_image" className="mx-auto h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="rounded-lg overflow-hidden shadow-lg">
            <img src={slide_image_3} alt="slide_image" className="mx-auto h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="rounded-lg overflow-hidden shadow-lg">
            <img src={slide_image_4} alt="slide_image" className="mx-auto h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="rounded-lg overflow-hidden shadow-lg">
            <img src={slide_image_5} alt="slide_image" className="mx-auto h-full w-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

  );
};

export default Carousel;
