interface Props {
  label: string;
  text: string[];
}

export default function CardTableRow({ label, text }: Props) {
  return (
    <tr className="flex items-start gap-12">
      <th className="text-body7_m text-gray5 min-w-74 w-74">{label}</th>
      <td className="flex flex-col gap-2">
        {text.map((v, index) => (
          <p key={index} className="text-body7_m break-keep">
            {v}
          </p>
        ))}
      </td>
    </tr>
  );
}
