const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
} as const;

export const devices = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
};

export default BREAKPOINTS;
