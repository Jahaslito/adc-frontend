import React from "react";

/**
 *
 * pass table headings as an array to `cols`
 * rows should be a 2d array.
 * no heading displays the table with no heading
 */
const Table = ({ cols, rows, noHeading }) => {
    return (
        <div className="">
            <table className="text-xs w-full border p-2">
                <tbody>
                    {!noHeading && (
                        <tr className="border-b">
                            {cols.map((col, index) => (
                                <td key={index} className="font-medium p-3">
                                    {col}
                                </td>
                            ))}
                        </tr>
                    )}
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 && "bg-gray-100"}
                        >
                            {row.map((cell, index) => (
                                <td key={index} className="p-3">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
