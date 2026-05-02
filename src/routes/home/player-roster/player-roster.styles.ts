import { css } from "@styled-system/css";

const focusRing = {
  boxShadow: "0 0 0 3px rgba(28, 28, 28, 0.18)",
  outline: "none",
};

export const styles = {
  roster: css({
    borderTop: "1px solid #dedbd4",
    display: "grid",
    gap: "3",
    pt: "5",
  }),
  rosterHeader: css({
    alignItems: "center",
    display: "flex",
    gap: "3",
    justifyContent: "space-between",
  }),
  rosterTitle: css({
    color: "#202020",
    fontSize: "1.1rem",
    fontWeight: "800",
    lineHeight: "1.2",
    m: "0",
  }),
  playerCount: css({
    color: "#5a5a5a",
    fontSize: "0.9rem",
    fontWeight: "800",
    lineHeight: "1.2",
    m: "0",
  }),
  emptyRoster: css({
    background: "#fbfaf7",
    border: "2px dashed #c9c7c1",
    borderRadius: "8px",
    color: "#5a5a5a",
    fontSize: "0.95rem",
    fontWeight: "700",
    lineHeight: "1.4",
    m: "0",
    p: "4",
  }),
  playerList: css({
    display: "grid",
    gap: "2",
    listStyle: "none",
    m: "0",
    p: "0",
  }),
  playerItem: css({
    alignItems: "center",
    background: "#fbfaf7",
    border: "2px solid #c9c7c1",
    borderRadius: "8px",
    display: "grid",
    gap: "3",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    minH: "3.5rem",
    px: "3",
  }),
  playerName: css({
    color: "#202020",
    fontSize: "1rem",
    fontWeight: "800",
    lineHeight: "1.25",
    minW: "0",
    overflowWrap: "anywhere",
  }),
  removeButton: css({
    alignItems: "center",
    appearance: "none",
    background: "#ffffff",
    border: "2px solid #c9c7c1",
    borderRadius: "8px",
    color: "#202020",
    cursor: "pointer",
    display: "inline-flex",
    h: "2.35rem",
    justifyContent: "center",
    w: "2.35rem",
    _focusVisible: focusRing,
    _hover: {
      background: "#f0eee8",
    },
  }),
  removeIcon: css({
    h: "1.25rem",
    w: "1.25rem",
  }),
};
