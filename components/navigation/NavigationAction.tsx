"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";
import { useModalStore } from "@/hooks/useModal";
const NavigationAction = () => {
  const { onOpen } = useModalStore();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="add a server">
        <button onClick={() => onOpen("createStore")} className="group">
          <div className="flex items-center justify-center h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[12px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              size={25}
              className="group-hover:text-white transition text-emerald-500"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
export default NavigationAction;
  