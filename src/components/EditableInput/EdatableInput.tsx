import React, {useEffect, useState} from 'react';
import s from '../EditableSpan/EditableSpan.module.css';

type EditableInputPropsType = {
   type: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => void;
   onBlur?: () => void
   // calculateTotalAmount?: () => void
}

export const EditableInput: React.FC<EditableInputPropsType> =
   ({
       type,
       value,
       onBlur,
       // calculateTotalAmount
    }) => {
      const [isEditMode, setIsEditMode] = useState<boolean>(false);
      const [newTitle, setNewTitle] = useState<string | number>(value);

      const toggleEditMode = () => {
         setIsEditMode(!isEditMode);
      };

      const setValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
         setNewTitle(e.currentTarget.value);
      };

      const handleBlur = () => {
         toggleEditMode()
         onBlur && onBlur()
      }

      // useEffect(() => {
      //    calculateTotalAmount && calculateTotalAmount()
      // }, [newTitle])


      return (
         isEditMode ? (
            <input
               type={type}
               value={newTitle}
               onChange={(e) => setValueHandler(e)}
               onBlur={handleBlur}
            />
         ) : (
            <span className={s.title} onDoubleClick={toggleEditMode}>{newTitle}</span>
         )
      );
   }
