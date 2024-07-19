const MENU_CENTER = [
  {
    text: "Thông báo",
    icon: "bell-outline",
    tabChange: "NotifyScreen",
  },
  {
    text: "Ra Bãi",
    icon: "car",
    tabChange: "GetOutParkScreen",
  },
  {
    text: "Về bãi",
    icon: "truck-fast",
    tabChange: "GoToParkScreen",
  },
  {
    text: "Chấm công",
    icon: "calendar-month-outline",
    tabChange: "TimekeepingScreen",
  },
  {
    text: "Nhật trình xe tháng",
    icon: "format-list-text",
    tabChange: "WorkDiaryScreen",
  },
  {
    text: "Xe chuyến",
    icon: "truck-fast-outline",
    tabChange: "TourOddScreen",
  },
  {
    text: "Báo cáo hằng ngày",
    icon: "format-list-text",
    tabChange: "DailyReportScreen",
  },
  {
    text: "Báo cáo tai nạn",
    icon: "car-info",
    tabChange: "ReportAccientScreen",
  },
];

const MENU_LEFT = [
  {
    text: "Trang chủ",
    icon: "home",
    tabChange: "HomeScreen",
  },
  {
    text: "Thông báo",
    icon: "bell-outline",
    tabChange: "NotifyScreen",
  },
  {
    text: "Nhật trình xe tháng",
    icon: "format-list-text",
    tabChange: "WorkDiaryScreen",
  },
  {
    text: "Xe chuyến",
    icon: "truck-fast-outline",
    tabChange: "TourOddScreen",
  },
  {
    text: "Báo cáo hằng ngày",
    icon: "format-list-text",
    tabChange: "DailyReportScreen",
  },
  {
    text: "Báo cáo tai nạn",
    icon: "car-info",
    tabChange: "ReportAccientScreen",
  },
  {
    text: "Đổi mật khẩu",
    icon: "shield-key-outline",
    tabChange: "ChangePassScreen",
  },
  {
    text: "Tin nhắn",
    icon: "chat-processing-outline",
    tabChange: "ChatRoomScreen",
  },
  {
    text: "Phiên bản",
    icon: "alert-circle",
  },
];

const STATUS_BILL = [
  { label: "Đơn tạo mới", value: "DonMoiTao" },
  { label: "Đơn đang soạn", value: "DonDangSoan" },
  { label: "Đơn đã soạn", value: "DonDaSoan" },
  { label: "Đơn chờ nhận", value: "DonChoNhan" },
  { label: "Đơn đang vận chuyển", value: "DonDangVanChuyen" },
  { label: "Đơn đang phát", value: "DonDangPhat" },
  { label: "Đơn phát lại", value: "DonPhatLai" },
  { label: "Đơn hoàn gốc", value: "DonHoanGoc" },
  { label: "Đơn phát thành công", value: "DonPhatThanhCong" },
  { label: "Đơn hủy", value: "DonHuy" },
];

const BUTTON_ICON_DELIVERY = [
  // { label: "phone-in-talk", color: "#33CCFF" },
  // { name: "format-list-bulleted", color: "#00CCFF" },
  { name: "send", color: "#2089dc", text: "Xác nhận" },
  { name: "compare-arrows", color: "#ff6666", text: "Phát lại" },
  { name: "replay", color: "#ff3333", text: "Hoàn gốc" },
];

const STATUS_COLLECT_MONEY = {
  cod: "COD",
  congno: "CongNo",
};

const BUTTON_TRIPS = [
  // {name: 'GetOutParkScreen', text: 'Ra bãi/ nhận xe'},
  { name: "StartPayment", text: "Bắt đầu tính tiền" }, //0
  // {name: 'PickUpPointScreen', text: 'Cập nhật ODO ra bãi'}, //1
  { name: "PickUpPointScreen", text: "Đã đến địa điểm đón" }, //2
  { name: "ReceiveCustomerScreen", text: "Nhận khách" }, //3
  { name: "PauseTourScreen", text: "Tạm ngưng" }, //4
  { name: "ReturnCustomerScreen", text: "Trả khách" }, //5
  { name: "StartRunMoreScreen", text: "Bắt đầu chạy thêm" }, //6
  { name: "EndRunMoreScreen", text: "Kết thúc chạy thêm" }, //7
  { name: "StationFareScreen", text: "Chi phí phát sinh" }, //8
  // {name: 'StationFareScreen', text: 'Cập nhật ODO về bãi xe'}, //9
  { name: "EndPayment", text: "Kết thúc tính tiền" }, //10
];

const ISSUES_DRIVER_TYPE = {
  PhatSinh: { value: "PHATSINH", label: "Phát sinh" },
  TaiNan: { value: "TAINAN", label: "Tai nạn" },
  NghiPhep: { value: "NGHIPHEP", label: "Nghỉ phép" },
  DoiTai: { value: "DOITAI", label: "Đổi tài" },
};

const ISSUES_STATUS_CONST = {
  Open: { value: "OPEN", label: "Mới tạo" },
  Processing: { value: "PROCESSING", label: "Đang xử lý" },
  Complete: { value: "COMPLETE", label: "Đã xử lý" },
  Cancel: {
    value: "CANCEL",
    label: "Hủy",
    percent: 100,
    successPercent: 0,
    typeCss: "exception",
  },
  Close: {
    value: "CLOSE",
    label: "Đóng",
    percent: 100,
    successPercent: 0,
    typeCss: "exception",
  },
};

export const Options = {
  STATUS_BILL,
  MENU_LEFT,
  BUTTON_ICON_DELIVERY,
  STATUS_COLLECT_MONEY,
  MENU_CENTER,
  BUTTON_TRIPS,
  ISSUES_DRIVER_TYPE,
  ISSUES_STATUS_CONST,
};
