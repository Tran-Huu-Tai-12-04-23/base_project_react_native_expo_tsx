import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";
type TJson =
  | String
  | string
  | Number
  | number
  | Boolean
  | boolean
  | any
  | [String]
  | [string]
  | [Number]
  | [number]
  | [Boolean]
  | [boolean]
  | [any];
function Json(): ClassDecorator {
  return function (target: any) {
    return JsonObject("")(target);
  };
}
function JsonProp(): PropertyDecorator;
function JsonProp(options?: {
  name: string;
  type: TJson;
  isOptional?: boolean;
}): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    if (!options || Object.keys(options).length === 0) {
      JsonProperty()(target, propertyKey as string);
      return;
    }
    const { name = propertyKey as string, type, isOptional = false } = options;
    JsonProperty(name, type, isOptional)(target, propertyKey as string);
    return;
  };
}

function deserializeObject<T>(json: any, clazz: { new (): T }): T {
  try {
    const convert = new JsonConvert();
    convert.ignoreRequiredCheck = true;
    return convert.deserializeObject(json, clazz);
  } catch (error) {
    return new clazz();
  }
}

export { deserializeObject, Json, JsonProp };
