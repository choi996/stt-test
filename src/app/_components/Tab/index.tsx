'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  options: {
    label: string;
    value: string;
  }[];
  activeKey?: string;
  onChange: (activeKey: string) => void;
}

export default function Tab({ options, activeKey, onChange }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [position, setPosition] = useState({
    width: -1,
    x: -1,
  });

  const tabRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = itemRef.current[activeIndex];
    const scrollLeft = el?.offsetLeft ?? 0;

    tabRef.current?.scrollTo({
      left: scrollLeft > window.innerWidth / 2 ? scrollLeft : 0,
      behavior: 'smooth',
    });

    if (el) {
      setPosition({
        width: el.offsetWidth - 40,
        x: el.offsetLeft + 20,
      });
    }
  }, [activeIndex, activeKey, options]);

  useEffect(() => {
    setActiveIndex(options.findIndex((item) => item.value === activeKey));
  }, [activeKey, options]);

  return (
    <ul
      ref={tabRef}
      className="flex relative w-full border-b border-b-gray9 overflow-x-auto "
    >
      {options.map(({ label, value }, index) => (
        <li
          key={value}
          ref={(ref) => {
            itemRef.current[index] = ref;
          }}
          className={`py-12 px-20 text-center ${value === activeKey ? 'text-heading8' : 'text-body7'}
          ${value === activeKey ? 'text-gray2' : 'text-gray4'} transition-colors`}
          onClick={() => onChange(value)}
        >
          {label}
        </li>
      ))}
      <div
        className={`${position.width === 1 ? 'none' : 'block'} absolute bottom-0 
        transition-transform h-2 rounded-full bg-gray2`}
        style={{
          width: position.width,
          transform: `translateX(${position.x}px)`,
        }}
      />
    </ul>
  );
}
