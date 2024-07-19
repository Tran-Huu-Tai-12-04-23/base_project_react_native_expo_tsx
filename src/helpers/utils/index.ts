import { ESize } from "@common/enums";
import moment from "moment";
import _numeral from "numeral";

export interface IObjectPromise<T = any> {
  [key: string]: () => Promise<T>;
}
export interface IObject {
  [key: string]: string;
}
const promiseWhen = (promises: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    let errors: any[] = [];
    let result: any[] = [];
    let count = 0;
    if (promises.length === 0) {
      resolve({
        errors,
        result,
      });
    } else {
      promises.map((promise, idx) => {
        promise
          .then((res) => {
            result.push(res);
            count += 1;
            if (count === promises.length) {
              resolve({
                errors,
                result,
              });
            }
          })
          .catch((err) => {
            errors.push(err.message);
            count += 1;
            if (count === promises.length) {
              resolve({
                errors,
                result,
              });
            }
          });
      });
    }
  });
};
const promiseAllObject = async (promiseObj: IObjectPromise = {}) => {
  const list = [];
  for (let index = 0; index < Object.keys(promiseObj).length; index++) {
    const key = Object.keys(promiseObj)[index];
    list.push(promiseObj[key]());
  }
  const res = await Promise.all(list);
  const output = {};
  for (let index = 0; index < Object.keys(promiseObj).length; index++) {
    const key = Object.keys(promiseObj)[index];
    Object.assign(output, {
      [key]: res[index],
    });
  }
  return output;
};
const pipeTextUi = (value: any): string => {
  //   if (isNullOrUndefined(value) || value instanceof Object) {
  //     return "";
  //   }
  return `${value}`;
};
const pipeObjectRender = <T = any>(
  obj: T
): {
  [key in keyof T]?: string;
} => {
  const output = {};
  if (obj instanceof Object) {
    Object.keys(obj).forEach((key) => {
      Object.assign(output, {
        [key]: pipeTextUi(obj[key]),
      });
    });
    return output;
  }
  return {};
};

const pipeDate = (input: Date, pattern = "DD/MM/yyyy") => {
  try {
    const output = moment(input).format(pattern);
    return output;
  } catch (error) {
    return "";
  }
};

const parseJson = <T = any>(input: any) => {
  try {
    const resJson = JSON.parse(input) as T;
    if (!resJson) {
      return {};
    }
    return resJson;
  } catch (error) {
    return {};
  }
};

if (!_numeral.vie) {
  _numeral.register("locale", "vie", {
    delimiters: {
      thousands: ",",
      decimal: ".",
    },
    currency: {
      symbol: " đ",
    },
  });
  _numeral.vie = true;
}

_numeral.locale("vie");

const numeral = _numeral;

const pipeCurrency = (input: number, pattern = ",0$") => {
  try {
    const output = numeral(input).format(pattern);
    return output;
  } catch (error) {
    return "";
  }
};

const checkAndRenderMessErr = (fieldCheck: any) =>
  fieldCheck ? "flex" : "none";

const replaceNumberal = (number: string) => parseInt(number.replace(/,/g, ""));

const parseEnum = (data: object) =>
  Object.keys(data).map((key) => ({ ...data[key] }));

const getHeightSkeleton = (height: number, radix: number) =>
  parseInt((ESize.heightScreen + height).toString().slice(0, radix));

const subtractDate = (date: Date, number: number) =>
  new Date(date.setDate(date.getDate() - number));

export const Utils = {
  promiseWhen,
  promiseAllObject,
  pipeTextUi,
  pipeObjectRender,
  pipeDate,
  parseJson,
  pipeCurrency,
  numeral,
  checkAndRenderMessErr,
  replaceNumberal,
  parseEnum,
  getHeightSkeleton,
  subtractDate,
};

export function decode(t, e) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);

    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);

    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);

    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);

    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return d.map(function (t) {
    return { latitude: t[0], longitude: t[1] };
  });
}
