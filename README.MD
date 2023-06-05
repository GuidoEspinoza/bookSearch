# Proyecto Book Search (Prueba técnica)

El proyecto consiste en crear una sitio web utilizando la API [An API of Ice And Fire](https://anapioficeandfire.com) en donde el usuario puede buscar y filtrar libros por título y autor.

Tiene una tabla en donde se muestrar los libros buscados.

Además cuenta con un formulario para añadir nuevos libros (**no posee funcionalidad porque la API es de solo lectura**)

Existe una vista de detalles donde se verán todos los datos del libro seleccionado.

## Dependencias utilizadas

- Vite: Entorno de desarrollo rápido para aplicaciones web con React. `npm create vite@latest`
- React Redux: Biblioteca para gestionar el estado de la aplicación en React. `npm install react-redux`
- React Redux Toolkit: Utilidades para simplificar el desarrollo con Redux. `npm install @reduxjs/toolkit`
- React Router Dom: Manejo de navegación en una aplicación de React. `npm install react-router-dom`
- React Table: Biblioteca para crear tablas flexibles en React. `npm install @tanstack/react-table`
- Jest: Framework de pruebas unitarias para JavaScript. `npm install --save-dev jest`

## Ejecución

Para visualizar el proyecto primero se debe ejecutar el comando `npm install` para instalar todas las dependiencias.

Seguido a ello se debe ejecutar el comando `npm run dev`

## Preguntas sobre entrega

### ¿Cómo decidiste las opciones técnicas y arquitectónicas utilizadas como parte de su solución?

- Las decisiones las tomé desestructurando los requerimientos y analizándolos para determinar cómo abordarlos, definiendo en un aprimera instancia `Actions`, `Reducer` y `BookList`, luego de eso seguí estructurando el resto del proyecto.

### ¿Hay alguna mejora que dejaste pendiente de hacer en su envío?

- Sí, como primer pendiente quedó `Storybook` que, siendo sincero, no logré entender como implementarlo, a pesar de ver la documentación y buscar tutoriales
- Tambien quedó pendiente la resulución de un error al realizar la primera búsqueda en `BookList`, el cual arroja un error en `Promises` al usar `redux-thunk`. Según la información que obtuve al aprecer es por un error de `Middleeware` que no pude solucionar. Pero al hacer click por segunda vez la búsqueda sí se ejecuta
- También quedaron pendientes los test, para los cuales me guié por la documentación y me arrojaban 2 errores, el primero fue por la extensión .jsx que solucioné, pero el 2do fue por ECMAScript que no pude solucionar.
- También quedó pendiente la página de `Favorites` donde me arrojaba el mismo error de `Promises` y `Middleware` que tampoco logré solucionar para el cual decidíó eliminar la configuración aplicada en `Actions` y `Reducer`
- El uso de `Ordernar`, `Filtrar` y `Buscar` dentro de `React-table` tampoco se realizó ya que no logré ejecutar con éxito la aplicación del código de la documentación

### ¿Qué harías de manera diferente si se le asignara más tiempo?

- Creo que con más tiempo no hubiese cambiado nada, el uso de `react-table` fue ideal para una búsqueda masiva de ligros, pero para la página de detalle no aplicaría ya que es solo un ítem
- Si no me hubiese demorado tratando de solucionar los errores con los que me encontré, habría agregado una página de detalles de `Character` y `Houses`

## Contribuidor

- Guido Espinoza Correa