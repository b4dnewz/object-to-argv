type InputValues = number | string | boolean | any | string[];

interface IData {
  [flag: string]: InputValues;
}

interface IOptions {
  arraySeparator?: string | boolean;
  booleanNegation?: boolean;
  normalize?: boolean;
}

function normalizeKey(input: string) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function prepareKey(input: string, value: InputValues, opts: IOptions) {
  let prefix = "";

  if (input.length === 1) {
    prefix = "-";
  } else {
    if (value === false && opts.booleanNegation) {
      prefix = "--no-";
    } else {
      prefix = "--";
    }
  }

  if (opts.normalize) {
    input = normalizeKey(input);
  }

  return prefix + input;
}

/**
 * Converts an object to a suitable argv array
 */
export default function objToArgv(data: IData, opts?: IOptions): string[] {

  opts = {
    arraySeparator: ",",
    booleanNegation: false,
    normalize: true,
    ...opts,
  };

  const arr = [];

  for (const arg in data) {
    if (!data.hasOwnProperty(arg)) {
      continue;
    }

    const val = data[arg];
    const key = prepareKey(arg, val, opts);

    switch (typeof val) {
      case "number":
      case "string":
        arr.push(key, val.toString());
        break;
      case "boolean":
        if (val || opts.booleanNegation) {
          arr.push(key);
        }
        break;
      case "object":
        if (val.constructor === Object) {
          const obj = Object.keys(val).reduce((o, k) => {
            o[`${arg}.${k}`] = val[k];
            return o;
          }, {});
          arr.push(...objToArgv(obj, opts));
          break;
        }
        if (val.constructor === Array) {
          if (typeof opts.arraySeparator === "boolean") {
            if (opts.arraySeparator === false) {
              arr.push(key, ...val);
            }
          } else {
            arr.push(key, val.join(opts.arraySeparator));
          }
          break;
        }
      default:
        throw new Error(`The value of "${arg}" key "${typeof val}" is not supported.`);
    }
  }

  return arr;

}
