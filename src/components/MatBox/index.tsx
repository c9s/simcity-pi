import Item from "@/src/types/item";
import {Box} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface MatBoxProps {
  item : Item;
}

export default function MatBox(props :MatBoxProps) {
  const item = props.item
  return <Box m={2} w="65px">
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <Image
        key={item.name}
        src={ `/items/${item.name}.png` }
        alt={item.name}
        width={45}
        height={45}
      />
    </div>
    <div style={{textAlign: 'center', fontSize: 13}}>
      {item.name}
    </div>
  </Box>
}
