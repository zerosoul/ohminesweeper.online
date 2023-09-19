import React from "react";

// type Props = {}

const Keyboard = () => {
  return (
    <table className="border-collapse">
      <tbody>
        <tr>
          <td className="p-2 border border-gray-300">
            <strong>Movement in the Game</strong>
          </td>
          <td className="p-2 border border-gray-300">
            <strong>Keyboard Control</strong>
          </td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">Select Square</td>
          <td className="p-2 border border-gray-300">Arrow Keys</td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">Uncover Tile</td>
          <td className="p-2 border border-gray-300">Space/Enter</td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">Set/Unset Flag</td>
          <td className="p-2 border border-gray-300">1</td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">Close Window</td>
          <td className="p-2 border border-gray-300">Esc</td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">How to Play</td>
          <td className="p-2 border border-gray-300">F1/Mac Cmd+1</td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">New Game</td>
          <td className="p-2 border border-gray-300">F2/Mac Cmd+2</td>
        </tr>
        <tr>
          <td className="p-2 border border-gray-300">Open/Close Game Options</td>
          <td className="p-2 border border-gray-300">F5/Mac Cmd+5</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Keyboard;
