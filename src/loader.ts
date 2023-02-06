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
      const itemJsonPath = path.join('items', storeName, filename)

      console.log(itemJsonPath)

      const itemJson = fs.readFileSync(itemJsonPath, 'utf-8')
      const item = JSON.parse(itemJson) as Item;
      item.store = storeName.replace( /^\d+\s+/ , '');
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

    if (item.requiredItemCounts) {
      for (let requiredName in item.requiredItemCounts) {
        // set item object only when it is found
        if (items[requiredName]) {
          item.requiredItems[requiredName] = items[requiredName]
        }
      }
    }
    return item
  })
}
