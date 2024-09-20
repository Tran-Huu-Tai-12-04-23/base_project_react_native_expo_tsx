import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";

interface Props {
  children: any;
  snapPoints?: any;
  onClose: () => void;
  onOpen: () => void;
  isEnablePanDownToClose?: boolean;
}
type Ref = BottomSheet;

const CustomBottomSheet = forwardRef<Ref, Props>(
  (
    {
      isEnablePanDownToClose = true,
      children,
      snapPoints = ["25%", "50%", "75%", "96%"],
    },
    ref
  ) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheet
        backdropComponent={renderBackdrop}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={isEnablePanDownToClose}
        ref={ref}
      >
        <BottomSheetView
          // onTouchStart={(e) => e.stopPropagation()}
          style={{ flex: 1, alignItems: "center" }}
        >
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;
