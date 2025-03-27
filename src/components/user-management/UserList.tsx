import { useState } from "react";


import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  avatar: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    department: "Production",
    status: "Active",
    avatar: "/images/user/user-17.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Manager",
    department: "Finance",
    status: "Pending",
    avatar: "/images/user/user-18.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@company.com",
    role: "Supervisor",
    department: "Warehouse",
    status: "Inactive",
    avatar: "/images/user/user-19.jpg",
  },
];

export default function UserList() {
  const [userList, setUserList] = useState(users);

  const handleDelete = (id: number) => {
    setUserList(userList.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-gray-500">User</TableCell>
                <TableCell isHeader className="px-5 py-3 text-gray-500">Email</TableCell>
                <TableCell isHeader className="px-5 py-3 text-gray-500">Role</TableCell>
                <TableCell isHeader className="px-5 py-3 text-gray-500">Department</TableCell>
                <TableCell isHeader className="px-5 py-3 text-gray-500">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 text-gray-500">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">{user.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500">{user.email}</TableCell>
                  <TableCell className="px-5 py-4 text-gray-500">{user.role}</TableCell>
                  <TableCell className="px-5 py-4 text-gray-500">{user.department}</TableCell>
                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={
                        user.status === "Active"
                          ? "success"
                          : user.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <FiEdit /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={() => handleDelete(user.id)}>
                      <FiTrash /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
