import { styles } from '@components/ButtonCustom/style';
import TextDefault from '@components/TextDefault';
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback } from 'react';
import { forwardRef, useMemo } from 'react';

interface Props {
   children: any;
   title: string;
   snapPoints?: any;
   onClose: () => void;
   onOpen: () => void;
}
type Ref = BottomSheet;

const CustomBottomSheet = forwardRef<Ref, Props>(
   ({ title, children, snapPoints = ['25%', '50%', '75%', '96%'] }, ref) => {
      const renderBackdrop = useCallback(
         (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
         [],
      );

      return (
         <BottomSheet
            backdropComponent={renderBackdrop}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            ref={ref}
         >
            <BottomSheetView onTouchStart={(e) => e.stopPropagation()} style={{ flex: 1, alignItems: 'center' }}>
               <TextDefault>{title} 🎉</TextDefault>
               {children}
            </BottomSheetView>
         </BottomSheet>
      );
   },
);

export default CustomBottomSheet;
