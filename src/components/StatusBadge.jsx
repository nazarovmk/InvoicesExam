import { buttonVariants } from "./ui/button";

export default function StatusBadge({ status = "draft" }) {
  const style = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgb(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dote: "bg-[#33D69F]",
      text: "text-[#33D69F]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dote: "bg-[#FF8F00]",
      text: "text-[#FF8F00]",
      bg: "rgba(255,143,0,0.05)",
    },
  };

  return (
    <span
      className={`${buttonVariants({
        variant: "outline",
      })} min-w-[104px] border-none`}
      style={{ backgroundColor: style[status].bg }}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${style[status].dote}`}
      ></span>
      <span className={`capitalize ${style[status].text}`}>{status}</span>
    </span>
  );
}
