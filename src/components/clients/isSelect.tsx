import { Minus, Plus } from "lucide-react";

interface IsSelectProps {
  isSelect: boolean;
  onChange: VoidFunction;
}

export default function IsSelect({ isSelect, onChange }: IsSelectProps) {
  return (
    <>
      {isSelect ? (
        <button className="bg-none cursor-pointer" onClick={onChange}>
          <Minus className="h-[20px] w-[20px] text-black" />
        </button>
      ) : (
        <button className="bg-none cursor-pointer" onClick={onChange}>
          <Plus className="h-[20px] w-[20px] text-black" />
        </button>
      )}
    </>
  );
}
