import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface DishProps {
    "name": string,
    "description": string,
    "price": number,
    "image": string,
    "vegetarian": boolean,
    "rating": number,
    "category": string,
    "id": string
}

export interface SearchCategoriesProps {
    category: string;
    setCategory: (Category: string) => void;
}
  