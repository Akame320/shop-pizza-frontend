const convertToFormData = (form) => {
  const formData = new FormData();
  for (let key in form) formData.append(key, form[key]);

  return formData;
};

const getImgPath = (imgName) => {
  return `http://localhost:5000/${imgName}`;
};

export { convertToFormData, getImgPath };
