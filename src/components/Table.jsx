import React from "react";
import { Link } from "react-router-dom";

/**
 *
 * pass table headings as an array to `cols`
 * rows should be a 2d array.
 * no heading displays the table with no heading
 */
const Table = ({ cols, rows, noHeading, hasLinks, links }) => {
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
                            className={`relative ${
                                index % 2 === 0 ? "bg-gray-100" : ""
                            }`}
                        >
                            {row.map((cell, index) => (
                                <td key={index} className="p-3">
                                    {cell}
                                </td>
                            ))}
                            {hasLinks && (
                                <Link
                                    to={links[index] ? links[index] : ""}
                                    className="absolute w-full h-full bg-white border left-0 opacity-0"
                                ></Link>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
