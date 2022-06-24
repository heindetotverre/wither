export const sanitizeStylingValue = (stylingValue: string) => {
  return parseInt(stylingValue.replace('px', ''))
}