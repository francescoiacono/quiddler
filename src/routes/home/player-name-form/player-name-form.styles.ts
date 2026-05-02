import { css } from "@styled-system/css";

const focusRing = {
  boxShadow: "0 0 0 3px rgba(28, 28, 28, 0.18)",
  outline: "none",
};

export const styles = {
  form: css({
    borderTop: "1px solid #dedbd4",
    display: "grid",
    gap: "4",
    pt: "5",
  }),
  field: css({
    display: "grid",
    gap: "2",
  }),
  addPlayerRow: css({
    display: "grid",
    gap: "2",
    gridTemplateColumns: "minmax(0, 1fr) auto",
  }),
  label: css({
    color: "#4d4d4d",
    fontSize: "0.9rem",
    fontWeight: "800",
    lineHeight: "1.2",
  }),
  input: css({
    appearance: "none",
    background: "#fbfaf7",
    border: "2px solid #c9c7c1",
    borderRadius: "8px",
    color: "#202020",
    fontSize: "1rem",
    lineHeight: "1.4",
    minH: "3.25rem",
    outline: "none",
    px: "3",
    transition: "border-color 120ms ease, box-shadow 120ms ease",
    width: "100%",
    _disabled: {
      color: "#767676",
      cursor: "not-allowed",
      opacity: "0.7",
    },
    _focusVisible: focusRing,
    _placeholder: {
      color: "#767676",
    },
  }),
  addButton: css({
    alignItems: "center",
    appearance: "none",
    background: "#202020",
    border: "2px solid #202020",
    borderRadius: "8px",
    color: "#ffffff",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "0.95rem",
    fontWeight: "800",
    justifyContent: "center",
    lineHeight: "1",
    minH: "3.25rem",
    px: "4",
    _disabled: {
      cursor: "not-allowed",
      opacity: "0.45",
    },
    _focusVisible: focusRing,
    _hover: {
      background: "#3a3a3a",
      borderColor: "#3a3a3a",
    },
  }),
  helper: css({
    color: "#5a5a5a",
    fontSize: "0.9rem",
    fontWeight: "700",
    lineHeight: "1.35",
    m: "0",
  }),
  error: css({
    color: "#9f1239",
    fontSize: "0.9375rem",
    fontWeight: "800",
    lineHeight: "1.4",
    m: "0",
  }),
};
