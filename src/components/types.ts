export interface Note {
  header: string,
  text: string,
  changed: {
    nanoseconds: number,
    seconds: number
  }
}
