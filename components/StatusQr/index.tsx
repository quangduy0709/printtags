import { useMemo } from "react";
interface Props {
  ownerId: string;
  buyerId: string;
}
const StatusQr = (props: Props) => {
  const { ownerId, buyerId } = props;

  const getClassesStatus = useMemo(() => {
    const isOwn = `${Boolean(buyerId)}-${Boolean(ownerId)}`;

    switch (isOwn) {
      case "true-true":
        return "text-red-500";
      case "true-false":
        return "text-blue-500";
      default:
        return "text-green-500";
    }
  }, [ownerId, buyerId]);
  const getStatusText = useMemo(() => {
    const isOwn = `${Boolean(buyerId)}-${Boolean(ownerId)}`;

    switch (isOwn) {
      case "true-true":
        return "Bought and used";
      case "true-false":
        return "Bought and not used yet";
      default:
        return "Still";
    }
  }, [ownerId, buyerId]);

  return (
    <div
      className={`inline-flex items-center font-bold  px-2.5 py-0.5 rounded-full text-xs border border-gray-200 bg-gray-100 ${getClassesStatus}`}
    >
      {getStatusText}
    </div>
  );
};

export default StatusQr;
