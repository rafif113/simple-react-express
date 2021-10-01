import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../constants/API";

function UserList() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/get-user`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBtnHandler = (id_user) => {
    alert(id_user);
  };

  return (
    <div className="flex justify-center">
      <table className="w-8/12 flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
          <tr className="bg-gray-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left" width="110px">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          {user.map((val, idx) => {
            return (
              <tr
                key={idx}
                className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
              >
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  {idx + 1}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  {val.username}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  {val.email}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                  {val.role}
                </td>
                <td
                  onClick={() => deleteBtnHandler(val.id_user)}
                  className="border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                >
                  Delete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
