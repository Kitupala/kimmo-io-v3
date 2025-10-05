const Badge = ({ text }: { text: string }) => (
  <span className="fade-stripe mr-2 mb-2 inline-block rounded-full bg-grid-line px-2.5 py-1 text-[11px] font-light text-text-quaternary transition-colors duration-300 sm:text-xs">
    {text}
  </span>
);

const BadgeList = ({ items }: { items: string[] }) => (
  <div className="mt-6 -ml-0.5 flex flex-wrap">
    {items.map((item, i) => (
      <Badge key={i} text={item} />
    ))}
  </div>
);

export default BadgeList;
