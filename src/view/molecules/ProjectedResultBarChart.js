import { Party } from "../../nonview/core";
import { Color, Format } from "../../nonview/base";

import { Box } from "@mui/material";
import { THEME_DATA } from "../_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";
import { useDataContext } from "../../nonview/core/DataProvider";

function getAxis() {
  return [
    {
      scaleType: "band",
      data: [""],

      tickPlacement: "middle",
      tickLabelPlacement: "middle",
      tickLabelStyle: {
        wordWrap: "break-word",
        fontSize: THEME_DATA.typography.fontSize * 0.7,
        fontFamily: THEME_DATA.typography.fontFamily,
      },
      categoryGapRatio: 0.1,
      barGapRatio: 0.1,
    },
  ];
}

function getStyle() {
  return {
    [`& .${barLabelClasses.root}`]: {
      fill: "white",
      fontSize: THEME_DATA.typography.fontSize * 2,
      fontFamily: THEME_DATA.typography.fontFamily,
    },
  };
}
function getBarLabel(pVotesExtra) {
  return function (item, __) {
    const pVotes = item.value;
    if (pVotes === pVotesExtra) {
      return "";
    }

    if (pVotes < 0.2) {
      return "";
    }

    return Format.percentVotesRange(pVotes, pVotes + pVotesExtra);
  };
}

function getSeries(electionProjected) {
  const result = electionProjected.resultLK;
  const partyToVotes = result.partyToVotes;
  const totalVotes = partyToVotes.totalVotes;
  const uncertainVotes = partyToVotes.partyToVotes[Party.ERROR.id];
  const pVotesExtra = uncertainVotes / totalVotes;

  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return entries.reduce(function (series, [partyID, votes]) {
    const party = Party.fromID(partyID);
    if (party.isNonParty) {
      return series;
    }

    const pVotes = votes / totalVotes;

    series.push({
      data: [pVotes],
      label: partyID,
      color: party.color,
      stack: partyID,
    });

    if (pVotesExtra) {
      const colorWithAlpha = Color.getColorWithAlpha(party.color, 0.5);
      series.push({
        data: [pVotesExtra],
        label: partyID + "-Max",
        color: colorWithAlpha,
        stack: partyID,
      });
    }

    return series;
  }, []);
}

export default function ProjectedResultBarChart() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;

  const valueFormatter = function (value) {
    return Format.percentVotes(value);
  };

  return (
    <Box sx={{ p: 0, m: 0 }}>
      <BarChart
        xAxis={[{ label: "% Votes", valueFormatter }]}
        yAxis={getAxis()}
        series={getSeries(electionProjected)}
        barLabel={getBarLabel()}
        layout="horizontal"
        width={320}
        height={280}
        sx={getStyle()}
        grid={{ vertical: true }}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 10, bottom: 40, left: 0 }}
      />
    </Box>
  );
}
