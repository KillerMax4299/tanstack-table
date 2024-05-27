import { useState, useMemo, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./App.css";
import { Table } from "flowbite-react";
import { Pagination } from "./Pagination";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { exportToExcel, exportToCSV } from "./exportExcel";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SuccessModal from "./SuccessModal";

function App() {
  const tableRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  //http://103.87.172.95:8094/api/user/getUserList?created_by=1

  const { data: designationList } = useQuery({
    queryKey: ["designationList"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8094/api/mastertable/DesignationList"
      );
      return data.result;
    },
  });

  const { data: getreq } = useQuery({
    queryKey: ["getreq"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000");
      return data;
    },
  });

  const {
    data: Tdata,
    mutate,
    isSuccess,
  } = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:4000",{});
    },
    onSuccess: (e) => {
      setOpenModal(true);
    },
    mutationKey: ["addDepartment"],
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => designationList ?? [], [designationList]);
  const list = [
    {
      header: "Sl no",
      accessorKey: "designationId",
      className: "font-bold text-black text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Tier",
      accessorKey: "designationLevel",
      headClass: "cursor-pointer",
    },
    {
      header: "Designation",
      accessorKey: "designation",
      headClass: "cursor-pointer",
    },
    {
      header: "User Type",
      accessorKey: "userType",
      headClass: "cursor-pointer",
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
    let array = [];
    table.getFilteredRowModel().rows.forEach((row) => {
      const cells = row.getVisibleCells();
      const values = cells.map((cell) => cell.getValue());
      array.push(values);
    });

    return array;
  }

  const [allData, setAllData] = useState([]);

  function updateVal(val, index) {
    const new_array = [...allData];
    new_array[index] = val;

    setAllData(new_array);
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
          onClick={() => exportToExcel(rowToArray(), table)}
          // onClick={rowToArray}
        >
          XLSX
        </button>
        <button
          className="border px-4 text-black rounded border-black"
          onClick={() => exportToCSV(table)}
          // onClick={()=>exportExcel(table.getFilteredRowModel().rows)}
        >
          CSV
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-hidden h-fit w-fit">
        <Table className="mt-4 drop-shadow-none" ref={tableRef} id="hello">
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
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
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
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>Action</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Pagination data={data} table={table} />
      <button onClick={() => mutate()}>add</button>
      <div>
        {/* <div className="flex flex-col space-y-2">
          {allData.map((e, index) => (
            <RadioButton index={index} value={e} updateVal={updateVal} />
          ))}
        </div> */}
        <SuccessModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          message={`Your order ${Tdata?.data} has been placed successfully.`}
          isSuccess={isSuccess}
        />
      </div>
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

const RadioButton = ({ index, value, updateVal }) => {
  return (
    <div className="flex flex-col">
      <ul className="inline-flex items-center -space-x-[2px]">
        <li>
          <button
            className={classNames(
              "rounded-l-lg border px-3 py-2 leading-tight border-blue-500",
              value ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            )}
            value={true}
            onClick={(e) => updateVal(Boolean(e.target.value), index)}
          >
            Yes
          </button>
        </li>
        <li>
          <button
            className={classNames(
              "rounded-r-lg border px-3 py-2 leading-tight border-blue-500  ",
              !value ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            )}
            value={false}
            onClick={(e) => updateVal(Boolean(), index)}
          >
            No
          </button>
        </li>
      </ul>
    </div>
  );
};
