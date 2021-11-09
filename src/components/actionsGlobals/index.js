/**
 * Archivo en el cual se crean funciones que podrian ser utlizadas en toda la aplicacion
 */
import Swal from "sweetalert2";

export const sweetAlert = (icon, title, text, footer) => {
  Swal.fire({
    icon: icon || "Error",
    title: title || "Oops...",
    text: text || "Atencion!",
    footer: footer || " ",
  });
};
