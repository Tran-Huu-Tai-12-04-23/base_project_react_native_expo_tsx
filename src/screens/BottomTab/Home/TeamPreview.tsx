import Separator from "@components/Separator";
import { deviceHeight } from "@helper/utils";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import useTeamPagination from "src/services/hooks/teams/useTeamPagination";
import TeamCard from "./TeamCard";

function TeamPreview() {
  const { teams } = useTeamPagination();
  const [data, setData] = useState(teams);

  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    // Allow pan responder to activate
    onMoveShouldSetPanResponder: () => true,

    // Handle card movement while dragging
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (deviceHeight * 0.9) / 2 ? 1 : -1);
    },

    // Handle card release after dragging
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        // Return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeTopCard = useCallback(() => {
    setData((prev: string | any[]) => prev.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);
  const handleChoice = useCallback(
    (direction: number) => {
      Animated.timing(swipe.x, {
        toValue: direction * 500,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <Fragment>
      <Separator height={20} />
      {teams
        .map((data: any, index: number) => {
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <TeamCard
              index={index}
              key={index}
              image={data?.thumbnails}
              isFirst={isFirst}
              swipe={swipe}
              titlSign={titlSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
    </Fragment>
  );
}

export default TeamPreview;
