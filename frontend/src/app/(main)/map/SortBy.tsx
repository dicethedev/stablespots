import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SortByIcon } from "@/assets/svg";

interface SortByProps {
  sort: string;
  setSort: (s: string) => void;
  disabled?: boolean;
}

export function SortBy({ sort, setSort, disabled }: SortByProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm border-0 text-[#9B9B9B] font-medium gap-1 cursor-pointer"
            disabled={disabled} 
        >
          <SortByIcon className="w-4 h-4" />
          Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white rounded-[10px] border-0">
        <DropdownMenuItem
          className="text-[#1D1D20] font-medium text-sm cursor-pointer"
          onClick={() => setSort("recent")}
        >
          Most Recent
        </DropdownMenuItem>
        <DropdownMenuSeparator className="h-[0.5px] bg-[#EAEAEA]" />
        <DropdownMenuItem
          className="text-[#1D1D20] font-medium text-sm cursor-pointer"
          onClick={() => setSort("nearby")}
        >
          Based on your location
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
