import React, {useState} from 'react';
import {DataEntry} from '../App';
import s from './form.module.css'

type FormPropsType = {
   dataEntries: DataEntry[]
   setDataEntries: ( dataEntries: DataEntry[]) => void
}

export const Form: React.FC<FormPropsType> = ({dataEntries, setDataEntries}) => {
   const [name, setName] = useState('');
   const [goods, setGoods] = useState('');
   const [option, setOption] = useState('');
   const [quantity, setQuantity] = useState('');
   const [sum, setSum] = useState('');
   const [netAmount, setNetAmount] = useState('');
   const [grossAmount, setGrossAmount] = useState('');


   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
   };

   const handleGoodsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGoods(event.target.value);
   };

   const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setOption(event.target.value);
   };

   const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(event.target.value);
   };

   const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSum(event.target.value);
   };
   const handleCalculate = () => {
      const netAmount = parseFloat(quantity) * parseFloat(sum);
      const grossAmount = netAmount + (netAmount * 0.23);
      setNetAmount(netAmount.toFixed(2));
      setGrossAmount(grossAmount.toFixed(2));

      const newDataEntry: DataEntry = {
         name,
         goods,
         option,
         quantity,
         sum,
         netAmount: netAmount.toFixed(2),
         grossAmount: grossAmount.toFixed(2),
      };

      setDataEntries([...dataEntries, newDataEntry]);

      setName('');
      setGoods('')
      // setOption('');
      setQuantity('');
      setSum('');
   };
   return (
      <div>
         <form className={s.form}>
            <label className={s.goods}>
               Товар:
               <input type="text" value={goods} onChange={handleGoodsChange}/>
            </label>
            <label className={s.option}>
               Метрики:
               <select
                  className={s.select}
                  value={option}
                  onChange={handleOptionChange}
               >
                  <option value="кілометри">кілометри</option>
                  <option value="метри">метри</option>
                  <option value="штуки">штуки</option>
               </select>
            </label>
            <label className={s.quantity}>
               Кількість:
               <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
               />
            </label>
            <label className={s.sum}>
               Сумма одного товару:
               <input type="number" value={sum} onChange={handleSumChange}/>
            </label>
            <button className={s.button} type="button" onClick={handleCalculate}>
               Підрахувати
            </button>
         </form>
      </div>
   );
};
