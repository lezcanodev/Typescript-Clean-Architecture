### Typescript - Clean Architecture
Proyecto intentando seguir los principios de arquitectura limpia y SOLID. Es una aplicacion simple donde puedes publicar post que deben tener al menos una imagen y utiliza jwt como mecanismo de autenticacion.

La aplicacion tiene tres capas principales:
1. Dominio: Contiene objectos, logica y reglas que representan el negocio.
2. Aplicacion: Contiene los distintos casos de uso de la aplicacion.
3. Infraestructura: Contiene los detalles de la aplicacion como la base de datos (postgres), la tecnologia que se usara para correr la aplicacion (http), etc.
4. Main: Contiene el punto de entrada y las distintas implementaciones para
correr la aplicacion.

Caracteristicas:
* Las capas que tiene la funcionalidades principales dependen unicamente de abstraciones con esto aseguramos que nuestra aplicacion no se acople a ninguna tecnologia y sea facil de mantener y poder adaptarlo a otras tecnologias mas facilmente.
* Se realizo unit test en la capa de aplicacion para aseguranos que nuestros casos de uso funcionan con las reglas y logica de aplicacion que esperamos, y test de integracion en la capa de Infraestructura/main para asegurar que nuestros componentes funcionan juntos correctamente.
