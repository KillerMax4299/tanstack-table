import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./App.css";
import { Table } from "flowbite-react";
import { Pagination } from "./Pagination";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { exportToExcel } from "./exportExcel";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function App() {
  const { data: movieList } = useQuery({
    queryKey: ["movieList"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://103.87.172.95:8094/api/actionplan/getActionList/1"
      );
      return data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => movieList ?? [], [movieList]);
  const list = [
    {
      header: "Sl no",
      accessorKey: "actionSL",
      className: "font-bold text-black text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Scheme Area",
      accessorKey: "schemeArea",
      headClass: "cursor-pointer",
      cell: ({ row }) => (row.original.schemeArea == "R" ? "Rural" : "Urban"),
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headClass: "cursor-pointer",
      cell: ({ row }) => row.original.finYear
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  


  const table = useReactTable({
    data,
    columns: list,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: parseInt(items),
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    if (items == "all") table.setPageSize(9999);
    else table.setPageSize(parseInt(items));
  }, [items]);

  function rowToArray() {
    let array = []
    table.getCoreRowModel().rows.forEach((row) => {
      const cells = row.getVisibleCells();
      const values = cells.map((cell) => console.log(cell.row.getVisibleCells()));
      array.push(values);
    });
    return array;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <input
          type="text"
          value={filtering}
          className="border h-12"
          onChange={(e) => setFiltering(e.target.value)}
        />
        <select
          name=""
          id=""
          value={items}
          onChange={(e) => setItems(e.target.value)}
        >
          {ListOptions.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <button
          className="border px-4 bg-green-600/90 text-white rounded"
          // onClick={()=>exportToExcel(rowToArray())}
          onClick={rowToArray}
        >
          XLSX
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-hidden h-fit w-1/5">
        <Table className="mt-4 drop-shadow-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Head key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.HeadCell
                  key={header.id}
                  className={classNames(
                    header.column.columnDef.headClass,
                    "hover:bg-zinc-200/70 transition-all"
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={classNames(
                        "flex items-center justify-between space-x-2",
                        header.column.columnDef.header == "Movie" &&
                          "min-w-[325px]"
                      )}
                    >
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <SortIcon sort={header.column.getIsSorted()} />
                    </div>
                  )}
                </Table.HeadCell>
              ))}
            </Table.Head>
          ))}

          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    className={cell.column.columnDef.className}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Pagination data={data} table={table} />
    </div>
  );
}

export default App;

const SortIcon = ({ sort }) => {
  return (
    <>
      <div className="flex flex-col text-xs text-zinc-600 ">
        {sort == "asc" ? (
          <Icon icon={"bxs:up-arrow"} />
        ) : (
          <Icon icon={"bx:up-arrow"} />
        )}
        {sort == "desc" ? (
          <Icon icon={"bxs:down-arrow"} />
        ) : (
          <Icon icon={"bx:down-arrow"} />
        )}
      </div>
    </>
  );
};
