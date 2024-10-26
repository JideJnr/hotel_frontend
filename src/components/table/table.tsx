import React from "react";

interface TableProps {
  title?: string;
  filter?: any;
  columns?: Column[];
  data?: any[];
  onClick?: (row: any) => void;
  loading?: boolean;
  children?: any;
}

export interface Column {
  accessor: string;
  Header: string;
  Cell?: (props: { value: any; row: any }) => JSX.Element | string;
}

const Table: React.FC<TableProps> = ({ columns, data, onClick, loading }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil((data?.length || 0) / 5);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedData = data?.slice((currentPage - 1) * 5, currentPage * 5);

  const handleFirstPage = () => setCurrentPage(1);

  const handleLastPage = () => setCurrentPage(totalPages);

  return (
    <div className="  !rounded-xl border flex flex-col w-full ">
      <table className=" whitespace-nowrap   min-w-full rounded-xl  border w-full bg-primary !p-0">
        {data !== null && !loading && data !== undefined && (
          <thead className="bg-[#f5f5f5] p-4 ">
            <tr className="border-b border-default p-2 ">
              {columns &&
                columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="   text-black text-left  p-2"
                  >
                    {column.Header}
                  </th>
                ))}
            </tr>
          </thead>
        )}
        <tbody className="dark:bg-[#1A1C1E] bg-white !m-0 !rounded-none w-full h-full ">
          {loading ? (
            <div className="h-full p-10 align-center w-fit mx-auto flex">
              <span className="loading mr-5">
                <i className="ri-refresh-line text-[1rem] animate-spin"></i>
              </span>
              <span>Fetching Data ...</span>
            </div>
          ) : (
            <>
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-default border text-center cursor-pointer hover:bg-gray-100 p-2"
                    onClick={() => onClick && onClick(row)}
                  >
                    {columns &&
                      columns.map((column, colIndex) => (
                        <td key={colIndex} className=" px-2 py-4  text-left ">
                          {column.Cell
                            ? column.Cell({
                                value: row[column.accessor],
                                row,
                              })
                            : row[column.accessor] !== null &&
                                row[column.accessor] !== undefined
                              ? row[column.accessor]
                              : "-"}
                        </td>
                      ))}
                  </tr>
                ))
              ) : (
                <>
                  {data && data?.length === 0 && (
                    <tr className="border-none text-center cursor-pointer py-4">
                      <td
                        colSpan={columns?.length}
                        className="mx-auto text-center w-full"
                      >
                        <div className="flex justify-center items-center">
                          No Data Found
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </>
          )}
        </tbody>
      </table>

      {data && data?.length > 5 && !loading && (
        <div className="block sm:flex items-center px-2 py-4 justify-between ">
          <div className="ml-2 mb-2 sm:mb-0">
            Page{" "}
            <strong>
              {currentPage} of {totalPages}
            </strong>
          </div>
          <div className="sm:ms-auto float-right my-1 sm:my-0 flex">
            <button
              className="btn-outline-light tablebutton me-2 mb-2 sm:mb-0"
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              {" << "}
            </button>

            <button
              className="btn-outline-light tablebutton me-2 mb-2 sm:mb-0 sm:inline block"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              {" Previous "}
            </button>

            <button
              className="btn-outline-light tablebutton sm:inline block me-2 mb-2 sm:mb-0"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {" Next "}
            </button>
            <button
              className="btn-outline-light tablebutton me-2 mb-2 sm:mb-0"
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              {" >> "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
