import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import type { MemberType } from "../types/MemberType";
import { allowedMemberTypes } from "../utils/crate.constants";

export interface CrateMemberTabsProps {
  value: MemberType;
  onChange: (type: MemberType) => void;
}

export default function CrateMemberTabs({ value, onChange }: CrateMemberTabsProps) {
  return (
    <Tabs value={value} onValueChange={(val) => onChange(val as MemberType)}>
      <TabsList className="bg-card p-1 rounded-lg">
        {allowedMemberTypes.map((type) => (
          <TabsTrigger key={type} value={type} className="px-4 py-2 rounded-md text-sm">
            {type === "Owner" ? "Owned" : type}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
