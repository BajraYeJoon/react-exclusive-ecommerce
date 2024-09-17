import React from "react";
import { Mail, Phone, User, Calendar } from "lucide-react";
import { Card, CardContent } from "../../../../common/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../common/ui/avatar";
import { Badge } from "../../../../common/ui/badge";

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

interface Props {
  info: UserInfo;
}

export default function UserProfileCard({ info }: Props) {
  return (
    <Card className="relative overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500" />
      <CardContent className="px-6 pb-6">
        <Avatar className="absolute left-3 top-20 h-24 w-24 border-4 border-white">
          <AvatarImage src={info.avatar} alt={info.name} />
          <AvatarFallback>{info.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="mt-16 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{info.name}</h2>
            <p className="text-sm text-muted-foreground">{info.jobTitle}</p>
          </div>
          <Badge variant={info.isEmailVerified ? "secondary" : "destructive"}>
            {info.isEmailVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{info.bio}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <InfoItem icon={<Mail className="h-4 w-4" />} text={info.email} />
          <InfoItem icon={<Phone className="h-4 w-4" />} text={info.phone} />
        </div>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-muted-foreground lg:flex-row">
          <div className="flex items-center">
            <User className="mr-2 h-6 w-6" />
            <span>
              Member since {new Date(info.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-6 w-6" />
            <span>Last updated {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center space-x-2 text-sm">
    {icon}
    <span>{text}</span>
  </div>
);
