export function validator(data, config) {
  let errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired":
        try {
          statusValidate =
            typeof data === "boolean" ? !data : data.trim() === "";
        } catch (err) {
          console.log("ERROR: ", err);
          console.log("DATA: ", data);
        }

        break;
      case "isEmail":
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      case "isCapital":
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      case "isContainDigit":
        const containDigitRegExp = /\d+/g;
        statusValidate = !containDigitRegExp.test(data);
        break;
      case "min":
        statusValidate = data.length < config.value;
        break;
      case "isFullArray":
        statusValidate = data.length === 0;
        break;
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
