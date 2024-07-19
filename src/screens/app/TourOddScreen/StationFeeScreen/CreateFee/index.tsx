import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Utils} from '~/@helpers/utils';
import {COLORS, normalize} from '~/common';
import FAutoComplete from '~/components/inputs/FAutocomplete';
import FInput from '~/components/inputs/FInput';
import FPickImage from '~/components/views/FPickImage';
import ModalTakePicture from '~/components/views/ModalTakePicture';
import stylesApp from '~/screens/app/styleApp';
import {IScreenProps} from '~/screens/shared/interface';
import toastService from '~/services/toast/toast.service';
import {ICommonProps} from '~/stores';
import {BindCommonProps} from '~/stores/base/decorator';
import {WorkDiaryStore} from '~/stores/workDiary/work.diary.store';

const mess = 'Vui lòng điền thông tin.';

interface IProps extends IScreenProps, ICommonProps {
  workDiaryStore?: WorkDiaryStore;
  closeModal?: Function;
  scheduleId?: string;
}

@BindCommonProps('workDiaryStore')
export default class CreateFee extends Component<IProps> {
  state = {
    description: null,
    price: null,
    imageUrl: null,
    tollStationId: null,
    visible: null,
    vaLidDescription: false,
    vaLidTollStation: false,
    vaLidPrice: false,
    validImageUrl: false,
    visibleCam: false,
    keyCamera: null,
  };

  componentDidMount = async () => {
    const {workDiaryStore, navigation, authStore, scheduleId} = this.props;
    // const body = {
    //   scheduleId: scheduleId,
    // };
    // await workDiaryStore.callFeeTourOdd(body);
    await workDiaryStore.callFeeType();
  };

  openCamera = key => {
    this.setState({keyCamera: key});
    this.toogleVisbleCamera(true);
  };

  toogleVisbleCamera = (visiable: boolean) => {
    this.setState({visibleCam: visiable});
  };

  handleSetPicture = (uri: string) => {
    const {keyCamera} = this.state;
    this.setState({[keyCamera]: uri});
    this.toogleVisbleCamera(false);
  };

  handleSave = async () => {
    const {
      workDiaryStore,
      navigation,
      authStore,
      route,
      closeModal,
      scheduleId,
    } = this.props;
    const {price, description = '', imageUrl, tollStationId} = this.state;
    let rs = true;
    this.setState({
      vaLidTollStation: false,
      vaLidPrice: false,
      validImageUrl: false,
      vaLidDescription: false,
    });
    // if (!description) {
    //   this.setState({vaLidDescription: true});
    //   rs = false;
    // }
    if (!price) {
      this.setState({vaLidPrice: true});
      rs = false;
    }
    if (!imageUrl) {
      this.setState({validImageUrl: true});
      rs = false;
    }
    if (!tollStationId) {
      this.setState({vaLidTollStation: true});
      rs = false;
    }
    if (rs) {
      const isConnected = await authStore.checkNetWork();
      if (isConnected) {
        const res = await workDiaryStore.saveStationFareTourOdd(
          price,
          imageUrl,
          tollStationId,
          scheduleId,
        );
        const body = {
          scheduleId: scheduleId,
        };
        if (res?.code == 200) {
          toastService.success('Lưu thông tin thành công.');
          await workDiaryStore.callFeeTourOdd(body);
          closeModal();
        } else {
          Alert.alert('Lưu thông tin không thành công.');
        }
      }
    }
  };

  render() {
    const {closeModal, workDiaryStore} = this.props;

    const {
      price,
      description,
      imageUrl,
      tollStationId,
      vaLidTollStation,
      vaLidPrice,
      validImageUrl,
      visibleCam,
      vaLidDescription,
    } = this.state;

    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 15,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 15,
              color: COLORS.black,
            }}>
            Tạo thông tin chi phí phát sinh
          </Text>
          <FAutoComplete
            //@ts-ignore
            title={'Loại chi phí phát sinh'}
            value={tollStationId}
            placeholder={'Tất cả'}
            onChooseValue={(value: string) =>
              this.setState({tollStationId: value})
            }
            items={workDiaryStore.feeTypes.map((item, idx) => ({
              ...item,
              value: item.id,
              label: item.name,
              id: item.id,
            }))}
            errorMessage={mess}
            containtStyle={{marginHorizontal: 10}}
          />

          {/* <FInput
            type="square"
            label={'Địa chỉ'}
            labelStyle={[stylesApp.txtSmallBold, {color: 'black'}]}
            placeholder={'Địa chỉ'}
            value={Utils.pipeTextUi(description || '')}
            onChangeText={value => {
              this.setState({description: value || ''});
            }}
            inputStyle={stylesApp.txtSmall}
            containerStyle={{marginTop: 10}}
            inputContainerStyle={{height: 35}}
            errorMessage={mess}
            errorStyle={{
              display: Utils.checkAndRenderMessErr(vaLidDescription),
              fontWeight: '500',
            }}
          /> */}

          <FInput
            type="square"
            label={'Chi phí phát sinh *'}
            labelStyle={[stylesApp.txtSmallBold, {color: 'black'}]}
            placeholder={'Nhập chi phí phát sinh'}
            value={Utils.pipeTextUi(
              price ? Utils.pipeCurrency(parseInt(price), '') : '',
            )}
            onChangeText={value => {
              this.setState({
                price: value ? Utils.replaceNumberal(value).toString() : '',
              });
            }}
            containerStyle={{marginTop: 10}}
            keyboardType="numeric"
            inputStyle={stylesApp.txtSmall}
            inputContainerStyle={{height: 35}}
            errorMessage={mess}
            errorStyle={{
              display: Utils.checkAndRenderMessErr(vaLidPrice),
              fontWeight: '500',
            }}
          />

          <View>
            <Text
              style={[stylesApp.txtSmallBold, {marginLeft: 10, marginTop: 10}]}>
              Hình ảnh * :
            </Text>
            <Text
              style={[
                stylesApp.errStyle,
                {
                  display: Utils.checkAndRenderMessErr(validImageUrl),
                  marginLeft: 15,
                },
              ]}>
              {mess}
            </Text>
          </View>
          <View
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <FPickImage
              width={200}
              height={200}
              value={imageUrl}
              openCamera={() => this.openCamera('imageUrl')}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              icon={{
                type: 'material',
                name: 'check',
                size: 15,
                color: 'white',
              }}
              type="solid"
              containerStyle={{width: '49%', marginRight: 5}}
              onPress={() => this.handleSave()}
              loading={workDiaryStore.isLoading}
            />
            <Button
              icon={{
                type: 'material',
                name: 'cancel',
                size: 15,
                color: 'white',
              }}
              type="clear"
              containerStyle={{
                backgroundColor: '#ff6666',
                width: '49%',
                marginRight: 5,
              }}
              onPress={() => closeModal()}
              loading={workDiaryStore.isLoading}
            />
          </View>

          <ModalTakePicture
            visible={visibleCam}
            cancel={() => this.toogleVisbleCamera(false)}
            picture={this.handleSetPicture}
            imageLibrary={true}
            imageCamera={true}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 10,
  },
  itemStyle: {
    borderRadius: normalize(5),
    padding: normalize(7),
    backgroundColor: COLORS.white,
    flex: 1,
    margin: normalize(5),
    ...Platform.select({
      ios: {
        shadowOffset: {height: 2, width: -2.5},
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
