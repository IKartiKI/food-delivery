"use client";

import { useState } from "react";
import Image from "next/image";

import { DishProps } from "@/types";
import CustomButton from "./CustomButton";
import DishDetails from "./DishDetail";

interface DishCardProps {
  dish: DishProps;
}

const DishCard = ({ dish }: DishCardProps) => {
  const { name, description, price, image, vegetarian, rating, category, id } = dish;

  const [isOpen, setIsOpen] = useState(false);

  //const dishRent = calculateCarRent(city_mpg, year);

  return (
    <div className="dish-card group">
      <div className="dish-card__content">
        <h2 className="dish-card__content-title">
          {name}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {price}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={image} alt='dish' fill priority className='object-contain'/>
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {vegetarian === true ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{category.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{rating} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <DishDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} dish={dish} />
    </div>
  );
};

export default DishCard;