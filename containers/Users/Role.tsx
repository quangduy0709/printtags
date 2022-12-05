import React, { useEffect, useState } from "react";
import Sucess from "../../components/Sucess";
import { msuccess } from "../../lib/message";
import { updateAdmin } from "../../services/user";
type SelectChangeEventHandler = React.ChangeEventHandler<HTMLSelectElement>;
interface IProps {
  role: boolean;
  id: string;
}
const Role: React.FC<IProps> = (props) => {
  const { role, id } = props;

  const [selected, setSelected] = useState<boolean>(role);
  const [status, setStatus] = useState(false);

  const handleChange: SelectChangeEventHandler = async (event) => {
    if (event.target.value === "admin") {
      setSelected(true);
    }
    if (event.target.value === "user") {
      setSelected(false);
    }

    const user = {
      id: id,
      role: selected,
    };
    const res = await updateAdmin(user);
    if (res.status === 200) {
      msuccess("Role update successful");
    }
  };

  return (
    <div>
      <div className="relative">
        <select
          className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8 "
          defaultValue={role ? "admin" : "user"}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="user">Users</option>
        </select>
      </div>
    </div>
  );
};

export default Role;
