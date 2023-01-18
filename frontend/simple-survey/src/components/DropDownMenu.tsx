import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as ChevronDown } from "../icons/ChevronDown.svg";

interface DropDownMenuProps {
  className?: string,
  items: string[],
  onChange: (item: string) => void
}

// Hook
function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  className,
  items,
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelectItem = (item: string) => {
    onChange(item);
    setSelectedItem(item);
    setOpen(false);
  } 

  const mapItemsToChose = () => {
    return items.filter(item => item !== selectedItem)
      .map(item => 
          <div onClick={() => handleSelectItem(item)}
                className="bg-white absolute cursor-pointer border border-solid border-[#000000] w-full text-center p-1">
            {item}
          </div>
        )
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="w-full flex items-center justify-between cursor-pointer border border-solid border-[#000000] text-center py-1 px-2" onClick={handleOpen}>
        <div>{selectedItem}</div>
        <ChevronDown className={`w-6 h-6 ${open ? "transform rotate-[180deg]" : ""}`}/>
      </div>
      {open && 
        <div className="absolute transform translate-y-full w-full">
          {mapItemsToChose()}
        </div>
      }
    </div>
  );
}
  
export default DropDownMenu;