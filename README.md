# Prueba Front 2 Borja

Este proyecto es una aplicación de React creada con Vite. La aplicación permite buscar y mostrar información sobre personajes de Marvel utilizando la API de Marvel.

## Configuración del Proyecto

### Instalación para su correcto funcionamiento

1. Clona el repositorio:
   ```bash
   git clone https://github.com/borjagm/PruebaFront2Borja.git
   cd prueba-front-2-borja
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Variables de Entorno

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables. (Esto se debe por seguridad para no publicar las keys de la cuenta de marvel en el repositorio, para ello se usa el package dotenv)

   ```js
   VITE_MARVEL_API_PUBLIC_KEY = tu_clave_publica_marvel;
   VITE_MARVEL_API_PRIVATE_KEY = tu_clave_privada_marvel;
   ```

Reemplaza `tu_clave_publica_marvel` y `tu_clave_privada_marvel` con tus propias claves de API obtenidas del [Marvel Developer Portal](https://developer.marvel.com/documentation/getting_started).

### Ejecución de la aplicación

4.  Para ejecutar la aplicación en modo de desarrollo:

        ```bash
        npm run dev

    http://localhost:5173/ para acceder a la web en desarrollo.

5.  Para construir la aplicación para modo producción:
    ```bash
    npm run build
    ```
    Para ejecutar la aplicacion en producion localmente lanzar el siguiente comando:
    ```bash
    npm run preview
    ```
    http://localhost:4173/ para acceder a la web en prod local.

### Ejecución de tests de la aplicación

6. Para ejecutar las pruebas unitarias:
   ```bash
   npm run test
   ```

### Ejecución de lint y formatter

7. Para ejecutar lint:
   ```bash
   npm run lint
   ```
8. Para ejecutar el formatter:
   ```bash
   npm run format
   ```

### Arquitectura y Estructura del Proyecto

El proyecto sigue una estructura modular para mantener el código organizado y fácil de mantener. A continuación se describe la estructura principal del proyecto:

    ```
    src/
    ├── assets/                 # Imágenes y recursos estáticos
    ├── components/             # Componentes reutilizables de la UI
    │   ├── CharacterCard/      # Componente card de personaje
    │   ├── Header/             # Componente de encabezado de la app
    │   └── ...                 # Otros componentes
    ├── context/                # Contextos manejo de estado global
    │   └── HeroesContext.jsx   # Manejar los héroes y favoritos
    ├── pages/                  # Páginas principales de la aplicación
    │   ├── Home/               # Página de inicio
    │   ├── CharacterDetail/    # Página de detalles del personaje
    ├── services/               # Interacción con APIs y demás
    │   ├── ApiServices.js      # Servicio para realizar solicitudes
    │   └── SiteConfig.js       # Configuración y utilidades para la API de Marvel
    ├── App.jsx                 # Componente principal de la aplicación
    ├── main.jsx                # Punto de entrada de la aplicación
    └── index.css               # Estilos globales

### Información Relevante

#### Dependencias Principales

- Vite: Herramienta de construcción rápida para proyectos de frontend.

- React Router: Biblioteca para el manejo de rutas en React.

- Axios: Cliente HTTP para realizar solicitudes a la API de Marvel.

- CryptoJS: Biblioteca para generar hashes y otras operaciones criptográficas.

- ESLint: Herramienta para identificar y reportar patrones encontrados en el código ECMAScript/JavaScript.

- Prettier: Formateador de código que asegura un estilo consistente.

- Sass: Preprocesador CSS que permite escribir estilos de manera más eficiente.

- Vitest: Framework de pruebas unitarias para proyectos de frontend.

- @testing-library/react: Utilidades para probar componentes de React.

#### Estilos

Los estilos se gestionan utilizando SCSS y están organizados por componentes para mantener una estructura modular y fácil de mantener.

#### Context API

El proyecto utiliza la Context API de React para manejar el estado global de la aplicación, como la lista de héroes favoritos y la visibilidad de los favoritos.

#### Pruebas

Las pruebas unitarias se realizan utilizando Vitest y @testing-library/react. Las pruebas están organizadas en archivos de prueba junto a los componentes y servicios correspondientes.
