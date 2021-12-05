import React from "react";

const VitalSignsTable = ({ vitals }) => {
    return (
        <div className="text-xs w-full py-2">
            <table>
                <tbody>
                    <tr>
                        <td className="p-2 font-medium">Temperature</td>
                        <td className="p-2">30°C</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Pulse rate</td>
                        <td className="p-2">75 bpm</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">BMI</td>
                        <td className="p-2">28 kg/m²</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Weight</td>
                        <td className="p-2">60 kg</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Height</td>
                        <td className="p-2">1.2 m</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Blood pressure</td>
                        <td className="p-2">132/88 mmHg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default VitalSignsTable;
