import { Avatar, Select, SelectItem, Switch } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const FilterBar = ({ onFilterChange }) => {
  const [category, setCategory] = useState([]);
  const [vegetarian, setVegetarian] = useState(false);
  const [sort, setSort] = useState('');

  const options = [
    { label: 'Pizza', value: 'Pizza' },
    { label: 'Wok', value: 'Wok' },
    { label: 'Soup', value: 'Soup' },
    { label: 'Dessert', value: 'Dessert' },
    { label: 'Drink', value: 'Drink' },
 ];

 useEffect(() => {
  onFilterChange({ category, vegetarian, sort });
 }, [category, vegetarian, sort])

 const handleCategoryChange = (e) => {
    setCategory(e);
 };

 const handleVegetarianChange = (e) => {
    setVegetarian(e.target.checked);
 };

 const handleSortChange = (e) => {
    setSort(e.target.value);
 };

 return (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 dark:shadow-gray-500/50">
    <div className="flex flex-wrap items-center justify-between ">
      <div className="w-full md:w-auto mb-4 md:mb-0">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
          <MultiSelect
            options={options}
            value={category}
            onChange={handleCategoryChange}
            labelledBy="Select Category"
            selectionType="tags"
            className='dark:text-black'
          />
      </div>
      <div className="w-full md:w-auto mb-4 md:mb-0">
        <label htmlFor="vegetarian" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Vegetarian Only</label>
        <input type="checkbox" id="vegetarian" checked={vegetarian} onChange={handleVegetarianChange} className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
      </div>
      <div className="w-full md:w-auto">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sort By</label>
        <select id="sort" value={sort} onChange={handleSortChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md custom1">
          <option value="">Default</option>
          <option value="NameAsc">Name A-Z</option>
          <option value="NameDesc">Name Z-A</option>
          <option value="PriceAsc">Price Ascending</option>
          <option value="PriceDesc">Price Descending</option>
          <option value="RatingAsc">Rating Ascending</option>
          <option value="RatingDesc">Rating Descending</option>
        </select>
      </div>
    </div>
  </div>
    // <Select
    //   className="max-w-xs"
    //   label="Select country"
    // >
    //   <SelectItem
    //     key="argentina"
    //     startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
    //   >
    //     Argentina
    //   </SelectItem>
    //   <SelectItem
    //     key="venezuela"
    //     startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
    //   >
    //     Venezuela
    //   </SelectItem>
    //   <SelectItem
    //     key="brazil"
    //     startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
    //   >
    //     Brazil
    //   </SelectItem>
    //   <SelectItem
    //     key="switzerland"
    //     startContent={
    //       <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
    //     }
    //   >
    //     Switzerland
    //   </SelectItem>
    //   <SelectItem
    //     key="germany"
    //     startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
    //   >
    //     Germany
    //   </SelectItem>
    //   <SelectItem
    //     key="spain"
    //     startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
    //   >
    //     Spain
    //   </SelectItem>
    //   <SelectItem
    //     key="france"
    //     startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
    //   >
    //     France
    //   </SelectItem>
    //   <SelectItem
    //     key="italy"
    //     startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
    //   >
    //     Italy
    //   </SelectItem>
    //   <SelectItem
    //     key="mexico"
    //     startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
    //   >
    //     Mexico
    //   </SelectItem>
    // </Select>
 );
};

export default FilterBar;
