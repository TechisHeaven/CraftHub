export const validateRequiredFields = (
  fields: Record<string, any>,
  requiredFields: string[]
): boolean => {
  for (const field of requiredFields) {
    if (!fields[field]) {
      return false;
    }
  }
  return true;
};
