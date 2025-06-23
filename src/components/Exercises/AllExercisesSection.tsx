import { useTranslation } from "react-i18next";
import ExercisesRadarChart from "./ExercisesRadarChart";
import { useExercisesStore } from "../../context/ExercisesContext";
import ExerciseItem from "./ExerciseItem";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";

const AllExercisesSection: React.FC = () => {
  const { t } = useTranslation();
  const { exercises } = useExercisesStore();
  // Track the active slide (chart) for button styling.
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  return (
    <div className="flex flex-col gap-2 px-2">
      <div>
        <h3 className="text-xl">{t("allExercises")}</h3>
      </div>

      <div className="flex flex-col items-center">
        {/* Buttons for the slider */}
        <div
          className={`mb-4 flex w-full max-w-md justify-around rounded-md bg-gray-700 p-1`}
        >
          <button
            onClick={() => swiperInstance?.slideTo(0)}
            className={`w-1/2 cursor-pointer rounded-md py-2 transition-colors duration-200 ${
              currentSlideIndex === 0
                ? "bg-violet-800 text-white"
                : "text-gray-300 hover:bg-gray-600"
            }`}
          >
            1RM Chart
          </button>
          <button
            onClick={() => swiperInstance?.slideTo(1)}
            className={`w-1/2 cursor-pointer rounded-md py-2 transition-colors duration-200 ${
              currentSlideIndex === 1
                ? "bg-emerald-600 text-white"
                : "text-gray-300 hover:bg-gray-600"
            }`}
          >
            Volume Chart
          </button>
        </div>

        <Swiper
          initialSlide={currentSlideIndex}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={10}
          className="w-full"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
        >
          <SwiperSlide>
            <ExercisesRadarChart chart="1RM" />
          </SwiperSlide>
          <SwiperSlide>
            <ExercisesRadarChart chart="Volume" />
          </SwiperSlide>
        </Swiper>
      </div>

      <section>
        <ul className="flex flex-col items-stretch border-0 border-t border-t-gray-400 lg:max-h-[450px] lg:overflow-y-scroll">
          {exercises.map((exercise) => {
            return <ExerciseItem key={exercise.name} exercise={exercise} />;
          })}
        </ul>
      </section>
    </div>
  );
};

export default AllExercisesSection;
