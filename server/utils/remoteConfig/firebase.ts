import * as admin from 'firebase-admin';
import { type RemoteConfigParameter } from 'firebase-admin/remote-config';

export function parseRemoteConfigParameters(parameters: {
  [key: string]: RemoteConfigParameter;
}) {
  const keys = Object.keys(parameters);

  return keys.reduce((previous, current) => {
    // eslint-disable-next-line complexity
    function getDefaultValue() {
      // ParameterValueType: 'STRING' | 'BOOLEAN' | 'NUMBER' | 'JSON'
      if (parameters[current].valueType === 'BOOLEAN') {
        // @ts-expect-error - We know that the value is a boolean
        return parameters[current].defaultValue.value === 'true';
      }
      if (parameters[current].valueType === 'NUMBER') {
        // @ts-expect-error - We know that the value is a number
        return Number(parameters[current].defaultValue.value);
      }
      if (parameters[current].valueType === 'JSON') {
        // @ts-expect-error - We know that the value is a JSON object
        return JSON.parse(parameters[current].defaultValue.value || '{}');
      }
      // @ts-expect-error - We know that the value is a string
      return parameters[current].defaultValue.value;
    }
    return {
      ...previous,
      [current]: getDefaultValue(),
    };
  }, {});
}

export async function getServerRemoteConfig<T>() {
  const config = admin.remoteConfig();
  const template = await config.getTemplate();
  return parseRemoteConfigParameters(template.parameters) as T;
}
