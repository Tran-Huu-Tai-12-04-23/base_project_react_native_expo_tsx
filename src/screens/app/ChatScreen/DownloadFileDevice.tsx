import {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as DocumentPicker from 'react-native-document-picker';

export const PickerDocument = async () => {
  const [filePath, setFilePath] = useState('');
  const handlePickerDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: false,
      });
      const fileUri = result[0].fileCopyUri;
      if (!fileUri) {
        console.log('File URI is undefined or null', fileUri);
        return;
      }
      if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
        setFilePath(fileUri);
      } else {
        setFilePath(fileUri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker', err);
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  // Render your component JSX here
  return (
    <div>
      {/* Your component JSX */}
      <button onClick={handlePickerDocument}>Pick Document</button>
    </div>
  );
};

function DownloadFileDevice(file: any) {
  const fileExtension = file.split('.').pop();
  ReactNativeBlobUtil.config({
    fileCache: true,
    appendExt: fileExtension,
  })
    .fetch('GET', file, {})
    .then((res: any) => {
      if (Platform.OS === 'ios') {
        ReactNativeBlobUtil.ios.previewDocument(res.path());
      } else {
        ReactNativeBlobUtil.config({
          fileCache: true,
          appendExt: fileExtension,
          addAndroidDownloads: {
            title: `HINHANH-${new Date().getMilliseconds()}`,
            description: `HINHANH-${new Date().getMilliseconds()}`,
            mime: fileExtension == 'png' ? 'image/png' : 'application/pdf',
            useDownloadManager: true,
            mediaScannable: true,
            notification: true,
            path:
              ReactNativeBlobUtil.fs.dirs.LegacyDownloadDir +
              `TEP-${new Date().getMilliseconds()}.${fileExtension}`,
          },
        })
          .fetch('GET', file)
          .then(res => {
            console.log('----------sussecc');
          })
          .catch(error => {
            console.log('----------errro');
          });
      }
    })
    .catch((error: any) => {
      console.log('----error', error);
    });
}
