import GetProps from "@/components/GetProps";
import GetApp from "@/components/GetApp";
import Catalog from "@/components/Catalog";
import HomeGrid from "@/components/HomeGrid";
import SearchBar from "@/components/SearchBar";
import getDish from "@/utils/get-dish";
import { DishProps } from "@/types";
import DishCard from "@/components/DishCard";
import GetCards from "@/components/GetCards";


export default function Home() {
  return (
    <>
    <main className='overflow-hidden'>
      <GetCards/>
    </main>
    </>
  );
}
