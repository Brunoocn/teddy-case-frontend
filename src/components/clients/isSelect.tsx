import { Minus, Plus } from "lucide-react";

interface IsSelectProps {
  isSelect: boolean;
  onClick: VoidFunction;
}

export default function IsSelect({ isSelect, onClick }: IsSelectProps) {
  return (
    <>
      {isSelect ? (
        <button className="bg-none cursor-pointer" onClick={onClick}>
          <Minus className="h-[20px] w-[20px] text-black" />
        </button>
      ) : (
        <button className="bg-none cursor-pointer" onClick={onClick}>
          <Plus className="h-[20px] w-[20px] text-black" />
        </button>
      )}
    </>
  );
}
