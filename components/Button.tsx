import Image from "next/image";
import { MouseEventHandler } from "react";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
    full?: boolean;
    click?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({type, title, icon, variant, full, click}: ButtonProps) => {
  return (
    <button 
    className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}
    type={type}
    onClick={click}
    >
        {icon && <Image src={icon} alt={title} width={20} height={20}/>}
        <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
  )
}

export default Button