const oborar = (options) =>
  !Array.isArray(options) && typeof options === "object"
    ? Object.keys(options).map((option) => ({
        label: options[option].name,
        value: options[option]._id,
      }))
    : options;

export default oborar;
