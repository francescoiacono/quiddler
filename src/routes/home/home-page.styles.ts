import { css } from "@styled-system/css";

export const styles = {
  page: css({
    alignItems: "center",
    background: "#f8fafc",
    color: "#111827",
    display: "flex",
    justifyContent: "center",
    minH: "100svh",
    px: "6",
    textAlign: "center",
  }),
  title: css({
    fontSize: { base: "2rem", md: "2.5rem" },
    fontWeight: "700",
    letterSpacing: "0",
    lineHeight: "1.1",
    m: "0",
  }),
};
