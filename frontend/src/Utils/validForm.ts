type Value = object & {
  userName: string;
  userColor: string;
};

export function validForm(form: object) {
  const _form = form as Value;
  if (!_form.userColor) throw new Error('color');
  if (!_form.userName) throw new Error('name');
  return form;
}
