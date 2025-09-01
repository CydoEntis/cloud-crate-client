// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { FolderItemType } from "@/features/folder-contents/types/folder/FolderItemType";
// import type { FolderOrFileItem } from "@/features/folder-contents/types/folder/FolderOrFileItem";
// import { MoreVertical } from "lucide-react";

// function FolderOrFileActionsMenu({ row }: { row: FolderOrFileItem }) {
//   if ((row as any).isBackRow) return null;

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
//           <MoreVertical size={20} />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="bg-secondary border-none" onClick={(e) => e.stopPropagation()}>
//         <DropdownMenuItem
//           className="hover:bg-background cursor-pointer transition-all duration-300"
//           onClick={(e) => e.stopPropagation()}
//         >
//           Rename
//         </DropdownMenuItem>
//         {row.type === FolderItemType.Folder && (
//           <DropdownMenuItem
//             className="hover:bg-background cursor-pointer transition-all duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             Change Color
//           </DropdownMenuItem>
//         )}
//         <DropdownMenuItem
//           className="hover:bg-background cursor-pointer transition-all duration-300 text-destructive"
//           onClick={(e) => e.stopPropagation()}
//         >
//           Delete
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

// export default FolderOrFileActionsMenu;
