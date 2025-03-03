const BREAKPOINTS = {
  mobile: 501,
  tablet: 1280,
} as const;

export const devices = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
};

export default BREAKPOINTS;
