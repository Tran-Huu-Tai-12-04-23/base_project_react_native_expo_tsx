import CustomBottomSheet from "@components/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type BottomSheetInfoType = {
  content: ReactNode | null;
  snapPoints: any;
};
const BottomSheetContext = createContext<{
  openBottomSheet: () => void;
  hideBottomSheet: () => void;
  onToSnapShot: (index: number) => void;
  onSetBottomSheetInfo: (info: BottomSheetInfoType) => void;
}>({
  hideBottomSheet: () => {},
  openBottomSheet: () => {},
  onToSnapShot: () => {},
  onSetBottomSheetInfo: () => {},
});

const BottomSheetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetInfo, setBottomSheetInfo] =
    useState<BottomSheetInfoType | null>({
      content: null,
      snapPoints: null,
    });
  const handleClosePress = () => bottomSheetRef?.current?.close();
  const handleOpenBottomSheet = () => bottomSheetRef?.current?.snapToIndex(0);

  const openBottomSheet = () => {
    bottomSheetRef?.current?.snapToIndex(0);
  };

  const hideBottomSheet = () => {
    bottomSheetRef?.current?.close();
    setBottomSheetInfo({ content: null, snapPoints: null });
  };

  const onToSnapShot = (index: number) => {
    if (bottomSheetInfo?.snapPoints?.length >= index) {
      bottomSheetRef?.current?.snapToIndex(index);
    }
  };

  const onSetBottomSheetInfo = (infoBottomSheet: BottomSheetInfoType) => {
    setBottomSheetInfo((prev) => {
      return {
        ...prev,
        content: infoBottomSheet.content ?? prev?.content,
        snapPoints: infoBottomSheet.snapPoints ?? prev?.snapPoints,
      };
    });
  };

  const value = useMemo(
    () => ({
      hideBottomSheet,
      openBottomSheet,
      onToSnapShot,
      onSetBottomSheetInfo,
    }),
    [hideBottomSheet, openBottomSheet, onToSnapShot, onSetBottomSheetInfo]
  );

  return (
    <BottomSheetContext.Provider value={value as any}>
      {children}
      <CustomBottomSheet
        onClose={handleClosePress}
        onOpen={handleOpenBottomSheet}
        onSetSnapPoints={() => {}}
        snapPoints={bottomSheetInfo?.snapPoints ?? [100]}
        ref={bottomSheetRef}
      >
        {bottomSheetInfo?.content}
      </CustomBottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (context == null) {
    throw new Error("useBottomSheet must be used within a AuthProvider");
  }

  return context;
};

export default BottomSheetProvider;
