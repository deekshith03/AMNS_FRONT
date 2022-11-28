import FormData from 'form-data';
import { Platform } from "react-native";
export const createFormData = (file, body) => {
  const data = new FormData();
  if (file) {
    data.append('files', {
      ...file,
      name: file.name,
      uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      type: file.mimeType
    });
  }
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
}
