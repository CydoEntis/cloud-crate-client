import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import type { UserType } from "../utils/adminUserConstants";

type AdminUserTypeTabsProps = {
  value: UserType;
  onChange: (value: UserType) => void;
};

function AdminUserTypeTabs({ value, onChange }: AdminUserTypeTabsProps) {
  return (
    <Tabs value={value} onValueChange={(value) => onChange(value as UserType)} className="w-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="All">All Users</TabsTrigger>
        <TabsTrigger value="Admin">Admins</TabsTrigger>
        <TabsTrigger value="User">Users</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default AdminUserTypeTabs;
