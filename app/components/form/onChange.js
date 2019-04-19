const onChange = (handleChange, e) => {
  e.persist();

  handleChange(e.target.name, e.target.value);
};

export default onChange;
