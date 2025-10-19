import { logout } from "@/app/logout/actions";

export default function Logout() {
  return (
    <form
      action={logout}
      className="w-14 h-14 border-2 fixed left-5 top-5 rounded-2xl bg-secondary-color hover:bg-secondary-color-hovered transition-colors duration-150 "
    >
      <button type="submit" className="w-[100%] h-[100%] p-3 cursor-pointer">
        <img src="/icons/ExitIcon.svg" alt="exit" />
      </button>
    </form>
  );
}
