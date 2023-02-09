import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { Stack, HStack, VStack, StackDivider } from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

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

          { item.requiredItemCounts ?
            <Text pt='2' fontSize='sm'>Required Item Kinds {Object.entries(item.requiredItemCounts).length}.</Text> : null }
        </Box>
        <Box>
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Property</Th>
                  <Th>x 1</Th>
                  <Th>x 5</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Duration</Td>
                  <Td>{moment.duration(item.duration, 'minutes').humanize()}</Td>
                  <Td>{moment.duration(item.duration * 5, 'minutes').humanize()}</Td>
                </Tr>

                { item.price ? (
                <Tr>
                  <Td>Price</Td>
                  <Td>
                    <Text pt='2' fontSize='sm'>$ {item.price}</Text>
                  </Td>
                  <Td>
                    <Text pt='2' fontSize='sm'> $ { item.price * 5}</Text>
                  </Td>
                </Tr>
                ) : null}

                { item.cost ? (
                  <Tr>
                    <Td>Material Cost</Td>
                    <Td>
                      <Text pt='2' fontSize='sm'>$ {item.cost}</Text>
                    </Td>
                    <Td>
                      <Text pt='2' fontSize='sm'> $ { item.cost * 5}</Text>
                    </Td>
                  </Tr>
                ) : null}

                { item.cost && item.price ? (
                  <Tr>
                    <Td>Net Profit</Td>
                    <Td>
                      <Text pt='2' fontSize='sm'>$ {item.price - item.cost}</Text>
                    </Td>
                    <Td>
                      <Text pt='2' fontSize='sm'> $ {(item.price - item.cost) * 5}</Text>
                    </Td>
                  </Tr>
                ) : null}

              </Tbody>
            </Table>
          </TableContainer>
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
