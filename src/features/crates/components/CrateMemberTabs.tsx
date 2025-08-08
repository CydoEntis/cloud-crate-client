import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const memberTypes = ["All", "Owner", "Joined"] as const;
export type MemberType = (typeof memberTypes)[number];

export interface CrateMemberTabsProps {
  value: MemberType;
  onChange: (type: MemberType) => void;
}

export default function CrateMemberTabs({ value, onChange }: CrateMemberTabsProps) {
  return (
    <Tabs value={value} onValueChange={(val) => onChange(val as MemberType)}>
      <TabsList>
        {memberTypes.map((type) => (
          <TabsTrigger key={type} value={type}>
            {type === "Owner" ? "Owned" : type}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
