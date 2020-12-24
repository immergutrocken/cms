import { RiContactsFill } from "react-icons/ri";

export default {
  type: "object",
  name: "contactFormular",
  title: "Kontakt Formular",
  icon: RiContactsFill,
  fields: [
    {
      type: "boolean",
      name: "withTelephone",
      title: "mit Telefon",
    },
  ],
};
