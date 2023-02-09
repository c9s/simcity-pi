import Item from "@/src/types/item";
import {Box} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import moment from 'moment';

interface MatDurationProps {
  item : Item;
}

export default function MatDuration(props :MatDurationProps) {
  const item = props.item
  return <Box m={2} w="65px" fontSize={24} fontWeight={"bold"} color={'blue.200'}>
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      {
        moment.utc(moment.duration(item.duration, 'minutes').asMilliseconds()).format("HH:mm")
      }
    </div>
  </Box>
}
