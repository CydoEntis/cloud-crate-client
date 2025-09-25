import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";

type TruncatedTextProps = {
  text: string;
  maxLength: number;
  className?: string;
};

function TruncatedText({ text, maxLength, className }: TruncatedTextProps) {
  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate ? text.slice(0, maxLength) + "..." : text;

  if (!shouldTruncate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`cursor-help ${className}`}>{displayText}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs break-words">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TruncatedText;
