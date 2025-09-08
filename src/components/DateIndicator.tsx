import { Calendar } from "lucide-react";

type DateIndicatorProps = {
  date: string | Date;
};

function getOrdinal(n: number) {
  if (n >= 11 && n <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function DateIndicator({ date }: DateIndicatorProps) {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  const formattedDate = `${month} ${day}${getOrdinal(day)}, ${year}`;

  return (
    <div className="flex items-center gap-2">
      <p className="text-muted-foreground">{formattedDate}</p>
      <Calendar className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}

export default DateIndicator;
