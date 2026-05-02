import { css } from "@styled-system/css";

export const styles = {
  header: css({
    alignItems: "start",
    display: "grid",
    gap: "3",
    gridTemplateColumns: "auto minmax(0, 1fr)",
  }),
  headerIcon: css({
    alignItems: "center",
    border: "2px solid #343434",
    borderRadius: "8px",
    color: "#202020",
    display: "inline-flex",
    h: "3.25rem",
    justifyContent: "center",
    w: "3.25rem",
  }),
  cardsIcon: css({
    h: "1.8rem",
    w: "1.8rem",
  }),
  headerText: css({
    display: "grid",
    gap: "2",
    minW: "0",
  }),
  kicker: css({
    color: "#5a5a5a",
    fontSize: "0.8125rem",
    fontWeight: "800",
    letterSpacing: "0",
    lineHeight: "1.2",
    m: "0",
    textTransform: "uppercase",
  }),
  title: css({
    fontSize: { base: "2rem", md: "2.35rem" },
    fontWeight: "800",
    letterSpacing: "0",
    lineHeight: "1.05",
    m: "0",
  }),
  intro: css({
    color: "#5a5a5a",
    fontSize: "1rem",
    fontWeight: "650",
    lineHeight: "1.45",
    m: "0",
  }),
};
