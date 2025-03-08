export function isObjectEmpty(obj: any) {
  for (const x in obj) {
    return false;
  }
  return true;
}
