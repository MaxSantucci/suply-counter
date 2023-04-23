import React, {useEffect, useState} from 'react';
import {Form} from './components/Form';
import {EditableSpan} from './components/EditableSpan';
import s from './App.module.css'
import {EditableInput} from './components/EdatableInput';


export type DataEntry = {
   name: string;
   goods: string
   option: string;
   quantity: string;
   sum: string;
   netAmount: string;
   grossAmount: string;
}

const App: React.FC = () => {
   const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
   const [totalNetAmount, setTotalNetAmount] = useState(0)
   const [totalGrossAmount, setTotalGrossAmount] = useState(0)

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: keyof DataEntry) => {
      const {value} = event.target;
      const newDataEntries = [...dataEntries]
      newDataEntries[index] = {
         ...newDataEntries[index],
         [fieldName]: value
      }

      const netAmount = parseFloat(newDataEntries[index].quantity) * parseFloat(newDataEntries[index].sum);
      const grossAmount = netAmount + (netAmount * 0.23);
      newDataEntries[index] = {
         ...newDataEntries[index],
         netAmount: netAmount.toFixed(2),
         grossAmount: grossAmount.toFixed(2)
      };

      setDataEntries(newDataEntries)
   }

   const calculateTotalAmount = () => {
      let netAmount = 0
      let grossAmount = 0
      for (let i = 0; i < dataEntries.length; i++) {
         netAmount += parseFloat(dataEntries[i].netAmount)
         grossAmount += parseFloat(dataEntries[i].grossAmount)
      }
      setTotalNetAmount(parseFloat(netAmount.toFixed(2)));
      setTotalGrossAmount(parseFloat(grossAmount.toFixed(2)));
   }

   useEffect(() => {
      calculateTotalAmount()
   }, [dataEntries, setTotalNetAmount])

   const handleBlur = () => {
      setTotalNetAmount(totalNetAmount)
      setTotalGrossAmount(totalGrossAmount)
      console.log(totalGrossAmount)
      console.log(totalNetAmount)
   }

   return (
      <div>
         <Form
            dataEntries={dataEntries}
            setDataEntries={setDataEntries}
         />
         <br/>
         <div className={s.editablespan}>
            <EditableSpan/>
            <table className={s.table}>
               <thead>
               <tr>
                  <th>Товар</th>
                  <th>Метрика</th>
                  <th>Кількість</th>
                  <th>Сумма</th>
                  <th>Сумма нетто</th>
                  <th>Загальна сумма</th>
               </tr>
               </thead>
               <tbody>
               {dataEntries.map((entry, index) => {
                  return (
                     <tr key={index}>
                        <td>
                           <EditableInput
                              type="text"
                              value={entry.goods}
                              onChange={(e) => handleInputChange(e, index, 'goods')}
                              // onBlur={handleBlur}
                              // calculateTotalAmount={calculateTotalAmount}
                           />
                        </td>
                        <td>
                           <EditableInput
                              type="text"
                              value={entry.option}
                              onChange={(e) => handleInputChange(e, index, 'option')}
                              // onBlur={handleBlur}
                              // calculateTotalAmount={calculateTotalAmount}
                           />
                        </td>
                        <td>
                           <EditableInput
                              type="number"
                              value={entry.quantity}
                              onChange={(e) => handleInputChange(e, index, 'quantity')}
                              onBlur={handleBlur}
                              // calculateTotalAmount={calculateTotalAmount}
                           />
                        </td>
                        <td>
                           <EditableInput
                              type="number"
                              value={entry.sum}
                              onChange={(e) => handleInputChange(e, index, 'sum')}
                              onBlur={handleBlur}
                              // calculateTotalAmount={calculateTotalAmount}
                           />
                        </td>
                        <td>{entry.netAmount}</td>
                        <td>{entry.grossAmount}</td>
                     </tr>
                  )
               })}
               </tbody>
               <tfoot>
               <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{totalNetAmount}</td>
                  <td>{totalGrossAmount}</td>
               </tr>
               </tfoot>
            </table>
         </div>
      </div>
   );
}

export default App