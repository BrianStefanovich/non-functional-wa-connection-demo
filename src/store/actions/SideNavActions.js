export function changeNav(newTab) {
  return {
    type: "CHANGE",
    data: `${newTab}`,
  };
}
