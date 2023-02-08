
import React, { useState } from 'react';
import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';

import Item from '@/src/types/item';
import Image from "next/image";

interface NeededMatsProps {
  item : Item;

  allItems : { [ name : string ] : Item};
}


function PadBox() {
  return <Box m={2} w="65px">
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <Box w={45} h={45}></Box>
    </div>
    <div style={{textAlign: 'center', fontSize: 13}}> </div>
  </Box>
}



interface MatBoxProps {
  item : Item;
}

function MatBox(props :MatBoxProps) {
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

// NeededMats renders the needed materials of an item
export default function NeededMats(props : NeededMatsProps) {
  const item = props.item
  const isFinalItem = !item.requiredItemCounts

  if (isFinalItem) {
    return <Box>
      <MatBox item={item}/>
    </Box>;
  }

  const matsBoxes = Object.entries(item.requiredItemCounts).map((value : [string, number]) => {
    const name = value[0]
    const count = value[1]
    const depItem = props.allItems[name]

    if (!depItem) {
      console.error(`item ${name} info not found`)
      return null;
    }

    const isFinalDep = !depItem.requiredItemCounts

    if (isFinalDep) {
      return <Box marginLeft={65+24} key={name}>
        <HStack spacing='24px'>
        {
          [...Array(count)].map((value, index) => {
             return <MatBox item={depItem} key={index}/>
          })
        }
        </HStack>
      </Box>;
    }

    return <Box marginLeft={65+24} key={name}>
      {
        [...Array(count)].map((value, index) => {
          return <NeededMats item={depItem} key={index} allItems={props.allItems}/>
        })
      }
    </Box>;
  })

  return <Box>
    <MatBox item={item}/>
    {matsBoxes}
  </Box>;
}
