import Link from "next/link";

export default function UploadButton() {
  return (
    <Link href="/upload">
      <button className="w-14 h-14 border-2 fixed right-5 bottom-5 rounded-2xl bg-primary-color hover:bg-primary-color-hovered transition-colors duration-150 p-3 cursor-pointer">
        <img src="/icons/Upload.svg" alt="upload icon" />
      </button>
    </Link>
  );
}
