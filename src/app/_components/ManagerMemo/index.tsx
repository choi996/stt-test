'use client';

export default function ManagerMemo() {
  return (
    <div className="px-20">
      <div className="border border-solid border-gray2 rounded-lg">
        <div
          className="border-b border-solid border-gray7 bg-gray11 
        rounded-tl-lg rounded-tr-lg text-center py-12 px-20 text-heading8"
        >
          종합 의견
        </div>
        <textarea className="p-20 min-h-150 text-body7" />
      </div>
    </div>
  );
}
