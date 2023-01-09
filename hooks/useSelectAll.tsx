import { NocDetailTypes } from '@utils/interface';
import { useState } from 'react';

const useSelectAll = <T,>() => {
  const [selectedUsers, setSelectedUsers] = useState<NocDetailTypes['id'][]>(
    []
  );

  function selectAll(checked: boolean) {
    const checkBoxes = document.querySelectorAll(
      'input.table-item'
    ) as NodeListOf<HTMLInputElement>;

    if (checked) {
      checkBoxes.forEach((sub) => {
        if (selectedUsers.indexOf(sub.id) === -1) {
          sub.checked = true;
          selectedUsers.push(sub.id);
        }
      });
    } else {
      checkBoxes.forEach((sub) => (sub.checked = false));
      setSelectedUsers([]);
    }
  }

  function onChangeHandler(id: NocDetailTypes['id'], checked: boolean) {
    const parentCheckbox = document.getElementById(
      'parent-checkbox'
    ) as HTMLInputElement;
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
      // printselected();
    } else {
      setSelectedUsers(selectedUsers.filter((newUsers) => newUsers !== id));

      if (parentCheckbox.checked) {
        parentCheckbox.checked = false;
      }
    }
  }
  return { onChangeHandler, selectAll, setSelectedUsers, selectedUsers };
};

export default useSelectAll;
