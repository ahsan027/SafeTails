function processData(
  input: string | number,
  { reverse }: { reverse: boolean } = { reverse: false }
) {
  if (reverse) {
    console.log(input);
  }
}

processData("Number", { reverse: false });
