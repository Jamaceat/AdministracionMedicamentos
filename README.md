# Inventario

Este proyecto tiene la creacion de una base de datos y su respectivo Backend donde se hara el procesamiento de datos sobre un inventario en medicina, provedores y recepcion.

## Tecnologias utilizadas

- MYSQL
- Javascript
  - Express

## ENDPOINTS

- /products

  - / - get : Lista de todos los productos
  - /:id - get conseguir un producto
  - / - post : crear un producto
  - /:id delete : elimina un producto
  - / update : actualiza campos de un producto

- /providers

  - / - get : Lista de todos los provedores
  - /only - get conseguir un provedor
  - / - post : crear un provedor
  - / delete : elimina un provedor
  - / update : actualiza campos de un provedor

- /receptions
  - / - get : Lista de todas las recepciones
  - /:id - get conseguir una recepcion
  - / - post : crear una recepcion
  - /:id delete : elimina una recepcion
  - / update : actualiza campos de una recepcion

## Ejecucion

Entrar al modulo Backend y correr `npm i` despues que se hayan instalado las dependencias correr `npm run develop`

- necesitara crear un archivo .env con el `password` para el usuario con acceso a la base de datos en cada maquina respectivamente
- necesitara de algun programa como postman para probar la API
