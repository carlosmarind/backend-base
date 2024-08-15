# Proyecto: backend-base

Proyecto desarrollado en TypeScript - NodeJs. Servicio REST con una aplicacion que opera funciones basicas de una calculadora (suma y resta). Genera los siguientes endpoints:

## Endpoints:

| METHOD | PATH    | PARAMS                                            | RESPONSE EXAMPLE                                   |
|--------|---------|---------------------------------------------------|----------------------------------------------------|
| GET    | /       | N/A                                               | Hola mundo al usuario cmd                          |
| GET    | /operar | a=10 (numero) b=30 (numero) oper=suma (operación) | el resultado de la operacion suma de 10 y 30 es 40 |

## Ejecución en entorno local
Se requiere tener instalado npm en el equipo

1) npm install

2) npm run dev

3) Navegar a http://localhost:3001
