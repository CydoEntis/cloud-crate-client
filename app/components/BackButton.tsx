import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

function BackButton() {
  return (
    <Button variant="ghost" className="text-purple-600 hover:text-purple-800 cursor-pointer">
      <ChevronLeft />
      Back to bucket
    </Button>
  );
}

export default BackButton;
