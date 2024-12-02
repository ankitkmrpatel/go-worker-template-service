import * as XLSX from "xlsx";

export default function ExcelRenderer({
  fileContent,
}: {
  fileContent: string;
}) {
  const workbook = XLSX.read(fileContent, { type: "binary" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return (
    <div>
      <h3>{sheetName}</h3>
      <table>
        <tbody>
          {data.map((row: any[], idx: number) => (
            <tr key={idx}>
              {row.map((cell: any, i: number) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
