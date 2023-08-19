interface IGoogleButtonProps {
  handler: () => Promise<void>;
}

export default function GoogleButton({ handler }: IGoogleButtonProps) {
  return (
    <button
      type="button"
      className="border border-gray-300 border-opacity-50 rounded-md mb-3 w-full gap-2.5 center p-2"
      onClick={handler}
    >
      <img className="w-4 h-4" src="/assets/google-icon.webp" />
      <div className="font-semibold text-gray-500">Continue With Google</div>
    </button>
  );
}
