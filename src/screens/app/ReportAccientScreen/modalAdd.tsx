import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NTText from '~/components/texts/FText';
import {
  FAutocomplete,
  FInput,
  FPickImage,
  ModalTakePicture,
  ModalTime,
  Row,
} from '~/components';
import {IconMaterialCommunity} from '~/@helpers/deflibs';
import {COLORS, deviceWidth, normalize} from '~/common';
import moment from 'moment';
import {Button, Input} from 'react-native-elements';
import {StoreApp} from '~/stores';
import toastService from '~/services/toast/toast.service';
import {observer} from 'mobx-react';
import FAutoComplete from '~/components/inputs/FAutocomplete';
import Animated, {useSharedValue} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

const ModalAdd = observer((props: {cancel: () => {}}) => {
  const {cancel} = props;
  const {
    getListCar,
    dataListCar,
    errorListCar,
    getListAccident,
    dataListAccident,
    errorListAccident,
    createAccident,
    dataCreateAccident,
    errorCreateAccident,
    clearDataHome,
    isLoadding,
  } = StoreApp.homeStore;

  const [isShowTime, setShowTime] = useState(false);
  const [address, setaddress] = useState('');
  const [descript, setDescript] = useState('');
  const [image, setImage] = useState('');
  const [selectTime, setselectTime] = useState(new Date());
  const [modalImg, setmodalImg] = useState(false);
  const [listCar, setlistCar] = useState([]);
  const [carSelect, setcarSelect] = useState({id: null});
  const [listAcceident, setlistAcceident] = useState([]);
  const [acceidentSelect, setacceidentSelect] = useState({id: null});
  const [listErr, setlistErr] = useState({
    address: '',
    typeAcc: '',
    numberCar: '',
    des: '',
    img: '',
  });
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (dataListCar) {
      setlistCar(dataListCar);
    } else if (errorListCar) {
      toastService.error(errorListCar.messageErr);
      clearDataHome();
    }
  }, [dataListCar, errorListCar]);
  useEffect(() => {
    if (dataListAccident) {
      setlistAcceident(dataListAccident);
    } else if (errorListAccident) {
      toastService.error(errorListAccident.messageErr);
      clearDataHome();
    }
  }, [dataListAccident, errorListAccident]);
  useEffect(() => {
    if (dataCreateAccident) {
      toastService.success(
        !dataCreateAccident?.message
          ? 'Tạo mới thành công'
          : dataCreateAccident?.message,
      );
      cancel();
      clearDataHome();
    } else if (errorCreateAccident) {
      toastService.error(errorCreateAccident.messageErr);
      clearDataHome();
    }
  }, [dataCreateAccident, errorCreateAccident]);

  // ACTION
  const loadData = async () => {
    await getListCar();
    await getListAccident();
  };
  const handleSelectCar = id => {
    let item = listCar.find(it => it.id == id);
    setcarSelect(item);
  };
  const handleSelectAccident = id => {
    let item = listAcceident.find(it => it.id == id);
    setacceidentSelect(item);
  };
  const handleSetPicture = (uri: string) => {
    setImage(uri);
  };
  const handleCreate = async () => {
    let err = false;
    if (!address) {
      setlistErr(cur => ({...cur, address: 'Địa điểm là cần thiết'}));
      err = true;
    }
    if (!descript) {
      setlistErr(cur => ({...cur, des: 'Nội dung là cần thiết'}));
      err = true;
    }
    if (!image) {
      setlistErr(cur => ({...cur, img: 'Hình ảnh là cần thiết'}));
      err = true;
    }
    if (!carSelect.id) {
      setlistErr(cur => ({...cur, numberCar: 'Bạn cần chọn loại xe'}));
      err = true;
    }
    if (!err) {
      await createAccident({
        carId: carSelect.id,
        dateOfAccident: selectTime,
        address: address,
        description: descript,
        carPickUpStatus: 'COMPLETE',
        whoCausedAccident: 'OURDRIVER',
        fileAccidentScene: [
          {
            url: image,
            name: image.replace('https://ape-devs.s3.amazonaws.com/greenleaf'),
          },
        ],
      });
    }
  };
  const toogleShowFromDate = (show: boolean) => {
    setShowTime(show);
  };

  const onChangeFromTime = (val: Date) => {
    setselectTime(val);
  };

  // RENDER
  const _containtForm = () => {
    return (
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
        <Row between containtStyle={{marginBottom: 10}}>
          <NTText h6 w600>
            {'Thời gian*:'}
          </NTText>
          <Row>
            <NTText h6>{moment(new Date()).format('DD/MM/YYYY')}</NTText>
            <TouchableOpacity
              onPress={() => setShowTime(true)}
              style={styles.viewTime}>
              <NTText h6>{moment(selectTime).format('HH:mm')}</NTText>
              <IconMaterialCommunity
                name="calendar-month-outline"
                color={COLORS.primary}
                size={normalize(20)}
              />
            </TouchableOpacity>
          </Row>
        </Row>
        <Row between containtStyle={{marginBottom: 10}}>
          <NTText h6 w600>
            {'Địa điểm*:'}
          </NTText>
          <Input
            value={address}
            onChangeText={setaddress}
            containerStyle={[styles.containtStyle, {height: normalize(30)}]}
            inputContainerStyle={{height: normalize(30), borderBottomWidth: 0}}
            renderErrorMessage={false}
          />
        </Row>
        {!!listErr.address && (
          <NTText h6 txtStyle={{color: 'red'}}>
            {listErr.address}
          </NTText>
        )}
        <Row between containtStyle={{marginBottom: 10}}>
          <NTText h6 w600>
            {'Nội dung*:'}
          </NTText>
          <Input
            value={descript}
            onChangeText={setDescript}
            containerStyle={styles.containtStyle}
            inputContainerStyle={{height: normalize(60), borderBottomWidth: 0}}
            renderErrorMessage={false}
            multiline={true}
          />
        </Row>
        {!!listErr.des && (
          <NTText h6 txtStyle={{color: 'red'}}>
            {listErr.des}
          </NTText>
        )}
        <Row between containtStyle={{marginBottom: 10}}>
          <NTText h6 w600>
            {'Hình ảnh*:'}
          </NTText>
          <View
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <FPickImage
              width={200}
              height={200}
              value={image as any}
              openCamera={() => setmodalImg(true)}
            />
          </View>
        </Row>
      </ScrollView>
    );
  };
  return (
    <View style={{justifyContent: 'center'}}>
      <NTText h5 w600 center txtStyle={{marginBottom: 20}}>
        {'Tạo mới báo cáo tai nạn'}
      </NTText>
      <FAutoComplete
        //@ts-ignore
        title={'Chọn số xe'}
        placeholder={'Chọn số xe'}
        value={carSelect?.id}
        onChooseValue={value => handleSelectCar(value)}
        items={listCar.map((item, idx) => ({
          ...item,
          value: item.id,
          label: item.regNo,
          id: item.id,
        }))}
        errorMessage={''}
        containtStyle={{marginBottom: 15, marginHorizontal: 15}}
      />
      {!!listErr.numberCar && (
        <NTText h6 txtStyle={{color: 'red', marginHorizontal: 15}}>
          {listErr.numberCar}
        </NTText>
      )}

      {_containtForm()}
      <Row around>
        <Button
          type="outline"
          title={'Thoát'}
          onPress={cancel}
          titleStyle={{color: 'white', fontSize: 13}}
          buttonStyle={{
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'red',
          }}
          containerStyle={{
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
            width: deviceWidth * 0.3,
          }}
        />
        <Button
          type="outline"
          title={'Tạo'}
          onPress={handleCreate}
          titleStyle={{color: 'white', fontSize: 13}}
          buttonStyle={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.primary,
          }}
          containerStyle={{
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
            width: deviceWidth * 0.3,
          }}
        />
      </Row>

      <ModalTakePicture
        visible={modalImg}
        cancel={() => setmodalImg(false)}
        picture={handleSetPicture as any}
        imageLibrary={true}
        imageCamera={true}
      />
      <ModalTime
        testID="time"
        mode="time"
        show={isShowTime}
        time={selectTime}
        cancel={() => toogleShowFromDate(false)}
        onChangeTime={onChangeFromTime}
      />
    </View>
  );
});

export default ModalAdd;

const styles = StyleSheet.create({
  viewTime: {
    width: 150,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  containtStyle: {
    flex: 1,
    alignSelf: 'flex-end',
    height: normalize(80),
    borderWidth: normalize(1),
    marginLeft: normalize(20),
    borderRadius: normalize(5),
    backgroundColor: COLORS.grayf5f5f5,
  },
});
