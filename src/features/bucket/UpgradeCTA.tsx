import { Button } from "@/components/ui/button";

function UpgradeCTA() {
  return (
    <div className="p-4 rounded-xl bg-primary text-center text-white flex flex-col gap-8 shadow-md">
      <h3 className="text-lg font-bold">Expand Your Cloud Coverage</h3>
      <p>Unlock more storage, faster speeds, and premium features by upgrading your plan.</p>
      <Button className="cursor-pointer bg-white text-primary w-full text-lg py-5">Upgrade Plan</Button>
    </div>
  );
}

export default UpgradeCTA;
