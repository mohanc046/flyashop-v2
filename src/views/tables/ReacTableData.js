import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

export function makeData(len = 5553) {
  return range(len).map(() => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson),
    };
  });
}
/*  
// This is for the action table
*/
const dataTable = [
  {
    item: "Canon EOS 1500D DSLR Camera",
    amount: " ₹499",
    inventory: "25 units",
  },
  {
    item: "Samsung Galaxy S23 Ultra",
    amount: " ₹1,199",
    inventory: "10 units",
  },
  {
    item: "Apple MacBook Air M2",
    amount: " ₹1,299",
    inventory: "15 units",
  },
  {
    item: "Sony WH-1000XM5 Headphones",
    amount: " ₹349",
    inventory: "50 units",
  },
  {
    item: "Dell XPS 13 Laptop",
    amount: " ₹1,099",
    inventory: "8 units",
  },
  {
    item: "GoPro HERO11 Black",
    amount: " ₹399",
    inventory: "30 units",
  },
  {
    item: "Canon EOS 1500D DSLR Camera",
    amount: " ₹499",
    inventory: "25 units",
  },
  {
    item: "Samsung Galaxy S23 Ultra",
    amount: " ₹1,199",
    inventory: "10 units",
  },
  {
    item: "Apple MacBook Air M2",
    amount: " ₹1,299",
    inventory: "15 units",
  },
  {
    item: "Sony WH-1000XM5 Headphones",
    amount: " ₹349",
    inventory: "50 units",
  },
  {
    item: "Dell XPS 13 Laptop",
    amount: " ₹1,099",
    inventory: "8 units",
  },
  {
    item: "GoPro HERO11 Black",
    amount: " ₹399",
    inventory: "30 units",
  },
  {
    item: "Canon EOS 1500D DSLR Camera",
    amount: " ₹499",
    inventory: "25 units",
  },
  {
    item: "Samsung Galaxy S23 Ultra",
    amount: " ₹1,199",
    inventory: "10 units",
  },
  {
    item: "Apple MacBook Air M2",
    amount: " ₹1,299",
    inventory: "15 units",
  },
  {
    item: "Sony WH-1000XM5 Headphones",
    amount: " ₹349",
    inventory: "50 units",
  },
  {
    item: "Dell XPS 13 Laptop",
    amount: " ₹1,099",
    inventory: "8 units",
  },
  {
    item: "GoPro HERO11 Black",
    amount: " ₹399",
    inventory: "30 units",
  },
];

export { dataTable };
