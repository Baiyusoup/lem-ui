export function getPropName(valueProp: string | ((type: any) => string), type: any) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp;
}

export function getValueFromEvent(...args: any[]) {
  const e = args[0] as React.ChangeEvent<any>;
  // eslint-disable-next-line no-nested-ternary
  return e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
}
