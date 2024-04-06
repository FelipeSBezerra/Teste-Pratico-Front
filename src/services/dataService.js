// dataService.js
const data = [
    {
        id: 1,
        nome: "Unidade A",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 2,
        nome: "Unidade B",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 3,
        nome: "Unidade C",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 4,
        nome: "Unidade D",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 5,
        nome: "Unidade E",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 6,
        nome: "Unidade F",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 7,
        nome: "Unidade G",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 8,
        nome: "Unidade H",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 9,
        nome: "Unidade I",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    },
    {
        id: 10,
        nome: "Unidade J",
        createdAt: "2024-04-06T11:57:52Z",
        updatedAt: "2024-04-06T11:57:52Z"
    }
];
  
  export function getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }