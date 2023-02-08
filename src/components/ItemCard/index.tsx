import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Stack, HStack, VStack, StackDivider } from '@chakra-ui/react';

import NeededMats from "@/src/components/NeededMats";
import MatBox from "@/src/components/MatBox";
import Item from '@/src/types/item';
import Image from "next/image";
import moment from 'moment';

interface ItemCardProps {
  item : Item;

  allItems : { [ name : string ] : Item};
}

export default function ItemCard(props : ItemCardProps) {
  const item = props.item;
  return <Card>
    <CardHeader>
      <Heading size='md'>
        <Image
          key={item.name}
          src={ `/items/${item.name}.png` }
          alt={item.name}
          width={45}
          height={45}
        />

        {item.name}
      </Heading>
    </CardHeader>

    <CardBody>
      <Stack divider={<StackDivider />} spacing='4'>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Summary
          </Heading>

          <Text pt='2' fontSize='sm'>
            Duration: {moment.duration(item.duration, 'minutes').humanize()} (x 5 = {moment.duration(item.duration * 5, 'minutes').humanize()})
          </Text>

          { item.requiredItemCounts ?
            <Text pt='2' fontSize='sm'>Required Item Kinds {Object.entries(item.requiredItemCounts).length}.</Text> : null }


          { item.price ? <Text pt='2' fontSize='sm'>
            Price: $ {item.price}  (x 5 = $ { item.price * 5})
          </Text> : null }

          { item.cost ? <Text pt='2' fontSize='sm'>
            Material Cost: $ {item.cost}  (x 5 = $ { item.cost * 5})
          </Text> : null }

          { item.price && item.cost ? <Text pt='2' fontSize='sm'>
            Net Profit: $ {item.price - item.cost}  (x 5 = $ { (item.price - item.cost) * 5})

            (if you bought materials from the trade depot)
          </Text> : null }
        </Box>

        {
          item.requiredItemCounts ?
            <Box>
              <NeededMats top={true} item={item} allItems={props.allItems}/>
            </Box> : null
        }
      </Stack>
    </CardBody>
  </Card>;
  /*
  <Grid templateColumns='repeat(12, 1fr)' gap={4}>
    <GridItem bg='blue.500' colSpan={12}>
      Title Mat
    </GridItem>
    <GridItem bg='blue.500' colSpan={12}>
      Title Mat
    </GridItem>
  </Grid>
  */
}
