export default [
  {
    //andt::Table::Column
    title: "Nombre",
    dataIndex: "name",
    //Custom::table
    searchable: true,
    //Custom::form
    text: "Introduzca nombre",
    //type: "text",
    required: true,
    help: "Lo que viene a ser el nombre"
  },
  {
    //andt::Table::Column
    title: "Value",
    dataIndex: "value",
    //Custom::form
    text: "Introduzca value",
    type: "checkbox"
  },
  {
    //andt::Table::Column
    title: "Email",
    dataIndex: "email",
    //Custom::form
    text: "Introduzca email",
    type: "email",
    required: true,
    searchable: true
  }
];
