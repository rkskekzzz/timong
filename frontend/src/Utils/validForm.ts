type Value = object & {
  userName: string;
};

export function validForm(form: object) {
  const _form = form as Value;
  if (!_form.userName) throw new Error('name');
  return form;
}
