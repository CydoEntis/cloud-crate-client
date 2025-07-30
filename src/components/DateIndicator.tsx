import { Calendar } from "lucide-react";

type DateIndicatorProps = {
  date: string | Date;
};

function DateIndicator({ date }: DateIndicatorProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      <Calendar className="w-4 h-4 text-muted-foreground" />{" "}
      <p className="text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}

export default DateIndicator;
