import { normalize } from "@helper/helpers";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

interface CarouselProps {
  pages: { backgroundColor: string; content: React.ReactNode }[];
}

function Carousel({ pages }: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const slide = useRef<PagerView | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % pages.length;
      setCurrentPage(nextPage);
      slide?.current?.setPage(nextPage);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentPage, pages.length]);

  return (
    <PagerView ref={slide} style={styles.container} initialPage={0}>
      {pages.map((page, index) => (
        <View style={[styles.page]} key={index.toString()}>
          {page.content}
        </View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: normalize(25),
    height: normalize(10),
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  swipeText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Carousel;
