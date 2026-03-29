# Rivals.gg

## Tools and programs

Programas a utilizar para el proyecto
    1. Typescript
    2. Node Js
    3. docker
    4. git
    5. Visual studio code (opcional)
    6. Notion (opcional version desktop)
    7. Github (opcional version desktop)

## Struture of proyect

Estructura de del proyecto
1. BackEnd -> Carpeta para desarrollar servicios o microservicios cuando la app cresca (no ocuparemos temporalmente)
2. DevOs -> Carpeta de scripts para despliegues en servidor (para temas de coliciones, base de datos, docker, etc)
3. Documents -> Carpeta para documentacion de aspectos como arquitectura, servidores, configuraciones, etc 
4. FrontEnd -> Carpeta para pagina web con Next js que servira para para front y back en un solo proyecto provicional mientras vaya creciendo
5. Readme.md -> Archivo de documentacion que se llegara encontrar en mas carpetas

Esta estructara se crea en la rama main para que cuando se cree QA y Dev copien la estrutura desde main

## Github

### Ramas

Se creo las siguentes ramas como principales para el proyecto:
    1. main -> rama principal de producion para el desplieque en sevidores web (Solo cambios aprobados y probados en el entorno de QA)
    2. QA -> rama de calidad para probar cambios y funcionalidades antes de montar en produccion entorno controlado para pruebas de calidad
    3. Dev -> rama de desarrollo principal, esta es una rama para recopilar los cambios relizados por el equipo de desarrollo
Ramas secundarias para desarroladores (estas se crean sobre la rama Dev):
    1. Estas ramas van a ser por personas ya sea con su nombre, seudonimo, o cualquier nombre que gusten en estas podran desarrollar de manera in dependiente cada funcionalidad del proyecto sin miedo a romper el codigo. Ramas esperadas posibleas a crear a partir de la rama Dev
        a. HNMR, Chstaras, Hakemm *(opcional) -> Rama para Hakkem
        a. FYEM, Fer, Fernanda  *(opcional) -> Rama para Fernanda
        a. KPE, Kev, Kevin *(opcional) -> Rama para Kevin
Ramas del backup
    beta y beta2, son las ramas de donde se respaldaron las antiguas versiones

### Versionamiento del codigo

Se utilizar un sistema de Versioanimiento para el tema de cambios para la version de produccion
    V0.0.0 --> V Major.Minor.Patch 

    V -> Prefijo de Version
    Major -> Cambios mayores en el codigo (reestruturaciones, varias funcinalidades que crean algo nuevo)
    Minor -> Creacion de funcionalidades 
    Patch -> Bugs, correcciones de errores, cabios en cuestion de rendimiento