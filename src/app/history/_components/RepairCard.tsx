import CardTableRow from '@/app/_components/CardTableRow';
import dayjs from 'dayjs';

interface Props {
  createdAt: string;
  repairShopName: string;
  managerName: string;
  list: string[];
  distance: number;
}

export default function RepairCard({
  createdAt,
  repairShopName,
  managerName,
  list,
  distance,
}: Props) {
  return (
    <li className="py-24 px-20 [&:not(:last-child)]:border-b-10 [&:not(:last-child)]:border-gray10">
      <p className="mb-16 text-heading7 text-secondary3">
        {dayjs(createdAt).format('YYYY.MM.DD')}
      </p>
      <table>
        <tbody className="[&>tr:not(:last-child)]:mb-12">
          <CardTableRow label="정비매장" text={[repairShopName]} />
          <CardTableRow label="작업자" text={[managerName]} />
          <CardTableRow label="정비매장" text={list} />
          <CardTableRow
            label="주행거리"
            text={[`${distance.toLocaleString()}km`]}
          />
        </tbody>
      </table>
    </li>
  );
}
