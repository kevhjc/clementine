export const validateEmail = (email: string) => {
  if (
    !email ||
    !email.match(
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return 'Please enter a valid email address';
  }
  return false;
};

export const validateUrl = (website: string) => {
  if (
    !website.match(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([/-/.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    )
  ) {
    return 'Please enter a valid URL';
  }
  return false;
};

export const validateTask = (task: string) => {
  if (!task) {
    return 'Please enter a task';
  }
  return false;
};

export const validateNote = (body: string) => {
  if (!body) {
    return 'Please enter a valid note';
  }
  return false;
};
