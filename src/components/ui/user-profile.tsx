import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogin } from "../login-provider";

const UserProfile = () => {
  const { setStatus } = useLogin();

  const handleLogOut = () => {
    setStatus("false");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 bg-white"
          src="/user.png"
          alt="Bordered avatar"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{localStorage.getItem("email")}</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
