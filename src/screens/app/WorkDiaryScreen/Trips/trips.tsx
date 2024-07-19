import React, {
  Component,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ViewStyle,
  Modal,
  Pressable,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import COLORS from '~/common/colors/colors';
import {IScreenProps} from '~/screens/shared/interface';
import {ICommonProps, StoreApp} from '~/stores';
import FTouchOpacity, {
  ITouchOpacityProps,
} from '~/components/touchables/FTouchOpacity';
import {WorkDiaryStore} from '~/stores/workDiary/work.diary.store';
import {Options} from '~/common/options';
import stylesApp from '../../styleApp';
import {ESize} from '~/common/enums';
import toastService from '~/services/toast/toast.service';
import {deviceWidth, getBottomSpace, normalize} from '~/common';
import {observer} from 'mobx-react';
import {ScheduleDTO} from '~/modules/workDiary/work.diary.dto';
import {CheckBox, FPickImage, ModalTime, Row} from '~/components';
import NTText from '~/components/texts/FText';
import {createAnimatableComponent} from 'react-native-animatable';
import {trace} from 'console';
import moment from 'moment';
import {IconMaterialCommunity, Input} from '~/@helpers/deflibs';
import {Button} from '~/@helpers/deflibs';
import ModalTakePicture from '~/components/views/ModalTakePicture';
import {confirmAlert} from '~/components/alert';
import {Utils} from '~/@helpers/utils';
import Toast from '../../../../components/toast/FToast';
interface IProps extends IScreenProps, ICommonProps {
  workDiaryStore?: WorkDiaryStore;
  isStop?: boolean;
  isWasStop?: boolean;
  schedule?: ScheduleDTO;
}
let messageERRAddress = '';

const Trips: FC<IProps> = observer(props => {
  const {
    callReturnCustomer,
    returnCustomers,
    apiGetListSchedule,
    callTrackingCar,
    apiEndSchedule,
    apiSendPassengerLastCofirm,
    dataEndSchedule,
    errorEndSchedule,
    models,
    isLoadding,
    callPickUpPoint,
    pickUpPoints,
    clearDataWorkDiary,
    apiCofirmOverTime,
    apiCofirmOverTimeEnd,
    updateOvertimeEnd,
    errorUpdateOvertimeEnd,
    updateOvertime,
    errorUpdateOvertime,
  } = StoreApp.workDiaryStore;
  const {isStop, isWasStop, schedule, navigation} = props;
  //   for start run more
  const [isModalConfirm, setIsModalCofirm] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [modalDate, setModalDate] = useState<boolean>(false);
  const [imageUrl, setimageUrl] = useState<string>('');
  const [visibleCam, setvisibleCam] = useState<boolean>(false);
  const [odo, setOdo] = useState<string>('');
  const [reasonMore, setReasonMore] = useState<string>('');
  const [addressMore, setAddressMore] = useState<string>('');

  //   for end run more

  const [isModalConfirmEnd, setIsModalCofirmEnd] = useState<boolean>(false);
  const [fromDateEnd, setFromDateEnd] = useState<Date>(new Date());
  const [modalDateEnd, setModalDateEnd] = useState<boolean>(false);
  const [imageUrlEnd, setimageUrlEnd] = useState<string>('');
  const [visibleCamEnd, setvisibleCamEnd] = useState<boolean>(false);
  const [odoEnd, setOdoEnd] = useState<string>('');
  const [addressEnd, setAddressEnd] = useState<string>('');
  // for EndScheduleDay
  const [isModalEndScheduleDay, setIsModalEndScheduleDay] =
    useState<boolean>(false);
  const [modalDateEndScheduleDay, setModalDateEndScheduleDay] =
    useState<boolean>(false);
  const [fromDateEndScheduleDay, setFromDateEndScheduleDay] = useState<Date>(
    new Date(),
  );
  const [stayNight, setStayNight] = useState<boolean>(false);
  const [specialCase, setSpecialCase] = useState<boolean>(false);
  //EFFECT
  useEffect(() => {
    if (dataEndSchedule) {
      toastService.success('Kết thúc hành trình ngày thành công!');
      clearDataWorkDiary();
    }
    if (errorEndSchedule) {
      toastService.error(errorEndSchedule.messageErr);
      clearDataWorkDiary();
    }
  }, [dataEndSchedule, errorEndSchedule]);

  const handleConfirmStart = () => {
    setIsModalCofirm(true);
  };

  const handleConfirmEnd = () => {
    setIsModalCofirmEnd(true);
  };

  const handleEndScheduleDay = () => {
    setIsModalEndScheduleDay(!isModalEndScheduleDay);
  };

  // ACTION
  const changeScreen = async (nameScreen: string) => {
    switch (nameScreen) {
      case 'GoToParkScreen':
        await callReturnCustomer(schedule?.id);
        const check = schedule?.dropOffPassenger >= schedule?.pickedUpPassenger;
        if (check) {
          navigation.navigate(nameScreen, {
            scheduleId: schedule?.id,
            schedule,
            models: models,
          });
        } else {
          toastService.warning('Xe chưa trả hết khách chưa về bãi được !');
        }
        break;
      case 'StartPayment':
        navigation.navigate(nameScreen, {scheduleId: schedule?.id, schedule});
        break;
      case 'EndPayment':
        navigation.navigate(nameScreen, {scheduleId: schedule?.id, schedule});
        break;
      default:
        navigation.navigate(nameScreen, {
          scheduleId: schedule?.id,
          schedule,
          models: models,
          isStop: isStop,
        });
    }
  };
  const pullRefesh = async () => {
    await apiGetListSchedule();
  };

  // RENDER
  const end = schedule?.__inParking__?.id;
  const Btn = (
    props: {
      name: string;
      value: string;
      bStyle: ViewStyle;
      children?: JSX.Element;
    } & ITouchOpacityProps,
  ) => {
    const {name, value, bStyle, children} = props;
    return (
      <FTouchOpacity
        onPress={() => changeScreen(name)}
        activeOpacity={0.75}
        // disabled={isStop || !schedule?.outParkingId}
        style={[
          styles.btnStyle,
          bStyle,
          end && {backgroundColor: COLORS.blu7799bd},
        ]}
        {...props}>
        {children ? children : <Text style={styles.txtStyle}>{value}</Text>}
      </FTouchOpacity>
    );
  };

  let statusPickup = COLORS.primary;
  let statusDropoff = COLORS.primary;

  if (!!schedule?.__schedulePassengers__) {
    if (schedule?.pickedUpPassenger > 0) {
      let tempList = schedule?.__schedulePassengers__.filter(
        val => !!val.pickUpDriverTime,
      );
      for (let i = 0; i < tempList.length; i++) {
        let element = tempList[i];
        // console.log(!!element.pickUpPassengerTime, '---------------picup', moment(element.pickUpPassengerTime).toLocaleString(), '----', moment(element.pickUpDriverTime).toLocaleString(), '-------', element.pickUpOperatorTime)
        if (
          !!element.pickUpPassengerTime &&
          moment(element.pickUpDriverTime).format('DDMMYYYY_HHmm') !==
            moment(element.pickUpPassengerTime).format('DDMMYYYY_HHmm') &&
          !element.pickUpOperatorTime
        ) {
          statusPickup = '#ed7965';
          break;
        } else if (
          !!element.pickUpPassengerTime &&
          moment(element.pickUpDriverTime).format('DDMMYYYY_HHmm') ==
            moment(element.pickUpPassengerTime).format('DDMMYYYY_HHmm') &&
          !element.pickUpOperatorTime
        )
          statusPickup = COLORS.blu45a6ff;
        else if (
          !element.pickUpPassengerTime &&
          element.authorityOperator &&
          !element.pickUpOperatorTime
        ) {
          statusPickup = '#f7cf9d';
          break;
        } else if (
          !element.pickUpPassengerTime &&
          !element.authorityOperator &&
          !element.pickUpOperatorTime
        ) {
          statusPickup = '#e0e407';
          break;
        }
      }
    }
    if (schedule?.dropOffPassenger > 0) {
      let tempList = schedule?.__schedulePassengers__.filter(
        val => !!val.dropOffDriverTime,
      );
      for (let i = 0; i < tempList.length; i++) {
        let element = tempList[i];
        if (
          !!element.dropOffPassengerTime &&
          moment(element.dropOffDriverTime).format('DDMMYYYY_HHmm') !==
            moment(element.dropOffPassengerTime).format('DDMMYYYY_HHmm') &&
          !element.dropOffOperatorTime
        ) {
          statusDropoff = '#ed7965';
          break;
        } else if (
          !!element.dropOffPassengerTime &&
          moment(element.dropOffDriverTime).format('DDMMYYYY_HHmm') ==
            moment(element.dropOffPassengerTime).format('DDMMYYYY_HHmm') &&
          !element.dropOffOperatorTime
        )
          statusDropoff = COLORS.blu45a6ff;
        else if (
          !element.dropOffPassengerTime &&
          element.authorityOperator &&
          !element.dropOffOperatorTime
        ) {
          statusDropoff = '#f7cf9d';
          break;
        } else if (
          !element.dropOffPassengerTime &&
          !element.authorityOperator &&
          !element.dropOffOperatorTime
        ) {
          statusDropoff = '#e0e407';
          break;
        }
      }
    }
  }

  const onCofirmRunMore = async () => {
    const body = {
      scheduleId: schedule?.id,
      startAddress: addressMore,
      startTime: fromDate,
      startOdo: odo,
      startOdoImage: imageUrl,
      reason: reasonMore,
    };
    if (!odo) {
      toastService.error('Vui lòng nhập odo');
    }
    if (!addressMore) {
      toastService.error('Vui lòng nhập địa chỉ');
    }
    if (!reasonMore) {
      toastService.error('Vui lòng nhập lý do');
    }
    if (!imageUrl) {
      toastService.error('Vui lòng chọn hình ảnh');
    } else if (reasonMore && addressMore && odo && imageUrl) {
      await apiCofirmOverTime(body)
        .then(async res => {
          await toastService.success();
          await clearData();
          setTimeout(() => {
            setIsModalCofirm(false);
          }, 800);
          pullRefesh();
        })
        .catch(error => toastService.error(error?.messageErr));
      // }
    }
  };

  const onCofirmEndRunMore = async () => {
    const body = {
      scheduleId: schedule?.id,
      endAddress: addressEnd,
      endTime: fromDateEnd,
      endOdo: odoEnd,
      endOdoImage: imageUrlEnd,
    };
    if (!odoEnd) {
      toastService.error('Vui lòng nhập odo');
    }
    if (!addressEnd) {
      toastService.error('Vui lòng nhập địa chỉ');
    }
    if (!imageUrlEnd) {
      toastService.error('Vui lòng chọn hình ảnh');
    } else if (addressEnd && odoEnd && imageUrlEnd) {
      if (errorUpdateOvertimeEnd) {
        toastService.error(errorUpdateOvertimeEnd?.messageErr);
      }
      await apiCofirmOverTimeEnd(body)
        .then(async res => {
          await toastService.success();
          await clearDataEnd();
          setTimeout(() => {
            setIsModalCofirmEnd(false);
          }, 800);
          pullRefesh();
        })
        .catch(error => {
          setIsModalCofirmEnd(curr => !curr);
          toastService.error(error?.messageErr);
        });
    }
  };
  const clearData = () => {
    setOdo('');
    setimageUrl('');
    setReasonMore('');
    setAddressMore('');
  };

  const clearDataEnd = () => {
    setOdoEnd('');
    setimageUrlEnd('');
    setAddressEnd('');
  };
  //   modal for start run
  const renderModalStartRunMore = useCallback(() => {
    return (
      <>
        <Modal
          visible={isModalConfirm}
          transparent={true}
          animationType={'slide'}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}>
          <TouchableOpacity
            onPress={() => setIsModalCofirm(false)}
            style={{flex: 1}}>
            <ImageBackground source={{}} style={styles.bgStyle} />
          </TouchableOpacity>
          <View style={[styles.viewConfirm]}>
            <Text style={styles.textModalContainer}>Bắt đầu chạy thêm</Text>
            <ModalTime
              testID="date1"
              mode="time"
              show={modalDate}
              time={fromDate}
              cancel={() => setModalDate(false)}
              onChangeTime={date => setFromDate(date)}
            />
            <Row between containtStyle={{marginVertical: normalize(20)}}>
              <Text style={styles.txtStyleModal}>{'T/G thực hiện*:'}</Text>
              <TouchableOpacity
                onPress={() => setModalDate(!modalDate)}
                style={styles.calendarIp}>
                <Text style={{fontSize: 13, color: COLORS.black}}>
                  {moment(fromDate).format('LT')}
                </Text>
                <IconMaterialCommunity
                  name="calendar-month-outline"
                  color={COLORS.primary}
                  size={25}
                />
              </TouchableOpacity>
            </Row>
            <Row
              between
              containtStyle={{
                alignItems: 'flex-start',
                marginTop: normalize(10),
              }}>
              <Text style={styles.txtStyleModal}>{'Odo*:'}</Text>
              <Input
                value={odo}
                onChangeText={txt => setOdo(txt)}
                inputContainerStyle={styles.ipCS}
                containerStyle={[styles.ipContaintS, {height: normalize(35)}]}
                placeholder={'Nhập Odo'}
                style={{fontSize: 12}}
                keyboardType={'number-pad'}
                returnKeyType={'default'}
                multiline={true}
              />
            </Row>
            <Row
              between
              containtStyle={{
                alignItems: 'flex-start',
                marginTop: normalize(20),
              }}>
              <Text style={styles.txtStyleModal}>{'Địa chỉ*:'}</Text>
              <Input
                value={addressMore}
                onChangeText={txt => setAddressMore(txt)}
                inputContainerStyle={styles.ipCS}
                containerStyle={[styles.ipContaintS, {height: normalize(35)}]}
                placeholder={'Nhập địa chỉ'}
                style={{fontSize: 12}}
                // keyboardType={'number-pad'}
                returnKeyType={'default'}
                multiline={true}
              />
            </Row>
            <Row
              between
              containtStyle={{
                alignItems: 'flex-start',
                marginTop: normalize(20),
              }}>
              <Text style={styles.txtStyleModal}>{'Lý do*:'}</Text>
              <Input
                value={reasonMore}
                onChangeText={txt => setReasonMore(txt)}
                inputContainerStyle={styles.ipCS}
                containerStyle={[styles.ipContaintS, {height: normalize(35)}]}
                placeholder={'Nhập Lý do'}
                style={{fontSize: 12}}
                // keyboardType={'number-pad'}
                returnKeyType={'default'}
                multiline={true}
              />
            </Row>

            <Row between containtStyle={{marginBottom: normalize(20)}}>
              <Text style={styles.txtStyleModal}>{'Hình ảnh*:'}</Text>
              <View style={styles.viewCamera}>
                <FPickImage
                  width={200}
                  height={200}
                  value={imageUrl}
                  openCamera={() => setvisibleCam(true)}
                />
              </View>
            </Row>
            <Toast
              ref={ref => {
                toastService.setRefContainer(ref);
              }}
            />
            <ModalTakePicture
              visible={visibleCam}
              cancel={() => setvisibleCam(false)}
              picture={url => setimageUrl(url)}
              imageLibrary={true}
              imageCamera={true}
            />
            <Button
              type="solid"
              title="Lưu"
              titleStyle={[stylesApp.txtBold, {color: 'white'}]}
              buttonStyle={{backgroundColor: COLORS.primary, height: 45}}
              containerStyle={[
                stylesApp.btnSaveDiary,
                {alignSelf: 'center', marginBottom: 10},
              ]}
              onPress={onCofirmRunMore}
              loading={false}
            />
          </View>
        </Modal>
      </>
    );
  }, [
    isModalConfirm,
    odo,
    addressMore,
    reasonMore,
    imageUrl,
    modalDate,
    visibleCam,
  ]);
  console.log(isModalConfirmEnd);
  // modal for end run
  const renderModalEndRunMore = useCallback(() => {
    return (
      <>
        <Modal
          visible={isModalConfirmEnd}
          transparent={true}
          animationType={'slide'}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}>
          <TouchableOpacity
            onPress={() => setIsModalCofirmEnd(false)}
            style={{flex: 1}}>
            <ImageBackground source={{}} style={styles.bgStyle} />
          </TouchableOpacity>
          <View style={[styles.viewConfirm]}>
            <Text style={styles.textModalContainer}>Kết thúc chạy thêm</Text>
            <ModalTime
              testID="date1"
              mode="time"
              show={modalDateEnd}
              time={fromDateEnd}
              cancel={() => setModalDateEnd(false)}
              onChangeTime={date => setFromDateEnd(date)}
            />
            <Row between containtStyle={{marginVertical: normalize(20)}}>
              <Text style={styles.txtStyleModal}>{'T/G thực hiện*:'}</Text>
              <TouchableOpacity
                onPress={() => setModalDateEnd(!modalDateEnd)}
                style={styles.calendarIp}>
                <Text style={{fontSize: 13, color: COLORS.black}}>
                  {moment(fromDateEnd).format('LT')}
                </Text>
                <IconMaterialCommunity
                  name="calendar-month-outline"
                  color={COLORS.primary}
                  size={25}
                />
              </TouchableOpacity>
            </Row>
            <Row
              between
              containtStyle={{
                alignItems: 'flex-start',
                marginTop: normalize(10),
              }}>
              <Text style={styles.txtStyleModal}>{'Odo*:'}</Text>
              <Input
                value={odoEnd}
                onChangeText={txt => setOdoEnd(txt)}
                inputContainerStyle={styles.ipCS}
                containerStyle={[styles.ipContaintS, {height: normalize(35)}]}
                placeholder={'Nhập Odo'}
                style={{fontSize: 12}}
                keyboardType={'number-pad'}
                returnKeyType={'default'}
                multiline={true}
              />
            </Row>
            <Row
              between
              containtStyle={{
                alignItems: 'flex-start',
                marginTop: normalize(20),
              }}>
              <Text style={styles.txtStyleModal}>{'Địa chỉ*:'}</Text>
              <Input
                value={addressEnd}
                onChangeText={txt => setAddressEnd(txt)}
                inputContainerStyle={styles.ipCS}
                containerStyle={[styles.ipContaintS, {height: normalize(35)}]}
                placeholder={'Nhập địa chỉ'}
                style={{fontSize: 12}}
                // keyboardType={'number-pad'}
                returnKeyType={'default'}
                multiline={true}
              />
            </Row>

            <Row between containtStyle={{marginBottom: normalize(20)}}>
              <Text style={styles.txtStyleModal}>{'Hình ảnh*:'}</Text>
              <View style={styles.viewCamera}>
                <FPickImage
                  width={200}
                  height={200}
                  value={imageUrlEnd}
                  openCamera={() => setvisibleCamEnd(true)}
                />
              </View>
            </Row>
            <ModalTakePicture
              visible={visibleCamEnd}
              cancel={() => setvisibleCamEnd(false)}
              picture={url => setimageUrlEnd(url)}
              imageLibrary={true}
              imageCamera={true}
            />
            <Button
              type="solid"
              title="Lưu"
              titleStyle={[stylesApp.txtBold, {color: 'white'}]}
              buttonStyle={{backgroundColor: COLORS.primary, height: 45}}
              containerStyle={[
                stylesApp.btnSaveDiary,
                {alignSelf: 'center', marginBottom: 10},
              ]}
              onPress={onCofirmEndRunMore}
              loading={false}
            />
          </View>
        </Modal>
      </>
    );
  }, [
    isModalConfirmEnd,
    odoEnd,
    imageUrlEnd,
    modalDateEnd,
    visibleCamEnd,
    addressEnd,
  ]);

  const onCofirmEndScheduleDay = async () => {
    const body = specialCase
      ? {
          scheduleId: schedule?.id,
          realTime: fromDateEndScheduleDay,
          isSpecialCase: specialCase,
        }
      : stayNight === true
      ? {
          scheduleId: schedule?.id,
          realTime: fromDateEndScheduleDay,
          isOverNightAllowance: stayNight,
        }
      : {
          scheduleId: schedule?.id,
          realTime: fromDateEndScheduleDay,
        };
    // console.log('body', body);
    if (!schedule?.id) {
      toastService.error('Có lỗi xảy ra');
    }
    const bodySendPassenger = {
      scheduleId: schedule?.id,
    };

    await apiEndSchedule(body)
      .then(async res => {
        toastService.success(res.message, 800);
        setIsModalEndScheduleDay(false);
        await apiSendPassengerLastCofirm(bodySendPassenger).catch(error =>
          console.log(error.messageErr),
        );
      })
      .catch(error => toastService.error(error?.data?.messageErr));
  };
  // modal for endschedule day
  const renderModalEndScheduleDay = useCallback(() => {
    return (
      <>
        <Modal
          visible={isModalEndScheduleDay}
          transparent={true}
          animationType={'slide'}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}>
          <TouchableOpacity
            onPress={() => setIsModalEndScheduleDay(!isModalEndScheduleDay)}
            style={{flex: 1}}>
            <ImageBackground source={{}} style={styles.bgStyle} />
          </TouchableOpacity>
          <View style={[styles.viewConfirm]}>
            <Text style={styles.textModalContainer}>
              Xác nhận kết thúc hành trình{' '}
            </Text>
            <ModalTime
              testID="date1"
              mode="time"
              show={modalDateEndScheduleDay}
              time={fromDateEndScheduleDay}
              cancel={() => setModalDateEndScheduleDay(false)}
              onChangeTime={date => setFromDateEndScheduleDay(date)}
            />
            <Row between containtStyle={{marginVertical: normalize(20)}}>
              <Text style={styles.txtStyleModal}>{'T/G thực hiện*:'}</Text>
              <TouchableOpacity
                onPress={() => setModalDateEndScheduleDay(true)}
                style={styles.calendarIp}>
                <Text style={{fontSize: 13, color: COLORS.black}}>
                  {moment(fromDateEndScheduleDay).format('LT')}
                </Text>
                <IconMaterialCommunity
                  name="calendar-month-outline"
                  color={COLORS.primary}
                  size={25}
                />
              </TouchableOpacity>
            </Row>
            <Row between containtStyle={{marginTop: 10}}>
              <NTText h6 txtStyle={stylesApp.txtMediumBold}>
                {'Lưu đêm'}
              </NTText>
              <CheckBox
                resize={0.7}
                status={stayNight}
                onPress={() => {
                  setStayNight(!stayNight);
                  setSpecialCase(false);
                }}
              />
            </Row>
            <View style={{marginVertical: normalize(2)}} />
            <Row between containtStyle={{marginTop: 10}}>
              <NTText h6 txtStyle={stylesApp.txtMediumBold}>
                {'Trọn gói'}
              </NTText>
              <CheckBox
                resize={0.7}
                status={specialCase}
                onPress={() => {
                  setSpecialCase(!specialCase);
                  setStayNight(false);
                }}
              />
            </Row>
            <View style={{marginVertical: normalize(40)}} />
            <Button
              type="solid"
              title="Lưu"
              titleStyle={[stylesApp.txtBold, {color: 'white'}]}
              buttonStyle={{backgroundColor: COLORS.primary, height: 45}}
              containerStyle={[
                stylesApp.btnSaveDiary,
                {alignSelf: 'center', marginBottom: 10},
              ]}
              onPress={onCofirmEndScheduleDay}
              loading={false}
            />
          </View>
        </Modal>
      </>
    );
  }, [isModalEndScheduleDay, modalDateEndScheduleDay, stayNight, specialCase]);
  const checkCanPressButtonArrival =
    pickUpPoints.filter(i => i.isCheckedIn).length === pickUpPoints?.length
      ? true
      : false;

  const checkCanPressButtonPickUpPassenger =
    schedule?.pickedUpPassenger === schedule?.passengerPlan ? true : false;

  const checkCanPressButtonDropOffPasssenger =
    schedule?.dropOffPassenger === schedule?.pickedUpPassenger ? true : false;

  // console.log('schedule', schedule);
  // schedule?.computePriceStartTime ? true : false
  return (
    <View style={{paddingHorizontal: 10, flex: 1, width: deviceWidth}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoadding}
            onRefresh={() => pullRefesh()}
            colors={[COLORS.primary]}
          />
        }
        scrollEventThrottle={16}>
        <View>
          {models.lat && models.lng ? (
            <>
              <Btn // bat dau tinh tien
                name={Options.BUTTON_TRIPS[0].name}
                value={Options.BUTTON_TRIPS[0].text}
                disabled={false}
                bStyle={{
                  marginTop: 30,
                  backgroundColor: COLORS.primary,
                }}
              />
              <Btn //Cập nhật odo ra bãi
                name={Options.BUTTON_TRIPS[1].name}
                value={Options.BUTTON_TRIPS[1].text}
                disabled={false}
                bStyle={{
                  marginTop: 30,
                  backgroundColor: schedule?.pickUpFirstTime
                    ? statusPickup
                    : COLORS.primary,
                }}>
                <Row between containtStyle={{paddingHorizontal: 30}}>
                  {pickUpPoints != undefined && (
                    <View style={{width: normalize(30)}} />
                  )}
                  <Text style={[styles.txtStyle, {flex: 1}]}>
                    {Options.BUTTON_TRIPS[1].text}
                  </Text>
                  {pickUpPoints != undefined && (
                    <Text style={[styles.txtStyle]}>{`${
                      pickUpPoints.filter(i => i.isCheckedIn).length
                    }/${pickUpPoints.length}`}</Text>
                  )}
                </Row>
              </Btn>
              <Btn // đã đến đón
                name={Options.BUTTON_TRIPS[2].name}
                value={Options.BUTTON_TRIPS[2].text}
                disabled={pickUpPoints.length > 0 ? false : true}
                bStyle={{
                  marginTop: 30,
                  backgroundColor:
                    pickUpPoints.length > 0 ? statusPickup : COLORS.grayBDBDBD,
                }}>
                <Row between containtStyle={{paddingHorizontal: 30}}>
                  {pickUpPoints != undefined && (
                    <View style={{width: normalize(30)}} />
                  )}
                  <Text style={[styles.txtStyle, {flex: 1}]}>
                    {Options.BUTTON_TRIPS[2].text}
                  </Text>
                  {schedule?.passengerPlan != 0 && (
                    <Text
                      style={[
                        styles.txtStyle,
                      ]}>{`${schedule?.pickedUpPassenger}/${schedule?.passengerPlan}`}</Text>
                  )}
                </Row>
              </Btn>
              {isWasStop && schedule?.status === 'GOING' ? (
                <Btn //mo lai
                  name={'OpenTourScreen'}
                  value={'Mở lại'}
                  bStyle={{
                    backgroundColor: COLORS.primary,
                  }}
                  onPress={() =>
                    navigation.navigate('OpenTourScreen', {
                      scheduleId: schedule?.id,
                    })
                  }
                />
              ) : (
                <Btn // nhận khách
                  name={Options.BUTTON_TRIPS[3].name}
                  value={Options.BUTTON_TRIPS[3].text}
                  bStyle={{
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
              <Btn // tạm ngưng
                name={Options.BUTTON_TRIPS[4].name}
                disabled={schedule?.pickedUpPassenger > 0 ? false : true}
                value={Options.BUTTON_TRIPS[4].text}
                bStyle={{
                  marginTop: 30,
                  backgroundColor:
                    schedule?.pickedUpPassenger > 0
                      ? statusDropoff
                      : COLORS.grayBDBDBD,
                }}>
                <Row between containtStyle={{paddingHorizontal: 30}}>
                  {pickUpPoints != undefined && (
                    <View style={{width: normalize(30)}} />
                  )}
                  <Text style={[styles.txtStyle, {flex: 1}]}>
                    {Options.BUTTON_TRIPS[4].text}
                  </Text>
                  {schedule?.pickedUpPassenger != undefined && (
                    <Text
                      style={[
                        styles.txtStyle,
                      ]}>{`${schedule?.dropOffPassenger}/${schedule?.pickedUpPassenger}`}</Text>
                  )}
                </Row>
              </Btn>
              {/* <Btn // trả khách
                name={Options.BUTTON_TRIPS[4].name}
                value={Options.BUTTON_TRIPS[4].text}
                disabled={
                  schedule?.passengerPlan !== schedule?.pickedUpPassenger
                    ? true
                    : false
                }
                bStyle={{
                  marginTop: 30,
                  backgroundColor:
                    schedule?.passengerPlan == schedule?.pickedUpPassenger
                      ? COLORS.primary
                      : COLORS.grayBDBDBD,
                }}
                // onPress={
                //   schedule?.isOvertiming
                //     ? () => {
                //         toastService.error('Hiện đã có lệnh tăng ca', 800);
                //       }
                //     : () => handleConfirmStart()
                // }
              /> */}
              <Btn // bắt đầu chạy thêm
                name={Options.BUTTON_TRIPS[5].name}
                value={Options.BUTTON_TRIPS[5].text}
                bStyle={{
                  marginTop: 30,
                  backgroundColor: COLORS.primary,
                }}
                onPress={handleConfirmStart}
              />
              <Btn //kết thúc chạy thêm
                name={Options.BUTTON_TRIPS[6].name}
                value={Options.BUTTON_TRIPS[6].text}
                disabled={schedule?.isOvertiming ? false : true}
                bStyle={{
                  marginTop: 30,
                  backgroundColor: schedule?.isOvertiming
                    ? COLORS.primary
                    : COLORS.grayBDBDBD,
                }}
                onPress={() => setIsModalCofirmEnd(curr => !curr)}
              />
              <Btn // chi phí phát sinh
                disabled={isStop}
                name={Options.BUTTON_TRIPS[7].name}
                value={Options.BUTTON_TRIPS[7].text}
                bStyle={{marginTop: 30, backgroundColor: COLORS.primary}}
              />
              <Btn // kết thúc hành trình ngày
                disabled={schedule?.status === "COMPLETE" && schedule?.dropOffPassenger > 0 ? true : false}
                name={'EndScheduleDay'}
                value={'Kết thúc hành trình ngày'}
                bStyle={{
                  marginTop: 30,
                  backgroundColor:
                  schedule?.status === "COMPLETE" && schedule?.dropOffPassenger > 0
                      ? COLORS.grayBDBDBD
                      : COLORS.primary,
                }}
                onPress={() => handleEndScheduleDay()}
              />
              
            </>
          ) : (
            <View style={[stylesApp.frameSchedule, {height: 100}]}>
              <Text style={stylesApp.txtMediumBold}>
                Mất kết nối GPS với xe
              </Text>
            </View>
          )}
        </View>
        {/* modal for start run more  */}
        {renderModalStartRunMore()}
        {renderModalEndRunMore()}
        {renderModalEndScheduleDay()}
      </ScrollView>
    </View>
  );
});

export default Trips;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: COLORS.primary,
    height: ESize.heightScreen / 13,
    borderRadius: 40,
    borderWidth: 1,
    marginTop: 30,
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  viewConfirm: {
    backgroundColor: COLORS.white,
    paddingBottom: getBottomSpace() + normalize(10),
    padding: normalize(20),
  },
  bgStyle: {
    backgroundColor: COLORS.black,
    flex: 1,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  txtStyleModal: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  calendarIp: {
    height: normalize(35),
    borderWidth: 1,
    borderColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: normalize(150),
    borderRadius: 5,
  },
  ipCS: {
    borderBottomWidth: 0,
    padding: 0,
    alignItems: 'center',
    textAlign: 'center',
  },
  ipContaintS: {
    height: normalize(30),
    width: deviceWidth / 2,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
  },
  textModalContainer: {
    color: 'black',
    fontSize: normalize(15),
    fontWeight: '600',
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  viewCamera: {
    width: normalize(200),
    height: normalize(200),
    alignSelf: 'center',
    marginVertical: normalize(20),
  },
});
