import * as yup from 'yup';

interface IField {
    name: string;
    validationType: string;
    validationTypeError: string;
    validations: { type: string; params: any[] }[];
  }

function formatParams(params: any[]): any[] {
  return params.map((param) => {
    if (Array.isArray(param)) return formatParams(param);

    const p = param?.toString();
    if (p?.startsWith('$')) return eval(p.substring(1, p.length));
    if (p?.startsWith('yup.ref')) return (yup as any).ref(p.replace(/yup\.ref\((.*)\)/, '$1'));
    return p;
  });
}

function createYupSchema(fields: IField[]) {
  const schema = fields.reduce((schema, field) => {
    const { name, validationType, validationTypeError, validations = [] } = field;
    const isObject = name.indexOf('.') >= 0;

    if (!validationType || !(yup as any)[validationType]) return schema;

    let validator = (yup as any)[validationType]().typeError(validationTypeError || '');

    validations.forEach(({ type, params }) => {
      if (validator[type]) validator = validator[type](...formatParams(params));
    });

    if (!isObject) return schema.concat(yup.object().shape({ [name]: validator }));

    const reversePath = name.split('.').reverse();
    const currNestedObject = reversePath.slice(1).reduce(
      (yupObj, path) => {
        if (!isNaN(+path)) return { array: yup.array().of(yup.object().shape(yupObj)) };
        if (yupObj.array) return { [path]: yupObj.array };
        return { [path]: yup.object().shape(yupObj) };
      },
      { [reversePath[0]]: validator }
    );

    const newSchema = yup.object().shape(currNestedObject);
    return schema.concat(newSchema);
  }, yup.object().shape({}));

  return schema;
}

export default createYupSchema;
