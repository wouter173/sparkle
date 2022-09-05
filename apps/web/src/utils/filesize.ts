// code from stackoverflow
// https://stackoverflow.com/a/20732091/9164143

export function humanFileSize(size: number) {
  let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return ~~(size / Math.pow(1024, i)) + "" + ["B", "kB", "MB", "GB", "TB"][i];
}
