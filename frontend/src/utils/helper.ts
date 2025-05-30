export const getColorByIndex = (index: number) => {
  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-purple-50",
    "bg-orange-50",
    "bg-pink-50",
    "bg-teal-50",
    "bg-indigo-50",
    "bg-rose-50",
    "bg-cyan-50",
    "bg-amber-50",
    "bg-emerald-50",
    "bg-violet-50",
    "bg-sky-50",
    "bg-lime-50",
    "bg-fuchsia-50"
  ];
  return colors[index % colors.length];
};
