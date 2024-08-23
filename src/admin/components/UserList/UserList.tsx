import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import UserDetail from "../UserDetail/UserDetail";

const users = [
  {
    userId: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    transaction: "$250.00",
  },
  {
    userId: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    transaction: "$150.00",
  },
  {
    userId: "USR003",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    transaction: "$350.00",
  },
  {
    userId: "USR004",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    transaction: "$450.00",
  },
  {
    userId: "USR005",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    transaction: "$550.00",
  },
  {
    userId: "USR006",
    name: "Diana Evans",
    email: "diana.evans@example.com",
    transaction: "$200.00",
  },
  {
    userId: "USR007",
    name: "Eve Foster",
    email: "eve.foster@example.com",
    transaction: "$300.00",
  },
];

function UserList() {
  const handleDelete = (userId: number) => {
    // Implement delete functionality here
    console.log(`User with ID ${userId} removed`);
  };

  return (
    <Table>
      <TableCaption>A list of your users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Transaction</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.userId}>
            <TableCell className="font-medium">{user.userId}</TableCell>
            <Dialog>
              <DialogTrigger>
                <TableCell>{user.name}</TableCell>
              </DialogTrigger>

              <DialogContent>
                <UserDetail />
              </DialogContent>
            </Dialog>

            <TableCell>{user.email}</TableCell>
            <TableCell>{user.transaction}</TableCell>
            <TableCell>
              <Button
                variant={"destructive"}
                onClick={() => handleDelete(Number(user.userId))}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Users</TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default UserList;
