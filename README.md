# Tarea Desarrollo Full Stack
Este proyecto es una aplicación web para gestionar canciones, que permite agregar canciones, votar por ellas y obtener una canción aleatoria. 
La aplicación utiliza Node.js, Express y MongoDB para el backend y un frontend en HTML, CSS y JavaScript.

## Descripción
La página permite realizar las siguientes acciones:
Agregar canciones: Puedes agregar canciones con su nombre, artista y el enlace al video de YouTube.
Votar por canciones: Cada canción tiene un contador de votos que puede ser incrementado por los usuarios.
Obtener una canción aleatoria: Puedes obtener una canción aleatoria de la lista y ver los detalles.
Ver lista de canciones: Las canciones guardadas se muestran en una lista con sus detalles y opción de votar.

## Requisitos
Antes de comenzar, asegúrate de tener lo siguiente instalado:
- Node.js 
- MongoDB 

## Instrucciones para iniciar el servidor localmente
1. Clonar el repositorio
Primero, clona este repositorio en tu máquina local:
~~~
git clone https://github.com/MichaelAlejandro/dev_Full_Stack_Song.git
~~~
3. Instalación de dependencias
Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:
~~~
cd .\dev_Full_Stack_Song\server\
~~~
~~~
npm install
~~~
5. Base de datos MongoDB
Inicia la conexion para la base de datos en mogodb en localhost:27017
6. Arranca el Servidor
En el directorio server, ejecuta el siguiente comando para arrancar el servidor:
~~~
node server.js
~~~
8. Entra en el link
El link normalmente se muestra al momento de arrancar el servidor
