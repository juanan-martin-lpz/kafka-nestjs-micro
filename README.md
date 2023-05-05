#Aplicacion hibrida NestJS con microservicios y KafkaJS

##Proposito
Arquitectura hexagonal llevada a un entorno de microservicios. 

##Diseño
Las capas de dominio y aplicacion residen en un microservicio basado en REST API que es accedido por una capa de infraestructura cuya labor es enviar y recibir mensajes a un servidor Kafka, en principio solo disponible para cada microservicio "logico" (dominio + aplicacion + infra), que a su vez esta conectado al otro lado a la capa de framework, en este caso un REST API que da servicio al exterior, en el caso de los adaptadores de entrada. Los adaptadores de salida hacen lo propio hacia un framework que se conecta a un microservicio con una base de datos MongoDB.

El API de aplicacion se expone en forma de un caso de uso por cada controlador.

La ventaja de esta aproximacion es que hace del sistema agnostico tanto del metodo de entrada usado (REST API, GraphQL, gRPC...) y el de salida (MongoDB, Bases de datos SQL...)

Este mecanismo nos permite tener conectados a la misma instancia de un microservicio varios tipos de framework.


##Disclaimer
Este proyecto aun esta en desarrollo, por lo que no creo que sea ejemplo para mucho. Usalo bajo tu propia responsabilidad
