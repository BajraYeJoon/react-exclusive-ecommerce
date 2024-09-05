// const UserDialogContent = ({ info }: any) => {
//   return (
//     <div className="m-10 max-w-sm">
//       <div className="rounded-lg border bg-white px-4 pb-10 pt-8 shadow-lg">
//         <div className="relative mx-auto w-36 rounded-full">
//           <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
//           <img
//             className="mx-auto h-auto w-full rounded-full"
//             src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
//             alt=""
//           />
//         </div>
//         <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
//           {info.name}
//         </h1>
//         <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
//           {info.email}
//         </h3>
//         <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
//           {info.phone}
//         </p>
//         <ul className="mt-3 divide-y rounded bg-gray-100 px-3 py-2 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
//           <li className="flex items-center py-3 text-sm">
//             <span>Status</span>
//             <span className="ml-auto">
//               <span className="rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
//                 {info.isEmailVerified ? "Verified" : "Not Verified"}
//               </span>
//             </span>
//           </li>
//           <li className="flex items-center py-3 text-sm">
//             <span>Joined On</span>
//             <span className="ml-auto">
//               {new Date(info.createdAt).toDateString()}
//             </span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserDialogContent;

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../common/ui/avatar";
import { Button } from "../../../../common/ui/button";
import { Badge } from "../../../../common/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../common/ui/card";
import { Briefcase, Calendar, Mail, MapPin, Phone, User } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  createdAt: string;
  jobTitle: string;
  location: string;
  bio: string;
  avatar: string;
}

export default function UserProfileCard({ info }: { info: UserInfo }) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="relative pb-0">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src={info.avatar} alt={info.name} />
            <AvatarFallback>{info.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{info.name}</h2>
            <p className="text-muted-foreground">{info.jobTitle}</p>
            <div className="flex items-center justify-center space-x-2 sm:justify-start">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {info.location}
              </span>
            </div>
          </div>
        </div>
        <Badge
          variant={info.isEmailVerified ? "default" : "secondary"}
          className="absolute right-6 top-6"
        >
          {info.isEmailVerified ? "Verified" : "Unverified"}
        </Badge>
      </CardHeader>
      <CardContent className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>

            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{info.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{info.phone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">About</h3>

            {/* <p className="text-sm text-muted-foreground">{info.bio}</p> */}
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Account Details</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Member since</span>
              </div>
              <span className="text-sm font-medium">
                {new Date(info.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Job Title</span>
              </div>
              {/* <span className="text-sm font-medium">{info.jobTitle}</span> */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Last updated</span>
              </div>
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Edit Profile</Button>
        <Button>Send Message</Button>
      </CardFooter>
    </Card>
  );
}
