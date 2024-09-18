import {
  AppBar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { ElectionSelector, ResultTimeView } from "../../../view/atoms";
import { useState } from "react";
import { useBasePageHandlerContext } from "./BasePageHandlerProvider";
import { Translate } from "../../../nonview/base";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    padding: 0,
    margin: 0,
    color: "white",
    borderBottom: "1px solid #eee",
  },
};
const LANG_TO_LABEL = {
  si: "සිංහල",
  ta: "தமிழ்",
  en: "English",
};

function MenuItemLink({ label, href, Icon }) {
  const onClick = function () {
    window.open(href, "_blank");
  };

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>

      {Translate(label)}
    </MenuItem>
  );
}

function CustomMenu() {
  const data = useDataContext();
  const { setLang } = useBasePageHandlerContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  if (!data) {
    return null;
  }
  const { lang: selectedLang } = data;

  const handleClose = function () {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onClickRefresh = function () {
    localStorage.clear();
    window.location = "/prespoll";
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 5000 }}
      >
        {["si", "ta", "en"].map(function (lang) {
          const isSelected = lang === selectedLang;
          const onClick = function () {
            handleClose();
            setLang(lang);
          };
          return (
            <MenuItem key={lang} onClick={onClick} disabled={isSelected}>
              {LANG_TO_LABEL[lang]}
            </MenuItem>
          );
        })}
        <Divider />

        <MenuItemLink
          label="Source Code"
          href="https://github.com/nuuuwan/prespoll/"
          Icon={GitHubIcon}
        />

        <MenuItemLink
          label="Report Bugs"
          href="https://github.com/nuuuwan/prespoll/issues"
          Icon={BugReportIcon}
        />

        <Divider />
        <MenuItem onClick={onClickRefresh}>
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          {Translate("Refresh App")}
        </MenuItem>
      </Menu>
    </>
  );
}

export default function PageHeader() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const backgroundColor = electionProjected?.color || "gray";

  return (
    <Box sx={Object.assign({ backgroundColor }, STYLE_PAGE_HEADER.SELECTOR)}>
      <AppBar position="static" sx={{ backgroundColor }}>
        <Toolbar>
          <CustomMenu />

          <ElectionSelector colorElection={electionProjected} />
          <ResultTimeView entID="LK" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
