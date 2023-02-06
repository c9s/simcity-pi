import fs from 'fs'
import path from 'path'

import Item from '@/src/types/item'

export function load() : Array<Item> {
  const storeNames = fs.readdirSync(path.join('items'))

  const items : { [ name : string ] : Item } = {};

  const itemsArray : Array<Item> = [];

  storeNames.forEach((storeName : string) => {
    const itemFiles = fs.readdirSync(path.join('items', storeName))
    const itemConfigs = itemFiles.map((filename) => {
      const itemJson = fs.readFileSync(path.join('items', filename), 'utf-8')
      const item = JSON.parse(itemJson) as Item;
      item.store = storeName;
      return item
    })

    // build up lookup dictionary
    itemConfigs.forEach((item, index) => {
      items[ item.name ] = item
    })

    itemsArray.push(...itemConfigs)
  })

  return itemsArray.map((item : Item) => {
    const n = item.name

    item.requiredItems = {};

    if (item.requiredItems) {
      for (let requiredName in item.requiredItems) {
        // set item object only when it is found
        if (items[requiredName]) {
          item.requiredItems[requiredName] = items[requiredName]
        }
      }
    }
    return item
  })
}
