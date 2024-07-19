import CameraScreen from "../shared/CameraScreen";
import ScannerScreen from "../shared/ScannerScreen";
import TakePictureScreen from "../shared/TakePictureScreen";
import ChangePassScreen from "./ChangePassScreen";
import ChatRoomScreen from "./ChatRoomScreen";
import ChatScreen from "./ChatScreen";
import ChatSocketScreen from "./ChatSocketScreen";
import DailyReportScreen from "./DailyReportScreen";
import HomeScreen from "./HomeScreen";
import NotifyScreen from "./NotifyScreen";
import DetailNotifyScreen from "./NotifyScreen/DetailNotify";
import DetailNotifyScreenAlert from "./NotifyScreen/DetailNotifyAlert";
import PocilyScreen from "./PocilyScreen";
import ReportAccientScreen from "./ReportAccientScreen";
import ReportOfffScreen from "./ReportOffScreen";
import SendRequestScreen from "./SendRequestScreen";
import CreateSendRequestScreen from "./SendRequestScreen/ScreenChild/CreateRequest";
import DetailSendRequestScreen from "./SendRequestScreen/ScreenChild/DetailRequest";
import TimekeepingScreen from "./TimekeepingScreen";
import TourOddScreen from "./TourOddScreen";
import DetailStepTrip from "./TourOddScreen/DetailStepTrip/DetailStepTrip";
import { DetailTrip } from "./TourOddScreen/DetailTourWork";
import DetailTourOddScreen from "./TourOddScreen/ScreenChild/DetailTourOddScreen";
import StationFeeScreen from "./TourOddScreen/StationFeeScreen";
import WorkDiaryScreen from "./WorkDiaryScreen";
import CreateStationFareScreen from "./WorkDiaryScreen/Trips/ScreenChild/CreateStationFareScreen";
import EndPayment from "./WorkDiaryScreen/Trips/ScreenChild/EndPayment";
import GetOutParkScreen from "./WorkDiaryScreen/Trips/ScreenChild/GetOutParkScreen";
import GoToParkScreen from "./WorkDiaryScreen/Trips/ScreenChild/GoToParkScreen";
import OpenTourScreen from "./WorkDiaryScreen/Trips/ScreenChild/OpenTourScreen";
import PauseTourScreen from "./WorkDiaryScreen/Trips/ScreenChild/PauseTourScreen";
import PickUpPointScreen from "./WorkDiaryScreen/Trips/ScreenChild/PickUpPointScreen";
import ReceiveCustomerScreen from "./WorkDiaryScreen/Trips/ScreenChild/ReceiveCustomerScreen";
import ReturnCustomerScreen from "./WorkDiaryScreen/Trips/ScreenChild/ReturnCustomerScreen";
import StartPayment from "./WorkDiaryScreen/Trips/ScreenChild/StartPayment";
import StationFareScreen from "./WorkDiaryScreen/Trips/ScreenChild/StationFareScreen";

export const App_route_key = {
  HomeScreen: "HomeScreen",
  ChatScreen: "ChatScreen",
  ChatRoomScreen: "ChatRoomScreen",
  ChatSocketScreen: "ChatSocketScreen",
  ChangePassScreen: "ChangePassScreen",
  DetailNotifyScreenAlert: "DetailNotifyScreenAlert",
  NotifyScreen: "NotifyScreen",
  DetailNotifyScreen: "DetailNotifyScreen",
  WorkDiaryScreen: "WorkDiaryScreen",
  SendRequestScreen: "SendRequestScreen",
  TimekeepingScreen: "TimekeepingScreen",
  GetOutParkScreen: "GetOutParkScreen",
  PickUpPointScreen: "PickUpPointScreen",
  ReceiveCustomerScreen: "ReceiveCustomerScreen",
  PauseTourScreen: "PauseTourScreen",
  ReturnCustomerScreen: "ReturnCustomerScreen",
  StationFareScreen: "StationFareScreen",
  CreateStationFareScreen: "CreateStationFareScreen",
  GoToParkScreen: "GoToParkScreen",
  StartPayment: "StartPayment",
  EndPayment: "EndPayment",
  OpenTourScreen: "OpenTourScreen",
  TourOddScreen: "TourOddScreen",
  DetailTrip: "DetailTrip",
  DetailStepTrip: "DetailStepTrip",
  StationFeeScreen: "StationFeeScreen",
  DetailTourOddScreen: "DetailTourOddScreen",
  ReportAccientScreen: "ReportAccientScreen",
  DailyReportScreen: "DailyReportScreen",
  ReportOffScreen: "ReportOffScreen",
  DetailSendRequestScreen: "DetailSendRequestScreen",
  CreateSendRequestScreen: "CreateSendRequestScreen",
};

const appRouters = {
  [App_route_key.HomeScreen]: HomeScreen,
  [App_route_key.ChatScreen]: ChatScreen,
  [App_route_key.ChatRoomScreen]: ChatRoomScreen,
  [App_route_key.ChatSocketScreen]: ChatSocketScreen,
  [App_route_key.ChangePassScreen]: ChangePassScreen,
  [App_route_key.DetailNotifyScreenAlert]: DetailNotifyScreenAlert,
  [App_route_key.NotifyScreen]: NotifyScreen,
  [App_route_key.DetailNotifyScreen]: DetailNotifyScreen,
  [App_route_key.WorkDiaryScreen]: WorkDiaryScreen,
  [App_route_key.SendRequestScreen]: SendRequestScreen,
  [App_route_key.TimekeepingScreen]: TimekeepingScreen,
  [App_route_key.GetOutParkScreen]: GetOutParkScreen,
  [App_route_key.PickUpPointScreen]: PickUpPointScreen,
  [App_route_key.ReceiveCustomerScreen]: ReceiveCustomerScreen,
  [App_route_key.PauseTourScreen]: PauseTourScreen,
  [App_route_key.ReturnCustomerScreen]: ReturnCustomerScreen,
  [App_route_key.StationFareScreen]: StationFareScreen,
  [App_route_key.CreateStationFareScreen]: CreateStationFareScreen,
  [App_route_key.GoToParkScreen]: GoToParkScreen,
  [App_route_key.StartPayment]: StartPayment,
  [App_route_key.EndPayment]: EndPayment,
  [App_route_key.OpenTourScreen]: OpenTourScreen,
  [App_route_key.TourOddScreen]: TourOddScreen,
  [App_route_key.DetailTrip]: DetailTrip,
  [App_route_key.DetailStepTrip]: DetailStepTrip,
  // [App_route_key.// GetCarScreen]: GetCarScreen,
  [App_route_key.StationFeeScreen]: StationFeeScreen,
  [App_route_key.DetailTourOddScreen]: DetailTourOddScreen,
  [App_route_key.ReportAccientScreen]: ReportAccientScreen,
  [App_route_key.DailyReportScreen]: DailyReportScreen,
  [App_route_key.ReportOffScreen]: ReportOfffScreen,
  [App_route_key.DetailSendRequestScreen]: DetailSendRequestScreen,
  [App_route_key.CreateSendRequestScreen]: CreateSendRequestScreen,

  CameraScreen: CameraScreen,
  PocilyScreen: PocilyScreen,
  ScannerScreen: ScannerScreen,
  TakePictureScreen: TakePictureScreen,
};

export type TAppScreenName = keyof typeof appRouters;
export default appRouters;
