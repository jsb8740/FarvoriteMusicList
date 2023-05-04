export default function timeFormat(time: number): [number, string, string] {
  const hours = Math.floor((time / 3600) % 24);
  const minutes = formattingTime(time / 60);
  const seconds = formattingTime(time);

  return [hours, minutes, seconds];
}
const formattingTime = (time: number) => {
  const value = Math.floor(time) % 60;

  if (value < 10) {
    return `0${value}`;
  }
  return value.toString();
};
