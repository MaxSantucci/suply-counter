import React, {useState} from 'react';
import s from './EditableSpan.module.css'

export const EditableSpan: React.FC = () => {
   const [isEditMode, setIsEditMode] = useState<boolean>(false);
   const [newTitle, setNewTitle] = useState<string>('Назва будови');

   const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
   };

   const setValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value);
   };

   return (
      isEditMode ? (
         <input
            type="text"
            value={newTitle}
            onChange={setValueHandler}
            onBlur={toggleEditMode}
         />
      ) : (
         <span className={s.title} onDoubleClick={toggleEditMode}>{newTitle}</span>
      )
   );
};
