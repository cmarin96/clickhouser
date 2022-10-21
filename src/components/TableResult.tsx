import { Tooltip2 } from "@blueprintjs/popover2";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { JsonResult } from "../lib/peform-query";

type Params = {
  result: JsonResult;
};

export default function TableResult({ result }: Params) {
  const widths = Array.from(
    { length: Math.min(50, result.data.length) },
    (_: undefined, i: number) => i
  )
    .map((i) =>
      result.data[i].map((cell, colIndex) =>
        Math.max(
          Math.min(
            Math.floor(
              [...(String(cell) || "")]
                .map<number>((l) => (l.match(/[a-zA-Z0-9]/) ? 1.5 : 1))
                .reduce((a, c) => a + c, 0)
            ),
            50
          ) * 8,
          result.meta[colIndex].name.length * 10
        )
      )
    )
    .reduce((acc, curr) => acc.map((accCell, i) => Math.max(accCell, curr[i])));

  const tableDatasetComponents = result.meta.map((meta, columnNumber) => (
    <Column
      key={meta.name}
      name={meta.name}
      cellRenderer={(rowNumber) => {
        const rawValue = result.data[rowNumber][columnNumber];

        if (rawValue == null) {
          return (
            <Cell>
              <div className="text-gray-400 font-mono">(null)</div>
            </Cell>
          );
        }
        const value = String(rawValue);
        return (
          <Cell>
            {value.length < 50 ? (
              <div className="font-mono text-ellipsis">{value}</div>
            ) : (
              <Tooltip2 content={value} placement="left-start" minimal>
                {value}
              </Tooltip2>
            )}
          </Cell>
        );
      }}
    />
  ));

  return (
    <div className="overflow-auto h-full">
      <Table2
        columnWidths={widths}
        numRows={result.rows}
        className="h-full"
        enableColumnResizing
        enableColumnReordering={false}
        enableRowResizing={false}
        enableRowReordering={false}
      >
        {tableDatasetComponents}
      </Table2>
    </div>
  );
}
