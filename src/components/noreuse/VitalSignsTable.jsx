import React from "react";

const VitalSignsTable = ({ vitals }) => {
    return (
        <div className="text-xs w-full p-2">
            <table>
                <tbody>
                    <tr>
                        <td className="p-2 font-medium">Temperature</td>
                        <td className="p-2">{vitals?.temperature} °C</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Pulse rate</td>
                        <td className="p-2">{vitals?.pulseRate} bpm</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">BMI</td>
                        <td className="p-2">
                            {Math.floor(
                                vitals?.weight /
                                    (vitals?.height * vitals?.height)
                            )}{" "}
                            kg/m²
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Weight</td>
                        <td className="p-2">{vitals?.weight} kg</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Height</td>
                        <td className="p-2">{vitals?.height} m</td>
                    </tr>
                    <tr>
                        <td className="p-2 font-medium">Blood pressure</td>
                        <td className="p-2">{vitals?.bPressure} mmHg</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default VitalSignsTable;
