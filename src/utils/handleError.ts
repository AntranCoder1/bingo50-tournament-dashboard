export const handleError = (check: boolean, atError: string) => {
  if (!check) {
    throw new Error("Request Faield In Function " + atError);
  }
};
