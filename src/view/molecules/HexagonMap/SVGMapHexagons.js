import { Color } from "../../../nonview/base";
import { STYLE } from "../../../nonview/constants";
import { Party } from "../../../nonview/core";

import SVGHexagon from "./SVGHexagon";
import SVGHexagonLabel from "./SVGHexagonLabel";

export default function SVGMapHexagons({
  mapData,
  resultIdx,
  db,
  setActivePDID,
}) {
  const { idx } = mapData;

  return Object.entries(idx).map(function ([entID, points]) {
    const nPoints = points.length;


    const result = resultIdx[entID];

    let color = STYLE.COLOR.LIGHTEST;
    let opacity = 1;

    if (result) {
      const winningPartyID = result.partyToVotes.winningPartyID;
      color = Party.fromID(winningPartyID).color;
      opacity = Color.getOpacity(result.partyToVotes.pWinner);
    }
    const onClick = function () {
      if (entID.length === 6) {
        setActivePDID(entID);
      }
    };

    const renderedHexagons = points.map(function ([x, y], iPoint) {

    

      return (
        <SVGHexagon
       key={iPoint}
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={color}
        opacity={opacity}
        onClick={onClick}
      />
      )

  
    });

    const [x, y] = points.reduce(
      function ([x, y], [x2, y2]) {
        return [x + x2, y + y2];
      },
      [0, 0]
    ).map(function (z) {
      return z / nPoints;
    });

    const ent = db.pdIdx[entID] || db.edIdx[entID] || db.provinceIdx[entID];
    const label = ent.name;

    return (
      <g  key={entID}>
     {renderedHexagons}
      <SVGHexagonLabel
      x={x}
      y={y / Math.cos(Math.PI / 6)}
      color={color}
      opacity={opacity}
      label={label}
      onClick={onClick}
    />
    </g>
    );
  });
}
