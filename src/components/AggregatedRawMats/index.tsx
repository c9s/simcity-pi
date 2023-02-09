
import Item from '@/src/types/item';

import React, { useState } from 'react';
import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import MatBox from "@/src/components/MatBox";
import MatDuration from "@/src/components/MatDuration";

interface MatSet {
  item : Item;

  size : number;
}

interface AggregatedRawMatsProps {
  item : Item;

  allItems : { [ name : string ] : Item};
}


function aggregateRawMaterials(sets : { [ name : string ] : MatSet}, item : Item, allItems : { [ name : string ] : Item}) {
  Object.entries(item.requiredItemCounts).map((value : [string, number]) => {
    const name = value[0]
    const count = value[1];
    const depItem = allItems[name];

    // raw material has no dependency
    if (depItem.requiredItemCounts) {
      aggregateRawMaterials(sets, depItem, allItems)
    } else if (!depItem.requiredItemCounts) {
      if (!sets[depItem.name]) {
        sets[depItem.name] = { item: depItem, size: count } as MatSet;
      } else {
        sets[depItem.name].size += count;
      }
    }
  })
}

export default function AggregatedRawMats(props : AggregatedRawMatsProps) {
  const item = props.item

  const sets : { [ name : string ] : MatSet} = {}
  aggregateRawMaterials(sets, item, props.allItems)

  const setList = Object.values(sets)

  setList.sort((a, b) => {
    if (a.item.duration > b.item.duration) {
      return 1
    }

    if (a.item.duration < b.item.duration) {
      return -1
    }

    return 0
  })

  return <Box>{
    setList.map((matSet) => {
      return <Box key={matSet.item.name}>
        <HStack spacing='24px'>
          {
            [...Array(matSet.size)].map((value, index) => {
              return <MatBox item={matSet.item} key={index}/>
            })
          }

          <MatDuration item={matSet.item}/>
        </HStack>
      </Box>;
    })
  }</Box>
}
