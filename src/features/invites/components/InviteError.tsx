import { Button } from "@/shared/components/ui/button";

type InviteErrorProps = {
  onClose: () => void;
};

function InviteError({ onClose }: InviteErrorProps) {
  return (
    <div className="p-4 text-center">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Oh no!</h3>
        <p>It looks like your invite is invalid or has expired!</p>
      </div>
      <Button
        variant="outline"
        className="w-full flex flex-1 justify-center items-center gap-2 border-primary text-primary px-4 py-2 disabled:opacity-50 cursor-pointer transition-colors duration-300 rounded-lg hover:text-primary hover:bg-violet-50"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
}

export default InviteError;
