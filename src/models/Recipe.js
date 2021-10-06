export default [
  {
    //andt::Table::Column
    dataIndex: "name",
    title: "Nombre",
    //Custom::table
    searchable: true,
    //Custom::form
    text: "Introduzca nombre",
    //type: "text",
    required: true,
    help: "Lo que viene a ser el nombre",
    showInTable: true,
    searchable: true
  },
  {
    //andt::Table::Column
    dataIndex: "value",
    title: "Value",
    //Custom::form
    text: "Introduzca value",
    type: "checkbox",
    showInTable: true
  },
  {
    //andt::Table::Column
    dataIndex: "email",
    title: "Email",
    //Custom::form
    text: "Introduzca email",
    type: "email",
    required: true,
    showInTable: true,
    searchable: true
  },
  {
    //andt::Table::Column
    dataIndex: "healthy",
    title: "Saludable",
    //Custom::form
    text: "",
    type: "semaphore",
    //required: true,
    showInTable: true,
    searchable: true
  },
  {
    //andt::Table::Column
    dataIndex: "ingredients",
    title: "Ingredientes",
    //Custom::form
    text: {
      add: "Añadir ingrediente",
      remove: "Eliminar ingrediente",
      placeholder: ["Ingrediente", "Cantidad"]
    },
    type: "dynamicList"
  }
];
