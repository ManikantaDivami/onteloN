const ValidateInput = (schema: any, value: any) => {
  try {
    schema.validateSyncAt("value", { value: value });
    return { errorMsg: "", isValid: true };
  } catch (error) {
    const localerror = error as any;
    return { errorMsg: localerror.errors[0], isValid: false };
  }
};

export default ValidateInput;
