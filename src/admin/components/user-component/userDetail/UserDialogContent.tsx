import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../common/ui/avatar";
import { Badge } from "../../../../common/ui/badge";
import { Card, CardContent, CardHeader } from "../../../../common/ui/card";
import { MapPin, Mail, Phone, User, Calendar } from "lucide-react";

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
    <Card className="mx-auto w-full">
      <CardHeader className="relative pb-0">
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <Avatar className="absolute bottom-0 left-4 h-24 w-24 translate-y-1/2 transform border-4 border-white">
          <AvatarImage src={info.avatar} alt={info.name} />
          <AvatarFallback>{info.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Badge
          variant={info.isEmailVerified ? "default" : "destructive"}
          className="absolute right-4 top-44"
        >
          {info.isEmailVerified ? "Verified" : "Unverified"}
        </Badge>
      </CardHeader>
      <CardContent className="pt-16">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-2xl font-bold">{info.name}</h2>
          <p className="text-muted-foreground">{info.jobTitle}</p>
        </div>
        <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{info.location}</span>
        </div>
        <p className="mb-6">{info.bio}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{info.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{info.phone}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Account Details</h3>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Member since</span>
                </div>
                <span className="font-medium">
                  {new Date(info.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Last updated</span>
                </div>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
