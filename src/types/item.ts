
export default interface Item {
  name : string;

  duration : number; // minutes

  inclusiveDuration : number; // minutes

  price ?: number; // price in dollar

  cost ?: number; // cost in dollar

  profitMinute ?: number; // profit per min in dollar

  inclusiveProfitMinute ?: number; // inclusive profit per minute in dollar

  store : string; // store name

  // map item name -> count
  requiredItemCounts : { [ name : string ] : number };

  requiredItems : { [ name : string ] : Item };
}
