import React from "react";

const BioTable = ({ bioData }) => {
    return (
        <div className="text-xs w-full py-2">
            <table>
                <tbody>
                    <tr>
                        <td className="p-2 font-medium">Age</td>
                        <td className="p-2">{bioData.age}</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Gender</td>
                        <td className="p-2">{bioData.gender}</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Phone</td>
                        <td className="p-2">+{bioData.phone}</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Address</td>
                        <td className="p-2">{bioData.address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BioTable;
